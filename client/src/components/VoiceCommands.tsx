import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useRoute } from 'wouter';
import { Mic, MicOff, Volume2, Info, X } from 'lucide-react';

interface VoiceCommandProps {
  isEnabled?: boolean;
}

const VoiceCommands: React.FC<VoiceCommandProps> = ({ isEnabled = false }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isSupported, setIsSupported] = useState(true);
  
  const [location, setLocation] = useLocation();
  
  // Check for browser support
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);
  
  // Simulated voice command processing
  // In a real app, we would use the actual Web Speech API
  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('go to home') || lowerCommand.includes('open home')) {
      setFeedback('Navigating to home page...');
      setTimeout(() => setLocation('/'), 1500);
      return true;
    } 
    else if (lowerCommand.includes('go to projects') || lowerCommand.includes('show projects')) {
      setFeedback('Navigating to projects section...');
      setTimeout(() => {
        setLocation('/#projects');
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
      return true;
    } 
    else if (lowerCommand.includes('go to skills') || lowerCommand.includes('show skills')) {
      setFeedback('Navigating to skills section...');
      setTimeout(() => {
        setLocation('/#skills');
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
          skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
      return true;
    } 
    else if (lowerCommand.includes('go to contact') || lowerCommand.includes('contact')) {
      setFeedback('Navigating to contact section...');
      setTimeout(() => {
        setLocation('/#contact');
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
      return true;
    } 
    else if (lowerCommand.includes('dark mode') || lowerCommand.includes('switch to dark')) {
      setFeedback('Switching to dark mode...');
      document.documentElement.classList.add('dark');
      return true;
    } 
    else if (lowerCommand.includes('light mode') || lowerCommand.includes('switch to light')) {
      setFeedback('Switching to light mode...');
      document.documentElement.classList.remove('dark');
      return true;
    } 
    else if (lowerCommand.includes('scroll down')) {
      setFeedback('Scrolling down...');
      window.scrollBy({
        top: 300,
        behavior: 'smooth'
      });
      return true;
    } 
    else if (lowerCommand.includes('scroll up')) {
      setFeedback('Scrolling up...');
      window.scrollBy({
        top: -300,
        behavior: 'smooth'
      });
      return true;
    }
    else if (lowerCommand.includes('about you') || lowerCommand.includes('who are you')) {
      setFeedback('I am a voice assistant for this portfolio website. I can help navigate the site and perform commands.');
      return true;
    }
    
    return false;
  }, [setLocation]);
  
  // Simulated voice recognition
  useEffect(() => {
    if (!listening) return;
    
    let recognitionTimeout: NodeJS.Timeout;
    let feedbackTimeout: NodeJS.Timeout;
    
    const simulateRecognition = () => {
      // In a real app, this would be replaced with actual speech recognition
      const randomPhrases = [
        'show projects',
        'go to contact',
        'dark mode',
        'scroll down',
        'about you'
      ];
      
      // Simulate speech recognition with random commands
      if (Math.random() > 0.7) {
        const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
        setTranscript(randomPhrase);
        
        if (processCommand(randomPhrase)) {
          setShowFeedback(true);
          
          feedbackTimeout = setTimeout(() => {
            setShowFeedback(false);
          }, 3000);
        }
      } else {
        setTranscript('Listening...');
      }
      
      // Simulate continuous listening
      recognitionTimeout = setTimeout(simulateRecognition, 5000);
    };
    
    // Start simulated recognition
    recognitionTimeout = setTimeout(simulateRecognition, 1000);
    
    return () => {
      clearTimeout(recognitionTimeout);
      clearTimeout(feedbackTimeout);
      setShowFeedback(false);
    };
  }, [listening, processCommand]);
  
  // Toggle voice recognition
  const toggleListening = () => {
    if (!isSupported) return;
    
    if (listening) {
      setListening(false);
      setTranscript('');
    } else {
      setListening(true);
      setShowIntro(false);
    }
  };
  
  // Render different states based on support and activation
  if (!isSupported) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-red-900/80 text-white p-4 rounded-xl shadow-lg backdrop-blur-md max-w-xs">
          <h3 className="text-sm font-medium mb-1">Voice Commands Not Supported</h3>
          <p className="text-xs mb-3">
            Your browser doesn't support voice recognition. Try using Chrome or Edge for voice command features.
          </p>
          <button
            onClick={() => setShowIntro(false)}
            className="w-full py-1.5 px-3 bg-red-800 hover:bg-red-700 text-white text-xs rounded-md transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      {showIntro && !listening && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-black/80 text-white p-4 rounded-xl shadow-lg backdrop-blur-md max-w-xs"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <Volume2 className="mr-2 h-5 w-5 text-purple-400" />
              <h3 className="text-sm font-medium">Voice Commands</h3>
            </div>
            <button 
              onClick={() => setShowIntro(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-300 mb-2">
            Navigate the website using your voice. Try commands like:
          </p>
          <ul className="text-xs text-gray-300 mb-3 space-y-1 list-disc pl-4">
            <li>"Go to projects"</li>
            <li>"Show skills"</li>
            <li>"Contact"</li>
            <li>"Dark mode" / "Light mode"</li>
            <li>"Scroll down" / "Scroll up"</li>
          </ul>
          <button
            onClick={toggleListening}
            className="w-full py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-md transition-colors"
          >
            Enable Voice Commands
          </button>
        </motion.div>
      )}
      
      {!showIntro && (
        <div className="flex flex-col items-start space-y-2">
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="bg-black/80 text-white px-4 py-2 rounded-xl shadow-lg backdrop-blur-md max-w-xs mb-2 text-sm"
              >
                <div className="flex items-center">
                  <Volume2 className="mr-2 h-4 w-4 text-purple-400" />
                  <p>{feedback}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleListening}
              className={`p-3 rounded-full shadow-lg ${
                listening
                  ? 'bg-purple-600 text-white'
                  : 'bg-black/70 text-white hover:bg-black/80'
              }`}
            >
              {listening ? <Mic size={20} /> : <MicOff size={20} />}
            </motion.button>
            
            {listening && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="bg-black/70 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-md"
              >
                {transcript || 'Listening...'}
              </motion.div>
            )}
            
            {!listening && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-full shadow-lg backdrop-blur-md"
                onClick={() => setShowIntro(true)}
              >
                <Info size={16} />
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceCommands;