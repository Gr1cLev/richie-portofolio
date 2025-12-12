// Script untuk seed vectors ke Upstash Vector Database
// Jalankan dengan: node scripts/seed-vectors.js

import { Index } from "@upstash/vector";
import { knowledgeBase } from "../lib/knowledge-base.js";

// Konfigurasi Upstash Vector
const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

// Fungsi untuk generate embedding menggunakan Gemini
async function getEmbedding(text) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY tidak ditemukan di environment variables");
    }

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
        const error = await response.text();
        throw new Error(`Gemini Embedding API error: ${error}`);
    }

    const data = await response.json();
    return data.embedding.values;
}

// Fungsi utama untuk seed vectors
async function seedVectors() {
    console.log("🚀 Starting vector seeding process...\n");

    try {
        // Hapus vectors lama jika ada
        console.log("🗑️  Clearing existing vectors...");
        try {
            await index.reset();
            console.log("✅ Existing vectors cleared\n");
        } catch (e) {
            console.log("ℹ️  No existing vectors to clear\n");
        }

        // Process setiap knowledge base entry
        for (const item of knowledgeBase) {
            console.log(`📝 Processing: ${item.id}`);

            // Generate embedding
            const embedding = await getEmbedding(item.content);
            console.log(`   ✓ Generated embedding (${embedding.length} dimensions)`);

            // Upsert ke Upstash Vector
            await index.upsert({
                id: item.id,
                vector: embedding,
                metadata: {
                    ...item.metadata,
                    content: item.content,
                },
            });
            console.log(`   ✓ Uploaded to Upstash Vector\n`);

            // Rate limiting - tunggu sebentar antara requests
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        console.log("🎉 Vector seeding completed successfully!");
        console.log(`   Total vectors: ${knowledgeBase.length}`);

        // Verifikasi dengan info
        const info = await index.info();
        console.log(`   Vectors in index: ${info.vectorCount}`);

    } catch (error) {
        console.error("❌ Error during seeding:", error);
        process.exit(1);
    }
}

// Jalankan
seedVectors();
