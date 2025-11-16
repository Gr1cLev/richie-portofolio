import AnimatedSection from './AnimatedSection';

export default function About() {
  return (
    <section id="about" className="py-20 bg-light-card dark:bg-gray-800">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedSection animation="fade-up" className="text-center">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-12"></div>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <AnimatedSection animation="fade-left" className="md:w-2/3">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Bridging Software Engineering and Artificial Intelligence
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              I am a dedicated software developer with a dual focus on <strong className="text-gray-900 dark:text-white">full-stack development</strong> and <strong className="text-gray-900 dark:text-white">machine learning mastery</strong>. I have experience building applications from start to finish, from robust backends (Node.js, FastAPI) to responsive user interfaces (Android Kotlin, React).
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              On the other hand, I have deep expertise in the machine learning lifecycle, from data processing (NLP, pandas) to building and deploying predictive models (scikit-learn, PyTorch, BERT). I am passionate about solving complex problems with efficient <strong className="text-gray-900 dark:text-white">MLOps</strong> workflows, including CI/CD, Docker, and MLflow.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              I am a proactive and adaptive quick learner, always seeking opportunities to apply my skills to challenging real-world projects.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-right" className="md:w-1/3">
            <div className="bg-light-bg dark:bg-gray-900 p-6 rounded-lg shadow-xl">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Info</h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Name:</strong> Richie Giansanto
                </li>
                <li>
                  <strong>Location:</strong> Tangerang City, Indonesia
                </li>
                <li>
                  <strong>Email:</strong> richiegiansanto@gmail.com
                </li>
                <li>
                  <strong>Phone:</strong> +62 81385770691
                </li>
                <li>
                  <strong>Education:</strong> B.S. Computer Science, UMN (GPA: 3.95)
                </li>
              </ul>
              <a
                href="/CV-RichieGiansanto.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                View My CV
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
