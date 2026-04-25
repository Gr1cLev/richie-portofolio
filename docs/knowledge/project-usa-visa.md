# Project: USA Work Visa Prediction (MLOps)

## Overview
Richie membangun pipeline end-to-end untuk memprediksi outcome visa kerja AS menggunakan data tabular.
Stack: Python, scikit-learn, MLflow untuk experiment tracking, dan GitHub Actions untuk CI/CD.
Model logistic regression di-deploy sebagai layanan FastAPI yang dibungkus dengan Docker dan di-host di Hugging Face Spaces, dengan F1-score gate sebelum deployment.

## Fitur Utama
- End-to-end MLOps pipeline dari data preprocessing hingga deployment
- Experiment tracking dengan MLflow
- CI/CD pipeline menggunakan GitHub Actions
- Containerisasi dengan Docker
- Deployment ke Hugging Face Spaces sebagai FastAPI service
- F1-score gate: model hanya di-deploy jika memenuhi threshold performa

## Teknologi yang Digunakan
- Python, scikit-learn (Logistic Regression)
- MLflow (experiment tracking & model registry)
- FastAPI (REST API serving)
- Docker (containerization)
- GitHub Actions (CI/CD)
- Hugging Face Spaces (hosting)

Project ini menonjolkan kemampuan Richie dalam menggabungkan machine learning, backend engineering, dan workflow MLOps praktis dalam satu pipeline terintegrasi.
