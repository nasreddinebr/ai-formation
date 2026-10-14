"""Application configuration.

All settings are sourced from environment variables (optionally via a local
``.env`` file) so the same image runs unchanged across environments. The
``DATABASE_URL`` variable is shared with the Next.js/Prisma pipeline; it is
normalised here to the async SQLAlchemy driver.
"""

from __future__ import annotations

import secrets
from functools import lru_cache
from typing import Annotated, Literal
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from pydantic import EmailStr, Field, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict

Environment = Literal["development", "test", "production"]


class Settings(BaseSettings):
    """Runtime settings for the API."""

    model_config = SettingsConfigDict(
        env_file=(".env", "backend/.env"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    # --- Application -------------------------------------------------------
    app_name: str = "ai-formation-api"
    environment: Environment = "development"
    api_prefix: str = "/api"
    docs_enabled: bool = True

    # --- Database ----------------------------------------------------------
    # Shared with Prisma. Converted to the async driver automatically.
    database_url: str = (
        "postgresql+asyncpg://ai_formation:ai_formation_dev@localhost:5432/ai_formation"
    )
    # Create missing tables at startup. Handy in development; disable in
    # production where Prisma migrations own the schema.
    auto_create_schema: bool = True

    # --- Security ----------------------------------------------------------
    jwt_secret_key: str = ""
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 15
    refresh_token_expire_days: int = 14

    # Cookie transport. ``None`` derives a safe default from the environment.
    cookie_secure: bool | None = None
    cookie_domain: str | None = None
    cookie_samesite: Literal["strict", "lax", "none"] = "strict"

    # Extra allowed origins for CORS (the Next.js app normally proxies instead).
    # ``NoDecode`` keeps pydantic-settings from trying to JSON-parse the env
    # value, so a plain comma-separated string is accepted (see validator).
    cors_origins: Annotated[list[str], NoDecode] = Field(
        default_factory=lambda: ["http://localhost:3000"]
    )

    # --- Bootstrap administrator ------------------------------------------
    seed_on_startup: bool = True
    admin_email: EmailStr = "admin@ai-formation.dev"
    admin_password: str = "Admin_Formation_2026!"
    admin_first_name: str = "Platform"
    admin_last_name: str = "Administrator"

    # ------------------------------------------------------------------ #
    # Validators
    # ------------------------------------------------------------------ #
    @field_validator("database_url", mode="after")
    @classmethod
    def _normalise_database_url(cls, value: str) -> str:
        """Force the asyncpg driver so a Prisma-style URL still works."""
        if value.startswith("postgres://"):
            value = "postgresql://" + value[len("postgres://") :]
        if value.startswith("postgresql://"):
            value = "postgresql+asyncpg://" + value[len("postgresql://") :]
        # Prisma appends ``?schema=public``; asyncpg has no such connect arg.
        parts = urlsplit(value)
        if parts.query:
            kept = [(k, v) for k, v in parse_qsl(parts.query) if k != "schema"]
            value = urlunsplit(
                (parts.scheme, parts.netloc, parts.path, urlencode(kept), parts.fragment)
            )
        return value

    @field_validator("cors_origins", mode="before")
    @classmethod
    def _split_origins(cls, value: object) -> object:
        if isinstance(value, str):
            stripped = value.strip()
            if not stripped:
                return []
            if stripped.startswith("["):
                return value
            return [origin.strip() for origin in stripped.split(",") if origin.strip()]
        return value

    @field_validator("jwt_secret_key", mode="after")
    @classmethod
    def _ensure_secret(cls, value: str, info) -> str:
        if value:
            return value
        # Never invent a secret in production: fail loudly instead.
        if info.data.get("environment") == "production":
            raise ValueError(
                "JWT_SECRET_KEY must be set in production (>= 32 random characters)."
            )
        return secrets.token_urlsafe(48)

    # ------------------------------------------------------------------ #
    # Derived properties
    # ------------------------------------------------------------------ #
    @property
    def is_production(self) -> bool:
        return self.environment == "production"

    @property
    def secure_cookies(self) -> bool:
        if self.cookie_secure is not None:
            return self.cookie_secure
        return self.is_production


@lru_cache
def get_settings() -> Settings:
    """Return the cached application settings."""
    return Settings()
