'use client';

import { useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import StatusBar from './StatusBar';
import AppGrid from './AppGrid';
import Dock from './Dock';
import WindowManager from './WindowManager';
import ControlCenter from './ControlCenter';
import SpotlightSearch from './SpotlightSearch';

export default function Desktop() {
  const { state, dispatch } = useOS();
  const audioRef = useRef(null);

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume / 100;
    }
  }, [state.volume]);

  const handleBgClick = () => {
    if (state.controlCenterOpen) dispatch({ type: 'CLOSE_CONTROL_CENTER' });
    if (state.jiggleMode) dispatch({ type: 'EXIT_JIGGLE' });
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ zIndex: 1 }}
      onClick={handleBgClick}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/wallpaper.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: `brightness(${state.brightness / 100})`,
          transition: 'filter 0.2s ease',
        }}
      />

      {/* Ambient aurora overlay (subtle, on top of wallpaper) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(88,28,220,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, rgba(14,50,140,0.20) 0%, transparent 50%)',
        }}
      />

      {/* CC backdrop blur — when control center is open */}
      {state.controlCenterOpen && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            background: 'rgba(0,0,0,0.18)',
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Background music */}
      <audio
        ref={audioRef}
        src="/golden-hour.mp3"
        loop
        autoPlay
        onCanPlay={(e) => { e.target.volume = state.volume / 100; }}
      />

      {/* OS UI */}
      <StatusBar />
      <AppGrid />
      <Dock />
      <WindowManager />
      {state.controlCenterOpen && <ControlCenter />}
      {state.spotlightOpen && <SpotlightSearch />}
    </div>
  );
}
