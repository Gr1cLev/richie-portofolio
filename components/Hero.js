import AnimatedSection from './AnimatedSection';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-28 md:py-20">
      <AnimatedSection animation="fade-up" className="w-full max-w-[520px]">
        <div className="glass-thick p-8 md:p-12 flex flex-col items-center text-center">

          {/* Profile Photo */}
          <div className="relative mb-7">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-[2px] glass">
              <Image
                src="/upscalemedia-transformed.jpeg"
                alt="Richie Giansanto"
                width={144}
                height={144}
                className="rounded-full object-cover w-full h-full"
                priority
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
            Richie Giansanto
          </h1>

          {/* Title */}
          <p className="text-base md:text-lg font-medium mb-5" style={{ color: 'rgba(255, 185, 100, 0.92)' }}>
            Full-Stack Developer &amp; ML Engineer
          </p>

          {/* Bio */}
          <p className="text-white/55 text-sm md:text-[15px] max-w-xs leading-relaxed mb-8">
            CS student at UMN · Specializing in Machine Learning, NLP, MLOps, and full-stack application development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mb-8">
            <a
              href="#projects"
              className="btn-primary px-6 py-2.5 rounded-2xl text-white font-semibold text-sm"
            >
              View My Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-2xl glass text-white/80 hover:text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
            >
              Contact Me
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-6" />

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/Gr1cLev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-full glass text-white/55 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.85 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/richie.gian_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full glass text-white/55 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.669 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.669-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.356.2-6.784 2.63-6.98 6.98-.058 1.281-.072 1.689-.072 4.948s.014 3.667.072 4.947c.2 4.356 2.624 6.784 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.356-.2 6.784-2.624 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.356-2.624-6.784-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838a6 6 0 100 12 6 6 0 000-12zm0 9.802a3.802 3.802 0 110-7.604 3.802 3.802 0 010 7.604zm4.068-7.802a1.45 1.45 0 110 2.9 1.45 1.45 0 010-2.9z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/richie-giansanto/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full glass text-white/55 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732C5.534 6.732 4.75 5.948 4.75 4.982s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
              </svg>
            </a>
          </div>

        </div>
      </AnimatedSection>
    </section>
  );
}
