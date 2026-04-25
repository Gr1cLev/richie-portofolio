# Project: Israel-Palestine Sentiment Analysis (Reddit)

## Overview
Richie mengembangkan sistem analisis sentimen end-to-end menggunakan data komentar Reddit terkait konflik Israel-Palestina (Januari-Desember 2024).
Proyek ini bertujuan untuk memantau dan menganalisis dinamika opini publik global menggunakan pipeline machine learning dan deep learning yang komprehensif.
Repository: github.com/Gr1cLev/Israel-Palestine-Sentiment-Analysis

## Data Engineering & Preprocessing
Pipeline data dirancang untuk menangani dataset berskala besar secara efisien:
- Data Collection menggunakan dataset komentar Reddit rentang tahun 2024-2025
- Windowing Filter: Hanya mengambil sampel data dari tanggal 1 hingga 10 setiap bulannya untuk mengurangi beban komputasi namun tetap mempertahankan representasi tren bulanan
- Cleaning: Pembersihan karakter non-ASCII, URL, dan whitespace
- Normalization: Normalisasi teks slang menggunakan library Ekphrasis
- Tokenization & Stopword Removal
- Stemming: Mengembalikan kata ke bentuk dasarnya

## Automated Labeling (Weak Supervision)
Pelabelan otomatis menggunakan TextBlob (PatternAnalyzer) untuk menghasilkan silver labels:
- Negatif: Polarity ≤ -0.05
- Netral: -0.05 < Polarity < 0.05
- Positif: Polarity ≥ 0.05

## Modeling Strategy & Architecture
Eksperimen dilakukan menggunakan dua pendekatan utama:

### Classical Machine Learning (Baseline)
- Feature Extraction: TF-IDF dan CountVectorizer (Bag-of-Words)
- Models: Logistic Regression, Naive Bayes (ComplementNB), dan Linear SVM
- Optimization: Hyperparameter tuning menggunakan RandomizedSearchCV dengan Stratified K-Fold Cross-Validation
- Ensemble: Stacking Classifier menggabungkan Naive Bayes, Calibrated SVM, dan Logistic Regression

### Deep Learning (State-of-the-Art)
- BiLSTM (Bidirectional LSTM): Menggunakan Word Embeddings yang dilatih dari vocabulary dataset
- BERT (Transformer): Fine-tuning model pre-trained bert-base-uncased untuk pemahaman semantik kontekstual
- Stacking Ensemble (Champion Model): Menggabungkan probabilitas prediksi dari BiLSTM dan BERT, diproses oleh Meta-Learner (Logistic Regression)

## Overfitting Prevention
- Dropout (Rate 0.3): Mematikan neuron secara acak pada layer BiLSTM selama training
- Weight Decay: Menggunakan optimizer AdamW pada BERT untuk regularisasi bobot otomatis
- Dynamic Scheduler: Linear Schedule with Warmup untuk mengatur learning rate
- Stratified 5-Fold Cross-Validation untuk evaluasi objektif
- Regularization Tuning via Randomized Search

## Quantitative Results (Performance)
Evaluasi dilakukan pada Test Set (Nov-Des 2024):

### BERT Fine-Tuned (Champion Model)
- Overall Accuracy: 98.56%
- Macro F1-Score: 98.57%
- Positif: Precision 0.9840, Recall 0.9886, F1-Score 0.9863
- Netral: Precision 0.9874, Recall 0.9832, F1-Score 0.9853
- Negatif: Precision 0.9841, Recall 0.9866, F1-Score 0.9854

### Stacking Ensemble (BiLSTM + BERT → Logistic Regression)
- Overall Accuracy: 98.41%
- Macro F1-Score: 98.42%

### BiLSTM (Baseline Deep Learning)
- Overall Accuracy: 97.97%
- Macro F1-Score: 97.98%

### Classical Stacking (NB + Calibrated SVM + LR)
- Overall Accuracy: 95.28%
- Macro F1-Score: 95.25%

BERT meningkatkan akurasi sebesar +3.28% dibandingkan baseline Classical ML.

## Explainability & Inference
- Explainable AI (XAI): Menggunakan SHAP untuk menginterpretasikan keputusan model dan memvisualisasikan kata kunci yang mempengaruhi sentimen
- Inference 2025: Model terbaik digunakan untuk memprediksi data tahun 2025, menghasilkan grafik Time-Series untuk memantau tren sentimen bulanan
