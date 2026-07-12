import uuid
from datetime import UTC, datetime
from typing import Any

from sqlalchemy import JSON, Column
from sqlalchemy.dialects.postgresql import ENUM as PG_ENUM
from sqlmodel import Field, SQLModel

from src.exams.models.enums import ExamSessionStatus


class ExamSession(SQLModel, table=True):
    __tablename__ = "exam_sessions"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    tenant_id: str = Field(max_length=255, index=True)
    user_id: str = Field(max_length=255, index=True)
    exam_assignment_id: uuid.UUID = Field(index=True)
    start_time: datetime = Field(default_factory=lambda: datetime.now(UTC))
    end_time: datetime | None = None
    status: ExamSessionStatus = Field(sa_column=Column(PG_ENUM(ExamSessionStatus, name="exam_session_status", create_type=False), nullable=False))

class AnswerSubmission(SQLModel, table=True):
    __tablename__ = "answers_submissions"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    tenant_id: str = Field(max_length=255, index=True)
    session_id: uuid.UUID = Field(foreign_key="exam_sessions.id", index=True)
    question_id: uuid.UUID = Field(index=True)
    code_snippet: str | None = None
    language_id: int
    autosave_data: Any | None = Field(default=None, sa_column=Column(JSON))

class ExamSessionResult(SQLModel, table=True):
    __tablename__ = "exam_sessions_results"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    tenant_id: str = Field(max_length=255, index=True)
    session_id: uuid.UUID = Field(foreign_key="exam_sessions.id", unique=True)
    total_score: float
    passed: bool
