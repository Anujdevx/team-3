import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SessionStartRequest(BaseModel):
    exam_assignment_id: uuid.UUID
    tenant_id: str
    user_id: str

class SessionResponse(BaseModel):
    id: uuid.UUID
    exam_assignment_id: uuid.UUID
    status: str
    start_time: datetime
    end_time: datetime | None = None

    model_config = ConfigDict(from_attributes=True)

class AutosaveRequest(BaseModel):
    question_id: uuid.UUID
    code_snippet: str | None = None
    language_id: int
    autosave_data: dict | None = None

class SubmitExamRequest(BaseModel):
    force_submit: bool = False

class ExamResultResponse(BaseModel):
    session_id: uuid.UUID
    total_score: float
    passed: bool

    model_config = ConfigDict(from_attributes=True)
