'use client';

import { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import AboutApp from '../apps/AboutApp';
import ProjectsApp from '../apps/ProjectsApp';
import SkillsApp from '../apps/SkillsApp';
import ContactApp from '../apps/ContactApp';
import MusicApp from '../apps/MusicApp';

const APP_REGISTRY = {
  about:    { component: AboutApp,    title: 'About Me'  },
  projects: { component: ProjectsApp, title: 'Projects'  },
  skills:   { component: SkillsApp,   title: 'Skills'    },
  contact:  { component: ContactApp,  title: 'Contact'   },
  music:    { component: MusicApp,    title: 'Music'     },
};

export default function AppWindow() {
  const { state, dispatch } = useOS();
  const [phase, setPhase] = useState('opening'); // 'opening' | 'open' | 'closing'

  // Animate in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setPhase('open'));
    return () => cancelAnimationFrame(t);
  }, []);

  const appDef = APP_REGISTRY[state.openApp];
  if (!appDef) return null;
  const AppContent = appDef.component;

  const handleClose = () => {
    setPhase('closing');
    setTimeout(() => dispatch({ type: 'CLOSE_APP' }), 300);
  };

  const isOpen = phase === 'open';
  const isClosing = phase === 'closing';

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-3 md:p-8"
      style={{ zIndex: 30 }}
      onClick={handleClose}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          opacity: isClosing ? 0 : isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Window */}
      <div
        className="relative flex flex-col w-full overflow-hidden"
        style={{
          maxWidth: '880px',
          height: 'min(88vh, 720px)',
          background: 'rgba(10, 8, 24, 0.84)',
          backdropFilter: 'blur(52px) saturate(200%)',
          WebkitBackdropFilter: 'blur(52px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: '28px',
          boxShadow: '0 1px 0 rgba(255,255,255,0.18) inset, 0 32px 90px rgba(0,0,0,0.65)',
          transform: isClosing
            ? 'scale(0.86) translateY(12px)'
            : isOpen
              ? 'scale(1) translateY(0)'
              : 'scale(0.86) translateY(12px)',
          opacity: isClosing ? 0 : isOpen ? 1 : 0,
          transition: isClosing
            ? 'transform 0.28s cubic-bezier(0.4,0,1,1), opacity 0.28s ease'
            : 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div
          className="flex-none flex items-center justify-between px-5 py-3.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* macOS-style traffic light close button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="w-[13px] h-[13px] rounded-full bg-red-500 hover:bg-red-400 transition-colors group flex items-center justify-center"
          >
            <svg
              className="w-[8px] h-[8px] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Title */}
          <h2 className="absolute left-1/2 -translate-x-1/2 text-white/80 font-medium text-sm">
            {appDef.title}
          </h2>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <AppContent />
        </div>

        {/* Home Indicator — tap to close */}
        <div className="flex-none flex justify-center py-2.5">
          <button
            onClick={handleClose}
            aria-label="Close app"
            className="w-28 h-[5px] rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200"
          />
        </div>
      </div>
    </div>
  );
}
