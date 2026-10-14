"""Authentication service: registration, login, refresh rotation, logout."""

from __future__ import annotations

from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants import DEFAULT_ROLE_ID, ROLE_USER
from app.core.errors import AuthenticationError, ConflictError
from app.core.security import (
    create_access_token,
    generate_refresh_token,
    hash_password,
    needs_rehash,
    refresh_token_expiry,
    sha256_digest,
    verify_password,
)
from app.db.base import utcnow
from app.db.models import User
from app.repositories.refresh_token_repository import RefreshTokenRepository
from app.repositories.role_repository import RoleRepository
from app.repositories.user_repository import UserRepository
from app.schemas.auth import LoginRequest, RegisterRequest


class AuthService:
    """Coordinates account creation and session issuance."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.users = UserRepository(session)
        self.roles = RoleRepository(session)
        self.tokens = RefreshTokenRepository(session)

    # ------------------------------------------------------------------ #
    # Token helpers
    # ------------------------------------------------------------------ #
    def create_access(self, user: User) -> str:
        """Mint a short-lived access token for a user."""
        return create_access_token(
            subject=user.id, role=user.role.name, level=user.role.level
        )

    async def _issue_refresh(self, user: User) -> str:
        raw, digest = generate_refresh_token()
        await self.tokens.create(
            user_id=user.id, token_hash=digest, expires_at=refresh_token_expiry()
        )
        return raw

    # ------------------------------------------------------------------ #
    # Flows
    # ------------------------------------------------------------------ #
    async def register(self, payload: RegisterRequest) -> tuple[User, str, str]:
        """Create an account with the default role and open a session."""
        if await self.users.email_exists(payload.email):
            raise ConflictError("Un compte existe déjà avec cet email.")

        role = await self.roles.get_by_name(ROLE_USER)
        role_id = role.id if role is not None else DEFAULT_ROLE_ID

        try:
            user = await self.users.create(
                email=payload.email,
                password_hash=hash_password(payload.password),
                role_id=role_id,
                first_name=payload.first_name,
                last_name=payload.last_name,
                phone=payload.phone,
            )
            refresh_raw = await self._issue_refresh(user)
            await self.session.commit()
        except IntegrityError as exc:  # race on the unique email index
            await self.session.rollback()
            raise ConflictError("Un compte existe déjà avec cet email.") from exc

        await self.session.refresh(user)
        return user, self.create_access(user), refresh_raw

    async def authenticate(self, payload: LoginRequest) -> User:
        """Verify credentials and return the matching active account."""
        user = await self.users.get_by_email(payload.email)
        if user is None or not verify_password(payload.password, user.password_hash):
            raise AuthenticationError("Email ou mot de passe incorrect.")
        if not user.is_active:
            raise AuthenticationError("Ce compte est désactivé.")

        # Transparently upgrade hashes when parameters get stronger.
        if needs_rehash(user.password_hash):
            await self.users.update_password(user, hash_password(payload.password))
            await self.session.commit()

        return user

    async def login(self, payload: LoginRequest) -> tuple[User, str, str]:
        """Authenticate and open a new session."""
        user = await self.authenticate(payload)
        refresh_raw = await self._issue_refresh(user)
        await self.session.commit()
        return user, self.create_access(user), refresh_raw

    async def refresh(self, raw_token: str | None) -> tuple[User, str, str]:
        """Rotate a refresh session, returning a fresh access/refresh pair."""
        if not raw_token:
            raise AuthenticationError("Session absente.")

        token = await self.tokens.get_by_hash(sha256_digest(raw_token))
        if token is None or token.revoked:
            raise AuthenticationError("Session invalide ou expirée.")
        if token.expires_at < utcnow():
            await self.tokens.revoke(token)
            await self.session.commit()
            raise AuthenticationError("Session expirée.")

        user = await self.users.get_by_id(token.user_id)
        if user is None or not user.is_active:
            raise AuthenticationError("Compte indisponible.")

        # Rotate: the presented token can never be replayed.
        await self.tokens.revoke(token)
        new_raw = await self._issue_refresh(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user, self.create_access(user), new_raw

    async def logout(self, raw_token: str | None) -> None:
        """Revoke the presented refresh session (idempotent)."""
        if not raw_token:
            return
        token = await self.tokens.get_by_hash(sha256_digest(raw_token))
        if token is not None and not token.revoked:
            await self.tokens.revoke(token)
            await self.session.commit()
