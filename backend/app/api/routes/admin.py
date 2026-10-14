"""Back-office administration routes guarded by RBAC."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.deps import AdminServiceDep
from app.api.serializers import user_to_out
from app.db.models import User
from app.rbac.dependencies import require_permission
from app.rbac.permissions import Permission
from app.schemas.auth import MessageResponse
from app.schemas.user import RoleOut, RoleUpdateRequest, UserOut, UserStatusUpdate

router = APIRouter(prefix="/admin", tags=["Back office (RBAC)"])

RequireUserRead = Annotated[User, Depends(require_permission(Permission.USER_READ))]
RequireUserManage = Annotated[User, Depends(require_permission(Permission.USER_MANAGE))]
RequireBackoffice = Annotated[
    User, Depends(require_permission(Permission.BACKOFFICE_ACCESS))
]


@router.get("/users", response_model=list[UserOut], summary="List accounts")
async def list_users(
    _guard: RequireUserRead,
    service: AdminServiceDep,
    offset: int = 0,
    limit: int = 50,
) -> list[UserOut]:
    """List accounts. Requires the ``user:read`` permission (moderator+)."""
    users = await service.list_users(offset=max(0, offset), limit=min(limit, 100))
    return [user_to_out(user) for user in users]


@router.patch(
    "/users/{user_id}/role",
    response_model=UserOut,
    summary="Assign a role",
)
async def update_role(
    user_id: int,
    payload: RoleUpdateRequest,
    _guard: RequireUserManage,
    service: AdminServiceDep,
) -> UserOut:
    """Assign a new role. Requires the ``user:manage`` permission (administrator)."""
    user = await service.set_role(user_id, payload.role)
    return user_to_out(user)


@router.patch(
    "/users/{user_id}/status",
    response_model=UserOut,
    summary="Activate or deactivate an account",
)
async def update_status(
    user_id: int,
    payload: UserStatusUpdate,
    _guard: RequireUserManage,
    service: AdminServiceDep,
) -> UserOut:
    """Enable/disable an account. Requires ``user:manage`` (administrator)."""
    user = await service.set_active(user_id, payload.is_active)
    return user_to_out(user)


@router.get("/roles", response_model=list[RoleOut], summary="List the role catalog")
async def list_roles(
    _guard: RequireBackoffice,
    service: AdminServiceDep,
) -> list[RoleOut]:
    """Return the RBAC role catalog. Requires back-office access."""
    roles = await service.list_roles()
    return [RoleOut.model_validate(role) for role in roles]


@router.get(
    "/permissions",
    response_model=dict,
    summary="Effective permissions of the caller",
)
async def my_permissions(_guard: RequireBackoffice) -> dict:
    """Return the caller's effective (inherited) permissions."""
    from app.rbac.permissions import effective_permissions

    return {
        "role": _guard.role.name,
        "level": _guard.role.level,
        "permissions": sorted(p.value for p in effective_permissions(_guard.role.name)),
    }


@router.get("/health", response_model=MessageResponse, include_in_schema=False)
async def admin_health(_guard: RequireBackoffice) -> MessageResponse:
    return MessageResponse(message="Back office opérationnel.")
