// scripts/build-vector-store.js
// Pipeline: baca MD files → chunk by heading → embed via Gemini → upsert ke Firestore
//
// Usage:
//   node --env-file=.env.local scripts/build-vector-store.js             → proses SEMUA file
//   node --env-file=.env.local scripts/build-vector-store.js skills.md   → proses SATU file

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, '../docs/knowledge');
const COLLECTION = 'knowledge_vectors';

// === Firestore Init ===
function getDb() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIRESTORE_PROJECT_ID,
        clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
        privateKey: process.env.FIRESTORE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  const dbId = process.env.FIRESTORE_DATABASE_ID;
  return dbId ? getFirestore(dbId) : getFirestore();
}

// === Gemini Embedding ===
async function getEmbedding(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY tidak ditemukan');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'models/gemini-embedding-2',
        content: { parts: [{ text }] },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini Embedding API error: ${err}`);
  }
  const data = await response.json();
  return data.embedding.values;
}

// === MD Chunker ===
// Split berdasarkan heading ## (H2). Tiap section = 1 chunk.
// Jika tidak ada H2, seluruh file = 1 chunk.
function chunkMarkdown(content, sourceFile) {
  const lines = content.split('\n');
  const chunks = [];
  let currentHeading = '';
  let currentLines = [];
  let chunkIndex = 0;

  // Ambil H1 sebagai konteks judul file
  const h1Line = lines.find((l) => l.startsWith('# '));
  const fileTitle = h1Line ? h1Line.replace(/^#\s+/, '').trim() : sourceFile.replace('.md', '');

  for (const line of lines) {
    if (line.startsWith('## ')) {
      // Simpan chunk sebelumnya jika ada isi
      if (currentLines.length > 0) {
        const text = currentLines.join('\n').trim();
        if (text.length > 20) {
          const id = `${sourceFile.replace('.md', '')}_chunk_${chunkIndex}`;
          chunks.push({
            id,
            chunk_index: chunkIndex,
            heading: currentHeading || fileTitle,
            // Prepend file title + heading supaya embedding punya konteks lengkap
            content: `${fileTitle}${currentHeading ? ' - ' + currentHeading : ''}\n\n${text}`,
            source_file: sourceFile,
          });
          chunkIndex++;
        }
      }
      currentHeading = line.replace(/^##\s+/, '').trim();
      currentLines = [];
    } else if (!line.startsWith('# ')) {
      // Skip H1, masukkan semua baris lainnya
      currentLines.push(line);
    }
  }

  // Chunk terakhir
  if (currentLines.length > 0) {
    const text = currentLines.join('\n').trim();
    if (text.length > 20) {
      const id = `${sourceFile.replace('.md', '')}_chunk_${chunkIndex}`;
      chunks.push({
        id,
        chunk_index: chunkIndex,
        heading: currentHeading || fileTitle,
        content: `${fileTitle}${currentHeading ? ' - ' + currentHeading : ''}\n\n${text}`,
        source_file: sourceFile,
      });
    }
  }

  return chunks;
}

// === Upsert ke Firestore ===
async function upsertFile(db, sourceFile) {
  const filePath = join(KNOWLEDGE_DIR, sourceFile);
  const content = readFileSync(filePath, 'utf-8');
  const chunks = chunkMarkdown(content, sourceFile);

  if (chunks.length === 0) {
    console.log(`  ⚠️  Tidak ada chunk yang valid di ${sourceFile}, skip.`);
    return;
  }

  const col = db.collection(COLLECTION);

  // Hapus semua chunk lama dari file ini
  const existing = await col.where('source_file', '==', sourceFile).get();
  if (!existing.empty) {
    await Promise.all(existing.docs.map((d) => d.ref.delete()));
    console.log(`  🗑️  Deleted ${existing.size} chunk lama untuk ${sourceFile}`);
  }

  // Embed & upsert setiap chunk
  for (const chunk of chunks) {
    process.stdout.write(`  📝 Embedding chunk [${chunk.chunk_index}] "${chunk.heading}"... `);
    const embedding = await getEmbedding(chunk.content);
    await col.doc(chunk.id).set({
      ...chunk,
      embedding,
      updated_at: new Date().toISOString(),
    });
    console.log(`✅`);
    // Rate limiting
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`  ✨ ${chunks.length} chunk berhasil di-index dari ${sourceFile}\n`);
}

// === Delete chunks dari Firestore untuk satu file ===
async function deleteFile(db, sourceFile) {
  const col = db.collection(COLLECTION);
  const existing = await col.where('source_file', '==', sourceFile).get();
  if (existing.empty) {
    console.log(`  ℹ️  Tidak ada chunk untuk ${sourceFile} di Firestore.\n`);
    return;
  }
  await Promise.all(existing.docs.map((d) => d.ref.delete()));
  console.log(`  🗑️  Deleted ${existing.size} chunk dari ${sourceFile}\n`);
}

// === Main ===
async function main() {
  console.log('🚀 Knowledge Base Vector Builder\n');

  const db = getDb();

  const args = process.argv.slice(2);

  // Mode --delete: hapus chunks dari Firestore tanpa butuh file MD-nya
  // Usage: node scripts/build-vector-store.js --delete skills.md career-goals.md
  if (args[0] === '--delete') {
    const filesToDelete = args.slice(1).map((a) => (a.endsWith('.md') ? a : `${a}.md`));
    if (filesToDelete.length === 0) {
      console.error('❌ Harap sebutkan nama file setelah --delete. Contoh: --delete skills.md');
      process.exit(1);
    }
    console.log(`🗑️  Mode: Delete chunks untuk ${filesToDelete.join(', ')}\n`);
    for (const file of filesToDelete) {
      console.log(`📂 Deleting: ${file}`);
      await deleteFile(db, file);
    }
    const allDocs = await db.collection(COLLECTION).get();
    console.log('─'.repeat(50));
    console.log(`✅ Selesai! Total chunks tersisa di Firestore: ${allDocs.size}`);
    console.log('─'.repeat(50));
    process.exit(0);
  }

  // Mode normal: upsert file
  let targetFiles = [];
  if (args.length > 0) {
    // Partial update
    targetFiles = args.map((a) => (a.endsWith('.md') ? a : `${a}.md`));
    console.log(`📌 Mode: Partial update untuk ${targetFiles.join(', ')}\n`);
  } else {
    // Full rebuild
    targetFiles = readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith('.md'));
    console.log(`📌 Mode: Full rebuild (${targetFiles.length} file)\n`);
  }

  for (const file of targetFiles) {
    console.log(`📂 Processing: ${file}`);
    try {
      await upsertFile(db, file);
    } catch (err) {
      console.error(`  ❌ Error processing ${file}:`, err.message);
    }
  }

  // Summary
  const allDocs = await db.collection(COLLECTION).get();
  console.log('─'.repeat(50));
  console.log(`🎉 Selesai! Total chunks di Firestore: ${allDocs.size}`);
  console.log('─'.repeat(50));
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
