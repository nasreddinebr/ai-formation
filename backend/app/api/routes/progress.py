"""Training progress / dashboard routes."""

from __future__ import annotations

from fastapi import APIRouter, status

from app.api.deps import ProgressServiceDep
from app.api.serializers import progress_to_out
from app.rbac.dependencies import CurrentUser
from app.schemas.auth import MessageResponse
from app.schemas.progress import CourseProgressIn, CourseProgressOut, DashboardResponse

router = APIRouter(prefix="/progress", tags=["Training dashboard"])


@router.get("", response_model=DashboardResponse, summary="List started courses")
async def dashboard(
    user: CurrentUser,
    service: ProgressServiceDep,
) -> DashboardResponse:
    """Return the courses the user has started, with a link to the last chapter."""
    entries = await service.list_courses(user.id)
    courses = [progress_to_out(entry) for entry in entries]
    return DashboardResponse(courses=courses, total_started=len(courses))


@router.put(
    "/{course_id}",
    response_model=CourseProgressOut,
    summary="Record a visited chapter",
)
async def record_visit(
    course_id: int,
    payload: CourseProgressIn,
    user: CurrentUser,
    service: ProgressServiceDep,
) -> CourseProgressOut:
    """Upsert the last visited chapter for a course."""
    if payload.course_id != course_id:
        payload = payload.model_copy(update={"course_id": course_id})
    entry = await service.record_visit(user.id, payload)
    return progress_to_out(entry)


@router.delete(
    "/{course_id}",
    response_model=MessageResponse,
    status_code=status.HTTP_200_OK,
    summary="Forget a course",
)
async def remove_course(
    course_id: int,
    user: CurrentUser,
    service: ProgressServiceDep,
) -> MessageResponse:
    """Remove a course from the user's dashboard."""
    await service.remove_course(user.id, course_id)
    return MessageResponse(message="Cours retiré du tableau de bord.")
