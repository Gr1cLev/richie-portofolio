'use client';

import { useOS } from '../../context/OSContext';

export default function ControlCenter() {
  const { state, dispatch } = useOS();

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

  const socials = [
    { label: 'GitHub', emoji: '🐙', url: 'https://github.com/Gr1cLev' },
    { label: 'LinkedIn', emoji: '💼', url: 'https://www.linkedin.com/in/richie-giansanto/' },
    { label: 'Instagram', emoji: '📸', url: 'https://www.instagram.com/richie.gian_/' },
  ];

  return (
    <div
      className="fixed animate-cc-drop"
      style={{ top: '52px', right: '12px', zIndex: 60, width: '360px' }}
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
          padding: '18px',
        }}
      >
        {/* Header */}
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4 px-1">
          Control Center
        </p>

        {/* Quick actions — 2 col */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <button
            onClick={openChat}
            className="flex items-center gap-3 p-4 rounded-[18px] glass-orange hover:bg-orange-400/20 transition-colors text-left"
          >
            <span className="text-2xl">🤖</span>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">AI Chat</p>
              <p className="text-white/40 text-xs">Richie&apos;s AI</p>
            </div>
          </button>

          <button
            onClick={openCV}
            className="flex items-center gap-3 p-4 rounded-[18px] glass hover:bg-white/12 transition-colors text-left"
          >
            <span className="text-2xl">📄</span>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">My CV</p>
              <p className="text-white/40 text-xs">Download PDF</p>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] my-3" />

        {/* Brightness Slider */}
        <div className="mb-4 px-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🔆</span>
              <span className="text-white/55 text-xs font-semibold">Brightness</span>
            </div>
            <span className="text-white/35 text-xs font-mono">{state.brightness}%</span>
          </div>
          <div className="relative h-8 flex items-center">
            <div
              className="absolute inset-y-0 left-0 right-0 my-auto rounded-full h-2 pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.10)' }}
            />
            <div
              className="absolute inset-y-0 left-0 my-auto rounded-full h-2 pointer-events-none transition-all"
              style={{
                width: `${state.brightness}%`,
                background: 'linear-gradient(90deg, rgba(255,200,80,0.6), rgba(255,255,255,0.85))',
              }}
            />
            <input
              type="range"
              min={10}
              max={100}
              value={state.brightness}
              onChange={(e) => dispatch({ type: 'SET_BRIGHTNESS', payload: Number(e.target.value) })}
              className="relative w-full h-8 opacity-0 cursor-pointer"
              style={{ zIndex: 2 }}
            />
          </div>
        </div>

        {/* Volume Slider */}
        <div className="mb-4 px-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">{state.volume === 0 ? '🔇' : state.volume < 50 ? '🔉' : '🔊'}</span>
              <span className="text-white/55 text-xs font-semibold">Volume</span>
            </div>
            <span className="text-white/35 text-xs font-mono">{state.volume}%</span>
          </div>
          <div className="relative h-8 flex items-center">
            <div
              className="absolute inset-y-0 left-0 right-0 my-auto rounded-full h-2 pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.10)' }}
            />
            <div
              className="absolute inset-y-0 left-0 my-auto rounded-full h-2 pointer-events-none transition-all"
              style={{
                width: `${state.volume}%`,
                background: 'linear-gradient(90deg, rgba(100,160,255,0.6), rgba(180,220,255,0.85))',
              }}
            />
            <input
              type="range"
              min={0}
              max={100}
              value={state.volume}
              onChange={(e) => dispatch({ type: 'SET_VOLUME', payload: Number(e.target.value) })}
              className="relative w-full h-8 opacity-0 cursor-pointer"
              style={{ zIndex: 2 }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] my-3" />

        {/* Social links */}
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-3 px-1">
          Social
        </p>
        <div className="flex gap-2.5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[16px] glass hover:bg-white/10 transition-colors"
            >
              <span className="text-2xl">{s.emoji}</span>
              <span className="text-white/55 text-[11px] font-medium">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
