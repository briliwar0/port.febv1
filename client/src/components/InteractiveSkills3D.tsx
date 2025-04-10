import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Skill } from '@/lib/types';
import { FRONTEND_SKILLS, BACKEND_SKILLS, OTHER_SKILLS } from '@/lib/constants';

interface SkillNodeProps {
  position: [number, number, number];
  name: string;
  percentage: number;
  onClick: () => void;
  isSelected: boolean;
  category: string;
}

const SkillNode: React.FC<SkillNodeProps> = ({ position, name, percentage, onClick, isSelected, category }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  
  // Dynamic color based on skill category
  const getColor = () => {
    switch (category) {
      case 'frontend':
        return '#3498db';
      case 'backend':
        return '#e74c3c';
      default:
        return '#2ecc71';
    }
  };
  
  // Scale based on skill percentage
  const scale = Math.max(0.5, percentage / 100) * 1.5;
  
  // Use spotlight for selected nodes
  useHelper(isSelected ? spotLightRef : null, THREE.SpotLightHelper, 'white');
  
  return (
    <group position={position}>
      {isSelected && (
        <spotLight
          ref={spotLightRef}
          position={[0, 4, 0]}
          angle={0.3}
          penumbra={0.8}
          intensity={3}
          color="white"
          castShadow
        />
      )}
      
      <mesh 
        ref={meshRef} 
        onClick={onClick}
        scale={isSelected ? [scale * 1.3, scale * 1.3, scale * 1.3] : [scale, scale, scale]}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={getColor()} 
          roughness={0.3} 
          metalness={0.8}
          emissive={isSelected ? getColor() : 'black'}
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </mesh>
      
      <Html distanceFactor={10}>
        <div className={`px-2 py-1 rounded-lg text-xs ${isSelected ? 'bg-black/80 text-white' : 'bg-white/60 text-black'} transform transition-all duration-200 ${isSelected ? 'scale-125' : 'scale-100'}`}>
          {name}
        </div>
      </Html>
    </group>
  );
};

interface SkillConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  opacity?: number;
}

const SkillConnection: React.FC<SkillConnectionProps> = ({ start, end, opacity = 0.3 }) => {
  const ref = useRef<THREE.LineSegments>();
  
  // Create line geometry between two points
  useEffect(() => {
    if (ref.current) {
      const points = [];
      points.push(new THREE.Vector3(...start));
      points.push(new THREE.Vector3(...end));
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      ref.current.geometry = geometry;
    }
  }, [start, end]);
  
  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="#ffffff" transparent opacity={opacity} />
    </lineSegments>
  );
};

interface SkillDetailCardProps {
  skill: Skill;
  onClose: () => void;
}

const SkillDetailCard: React.FC<SkillDetailCardProps> = ({ skill, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute top-10 left-10 bg-black/70 backdrop-blur-md text-white rounded-xl p-6 shadow-xl z-10 max-w-md"
    >
      <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
      <div className="flex items-center mb-3">
        <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{ width: `${skill.percentage}%` }}
          />
        </div>
        <span className="ml-3 text-sm font-medium">{skill.percentage}%</span>
      </div>
      <p className="text-sm text-gray-300 mb-4">
        {getSkillDescription(skill.name)}
      </p>
      <button 
        onClick={onClose}
        className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors"
      >
        Close
      </button>
    </motion.div>
  );
};

// Helper function to generate dummy descriptions for skills
const getSkillDescription = (name: string) => {
  // In a real app, these would come from your database/API
  const descriptions: Record<string, string> = {
    'React': 'Expert level in building complex React applications with hooks, context, and modern patterns.',
    'Next.js': 'Advanced knowledge of server-side rendering, static site generation, and API routes.',
    'TypeScript': 'Strong typing skills to create scalable and maintainable JavaScript applications.',
    'Node.js': 'Building high-performance backend services and REST APIs.',
    'Express': 'Creating robust server applications with middleware patterns.',
    'PostgreSQL': 'Database design, complex queries, and performance optimization.',
    'UI/UX': 'Designing intuitive user interfaces with focus on accessibility and user experience.',
    'Animation': 'Creating engaging motion designs with GSAP and Framer Motion.',
  };
  
  return descriptions[name] || `Advanced knowledge and experience working with ${name} in production environments.`;
};

const InteractiveSkills3D: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [allSkills, setAllSkills] = useState<Array<Skill & { position: [number, number, number]; category: string }>>([]);
  
  useEffect(() => {
    // Create 3D positions for all skills with realistic spacing
    const frontendPositions: Array<Skill & { position: [number, number, number]; category: string }> = FRONTEND_SKILLS.map((skill, i) => {
      const angle = (i / FRONTEND_SKILLS.length) * Math.PI * 2;
      const radius = 6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.random() * 2 - 1; // Slight variation in height
      
      return {
        ...skill,
        position: [x, y, z],
        category: 'frontend'
      };
    });
    
    const backendPositions = BACKEND_SKILLS.map((skill, i) => {
      const angle = (i / BACKEND_SKILLS.length) * Math.PI * 2;
      const radius = 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.random() * 2 + 2; // Higher position
      
      return {
        ...skill,
        position: [x, y, z],
        category: 'backend'
      };
    });
    
    const otherPositions = OTHER_SKILLS.map((skill, i) => {
      const angle = (i / OTHER_SKILLS.length) * Math.PI * 2;
      const radius = 4.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.random() * 2 - 3; // Lower position
      
      return {
        ...skill,
        position: [x, y, z],
        category: 'other'
      };
    });
    
    setAllSkills([...frontendPositions, ...backendPositions, ...otherPositions]);
  }, []);
  
  // Functions to handle skill selection/deselection
  const handleSkillClick = (skill: Skill & { position: [number, number, number]; category: string }) => {
    setSelectedSkill(skill);
  };
  
  const handleCloseDetail = () => {
    setSelectedSkill(null);
  };
  
  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Create connections between related skills */}
        <group>
          {allSkills.map((skill, idx) => {
            // Connect frontend and backend skills that might be related
            return allSkills.map((otherSkill, otherIdx) => {
              if (
                idx !== otherIdx && 
                ((skill.category === 'frontend' && otherSkill.category === 'backend') ||
                 (skill.category === 'backend' && otherSkill.category === 'frontend'))
              ) {
                // Only connect some skills (not all to all) to avoid visual clutter
                if (Math.random() > 0.85) {
                  return (
                    <SkillConnection 
                      key={`${idx}-${otherIdx}`}
                      start={skill.position}
                      end={otherSkill.position}
                      opacity={0.1}
                    />
                  );
                }
              }
              return null;
            }).filter(Boolean);
          })}
        </group>
        
        {/* Render all skill nodes */}
        {allSkills.map((skill, idx) => (
          <SkillNode
            key={idx}
            name={skill.name}
            percentage={skill.percentage}
            position={skill.position}
            onClick={() => handleSkillClick(skill)}
            isSelected={selectedSkill?.name === skill.name}
            category={skill.category}
          />
        ))}
        
        {/* Controls for camera movement */}
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={!selectedSkill}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Display skill detail card when a skill is selected */}
      {selectedSkill && (
        <SkillDetailCard skill={selectedSkill} onClose={handleCloseDetail} />
      )}
      
      {/* Instruction overlay */}
      <div className="absolute bottom-6 right-6 bg-black/50 text-white text-xs px-3 py-2 rounded-full backdrop-blur-md">
        Drag to rotate • Scroll to zoom • Click on nodes to explore
      </div>
    </div>
  );
};

export default InteractiveSkills3D;