"""Training-progress service powering the dashboard."""

from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import UserProgress
from app.repositories.progress_repository import UserProgressRepository
from app.schemas.progress import CourseProgressIn


class ProgressService:
    """Record chapter visits and list started courses."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.progress = UserProgressRepository(session)

    async def list_courses(self, user_id: int) -> list[UserProgress]:
        return await self.progress.list_for_user(user_id)

    async def record_visit(self, user_id: int, payload: CourseProgressIn) -> UserProgress:
        entry = await self.progress.upsert(
            user_id=user_id,
            course_id=payload.course_id,
            course_title=payload.course_title,
            chapter_id=payload.chapter_id,
            chapter_title=payload.chapter_title,
            chapter_url=payload.chapter_url,
        )
        await self.session.commit()
        return entry

    async def remove_course(self, user_id: int, course_id: int) -> None:
        await self.progress.delete(user_id, course_id)
        await self.session.commit()
