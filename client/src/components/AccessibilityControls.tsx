import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Eye, 
  Type, 
  MousePointer, 
  Contrast, 
  LineHeight, 
  Baseline, 
  X,
  Sparkles
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 100, // percentage
    lineHeight: 1.5,
    letterSpacing: 0, // em
    contrast: 'normal', // normal, high, low
    reduceMotion: false,
    dyslexiaFriendly: false,
    highContrast: false,
    largePointer: false,
    imageFocus: false,
  });
  
  const { theme, setTheme } = useTheme();
  
  // Apply accessibility settings to document
  useEffect(() => {
    // Font size adjustment
    document.documentElement.style.setProperty('--a11y-font-scale', `${settings.fontSize}%`);
    
    // Line height
    document.documentElement.style.setProperty('--a11y-line-height', `${settings.lineHeight}`);
    
    // Letter spacing
    document.documentElement.style.setProperty('--a11y-letter-spacing', `${settings.letterSpacing}em`);
    
    // Apply contrast mode
    document.body.classList.remove('a11y-contrast-high', 'a11y-contrast-low');
    if (settings.contrast !== 'normal') {
      document.body.classList.add(`a11y-contrast-${settings.contrast}`);
    }
    
    // Reduce motion animations
    if (settings.reduceMotion) {
      document.body.classList.add('a11y-reduce-motion');
    } else {
      document.body.classList.remove('a11y-reduce-motion');
    }
    
    // Dyslexia friendly font
    if (settings.dyslexiaFriendly) {
      document.body.classList.add('a11y-dyslexia-friendly');
    } else {
      document.body.classList.remove('a11y-dyslexia-friendly');
    }
    
    // High contrast mode
    if (settings.highContrast) {
      document.body.classList.add('a11y-high-contrast');
    } else {
      document.body.classList.remove('a11y-high-contrast');
    }
    
    // Large mouse pointer
    if (settings.largePointer) {
      document.body.classList.add('a11y-large-pointer');
    } else {
      document.body.classList.remove('a11y-large-pointer');
    }
    
    // Image focus mode
    if (settings.imageFocus) {
      document.body.classList.add('a11y-image-focus');
    } else {
      document.body.classList.remove('a11y-image-focus');
    }
  }, [settings]);
  
  // Toggle control panel
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  // Update a specific setting
  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  // Reset all settings to default
  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      lineHeight: 1.5,
      letterSpacing: 0,
      contrast: 'normal',
      reduceMotion: false,
      dyslexiaFriendly: false,
      highContrast: false,
      largePointer: false,
      imageFocus: false,
    });
  };
  
  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={togglePanel}
        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Accessibility Controls"
      >
        <Settings size={20} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center">
                <Eye className="mr-2 h-4 w-4" /> Accessibility Settings
              </h2>
              <button 
                onClick={togglePanel}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close accessibility panel"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Font Size Control */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Type className="mr-2 h-4 w-4" /> Font Size
                  </label>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                    {settings.fontSize}%
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="200"
                  step="10"
                  value={settings.fontSize}
                  onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>A-</span>
                  <span>A+</span>
                </div>
              </div>
              
              {/* Line Height Control */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <LineHeight className="mr-2 h-4 w-4" /> Line Spacing
                  </label>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                    {settings.lineHeight}x
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={settings.lineHeight}
                  onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                />
              </div>
              
              {/* Letter Spacing Control */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Baseline className="mr-2 h-4 w-4" /> Letter Spacing
                  </label>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                    {settings.letterSpacing}em
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={settings.letterSpacing}
                  onChange={(e) => updateSetting('letterSpacing', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                />
              </div>
              
              {/* Toggle Controls */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center">
                  <input
                    id="dyslexia-friendly"
                    type="checkbox"
                    checked={settings.dyslexiaFriendly}
                    onChange={(e) => updateSetting('dyslexiaFriendly', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="dyslexia-friendly" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Dyslexia Friendly Font
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="reduce-motion"
                    type="checkbox"
                    checked={settings.reduceMotion}
                    onChange={(e) => updateSetting('reduceMotion', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="reduce-motion" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Reduce Motion
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="high-contrast"
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={(e) => updateSetting('highContrast', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="high-contrast" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    High Contrast Mode
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="large-pointer"
                    type="checkbox"
                    checked={settings.largePointer}
                    onChange={(e) => updateSetting('largePointer', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="large-pointer" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Large Mouse Pointer
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="image-focus"
                    type="checkbox"
                    checked={settings.imageFocus}
                    onChange={(e) => updateSetting('imageFocus', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="image-focus" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Focus Mode (Highlight Images)
                  </label>
                </div>
              </div>
              
              {/* Theme Switch */}
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Contrast className="mr-2 h-4 w-4" /> Color Theme
                </label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-3 py-2 text-xs font-medium rounded-md ${
                      theme === 'light' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-3 py-2 text-xs font-medium rounded-md ${
                      theme === 'dark' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`px-3 py-2 text-xs font-medium rounded-md ${
                      theme === 'system' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    System
                  </button>
                </div>
              </div>
              
              {/* Reset Button */}
              <button
                onClick={resetSettings}
                className="w-full py-2 mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 text-sm font-medium rounded-md flex items-center justify-center"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Reset to Default
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibilityControls;