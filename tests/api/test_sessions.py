import pytest
import uuid
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_start_session(client: AsyncClient):
    exam_assignment_id = str(uuid.uuid4())
    payload = {
        "exam_assignment_id": exam_assignment_id,
        "tenant_id": "tenant-1",
        "user_id": "user-1"
    }
    response = await client.post("/api/v1/sessions/start", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "in_progress"
    return data["id"]

@pytest.mark.asyncio
async def test_autosave(client: AsyncClient):
    # Start session
    exam_assignment_id = str(uuid.uuid4())
    payload = {
        "exam_assignment_id": exam_assignment_id,
        "tenant_id": "tenant-1",
        "user_id": "user-1"
    }
    response = await client.post("/api/v1/sessions/start", json=payload)
    session_id = response.json()["id"]

    # Autosave
    question_id = str(uuid.uuid4())
    autosave_payload = {
        "question_id": question_id,
        "code_snippet": "print('hello')",
        "language_id": 71
    }
    response = await client.post(f"/api/v1/sessions/{session_id}/autosave", json=autosave_payload)
    assert response.status_code == 200
    assert response.json()["status"] == "success"

    # Autosave update (existing submission)
    autosave_payload["code_snippet"] = "print('world')"
    response = await client.post(f"/api/v1/sessions/{session_id}/autosave", json=autosave_payload)
    assert response.status_code == 200
    assert response.json()["status"] == "success"

@pytest.mark.asyncio
async def test_submit_exam(client: AsyncClient):
    # Start session
    exam_assignment_id = str(uuid.uuid4())
    payload = {
        "exam_assignment_id": exam_assignment_id,
        "tenant_id": "tenant-1",
        "user_id": "user-1"
    }
    response = await client.post("/api/v1/sessions/start", json=payload)
    session_id = response.json()["id"]

    # Submit exam
    submit_payload = {"force_submit": True}
    response = await client.post(f"/api/v1/sessions/{session_id}/submit", json=submit_payload)
    assert response.status_code == 200
    data = response.json()
    assert "total_score" in data

    # Get results
    response = await client.get(f"/api/v1/sessions/{session_id}/results")
    assert response.status_code == 200
    assert response.json()["total_score"] == data["total_score"]

    # Try submitting again
    response = await client.post(f"/api/v1/sessions/{session_id}/submit", json=submit_payload)
    assert response.status_code == 400

@pytest.mark.asyncio
async def test_errors(client: AsyncClient):
    # Non-existent session
    bad_id = str(uuid.uuid4())
    response = await client.get(f"/api/v1/sessions/{bad_id}")
    assert response.status_code == 404

    # Autosave non-existent
    autosave_payload = {
        "question_id": str(uuid.uuid4()),
        "code_snippet": "print('hello')",
        "language_id": 71
    }
    response = await client.post(f"/api/v1/sessions/{bad_id}/autosave", json=autosave_payload)
    assert response.status_code == 404

    # Results non-existent
    response = await client.get(f"/api/v1/sessions/{bad_id}/results")
    assert response.status_code == 404
