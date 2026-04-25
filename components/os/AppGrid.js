import AppIcon from './AppIcon';

export const APPS = [
  {
    id: 'about',
    label: 'About Me',
    emoji: '👤',
    gradientFrom: '#7c3aed',
    gradientTo: '#4f46e5',
  },
  {
    id: 'projects',
    label: 'Projects',
    emoji: '📂',
    gradientFrom: '#2563eb',
    gradientTo: '#0891b2',
  },
  {
    id: 'skills',
    label: 'Skills',
    emoji: '⚡',
    gradientFrom: '#ea580c',
    gradientTo: '#d97706',
  },
  {
    id: 'contact',
    label: 'Contact',
    emoji: '✉️',
    gradientFrom: '#16a34a',
    gradientTo: '#0d9488',
  },
  {
    id: 'github',
    label: 'GitHub',
    emoji: null,
    useGithubIcon: true,
    gradientFrom: '#1c1c2e',
    gradientTo: '#374151',
    isExternal: true,
    externalUrl: 'https://github.com/Gr1cLev',
  },
  {
    id: 'chat',
    label: 'AI Chat',
    emoji: '🤖',
    gradientFrom: '#c026d3',
    gradientTo: '#7c3aed',
    isChat: true,
  },
  {
    id: 'cv',
    label: 'My CV',
    emoji: '📄',
    gradientFrom: '#b91c1c',
    gradientTo: '#c2410c',
    isExternal: true,
    externalUrl: '/CV-RichieGiansanto-AI.pdf',
  },
];

export default function AppGrid() {
  return (
    <div
      className="fixed inset-0 flex items-center"
      style={{ paddingTop: '80px', paddingBottom: '96px', paddingLeft: '20%',paddingRight: '20%'}}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: 'clamp(24px, 4vw, 72px)',
          rowGap: '48px',
          width: '100%',
          maxWidth: '960px',
          justifyItems: 'center',
        }}
      >
        {APPS.map((app, i) => (
          <AppIcon key={app.id} {...app} index={i} />
        ))}
      </div>
    </div>
  );
}
