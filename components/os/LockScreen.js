'use client';

import { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

const WEATHER_CODES = {
  0: { icon: '☀️', desc: 'Clear' },
  1: { icon: '🌤️', desc: 'Mostly Clear' },
  2: { icon: '⛅', desc: 'Partly Cloudy' },
  3: { icon: '☁️', desc: 'Overcast' },
  45: { icon: '🌫️', desc: 'Foggy' },
  48: { icon: '🌫️', desc: 'Foggy' },
  51: { icon: '🌦️', desc: 'Drizzle' },
  61: { icon: '🌧️', desc: 'Rain' },
  71: { icon: '❄️', desc: 'Snow' },
  80: { icon: '🌦️', desc: 'Showers' },
  95: { icon: '⛈️', desc: 'Thunderstorm' },
};

function getWeatherInfo(code) {
  if (code === 0) return WEATHER_CODES[0];
  if (code <= 3) return WEATHER_CODES[code] || WEATHER_CODES[3];
  if (code <= 48) return WEATHER_CODES[45];
  if (code <= 67) return WEATHER_CODES[61];
  if (code <= 77) return WEATHER_CODES[71];
  if (code <= 82) return WEATHER_CODES[80];
  return WEATHER_CODES[95];
}

export default function LockScreen({ onUnlock }) {
  const { state } = useOS();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | faceId | done
  const [weather, setWeather] = useState(null);
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

  // Weather via Open-Meteo (no API key needed)
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weathercode&temperature_unit=celsius`
          );
          const data = await res.json();
          const code = data.current.weathercode;
          const temp = Math.round(data.current.temperature_2m);
          setWeather({ ...getWeatherInfo(code), temp });
        } catch {
          // silently fail
        }
      },
      () => {} // denied — no weather shown
    );
  }, []);

  const handleTap = () => {
    if (phase !== 'idle') return;
    setPhase('faceId');
    // Face ID completes, then swipe up
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

        {/* Weather */}
        {weather && (
          <div className="flex items-center gap-2 mt-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)' }}>
            <span className="text-lg">{weather.icon}</span>
            <span className="text-white/85 text-sm font-medium">{weather.temp}°C · {weather.desc}</span>
          </div>
        )}

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
          {/* Swipe up arrow */}
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
