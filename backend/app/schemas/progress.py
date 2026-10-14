"""Training-progress schemas."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CourseProgressIn(BaseModel):
    """Payload sent when a signed-in user opens a course chapter."""

    model_config = ConfigDict(str_strip_whitespace=True)

    course_id: int = Field(ge=0)
    course_title: str = Field(min_length=1, max_length=255)
    chapter_id: str = Field(min_length=1, max_length=255)
    chapter_title: str = Field(min_length=1, max_length=255)
    chapter_url: str = Field(min_length=1, max_length=512)


class CourseProgressOut(BaseModel):
    """A started course with a deep link back to the last visited chapter."""

    model_config = ConfigDict(from_attributes=True)

    course_id: int
    course_title: str
    chapter_id: str
    chapter_title: str
    chapter_url: str
    last_visited_at: datetime


class DashboardResponse(BaseModel):
    """Everything the dashboard needs."""

    courses: list[CourseProgressOut]
    total_started: int
