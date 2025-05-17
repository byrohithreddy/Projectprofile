export default function About() {
  return (
    <section 
      id="about" 
      className="py-20 bg-white dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            About Me
          </h2>
          <div className="h-1 w-20 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-8"></div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 animate-fade-in">
            I'm an undergraduate Computer Science student with a passion for building innovative technology solutions. My journey in programming began during high school, and I've been expanding my skills ever since.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 animate-fade-in">
            Currently pursuing my B.Tech in Computer Science, I focus on acquiring both theoretical knowledge and practical skills through coursework, personal projects, and internships.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed animate-fade-in">
            I believe in the power of technology to solve real-world problems and aim to contribute to meaningful projects that make a positive impact.
          </p>
        </div>
      </div>
    </section>
  );
}