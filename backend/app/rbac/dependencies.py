"""FastAPI dependencies for authentication and permission enforcement."""

from __future__ import annotations

from typing import Annotated

import jwt
from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants import ACCESS_COOKIE
from app.core.errors import AuthenticationError, PermissionDeniedError
from app.core.security import decode_access_token
from app.db.models import User
from app.db.session import get_session
from app.rbac.permissions import Permission, has_permission


def _extract_access_token(request: Request) -> str | None:
    """Read the access token from the HttpOnly cookie or a Bearer header."""
    token = request.cookies.get(ACCESS_COOKIE)
    if token:
        return token
    header = request.headers.get("Authorization")
    if header and header.lower().startswith("bearer "):
        return header[7:].strip()
    return None


async def get_optional_user(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> User | None:
    """Resolve the current user when authenticated, otherwise ``None``."""
    token = _extract_access_token(request)
    if not token:
        return None
    try:
        payload = decode_access_token(token)
    except jwt.PyJWTError:
        return None

    subject = payload.get("sub")
    if not subject or not str(subject).isdigit():
        return None

    user = await session.get(User, int(subject))
    if user is None or not user.is_active:
        return None
    return user


async def get_current_user(
    user: Annotated[User | None, Depends(get_optional_user)],
) -> User:
    """Require an authenticated, active user."""
    if user is None:
        raise AuthenticationError("Authentification requise.")
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
OptionalUser = Annotated[User | None, Depends(get_optional_user)]


def require_permission(permission: Permission):
    """Build a dependency enforcing a single permission (with inheritance)."""

    async def dependency(user: CurrentUser) -> User:
        if not has_permission(user.role.name, permission):
            raise PermissionDeniedError(
                f"Permission requise manquante : {permission.value}."
            )
        return user

    return dependency


def require_min_level(level: int):
    """Build a dependency enforcing a minimum RBAC level."""

    async def dependency(user: CurrentUser) -> User:
        if user.role.level < level:
            raise PermissionDeniedError("Niveau d'accès insuffisant.")
        return user

    return dependency
