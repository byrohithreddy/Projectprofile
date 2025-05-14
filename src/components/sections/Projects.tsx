import { Github, ExternalLink } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: 'Fake News Detection Using NLP',
    description: 'A Fake News Detection system using NLP and ML to classify news articles as FAKE or GENUINE. Models used include Logistic Regression & Random Forest.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Gradio', 'Regex'],
    github: 'https://github.com/byrohithreddy/Fake_news_detector_NLP.git',
    image: 'https://images.pexels.com/photos/6347722/pexels-photo-6347722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Weapon Detection Using OpenCV',
    description: 'A real-time weapon detection system using Haar cascades and OpenCV that captures webcam input and detects guns.',
    technologies: ['Python', 'OpenCV'],
    github: 'https://github.com/byrohithreddy/Weapon_detection_system.git',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Movie Recommendation System',
    description: 'A recommender system using Python and scikit-learn with a Kaggle dataset, pandas, and NumPy for data handling and modeling.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter Notebook'],
    github: 'https://github.com/byrohithreddy/Movie_recommendation_system.git',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default function Projects() {
  return (
    <section 
      id="projects" 
      className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Projects
          </h2>
          <div className="h-1 w-20 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-8"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Here are some of my recent projects that showcase my skills and interests.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg animate-fade-in"
            >
              {project.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors">
                  {project.description}
                </p>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                  >
                    <Github size={18} className="mr-1" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="https://github.com/byrohithreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all"
          >
            <ExternalLink size={18} className="mr-2" />
            View More Projects
          </a>
        </div>
      </div>
    </section>
  );
}