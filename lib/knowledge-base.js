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
- Framework ML: Scikit-learn untuk classical ML (Logistic Regression, SVM, Naive Bayes, dsb.).
- Deep Learning: PyTorch untuk BiLSTM dan BERT, khususnya pada task NLP.
- NLP: Fokus pada text preprocessing, sentiment analysis, dan text classification (misalnya pada konflik Israel–Palestina di Reddit).
- MLOps: MLflow untuk experiment tracking, GitHub Actions untuk CI/CD, Docker untuk containerization dan deployment sederhana.
Richie terbiasa membangun pipeline machine learning end-to-end, dari data mentah sampai model serving via API.`,
    metadata: { category: "skills" }
  },
  {
    id: "data-analysis",
    content: `Skills Data Analysis & Tools Richie:
- Data Processing: Pandas dan NumPy untuk manipulasi dan pembersihan data.
- Analisis & Eksplorasi: EDA, visualisasi dasar dengan Matplotlib, serta analisis korelasi dan distribusi.
- NLP utilities: Text processing (tokenization, normalisasi, stopword removal, stemming) untuk tugas-tugas NLP.
- Development Tools: Git & GitHub, Jupyter Notebook, Google Colab, dan Kaggle untuk eksperimen data science.
Richie nyaman bekerja dengan dataset berukuran kecil hingga menengah, baik structured maupun text.`,
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

  // === PROJECTS ===
  {
    id: "project-sentiment-analysis",
    content: `Project: Israel–Palestine Sentiment Analysis (Reddit).
Richie mengumpulkan dan memproses ratusan ribu komentar Reddit terkait konflik Israel–Palestina.
Pipeline mencakup text cleaning (tokenization, normalisasi, stopword removal, stemming), weak labeling dengan TextBlob, dan training berbagai model.
Model yang digunakan: Logistic Regression, Naive Bayes, SVM, BiLSTM, BERT, dan stacking BiLSTM+BERT di atas embedding BERT.
BERT mencapai akurasi dan macro-F1 sekitar 98.5% pada lebih dari 60 ribu data uji, dan model terbaik digunakan untuk inference dan analisis time-series sentimen.
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
