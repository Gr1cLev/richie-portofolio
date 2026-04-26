'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  openApp: null,
  controlCenterOpen: false,
  spotlightOpen: false,
  jiggleMode: false,
  brightness: 60,
  volume: 50,
  locked: true,
  wallpaper: null,       // null = default wallpaper.jpg, else base64
  musicPlaying: false,
  currentTrack: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_APP':
      return { ...state, openApp: action.payload, controlCenterOpen: false, spotlightOpen: false, jiggleMode: false };
    case 'CLOSE_APP':
      return { ...state, openApp: null };
    case 'TOGGLE_CONTROL_CENTER':
      return { ...state, controlCenterOpen: !state.controlCenterOpen, spotlightOpen: false };
    case 'CLOSE_CONTROL_CENTER':
      return { ...state, controlCenterOpen: false };
    case 'OPEN_SPOTLIGHT':
      return { ...state, spotlightOpen: true, controlCenterOpen: false };
    case 'CLOSE_SPOTLIGHT':
      return { ...state, spotlightOpen: false };
    case 'TOGGLE_JIGGLE':
      return { ...state, jiggleMode: !state.jiggleMode };
    case 'EXIT_JIGGLE':
      return { ...state, jiggleMode: false };
    case 'SET_BRIGHTNESS':
      return { ...state, brightness: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'LOCK':
      return { ...state, locked: true, controlCenterOpen: false, openApp: null, spotlightOpen: false };
    case 'UNLOCK':
      return { ...state, locked: false };
    case 'SET_WALLPAPER':
      return { ...state, wallpaper: action.payload };
    case 'TOGGLE_MUSIC':
      return { ...state, musicPlaying: !state.musicPlaying };
    case 'SET_TRACK':
      return { ...state, currentTrack: action.payload };
    default:
      return state;
  }
}

const OSContext = createContext(null);

export function OSProvider({ children, defaultOpenApp = null }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    openApp: defaultOpenApp,
  });

  // Persist wallpaper in localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('os_wallpaper');
    if (saved) dispatch({ type: 'SET_WALLPAPER', payload: saved });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (state.wallpaper) {
      localStorage.setItem('os_wallpaper', state.wallpaper);
    } else {
      localStorage.removeItem('os_wallpaper');
    }
  }, [state.wallpaper]);

  return (
    <OSContext.Provider value={{ state, dispatch }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error('useOS must be used inside OSProvider');
  return ctx;
}
