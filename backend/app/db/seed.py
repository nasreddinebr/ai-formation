"""Bootstrap seeding: RBAC role catalog and the initial administrator.

Runs idempotently at startup (and from ``python -m app.db.seed``). On a fresh
database the administrator is the very first user, so it naturally receives the
fixed id ``1`` required by the specification.
"""

from __future__ import annotations

import asyncio
import logging

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.constants import ROLE_IDS, ROLE_LEVELS
from app.core.security import hash_password
from app.db.models import Role
from app.db.session import dispose_engine, get_session_factory
from app.repositories.role_repository import RoleRepository
from app.repositories.user_repository import UserRepository

logger = logging.getLogger("app.seed")

# id, name, description (level comes from the shared RBAC constants).
ROLE_SEED: tuple[tuple[str, str], ...] = (
    ("ADMIN", "Administrator — full access to the whole platform"),
    ("CONTRIBUTOR", "Contributor — creates and publishes training courses"),
    ("MODERATOR", "Moderator — moderates users"),
    ("USER", "Authenticated user"),
    ("ANONYMOUS", "Anonymous visitor (public pages only)"),
)


async def ensure_roles(session: AsyncSession) -> None:
    """Create any missing role rows (keyed by their fixed id)."""
    roles = RoleRepository(session)
    for name, description in ROLE_SEED:
        role_id = ROLE_IDS[name]
        if await roles.get_by_id(role_id) is None:
            session.add(
                Role(
                    id=role_id,
                    name=name,
                    level=ROLE_LEVELS[name],
                    description=description,
                )
            )
    await session.flush()


async def ensure_admin(session: AsyncSession) -> bool:
    """Create the default administrator if it does not exist yet.

    Returns ``True`` when a new account was created.
    """
    settings = get_settings()
    users = UserRepository(session)

    if await users.get_by_email(str(settings.admin_email)) is not None:
        return False

    await users.create(
        email=str(settings.admin_email),
        password_hash=hash_password(settings.admin_password),
        role_id=ROLE_IDS["ADMIN"],
        first_name=settings.admin_first_name,
        last_name=settings.admin_last_name,
    )
    logger.warning(
        "Default administrator created: %s (change the password after first login).",
        settings.admin_email,
    )
    return True


async def run_seed(session: AsyncSession) -> dict[str, int]:
    """Seed roles and the administrator, committing once at the end."""
    await ensure_roles(session)
    created_admin = await ensure_admin(session)
    await session.commit()
    return {"roles": len(ROLE_SEED), "admin_created": int(created_admin)}


async def seed_with_retry(*, attempts: int = 10, delay: float = 1.5) -> None:
    """Wait for the schema to be ready, then seed. Resilient to DB cold starts."""
    for attempt in range(1, attempts + 1):
        try:
            factory = get_session_factory()
            async with factory() as session:
                await run_seed(session)
            logger.info("Database seed completed.")
            return
        except Exception as exc:  # noqa: BLE001 - retry on any connection error
            if attempt == attempts:
                logger.error("Database seed failed after %s attempts: %s", attempts, exc)
                raise
            logger.warning("Seed attempt %s/%s failed (%s). Retrying…", attempt, attempts, exc)
            await asyncio.sleep(delay)


async def _main() -> None:
    logging.basicConfig(level=logging.INFO)
    await seed_with_retry()
    await dispose_engine()


if __name__ == "__main__":
    asyncio.run(_main())
