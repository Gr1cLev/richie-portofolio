'use client';

import { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

export default function StatusBar() {
  const { dispatch } = useOS();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 pointer-events-none"
      style={{ height: '80px', zIndex: 50 }}
    >
      {/* Clock */}
      <span className="text-white font-semibold text-sm pointer-events-auto">
        {time}
      </span>

      {/* Spotlight trigger */}
      <button
        onClick={(e) => { e.stopPropagation(); dispatch({ type: 'OPEN_SPOTLIGHT' }); }}
        className="absolute left-1/2 -translate-x-1/2 pointer-events-auto group"
        aria-label="Spotlight Search"
      >
        <div
          className="flex items-center gap-2 rounded-full text-white/40 text-xs group-hover:text-white/65 transition-colors"
          style={{
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.14)',
            padding: '5px 18px 5px 14px',
            minWidth: '200px',
          }}
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="font-medium">Search apps &amp; more...</span>
        </div>
      </button>

      {/* System icons — tap to open Control Center */}
      <button
        onClick={(e) => { e.stopPropagation(); dispatch({ type: 'TOGGLE_CONTROL_CENTER' }); }}
        className="flex items-center gap-2 pointer-events-auto text-white/80 hover:text-white transition-colors"
        aria-label="Control Center"
      >
        {/* WiFi icon */}
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.41 8.59C4.1 5.9 7.86 4.27 12 4.27s7.9 1.63 10.59 4.32l-1.42 1.42C18.64 7.56 15.45 6.27 12 6.27s-6.64 1.29-9.17 3.74L1.41 8.59zm4.24 4.24C7.27 11.22 9.52 10.27 12 10.27s4.73.95 6.35 2.56l-1.42 1.42A6.73 6.73 0 0012 12.27a6.73 6.73 0 00-4.93 2l-1.42-1.44zm4.24 4.24A3.23 3.23 0 0112 16.27c.9 0 1.71.37 2.3.96L12 19.5l-2.3-2.27c.59-.59 1.4-.96 2.19-.96z" />
        </svg>

        {/* Battery */}
        <div className="flex items-center gap-1 text-xs font-medium">
          <span>87%</span>
          <div className="flex items-center">
            <div className="w-5 h-2.5 rounded-sm border border-white/55 p-px flex items-center">
              <div className="h-full w-[72%] bg-white/80 rounded-[1px]" />
            </div>
            <div className="w-[2px] h-[6px] bg-white/45 ml-px rounded-r-sm" />
          </div>
        </div>
      </button>
    </div>
  );
}
