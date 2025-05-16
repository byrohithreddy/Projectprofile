import { FileText, Github, Linkedin } from 'lucide-react';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-screen pt-24 pb-16 md:pt-32 flex items-center bg-gray-50 dark:bg-gray-950 transition-colors"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 order-2 md:order-1">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                ROHITH REDDY MUSHKE
              </h1>
              <h2 className="text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 mb-6 transition-colors">
                Aspiring Data Science Engineer | AI Enthusiast | Lifelong Learner
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl transition-colors">
                Passionate about AI, Data Science, and creating innovative solutions that make a difference.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://drive.google.com/file/d/1XuxZFqS5P0K7mLmBOE0U9dFBw7w_gT5b/preview', 'Resume', 'width=800,height=600');
                  }}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all"
                >
                  <FileText size={18} className="mr-2" />
                  View Resume
                </a>
                <a 
                  href="https://github.com/byrohithreddy"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg shadow-sm transition-all"
                >
                  <Github size={18} className="mr-2" />
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/mushke-rohith-reddy-915945306"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all"
                >
                  <Linkedin size={18} className="mr-2" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex-1 order-1 md:order-2 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-indigo-600 dark:border-indigo-400 shadow-xl animate-fade-in">
              <iframe 
                src="https://drive.google.com/file/d/1eM_rn9oxFEtAD_R7crJFubE7HfHKz20C/preview" 
                width="100%" 
                height="100%" 
                allow="autoplay"
                className="w-full h-full object-cover"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}