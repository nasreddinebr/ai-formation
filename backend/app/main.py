"""FastAPI application entry point.

Wires configuration, middleware, exception handling, middleware and the
versioned API router. Run with ``uvicorn app.main:app``.
"""

from __future__ import annotations

import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app import __version__
from app.api.router import api_router
from app.core.config import get_settings
from app.core.constants import CSRF_HEADER
from app.core.errors import AppError
from app.db.base import Base
from app.db.seed import seed_with_retry
from app.db.session import dispose_engine, get_engine
from app.middleware.csrf import CsrfProtectionMiddleware
from app.middleware.security_headers import SecurityHeadersMiddleware

logger = logging.getLogger("app")


def _configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s :: %(message)s",
    )


async def _create_schema() -> None:
    """Create missing tables from the ORM metadata (development convenience)."""
    engine = get_engine()
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    logger.info("Schema ensured (create_all, checkfirst=True).")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Initialise the database schema and seed data on startup."""
    _configure_logging()
    settings = get_settings()

    if settings.auto_create_schema:
        try:
            await _create_schema()
        except Exception as exc:  # noqa: BLE001
            logger.warning("Automatic schema creation skipped: %s", exc)

    if settings.seed_on_startup:
        await seed_with_retry()

    logger.info("%s v%s ready (env=%s).", settings.app_name, __version__, settings.environment)
    try:
        yield
    finally:
        await dispose_engine()


def create_app() -> FastAPI:
    """Application factory."""
    settings = get_settings()

    app = FastAPI(
        title="ai-formation API",
        description=(
            "Back office for the ai-formation platform: authentication, "
            "hierarchical RBAC, user profiles and the training dashboard."
        ),
        version=__version__,
        docs_url="/docs" if settings.docs_enabled else None,
        redoc_url="/redoc" if settings.docs_enabled else None,
        openapi_url="/openapi.json" if settings.docs_enabled else None,
        lifespan=lifespan,
    )

    # --- Middleware (last added = outermost) ---------------------------
    app.add_middleware(CsrfProtectionMiddleware)
    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization", CSRF_HEADER],
        expose_headers=["Set-Cookie"],
    )

    # --- Exception handlers -------------------------------------------
    @app.exception_handler(AppError)
    async def _app_error_handler(_: Request, exc: AppError) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": {"code": exc.code, "message": exc.message}},
        )

    @app.exception_handler(RequestValidationError)
    async def _validation_handler(
        _: Request, exc: RequestValidationError
    ) -> JSONResponse:
        # Only field location + message are echoed: never the submitted input.
        fields = [
            {
                "loc": ".".join(str(part) for part in error.get("loc", ())),
                "msg": error.get("msg", "Valeur invalide."),
            }
            for error in exc.errors()
        ]
        return JSONResponse(
            status_code=422,
            content={
                "detail": {
                    "code": "validation_error",
                    "message": "Données invalides.",
                    "fields": fields,
                }
            },
        )

    @app.exception_handler(StarletteHTTPException)
    async def _http_error_handler(
        _: Request, exc: StarletteHTTPException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "detail": {
                    "code": "http_error",
                    "message": str(exc.detail) or "Requête invalide.",
                }
            },
        )

    @app.exception_handler(Exception)
    async def _unhandled_handler(_: Request, exc: Exception) -> JSONResponse:
        logger.exception("Unhandled error: %s", exc)
        return JSONResponse(
            status_code=500,
            content={
                "detail": {
                    "code": "internal_error",
                    "message": "Une erreur interne est survenue.",
                }
            },
        )

    # --- Routes --------------------------------------------------------
    app.include_router(api_router, prefix=settings.api_prefix)

    @app.get("/health", tags=["System"], summary="Liveness probe")
    async def health() -> dict[str, str]:
        return {"status": "ok", "service": settings.app_name, "version": __version__}

    @app.get("/", include_in_schema=False)
    async def root() -> dict[str, str]:
        return {"service": settings.app_name, "docs": "/docs", "health": "/health"}

    return app


app = create_app()
