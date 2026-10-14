"""Pydantic request/response schemas (v2)."""

from __future__ import annotations

# Re-exported for convenient imports.
from app.schemas.auth import (
    ChangePasswordRequest,
    LoginRequest,
    MessageResponse,
    RegisterRequest,
)
from app.schemas.progress import CourseProgressIn, CourseProgressOut, DashboardResponse
from app.schemas.user import (
    RoleOut,
    RoleUpdateRequest,
    UserOut,
    UserProfileUpdate,
    UserStatusUpdate,
)

__all__ = [
    "ChangePasswordRequest",
    "CourseProgressIn",
    "CourseProgressOut",
    "DashboardResponse",
    "LoginRequest",
    "MessageResponse",
    "RegisterRequest",
    "RoleOut",
    "RoleUpdateRequest",
    "UserOut",
    "UserProfileUpdate",
    "UserStatusUpdate",
]
