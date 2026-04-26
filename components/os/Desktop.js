'use client';

import { useEffect, useRef, useState } from 'react';
import { useOS } from '../../context/OSContext';
import StatusBar from './StatusBar';

const TRACKS = [
  { src: '/music/golden-hour.mp3' },
  { src: '/music/billie-jean.mp3' },
  { src: '/music/beauty-and-a-beat.mp3' },
];
import AppGrid from './AppGrid';
import Dock from './Dock';
import WindowManager from './WindowManager';
import ControlCenter from './ControlCenter';
import SpotlightSearch from './SpotlightSearch';
import LockScreen from './LockScreen';

export default function Desktop() {
  const { state, dispatch } = useOS();
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const bgLongPressRef = useRef(null);
  const ccRef = useRef(null);
  const [rightClickTip, setRightClickTip] = useState(null); // {x, y}
  const [wallpaperMenu, setWallpaperMenu] = useState(null); // {x, y}
  const [blinking, setBlinking] = useState(false);

  // Sync volume to audio
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = state.volume / 100;
  }, [state.volume]);

  // Sync play/pause to audio
  useEffect(() => {
    if (!audioRef.current) return;
    if (state.musicPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [state.musicPlaying]);

  // Expose audio controls globally (for MusicApp)
  useEffect(() => {
    window.audioControls = {
      play:        () => audioRef.current?.play(),
      pause:       () => audioRef.current?.pause(),
      getTime:     () => audioRef.current?.currentTime ?? 0,
      getDuration: () => audioRef.current?.duration ?? 0,
      seek:        (t) => { if (audioRef.current) audioRef.current.currentTime = t; },
    };
    return () => { delete window.audioControls; };
  }, []);

  // Right-click → custom tooltip
  useEffect(() => {
    const onContextMenu = (e) => {
      e.preventDefault();
      setRightClickTip({ x: e.clientX, y: e.clientY });
      setWallpaperMenu(null);
      const t = setTimeout(() => setRightClickTip(null), 2000);
      return () => clearTimeout(t);
    };
    document.addEventListener('contextmenu', onContextMenu);
    return () => document.removeEventListener('contextmenu', onContextMenu);
  }, []);

  // Capture-phase listener: fires before any stopPropagation in child components.
  // Check if click is inside CC before closing — if so, let CC handle it.
  useEffect(() => {
    const dismiss = (e) => {
      setRightClickTip(null);
      setWallpaperMenu(null);
      if (ccRef.current && ccRef.current.contains(e.target)) return;
      dispatch({ type: 'CLOSE_CONTROL_CENTER' });
    };
    document.addEventListener('click', dismiss, true);
    return () => document.removeEventListener('click', dismiss, true);
  }, [dispatch]);

  const handleBgPointerDown = (e) => {
    bgLongPressRef.current = setTimeout(() => {
      setWallpaperMenu({ x: e.clientX, y: e.clientY });
      setRightClickTip(null);
    }, 600);
  };

  const handleBgPointerUp = () => clearTimeout(bgLongPressRef.current);

  const handleBgClick = (e) => {
    clearTimeout(bgLongPressRef.current);
    if (state.controlCenterOpen) dispatch({ type: 'CLOSE_CONTROL_CENTER' });
    if (state.jiggleMode) dispatch({ type: 'EXIT_JIGGLE' });
  };

  const handleUnlock = () => {
    dispatch({ type: 'UNLOCK' });
  };

  const handleLock = () => {
    setBlinking(true);
    setTimeout(() => {
      dispatch({ type: 'LOCK' });
      setBlinking(false);
    }, 250);
  };

  const triggerWallpaperPicker = () => {
    setWallpaperMenu(null);
    fileInputRef.current?.click();
  };

  const handleWallpaperFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      dispatch({ type: 'SET_WALLPAPER', payload: ev.target.result });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Expose lock for ControlCenter
  useEffect(() => {
    window.lockScreen = handleLock;
    window.changeWallpaper = triggerWallpaperPicker;
    return () => { delete window.lockScreen; delete window.changeWallpaper; };
  });

  const wallpaperUrl = state.wallpaper || '/Makii.jpg';
  const dimOpacity = (100 - state.brightness) / 100 * 0.75;

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ zIndex: 1 }}
    >
      {/* Wallpaper — background layer with long-press handler */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 0 }}
        onPointerDown={handleBgPointerDown}
        onPointerUp={handleBgPointerUp}
        onPointerLeave={handleBgPointerUp}
        onClick={handleBgClick}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${wallpaperUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Subtle aurora tint over wallpaper */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(88,28,220,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, rgba(14,50,140,0.14) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* CC backdrop blur */}
      {state.controlCenterOpen && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.18)', zIndex: 5 }}
        />
      )}

      {/* Background music */}
      <audio
        key={state.currentTrack}
        ref={audioRef}
        src={TRACKS[state.currentTrack]?.src ?? TRACKS[0].src}
        preload="auto"
        loop
        onCanPlay={(e) => {
          e.target.volume = state.volume / 100;
          if (state.musicPlaying) e.target.play().catch(() => {});
        }}
      />

      {/* Hidden wallpaper file input */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleWallpaperFile} />

      {/* OS UI */}
      <StatusBar onLock={handleLock} />
      <AppGrid />
      <Dock />
      <WindowManager />
      {state.controlCenterOpen && <ControlCenter ref={ccRef} onLock={handleLock} onChangeWallpaper={triggerWallpaperPicker} />}
      {state.spotlightOpen && <SpotlightSearch />}

      {/* Right-click tooltip */}
      {rightClickTip && (
        <div
          className="fixed pointer-events-none animate-cc-drop"
          style={{ left: rightClickTip.x + 12, top: rightClickTip.y + 8, zIndex: 900 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="px-3.5 py-2 text-white/80 text-xs rounded-2xl"
            style={{ background: 'rgba(30,25,50,0.92)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', whiteSpace: 'nowrap' }}
          >
            iPad doesn&apos;t support right-click 😄
          </div>
        </div>
      )}

      {/* Long-press wallpaper context menu */}
      {wallpaperMenu && (
        <div
          className="fixed animate-cc-drop"
          style={{ left: wallpaperMenu.x, top: wallpaperMenu.y, zIndex: 900, transform: 'translateX(-50%)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="overflow-hidden rounded-2xl"
            style={{ background: 'rgba(30,25,50,0.94)', backdropFilter: 'blur(32px)', border: '1px solid rgba(255,255,255,0.13)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)', minWidth: '200px' }}
          >
            <button
              onClick={triggerWallpaperPicker}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
            >
              <span className="text-lg">🖼️</span>
              <span className="text-white/85 text-sm font-medium">Change Wallpaper</span>
            </button>
            {state.wallpaper && (
              <button
                onClick={() => { dispatch({ type: 'SET_WALLPAPER', payload: null }); setWallpaperMenu(null); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left border-t border-white/[0.07]"
              >
                <span className="text-lg">↩️</span>
                <span className="text-white/85 text-sm font-medium">Reset to Default</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Lock screen */}
      {state.locked && <LockScreen onUnlock={handleUnlock} />}

      {/* Blink transition overlay (home → lock) */}
      {blinking && (
        <div
          className="fixed inset-0 animate-blink-lock pointer-events-none"
          style={{ background: '#000', zIndex: 600 }}
        />
      )}

      {/* Global brightness overlay — on top of EVERYTHING except blink */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `rgba(0,0,0,${dimOpacity.toFixed(3)})`,
          zIndex: 595,
          transition: 'background 0.2s ease',
        }}
      />
    </div>
  );
}
