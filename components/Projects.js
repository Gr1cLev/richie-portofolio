import AnimatedSection from './AnimatedSection';

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-light-card dark:bg-gray-800 bg-animated-light">
      <div></div>
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedSection animation="fade-up" className="text-center">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-12"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Here are some projects that showcase my skills in full-stack development, machine learning, and MLOps.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection animation="fade-up">
            <div className="bg-light-bg dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  USA Work Visa Prediction (MLOps)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  End-to-end MLOps project for predicting US work visa approval. Involves data pipeline, tracking (MLflow), validation, and CI/CD deployment.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">MLflow</span>
                  <span className="skill-tag">Scikit-learn</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">FastAPI</span>
                  <span className="skill-tag">CI/CD</span>
                </div>
                <a
                  href="https://github.com/Gr1cLev/usa-work-visa-prediction-MLFlow-logistic-regression"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 font-medium transition-colors"
                >
                  View on GitHub &rarr;
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" style={{ transitionDelay: '100ms' }}>
            <div className="bg-light-bg dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  Sentiment Analysis (Israel-Palestine)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  In-depth sentiment analysis (NLP) on Reddit comments using Classic models (SVM, LR) and Deep Learning (BERT, BiLSTM) for time-series layout inference.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">TensorFlow</span>
                  <span className="skill-tag">PyTorch</span>
                  <span className="skill-tag">NLP</span>
                  <span className="skill-tag">BERT</span>
                </div>
                <a
                  href="https://github.com/Gr1cLev/Israel-Palestine-Sentiment-Analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 font-medium transition-colors"
                >
                  View on GitHub &rarr;
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <div className="bg-light-bg dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  NewsApp ML Recommendation API
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  End-to-end ML pipeline for topic classification and news recommendations. Model exposed through API using FastAPI.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">FastAPI</span>
                  <span className="skill-tag">Scikit-learn</span>
                  <span className="skill-tag">Docker</span>
                </div>
                <a
                  href="https://github.com/Gr1cLev/NewsApp-ML-RecommendationSystem-API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 font-medium transition-colors"
                >
                  View on GitHub &rarr;
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" style={{ transitionDelay: '100ms' }}>
            <div className="bg-light-bg dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  NewsApp (Android Fullstack)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Android-based news application (Kotlin) built in Android Studio. Implements API integration, JSON parsing, and responsive layout.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="skill-tag">Kotlin</span>
                  <span className="skill-tag">Android</span>
                  <span className="skill-tag">REST API</span>
                </div>
                <a
                  href="https://github.com/Gr1cLev/NewsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 font-medium transition-colors"
                >
                  View on GitHub &rarr;
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection animation="fade-up" className="mt-12 text-center">
          <a
            href="https://github.com/Gr1cLev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            View More Projects on GitHub
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
