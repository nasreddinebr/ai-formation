"""Profile service: read, update, change password."""

from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.errors import AuthenticationError, NotFoundError, ValidationError
from app.core.security import hash_password, verify_password
from app.db.models import User
from app.repositories.refresh_token_repository import RefreshTokenRepository
from app.repositories.user_repository import UserRepository
from app.schemas.auth import ChangePasswordRequest
from app.schemas.user import UserProfileUpdate


class UserService:
    """Profile reads and writes for the authenticated user."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.users = UserRepository(session)
        self.tokens = RefreshTokenRepository(session)

    async def get_user(self, user_id: int) -> User:
        user = await self.users.get_by_id(user_id)
        if user is None:
            raise NotFoundError("Utilisateur introuvable.")
        return user

    async def update_profile(self, user: User, payload: UserProfileUpdate) -> User:
        """Apply editable profile fields (email remains immutable)."""
        # ``exclude_unset`` lets callers send only the fields they changed.
        data = payload.model_dump(exclude_unset=True)
        updated = await self.users.update_profile(
            user,
            first_name=data.get("first_name", user.first_name),
            last_name=data.get("last_name", user.last_name),
            phone=data.get("phone", user.phone),
        )
        await self.session.commit()
        return updated

    async def change_password(self, user: User, payload: ChangePasswordRequest) -> None:
        """Change the password after verifying the current one."""
        if not verify_password(payload.current_password, user.password_hash):
            raise AuthenticationError("Mot de passe actuel incorrect.")
        if verify_password(payload.new_password, user.password_hash):
            raise ValidationError("Le nouveau mot de passe doit être différent de l'actuel.")

        await self.users.update_password(user, hash_password(payload.new_password))
        # Invalidate every other session for safety.
        await self.tokens.revoke_all_for_user(user.id)
        await self.session.commit()
