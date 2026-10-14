"""Service dependencies for the API layer."""

from __future__ import annotations

from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.services.admin_service import AdminService
from app.services.auth_service import AuthService
from app.services.progress_service import ProgressService
from app.services.user_service import UserService


def get_auth_service(
    session: Annotated[AsyncSession, Depends(get_session)],
) -> AuthService:
    return AuthService(session)


def get_user_service(
    session: Annotated[AsyncSession, Depends(get_session)],
) -> UserService:
    return UserService(session)


def get_progress_service(
    session: Annotated[AsyncSession, Depends(get_session)],
) -> ProgressService:
    return ProgressService(session)


def get_admin_service(
    session: Annotated[AsyncSession, Depends(get_session)],
) -> AdminService:
    return AdminService(session)


AuthServiceDep = Annotated[AuthService, Depends(get_auth_service)]
UserServiceDep = Annotated[UserService, Depends(get_user_service)]
ProgressServiceDep = Annotated[ProgressService, Depends(get_progress_service)]
AdminServiceDep = Annotated[AdminService, Depends(get_admin_service)]
