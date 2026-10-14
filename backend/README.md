# ai-formation — Back Office API (FastAPI)

Back office service for the ai-formation platform: authentication, hierarchical
RBAC, user profiles and the training dashboard, backed by PostgreSQL.

## Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI + Uvicorn |
| ORM | SQLAlchemy 2.0 (async) + asyncpg |
| Validation | Pydantic v2 / pydantic-settings |
| Passwords | Argon2id (`argon2-cffi`) |
| Sessions | JWT access tokens + rotating opaque refresh tokens (HttpOnly cookies) |
| Schema | Owned by Prisma migrations (`prisma/schema.prisma`) |

## Architecture (layered)

```
app/
├── main.py                 # app factory, middleware, exception handling
├── core/                   # config, security primitives, errors, constants
├── db/                     # engine/session, ORM models, bootstrap seeding
├── repositories/           # data access (one module per aggregate)
├── services/               # business logic / orchestration
├── rbac/                   # roles, permission inheritance, access deps
├── schemas/                # Pydantic request/response models
├── api/                    # routers + cookies + service dependencies
└── middleware/             # CSRF + security headers
```

Routes → Services → Repositories → Models. No layer skips a neighbour.

## RBAC with inheritance

Roles carry a `level`; a role inherits the permissions of every role with a
strictly lower level. Parallel roles (same level) never inherit from each other.

| id | Role | level | inherits |
|---|---|---|---|
| 1 | ADMIN | 3 | everything |
| 2 | CONTRIBUTOR | 2 | USER |
| 3 | MODERATOR | 2 | USER |
| 4 | USER | 1 | ANONYMOUS |
| 5 | ANONYMOUS | 0 | — |

## Local development

```bash
python -m venv .venv
.venv\Scripts\activate            # Windows. Linux/macOS: source .venv/bin/activate
pip install -r requirements-dev.txt

# DATABASE_URL + JWT_SECRET_KEY must be exported (see ../.env.example)
uvicorn app.main:app --reload
```

Interactive docs: <http://localhost:8000/docs>.

## Tests

```bash
pytest -q          # in-memory SQLite, no Postgres required
ruff check app tests
```

## Docker

```bash
docker build --target dev  -t ai-formation-api:dev  .
docker build --target prod -t ai-formation-api:prod .
```
