"""Configuration parsing tests.

These guard the environment handling that the containers rely on: a plain
comma-separated ``CORS_ORIGINS`` string, a Prisma-style ``DATABASE_URL`` with a
``?schema=public`` query parameter, and the production secret policy.
"""

from __future__ import annotations

import pytest
from pydantic import ValidationError

from app.core.config import Settings


def test_cors_origins_accepts_comma_separated_env(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("CORS_ORIGINS", "http://localhost:3000, https://ai-formation.dev")

    settings = Settings()

    assert settings.cors_origins == [
        "http://localhost:3000",
        "https://ai-formation.dev",
    ]


def test_cors_origins_empty_env_yields_no_origins(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("CORS_ORIGINS", "")

    assert Settings().cors_origins == []


def test_database_url_is_normalised_for_asyncpg(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv(
        "DATABASE_URL",
        "postgresql://user:pwd@db:5432/ai_formation?schema=public",
    )

    url = Settings().database_url

    assert url.startswith("postgresql+asyncpg://")
    assert "schema=" not in url
    assert url.endswith("/ai_formation")


def test_database_url_keeps_other_query_params(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv(
        "DATABASE_URL",
        "postgresql://user:pwd@db:5432/ai_formation?schema=public&ssl=require",
    )

    url = Settings().database_url

    assert "ssl=require" in url
    assert "schema=" not in url


def test_jwt_secret_is_generated_in_development(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("ENVIRONMENT", "development")
    monkeypatch.setenv("JWT_SECRET_KEY", "")

    assert len(Settings().jwt_secret_key) >= 32


def test_jwt_secret_is_required_in_production(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("ENVIRONMENT", "production")
    monkeypatch.delenv("JWT_SECRET_KEY", raising=False)

    with pytest.raises(ValidationError):
        Settings()
