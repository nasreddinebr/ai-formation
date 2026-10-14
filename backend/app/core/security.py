"""Security primitives: password hashing, JWT, refresh & CSRF tokens.

* Passwords are hashed with **Argon2id** (``argon2-cffi``), the winner of the
  Password Hashing Competition — memory-hard and resistant to GPU cracking.
* Access tokens are short-lived RS256-style JWTs (HMAC-SHA256 here) carrying the
  user id, role and RBAC level.
* Refresh tokens are opaque, high-entropy strings. Only their SHA-256 digest is
  persisted, so a database leak cannot be replayed.
* CSRF uses the double-submit cookie pattern.
"""

from __future__ import annotations

import hashlib
import re
import secrets
from datetime import UTC, datetime, timedelta
from typing import Any

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import InvalidHashError, VerificationError, VerifyMismatchError

from app.core.config import get_settings

# Argon2id is selected explicitly. Parameters are tuned for interactive logins
# while remaining comfortable on small VPS instances.
_hasher = PasswordHasher(
    time_cost=3,
    memory_cost=64 * 1024,  # 64 MiB
    parallelism=2,
    hash_len=32,
    salt_len=16,
)

MIN_PASSWORD_LENGTH = 12
_SPECIAL_RE = re.compile(r"[^A-Za-z0-9]")
_UPPER_RE = re.compile(r"[A-Z]")
_LOWER_RE = re.compile(r"[a-z]")
_DIGIT_RE = re.compile(r"\d")


# --------------------------------------------------------------------------- #
# Passwords
# --------------------------------------------------------------------------- #
def hash_password(password: str) -> str:
    """Hash a plaintext password with Argon2id."""
    return _hasher.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    """Verify a password against its Argon2id hash (constant-time)."""
    try:
        _hasher.verify(password_hash, password)
    except (VerifyMismatchError, VerificationError, InvalidHashError):
        return False
    return True


def needs_rehash(password_hash: str) -> bool:
    """True when the stored hash used weaker parameters than the current ones."""
    try:
        return _hasher.check_needs_rehash(password_hash)
    except InvalidHashError:
        return True


def password_policy_violations(password: str) -> list[str]:
    """Return the list of unmet complexity rules (empty when compliant)."""
    violations: list[str] = []
    if len(password) < MIN_PASSWORD_LENGTH:
        violations.append(f"au moins {MIN_PASSWORD_LENGTH} caractères")
    if not _UPPER_RE.search(password):
        violations.append("au moins une lettre majuscule")
    if not _LOWER_RE.search(password):
        violations.append("au moins une lettre minuscule")
    if not _DIGIT_RE.search(password):
        violations.append("au moins un chiffre")
    if not _SPECIAL_RE.search(password):
        violations.append("au moins un caractère spécial")
    return violations


# --------------------------------------------------------------------------- #
# JWT access tokens
# --------------------------------------------------------------------------- #
def create_access_token(
    *,
    subject: int,
    role: str,
    level: int,
    expires_delta: timedelta | None = None,
    extra: dict[str, Any] | None = None,
) -> str:
    """Create a signed, short-lived access token."""
    settings = get_settings()
    now = datetime.now(UTC)
    expire = now + (
        expires_delta or timedelta(minutes=settings.access_token_expire_minutes)
    )
    payload: dict[str, Any] = {
        "sub": str(subject),
        "role": role,
        "lvl": level,
        "type": "access",
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp()),
        "jti": secrets.token_hex(8),
    }
    if extra:
        payload.update(extra)
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> dict[str, Any]:
    """Decode and validate an access token. Raises ``jwt.PyJWTError``."""
    settings = get_settings()
    payload = jwt.decode(
        token,
        settings.jwt_secret_key,
        algorithms=[settings.jwt_algorithm],
        options={"require": ["exp", "sub", "type"]},
    )
    if payload.get("type") != "access":
        raise jwt.InvalidTokenError("Unexpected token type.")
    return payload


# --------------------------------------------------------------------------- #
# Refresh tokens (opaque, stored hashed)
# --------------------------------------------------------------------------- #
def generate_refresh_token() -> tuple[str, str]:
    """Return ``(raw_token, sha256_digest)``."""
    raw = secrets.token_urlsafe(48)
    return raw, sha256_digest(raw)


def sha256_digest(value: str) -> str:
    """Hex SHA-256 digest used to store tokens at rest."""
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def refresh_token_expiry() -> datetime:
    """Naive UTC expiry for a freshly issued refresh token.

    Naive to match the ``timestamp(3)`` (timezone-less) column type used by
    Prisma across the schema.
    """
    settings = get_settings()
    return (datetime.now(UTC) + timedelta(days=settings.refresh_token_expire_days)).replace(
        tzinfo=None
    )


# --------------------------------------------------------------------------- #
# CSRF
# --------------------------------------------------------------------------- #
def generate_csrf_token() -> str:
    """Generate a random double-submit CSRF token."""
    return secrets.token_urlsafe(32)
