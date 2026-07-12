import uuid
from datetime import UTC, datetime

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.exams.models.enums import ExamSessionStatus
from src.exams.models.session import AnswerSubmission, ExamSession, ExamSessionResult
from src.exams.schemas.session import AutosaveRequest, SessionStartRequest, SubmitExamRequest


class SessionService:
    @staticmethod
    async def start_session(db_session: AsyncSession, start_req: SessionStartRequest) -> ExamSession:
        exam_session = ExamSession(
            tenant_id=start_req.tenant_id,
            user_id=start_req.user_id,
            exam_assignment_id=start_req.exam_assignment_id,
            status=ExamSessionStatus.IN_PROGRESS,
            start_time=datetime.now(UTC)
        )
        db_session.add(exam_session)
        await db_session.commit()
        await db_session.refresh(exam_session)
        return exam_session

    @staticmethod
    async def get_session(db_session: AsyncSession, session_id: uuid.UUID) -> ExamSession:
        stmt = select(ExamSession).where(ExamSession.id == session_id)
        result = await db_session.exec(stmt)
        exam_session = result.first()
        if not exam_session:
            raise HTTPException(status_code=404, detail="Session not found")
        return exam_session

    @staticmethod
    async def autosave(db_session: AsyncSession, session_id: uuid.UUID, tenant_id: str, autosave_req: AutosaveRequest) -> AnswerSubmission:
        exam_session = await SessionService.get_session(db_session, session_id)
        if exam_session.status != ExamSessionStatus.IN_PROGRESS:
            raise HTTPException(status_code=400, detail="Cannot autosave outside of an active session")

        stmt = select(AnswerSubmission).where(
            AnswerSubmission.session_id == session_id,
            AnswerSubmission.question_id == autosave_req.question_id
        )
        result = await db_session.exec(stmt)
        existing = result.first()

        if existing:
            existing.code_snippet = autosave_req.code_snippet
            existing.language_id = autosave_req.language_id
            existing.autosave_data = autosave_req.autosave_data
            sub = existing
        else:
            sub = AnswerSubmission(
                tenant_id=tenant_id,
                session_id=session_id,
                question_id=autosave_req.question_id,
                code_snippet=autosave_req.code_snippet,
                language_id=autosave_req.language_id,
                autosave_data=autosave_req.autosave_data
            )
            db_session.add(sub)

        await db_session.commit()
        await db_session.refresh(sub)
        return sub

    @staticmethod
    async def submit_exam(db_session: AsyncSession, session_id: uuid.UUID, tenant_id: str, submit_req: SubmitExamRequest) -> ExamSessionResult:
        exam_session = await SessionService.get_session(db_session, session_id)

        if exam_session.status == ExamSessionStatus.COMPLETED:
            raise HTTPException(status_code=400, detail="Exam already submitted")

        exam_session.status = ExamSessionStatus.COMPLETED
        exam_session.end_time = datetime.now(UTC)
        db_session.add(exam_session)

        # Basic dummy scoring for testing purposes
        stmt = select(AnswerSubmission).where(AnswerSubmission.session_id == session_id)
        result = await db_session.exec(stmt)
        submissions = result.all()

        total_score = float(len(submissions) * 10)
        passed = total_score >= 40.0

        exam_result = ExamSessionResult(
            tenant_id=tenant_id,
            session_id=session_id,
            total_score=total_score,
            passed=passed
        )
        db_session.add(exam_result)

        await db_session.commit()
        await db_session.refresh(exam_result)
        return exam_result

    @staticmethod
    async def get_results(db_session: AsyncSession, session_id: uuid.UUID) -> ExamSessionResult:
        stmt = select(ExamSessionResult).where(ExamSessionResult.session_id == session_id)
        result = await db_session.exec(stmt)
        exam_result = result.first()

        if not exam_result:
            raise HTTPException(status_code=404, detail="Results not found")
        return exam_result
