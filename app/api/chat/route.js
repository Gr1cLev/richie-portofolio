import { NextResponse } from 'next/server';

// Informasi konteks tentang Richie yang akan diberikan ke Gemini
const RICHIE_CONTEXT = `
Kamu adalah asisten AI yang membantu pengunjung website mengenali Richie Giansanto dengan lebih baik.

INFORMASI TENTANG RICHIE GIANSANTO:

PROFIL PERSONAL:
- Nama: Richie Giansanto
- Lokasi: Tangerang City, Indonesia
- Email: richiegiansanto@gmail.com
- Phone: +62 81385770691
- Pendidikan: Mahasiswa Informatika di Universitas Multimedia Nusantara dengan GPA 3.95

DESKRIPSI DIRI:
Richie adalah seorang software developer dengan fokus ganda pada full-stack development dan machine learning. Dia memiliki pengalaman membangun aplikasi dari awal hingga akhir, dari backend yang robust (Node.js, FastAPI) hingga user interface yang responsif (Android Kotlin, React).

Di sisi lain, Richie memiliki keahlian mendalam dalam machine learning lifecycle, mulai dari pemrosesan data (NLP, pandas) hingga membangun dan deploy model prediktif (scikit-learn, PyTorch, BERT). Dia passionate dalam menyelesaikan masalah kompleks dengan workflow MLOps yang efisien, termasuk CI/CD, Docker, dan MLflow.

Richie adalah quick learner yang proaktif dan adaptif, selalu mencari kesempatan untuk mengaplikasikan skillnya pada proyek-proyek real-world yang menantang.

SKILLS TEKNIS:

1. Languages & Web/App Development:
   - Programming Languages: Python, Kotlin, JavaScript, SQL, Java, C#
   - Backend: FastAPI, Node.js (Express)
   - Frontend: React (Basic), Android Studio
   - API: RESTful API

2. Machine Learning & MLOps:
   - ML Frameworks: Scikit-learn, PyTorch, BERT Models
   - Specialization: NLP (Natural Language Processing)
   - MLOps Tools: MLflow, GitHub Actions CI/CD, Docker
   - Model Deployment: Model Serving

3. Data Analysis & Tools:
   - Data Processing: Pandas, NumPy
   - Text Processing & Analysis
   - Development Tools: Git & GitHub, Google Colab, Kaggle, Jupyter Notebook

CARA BERKOMUNIKASI:
- Jawab pertanyaan dengan ramah dan informatif
- Jika ditanya tentang Richie, berikan informasi yang relevan dari konteks di atas
- Jika pertanyaan di luar topik Richie, tetap jawab dengan sopan dan helpful
- Gunakan bahasa Indonesia yang natural dan friendly
- Jika tidak yakin tentang informasi tertentu, jujur sampaikan bahwa informasi tersebut tidak tersedia

Ingat: Kamu adalah asisten yang membantu mengenalkan Richie kepada pengunjung website portofolionya.
`;

export async function POST(request) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Pesan tidak valid' },
        { status: 400 }
      );
    }

    // Cek apakah API key tersedia
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY tidak ditemukan di environment variables');
      return NextResponse.json(
        { error: 'Konfigurasi server tidak lengkap. Silakan hubungi administrator.' },
        { status: 500 }
      );
    }

    // Siapkan history conversation untuk Gemini
    const contents = [];
    
    // Tambahkan system instruction sebagai pesan pertama
    contents.push({
      role: 'user',
      parts: [{ text: RICHIE_CONTEXT }]
    });
    
    contents.push({
      role: 'model',
      parts: [{ text: 'Baik, saya siap membantu pengunjung mengenali Richie Giansanto dan menjawab pertanyaan mereka dengan ramah dan informatif.' }]
    });

    // Tambahkan history conversation jika ada (maksimal 10 pesan terakhir untuk efisiensi)
    if (conversationHistory && Array.isArray(conversationHistory)) {
      const recentHistory = conversationHistory.slice(-10);
      contents.push(...recentHistory);
    }

    // Tambahkan pesan user terbaru
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Panggil Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API Error:', errorData);
      
      if (response.status === 400) {
        return NextResponse.json(
          { error: 'Format permintaan tidak valid. Silakan coba lagi.' },
          { status: 400 }
        );
      }
      
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: 'API key tidak valid. Silakan hubungi administrator.' },
          { status: 500 }
        );
      }
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: '⚠️ Mencapai Rate Limit Penggunaan! Hubungi Richie untuk memperbarui limitnya.' },
          { status: 429 }
        );
      }

      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();

    // Extract respons dari Gemini
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                  'Maaf, saya tidak dapat memproses permintaan Anda saat ini.';

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
