'use client';

import { useState } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState('');

  const openChatbot = () => {
    if (typeof window !== 'undefined' && window.openChatbot) {
      window.openChatbot();
    }
  };

  return (
    <>
      {/* ── Desktop: Floating Pill Nav ── */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-0.5 px-2.5 py-2 glass rounded-full">
        <a
          href="#home"
          className="text-white font-bold text-sm px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          RG
        </a>

        <div className="w-px h-4 bg-white/15 mx-1" />

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setActiveLink(link.href)}
            className={`text-sm px-3 py-1.5 rounded-full transition-all duration-200 ${
              activeLink === link.href
                ? 'bg-white/15 text-white'
                : 'text-white/65 hover:text-white hover:bg-white/10'
            }`}
          >
            {link.label}
          </a>
        ))}

        <div className="w-px h-4 bg-white/15 mx-1" />

        <button
          onClick={openChatbot}
          className="glass-orange text-white/85 hover:text-white text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 font-medium"
        >
          AI Chat
        </button>

        <a
          href="/CV-RichieGiansanto-AI.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-white text-sm px-3.5 py-1.5 rounded-full bg-orange-500/75 hover:bg-orange-500 transition-all duration-200 hover:scale-105 font-semibold shadow-[0_0_14px_rgba(255,159,64,0.35)]"
        >
          CV
        </a>
      </header>

      {/* ── Mobile: Bottom Dock ── */}
      <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0 px-2 py-2 glass rounded-full">
        <a href="#home" aria-label="Home" className="flex flex-col items-center px-3 py-1 text-white/60 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[9px] mt-0.5 font-medium">Home</span>
        </a>

        <a href="#about" aria-label="About" className="flex flex-col items-center px-3 py-1 text-white/60 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[9px] mt-0.5 font-medium">About</span>
        </a>

        <a href="#skills" aria-label="Skills" className="flex flex-col items-center px-3 py-1 text-white/60 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-[9px] mt-0.5 font-medium">Skills</span>
        </a>

        <a href="#projects" aria-label="Projects" className="flex flex-col items-center px-3 py-1 text-white/60 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-[9px] mt-0.5 font-medium">Projects</span>
        </a>

        <a href="#contact" aria-label="Contact" className="flex flex-col items-center px-3 py-1 text-white/60 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-[9px] mt-0.5 font-medium">Contact</span>
        </a>

        <button
          onClick={openChatbot}
          aria-label="AI Chat"
          className="flex flex-col items-center px-3 py-1 text-orange-300/80 hover:text-orange-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-[9px] mt-0.5 font-medium">AI</span>
        </button>
      </nav>
    </>
  );
}
