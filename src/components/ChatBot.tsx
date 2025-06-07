import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

declare global {
  interface Window {
    botpress: {
      init: (config: any) => void;
      on: (event: string, callback: () => void) => void;
      open: () => void;
      close: () => void;
    };
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Botpress when component mounts
    const initBotpress = () => {
      if (window.botpress) {
        window.botpress.init({
          "botId": "0d674e1d-2658-485d-9bd5-7d8e36491f5d",
          "configuration": {
            "version": "v1",
            "botName": "IGRIS",
            "botDescription": "Intelligent Grounded Retrieval-based Interaction System",
            "website": {
              "title": "",
              "link": ""
            },
            "email": {
              "title": "rohith2005hyd@gmail.com",
              "link": "rohith2005hyd@gmail.com"
            },
            "phone": {},
            "termsOfService": {},
            "privacyPolicy": {},
            "color": "#4f46e5",
            "variant": "soft",
            "headerVariant": "glass",
            "themeMode": "light",
            "fontFamily": "inter",
            "radius": 1,
            "feedbackEnabled": false,
            "footer": "[⚡ by Botpress](https://botpress.com/?from=webchat)"
          },
          "clientId": "4c7a479c-8ca5-4877-8813-0faa927dc384",
          "selector": "#webchat"
        });

        window.botpress.on("webchat:ready", () => {
          setIsLoaded(true);
        });
      }
    };

    // Check if Botpress script is already loaded
    if (window.botpress) {
      initBotpress();
    } else {
      // Wait for script to load
      const checkBotpress = setInterval(() => {
        if (window.botpress) {
          initBotpress();
          clearInterval(checkBotpress);
        }
      }, 100);

      return () => clearInterval(checkBotpress);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && isLoaded) {
      // Small delay to ensure the container is visible before opening
      setTimeout(() => {
        window.botpress?.open();
      }, 100);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div id="webchat" style={{ width: '100%', height: '100%' }}></div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="chatbot-toggle group"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={24} className="transition-transform group-hover:rotate-90" />
        ) : (
          <MessageCircle size={24} className="transition-transform group-hover:scale-110" />
        )}
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute bottom-16 right-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat with IGRIS
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}