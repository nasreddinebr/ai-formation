"""Pytest fixtures: an in-memory SQLite app with seeded roles and admin.

The ASGI transport does not trigger the app lifespan, so the real Postgres
engine is never touched — the schema is created from the ORM metadata and the
``get_session`` dependency is overridden to use a shared in-memory database.
"""

from __future__ import annotations

from collections.abc import AsyncIterator

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker

from app.core.constants import CSRF_COOKIE, CSRF_HEADER
from app.db.base import Base
from app.db.seed import run_seed
from app.db.session import get_session
from app.main import app


@pytest_asyncio.fixture
async def engine() -> AsyncIterator[AsyncEngine]:
    """A fresh in-memory database per test."""
    from sqlalchemy.ext.asyncio import create_async_engine
    from sqlalchemy.pool import StaticPool

    engine = create_async_engine(
        "sqlite+aiosqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    yield engine
    await engine.dispose()


@pytest_asyncio.fixture
async def session_factory(engine: AsyncEngine) -> async_sessionmaker[AsyncSession]:
    return async_sessionmaker(engine, expire_on_commit=False)


@pytest_asyncio.fixture
async def client(
    session_factory: async_sessionmaker[AsyncSession],
) -> AsyncIterator[AsyncClient]:
    async def override_get_session() -> AsyncIterator[AsyncSession]:
        async with session_factory() as session:
            yield session

    app.dependency_overrides[get_session] = override_get_session

    async with session_factory() as session:
        await run_seed(session)

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:

        async def _sync_csrf(response) -> None:  # type: ignore[no-untyped-def]
            token = response.cookies.get(CSRF_COOKIE)
            if token:
                ac.headers[CSRF_HEADER] = token

        ac.event_hooks["response"].append(_sync_csrf)
        await ac.get("/api/auth/csrf")
        yield ac

    app.dependency_overrides.clear()


@pytest.fixture
def admin_credentials() -> dict[str, str]:
    return {"email": "admin@ai-formation.dev", "password": "Admin_Formation_2026!"}
