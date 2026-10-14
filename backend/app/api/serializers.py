"""Model → response-schema serialisers."""

from __future__ import annotations

from app.db.models import User, UserProgress
from app.rbac.permissions import effective_permissions
from app.schemas.progress import CourseProgressOut
from app.schemas.user import RoleOut, UserOut


def user_to_out(user: User) -> UserOut:
    """Serialise a user without ever leaking the password hash."""
    return UserOut(
        id=user.id,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        role=RoleOut(id=user.role.id, name=user.role.name, level=user.role.level),
        is_active=user.is_active,
        created_at=user.created_at,
        permissions=sorted(p.value for p in effective_permissions(user.role.name)),
    )


def progress_to_out(entry: UserProgress) -> CourseProgressOut:
    return CourseProgressOut.model_validate(entry)
