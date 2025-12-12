import { NextResponse } from 'next/server';
import { Index } from "@upstash/vector";

// Inisialisasi Upstash Vector client
const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

// System prompt untuk Gemini
const SYSTEM_PROMPT = `Kamu adalah asisten AI yang membantu pengunjung website mengenali Richie Giansanto dengan lebih baik.

CARA BERKOMUNIKASI:
- Jawab pertanyaan dengan ramah dan informatif
- Gunakan informasi dari KONTEKS yang diberikan untuk menjawab pertanyaan tentang Richie
- Jika pertanyaan di luar topik Richie, TETAP JAWAB dengan baik dan helpful, namun di akhir respons tambahkan kalimat seperti: "Btw, pertanyaan ini di luar konteks tentang saya ya 😊 Ada yang ingin ditanyakan tentang Richie?"
- Gunakan bahasa Indonesia yang natural dan friendly
- Jika tidak yakin tentang informasi tertentu tentang Richie, jujur sampaikan bahwa informasi tersebut tidak tersedia

Ingat: Kamu adalah asisten yang membantu mengenalkan Richie kepada pengunjung website portofolionya.`;

// Fungsi untuk generate embedding menggunakan Gemini
async function getQueryEmbedding(text) {
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "models/text-embedding-004",
        content: {
          parts: [{ text }],
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.status}`);
  }

  const data = await response.json();
  return data.embedding.values;
}

// Fungsi untuk retrieve relevant context dari Upstash Vector
async function retrieveContext(queryEmbedding, topK = 3) {
  try {
    const results = await vectorIndex.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });

    // Extract content dari metadata
    const contexts = results
      .filter(r => r.metadata?.content)
      .map(r => r.metadata.content);

    return contexts.join("\n\n---\n\n");
  } catch (error) {
    console.error("Error retrieving context:", error);
    return "";
  }
}

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

    // === RAG PIPELINE ===

    // 1. Generate embedding untuk query user
    let retrievedContext = "";
    try {
      const queryEmbedding = await getQueryEmbedding(message);

      // 2. Retrieve relevant context dari Upstash Vector
      retrievedContext = await retrieveContext(queryEmbedding);
    } catch (error) {
      console.error("RAG Error (falling back to no context):", error);
      // Fallback: lanjut tanpa context jika RAG gagal
    }

    // 3. Build prompt dengan retrieved context
    const contextPrompt = retrievedContext
      ? `\n\nKONTEKS TENTANG RICHIE (gunakan ini untuk menjawab):\n${retrievedContext}`
      : "";

    // Siapkan history conversation untuk Gemini
    const contents = [];

    // Tambahkan system instruction dengan context
    contents.push({
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT + contextPrompt }]
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

    // 4. Panggil Gemini API untuk generate response
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
