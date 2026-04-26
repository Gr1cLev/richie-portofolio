'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useOS } from '../../context/OSContext';

const TRACKS = [
  {
    title: 'golden hour',
    artist: 'JVKE',
    src: '/music/golden-hour.mp3',
    accent: '#f59e0b',
    accentDark: '#b45309',
    emoji: '🌅',
  },
  {
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    src: '/music/billie-jean.mp3',
    accent: '#a855f7',
    accentDark: '#6b21a8',
    emoji: '🕺',
  },
  {
    title: 'Beauty And A Beat',
    artist: 'Justin Bieber ft. Nicki Minaj',
    src: '/music/beauty-and-a-beat.mp3',
    accent: '#3b82f6',
    accentDark: '#1d4ed8',
    emoji: '🎤',
  },
];

function formatTime(s) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function MusicApp() {
  const { state, dispatch } = useOS();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const intervalRef = useRef(null);

  const track = TRACKS[state.currentTrack] || TRACKS[0];

  // Poll audio time
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (window.audioControls) {
        setCurrentTime(window.audioControls.getTime());
        setDuration(window.audioControls.getDuration());
      }
    }, 500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const togglePlay = () => dispatch({ type: 'TOGGLE_MUSIC' });

  const handleSeek = (e) => {
    const pct = Number(e.target.value) / 100;
    const t = pct * duration;
    window.audioControls?.seek(t);
    setCurrentTime(t);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Album art */}
      <div
        className="flex-none flex items-center justify-center py-8"
        style={{
          background: `linear-gradient(160deg, ${track.accent}22, ${track.accentDark}44)`,
        }}
      >
        <div
          className="w-44 h-44 rounded-3xl flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(145deg, ${track.accent}, ${track.accentDark})`,
            boxShadow: `0 20px 60px ${track.accent}55, 0 1px 0 rgba(255,255,255,0.25) inset`,
            animation: state.musicPlaying ? 'spin 20s linear infinite' : 'none',
          }}
        >
          <span style={{ fontSize: '72px' }}>🎵</span>
        </div>
      </div>

      {/* Info + controls */}
      <div className="flex-1 flex flex-col justify-between px-6 pb-6 pt-4">
        {/* Track info */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white font-bold text-2xl leading-tight">{track.title}</p>
            <p className="text-white/50 text-base mt-0.5">{track.artist}</p>
          </div>
          {/* Loop toggle */}
          <button
            onClick={() => setIsLooping(!isLooping)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              background: isLooping ? `${track.accent}33` : 'rgba(255,255,255,0.08)',
              border: `1px solid ${isLooping ? track.accent + '55' : 'rgba(255,255,255,0.12)'}`,
              color: isLooping ? track.accent : 'rgba(255,255,255,0.35)',
            }}
            title={isLooping ? 'Loop on' : 'Loop off'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="relative h-8 flex items-center mb-1">
            <div className="absolute inset-y-0 left-0 right-0 my-auto rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <div
              className="absolute inset-y-0 left-0 my-auto rounded-full h-1.5 pointer-events-none transition-all"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${track.accentDark}, ${track.accent})` }}
            />
            <input
              type="range" min={0} max={100} value={progress}
              onChange={handleSeek}
              className="relative w-full h-8 opacity-0 cursor-pointer"
              style={{ zIndex: 2 }}
            />
          </div>
          <div className="flex justify-between text-white/30 text-xs font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-center gap-10 mt-4">
            {/* Prev */}
          <button
            onClick={() => dispatch({ type: 'SET_TRACK', payload: (state.currentTrack - 1 + TRACKS.length) % TRACKS.length })}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-xl"
            style={{ background: `linear-gradient(145deg, ${track.accent}, ${track.accentDark})`, boxShadow: `0 8px 32px ${track.accent}55` }}
          >
            {state.musicPlaying ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            onClick={() => dispatch({ type: 'SET_TRACK', payload: (state.currentTrack + 1) % TRACKS.length })}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zm2.5-6l6-4.25v8.5L8.5 12zM16 6h2v12h-2V6z" />
            </svg>
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 mt-5">
          <span className="text-white/30 text-sm">🔉</span>
          <div className="relative flex-1 h-6 flex items-center">
            <div className="absolute inset-y-0 left-0 right-0 my-auto rounded-full h-1" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <div className="absolute inset-y-0 left-0 my-auto rounded-full h-1 pointer-events-none" style={{ width: `${state.volume}%`, background: `linear-gradient(90deg, ${track.accentDark}99, ${track.accent})` }} />
            <input
              type="range" min={0} max={100} value={state.volume}
              onChange={(e) => dispatch({ type: 'SET_VOLUME', payload: Number(e.target.value) })}
              className="relative w-full h-6 opacity-0 cursor-pointer"
              style={{ zIndex: 2 }}
            />
          </div>
          <span className="text-white/30 text-sm">🔊</span>
        </div>
      </div>
    </div>
  );
}
