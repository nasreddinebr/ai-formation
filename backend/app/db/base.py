"""SQLAlchemy declarative base and shared timestamp helper."""

from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Declarative base for every ORM model."""


def utcnow() -> datetime:
    """Naive UTC timestamp, matching Prisma's ``timestamp(3)`` columns."""
    return datetime.now(UTC).replace(tzinfo=None)
