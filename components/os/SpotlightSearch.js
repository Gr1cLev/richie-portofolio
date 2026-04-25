'use client';

import { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';

// Keyword synonyms for semantic-like expansion
const SYNONYMS = {
  cv: ['resume', 'curriculum', 'vitae', 'download', 'pdf'],
  resume: ['cv', 'curriculum', 'download', 'pdf'],
  chat: ['ai', 'bot', 'assistant', 'talk', 'message'],
  ai: ['chat', 'bot', 'assistant', 'machine learning', 'ml'],
  gpa: ['grade', 'score', 'academic', 'nilai', 'ipk'],
  phone: ['whatsapp', 'wa', 'hp', 'mobile', 'telepon'],
  email: ['mail', 'gmail', 'inbox'],
  github: ['code', 'repo', 'repository', 'git'],
  linkedin: ['professional', 'network', 'job'],
  ml: ['machine learning', 'ai', 'deep learning', 'model'],
  python: ['py', 'programming'],
  android: ['kotlin', 'mobile', 'app'],
  web: ['javascript', 'react', 'nextjs', 'html', 'css'],
  intern: ['internship', 'magang', 'job', 'work'],
  umn: ['universitas multimedia nusantara', 'university', 'kampus', 'college'],
};

// Priority: Apps > About > Projects > Skills > Contact
const SEARCH_DATA = [
  // ── Apps (highest priority, always shown first) ──────────────────
  { pri: 0, cat: 'Apps', label: 'About Me', detail: 'Profile, background & education', app: 'about', keywords: 'profile richie background education biography bio about umn gpa' },
  { pri: 0, cat: 'Apps', label: 'Projects', detail: 'ML, Android, Web projects', app: 'projects', keywords: 'projects portfolio work mlops android web api' },
  { pri: 0, cat: 'Apps', label: 'Skills', detail: 'Tech stack, languages, frameworks', app: 'skills', keywords: 'skills tech stack programming languages python kotlin javascript' },
  { pri: 0, cat: 'Apps', label: 'Contact', detail: 'Email, WhatsApp, LinkedIn', app: 'contact', keywords: 'contact email whatsapp linkedin instagram reach hire' },
  { pri: 0, cat: 'Apps', label: 'AI Chat', detail: 'Chat with Richie\'s AI assistant', type: 'chat', keywords: 'ai chat bot assistant talk richie' },
  { pri: 0, cat: 'Apps', label: 'My CV / Resume', detail: 'Download PDF — Richie Giansanto', type: 'cv', keywords: 'cv resume curriculum vitae download pdf richie giansanto' },
  { pri: 0, cat: 'Apps', label: 'GitHub', detail: 'github.com/Gr1cLev — all repositories', type: 'github', keywords: 'github code repo open source projects gr1clev' },

  // ── About ─────────────────────────────────────────────────────────
  { pri: 1, cat: 'About', label: 'Richie Giansanto', detail: 'Full-Stack Dev & ML Engineer · GPA 3.95', app: 'about', keywords: 'richie giansanto fullstack ml engineer developer gpa 3.95' },
  { pri: 1, cat: 'About', label: 'UMN Informatics', detail: 'Universitas Multimedia Nusantara, Tangerang', app: 'about', keywords: 'umn universitas multimedia nusantara tangerang informatics campus' },
  { pri: 1, cat: 'About', label: 'GPA 3.95', detail: 'Cumulative GPA · Informatics degree', app: 'about', keywords: 'gpa 3.95 grade score academic nilai ipk' },

  // ── Projects ──────────────────────────────────────────────────────
  { pri: 2, cat: 'Projects', label: 'USA Work Visa Prediction', detail: 'MLOps · Python · MLflow · FastAPI · Docker', app: 'projects', keywords: 'visa prediction mlops mlflow fastapi docker pipeline' },
  { pri: 2, cat: 'Projects', label: 'Sentiment Analysis', detail: 'NLP · BERT · PyTorch · Reddit data', app: 'projects', keywords: 'sentiment analysis nlp bert pytorch reddit social media' },
  { pri: 2, cat: 'Projects', label: 'NewsApp ML API', detail: 'Topic classification · FastAPI · Docker', app: 'projects', keywords: 'news app topic classification fastapi docker api' },
  { pri: 2, cat: 'Projects', label: 'NewsApp Android', detail: 'Kotlin · Android Studio · REST API', app: 'projects', keywords: 'news android kotlin studio rest api mobile' },

  // ── Skills ────────────────────────────────────────────────────────
  { pri: 3, cat: 'Skills', label: 'Python', detail: 'Programming Language · ML & Web', app: 'skills', keywords: 'python programming language ml web' },
  { pri: 3, cat: 'Skills', label: 'Kotlin', detail: 'Android Development', app: 'skills', keywords: 'kotlin android mobile development' },
  { pri: 3, cat: 'Skills', label: 'JavaScript / React', detail: 'Frontend & Next.js', app: 'skills', keywords: 'javascript react nextjs frontend web' },
  { pri: 3, cat: 'Skills', label: 'PyTorch / BERT', detail: 'Deep Learning · NLP', app: 'skills', keywords: 'pytorch bert deep learning nlp transformer' },
  { pri: 3, cat: 'Skills', label: 'FastAPI', detail: 'REST API Framework', app: 'skills', keywords: 'fastapi rest api framework python backend' },
  { pri: 3, cat: 'Skills', label: 'Docker & MLflow', detail: 'MLOps · Containerization', app: 'skills', keywords: 'docker mlflow mlops containerization devops' },
  { pri: 3, cat: 'Skills', label: 'Scikit-learn', detail: 'Machine Learning Models', app: 'skills', keywords: 'scikit learn sklearn machine learning models' },

  // ── Contact ───────────────────────────────────────────────────────
  { pri: 4, cat: 'Contact', label: 'richiegiansanto@gmail.com', detail: 'Send an email', app: 'contact', keywords: 'email gmail richiegiansanto mail contact' },
  { pri: 4, cat: 'Contact', label: 'LinkedIn', detail: 'linkedin.com/in/richie-giansanto', app: 'contact', keywords: 'linkedin professional network job career' },
  { pri: 4, cat: 'Contact', label: 'WhatsApp', detail: '+62 813 8577 0691', app: 'contact', keywords: 'whatsapp phone mobile wa message chat' },
  { pri: 4, cat: 'Contact', label: 'Instagram', detail: '@richie.gian_', app: 'contact', keywords: 'instagram ig social media richie gian' },
];

const CAT_EMOJI = { Apps: '📱', About: '👤', Skills: '⚡', Projects: '📂', Contact: '✉️' };

function scoreItem(item, q) {
  const haystack = `${item.label} ${item.detail} ${item.keywords || ''} ${item.cat}`.toLowerCase();
  const terms = [q, ...(SYNONYMS[q] || [])];
  let score = 0;

  for (const term of terms) {
    if (item.label.toLowerCase() === term) { score += 100; continue; }
    if (item.label.toLowerCase().startsWith(term)) { score += 60; continue; }
    if (item.label.toLowerCase().includes(term)) { score += 40; continue; }
    if (haystack.includes(term)) { score += 15; }
  }

  // Priority bonus: Apps > About > Projects > Skills > Contact
  score += (5 - item.pri) * 5;

  return score;
}

export default function SpotlightSearch() {
  const { dispatch } = useOS();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') dispatch({ type: 'CLOSE_SPOTLIGHT' }); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dispatch]);

  const q = query.trim().toLowerCase();

  const results = q.length >= 1
    ? SEARCH_DATA
        .map((item) => ({ ...item, score: scoreItem(item, q) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12)
    : [];

  // Group by category (preserve score-based order within groups)
  const grouped = {};
  for (const item of results) {
    (grouped[item.cat] = grouped[item.cat] || []).push(item);
  }
  // Order: Apps first, then by first occurrence
  const catOrder = ['Apps', 'About', 'Projects', 'Skills', 'Contact'];
  const orderedCats = catOrder.filter((c) => grouped[c]);

  const handleSelect = (item) => {
    if (item.type === 'chat') {
      dispatch({ type: 'CLOSE_SPOTLIGHT' });
      if (typeof window !== 'undefined' && window.openChatbot) window.openChatbot();
      return;
    }
    if (item.type === 'cv') {
      dispatch({ type: 'CLOSE_SPOTLIGHT' });
      window.open('/CV-RichieGiansanto-AI.pdf', '_blank');
      return;
    }
    if (item.type === 'github') {
      dispatch({ type: 'CLOSE_SPOTLIGHT' });
      window.open('https://github.com/Gr1cLev', '_blank', 'noopener,noreferrer');
      return;
    }
    dispatch({ type: 'OPEN_APP', payload: item.app });
    dispatch({ type: 'CLOSE_SPOTLIGHT' });
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center"
      style={{ paddingTop: '100px', zIndex: 70 }}
      onClick={() => dispatch({ type: 'CLOSE_SPOTLIGHT' })}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      />

      {/* Search panel */}
      <div
        className="relative w-full px-4 animate-spotlight"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input bar */}
        <div
          className="flex items-center gap-3 px-5 py-4 mb-2"
          style={{
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(48px)',
            WebkitBackdropFilter: 'blur(48px)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '20px',
            boxShadow: '0 1px 0 rgba(255,255,255,0.20) inset, 0 16px 48px rgba(0,0,0,0.4)',
          }}
        >
          <svg className="w-5 h-5 flex-shrink-0 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps, skills, projects, CV..."
            className="flex-1 bg-transparent text-white placeholder-white/35 text-base outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results */}
        {orderedCats.length > 0 && (
          <div
            className="overflow-hidden"
            style={{
              background: 'rgba(12, 10, 26, 0.92)',
              backdropFilter: 'blur(48px)',
              WebkitBackdropFilter: 'blur(48px)',
              border: '1px solid rgba(255,255,255,0.11)',
              borderRadius: '20px',
              boxShadow: '0 1px 0 rgba(255,255,255,0.12) inset, 0 16px 48px rgba(0,0,0,0.55)',
            }}
          >
            {orderedCats.map((cat, gi) => (
              <div key={cat}>
                {gi > 0 && <div className="h-px mx-4" style={{ background: 'rgba(255,255,255,0.07)' }} />}
                <div className="px-4 pt-3 pb-1">
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    {CAT_EMOJI[cat]} {cat}
                  </p>
                </div>
                {grouped[cat].map((item, ii) => (
                  <button
                    key={`${item.label}-${ii}`}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.08] transition-colors text-left last:mb-1.5"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 glass">
                      {CAT_EMOJI[cat]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/90 text-sm font-medium leading-tight">{item.label}</p>
                      <p className="text-white/38 text-xs truncate mt-0.5">{item.detail}</p>
                    </div>
                    <svg className="w-3.5 h-3.5 text-white/20 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {q.length >= 1 && orderedCats.length === 0 && (
          <div
            className="text-center py-8"
            style={{
              background: 'rgba(12, 10, 26, 0.90)',
              backdropFilter: 'blur(48px)',
              WebkitBackdropFilter: 'blur(48px)',
              border: '1px solid rgba(255,255,255,0.11)',
              borderRadius: '20px',
            }}
          >
            <p className="text-white/25 text-sm">No results for &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
