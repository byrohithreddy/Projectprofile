import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section 
      id="contact" 
      className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-8"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Feel free to reach out if you're interested in collaborating on a project or just want to connect!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 animate-fade-in">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full transition-colors">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail size={20} className="text-indigo-600 dark:text-indigo-400 mr-3 mt-1 transition-colors" />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium transition-colors">Email</p>
                      <a 
                        href="mailto:rohith2005hyd@gmail.com" 
                        className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        rohith2005hyd@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin size={20} className="text-indigo-600 dark:text-indigo-400 mr-3 mt-1 transition-colors" />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium transition-colors">Location</p>
                      <p className="text-gray-700 dark:text-gray-300 transition-colors">
                        Hyderabad, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={20} className="text-indigo-600 dark:text-indigo-400 mr-3 mt-1 transition-colors" />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium transition-colors">Availability</p>
                      <p className="text-gray-700 dark:text-gray-300 transition-colors">
                        Open for collaboration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 animate-fade-in">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-colors">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
                  Send Me a Message
                </h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1 transition-colors">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1 transition-colors">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-1 transition-colors">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder="Subject"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-1 transition-colors">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}