'use client';

import { useRef } from 'react';
import { useOS } from '../../context/OSContext';

export default function AppIcon({
  id, label, emoji, gradientFrom, gradientTo,
  isExternal, externalUrl, useGithubIcon, isChat, index,
}) {
  const { state, dispatch } = useOS();
  const longPressTimer = useRef(null);

  const handlePointerDown = () => {
    longPressTimer.current = setTimeout(() => {
      dispatch({ type: 'TOGGLE_JIGGLE' });
    }, 600);
  };

  const clearLongPress = () => clearTimeout(longPressTimer.current);

  const handleClick = (e) => {
    e.stopPropagation();
    clearLongPress();

    if (state.jiggleMode) {
      dispatch({ type: 'EXIT_JIGGLE' });
      return;
    }

    if (isChat) {
      if (typeof window !== 'undefined' && window.openChatbot) window.openChatbot();
      return;
    }

    if (isExternal) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    dispatch({ type: 'OPEN_APP', payload: id });
  };

  const isOpen = state.openApp === id;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        role="button"
        aria-label={`Open ${label}`}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={clearLongPress}
        onPointerLeave={clearLongPress}
        className={[
          'w-16 h-16 md:w-[72px] md:h-[72px] cursor-pointer',
          'flex items-center justify-center',
          'transition-transform duration-200 ease-out',
          'hover:scale-110 active:scale-90',
          state.jiggleMode ? 'animate-jiggle' : '',
        ].join(' ')}
        style={{
          borderRadius: '22.37%',
          background: `linear-gradient(145deg, ${gradientFrom}, ${gradientTo})`,
          boxShadow: [
            `0 6px 24px ${gradientFrom}55`,
            '0 1px 0 rgba(255,255,255,0.28) inset',
            isOpen ? `0 0 0 2.5px rgba(255,255,255,0.5)` : '',
          ].filter(Boolean).join(', '),
          animationDelay: `${index * 35}ms`,
        }}
      >
        {useGithubIcon ? (
          <svg className="w-8 h-8 text-white/90" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.85 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
          </svg>
        ) : (
          <span className="text-2xl md:text-3xl leading-none">{emoji}</span>
        )}
      </div>

      {/* Label */}
      <span
        className="text-white/80 font-medium text-center leading-tight"
        style={{ fontSize: '11px', maxWidth: '72px', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
      >
        {label}
      </span>

      {/* Open indicator */}
      {isOpen && (
        <div className="w-1 h-1 rounded-full bg-white/70 -mt-1" />
      )}
    </div>
  );
}
