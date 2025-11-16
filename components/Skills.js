import AnimatedSection from './AnimatedSection';

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-light-bg dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedSection animation="fade-up" className="text-center">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Technical Skills</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-12"></div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection animation="fade-up">
            <div className="bg-light-card dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:shadow-[0_0_20px_5px_rgb(251_146_60_/_0.3)] dark:hover:shadow-[0_0_20px_5px_rgb(249_115_22_/_0.5)]">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Languages & Web/App Development</h3>
              <div className="flex flex-wrap gap-3">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Kotlin</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">C#</span>
                <span className="skill-tag">FastAPI</span>
                <span className="skill-tag">Node.js (Express)</span>
                <span className="skill-tag">Android Studio</span>
                <span className="skill-tag">React (Basic)</span>
                <span className="skill-tag">RESTful API</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" style={{ transitionDelay: '100ms' }}>
            <div className="bg-light-card dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:shadow-[0_0_20px_5px_rgb(251_146_60_/_0.3)] dark:hover:shadow-[0_0_20px_5px_rgb(249_115_22_/_0.5)]">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Machine Learning & MLOps</h3>
              <div className="flex flex-wrap gap-3">
                <span className="skill-tag">Scikit-learn</span>
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">BERT Models</span>
                <span className="skill-tag">NLP</span>
                <span className="skill-tag">MLflow</span>
                <span className="skill-tag">GitHub Actions CI/CD</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Model Serving</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" className="md:col-span-2" style={{ transitionDelay: '200ms' }}>
            <div className="bg-light-card dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:shadow-[0_0_20px_5px_rgb(251_146_60_/_0.3)] dark:hover:shadow-[0_0_20px_5px_rgb(249_115_22_/_0.5)]">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Data Analysis & Tools</h3>
              <div className="flex flex-wrap gap-3">
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">NumPy</span>
                <span className="skill-tag">Text Processing</span>
                <span className="skill-tag">Git & GitHub</span>
                <span className="skill-tag">Google Colab</span>
                <span className="skill-tag">Kaggle</span>
                <span className="skill-tag">Jupyter Notebook</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
