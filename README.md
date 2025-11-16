# MedLegit – AI-Powered Medical, Legal & Fraud Intelligence Platform

MedLegit is an integrated multi-agent AI platform designed to enhance healthcare compliance, medical diagnosis, insurance fraud detection, and legal risk identification. It combines Machine Learning, Deep Learning, and Natural Language Processing (NLP) into a unified system that supports hospitals, insurance providers, and legal authorities in making data-driven decisions.

---

## Live Demo

https://medlegit.netlify.app/

---

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Modules](#modules)
  - [Fraud Detection](#1-fraud-detection-module)
  - [Pneumonia Detection](#2-pneumonia-detection-module)
  - [Legal Intelligence](#3-legal-intelligence-module)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Model Details](#model-details)
- [Results](#results)
- [Future Enhancements](#future-enhancements)
- [References](#references)

---

## Introduction

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

The system improves accuracy, efficiency, transparency, and regulatory compliance.

---

## Key Features

### 1. Fraud Detection (Machine Learning)

- Built using XGBoost
- Extensive feature engineering for provider-level analysis
- SMOTE balanced training
- Detects patterns such as upcoding, duplicate claims, inflated billing
- Generates fraud probabilities and binary fraud risk classification

### 2. Pneumonia Detection (Deep Learning)

- ResNet50 (transfer learning)
- Predicts Pneumonia vs Normal using chest X-ray images
- Preprocessing pipeline with resizing, normalization, augmentation
- Confidence scoring
- Fast inference through API

### 3. Legal Risk Analysis (NLP)

- Zero-shot classification using BART-MNLI
- Extracts medical-legal issues such as:
  - Medical negligence
  - Lack of informed consent
  - Documentation lapse
  - Confidentiality breach
- Maps issues to IMC regulations and IPC sections
- Generates automatic summaries and recommendations

### 4. Role-Based Authentication

- JWT authentication with access and refresh tokens
- User roles:
  - Admin
  - Doctor
  - Legal Officer
  - Insurance Analyst

### 5. Dashboard and Reports

- Activity logs
- File uploads
- Visual analytics
- Downloadable prediction reports

---

## System Architecture

Frontend (React + Vite)
|
| API Calls
▼
Backend (FastAPI)
|
|---- ML Fraud Model (XGBoost)
|---- DL Pneumonia Model (ResNet50)
|---- NLP Legal Model (BART)
|
Database (PostgreSQL - Users, Logs)

yaml
Copy code

---

## Modules

### 1. Fraud Detection Module

- Uses XGBoost
- Handles imbalanced data using SMOTE
- Detects suspicious claim patterns such as:
  - Unusual claim duration
  - Excessive procedures
  - High reimbursement ratios
- Produces fraud probability and classification

---

### 2. Pneumonia Detection Module

- Based on ResNet50 pretrained on ImageNet
- Includes:
  - Data augmentation
  - Early stopping
  - Class weighting
- Predicts pneumonia with high accuracy

---

### 3. Legal Intelligence Module

- Zero-shot learning with BART-Large-MNLI
- Extracts text from PDF and DOCX documents
- Identifies legal issues and maps them to IMC and IPC regulations
- Produces:
  - Legal issue list
  - Relevant laws
  - Statute quotes
  - Recommendations
  - Extractive summary

---

## Tech Stack

### Frontend

- React
- Vite
- Axios
- Recharts

### Backend

- FastAPI
- SQLAlchemy
- Alembic
- Uvicorn/Gunicorn

### ML/DL/NLP

- XGBoost
- TensorFlow / Keras
- Scikit-learn
- HuggingFace Transformers
- Imbalanced-Learn (SMOTE)

### Database

- PostgreSQL
- PgAdmin

---

## Installation

Clone the repository:

```bash
git clone https://github.com/samarthnayak04/medlegit.git
cd medlegit
Backend Setup
bash
Copy code
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Environment Variables
Backend .env

Copy code
-DATABASE_URL=postgresql://neondb_owner:npg_uhHxg17NGscK@ep-morning-mud-a1kdhoug-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
-TF_CPP_MIN_LOG_LEVEL=3
-TF_ENABLE_ONEDNN_OPTS=0
-PYTHONWARNINGS=ignore
-SECRET_KEY=legitMed
-ALGORITHM=HS256
-ACCESS_TOKEN_EXPIRE_MINUTES=30
-BCRYPT_ROUNDS=12
-API_V1_STR=/api
-PROJECT_NAME=MedLegit API
-TF_ENABLE_ONEDNN_OPTS=0
FRONTEND_URL=http://localhost:5173
Frontend .env
ini
Copy code
-VITE_API_URL=https://your-backend-url/api
Running the Application
Start PostgreSQL

Start FastAPI backend

Start React frontend

Visit: http://localhost:5173/

API Endpoints
Authentication
bash
Copy code
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
Fraud Analysis
swift
Copy code
POST /api/fraud/insurance-claims
POST /api/fraud/public
Pneumonia Detection
bash
Copy code
POST /api/pneumonia/predict
Legal Risk Analysis
bash
Copy code
POST /api/legal/analyze
Model Details
Fraud Detection – XGBoost
Metric	Score
Accuracy	95–98%
Precision	0.93
Recall	0.92
AUC	0.98

Pneumonia Detection – ResNet50
Metric	Score
Accuracy	93–96%
Precision	0.95
Recall	0.93
AUC	0.97

Legal Analysis – Zero-Shot NLP
Legal Risk	Confidence Range
Negligence	0.75–0.98
Informed Consent	0.70–0.95
Documentation Lapse	0.65–0.88

Results
All three models achieved high accuracy and generalization

Fast API inference (< 0.3 sec average)

Robust performance during load testing

Clear and interpretable outputs

Future Enhancements
Multi-disease X-ray classification

Domain-specific fine-tuning for legal NLP

Explainable AI (Grad-CAM, SHAP)

Microservices architecture

Real-time fraud monitoring

Integration with hospital systems (HL7/FHIR)
```
