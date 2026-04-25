const projects = [
  {
    icon: '🔬',
    title: 'USA Work Visa Prediction (MLOps)',
    description: 'End-to-end MLOps project for predicting US work visa approval. Data pipeline, MLflow experiment tracking, validation, and CI/CD deployment.',
    tags: ['Python', 'MLflow', 'Scikit-learn', 'MongoDB', 'FastAPI', 'CI/CD'],
    url: 'https://github.com/Gr1cLev/usa-work-visa-prediction-MLFlow-logistic-regression',
    accent: 'rgba(139,92,246,0.22)',
  },
  {
    icon: '💬',
    title: 'Sentiment Analysis (Israel-Palestine)',
    description: 'In-depth NLP sentiment analysis on Reddit comments using classic ML (SVM, LR) and deep learning (BERT, BiLSTM) for time-series inference.',
    tags: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'BERT', 'BiLSTM'],
    url: 'https://github.com/Gr1cLev/Israel-Palestine-Sentiment-Analysis',
    accent: 'rgba(14,165,233,0.22)',
  },
  {
    icon: '📰',
    title: 'NewsApp ML Recommendation API',
    description: 'End-to-end ML pipeline for topic classification and personalized news recommendations, served via a production-ready FastAPI service in Docker.',
    tags: ['Python', 'FastAPI', 'Scikit-learn', 'Docker'],
    url: 'https://github.com/Gr1cLev/NewsApp-ML-RecommendationSystem-API',
    accent: 'rgba(52,211,153,0.20)',
  },
  {
    icon: '📱',
    title: 'NewsApp (Android Fullstack)',
    description: 'Android news application built with Kotlin and Android Studio. Implements REST API integration, JSON parsing, and a responsive modern layout.',
    tags: ['Kotlin', 'Android Studio', 'REST API'],
    url: 'https://github.com/Gr1cLev/NewsApp',
    accent: 'rgba(244,114,182,0.20)',
  },
];

export default function ProjectsApp() {
  return (
    <div className="p-5 md:p-8 space-y-4">
      <p className="text-white/45 text-sm">
        Showcasing skills in full-stack development, machine learning, and MLOps.
      </p>

      {projects.map((p) => (
        <div
          key={p.title}
          className="glass-card p-5 flex flex-col gap-3.5"
        >
          {/* Icon + title */}
          <div className="flex items-start gap-3.5">
            <div
              className="w-11 h-11 rounded-[14px] flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: p.accent, border: '1px solid rgba(255,255,255,0.10)' }}
            >
              {p.icon}
            </div>
            <h3 className="text-white font-semibold text-sm leading-snug pt-1">{p.title}</h3>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed">{p.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((tag) => (
              <span key={tag} className="skill-tag" style={{ fontSize: '11px', padding: '3px 10px' }}>{tag}</span>
            ))}
          </div>

          {/* GitHub link */}
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/40 hover:text-white/80 text-xs font-medium transition-colors w-fit group"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.85 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
            View on GitHub
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      ))}

      {/* More on GitHub */}
      <a
        href="https://github.com/Gr1cLev"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl glass text-white/60 hover:text-white text-sm font-medium transition-all hover:bg-white/10"
      >
        View More on GitHub
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>

      <div className="h-4" />
    </div>
  );
}
