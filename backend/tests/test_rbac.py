"""RBAC tests: inheritance rules and endpoint enforcement."""

from __future__ import annotations

import pytest
from httpx import AsyncClient

from app.rbac.permissions import Permission, effective_permissions
from tests.test_auth import VALID_PASSWORD, register


def test_role_permission_inheritance() -> None:
    admin = effective_permissions("ADMIN")
    contributor = effective_permissions("CONTRIBUTOR")
    moderator = effective_permissions("MODERATOR")
    user = effective_permissions("USER")
    anonymous = effective_permissions("ANONYMOUS")

    # The administrator inherits every lower branch (levels 0, 1 and 2).
    assert Permission.ADMIN_ACCESS in admin
    assert Permission.COURSE_CREATE in admin
    assert Permission.USER_MODERATE in admin
    assert Permission.PROFILE_UPDATE in admin
    assert Permission.PUBLIC_CONTENT_READ in admin

    # Parallel roles (same level 2) do not inherit from each other.
    assert Permission.USER_MODERATE not in contributor
    assert Permission.COURSE_CREATE not in moderator

    # A contributor still inherits the user and anonymous capabilities.
    assert Permission.PROFILE_READ in contributor
    assert Permission.PUBLIC_CONTENT_READ in contributor

    # A plain user never reaches contributor capabilities.
    assert Permission.COURSE_CREATE not in user
    assert Permission.DASHBOARD_READ in user

    # Anonymous is limited to public content.
    assert anonymous == frozenset({Permission.PUBLIC_CONTENT_READ})


@pytest.mark.asyncio
async def test_admin_endpoints_require_permission(client: AsyncClient) -> None:
    await register(client, email="plain@example.com")

    forbidden = await client.get("/api/admin/users")
    assert forbidden.status_code == 403
    assert forbidden.json()["detail"]["code"] == "permission_denied"

    forbidden_backoffice = await client.get("/api/admin/permissions")
    assert forbidden_backoffice.status_code == 403


@pytest.mark.asyncio
async def test_default_admin_has_fixed_id_and_full_access(
    client: AsyncClient, admin_credentials: dict[str, str]
) -> None:
    login = await client.post("/api/auth/login", json=admin_credentials)
    assert login.status_code == 200, login.text
    # The seeded administrator is the very first user → id 1.
    assert login.json()["id"] == 1
    assert login.json()["role"]["name"] == "ADMIN"

    listing = await client.get("/api/admin/users")
    assert listing.status_code == 200
    assert any(u["email"] == admin_credentials["email"] for u in listing.json())

    permissions = await client.get("/api/admin/permissions")
    assert permissions.status_code == 200
    assert "admin:access" in permissions.json()["permissions"]
    assert "course:create" in permissions.json()["permissions"]


@pytest.mark.asyncio
async def test_admin_can_assign_roles(
    client: AsyncClient, admin_credentials: dict[str, str]
) -> None:
    created = await register(client, email="promote@example.com")
    user_id = created.json()["id"]

    await client.post("/api/auth/logout")
    assert (await client.post("/api/auth/login", json=admin_credentials)).status_code == 200

    promote = await client.patch(
        f"/api/admin/users/{user_id}/role", json={"role": "MODERATOR"}
    )
    assert promote.status_code == 200, promote.text
    assert promote.json()["role"]["name"] == "MODERATOR"
    assert "user:moderate" in promote.json()["permissions"]


@pytest.mark.asyncio
async def test_login_with_admin_password_fixture_is_valid(client: AsyncClient) -> None:
    response = await client.post(
        "/api/auth/login",
        json={"email": "admin@ai-formation.dev", "password": VALID_PASSWORD},
    )
    # Wrong password → unauthorized (sanity check that seeding used the env password).
    assert response.status_code == 401
