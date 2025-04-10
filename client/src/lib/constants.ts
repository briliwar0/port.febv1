import { Project, Skill, TimelineItem, SocialLink, MarketplaceItem } from './types';

// Social links constants
export const SOCIAL_LINKS: SocialLink[] = [
  { 
    platform: 'GitHub', 
    url: 'https://github.com/febriliantisna', 
    icon: 'github' 
  },
  { 
    platform: 'LinkedIn', 
    url: 'https://linkedin.com/in/muhammadfebriliantisna', 
    icon: 'linkedin' 
  },
  { 
    platform: 'X', 
    url: 'https://x.com/febrideveloper', 
    icon: 'x-twitter' 
  },
  { 
    platform: 'Facebook', 
    url: 'https://facebook.com/febriliantisna', 
    icon: 'facebook-f' 
  },
  { 
    platform: 'Instagram', 
    url: 'https://www.instagram.com/fbrilntn', 
    icon: 'instagram' 
  },
  { 
    platform: 'YouTube', 
    url: 'https://youtube.com/@febnas', 
    icon: 'youtube' 
  },
  { 
    platform: 'TikTok', 
    url: 'https://tiktok.com/@febrideveloper', 
    icon: 'tiktok' 
  }
];

// Projects data
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://ecommerce-demo.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/ecommerce-platform'
  },
  {
    id: 2,
    title: 'Fitness Tracking App',
    description: 'Mobile app for tracking workouts, nutrition, and progress with social features and customizable goals.',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1010&q=80',
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Redux', 'Charts'],
    demoUrl: 'https://fitness-app.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/fitness-app'
  },
  {
    id: 3,
    title: 'Banking Dashboard UI',
    description: 'Comprehensive banking interface with modern design, data visualization, and accessibility features.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'ui',
    technologies: ['Figma', 'CSS', 'Accessibility', 'D3.js'],
    demoUrl: 'https://banking-ui.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/banking-dashboard'
  },
  {
    id: 4,
    title: '3D Product Configurator',
    description: 'Interactive 3D product customization tool with real-time rendering and configuration options.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: '3d',
    technologies: ['Three.js', 'WebGL', 'React', 'JavaScript'],
    demoUrl: 'https://3d-configurator.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/3d-configurator'
  },
  {
    id: 5,
    title: 'Project Management Tool',
    description: 'Team collaboration platform with task tracking, file sharing, and communication features.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'web',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Socket.io'],
    demoUrl: 'https://project-manager.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/project-manager'
  },
  {
    id: 6,
    title: 'Travel Companion App',
    description: 'Location-based travel guide with offline maps, recommendations, and trip planning features.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'mobile',
    technologies: ['Flutter', 'Firebase', 'Maps API', 'Dart'],
    demoUrl: 'https://travel-app.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/travel-companion'
  },
  {
    id: 7,
    title: 'AI Image Generator',
    description: 'Web application that uses machine learning to generate unique images based on text prompts.',
    image: 'https://images.unsplash.com/photo-1638803972694-7b1b52032286?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    category: 'web',
    technologies: ['React', 'TensorFlow.js', 'WebGL', 'OpenAI API'],
    demoUrl: 'https://ai-generator.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/ai-image-generator'
  },
  {
    id: 8,
    title: 'Cryptocurrency Dashboard',
    description: 'Real-time cryptocurrency tracking platform with portfolio management and market analysis tools.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    category: 'web',
    technologies: ['Next.js', 'GraphQL', 'D3.js', 'CoinGecko API'],
    demoUrl: 'https://crypto-dashboard.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/crypto-dashboard'
  },
  {
    id: 9,
    title: 'Social Media Analytics',
    description: 'Comprehensive analytics platform for social media managers with automated reporting and insights.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
    category: 'web',
    technologies: ['Angular', 'Django', 'PostgreSQL', 'Chart.js'],
    demoUrl: 'https://social-analytics.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/social-media-analytics'
  },
  {
    id: 10,
    title: 'VR Education Platform',
    description: 'Virtual reality education platform that delivers immersive learning experiences across various subjects.',
    image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: '3d',
    technologies: ['Unity', 'WebXR', 'Three.js', 'A-Frame'],
    demoUrl: 'https://vr-education.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/vr-education'
  },
  {
    id: 11,
    title: 'Smart Home App',
    description: 'Mobile application for controlling smart home devices with automation, schedules, and energy monitoring.',
    image: 'https://images.unsplash.com/photo-1558002038-1055e2e28cd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'mobile',
    technologies: ['Swift', 'Kotlin', 'IoT', 'Bluetooth LE'],
    demoUrl: 'https://smart-home.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/smart-home-app'
  },
  {
    id: 12,
    title: 'Design System Library',
    description: 'Comprehensive UI component library with design tokens, documentation, and integration examples.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    category: 'ui',
    technologies: ['Storybook', 'React', 'Figma', 'CSS/SASS'],
    demoUrl: 'https://design-system.febrideveloper.com',
    codeUrl: 'https://github.com/febrideveloper/design-system'
  }
];

// Frontend skills
export const FRONTEND_SKILLS: Skill[] = [
  { name: 'React', percentage: 95 },
  { name: 'JavaScript/TypeScript', percentage: 90 },
  { name: 'HTML5/CSS3', percentage: 98 },
  { name: 'Tailwind/SASS', percentage: 92 },
  { name: 'Three.js/WebGL', percentage: 80 }
];

// Backend skills
export const BACKEND_SKILLS: Skill[] = [
  { name: 'Node.js', percentage: 92 },
  { name: 'Express/Next.js', percentage: 88 },
  { name: 'MongoDB/PostgreSQL', percentage: 85 },
  { name: 'GraphQL', percentage: 78 },
  { name: 'AWS/Firebase', percentage: 82 }
];

