"""User and role response/request schemas."""

from __future__ import annotations

from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, field_validator


class RoleOut(BaseModel):
    """Public representation of a role."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    level: int


class UserOut(BaseModel):
    """Public representation of an account (never exposes the hash)."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    first_name: str | None = None
    last_name: str | None = None
    phone: str | None = None
    role: RoleOut
    is_active: bool
    created_at: datetime

    # Effective (inherited) permissions, filled by the API layer.
    permissions: list[str] = Field(default_factory=list)


NameField = Annotated[str, Field(min_length=1, max_length=120)]
PhoneField = Annotated[str, Field(min_length=3, max_length=40)]


class UserProfileUpdate(BaseModel):
    """Editable profile fields. Email is intentionally absent (immutable)."""

    first_name: NameField | None = None
    last_name: NameField | None = None
    phone: PhoneField | None = None

    @field_validator("first_name", "last_name", "phone", mode="before")
    @classmethod
    def _blank_to_none(cls, value: object) -> object:
        if isinstance(value, str):
            value = value.strip()
            return value or None
        return value


class RoleUpdateRequest(BaseModel):
    """Back-office role assignment payload."""

    model_config = ConfigDict(str_strip_whitespace=True)

    role: str = Field(min_length=2, max_length=64)


class UserStatusUpdate(BaseModel):
    """Back-office account activation payload."""

    is_active: bool
