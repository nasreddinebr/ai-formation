"""Training-progress persistence queries."""

from __future__ import annotations

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import utcnow
from app.db.models import UserProgress


class UserProgressRepository:
    """One row per (user, course) storing the last visited chapter."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_for_user(self, user_id: int) -> list[UserProgress]:
        result = await self.session.execute(
            select(UserProgress)
            .where(UserProgress.user_id == user_id)
            .order_by(UserProgress.last_visited_at.desc())
        )
        return list(result.scalars().all())

    async def get(self, user_id: int, course_id: int) -> UserProgress | None:
        result = await self.session.execute(
            select(UserProgress).where(
                UserProgress.user_id == user_id,
                UserProgress.course_id == course_id,
            )
        )
        return result.scalar_one_or_none()

    async def upsert(
        self,
        *,
        user_id: int,
        course_id: int,
        course_title: str,
        chapter_id: str,
        chapter_title: str,
        chapter_url: str,
    ) -> UserProgress:
        entry = await self.get(user_id, course_id)
        if entry is None:
            entry = UserProgress(
                user_id=user_id,
                course_id=course_id,
                course_title=course_title,
                chapter_id=chapter_id,
                chapter_title=chapter_title,
                chapter_url=chapter_url,
            )
            self.session.add(entry)
        else:
            entry.course_title = course_title
            entry.chapter_id = chapter_id
            entry.chapter_title = chapter_title
            entry.chapter_url = chapter_url
            entry.last_visited_at = utcnow()
        await self.session.flush()
        await self.session.refresh(entry)
        return entry

    async def delete(self, user_id: int, course_id: int) -> bool:
        result = await self.session.execute(
            delete(UserProgress).where(
                UserProgress.user_id == user_id,
                UserProgress.course_id == course_id,
            )
        )
        return bool(result.rowcount)
