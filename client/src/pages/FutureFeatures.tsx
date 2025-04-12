import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InteractiveSkills3D from '@/components/InteractiveSkills3D';
import ScrollytellingSections from '@/components/ScrollytellingSections';
import VoiceCommands from '@/components/VoiceCommands';
import GestureControl from '@/components/GestureControl';
import AccessibilityControls from '@/components/AccessibilityControls';
import { ArrowLeft, Cpu, Braces, HandMetal, MousePointerClick, Volume2, Eye, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

const FutureFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Handle gesture detection
  const handleGesture = (gesture: string) => {
    console.log('Detected gesture:', gesture);
    // Implement gesture-based navigation or controls
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <Link href="/">
          <Button variant="outline" className="mb-6 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block text-indigo-600 dark:text-indigo-400">2025</span> Future Features
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 dark:text-gray-400">
            Explore cutting-edge web technologies that push the boundaries of what's possible on the web. Experience the future of digital interaction today.
          </p>
        </motion.div>
      </div>
      
      {/* Feature Tabs */}
      <div className="max-w-7xl mx-auto">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-4xl mx-auto mb-8">
            <TabsTrigger value="overview" className="flex items-center">
              <Sparkles className="mr-2 h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="3d-skills" className="flex items-center">
              <Cpu className="mr-2 h-4 w-4" /> 3D Skills
            </TabsTrigger>
            <TabsTrigger value="scrollytelling" className="flex items-center">
              <Braces className="mr-2 h-4 w-4" /> Scrollytelling
            </TabsTrigger>
            <TabsTrigger value="voice-gesture" className="flex items-center">
              <Volume2 className="mr-2 h-4 w-4" /> Voice & Gesture
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center">
              <Eye className="mr-2 h-4 w-4" /> Accessibility
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Cpu className="mr-2 h-5 w-5 text-indigo-500" /> 
                      3D Interactive Portfolio
                    </CardTitle>
                    <CardDescription>
                      Explore skills and projects in an immersive 3D environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Navigate through a 3D visualization of skills and technologies, seeing how they connect and relate to each other in a spatial interface.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('3d-skills')}
                      className="w-full"
                    >
                      Explore 3D Skills
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Braces className="mr-2 h-5 w-5 text-blue-500" /> 
                      Visual Storytelling
                    </CardTitle>
                    <CardDescription>
                      Dynamic content that responds to scrolling
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Experience a narrative that unfolds as you scroll, with animated transitions and contextual information that tells a cohesive story.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('scrollytelling')}
                      className="w-full"
                    >
                      View Scrollytelling
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Volume2 className="mr-2 h-5 w-5 text-green-500" /> 
                      Voice & Gesture Controls
                    </CardTitle>
                    <CardDescription>
                      Navigate hands-free with voice commands
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Control the website using voice commands or hand gestures, enabling a more accessible and futuristic browsing experience.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('voice-gesture')}
                      className="w-full"
                    >
                      Try Voice & Gesture
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="mr-2 h-5 w-5 text-purple-500" /> 
                      Enhanced Accessibility
                    </CardTitle>
                    <CardDescription>
                      Customizable interface for all users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Adjust font size, contrast, animations, and more to create a browsing experience that works for everyone regardless of abilities.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('accessibility')}
                      className="w-full"
                    >
                      Explore Accessibility
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          {/* 3D Skills Tab */}
          <TabsContent value="3d-skills">
            <Card>
              <CardHeader>
                <CardTitle>3D Interactive Skills Map</CardTitle>
                <CardDescription>
                  Explore skills and their relationships in an immersive 3D environment. Drag to rotate, scroll to zoom, and click on nodes to learn more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveSkills3D />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Scrollytelling Tab */}
          <TabsContent value="scrollytelling">
            <Card>
              <CardHeader>
                <CardTitle>Visual Storytelling</CardTitle>
                <CardDescription>
                  Scroll through a narrative experience that unfolds as you navigate.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] overflow-y-auto">
                  <ScrollytellingSections />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Voice & Gesture Tab */}
          <TabsContent value="voice-gesture">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Volume2 className="mr-2 h-5 w-5" /> Voice Commands
                  </CardTitle>
                  <CardDescription>
                    Control the website using your voice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Try using commands like "go to projects", "scroll down", "dark mode", or "show skills" to navigate the site hands-free.
                  </p>
                  <div className="flex justify-center">
                    {/* Voice commands are added as a fixed component, so showing a preview image here */}
                    <div className="relative w-64 h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <Volume2 size={48} className="text-gray-400" />
                      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
                        Voice commands available on all pages
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HandMetal className="mr-2 h-5 w-5" /> Gesture Control
                  </CardTitle>
                  <CardDescription>
                    Navigate using hand gestures detected by your webcam
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Use hand gestures to scroll, click, or navigate through the site. Wave, point, or make other gestures to control the interface.
                  </p>
                  <div className="flex justify-center">
                    {/* Gesture control is added as a fixed component, so showing a preview image here */}
                    <div className="relative w-64 h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <HandMetal size={48} className="text-gray-400" />
                      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
                        Gesture controls available on all pages
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Accessibility Tab */}
          <TabsContent value="accessibility">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Controls</CardTitle>
                <CardDescription>
                  Customize your browsing experience with these accessibility features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  These controls allow you to adjust the website's appearance and behavior to suit your needs. You can change font size, contrast, animation settings, and more.
                </p>
                <div className="flex justify-center">
                  {/* Accessibility controls are added as a fixed component, so showing a preview here */}
                  <div className="relative w-full max-w-md h-80 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center p-6">
                    <Eye size={48} className="text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Accessibility Features</h3>
                    <ul className="list-disc pl-6 text-sm text-gray-500 dark:text-gray-400 space-y-2">
                      <li>Adjust font size and line height</li>
                      <li>Enable dyslexia-friendly font</li>
                      <li>Toggle high contrast mode</li>
                      <li>Reduce animations and motion</li>
                      <li>Enable large cursor for better visibility</li>
                      <li>Focus mode for easier reading</li>
                    </ul>
                    <div className="mt-6 text-center text-sm text-gray-500">
                      Accessibility controls available on all pages via the settings button
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FutureFeatures;