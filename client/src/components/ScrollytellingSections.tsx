import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollytellingSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  image?: string;
}

const ScrollytellingSections: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const controls = useAnimation();
  
  // Example data for scrollytelling sections
  const sections: ScrollytellingSection[] = [
    {
      id: 'intro',
      title: 'My Journey',
      subtitle: 'The path to becoming a full-stack developer',
      description: `My journey began with a curiosity about how websites work. What started as a hobby quickly evolved into a passion for creating digital experiences that solve real problems. ${PERSONAL_INFO.name} is a dedicated developer with ${PERSONAL_INFO.experience} years of experience in web development.`,
      color: 'from-purple-600 to-blue-500',
      image: '/assets/journey.svg'
    },
    {
      id: 'skills',
      title: 'Technical Expertise',
      subtitle: 'Constant learning, evolving skillset',
      description: 'Throughout my career, I've embraced new technologies and methodologies, always pushing the boundaries of what's possible on the web. My technical toolkit includes modern JavaScript frameworks, cloud services, and the latest design patterns.',
      color: 'from-blue-500 to-teal-400',
      image: '/assets/skills.svg'
    },
    {
      id: 'philosophy',
      title: 'Design Philosophy',
      subtitle: 'Where code meets creativity',
      description: 'I believe that great software is both functional and beautiful. My approach combines clean code with intuitive design, creating experiences that users love. Every project is an opportunity to blend technology with human-centered design.',
      color: 'from-teal-400 to-green-500',
      image: '/assets/design.svg'
    },
    {
      id: 'future',
      title: 'Looking Forward',
      subtitle: 'Embracing new challenges',
      description: 'As technology continues to evolve, so do I. I'm excited about the future of web development, AI integration, and creating applications that make a positive impact. Let's build the future together.',
      color: 'from-green-500 to-amber-500',
      image: '/assets/future.svg'
    }
  ];
  
  // Setup scroll-based animations with GSAP
  useEffect(() => {
    if (!containerRef.current) return;
    
    const sectionElements = document.querySelectorAll('.scrolly-section');
    
    sectionElements.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(index),
        onEnterBack: () => setActiveSection(index),
        markers: false,
      });
      
      // Create animation for each section
      gsap.fromTo(
        section.querySelector('.content-wrapper'),
        { 
          y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          }
        }
      );
      
      // Create animation for the decorative elements
      gsap.fromTo(
        section.querySelectorAll('.decoration'),
        { 
          scale: 0.8, 
          opacity: 0,
          rotation: -5
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          }
        }
      );
    });
    
    return () => {
      // Clean up all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Logic for the progress indicator
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  
  // For the progress line
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Visual feedback when the scroll progress is updated
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.2 }
      });
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, controls]);
  
  return (
    <div ref={containerRef} className="relative">
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 h-64 z-20 hidden md:block">
        <div className="relative h-full w-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"
            style={{ height: scaleY, originY: 0 }}
          />
        </div>
        
        <div className="absolute left-4 -top-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
          My Story
        </div>
        
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`absolute -left-1 w-3 h-3 rounded-full cursor-pointer transition-all ${
              activeSection === index 
              ? 'bg-blue-600 border-2 border-white dark:border-gray-900 w-4 h-4 -left-1.5' 
              : 'bg-gray-300 dark:bg-gray-700'
            }`}
            style={{ top: `${(index / (sections.length - 1)) * 100}%` }}
            animate={{ scale: activeSection === index ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              const targetElement = document.getElementById(`section-${section.id}`);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div className={`absolute left-6 transform -translate-y-1/2 text-sm font-medium transition-opacity whitespace-nowrap ${
              activeSection === index ? 'opacity-100' : 'opacity-50'
            }`}>
              {section.title}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="w-full">
        {sections.map((section, index) => (
          <section 
            key={section.id}
            id={`section-${section.id}`}
            className={`scrolly-section min-h-screen flex items-center relative py-20 px-6 md:px-12 lg:px-24 overflow-hidden ${
              index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'
            }`}
          >
            {/* Background gradient */}
            <div 
              className={`absolute inset-0 opacity-5 dark:opacity-10 bg-gradient-to-br ${section.color}`} 
            />
            
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="decoration absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-purple-300 to-purple-600 mix-blend-multiply dark:mix-blend-overlay opacity-20 blur-3xl"></div>
              <div className="decoration absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600 mix-blend-multiply dark:mix-blend-overlay opacity-20 blur-3xl"></div>
            </div>
            
            {/* Content */}
            <div className="content-wrapper relative max-w-xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                {section.title}
              </h3>
              <p className="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
                {section.subtitle}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {section.description}
              </p>
              
              {index === sections.length - 1 && (
                <motion.button
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-md hover:from-purple-700 hover:to-blue-600 transition-all shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Connect
                </motion.button>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ScrollytellingSections;