// Knowledge base data untuk portfolio Richie
// Data ini akan di-embed dan disimpan di Upstash Vector

export const knowledgeBase = [
  {
    id: "personal-info",
    content: `Richie Giansanto adalah seorang software developer dan machine learning enthusiast dari Tangerang City, Indonesia.
Email: richiegiansanto@gmail.com, Phone/WhatsApp: +62 81385770691.
Richie adalah mahasiswa Informatika di Universitas Multimedia Nusantara (UMN) dengan GPA 3.95/4.00.
Richie adalah quick learner yang proaktif dan adaptif, selalu mencari kesempatan untuk mengaplikasikan skill-nya pada proyek-proyek real-world yang menantang.`,
    metadata: { category: "personal" }
  },
  {
    id: "description",
    content: `Richie adalah seorang software developer dengan fokus ganda pada full-stack development dan machine learning.
Ia terbiasa membangun aplikasi end-to-end, dari backend yang robust (FastAPI, Node.js) hingga user interface yang responsif (Android Kotlin, basic React).
Di sisi machine learning, Richie berpengalaman dalam full lifecycle: data preprocessing, feature engineering, training, evaluasi model, sampai deployment sederhana (API).
Richie passionate menyelesaikan masalah kompleks dengan workflow MLOps yang efisien, termasuk CI/CD, Docker, dan MLflow.`,
    metadata: { category: "description" }
  },
  {
    id: "programming-languages",
    content: `Programming Languages yang dikuasai Richie:
- Python: utama untuk machine learning, data processing, dan backend (FastAPI).
- Kotlin: untuk Android development (NewsApp dan project mobile lainnya).
- JavaScript: untuk web development dan basic React frontend.
- SQL: untuk query database relasional (PostgreSQL, MySQL).
- Java dan C#: untuk dasar pemrograman berorientasi objek dan aplikasi backend/enterprise.
Richie nyaman berpindah bahasa sesuai kebutuhan proyek dan stack yang digunakan.`,
    metadata: { category: "skills" }
  },
  {
    id: "web-app-development",
    content: `Skills Web & App Development Richie:
- Backend: FastAPI (Python), Node.js dengan Express (dan basic REST API design).
- Frontend: Basic React untuk web, Android Studio + Kotlin untuk mobile.
- API: Perancangan dan implementasi RESTful API, termasuk request/response schema, input validation, dan error handling.
Richie dapat membangun aplikasi fullstack dari backend, konsumsi API, hingga tampilan dasar di frontend/mobile.`,
    metadata: { category: "skills" }
  },
  {
    id: "machine-learning",
    content: `Skills Machine Learning & MLOps Richie:
- Framework ML: Scikit-learn untuk classical ML (Logistic Regression, SVM, Naive Bayes).
- Deep Learning: PyTorch & Transformers (Hugging Face) untuk arsitektur BiLSTM dan BERT.
- NLP: Text preprocessing (NLTK, Ekphrasis), Sentiment Analysis, Text Classification.
- MLOps: MLflow (tracking), GitHub Actions (CI/CD), Docker.
- XAI (Explainable AI): SHAP & LIME untuk interpretabilitas model.
Richie terbiasa membangun pipeline machine learning end-to-end yang production-ready.`,
    metadata: { category: "skills" }
  },
  {
    id: "data-analysis",
    content: `Skills Data Analysis & Tools Richie:
- Data Processing: Pandas & NumPy untuk manipulasi dataset besar dan time-series.
- Visualization: Matplotlib & Seaborn untuk EDA dan plotting hasil evaluasi model.
- NLP Tools: Ekphrasis (normalization), TextBlob (labeling), NLTK.
- Environment: Jupyter Notebook, Google Colab, Kaggle.
Richie mampu mengolah raw data menjadi insight yang bermakna melalui visualisasi dan analisis statistik.`,
    metadata: { category: "skills" }
  },
  {
    id: "education",
    content: `Pendidikan Richie Giansanto:
Richie adalah mahasiswa aktif Program Studi Informatika di Universitas Multimedia Nusantara (UMN).
GPA terkini: 3.95/4.00, mencerminkan performa akademik yang konsisten dan excellent.
Saat ini Richie berada di semester 5 dan menargetkan kelulusan sekitar tahun 2027, dengan fokus pada topik machine learning, deep learning, dan backend engineering.`,
    metadata: { category: "education" }
  },
  {
    id: "contact",
    content: `Cara menghubungi Richie Giansanto:
- Email (utama untuk profesional): richiegiansanto@gmail.com
- Phone/WhatsApp: +62 81385770691
- Lokasi: Tangerang City, Indonesia
- LinkedIn: linkedin.com/in/richie-giansanto
- GitHub: github.com/Gr1cLev
- Instagram: instagram.com/richie.gian_
Richie terbuka untuk opportunity internship, kolaborasi proyek, maupun diskusi seputar data, backend, dan machine learning.`,
    metadata: { category: "contact" }
  },

  // === PROJECTS (EXTREMELY DETAILED RESULTS) ===
  {
    id: "project-sentiment-analysis",
    content: `Project: Israel–Palestine Sentiment Analysis (Reddit) - Comprehensive NLP Pipeline.
Richie mengembangkan sistem analisis sentimen end-to-end menggunakan data komentar Reddit terkait konflik Israel-Palestina (Januari-Desember 2024).
# Project: Israel–Palestine Sentiment Analysis (Reddit)

## 1. Project Overview
Proyek ini bertujuan untuk memantau dan menganalisis dinamika opini publik global terkait konflik Israel-Palestina menggunakan data komentar dari media sosial Reddit. Sistem ini dibangun sebagai pipeline *end-to-end* yang mencakup pengumpulan data, pembersihan teks tingkat lanjut, pelabelan otomatis (*weak supervision*), pelatihan model *Machine Learning* & *Deep Learning*, hingga sistem inferensi untuk analisis *time-series*.

## 2. Data Engineering & Preprocessing Pipeline
Pipeline data dirancang untuk menangani dataset berskala besar secara efisien:

* **Data Collection & Windowing:**
    * Menggunakan dataset komentar Reddit rentang tahun 2024-2025.
    * Menerapkan strategi **"Windowing Filter"**: Hanya mengambil sampel data dari tanggal 1 hingga 10 setiap bulannya untuk mengurangi beban komputasi namun tetap mempertahankan representasi tren bulanan.
* **Preprocessing Stages:**
    * **Cleaning:** Pembersihan karakter non-ASCII, URL, dan *whitespace*.
    * **Normalization:** Normalisasi teks slang dan singkatan media sosial menggunakan library 'ekphrasis'.
    * **Tokenization & Stopword Removal:** Pemecahan teks menjadi token dan penghapusan kata umum yang tidak bermakna.
    * **Stemming:** Mengembalikan kata ke bentuk dasarnya.

## 3. Automated Labeling (Weak Supervision)
* Melakukan pelabelan otomatis menggunakan **TextBlob** (PatternAnalyzer) untuk menghasilkan *silver labels*.
* **Threshold:**
    * **Negatif:** Polarity $\le -0.05$
    * **Netral:** $-0.05 <$ Polarity $< 0.05$
    * **Positif:** Polarity $\ge 0.05$.

## 4. Modeling Strategy & Architecture
Eksperimen dilakukan menggunakan dua pendekatan utama:

### A. Classical Machine Learning (Baseline)
* **Feature Extraction:** Menggunakan **TF-IDF** dan **CountVectorizer** (Bag-of-Words).
* **Models:** Logistic Regression, Naive Bayes (ComplementNB), dan Linear SVM.
* **Optimization:** Hyperparameter tuning menggunakan 'RandomizedSearchCV' dengan validasi silang (*Stratified K-Fold Cross-Validation*).
* **Ensemble:** *Stacking Classifier* menggabungkan Naive Bayes, Calibrated SVM, dan Logistic Regression.

### B. Deep Learning (State-of-the-Art)
* **BiLSTM (Bidirectional LSTM):** Menggunakan *Word Embeddings* yang dilatih dari *vocabulary* dataset dengan arsitektur dua arah.
* **BERT (Transformer):** Fine-tuning model *pre-trained* 'bert-base-uncased' untuk pemahaman semantik kontekstual yang mendalam.
* **Stacking Ensemble (Champion Model):** Menggabungkan probabilitas prediksi (*logits*) dari model **BiLSTM** dan **BERT**, yang kemudian diproses oleh *Meta-Learner* (Logistic Regression) untuk hasil yang lebih robust.

## 5. Overfitting Prevention Strategy
Teknik yang diterapkan untuk mencegah model "menghafal" data:

1.  **Deep Learning:**
    * **Dropout (Rate 0.3):** Mematikan neuron secara acak pada layer BiLSTM selama training.
    * **Weight Decay:** Menggunakan optimizer 'AdamW' pada BERT untuk regularisasi bobot otomatis.
    * **Dynamic Scheduler:** Menggunakan 'Linear Schedule with Warmup' untuk mengatur 'learning rate'.
    * **Validation Set:** Memisahkan 10% data latih untuk memantau validasi secara 'real-time'.
2.  **Classical ML:**
    * **Stratified 5-Fold Cross-Validation:** Memastikan evaluasi objektif pada seluruh bagian data.
    * **Regularization Tuning:** Mencari parameter optimal (seperti 'C' dan 'alpha') via Randomized Search.

## 6. Quantitative Results (Performance)
Evaluasi dilakukan pada *Test Set* (Nov-Des 2024). Berikut adalah detail performa per model:

**A. BERT Fine-Tuned (Champion Model)**
- **Overall Accuracy:** 98.56%
- **Macro F1-Score:** 98.57%
- **Detail Per Kelas:**
  - **Positif:** Precision 0.9840, Recall 0.9886, F1-Score 0.9863
  - **Netral:** Precision 0.9874, Recall 0.9832, F1-Score 0.9853
  - **Negatif:** Precision 0.9841, Recall 0.9866, F1-Score 0.9854

**B. Stacking Ensemble (BiLSTM + BERT -> Logistic Regression)**
- **Overall Accuracy:** 98.41%
- **Macro F1-Score:** 98.42%
- **Detail Per Kelas:**
  - **Positif:** Precision 0.9840, Recall 0.9867, F1-Score 0.9853
  - **Netral:** Precision 0.9853, Recall 0.9817, F1-Score 0.9835
  - **Negatif:** Precision 0.9818, Recall 0.9856, F1-Score 0.9837

**C. BiLSTM (Baseline Deep Learning)**
- **Overall Accuracy:** 97.97%
- **Macro F1-Score:** 97.98%
- **Detail Per Kelas:**
  - **Positif:** Precision 0.9815, Recall 0.9815, F1-Score 0.9815
  - **Netral:** Precision 0.9789, Recall 0.9787, F1-Score 0.9788
  - **Negatif:** Precision 0.9789, Recall 0.9793, F1-Score 0.9791

**D. Classical Stacking (Naive Bayes + Calibrated SVM + Logistic Regression)**
- **Overall Accuracy:** 95.28%
- **Macro F1-Score:** 95.25%
- **Detail Per Kelas:**
  - **Positif:** Precision 0.9452, Recall 0.9801, F1-Score 0.9623
  - **Netral:** Precision 0.9716, Recall 0.9291, F1-Score 0.9499
  - **Negatif:** Precision 0.9263, Recall 0.9652, F1-Score 0.9454

**Insight:** BERT meningkatkan akurasi sebesar **+3.28%** dibandingkan baseline Classical ML. Performa per kelas (Positif, Netral, Negatif) sangat seimbang dengan Precision/Recall di angka ~0.98 - 0.99.

## 7. Explainability & Inference
* **Explainable AI (XAI):** Menggunakan **SHAP** untuk menginterpretasikan keputusan model dan memvisualisasikan kata kunci yang mempengaruhi sentimen.
* **Inference 2025:** Model terbaik digunakan untuk memprediksi data tahun 2025, menghasilkan grafik **Time-Series** untuk memantau tren sentimen bulanan.

Repository: github.com/Gr1cLev/Israel-Palestine-Sentiment-Analysis.`,
    metadata: { category: "project" }
  },
  {
    id: "project-usa-visa",
    content: `Project: USA Work Visa Prediction (MLOps & Logistic Regression).
Richie membangun pipeline end-to-end untuk memprediksi outcome visa kerja AS menggunakan data tabular.
Stack yang digunakan: Python, scikit-learn, MLflow untuk experiment tracking, serta GitHub Actions untuk CI/CD.
Model logistic regression di-deploy sebagai layanan FastAPI yang dibungkus dengan Docker dan di-host di Hugging Face Spaces, dengan F1-score gate sebelum deployment.
Project ini menonjolkan kemampuan Richie dalam menggabungkan machine learning, backend, dan workflow MLOps praktis.`,
    metadata: { category: "project" }
  },
  {
    id: "project-newsapp",
    content: `Project: NewsApp (Android Kotlin) & ML-based Recommendation.
Richie mengembangkan aplikasi Android NewsApp menggunakan Kotlin dan Android Studio.
Aplikasi menampilkan daftar berita dari REST API (JSON), menggunakan RecyclerView untuk list dan activity/fragment terpisah untuk detail.
Di sisi ML, Richie juga merancang sistem rekomendasi dan klasifikasi topik berita menggunakan Python dan scikit-learn (misalnya TF-IDF + Logistic Regression), yang dapat diekspos sebagai FastAPI service.
Kombinasi ini menunjukkan kemampuan fullstack: mobile frontend + backend/ML API.`,
    metadata: { category: "project" }
  },
  {
    id: "project-chatbot-llm",
    content: `Project: Personal Portfolio Chatbot dengan Gemini + RAG (Upstash Vector).
Richie membangun chatbot yang mengenalkan profil dirinya dan portofolio secara dinamis dengan memanfaatkan Gemini 2.5 sebagai LLM dan RAG (Retrieval-Augmented Generation) di atas Upstash Vector.
Knowledge base (profil, skills, project, pengalaman organisasi) di-embed dan disimpan di Upstash Vector, lalu diambil kembali melalui similarity search berdasarkan pertanyaan user.
Fokus utama proyek ini adalah backend & API design: pembuatan REST endpoint, integrasi ke Upstash Vector untuk retrieval, perakitan prompt dari hasil pencarian, basic context management, penanganan error, dan logging request/respons.
Proyek ini menunjukkan bagaimana Richie mengintegrasikan LLM eksternal dan RAG ke dalam aplikasi nyata dengan arsitektur yang rapi, mudah dikembangkan, dan mudah di-update ketika profil/portofolio berubah.`,
    metadata: { category: "project" }
  },

  // === EXPERIENCE & ORGANIZATIONS ===
  {
    id: "experience-organizations",
    content: `Pengalaman Organisasi Richie:
1) KSPM UMN - Investment 101 (PIC Competition Division):
   Richie peserta lomba untuk event "Investment 101". Bertanggung jawab atas alur lomba, komunikasi dengan peserta, pembuatan panduan teknis, dan koordinasi dengan panitia lain.
2) OMB UMN 2024 - Mentor:
   Menjadi mentor untuk 17 mahasiswa baru, memperkenalkan kehidupan kampus, budaya akademik, dan membantu adaptasi awal mereka di UMN.
3) HMIF UMN - UMN Tech Festival (Logistics & Operations):
   Terlibat dalam penyiapan venue, booth, kebutuhan listrik dan signage, serta koordinasi jalannya event bersama divisi lain.
Pengalaman ini melatih leadership, komunikasi, manajemen waktu, dan kemampuan bekerja paralel dengan kuliah dan proyek teknis.`,
    metadata: { category: "experience" }
  },

  // === CAREER INTERESTS ===
  {
    id: "career-goals",
    content: `Career Interests & Goals Richie:
Richie tertarik berkarier sebagai Machine Learning Engineer, Data Scientist, atau Backend/MLOps Engineer.
Ia mencari kesempatan internship dan entry-level role di bidang data/ML, backend engineering, dan AI-driven products.
Fokus utama Richie adalah:
- Membangun model yang benar-benar terpakai di sistem produksi (bukan hanya di notebook).
- Menggabungkan ML dengan backend service yang robust dan bisa di-deploy.
- Terus belajar tentang LLM, NLP, dan MLOps modern.
Richie senang bekerja di lingkungan yang kolaboratif, dengan code review, dokumentasi yang jelas, dan budaya belajar berkelanjutan.`,
    metadata: { category: "career" }
  }
];

export default knowledgeBase; 