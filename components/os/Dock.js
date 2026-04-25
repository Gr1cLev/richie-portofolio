'use client';

import { useOS } from '../../context/OSContext';

const DOCK_ITEMS = [
  {
    id: 'about',
    label: 'About',
    emoji: '👤',
    gradientFrom: '#7c3aed',
    gradientTo: '#4f46e5',
    type: 'app',
  },
  {
    id: 'projects',
    label: 'Projects',
    emoji: '📂',
    gradientFrom: '#2563eb',
    gradientTo: '#0891b2',
    type: 'app',
  },
  {
    id: 'chat',
    label: 'AI Chat',
    emoji: '🤖',
    gradientFrom: '#059669',
    gradientTo: '#0d9488',
    type: 'chat',
  },
  {
    id: 'cv',
    label: 'CV',
    emoji: '📄',
    gradientFrom: '#b91c1c',
    gradientTo: '#c2410c',
    type: 'external',
    url: '/CV-RichieGiansanto-AI.pdf',
  },
];

export default function Dock() {
  const { state, dispatch } = useOS();

  const handleItem = (e, item) => {
    e.stopPropagation();
    if (item.type === 'app') {
      dispatch({ type: 'OPEN_APP', payload: item.id });
    } else if (item.type === 'chat') {
      if (typeof window !== 'undefined' && window.openChatbot) window.openChatbot();
    } else if (item.type === 'external') {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2"
      style={{ zIndex: 20 }}
    >
      <div className="flex items-end gap-1 md:gap-2 px-3 py-2.5 glass rounded-[22px]">
        {DOCK_ITEMS.map((item) => {
          const isOpen = state.openApp === item.id;

          return (
            <div key={item.id} className="flex flex-col items-center gap-1 group relative">
              {/* Tooltip */}
              <div
                className="absolute pointer-events-none px-2.5 py-1 glass rounded-xl text-white/80 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }}
              >
                {item.label}
              </div>

              {/* Icon */}
              <button
                onClick={(e) => handleItem(e, item)}
                aria-label={item.label}
                className="flex items-center justify-center text-xl md:text-2xl transition-all duration-200 ease-out hover:scale-125 hover:-translate-y-2 active:scale-90"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '22.37%',
                  background: `linear-gradient(145deg, ${item.gradientFrom}, ${item.gradientTo})`,
                  boxShadow: `0 4px 16px ${item.gradientFrom}44, 0 1px 0 rgba(255,255,255,0.22) inset`,
                }}
              >
                {item.emoji}
              </button>

              {/* Active dot */}
              {isOpen ? (
                <div className="w-1 h-1 rounded-full bg-white/60" />
              ) : (
                <div className="w-1 h-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
