"""Role-based access control with hierarchical inheritance.

Each role owns a set of *direct* permissions. A role's *effective* permissions
are the union of its own permissions and those of every role whose level is
strictly lower. Roles that share a level (e.g. CONTRIBUTOR and MODERATOR) are
parallel branches and do **not** inherit from each other.
"""

from __future__ import annotations

from enum import StrEnum

from app.core.constants import (
    ROLE_ADMIN,
    ROLE_ANONYMOUS,
    ROLE_CONTRIBUTOR,
    ROLE_LEVELS,
    ROLE_MODERATOR,
    ROLE_USER,
)


class Permission(StrEnum):
    """Every capability the platform recognises."""

    # Anonymous
    PUBLIC_CONTENT_READ = "content:read:public"

    # Authenticated user
    PROFILE_READ = "profile:read"
    PROFILE_UPDATE = "profile:update"
    PROGRESS_READ = "progress:read"
    PROGRESS_WRITE = "progress:write"
    DASHBOARD_READ = "dashboard:read"

    # Contributor
    COURSE_CREATE = "course:create"
    COURSE_PUBLISH = "course:publish"

    # Moderator
    USER_READ = "user:read"
    USER_MODERATE = "user:moderate"

    # Administrator
    ADMIN_ACCESS = "admin:access"
    BACKOFFICE_ACCESS = "backoffice:access"
    USER_MANAGE = "user:manage"
    ROLE_MANAGE = "role:manage"


ANONYMOUS_PERMISSIONS = frozenset({Permission.PUBLIC_CONTENT_READ})

USER_PERMISSIONS = frozenset(
    {
        Permission.PROFILE_READ,
        Permission.PROFILE_UPDATE,
        Permission.PROGRESS_READ,
        Permission.PROGRESS_WRITE,
        Permission.DASHBOARD_READ,
    }
)

ROLE_PERMISSIONS: dict[str, frozenset[Permission]] = {
    ROLE_ANONYMOUS: ANONYMOUS_PERMISSIONS,
    ROLE_USER: USER_PERMISSIONS,
    ROLE_CONTRIBUTOR: frozenset({Permission.COURSE_CREATE, Permission.COURSE_PUBLISH}),
    ROLE_MODERATOR: frozenset({Permission.USER_READ, Permission.USER_MODERATE}),
    ROLE_ADMIN: frozenset(
        {
            Permission.ADMIN_ACCESS,
            Permission.BACKOFFICE_ACCESS,
            Permission.USER_MANAGE,
            Permission.ROLE_MANAGE,
        }
    ),
}


def effective_permissions(role_name: str) -> frozenset[Permission]:
    """Return the inherited permission set for a role."""
    own_level = ROLE_LEVELS.get(role_name, 0)
    permissions: set[Permission] = set()
    for name, level in ROLE_LEVELS.items():
        if name == role_name or level < own_level:
            permissions |= ROLE_PERMISSIONS.get(name, frozenset())
    return frozenset(permissions)


def has_permission(role_name: str, permission: Permission) -> bool:
    """True when a role (with inheritance) grants ``permission``."""
    return permission in effective_permissions(role_name)
