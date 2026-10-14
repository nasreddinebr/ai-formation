"""Training dashboard tests: record a chapter visit and list started courses."""

from __future__ import annotations

import pytest
from httpx import AsyncClient

from tests.test_auth import register

COURSE = {
    "course_id": 1,
    "course_title": "Fondamentaux de l'IA",
    "chapter_id": "intro",
    "chapter_title": "Introduction",
    "chapter_url": "/module/1/chapter/intro",
}


@pytest.mark.asyncio
async def test_dashboard_starts_empty(client: AsyncClient) -> None:
    await register(client, email="dash@example.com")
    response = await client.get("/api/progress")
    assert response.status_code == 200
    assert response.json() == {"courses": [], "total_started": 0}


@pytest.mark.asyncio
async def test_record_visit_appears_on_dashboard(client: AsyncClient) -> None:
    await register(client, email="dash2@example.com")

    recorded = await client.put("/api/progress/1", json=COURSE)
    assert recorded.status_code == 200, recorded.text
    assert recorded.json()["course_title"] == "Fondamentaux de l'IA"

    dashboard = await client.get("/api/progress")
    body = dashboard.json()
    assert body["total_started"] == 1
    assert body["courses"][0]["chapter_id"] == "intro"


@pytest.mark.asyncio
async def test_record_visit_is_idempotent_upsert(client: AsyncClient) -> None:
    await register(client, email="dash3@example.com")
    await client.put("/api/progress/1", json=COURSE)
    await client.put(
        "/api/progress/1",
        json={**COURSE, "chapter_id": "chapter-2", "chapter_title": "Chapitre 2"},
    )

    dashboard = (await client.get("/api/progress")).json()
    assert dashboard["total_started"] == 1
    assert dashboard["courses"][0]["chapter_id"] == "chapter-2"


@pytest.mark.asyncio
async def test_remove_course_from_dashboard(client: AsyncClient) -> None:
    await register(client, email="dash4@example.com")
    await client.put("/api/progress/1", json=COURSE)

    removed = await client.delete("/api/progress/1")
    assert removed.status_code == 200

    dashboard = (await client.get("/api/progress")).json()
    assert dashboard["total_started"] == 0


@pytest.mark.asyncio
async def test_progress_requires_authentication(client: AsyncClient) -> None:
    await register(client, email="dash5@example.com")
    await client.post("/api/auth/logout")
    assert (await client.get("/api/progress")).status_code == 401
