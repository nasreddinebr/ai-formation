# syntax=docker/dockerfile:1.7
# ---------------------------------------------------------------------------
# ai-formation — FastAPI back office image
#
#   docker build --target dev  -t ai-formation-api:dev  ./backend
#   docker build --target prod -t ai-formation-api:prod ./backend
#
# The dev target runs uvicorn with autoreload; the prod target runs a
# non-root, multi-worker uvicorn server.
# ---------------------------------------------------------------------------

ARG PYTHON_VERSION=3.14

# ===========================================================================
# base — virtualenv + build tooling shared by every target
# ===========================================================================
FROM python:${PYTHON_VERSION}-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    VIRTUAL_ENV=/opt/venv \
    PATH="/opt/venv/bin:$PATH"

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && python -m venv "$VIRTUAL_ENV"

WORKDIR /app

# ===========================================================================
# deps — production dependencies
# ===========================================================================
FROM base AS deps

COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# ===========================================================================
# dev-deps — production + test/tooling dependencies
# ===========================================================================
FROM deps AS dev-deps

COPY requirements-dev.txt ./
RUN pip install -r requirements-dev.txt

# ===========================================================================
# dev — hot-reloading development server
# ===========================================================================
FROM base AS dev

COPY --from=dev-deps /opt/venv /opt/venv
COPY . .

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=5 \
    CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8000/health').status==200 else 1)"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ===========================================================================
# prod — non-root, multi-worker server
# ===========================================================================
FROM python:${PYTHON_VERSION}-slim AS prod

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    VIRTUAL_ENV=/opt/venv \
    PATH="/opt/venv/bin:$PATH"

COPY --from=deps /opt/venv /opt/venv

RUN groupadd --system --gid 1001 app \
    && useradd --system --uid 1001 --gid app --create-home app

WORKDIR /app

COPY pyproject.toml ./
COPY app ./app

USER app

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=5 \
    CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8000/health').status==200 else 1)"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
