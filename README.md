# 🚀 MedLegit – AI-Powered Medical, Legal & Fraud Intelligence Platform

MedLegit is an integrated multi-agent AI platform designed to enhance healthcare compliance, medical diagnosis, insurance fraud detection, and legal risk identification.

The platform unifies three critical domains:

- 🧠 **Fraud Detection** (XGBoost)
- 🩺 **Pneumonia Detection** (ResNet50 Deep Learning)
- ⚖️ **Legal Risk Analysis** (Zero-Shot NLP + Summarization)

It combines Machine Learning, Deep Learning, and Natural Language Processing (NLP) into a unified system that supports hospitals, insurance providers, and legal authorities in making data-driven decisions.

## 🌐 Live Demo

**[https://medlegit.netlify.app/](https://medlegit.netlify.app/)**

## 📑 Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Modules](#modules)
  - [1. Fraud Detection Module](#1-fraud-detection-module)
  - [2. Pneumonia Detection Module](#2-pneumonia-detection-module)
  - [3. Legal Intelligence Module](#3-legal-intelligence-module)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Model Details](#model-details)
- [Results](#results)
- [Future Enhancements](#future-enhancements)
- [References](#references)

## 📘 Introduction

Healthcare systems deal with complex challenges such as:

- Insurance fraud
- Misdiagnosis
- Medical negligence
- Documentation lapses
- Legal disputes
- Lack of integrated systems

Traditional processes depend heavily on manual review, which is slow, inconsistent, and prone to human error.

MedLegit addresses these challenges by integrating:

- Machine Learning for fraud detection
- Deep Learning for pneumonia diagnosis
- NLP for legal risk analysis
- A unified backend and dashboard for decision support

The system improves **accuracy, efficiency, transparency, and regulatory compliance**.

## ⭐ Key Features

### 🔍 1. Fraud Detection (Machine Learning)

- Built using **XGBoost**.
- Extensive feature engineering for provider-level analysis.
- **SMOTE** balanced training to handle imbalanced data.
- Detects patterns such as upcoding, duplicate claims, and inflated billing.
- Generates fraud probabilities and binary fraud risk classification.

### 🩺 2. Pneumonia Detection (Deep Learning)

- **ResNet50** (using transfer learning).
- Predicts **Pneumonia vs Normal** using chest X-ray images.
- Preprocessing pipeline includes resizing, normalization, and augmentation.
- Confidence scoring and **fast inference** through API.

### ⚖️ 3. Legal Risk Analysis (NLP)

- **Zero-shot classification** using **BART-MNLI**.
- Extracts medical-legal issues such as: Medical negligence, lack of informed consent, documentation lapse, and confidentiality breach.
- Maps issues to **IMC regulations** and **IPC sections**.
- Generates automatic summaries and recommendations.

### 🛡 4. Role-Based Authentication

- **JWT authentication** with access and refresh tokens.
- User roles: **Admin**, **Doctor**, **Legal Officer**, and **Insurance Analyst**.

### 📊 5. Dashboard and Reports

- Includes activity logs, file uploads, and visual analytics for decision support.

## 🧩 Modules

### 1. Fraud Detection Module

- Uses **XGBoost**.
- Detects suspicious claim patterns such as: unusual claim duration, excessive procedures, and high reimbursement ratios.
- Produces fraud probability and classification.

### 2. Pneumonia Detection Module

- Based on **ResNet50** pretrained on ImageNet.
- Includes data augmentation, early stopping, and class weighting.
- Predicts pneumonia with high accuracy.

### 3. Legal Intelligence Module

- **Zero-shot learning** with BART-Large-MNLI.
- Extracts text from **PDF and DOCX** documents.
- Identifies legal issues and maps them to IMC and IPC regulations.
- Produces a legal issue list, relevant laws, statute quotes, recommendations, and an extractive summary.

## 🛠 Tech Stack

| Category      | Technologies Used                                                                                 |
| :------------ | :------------------------------------------------------------------------------------------------ |
| **Frontend**  | **React**, **Vite**, Axios, Recharts                                                              |
| **Backend**   | **FastAPI**, SQLAlchemy, Alembic, Uvicorn/Gunicorn                                                |
| **ML/DL/NLP** | XGBoost, **TensorFlow / Keras**, Scikit-learn, HuggingFace Transformers, Imbalanced-Learn (SMOTE) |
| **Database**  | **PostgreSQL**, PgAdmin                                                                           |

### 🔐Environment Variables

### Backend .env

```
DATABASE_URL=postgresql://username:password@localhost/medlegit

TF_CPP_MIN_LOG_LEVEL=3
TF_ENABLE_ONEDNN_OPTS=0
PYTHONWARNINGS=ignore
SECRET_KEY="custom_secret_key"
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
BCRYPT_ROUNDS=12
API_V1_STR=/api
PROJECT_NAME=MedLegit API
# For Docker Development
FRONTEND_URL=http://localhost:3000
# For Local Development
FRONTEND_URL=http://localhost:5173
```

### Frontend .env

```
VITE_API_URL=http://localhost:8000/api

```

###🚀 Quick Start
│
├── 🐳 Docker Development (Recommended)
│
└── 🧪 Local Development (Manual Setup)

Clone the repository:

```bash
git clone https://github.com/samarthnayak04/MedLegit.git
cd medlegit

```

### 🐳 Docker Development

This is the recommended way to run MedLegit.  
Both frontend and backend are started together using Docker Compose.

### Start the application

```bash
docker compose up --build

```

### Access the application:

Frontend: http://localhost:3000

Backend API Docs: http://localhost:8000/docs

### 🧪Local Development

## 🧩 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

## 🎨 Frontend Setup

```
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

The API is built using **FastAPI** for high performance and includes the following endpoints:

### **Authentication**

| Method | Endpoint            | Description                            |
| :----- | :------------------ | :------------------------------------- |
| `POST` | `/api/auth/signup`  | Register a new user account.           |
| `POST` | `/api/auth/login`   | Authenticate and obtain access tokens. |
| `POST` | `/api/auth/refresh` | Refresh an expired access token.       |

### **Fraud Analysis**

| Method | Endpoint                      | Description                                            |     |
| :----- | :---------------------------- | :----------------------------------------------------- | --- |
| `POST` | `/api/fraud/insurance-claims` | Analyze insurance claim data for fraudulent activity.  |
| `POST` | `/api/fraud/public`           | Analyze public records for potential fraud indicators. |

### **Pneumonia Detection**

| Method | Endpoint                 | Description                                            |
| :----- | :----------------------- | :----------------------------------------------------- |
| `POST` | `/api/pneumonia/predict` | Predict the presence of pneumonia from an X-ray image. |

### **Legal Risk Analysis**

| Method | Endpoint             | Description                                                        |
| :----- | :------------------- | :----------------------------------------------------------------- |
| `POST` | `/api/legal/analyze` | Analyze clinical notes or documentation for potential legal risks. |

## 📊 Model Details

The platform utilizes three core machine learning models, demonstrating strong performance across all tasks:

### Fraud Detection – **XGBoost**

| Metric    | Score      |
| :-------- | :--------- |
| Accuracy  | **95–98%** |
| Precision | **0.93**   |
| Recall    | **0.92**   |
| AUC       | **0.98**   |

### Pneumonia Detection – **ResNet50** (Image Classification)

| Metric    | Score      |
| :-------- | :--------- |
| Accuracy  | **93–96%** |
| Precision | **0.95**   |
| Recall    | **0.93**   |
| AUC       | **0.97**   |

### Legal Analysis – **Zero-Shot NLP**

| Legal Risk Category | Confidence Range |
| :------------------ | :--------------- |
| Negligence          | **0.75–0.98**    |
| Informed Consent    | **0.70–0.95**    |
| Documentation Lapse | **0.65–0.88**    |

## 🌄 Performance & Results

- All three models achieved **high accuracy** and strong generalization.
- **FastAPI inference time < 0.3 sec** (for all endpoints).
- **Stable performance** observed during load testing.
- Model outputs are **clear and interpretable**.

## 🚀 Future Enhancements

We plan to implement the following features and architectural improvements:

- **Machine Learning:**
  - Multi-disease X-ray classification (beyond just pneumonia).
  - Domain-specific legal NLP fine-tuning for improved accuracy.
  - Integration of **Explainable AI** techniques (Grad-CAM, SHAP).
- **Architecture & Integration:**
  - Transition to a **Microservices architecture**.
  - Real-time fraud monitoring capabilities.
  - Integration with hospital systems using standards like **HL7 / FHIR**.

## Development Workflow

We follow a structured Git workflow to ensure code quality and stability:

- **Branching:** Feature branches are named `feat/<short-desc>`.
- **Merging:** Pull Requests (PRs) must be merged into the `develop` branch first, and then into `main`.
- **Commits:** Use **semantic commit messages** (e.g., `feat: add user signup endpoint`, `fix: correct login bug`).
- **Testing:**
  - Add **unit tests** for all new backend endpoints.
  - Add **integration tests** specifically covering ML inference paths.

## Contributing

Contributions are welcome! Please feel free to open an issue or a Pull Request.

### Guidelines for Contribution:

1.  **Fork** the repository.
2.  **Create a feature branch** (`git checkout -b feat/your-feature-name`).
3.  **Add tests** if applicable to cover your new functionality.
4.  **Open a PR** with a clear and concise description of the changes.

## License

This project is released under the **MIT License**. See the `LICENSE` file for full details.
