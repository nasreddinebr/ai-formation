"""CSRF protection via the double-submit cookie pattern.

Every state-changing request (POST/PUT/PATCH/DELETE) must echo the value of the
non-HttpOnly ``af_csrf`` cookie in the ``X-CSRF-Token`` header. Combined with
``SameSite=Strict`` session cookies this defeats cross-site request forgery
without server-side token storage. An optional Origin check adds defence in
depth when the header is present.
"""

from __future__ import annotations

import hmac

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, Response
from starlette.types import ASGIApp

from app.core.config import get_settings
from app.core.constants import CSRF_COOKIE, CSRF_HEADER

_SAFE_METHODS = {"GET", "HEAD", "OPTIONS", "TRACE"}


class CsrfProtectionMiddleware(BaseHTTPMiddleware):
    """Reject unsafe requests lacking a matching CSRF header."""

    def __init__(self, app: ASGIApp) -> None:
        super().__init__(app)
        self._settings = get_settings()

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        if request.method in _SAFE_METHODS:
            return await call_next(request)

        cookie_token = request.cookies.get(CSRF_COOKIE)
        header_token = request.headers.get(CSRF_HEADER)

        if not cookie_token or not header_token or not hmac.compare_digest(
            cookie_token, header_token
        ):
            return JSONResponse(
                status_code=403,
                content={
                    "detail": {
                        "code": "csrf_failed",
                        "message": "Jeton CSRF manquant ou invalide.",
                    }
                },
            )

        if not self._origin_allowed(request):
            return JSONResponse(
                status_code=403,
                content={
                    "detail": {
                        "code": "origin_rejected",
                        "message": "Origine de la requête refusée.",
                    }
                },
            )

        return await call_next(request)

    def _origin_allowed(self, request: Request) -> bool:
        origin = request.headers.get("origin")
        if not origin:
            return True
        allowed = set(self._settings.cors_origins)
        if origin in allowed:
            return True
        # Same host as the request is always acceptable. Behind the Next.js
        # proxy the original host arrives via X-Forwarded-Host.
        host = request.headers.get("x-forwarded-host") or request.headers.get("host", "")
        return bool(host) and origin.rstrip("/").endswith(host)
