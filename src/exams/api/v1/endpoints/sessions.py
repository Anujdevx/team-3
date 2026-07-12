import uuid

from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from exams.dependencies import get_db_session
from src.exams.schemas.session import (
    AutosaveRequest,
    ExamResultResponse,
    SessionResponse,
    SessionStartRequest,
    SubmitExamRequest,
)
from src.exams.services.session import SessionService

router = APIRouter()

@router.post("/start", response_model=SessionResponse)
async def start_session(
    start_req: SessionStartRequest,
    db: AsyncSession = Depends(get_db_session)
):
    session = await SessionService.start_session(db, start_req)
    return session

@router.get("/{session_id}", response_model=SessionResponse)
async def get_session(
    session_id: uuid.UUID,
    db: AsyncSession = Depends(get_db_session)
):
    session = await SessionService.get_session(db, session_id)
    return session

@router.post("/{session_id}/autosave")
async def autosave(
    session_id: uuid.UUID,
    autosave_req: AutosaveRequest,
    tenant_id: str = "tenant-1",
    db: AsyncSession = Depends(get_db_session)
):
    sub = await SessionService.autosave(db, session_id, tenant_id, autosave_req)
    return {"status": "success", "submission_id": sub.id}

@router.post("/{session_id}/submit", response_model=ExamResultResponse)
async def submit_exam(
    session_id: uuid.UUID,
    submit_req: SubmitExamRequest,
    tenant_id: str = "tenant-1",
    db: AsyncSession = Depends(get_db_session)
):
    result = await SessionService.submit_exam(db, session_id, tenant_id, submit_req)
    return result

@router.get("/{session_id}/results", response_model=ExamResultResponse)
async def get_results(
    session_id: uuid.UUID,
    db: AsyncSession = Depends(get_db_session)
):
    result = await SessionService.get_results(db, session_id)
    return result
