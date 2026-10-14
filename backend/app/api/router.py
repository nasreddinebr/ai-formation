"""Top-level API router aggregating every versioned route module."""

from __future__ import annotations

from fastapi import APIRouter

from app.api.routes import admin, auth, profile, progress

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(profile.router)
api_router.include_router(progress.router)
api_router.include_router(admin.router)
