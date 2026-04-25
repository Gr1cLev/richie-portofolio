# Project: NewsApp (Android Kotlin)

## Overview
Richie mengembangkan aplikasi Android NewsApp menggunakan Kotlin dan Android Studio.
Aplikasi menampilkan daftar berita dari REST API (JSON), menggunakan RecyclerView untuk list dan activity/fragment terpisah untuk detail.

## Fitur Aplikasi
- Konsumsi REST API untuk mengambil data berita terkini
- RecyclerView untuk menampilkan list berita secara efisien
- Detail view per artikel dengan tampilan yang bersih
- Arsitektur Android yang mengikuti best practice (Activity/Fragment separation)

## ML-based Recommendation (Ekstensi)
Di sisi ML, Richie juga merancang sistem rekomendasi dan klasifikasi topik berita:
- Menggunakan Python dan scikit-learn (TF-IDF + Logistic Regression)
- Diekspos sebagai FastAPI service yang dapat dikonsumsi oleh aplikasi mobile

## Teknologi yang Digunakan
- Kotlin, Android Studio
- RecyclerView, Activity/Fragment pattern
- REST API consumption (JSON parsing)
- Python, scikit-learn, FastAPI (untuk komponen ML)

Kombinasi ini menunjukkan kemampuan fullstack Richie: mobile frontend + backend/ML API.
