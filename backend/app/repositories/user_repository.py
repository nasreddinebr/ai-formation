"""User persistence queries."""

from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import User


class UserRepository:
    """Read/write access to accounts."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_id(self, user_id: int) -> User | None:
        return await self.session.get(User, user_id)

    async def get_by_email(self, email: str) -> User | None:
        result = await self.session.execute(
            select(User).where(func.lower(User.email) == email.lower())
        )
        return result.scalar_one_or_none()

    async def email_exists(self, email: str) -> bool:
        return await self.get_by_email(email) is not None

    async def count(self) -> int:
        result = await self.session.execute(select(func.count()).select_from(User))
        return int(result.scalar_one())

    async def list(self, *, offset: int = 0, limit: int = 50) -> list[User]:
        result = await self.session.execute(
            select(User).order_by(User.id).offset(offset).limit(limit)
        )
        return list(result.scalars().all())

    async def create(
        self,
        *,
        email: str,
        password_hash: str,
        role_id: int,
        first_name: str | None = None,
        last_name: str | None = None,
        phone: str | None = None,
        is_active: bool = True,
    ) -> User:
        user = User(
            email=email.lower(),
            password_hash=password_hash,
            role_id=role_id,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            is_active=is_active,
        )
        self.session.add(user)
        await self.session.flush()
        await self.session.refresh(user)
        return user

    async def update_profile(
        self,
        user: User,
        *,
        first_name: str | None,
        last_name: str | None,
        phone: str | None,
    ) -> User:
        user.first_name = first_name
        user.last_name = last_name
        user.phone = phone
        await self.session.flush()
        await self.session.refresh(user)
        return user

    async def update_password(self, user: User, password_hash: str) -> User:
        user.password_hash = password_hash
        await self.session.flush()
        await self.session.refresh(user)
        return user

    async def update_role(self, user: User, role_id: int) -> User:
        user.role_id = role_id
        await self.session.flush()
        await self.session.refresh(user)
        return user

    async def set_active(self, user: User, is_active: bool) -> User:
        user.is_active = is_active
        await self.session.flush()
        await self.session.refresh(user)
        return user
