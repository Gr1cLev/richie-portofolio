import AnimatedSection from './AnimatedSection';

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
          <div className="section-title-bar" />
        </AnimatedSection>

        {/* Two Glass Panels */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Left Panel — Narrative */}
          <AnimatedSection animation="fade-left" className="md:w-[58%]">
            <div className="glass-card p-7 md:p-9 h-full">
              <h3 className="text-xl font-semibold text-white mb-5">
                Bridging Software Engineering &amp; Artificial Intelligence
              </h3>
              <p className="text-white/60 text-[15px] leading-relaxed mb-4">
                I am a dedicated software developer with a dual focus on{' '}
                <span className="text-white/85 font-medium">full-stack development</span> and{' '}
                <span className="text-white/85 font-medium">machine learning mastery</span>. I build
                applications end-to-end — from robust backends (Node.js, FastAPI) to responsive
                interfaces (Android Kotlin, React).
              </p>
              <p className="text-white/60 text-[15px] leading-relaxed mb-4">
                I have deep expertise in the machine learning lifecycle: data processing (NLP, Pandas),
                model building and deployment (Scikit-learn, PyTorch, BERT), and{' '}
                <span className="text-white/85 font-medium">MLOps</span> workflows including CI/CD,
                Docker, and MLflow.
              </p>
              <p className="text-white/60 text-[15px] leading-relaxed">
                I&apos;m a proactive and adaptive learner, always seeking opportunities to apply my
                skills to challenging real-world problems.
              </p>
            </div>
          </AnimatedSection>

          {/* Right Panel — Personal Info (orange tint) */}
          <AnimatedSection animation="fade-right" delay="100ms" className="md:w-[42%]">
            <div className="glass-card glass-orange p-7 md:p-8 h-full flex flex-col">
              <h4 className="text-base font-semibold text-white/80 uppercase tracking-widest text-xs mb-6">
                Personal Info
              </h4>

              <ul className="space-y-4 flex-1">
                {[
                  { label: 'Name', value: 'Richie Giansanto' },
                  { label: 'Location', value: 'Tangerang City, Indonesia' },
                  { label: 'Email', value: 'richiegiansanto@gmail.com' },
                  { label: 'Phone', value: '+62 813 8577 0691' },
                  { label: 'Education', value: 'Informatics, UMN' },
                  { label: 'GPA', value: '3.95 / 4.00' },
                ].map(({ label, value }) => (
                  <li key={label} className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,185,100,0.70)' }}>
                      {label}
                    </span>
                    <span className="text-white/85 text-sm">{value}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/CV-RichieGiansanto-AI.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7 block text-center py-2.5 px-5 rounded-2xl text-white font-semibold text-sm"
              >
                Download CV
              </a>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
