# Exam Configuration Service

**Owning team:** Team 3 — Taking the Exam
**Project:** Xebia Exam Platform

This service will implement **BRD Section 4.3 — Exam Configuration**: the APIs and screens that let a Tenant Admin or Exam Creator set up an exam, control candidate access, configure proctoring rules, and define how results are released. Scope is limited to **Must Have** requirements.

---

## 1. What this service does

| Area | Capability |
|---|---|
| Exam Setup | Title, description, instructions, duration, total/passing marks, scheduling window, sections, question selection (manual or random by tag/difficulty), question/option randomisation, attempts & cooldown, navigation lock, negative marking |
| Candidate Access Control | Assign by email / CSV / invite link, optional passphrase, UTC storage with local-timezone display |
| Proctoring Configuration | Proctoring level (None / AI Only / AI + Human / Human Only), per-flag enable/disable, recording mode, sensitivity thresholds; configuration locks once the first candidate starts the exam |
| Result Release | Immediate / scheduled / manual release, score display granularity, manual override release, certificate issuance toggle |

**Consumes:** Accounts & Setup API (role/permission checks)
**Consumed by:** the exam-taking flow and Watching & Reports

---

## 2. Tech stack

- **Backend:** Python 3.11+, FastAPI
- **Database:** PostgreSQL 15+
- **Frontend:** Next.js (App Router), TypeScript
- **API documentation:** OpenAPI 3.0, auto-generated from code

---

## 3. Repository structure

```
exam-configuration-service/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/            # FastAPI routers
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # business logic
│   │   └── db/             # session, migrations (Alembic)
│   ├── tests/
│   ├── requirements.txt
│   └── alembic/
├── frontend/
│   ├── app/
│   ├── components/
│   └── package.json
└── README.md
```

---

## 4. Running locally

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Access to the Accounts service for auth checks

### Database

```bash
createdb exam_configuration_db
```

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
alembic upgrade head

uvicorn app.main:app --reload --port 8001
```

Backend: `http://localhost:8001`
Interactive API docs: `http://localhost:8001/docs`
OpenAPI 3.0 spec: `http://localhost:8001/openapi.json`

### Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Frontend: `http://localhost:3000`

---

## 5. Environment variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `ACCOUNTS_API_BASE_URL` | Base URL of the Accounts & Setup service, used to validate the caller's role |
| `JWT_PUBLIC_KEY` / `KEYCLOAK_REALM_URL` | Used to verify tokens issued by Keycloak |
| `ENV` | `local` / `staging` / `production` |
| `ALLOWED_ORIGINS` | CORS origins allowed to call this API |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | URL of this service's API |
| `NEXT_PUBLIC_ACCOUNTS_BASE_URL` | URL of the Accounts service for login redirect |

---

## 6. API reference

The full API reference is published in the OpenAPI 3.0 standard, auto-generated from code.

- Local: `http://localhost:8001/openapi.json`
- Published reference: TBD

### Key endpoints

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/exams/{exam_id}/configuration` | Create or update exam setup |
| `GET` | `/exams/{exam_id}/configuration` | Retrieve current exam configuration |
| `POST` | `/exams/{exam_id}/access` | Configure candidate access rules |
| `POST` | `/exams/{exam_id}/proctoring` | Configure proctoring level, flags, recording, sensitivity |
| `POST` | `/exams/{exam_id}/result-release` | Configure result release rules and certificate issuance |
| `GET` | `/exams/{exam_id}/lock-status` | Returns whether configuration is locked |

Once any candidate starts the exam, exam setup, marks, and proctoring settings become read-only.

---

## 7. Deployment

| Item | Value |
|---|---|
| Hosting | Always-on cloud server |
| Live URL | TBD |
| Staging URL | TBD |

---

## 8. Scope

This build covers Must Have requirements from BRD Section 4.3 only:
- Exam Setup
- Candidate Access Control
- Proctoring Configuration
- Result Release

Should Have items (exam duplication, IP whitelisting, geo-restriction, per-candidate manual release override, human proctor assignment) are out of scope for this phase.

