import time
import uuid
from collections.abc import AsyncGenerator, Callable, Coroutine
from contextlib import asynccontextmanager
from typing import Any

import structlog
from fastapi import FastAPI, Request, Response
from structlog.contextvars import bind_contextvars, clear_contextvars
from xebia_core.database import create_db_engine, dispose_db_engine
from xebia_core.logging import configure_logging

from exams.api.v1.router import router as v1_router
from exams.config import settings

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # Configure logging on startup
    configure_logging(
        service_name="exams-service",
        version=settings.VERSION,
        json_logs=settings.ENV != "local",
    )
    logger.info("Application starting up")
    if settings.DATABASE_URL:
        create_db_engine(settings.DATABASE_URL)
    yield
    await dispose_db_engine()
    logger.info("Application shutting down")


def create_application() -> FastAPI:
    application = FastAPI(
        title="Taking the Exam Service",
        description="Xebia Exam Platform - Taking the Exam Service",
        version=settings.VERSION,
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )

    # Middleware for request ID and logging
    @application.middleware("http")
    async def logging_middleware(  # pyright: ignore[reportUnusedFunction]
        request: Request,
        call_next: Callable[[Request], Coroutine[Any, Any, Response]],
    ) -> Response:
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        bind_contextvars(request_id=request_id)

        start_time = time.perf_counter()
        response: Response = Response(status_code=500)
        try:
            response = await call_next(request)
        except Exception as e:
            logger.exception("Exception occurred during request processing", error=str(e))
            raise e
        finally:
            process_time = time.perf_counter() - start_time
            logger.info(
                "Request processed",
                method=request.method,
                path=request.url.path,
                status_code=response.status_code,
                duration_ms=round(process_time * 1000, 2),
            )
            clear_contextvars()
        return response

    application.include_router(v1_router, prefix="/api/v1")
    return application


app = create_application()
