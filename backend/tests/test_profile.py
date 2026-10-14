"""Profile ("My Information") tests: read, update, change password."""

from __future__ import annotations

import pytest
from httpx import AsyncClient

from app.core.constants import CSRF_HEADER
from tests.test_auth import VALID_PASSWORD, register

NEW_PASSWORD = "An0ther-Passw0rd!"


async def _reload_csrf(client: AsyncClient) -> None:
    """Re-bootstrap the CSRF header (needed after the cookies are cleared)."""
    del client.headers[CSRF_HEADER]
    await client.get("/api/auth/csrf")


@pytest.mark.asyncio
async def test_read_my_information(client: AsyncClient) -> None:
    await register(client, email="profile@example.com", first_name="Grace")
    response = await client.get("/api/profile")
    assert response.status_code == 200
    assert response.json()["first_name"] == "Grace"


@pytest.mark.asyncio
async def test_update_profile_fields(client: AsyncClient) -> None:
    await register(client, email="update@example.com")
    response = await client.patch(
        "/api/profile",
        json={"first_name": "Alan", "last_name": "Turing", "phone": "+33 6 12 34 56 78"},
    )
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["first_name"] == "Alan"
    assert body["last_name"] == "Turing"
    assert body["phone"] == "+33 6 12 34 56 78"


@pytest.mark.asyncio
async def test_email_is_immutable(client: AsyncClient) -> None:
    await register(client, email="immutable@example.com")
    response = await client.patch(
        "/api/profile",
        json={"email": "hacker@example.com", "first_name": "Safe"},
    )
    assert response.status_code == 200
    assert response.json()["email"] == "immutable@example.com"


@pytest.mark.asyncio
async def test_change_password_requires_current(client: AsyncClient) -> None:
    await register(client, email="pw@example.com")
    response = await client.post(
        "/api/profile/password",
        json={
            "current_password": "Wr0ng-Current!",
            "new_password": NEW_PASSWORD,
            "confirmed_password": NEW_PASSWORD,
        },
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_change_password_then_login_with_new_one(client: AsyncClient) -> None:
    email = "change@example.com"
    await register(client, email=email)

    response = await client.post(
        "/api/profile/password",
        json={
            "current_password": VALID_PASSWORD,
            "new_password": NEW_PASSWORD,
            "confirmed_password": NEW_PASSWORD,
        },
    )
    assert response.status_code == 200, response.text

    # The session was invalidated.
    assert (await client.get("/api/profile")).status_code == 401

    await _reload_csrf(client)
    login = await client.post(
        "/api/auth/login", json={"email": email, "password": NEW_PASSWORD}
    )
    assert login.status_code == 200, login.text
