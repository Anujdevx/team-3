from fastapi import APIRouter

from exams.api.v1.endpoints import health
from src.exams.api.v1.endpoints import sessions

router = APIRouter()
router.include_router(health.router, tags=["Health"])
router.include_router(sessions.router, prefix="/sessions", tags=["Exam Sessions"])
