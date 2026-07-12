from fastapi import APIRouter, Depends
from sqlmodel import text
from sqlmodel.ext.asyncio.session import AsyncSession

from exams.config import settings
from exams.dependencies import get_db_session
from exams.schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def get_health(
    session: AsyncSession = Depends(get_db_session),
) -> HealthResponse:
    try:
        # Execute a simple query to verify database connection
        await session.execute(text("SELECT 1"))  # pyright: ignore[reportDeprecated]
        db_status = "ok"
        status = "ok"
    except Exception:
        db_status = "error"
        status = "error"

    return HealthResponse(
        status=status,
        version=settings.VERSION,
        database=db_status,
    )
