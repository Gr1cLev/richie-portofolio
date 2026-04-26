'use client';

import { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

export default function LockScreen({ onUnlock }) {
  const { state } = useOS();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | faceId | done
  const [leaving, setLeaving] = useState(false);

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const handleTap = () => {
    if (phase !== 'idle') return;
    setPhase('faceId');
    setTimeout(() => {
      setPhase('done');
      setLeaving(true);
      setTimeout(() => onUnlock(), 450);
    }, 1800);
  };

  const wallpaperUrl = state.wallpaper || '/wallpaper.jpg';

  return (
    <div
      className={`fixed inset-0 z-[500] cursor-pointer select-none ${leaving ? 'animate-swipe-up' : ''}`}
      onClick={handleTap}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${wallpaperUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />

      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6" style={{ height: '44px' }}>
        <span className="text-white font-semibold text-sm">{time}</span>
        <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1.41 8.59C4.1 5.9 7.86 4.27 12 4.27s7.9 1.63 10.59 4.32l-1.42 1.42C18.64 7.56 15.45 6.27 12 6.27s-6.64 1.29-9.17 3.74L1.41 8.59zm4.24 4.24C7.27 11.22 9.52 10.27 12 10.27s4.73.95 6.35 2.56l-1.42 1.42A6.73 6.73 0 0012 12.27a6.73 6.73 0 00-4.93 2l-1.42-1.44zm4.24 4.24A3.23 3.23 0 0112 16.27c.9 0 1.71.37 2.3.96L12 19.5l-2.3-2.27c.59-.59 1.4-.96 2.19-.96z" />
          </svg>
          <span>87%</span>
          <div className="flex items-center">
            <div className="w-5 h-2.5 rounded-sm border border-white/55 p-px flex items-center">
              <div className="h-full w-[72%] bg-white/80 rounded-[1px]" />
            </div>
            <div className="w-[2px] h-[6px] bg-white/45 ml-px rounded-r-sm" />
          </div>
        </div>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        {/* Time */}
        <p
          className="text-white leading-none"
          style={{ fontSize: 'clamp(80px, 14vw, 130px)', fontWeight: 100, letterSpacing: '-0.02em', textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}
        >
          {time}
        </p>

        {/* Date */}
        <p className="text-white/80 text-xl font-light tracking-wide" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
          {date}
        </p>

        {/* Face ID */}
        {phase === 'faceId' && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="face-id-frame">
              <div className="face-id-corner-tl" />
              <div className="face-id-corner-tr" />
              <div className="face-id-corner-bl" />
              <div className="face-id-corner-br" />
              <div className="face-id-scan-line" style={{ top: '10px' }} />
            </div>
            <p className="text-white/60 text-xs font-medium tracking-widest uppercase">Face ID</p>
          </div>
        )}
      </div>

      {/* Bottom: slide to unlock */}
      {phase === 'idle' && (
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-1 opacity-70">
            <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <p className="slide-to-unlock text-sm font-medium tracking-[0.15em] uppercase">
            Tap to unlock
          </p>
        </div>
      )}
    </div>
  );
}
