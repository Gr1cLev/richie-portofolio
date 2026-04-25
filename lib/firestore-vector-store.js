// lib/firestore-vector-store.js
// Firestore-backed vector store dengan cosine similarity in-memory

import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const COLLECTION = 'knowledge_vectors';

// Singleton Firebase Admin initialization
function getFirestoreClient() {
  const app = getApps().length === 0 
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIRESTORE_PROJECT_ID,
          clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
          // Ganti literal \n dalam env var menjadi newline asli
          privateKey: process.env.FIRESTORE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      })
    : getApp();

  const dbId = process.env.FIRESTORE_DATABASE_ID;
  return dbId ? getFirestore(app, dbId) : getFirestore();
}

// Hitung cosine similarity antara dua vektor
function cosineSimilarity(vecA, vecB) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dot / denominator;
}

/**
 * Upsert chunks dari satu source file:
 * 1) Hapus semua dokumen lama dengan source_file === sourceFile
 * 2) Insert chunk-chunk baru
 */
export async function upsertChunks(sourceFile, chunks) {
  const db = getFirestoreClient();
  const col = db.collection(COLLECTION);

  // Hapus semua chunk lama dari file ini
  const existing = await col.where('source_file', '==', sourceFile).get();
  const deletePromises = existing.docs.map((doc) => doc.ref.delete());
  await Promise.all(deletePromises);

  // Insert chunk baru
  const upsertPromises = chunks.map((chunk) =>
    col.doc(chunk.id).set({
      id: chunk.id,
      source_file: sourceFile,
      chunk_index: chunk.chunk_index,
      heading: chunk.heading || '',
      content: chunk.content,
      embedding: chunk.embedding,
      updated_at: new Date().toISOString(),
    })
  );
  await Promise.all(upsertPromises);
}

/**
 * Query vector store:
 * Load semua dokumen dari Firestore → hitung cosine similarity → return top-K
 * Result tiap item: { content, source_file, heading, score }
 */
export async function queryVectorStore(queryEmbedding, topK = 4) {
  const db = getFirestoreClient();
  const snapshot = await db.collection(COLLECTION).get();

  if (snapshot.empty) return [];

  const scored = snapshot.docs.map((doc) => {
    const data = doc.data();
    const score = cosineSimilarity(queryEmbedding, data.embedding);
    return {
      content: data.content,
      source_file: data.source_file,
      heading: data.heading,
      score,
    };
  });

  // Sort descending by score, ambil top-K
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}
