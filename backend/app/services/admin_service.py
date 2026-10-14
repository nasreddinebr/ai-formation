"""Administration service: user management and role assignment."""

from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.errors import NotFoundError, ValidationError
from app.db.models import User
from app.repositories.role_repository import RoleRepository
from app.repositories.user_repository import UserRepository


class AdminService:
    """Back-office operations guarded by RBAC."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.users = UserRepository(session)
        self.roles = RoleRepository(session)

    async def list_users(self, *, offset: int = 0, limit: int = 50) -> list[User]:
        return await self.users.list(offset=offset, limit=limit)

    async def get_user(self, user_id: int) -> User:
        user = await self.users.get_by_id(user_id)
        if user is None:
            raise NotFoundError("Utilisateur introuvable.")
        return user

    async def set_role(self, user_id: int, role_name: str) -> User:
        role = await self.roles.get_by_name(role_name.upper())
        if role is None:
            raise ValidationError(f"Rôle inconnu : {role_name}.")
        user = await self.get_user(user_id)
        updated = await self.users.update_role(user, role.id)
        await self.session.commit()
        return updated

    async def set_active(self, user_id: int, is_active: bool) -> User:
        user = await self.get_user(user_id)
        updated = await self.users.set_active(user, is_active)
        await self.session.commit()
        return updated

    async def list_roles(self):
        return await self.roles.list_all()
