# Stage 1: Build the virtual environment
FROM python:3.12-slim AS builder

COPY --from=ghcr.io/astral-sh/uv:0.9.16 /uv /usr/local/bin/uv

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1

# Copy shared package first so uv can find it
COPY shared/packages/core /shared/packages/core

# Copy service dependency files
COPY team-3/pyproject.toml team-3/uv.lock ./

ARG CI_JOB_TOKEN

# Install git and configure credentials using the passed token
RUN apt-get update && apt-get install -y git --no-install-recommends && \
    if [ -n "$CI_JOB_TOKEN" ]; then \
      git config --global credential.helper store && \
      echo "https://gitlab-ci-token:${CI_JOB_TOKEN}@gitlab.com" > ~/.git-credentials && \
      chmod 600 ~/.git-credentials; \
    fi && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies (frozen/no-dev)
RUN uv sync --frozen --no-dev --no-install-project

# Copy service source code
COPY team-3/src/ ./src/

# Sync again to install the project itself
RUN uv sync --frozen --no-dev && \
    rm -f ~/.git-credentials && \
    git config --global --unset credential.helper

# Stage 2: Final runtime image
FROM python:3.12-slim

RUN groupadd -r appgroup && useradd -r -g appgroup appuser

WORKDIR /app

COPY --from=builder --chown=appuser:appgroup /app/.venv /app/.venv
COPY --from=builder --chown=appuser:appgroup /app/src /app/src
COPY --from=builder --chown=appuser:appgroup /shared/packages/core /shared/packages/core

ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONPATH="/app/src"
ENV PYTHONUNBUFFERED=1

USER appuser

EXPOSE 8000

CMD ["uvicorn", "exams.main:app", "--host", "0.0.0.0", "--port", "8000"]
