import pytest
import uuid
from sqlmodel.ext.asyncio.session import AsyncSession
from src.exams.schemas.session import SessionStartRequest, AutosaveRequest, SubmitExamRequest
from src.exams.services.session import SessionService
from fastapi import HTTPException

@pytest.mark.asyncio
async def test_session_service(db_session: AsyncSession):
    # Start
    start_req = SessionStartRequest(
        exam_assignment_id=uuid.uuid4(),
        tenant_id="tenant-1",
        user_id="user-1"
    )
    session = await SessionService.start_session(db_session, start_req)
    assert session.id is not None

    # Get
    fetched = await SessionService.get_session(db_session, session.id)
    assert fetched.id == session.id

    # Autosave
    autosave_req = AutosaveRequest(
        question_id=uuid.uuid4(),
        code_snippet="test",
        language_id=1
    )
    sub1 = await SessionService.autosave(db_session, session.id, "tenant-1", autosave_req)
    assert sub1.code_snippet == "test"

    # Autosave again
    autosave_req.code_snippet = "test2"
    sub2 = await SessionService.autosave(db_session, session.id, "tenant-1", autosave_req)
    assert sub2.code_snippet == "test2"

    # Submit
    submit_req = SubmitExamRequest(force_submit=True)
    res = await SessionService.submit_exam(db_session, session.id, "tenant-1", submit_req)
    assert res.total_score >= 0

    # Get results
    res_fetched = await SessionService.get_results(db_session, session.id)
    assert res_fetched.total_score == res.total_score

    # Errors
    try:
        await SessionService.get_session(db_session, uuid.uuid4())
    except HTTPException:
        pass

    try:
        await SessionService.submit_exam(db_session, session.id, "tenant-1", submit_req)
    except HTTPException:
        pass
