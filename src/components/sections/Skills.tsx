type SkillCategory = {
  title: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Technical Skills",
    skills: ["Python", "JAVA", "C programming", "Pandas", "Numpy", "Seaborn", "Flask/Fast API"]
  },
  {
    title: "Domain Skills",
    skills: ["Data analysis", "Machine Learning", "NLP", "EDA", "n8n automation", "Power Bi dashboards"]
  },
  {
    title: "Soft Skills",
    skills: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Adaptability",
      "Critical Thinking",
      "Time Management",
      "Creativity"
    ]
  }
];

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="py-20 bg-white dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Skills
          </h2>
          <div className="h-1 w-20 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-8"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            A comprehensive overview of my technical expertise and professional competencies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md transition-all hover:shadow-lg animate-fade-in"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="inline-block px-3 py-2 m-1 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}