import AnimatedSection from './AnimatedSection';

const contacts = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'richiegiansanto@gmail.com',
    href: 'mailto:richiegiansanto@gmail.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.28 4.96L2 22l5.24-1.38c1.47.76 3.09 1.17 4.8 1.17h.01c5.45 0 9.9-4.45 9.9-9.9s-4.45-9.9-9.9-9.9zM17.2 15.6c-.19-.1-.44-.21-.64-.32-.2-.11-.35-.17-.5-.17-.16 0-.31.06-.46.34-.15.28-.57.68-.7.81-.13.13-.25.15-.46.1s-.82-.3-1.56-.9c-.58-.47-1.04-1.04-1.2-1.22-.17-.18-.04-.28.07-.39.09-.09.2-.23.3-.32.1-.09.15-.17.21-.28.06-.11.03-.21-.03-.28-.06-.07-.5-.61-.68-.81-.18-.21-.36-.17-.5-.17-.13 0-.28.03-.41.03-.13 0-.34.06-.51.34-.17.28-.68.65-.68 1.59 0 .94.7 1.85.8 1.98.1.13 1.39 2.13 3.36 2.96.47.2.83.31 1.12.4.47.13.88.12 1.21.07.38-.06.82-.33.93-.64.11-.31.11-.57.08-.64-.03-.07-.15-.12-.34-.22z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+62 813 8577 0691',
    href: 'https://wa.me/6281385770691',
    external: true,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'richie-giansanto',
    href: 'https://www.linkedin.com/in/richie-giansanto/',
    external: true,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.669 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.669-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.356.2-6.784 2.63-6.98 6.98-.058 1.281-.072 1.689-.072 4.948s.014 3.667.072 4.947c.2 4.356 2.624 6.784 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.356-.2 6.784-2.624 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.356-2.624-6.784-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838a6 6 0 100 12 6 6 0 000-12zm0 9.802a3.802 3.802 0 110-7.604 3.802 3.802 0 010 7.604zm4.068-7.802a1.45 1.45 0 110 2.9 1.45 1.45 0 010-2.9z" />
      </svg>
    ),
    label: 'Instagram',
    value: '@richie.gian_',
    href: 'https://www.instagram.com/richie.gian_/',
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-4 pb-32 md:pb-24">
      <div className="container mx-auto max-w-lg">

        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contact Me</h2>
          <div className="section-title-bar" />
          <p className="text-white/50 text-[15px] max-w-sm mx-auto">
            Open to internship opportunities and project collaborations. Let&apos;s connect.
          </p>
        </AnimatedSection>

        {/* Action Sheet Container */}
        <AnimatedSection animation="fade-up" style={{ transitionDelay: '100ms' }}>
          <div className="glass-thick overflow-hidden">
            {contacts.map((contact, i) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/06 transition-colors duration-150 group"
                style={{ borderBottom: i < contacts.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-xl glass-orange flex items-center justify-center text-orange-300/85 flex-shrink-0 group-hover:scale-105 transition-transform">
                  {contact.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/35 mb-0.5">
                    {contact.label}
                  </p>
                  <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">
                    {contact.value}
                  </p>
                </div>

                {/* Chevron */}
                <svg className="w-4 h-4 text-white/25 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
