const groups = [
  {
    icon: '🖥️',
    title: 'Languages & Web/App Dev',
    tags: ['Python', 'Kotlin', 'JavaScript', 'SQL', 'Java', 'C#', 'FastAPI', 'Node.js', 'Android Studio', 'React', 'RESTful API'],
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
  },
];

export default function SkillsApp() {
  return (
    <div className="p-5 md:p-8 space-y-4">
      <p className="text-white/45 text-sm">
        Core technical skills across full-stack development, machine learning, and data analysis.
      </p>

      {groups.map((g) => (
        <div key={g.title} className="glass-card p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[12px] glass flex items-center justify-center text-base">
              {g.icon}
            </div>
            <h3 className="text-white/85 font-semibold text-sm">{g.title}</h3>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {g.tags.map((tag) => (
              <span key={tag} className="skill-tag">{tag}</span>
            ))}
          </div>
        </div>
      ))}

      <div className="h-4" />
    </div>
  );
}