// Other skills (for circular display)
export const OTHER_SKILLS = [
  { name: 'Docker', icon: 'docker' },
  { name: 'Git/GitHub', icon: 'git-alt' },
  { name: 'Responsive Design', icon: 'mobile-alt' },
  { name: 'Accessibility', icon: 'universal-access' },
  { name: 'UI/UX Design', icon: 'palette' }
];

// Timeline/journey data
export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 1,
    title: 'Senior Full-Stack Developer',
    organization: '@ Tech Innovations Inc.',
    period: '2021 - Present',
    description: 'Led a team of 5 developers to build and maintain a SaaS platform serving over 100,000 users. Implemented new features that increased user engagement by 35%.'
  },
  {
    id: 2,
    title: 'Full-Stack Developer',
    organization: '@ WebSolutions Co.',
    period: '2023 - 2025',
    description: 'Developed and optimized web applications for enterprise clients. Reduced load times by 45% through performance optimizations and modern coding practices.'
  },
  {
    id: 3,
    title: 'Front-End Developer',
    organization: '@ Creative Agency',
    period: '2022 - 2023',
    description: 'Created responsive websites and interactive experiences for clients in various industries. Specialized in animations and micro-interactions.'
  },
  {
    id: 4,
    title: 'Computer Science Degree',
    organization: '@ Ahmad Dahlan University',
    period: '2021 - 2023',
    description: 'Bachelor\'s degree in Computer Science with focus on web technologies and user interface design. Graduated with honors.'
  }
];

// Personal info
export const PERSONAL_INFO = {
  name: 'Muhammad Febrilian Tisna',
  title: 'Full Stack Developer & UI/UX Enthusiast',
  location: 'East Kalimantan, Indonesia',
  email: 'febriliantisna@gmail.com',
  phone: '+6281255697781'
};

// Typing effect phrases
export const TYPING_PHRASES = [
  'Full Stack Developer',
  'UI/UX Enthusiast',
  '3D Web Designer',
  'Problem Solver'
];

// Marketplace items data
export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Custom, responsive website development using modern technologies and best practices. Perfect for businesses and personal brands.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    category: 'service',
    price: 1200,
    discountPrice: 999,
    features: [
      'Custom responsive design',
      'SEO optimization',
      'Performance optimization',
      'Content management system',
      '3 rounds of revisions',
      '30 days of support'
    ],
    isFeatured: true,
    isPopular: true,
    link: '/contact'
  },
  {
    id: 2,
    title: 'E-commerce Solution',
    description: 'Complete e-commerce website with payment processing, inventory management, and administrative dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'service',
    price: 2500,
    discountPrice: 1999,
    features: [
      'Custom product pages',
      'Secure payment processing',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      '60 days of support'
    ],
    isFeatured: true,
    isPopular: false,
    link: '/contact'
  },
  {
    id: 3,
    title: 'Portfolio Template',
    description: 'Professional portfolio template for developers, designers, and creatives. Easy to customize and deploy.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1655&q=80',
    category: 'template',
    price: 49,
    features: [
      'Responsive design',
      'Easy customization',
      'Project showcase',
      'Contact form',
      'SEO friendly',
      'Documentation'
    ],
    isFeatured: false,
    isPopular: true,
    link: '/contact'
  },
  {
    id: 4,
    title: 'Admin Dashboard Template',
    description: 'Beautiful and functional admin dashboard template with analytics, user management, and more.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'template',
    price: 79,
    features: [
      'Dark/light mode',
      'Dashboard analytics',
      'User management',
      'Data tables',
      'Charts and graphs',
      'Documentation'
    ],
    isFeatured: false,
    isPopular: false,
    link: '/contact'
  },
  {
    id: 5,
    title: 'React Components Library',
    description: 'Collection of reusable React components for faster development. Includes form elements, cards, modals, and more.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'plugin',
    price: 59,
    features: [
      '50+ components',
      'Fully documented',
      'TypeScript support',
      'Customizable themes',
      'Regular updates',
      'Developer support'
    ],
    isFeatured: false,
    isPopular: false,
    link: '/contact'
  },
  {
    id: 6,
    title: 'Web Development Mastery',
    description: 'Comprehensive course covering modern web development from fundamentals to advanced techniques.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'course',
    price: 199,
    discountPrice: 149,
    features: [
      '40+ hours of content',
      'Project assignments',
      'Certificate of completion',
      'Lifetime access',
      'Community access',
      'Regular updates'
    ],
    isFeatured: true,
    isPopular: true,
    link: '/contact'
  },
  {
    id: 7,
    title: 'Ultimate Frontend Guide',
    description: 'Detailed ebook on modern frontend development with practical examples and best practices.',
    image: 'https://images.unsplash.com/photo-1576094848454-c03d926e8ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'ebook',
    price: 29,
    features: [
      '300+ pages',
      'Code examples',
      'Best practices',
      'Performance tips',
      'Responsive design',
      'Free updates'
    ],
    isFeatured: false,
    isPopular: false,
    link: '/contact'
  },
  {
    id: 8,
    title: 'Mobile App Development',
    description: 'Custom mobile app development for iOS and Android platforms using React Native or native development.',
    image: 'https://images.unsplash.com/photo-1575909812264-6902b55846ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'service',
    price: 3500,
    discountPrice: 2999,
    features: [
      'Custom UI/UX design',
      'Cross-platform development',
      'API integration',
      'App Store submission',
      'Play Store submission',
      '90 days of support'
    ],
    isFeatured: false,
    isPopular: true,
    link: '/contact'
  }
];
