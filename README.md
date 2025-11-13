#Medlegit documentation# MedLegit

> MedLegit — AI-powered medical & legal compliance assistant and fraud detection platform.

## Table of Contents

* [About](#about)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Quick Start](#quick-start)

  * [Prerequisites](#prerequisites)
  * [Environment variables](#environment-variables)
  * [Run locally](#run-locally)
* [API Endpoints](#api-endpoints)
* [Machine Learning Models](#machine-learning-models)
* [Database & Migrations](#database--migrations)
* [Deployment](#deployment)
* [Development workflow](#development-workflow)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## About

MedLegit is a full-stack project combining machine learning, web APIs and a user-friendly frontend to help medical and legal teams check documents, detect insurance fraud, and manage user activity and compliance. It includes:

* Legal-document analysis & summarization
* Fraud detection (insurance-claims)
* User dashboard and activity tracking
* ML-powered models served by the backend

---

## Features

* Upload & analyze medical/legal documents (summarization, risk flags)
* Predict fraud on insurance claims (batch & single upload endpoints)
* Authentication with JWT access / refresh tokens
* Admin dashboard and activity logs
* Background jobs for model inference and CSV logging

---

## Tech Stack

* **Backend**: FastAPI (Python), SQLAlchemy, Alembic, PostgreSQL
* **Frontend**: React (Create React App / Vite) — can be integrated with MERN components
* **ML**: scikit-learn / joblib, PyTorch / TensorFlow models (saved artifacts)
* **Auth**: JWT + refresh tokens
* **Deployment**: Docker, Docker Compose

---

## Architecture

```
User (browser)  ->  React frontend
                    -> REST calls -> FastAPI backend
                                      -> SQL DB (Postgres)
                                      -> ML model files (S3 / local / model registry)
                                      -> Alembic migrations
```

---

## Quick Start

### Prerequisites

* Python 3.10+
* Node 16+
* PostgreSQL
* Git
* (Optional) Docker & Docker Compose

### Environment variables

Create a `.env` file in the `backend` directory with values like:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/medlegit
SECRET_KEY=your_supersecret_key
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7
ALGORITHM=HS256
AWS_S3_BUCKET=your-bucket-name   # optional, if using S3 for model artifacts
MODEL_PATH=./models/NewrfWesad.pkl
```

> Note: Do NOT commit secrets or large model files directly to the repo. Use Git LFS for large binaries or store model artifacts in S3.

### Run locally (development)

1. Backend (virtual env):

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
alembic upgrade head        # run DB migrations
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

2. Frontend:

```bash
cd frontend
npm install
npm run dev   # or npm start
```

3. If using Docker Compose (example):

```bash
docker compose up --build
```

---

## API Endpoints (examples)

> These are convenience examples — update to match your code.

```
# Auth
POST /api/auth/signup      # Signup
POST /api/auth/login       # Login
POST /api/auth/refresh     # Refresh token
POST /api/auth/logout      # Logout

# Fraud
POST /api/fraud/insurance-claims    # Predict Fraud (claim payload)
POST /api/fraud/public              # Predict Upload Only (file upload)

# User
GET  /api/user/profile        # Get profile
GET  /api/user/all            # Get all users (admin)
GET  /api/user/dashboard      # Dashboard data
GET  /api/user/activities     # Activity logs

# Legal
POST /api/legal/analyze       # Analyze uploaded legal/medical doc
```

---

## Machine Learning Models

* Store models in `/models` or an object storage (S3). Use `joblib` for scikit-learn models (`.pkl`) or `model.save()` for Keras/TensorFlow (avoid committing `.keras` files directly — use Git LFS or external storage).
* Example loading (Python):

```python
import joblib
model = joblib.load("./models/NewrfWesad.pkl")
```

**Large file guidance:** if a model is ~130 MB, **do not** push the raw file to the main branch. Use Git LFS, or upload to S3 and add a small downloader script in the repo.

---

## Database & Migrations

* Use Alembic for migrations (example):

```bash
alembic revision --autogenerate -m "initial migration"
alembic upgrade head
```

* Sample psql commands (careful with syntax):

```
-- to drop a database, use:
DROP DATABASE medlegit_test;
```

---

## Deployment

* Build Docker images for backend and frontend, push to registry, and deploy using your preferred platform (Render, AWS ECS, DigitalOcean App Platform, etc.).
* If you move webcam capture to frontend (getUserMedia), keep backend inference endpoints stateless and accept frame buffers.

---

## Development workflow

* Feature branches named `feat/<short-desc>`; PRs into `develop` then `main`.
* Use semantic commit messages.
* Add unit tests for backend endpoints and integration tests for ML inference.

---

## Contributing

Contributions are welcome — please open an issue or PR. When contributing:

1. Fork the repository
2. Create a feature branch
3. Add tests if applicable
4. Open a PR with a clear description

---

## License

This project is released under the MIT License. See `LICENSE` for details.


