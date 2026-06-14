# 🔐 UPI Fraud Detection System

> AI-powered real-time UPI transaction fraud detection using Machine Learning

![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)
![ML](https://img.shields.io/badge/ML-RandomForest-orange?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square)

## 🚀 What it does

Analyzes UPI transactions in real-time and classifies them as **LOW / MEDIUM / HIGH / CRITICAL** risk using a trained Machine Learning model — returning fraud probability in under 100ms.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ML Model | Random Forest + XGBoost |
| Backend | FastAPI + Python 3.11 |
| Frontend | React + Vite |
| Database | SQLite |
| Deployment | Docker + Render |

## ✨ Features

- ⚡ Real-time fraud scoring (< 100ms)
- 🎯 Risk classification — LOW / MEDIUM / HIGH / CRITICAL
- 📊 Fraud probability percentage
- 🔗 REST API with Swagger docs at `/docs`
- 🐳 Docker ready

## 📁 Project Structure
upi-fraud-detection/

├── backend/        # FastAPI + ML inference

│   └── app/

│       ├── routes/     # API endpoints

│       ├── services/   # ML logic

│       └── schemas/    # Pydantic models

├── frontend/       # React + Vite UI

├── ml/             # Model training scripts

│   ├── src/        # train.py, feature_engine.py

│   └── models/     # Saved model artifacts

└── docker/         # Dockerfiles + nginx config

## 🏃 Run Locally

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# API docs: http://localhost:8000/docs
```

**Train ML Model:**
```bash
cd ml/src
python train.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# UI: http://localhost:5173
```

## 🧠 ML Pipeline

- **Dataset:** Synthetic transaction data (10,000 samples)
- **Features:** Amount, time-of-day, transaction type, weekend flag, etc.
- **Model:** Random Forest (200 estimators)
- **Accuracy:** 96%+ on test set
- **Imbalance handling:** SMOTE oversampling

## 📬 Contact

**Anmol Kumar Mishra**
[LinkedIn](https://linkedin.com/in/anmol-kumar-mishra) · [GitHub](https://github.com/Anmol7545) · anmolmishra7545@gmail.com
