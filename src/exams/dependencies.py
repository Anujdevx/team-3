from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from sqlmodel.ext.asyncio.session import AsyncSession
from xebia_core.database import get_async_session


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async for session in get_async_session():
        yield session


@asynccontextmanager
async def db_session_ctx() -> AsyncGenerator[AsyncSession, None]:
    """Context manager to obtain a database session programmatically."""
    async for session in get_async_session():
        yield session
