"""Profile routes ("My Information")."""

from __future__ import annotations

from fastapi import APIRouter, Response

from app.api.cookies import clear_auth_cookies
from app.api.deps import UserServiceDep
from app.api.serializers import user_to_out
from app.rbac.dependencies import CurrentUser
from app.schemas.auth import ChangePasswordRequest, MessageResponse
from app.schemas.user import UserOut, UserProfileUpdate

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("", response_model=UserOut, summary="Read my information")
async def read_profile(user: CurrentUser) -> UserOut:
    """Return the authenticated user's profile."""
    return user_to_out(user)


@router.patch("", response_model=UserOut, summary="Update my information")
async def update_profile(
    payload: UserProfileUpdate,
    user: CurrentUser,
    service: UserServiceDep,
) -> UserOut:
    """Update the editable profile fields (first/last name, phone).

    The email address is immutable and cannot be changed through this endpoint.
    """
    updated = await service.update_profile(user, payload)
    return user_to_out(updated)


@router.post(
    "/password",
    response_model=MessageResponse,
    summary="Change my password",
)
async def change_password(
    payload: ChangePasswordRequest,
    response: Response,
    user: CurrentUser,
    service: UserServiceDep,
) -> MessageResponse:
    """Change the password and invalidate all other sessions."""
    await service.change_password(user, payload)
    # The current session's refresh token was revoked too; force re-login.
    clear_auth_cookies(response)
    return MessageResponse(
        message="Mot de passe modifié. Veuillez vous reconnecter."
    )
