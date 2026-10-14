"""Cookie helpers for the auth transport.

Access and refresh tokens live in HttpOnly, Secure (in production) cookies with
``SameSite=Strict`` — the browser never exposes them to JavaScript and they are
not attached to cross-site requests. The CSRF cookie is intentionally *not*
HttpOnly so the double-submit pattern can echo it back in a header.
"""

from __future__ import annotations

from fastapi import Response

from app.core.config import get_settings
from app.core.constants import (
    ACCESS_COOKIE,
    CSRF_COOKIE,
    REFRESH_COOKIE,
    REFRESH_COOKIE_PATH,
)


def _base_kwargs() -> dict[str, object]:
    settings = get_settings()
    return {
        "secure": settings.secure_cookies,
        "samesite": settings.cookie_samesite,
        "domain": settings.cookie_domain,
        "path": "/",
    }


def set_auth_cookies(
    response: Response,
    *,
    access_token: str,
    refresh_token: str,
    csrf_token: str,
) -> None:
    """Attach the full auth cookie set to a response."""
    settings = get_settings()

    response.set_cookie(
        ACCESS_COOKIE,
        access_token,
        max_age=settings.access_token_expire_minutes * 60,
        httponly=True,
        **_base_kwargs(),
    )
    response.set_cookie(
        REFRESH_COOKIE,
        refresh_token,
        max_age=settings.refresh_token_expire_days * 24 * 3600,
        httponly=True,
        path=REFRESH_COOKIE_PATH,
        secure=settings.secure_cookies,
        samesite=settings.cookie_samesite,
        domain=settings.cookie_domain,
    )
    # Readable by the SPA so it can mirror the value into the CSRF header.
    response.set_cookie(
        CSRF_COOKIE,
        csrf_token,
        max_age=settings.refresh_token_expire_days * 24 * 3600,
        httponly=False,
        **_base_kwargs(),
    )


def set_csrf_cookie(response: Response, csrf_token: str) -> None:
    """Attach only the CSRF cookie (used by the bootstrap endpoint)."""
    settings = get_settings()
    response.set_cookie(
        CSRF_COOKIE,
        csrf_token,
        max_age=settings.refresh_token_expire_days * 24 * 3600,
        httponly=False,
        **_base_kwargs(),
    )


def clear_auth_cookies(response: Response) -> None:
    """Expire the session cookies.

    The CSRF cookie is intentionally preserved: it is not bound to the session
    and keeping it lets the SPA log in again immediately (the double-submit
    header stays in sync) without an extra round trip.
    """
    settings = get_settings()
    response.delete_cookie(ACCESS_COOKIE, path="/", domain=settings.cookie_domain)
    response.delete_cookie(
        REFRESH_COOKIE, path=REFRESH_COOKIE_PATH, domain=settings.cookie_domain
    )
