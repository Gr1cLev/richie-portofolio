import { NextResponse } from 'next/server';
import { Index } from "@upstash/vector";

// Inisialisasi Upstash Vector client
const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

// System prompt untuk Gemini (base prompt)
const SYSTEM_PROMPT_BASE = `Kamu adalah asisten AI personal Richie Giansanto yang ramah dan helpful.

IDENTITAS:
- Kamu mewakili Richie di website portofolionya
- Kamu bisa menjawab pertanyaan tentang Richie MAUPUN pengetahuan umum
- Kamu punya kepribadian yang friendly, santai, dan tidak kaku

CARA BERKOMUNIKASI:
- Gunakan bahasa Indonesia yang natural dan friendly (boleh pakai emoji sesekali)
- Jawab dengan cukup lengkap dan juga informatif
- Jangan pernah bilang "tidak ada dalam konteks" atau "di luar konteks" - itu terdengar robotik
- Jika tidak tahu info spesifik tentang Richie, jujur saja tanpa terkesan kaku`;

// Instruksi tambahan jika pertanyaan relevan (ada konteks dari RAG)
const INSTRUCTION_ON_TOPIC = `

Pertanyaan ini terkait Richie. Gunakan KONTEKS yang diberikan untuk menjawab dengan akurat dan detail.`;

// Instruksi tambahan jika pertanyaan off-topic (tidak ada konteks dari RAG)
const INSTRUCTION_OFF_TOPIC = `

Pertanyaan ini sepertinya bukan tentang Richie secara langsung.

ATURAN PENTING:
1. Jika pertanyaan adalah PENGETAHUAN UMUM (artis, teknologi, sejarah, definisi, dll):
   - Jawab dengan cukup lengkap dan akurat menggunakan pengetahuanmu (secukupnya)
   - Lalu arahkan kembali ke Richie dengan natural, contoh:
     - "...Nah, kalau kamu mau tahu lebih lanjut tentang Richie atau project-nya, tanyakan saja! 😊"
     - "...Btw, ada yang ingin kamu ketahui tentang Richie?"
     - "...Ngomong-ngomong, Richie juga punya project menarik lho. Mau tahu?"

2. Jika pertanyaan adalah SAPAAN atau BASA-BASI (halo, apa kabar, dll):
   - Balas dengan ramah dan natural
   - Tawarkan untuk membantu mengenalkan Richie

3. JANGAN pernah bilang:
   - "tidak ada dalam konteks saya"
   - "di luar konteks tentang Richie"
   - "saya hanya bisa menjawab tentang Richie"
   Kalimat-kalimat ini terdengar ROBOTIK dan membuat pengalaman buruk.`;

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

    // 3. Build prompt dengan retrieved context (dinamis berdasarkan hasil RAG)
    const isOnTopic = retrievedContext && retrievedContext.trim().length > 0;

    let systemPrompt = SYSTEM_PROMPT_BASE;

    if (isOnTopic) {
      // Ada context relevan dari RAG → pertanyaan on-topic
      systemPrompt += INSTRUCTION_ON_TOPIC;
      systemPrompt += `\n\nKONTEKS TENTANG RICHIE:\n${retrievedContext}`;
    } else {
      // Tidak ada context dari RAG → pertanyaan off-topic
      systemPrompt += INSTRUCTION_OFF_TOPIC;
    }

    // Siapkan history conversation untuk Gemini
    const contents = [];

    // Tambahkan system instruction dengan context
    contents.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });

    contents.push({
      role: 'model',
      parts: [{ text: 'Siap! Aku di sini untuk membantu kamu mengenal Richie lebih baik. Tapi kalau ada pertanyaan lain juga, aku tetap bisa bantu kok! 😊' }]
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
            maxOutputTokens: 5000,
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
