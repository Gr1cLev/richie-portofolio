const contacts = [
  {
    emoji: '📧',
    label: 'Email',
    value: 'richiegiansanto@gmail.com',
    href: 'mailto:richiegiansanto@gmail.com',
  },
  {
    emoji: '💬',
    label: 'WhatsApp',
    value: '+62 813 8577 0691',
    href: 'https://wa.me/6281385770691',
    external: true,
  },
  {
    emoji: '💼',
    label: 'LinkedIn',
    value: 'richie-giansanto',
    href: 'https://www.linkedin.com/in/richie-giansanto/',
    external: true,
  },
  {
    emoji: '📸',
    label: 'Instagram',
    value: '@richie.gian_',
    href: 'https://www.instagram.com/richie.gian_/',
    external: true,
  },
];

export default function ContactApp() {
  return (
    <div className="p-5 md:p-8 space-y-5">
      <div className="text-center py-4">
        <p className="text-4xl mb-3">✉️</p>
        <h3 className="text-white font-bold text-xl">Let&apos;s Connect</h3>
        <p className="text-white/45 text-sm mt-2">
          Open to internship opportunities and project collaborations.
        </p>
      </div>

      {/* Action sheet */}
      <div className="glass-card overflow-hidden">
        {contacts.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target={c.external ? '_blank' : undefined}
            rel={c.external ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.06] transition-colors group"
            style={{ borderBottom: i < contacts.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform"
              style={{ background: 'rgba(255,159,64,0.14)', border: '1px solid rgba(255,159,64,0.25)' }}
            >
              {c.emoji}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mb-0.5">{c.label}</p>
              <p className="text-white/85 text-sm font-medium truncate group-hover:text-white transition-colors">{c.value}</p>
            </div>

            {/* Chevron */}
            <svg
              className="w-4 h-4 text-white/20 group-hover:text-white/45 group-hover:translate-x-0.5 transition-all flex-shrink-0"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>

      <div className="h-4" />
    </div>
  );
}
