"""Shared constants: cookie names, role identifiers and RBAC levels."""

from __future__ import annotations

# --- Cookie / header names -------------------------------------------------
ACCESS_COOKIE = "af_access"
REFRESH_COOKIE = "af_refresh"
CSRF_COOKIE = "af_csrf"
CSRF_HEADER = "x-csrf-token"

# Refresh cookie path. Kept at "/" so it is also sent when the SPA reaches the
# API through the Next.js `/backend` proxy prefix; the cookie is still HttpOnly
# and SameSite=Strict.
REFRESH_COOKIE_PATH = "/"

# --- Roles -----------------------------------------------------------------
ROLE_ADMIN = "ADMIN"
ROLE_CONTRIBUTOR = "CONTRIBUTOR"
ROLE_MODERATOR = "MODERATOR"
ROLE_USER = "USER"
ROLE_ANONYMOUS = "ANONYMOUS"

# Fixed ids from the RBAC catalog (see prisma migration).
ROLE_IDS: dict[str, int] = {
    ROLE_ADMIN: 1,
    ROLE_CONTRIBUTOR: 2,
    ROLE_MODERATOR: 3,
    ROLE_USER: 4,
    ROLE_ANONYMOUS: 5,
}

DEFAULT_ROLE_ID = ROLE_IDS[ROLE_USER]

# Inheritance levels: a role inherits the permissions of roles with a strictly
# lower level. Parallel roles (same level) never inherit from each other.
ROLE_LEVELS: dict[str, int] = {
    ROLE_ANONYMOUS: 0,
    ROLE_USER: 1,
    ROLE_CONTRIBUTOR: 2,
    ROLE_MODERATOR: 2,
    ROLE_ADMIN: 3,
}
