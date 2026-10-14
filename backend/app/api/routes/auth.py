"""Authentication routes."""

from __future__ import annotations

from fastapi import APIRouter, Request, Response, status

from app.api.cookies import clear_auth_cookies, set_auth_cookies, set_csrf_cookie
from app.api.deps import AuthServiceDep
from app.api.serializers import user_to_out
from app.core.constants import CSRF_COOKIE, REFRESH_COOKIE
from app.core.security import generate_csrf_token
from app.rbac.dependencies import CurrentUser
from app.schemas.auth import LoginRequest, MessageResponse, RegisterRequest
from app.schemas.user import UserOut

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.get("/csrf", response_model=MessageResponse)
async def issue_csrf(request: Request, response: Response) -> MessageResponse:
    """Issue (or refresh) the double-submit CSRF token cookie.

    State-changing requests must echo the cookie value in the
    ``X-CSRF-Token`` header, so the SPA calls this once before its first POST.
    """
    existing = request.cookies.get(CSRF_COOKIE)
    token = existing or generate_csrf_token()
    set_csrf_cookie(response, token)
    return MessageResponse(message="Jeton CSRF émis.")


@router.post(
    "/register",
    response_model=UserOut,
    status_code=status.HTTP_201_CREATED,
    summary="Create an account and start a session",
)
async def register(
    payload: RegisterRequest,
    response: Response,
    service: AuthServiceDep,
) -> UserOut:
    """Register a new learner (default role) and open an authenticated session."""
    user, access_token, refresh_token = await service.register(payload)
    set_auth_cookies(
        response,
        access_token=access_token,
        refresh_token=refresh_token,
        csrf_token=generate_csrf_token(),
    )
    return user_to_out(user)


@router.post("/login", response_model=UserOut, summary="Authenticate an account")
async def login(
    payload: LoginRequest,
    response: Response,
    service: AuthServiceDep,
) -> UserOut:
    """Verify credentials and open a new session."""
    user, access_token, refresh_token = await service.login(payload)
    set_auth_cookies(
        response,
        access_token=access_token,
        refresh_token=refresh_token,
        csrf_token=generate_csrf_token(),
    )
    return user_to_out(user)


@router.post("/refresh", response_model=UserOut, summary="Rotate the session tokens")
async def refresh(
    request: Request,
    response: Response,
    service: AuthServiceDep,
) -> UserOut:
    """Exchange a valid refresh token for a fresh access/refresh pair."""
    user, access_token, refresh_token = await service.refresh(
        request.cookies.get(REFRESH_COOKIE)
    )
    set_auth_cookies(
        response,
        access_token=access_token,
        refresh_token=refresh_token,
        csrf_token=generate_csrf_token(),
    )
    return user_to_out(user)


@router.post("/logout", response_model=MessageResponse, summary="End the session")
async def logout(
    request: Request,
    response: Response,
    service: AuthServiceDep,
) -> MessageResponse:
    """Revoke the current refresh session and clear the auth cookies."""
    await service.logout(request.cookies.get(REFRESH_COOKIE))
    clear_auth_cookies(response)
    return MessageResponse(message="Déconnexion réussie.")


@router.get("/me", response_model=UserOut, summary="Current authenticated user")
async def me(user: CurrentUser) -> UserOut:
    """Return the profile of the authenticated user."""
    return user_to_out(user)
