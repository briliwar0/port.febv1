import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { HandPalm, HandWaving, Info, X } from 'lucide-react';

interface GestureControlProps {
  onGesture?: (gesture: string) => void;
}

const GestureControl: React.FC<GestureControlProps> = ({ onGesture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isActive, setIsActive] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [detectedGesture, setDetectedGesture] = useState<string | null>(null);
  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });
  const [webcamPermission, setWebcamPermission] = useState<boolean | null>(null);
  
  // Simplified gesture recognition simulation
  // In a real app, we would use TensorFlow.js with a pre-trained model
  useEffect(() => {
    if (!isActive) return;
    
    let gestureInterval: NodeJS.Timeout;
    
    const simulateGestureDetection = () => {
      // Simulate gesture detection with random values
      const gestures = ['wave', 'point', 'open', 'close', 'swipe-left', 'swipe-right'];
      const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
      
      // Update position randomly within webcam bounds
      const randomX = Math.random() * 200 - 100; // -100 to 100
      const randomY = Math.random() * 200 - 100; // -100 to 100
      
      setDetectedGesture(randomGesture);
      setHandPosition({ x: randomX, y: randomY });
      
      if (onGesture) {
        onGesture(randomGesture);
      }
    };
    
    // Simulate hand detection at intervals
    gestureInterval = setInterval(simulateGestureDetection, 2000);
    
    return () => {
      clearInterval(gestureInterval);
    };
  }, [isActive, onGesture]);
  
  // Request webcam permission
  const handleStartGestureControl = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setWebcamPermission(true);
      setIsActive(true);
      setShowIntro(false);
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setWebcamPermission(false);
    }
  };
  
  const handleStopGestureControl = () => {
    setIsActive(false);
  };
  
  // Render the appropriate UI based on state
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showIntro && !isActive && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-black/80 text-white p-4 rounded-xl shadow-lg backdrop-blur-md max-w-xs"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <HandWaving className="mr-2 h-5 w-5 text-blue-400" />
              <h3 className="text-sm font-medium">Gesture Control</h3>
            </div>
            <button 
              onClick={() => setShowIntro(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-300 mb-3">
            Navigate the website using hand gestures via your webcam. 
            Wave to scroll, point to click, and more.
          </p>
          <button
            onClick={handleStartGestureControl}
            className="w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors"
          >
            Enable Gesture Control
          </button>
        </motion.div>
      )}
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <button 
              onClick={() => setShowIntro(true)}
              className="p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <Info size={14} className="text-white" />
            </button>
            <button 
              onClick={handleStopGestureControl}
              className="p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
          
          <div className="relative rounded-xl overflow-hidden border-2 border-blue-500 shadow-lg" style={{ width: '200px', height: '150px' }}>
            <Webcam
              ref={webcamRef}
              audio={false}
              width={200}
              height={150}
              screenshotFormat="image/jpeg"
              videoConstraints={{ width: 200, height: 150 }}
              className="w-full h-full object-cover"
            />
            
            {/* Visual feedback for detected hand position */}
            {detectedGesture && (
              <motion.div 
                className="absolute w-10 h-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  x: handPosition.x,
                  y: handPosition.y,
                }}
                style={{ 
                  left: '50%', 
                  top: '50%',
                  translateX: '-50%',
                  translateY: '-50%'
                }}
              >
                <HandPalm className="w-full h-full text-blue-400 filter drop-shadow-lg" />
              </motion.div>
            )}
            
            {/* Show detected gesture */}
            {detectedGesture && (
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded text-center">
                {detectedGesture.charAt(0).toUpperCase() + detectedGesture.slice(1)}
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {!showIntro && !isActive && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-black/80 hover:bg-black text-white rounded-full shadow-lg backdrop-blur-md"
          onClick={() => setShowIntro(true)}
        >
          <HandWaving size={20} />
        </motion.button>
      )}
      
      {/* Webcam permission denied state */}
      {webcamPermission === false && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/80 text-white p-4 rounded-xl shadow-lg backdrop-blur-md max-w-xs"
        >
          <h3 className="text-sm font-medium mb-1">Camera Access Denied</h3>
          <p className="text-xs mb-3">
            Please allow camera access in your browser settings to use gesture controls.
          </p>
          <button
            onClick={() => setWebcamPermission(null)}
            className="w-full py-1.5 px-3 bg-red-800 hover:bg-red-700 text-white text-xs rounded-md transition-colors"
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default GestureControl;