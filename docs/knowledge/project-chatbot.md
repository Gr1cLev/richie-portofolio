# Project: Portfolio Chatbot (Gemini + RAG + Firestore)

## Overview
Richie membangun chatbot yang mengenalkan profil dirinya dan portofolio secara dinamis.
Stack: Gemini 2.5 Flash sebagai LLM, RAG (Retrieval-Augmented Generation) dengan Firestore sebagai vector store, dan Next.js sebagai fullstack framework.

## Arsitektur RAG
- Knowledge base disimpan sebagai file Markdown di folder `docs/knowledge/`
- Setiap file di-chunk berdasarkan H2 heading, di-embed menggunakan Gemini `text-embedding-004`
- Embeddings dan metadata disimpan di GCP Firestore (collection: `knowledge_vectors`)
- Saat user bertanya: query di-embed → cosine similarity dengan semua stored chunks → top-K chunks diambil sebagai context
- Context diinjek ke system prompt Gemini beserta label sumber file (citation)
- Output AI menyertakan citation dari file mana informasi berasal

## Pipeline Update Knowledge
- Tambah/edit file MD di `docs/knowledge/` → jalankan partial re-index → Firestore terupdate
- Tidak perlu delete semua: sistem hanya hapus chunk dari file yang diubah
- Command: `node --env-file=.env.local scripts/build-vector-store.js nama-file.md`

## Teknologi yang Digunakan
- Next.js (App Router) untuk fullstack framework
- Gemini 2.5 Flash untuk LLM response generation
- Gemini text-embedding-004 untuk embedding
- GCP Firestore (free Spark tier) sebagai vector database
- Cosine similarity in-memory untuk retrieval (dataset kecil, efisien)
- React + Tailwind CSS untuk UI chatbot

## Fitur Chatbot
- Menjawab pertanyaan tentang Richie berdasarkan knowledge base yang akurat (RAG)
- Menjawab pertanyaan umum di luar topik Richie secara natural
- Citation sumber: AI menyebutkan file MD mana yang menjadi sumber informasinya
- Conversation history: mempertahankan konteks percakapan (10 pesan terakhir)
- Responsive UI dengan dark glassmorphism design

Repository: github.com/Gr1cLev/richie-portofolio
