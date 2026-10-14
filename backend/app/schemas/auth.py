"""Authentication request schemas with strict validation."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.core.security import password_policy_violations


def _validate_strength(password: str) -> str:
    violations = password_policy_violations(password)
    if violations:
        raise ValueError("Mot de passe trop faible : " + ", ".join(violations) + ".")
    return password


class MessageResponse(BaseModel):
    """Simple acknowledgement payload."""

    message: str


class RegisterRequest(BaseModel):
    """Self-service sign-up payload."""

    model_config = ConfigDict(str_strip_whitespace=True)

    email: EmailStr
    password: str = Field(min_length=12, max_length=128)
    confirmed_password: str = Field(min_length=12, max_length=128)
    first_name: str | None = Field(default=None, max_length=120)
    last_name: str | None = Field(default=None, max_length=120)
    phone: str | None = Field(default=None, max_length=40)

    @field_validator("password")
    @classmethod
    def _strong_password(cls, value: str) -> str:
        return _validate_strength(value)

    @field_validator("confirmed_password")
    @classmethod
    def _passwords_match(cls, value: str, info) -> str:
        if value != info.data.get("password"):
            raise ValueError("Les mots de passe ne correspondent pas.")
        return value

    @field_validator("first_name", "last_name", "phone", mode="before")
    @classmethod
    def _blank_to_none(cls, value: object) -> object:
        if isinstance(value, str):
            value = value.strip()
            return value or None
        return value


class LoginRequest(BaseModel):
    """Credential login payload."""

    model_config = ConfigDict(str_strip_whitespace=True)

    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class ChangePasswordRequest(BaseModel):
    """Authenticated password change: requires the current password."""

    current_password: str = Field(min_length=1, max_length=128)
    new_password: str = Field(min_length=12, max_length=128)
    confirmed_password: str = Field(min_length=12, max_length=128)

    @field_validator("new_password")
    @classmethod
    def _strong_password(cls, value: str) -> str:
        return _validate_strength(value)

    @field_validator("confirmed_password")
    @classmethod
    def _passwords_match(cls, value: str, info) -> str:
        if value != info.data.get("new_password"):
            raise ValueError("Les mots de passe ne correspondent pas.")
        return value
