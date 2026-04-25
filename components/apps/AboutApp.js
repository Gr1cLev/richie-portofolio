import Image from 'next/image';

const stats = [
  { value: '3.95', label: 'GPA' },
  { value: '3+', label: 'Years Coding' },
  { value: '4+', label: 'Projects' },
];

const info = [
  { label: 'Full Name',  value: 'Richie Giansanto' },
  { label: 'Location',   value: 'Tangerang City, Indonesia' },
  { label: 'Email',      value: 'richiegiansanto@gmail.com' },
  { label: 'Phone',      value: '+62 813 8577 0691' },
  { label: 'Education',  value: 'Informatics, UMN' },
];

export default function AboutApp() {
  return (
    <div className="p-5 md:p-8 space-y-6">

      {/* Profile header */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full glass p-0.5 flex-shrink-0">
          <Image
            src="/upscalemedia-transformed.jpeg"
            alt="Richie Giansanto"
            width={80}
            height={80}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-white font-bold text-xl leading-tight">Richie Giansanto</h2>
          <p className="text-white/50 text-sm mt-1">Full-Stack Developer &amp; ML Engineer</p>
          <span
            className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
            style={{ background: 'rgba(52,211,153,0.18)', border: '1px solid rgba(52,211,153,0.35)', color: 'rgba(110,231,183,0.95)' }}
          >
            Open to Opportunities
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-4 text-center">
            <p className="text-white font-bold text-2xl">{s.value}</p>
            <p className="text-white/45 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="glass-card p-5 space-y-3">
        <h3 className="text-white font-semibold text-sm">About</h3>
        <p className="text-white/60 text-sm leading-relaxed">
          Dedicated CS student at UMN with a dual focus on{' '}
          <span className="text-white/85 font-medium">full-stack development</span> and{' '}
          <span className="text-white/85 font-medium">machine learning mastery</span>. I build
          applications end-to-end — from robust backends (Node.js, FastAPI) to responsive Android
          interfaces (Kotlin).
        </p>
        <p className="text-white/60 text-sm leading-relaxed">
          Deep expertise in the ML lifecycle: data processing, model building (PyTorch, BERT),
          and <span className="text-white/85 font-medium">MLOps</span> workflows (CI/CD, Docker, MLflow).
        </p>
      </div>

      {/* Personal info list */}
      <div className="glass-card overflow-hidden">
        {info.map((item, i) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-5 py-3.5"
            style={{ borderBottom: i < info.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
          >
            <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">{item.label}</span>
            <span className="text-white/80 text-sm text-right max-w-[60%] truncate">{item.value}</span>
          </div>
        ))}
      </div>

      {/* CV Download */}
      <a
        href="/CV-RichieGiansanto-AI.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white font-semibold text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download CV
      </a>

      <div className="h-4" />
    </div>
  );
}
