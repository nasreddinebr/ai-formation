"""Domain exceptions and their HTTP translation.

Services raise these typed errors; a single set of handlers in ``main`` maps
them to clean JSON responses. Internal details (stack traces, database errors)
never reach the client — only a stable code and a human message.
"""

from __future__ import annotations


class AppError(Exception):
    """Base class for expected, client-safe application errors."""

    status_code: int = 400
    code: str = "bad_request"

    def __init__(self, message: str, *, code: str | None = None) -> None:
        super().__init__(message)
        self.message = message
        if code:
            self.code = code


class ValidationError(AppError):
    status_code = 422
    code = "validation_error"


class AuthenticationError(AppError):
    status_code = 401
    code = "authentication_error"


class PermissionDeniedError(AppError):
    status_code = 403
    code = "permission_denied"


class NotFoundError(AppError):
    status_code = 404
    code = "not_found"


class ConflictError(AppError):
    status_code = 409
    code = "conflict"


class RateLimitError(AppError):
    status_code = 429
    code = "rate_limited"
