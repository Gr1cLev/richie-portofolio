import AnimatedSection from './AnimatedSection';

const projects = [
  {
    icon: '🔬',
    title: 'USA Work Visa Prediction (MLOps)',
    description: 'End-to-end MLOps project for predicting US work visa approval. Involves data pipeline, experiment tracking (MLflow), validation, and CI/CD deployment.',
    tags: ['Python', 'MLflow', 'Scikit-learn', 'MongoDB', 'FastAPI', 'CI/CD'],
    url: 'https://github.com/Gr1cLev/usa-work-visa-prediction-MLFlow-logistic-regression',
    accent: 'rgba(139, 92, 246, 0.25)',
  },
  {
    icon: '💬',
    title: 'Sentiment Analysis (Israel-Palestine)',
    description: 'In-depth NLP sentiment analysis on Reddit comments using classic models (SVM, LR) and deep learning (BERT, BiLSTM) for time-series layout inference.',
    tags: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'BERT'],
    url: 'https://github.com/Gr1cLev/Israel-Palestine-Sentiment-Analysis',
    accent: 'rgba(14, 165, 233, 0.22)',
  },
  {
    icon: '📰',
    title: 'NewsApp ML Recommendation API',
    description: 'End-to-end ML pipeline for topic classification and personalized news recommendations, exposed through a production-ready FastAPI service.',
    tags: ['Python', 'FastAPI', 'Scikit-learn', 'Docker'],
    url: 'https://github.com/Gr1cLev/NewsApp-ML-RecommendationSystem-API',
    accent: 'rgba(52, 211, 153, 0.20)',
  },
  {
    icon: '📱',
    title: 'NewsApp (Android Fullstack)',
    description: 'Android-based news application built in Kotlin with Android Studio. Implements REST API integration, JSON parsing, and responsive layout.',
    tags: ['Kotlin', 'Android', 'REST API'],
    url: 'https://github.com/Gr1cLev/NewsApp',
    accent: 'rgba(244, 114, 182, 0.20)',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
          <div className="section-title-bar" />
          <p className="text-white/50 text-[15px] max-w-xl mx-auto mb-10">
            Showcasing skills in full-stack development, machine learning, and MLOps.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <AnimatedSection
              key={project.title}
              animation="fade-up"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="glass-card p-6 md:p-7 h-full flex flex-col group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                style={{ '--project-accent': project.accent }}
              >
                {/* Icon + Title Row */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: project.accent, border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    {project.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white leading-snug pt-1">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-white/55 text-[14px] leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="skill-tag text-[12px] px-2.5 py-1">{tag}</span>
                  ))}
                </div>

                {/* GitHub Link */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-all duration-200 group/link w-fit"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.85 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                  <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* View More */}
        <AnimatedSection animation="fade-up" className="mt-10 text-center">
          <a
            href="https://github.com/Gr1cLev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-white font-semibold text-sm transition-all duration-200 hover:scale-105 glass hover:bg-white/10"
          >
            View More on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </AnimatedSection>

      </div>
    </section>
  );
}
