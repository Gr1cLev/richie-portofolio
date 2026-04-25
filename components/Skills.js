import AnimatedSection from './AnimatedSection';

const skillGroups = [
  {
    icon: '🖥️',
    title: 'Languages & Web/App Dev',
    tags: ['Python', 'Kotlin', 'JavaScript', 'SQL', 'Java', 'C#', 'FastAPI', 'Node.js (Express)', 'Android Studio', 'React (Basic)', 'RESTful API'],
  },
  {
    icon: '🤖',
    title: 'Machine Learning & MLOps',
    tags: ['Scikit-learn', 'PyTorch', 'BERT Models', 'NLP', 'MLflow', 'GitHub Actions CI/CD', 'Docker', 'Model Serving'],
  },
  {
    icon: '📊',
    title: 'Data Analysis & Tools',
    tags: ['Pandas', 'NumPy', 'Text Processing', 'Git & GitHub', 'Google Colab', 'Kaggle', 'Jupyter Notebook'],
    wide: true,
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Technical Skills</h2>
          <div className="section-title-bar" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGroups.map((group, i) => (
            <AnimatedSection
              key={group.title}
              animation="fade-up"
              style={{ transitionDelay: `${i * 80}ms` }}
              className={group.wide ? 'md:col-span-2' : ''}
            >
              <div className="glass-card p-6 md:p-7 h-full group hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center text-lg">
                    {group.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white/90">{group.title}</h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <span key={tag} className="skill-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
