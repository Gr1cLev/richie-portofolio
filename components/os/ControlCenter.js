'use client';

import { useState, forwardRef } from 'react';
import { useOS } from '../../context/OSContext';

const ControlCenter = forwardRef(function ControlCenter({ onLock, onChangeWallpaper }, ref) {
  const { state, dispatch } = useOS();
  const [wallpaperOpen, setWallpaperOpen] = useState(false);

  const close = () => dispatch({ type: 'CLOSE_CONTROL_CENTER' });

  const openChat = (e) => {
    e.stopPropagation();
    close();
    if (typeof window !== 'undefined' && window.openChatbot) window.openChatbot();
  };

  const openCV = (e) => {
    e.stopPropagation();
    window.open('/CV-RichieGiansanto-AI.pdf', '_blank');
    close();
  };

  const handleLock = (e) => {
    e.stopPropagation();
    close();
    setTimeout(() => onLock?.(), 200);
  };

  const handleFromDevice = (e) => {
    e.stopPropagation();
    setWallpaperOpen(false);
    close();
    setTimeout(() => onChangeWallpaper?.(), 200);
  };

  const handleResetWallpaper = (e) => {
    e.stopPropagation();
    dispatch({ type: 'SET_WALLPAPER', payload: null });
    setWallpaperOpen(false);
  };

  const socials = [
    { label: 'GitHub', emoji: '🐙', url: 'https://github.com/Gr1cLev' },
    { label: 'LinkedIn', emoji: '💼', url: 'https://www.linkedin.com/in/richie-giansanto/' },
    { label: 'Instagram', emoji: '📸', url: 'https://www.instagram.com/richie.gian_/' },
  ];

  return (
    <div
      ref={ref}
      className="fixed animate-cc-drop"
      style={{ top: '52px', right: '12px', zIndex: 60, width: 'min(440px, calc(100vw - 24px))' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          background: 'rgba(16, 12, 32, 0.92)',
          backdropFilter: 'blur(56px) saturate(200%)',
          WebkitBackdropFilter: 'blur(56px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: '26px',
          boxShadow: '0 1px 0 rgba(255,255,255,0.16) inset, 0 24px 80px rgba(0,0,0,0.65)',
          padding: '16px',
        }}
      >
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-3 px-1">
          Control Center
        </p>

        {/* Quick actions — 3 col */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <button onClick={openChat} className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl glass-orange hover:bg-orange-400/20 transition-colors">
            <span className="text-xl">🤖</span>
            <p className="text-white text-[11px] font-semibold leading-tight">AI Chat</p>
          </button>

          <button onClick={openCV} className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl glass hover:bg-white/10 transition-colors">
            <span className="text-xl">📄</span>
            <p className="text-white text-[11px] font-semibold leading-tight">My CV</p>
          </button>

          <button onClick={handleLock} className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl glass hover:bg-white/10 transition-colors">
            <span className="text-xl">🔒</span>
            <p className="text-white text-[11px] font-semibold leading-tight">Lock</p>
          </button>
        </div>

        {/* Wallpaper tile — expands on click */}
        <div className="mb-3">
          <button
            onClick={(e) => { e.stopPropagation(); setWallpaperOpen(!wallpaperOpen); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-2xl glass hover:bg-white/10 transition-colors text-left"
          >
            <span className="text-xl">🖼️</span>
            <div className="flex-1">
              <p className="text-white text-[11px] font-semibold">Wallpaper</p>
              <p className="text-white/40 text-[10px]">{state.wallpaper ? 'Custom set' : 'Default'}</p>
            </div>
            <svg
              className="w-3.5 h-3.5 text-white/30 transition-transform"
              style={{ transform: wallpaperOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {wallpaperOpen && (
            <div className="mt-1.5 grid grid-cols-2 gap-1.5 pl-1">
              <button
                onClick={handleFromDevice}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/10 transition-colors"
              >
                <span className="text-base">📁</span>
                <span className="text-white/80 text-xs font-medium">From Device</span>
              </button>
              <button
                onClick={handleResetWallpaper}
                disabled={!state.wallpaper}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass transition-colors"
                style={{ opacity: state.wallpaper ? 1 : 0.35, cursor: state.wallpaper ? 'pointer' : 'not-allowed' }}
              >
                <span className="text-base">↩️</span>
                <span className="text-white/80 text-xs font-medium">Back to Default</span>
              </button>
            </div>
          )}
        </div>

        <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.07)' }} />

        {/* Brightness */}
        <div className="mb-3 px-1">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm">🔆</span>
              <span className="text-white/55 text-xs font-semibold">Brightness</span>
            </div>
            <span className="text-white/35 text-[10px] font-mono">{state.brightness}%</span>
          </div>
          <div className="relative h-7 flex items-center">
            <div className="absolute inset-y-0 left-0 right-0 my-auto rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <div className="absolute inset-y-0 left-0 my-auto rounded-full h-1.5 pointer-events-none transition-all" style={{ width: `${state.brightness}%`, background: 'linear-gradient(90deg, rgba(255,200,80,0.6), rgba(255,255,255,0.85))' }} />
            <input type="range" min={10} max={100} value={state.brightness} onChange={(e) => dispatch({ type: 'SET_BRIGHTNESS', payload: Number(e.target.value) })} className="relative w-full h-7 opacity-0 cursor-pointer" style={{ zIndex: 2 }} />
          </div>
        </div>

        {/* Volume */}
        <div className="mb-3 px-1">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm">{state.volume === 0 ? '🔇' : state.volume < 50 ? '🔉' : '🔊'}</span>
              <span className="text-white/55 text-xs font-semibold">Volume</span>
            </div>
            <span className="text-white/35 text-[10px] font-mono">{state.volume}%</span>
          </div>
          <div className="relative h-7 flex items-center">
            <div className="absolute inset-y-0 left-0 right-0 my-auto rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <div className="absolute inset-y-0 left-0 my-auto rounded-full h-1.5 pointer-events-none transition-all" style={{ width: `${state.volume}%`, background: 'linear-gradient(90deg, rgba(100,160,255,0.6), rgba(180,220,255,0.85))' }} />
            <input type="range" min={0} max={100} value={state.volume} onChange={(e) => dispatch({ type: 'SET_VOLUME', payload: Number(e.target.value) })} className="relative w-full h-7 opacity-0 cursor-pointer" style={{ zIndex: 2 }} />
          </div>
        </div>

        <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.07)' }} />

        {/* Social */}
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2 px-1">Social</p>
        <div className="flex gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl glass hover:bg-white/10 transition-colors"
            >
              <span className="text-xl">{s.emoji}</span>
              <span className="text-white/55 text-[10px] font-medium">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ControlCenter;
