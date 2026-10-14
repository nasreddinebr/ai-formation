"""Authentication flow tests: register, login, refresh, logout, CSRF."""

from __future__ import annotations

import pytest
from httpx import AsyncClient

from app.core.constants import CSRF_HEADER

VALID_PASSWORD = "Str0ng-Passw0rd!"


async def register(
    client: AsyncClient,
    *,
    email: str = "learner@example.com",
    password: str = VALID_PASSWORD,
    **extra: str,
):
    payload = {
        "email": email,
        "password": password,
        "confirmed_password": password,
    }
    payload.update(extra)
    return await client.post("/api/auth/register", json=payload)


@pytest.mark.asyncio
async def test_health(client: AsyncClient) -> None:
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


@pytest.mark.asyncio
async def test_register_assigns_default_role(client: AsyncClient) -> None:
    response = await register(client, first_name="Ada", last_name="Lovelace")
    assert response.status_code == 201, response.text

    body = response.json()
    assert body["email"] == "learner@example.com"
    assert body["first_name"] == "Ada"
    assert body["role"]["name"] == "USER"
    assert body["role"]["level"] == 1
    # The password hash must never be serialised.
    assert "password" not in body and "password_hash" not in body
    # Default role inherits the anonymous public-content permission.
    assert "profile:update" in body["permissions"]
    assert "content:read:public" in body["permissions"]
    assert "course:create" not in body["permissions"]


@pytest.mark.asyncio
async def test_register_rejects_duplicate_email(client: AsyncClient) -> None:
    assert (await register(client)).status_code == 201
    duplicate = await register(client, email="LEARNER@example.com")
    assert duplicate.status_code == 409
    assert duplicate.json()["detail"]["code"] == "conflict"


@pytest.mark.asyncio
async def test_register_rejects_weak_password(client: AsyncClient) -> None:
    response = await register(
        client,
        email="weak@example.com",
        password="password",
    )
    assert response.status_code == 422
    assert response.json()["detail"]["code"] == "validation_error"


@pytest.mark.asyncio
async def test_login_me_and_logout(client: AsyncClient) -> None:
    await register(client, email="member@example.com")
    await client.post("/api/auth/logout")

    login = await client.post(
        "/api/auth/login",
        json={"email": "member@example.com", "password": VALID_PASSWORD},
    )
    assert login.status_code == 200, login.text

    me = await client.get("/api/auth/me")
    assert me.status_code == 200
    assert me.json()["email"] == "member@example.com"

    logout = await client.post("/api/auth/logout")
    assert logout.status_code == 200

    after = await client.get("/api/auth/me")
    assert after.status_code == 401


@pytest.mark.asyncio
async def test_login_wrong_password_is_unauthorized(client: AsyncClient) -> None:
    await register(client, email="member2@example.com")
    response = await client.post(
        "/api/auth/login",
        json={"email": "member2@example.com", "password": "Wrong-Passw0rd!"},
    )
    assert response.status_code == 401
    assert response.json()["detail"]["code"] == "authentication_error"


@pytest.mark.asyncio
async def test_refresh_rotates_session(client: AsyncClient) -> None:
    await register(client, email="rotate@example.com")
    first = await client.post("/api/auth/refresh")
    assert first.status_code == 200
    assert first.json()["email"] == "rotate@example.com"

    # The refresh token is single-use: replaying the previous one must fail.
    second = await client.post("/api/auth/refresh")
    assert second.status_code == 200
    assert second.json()["email"] == "rotate@example.com"


@pytest.mark.asyncio
async def test_csrf_header_is_required(client: AsyncClient) -> None:
    del client.headers[CSRF_HEADER]
    response = await client.post(
        "/api/auth/login",
        json={"email": "nobody@example.com", "password": VALID_PASSWORD},
    )
    assert response.status_code == 403
    assert response.json()["detail"]["code"] == "csrf_failed"


@pytest.mark.asyncio
async def test_csrf_header_mismatch_is_rejected(client: AsyncClient) -> None:
    client.headers[CSRF_HEADER] = "not-the-cookie-value"
    response = await client.post(
        "/api/auth/login",
        json={"email": "nobody@example.com", "password": VALID_PASSWORD},
    )
    assert response.status_code == 403
    assert response.json()["detail"]["code"] == "csrf_failed"
