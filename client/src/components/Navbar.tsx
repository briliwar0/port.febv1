import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navVariants } from '@/lib/animations';
import { Link, useLocation } from 'wouter';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="show"
      className={`fixed top-0 left-0 w-full z-50 transition duration-500 ${
        scrolled ? 'bg-white/10 dark:bg-background/80' : 'bg-transparent'
      } backdrop-blur-lg`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold font-sans">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Febri.dev
            </span>
          </a>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </Button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              className="font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              About
            </a>
            <a 
              href="#skills" 
              className="font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Projects
            </a>
            <a 
              href="#marketplace" 
              className="font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Marketplace
            </a>
            <a 
              href="#color-generator" 
              className="font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Color Generator
            </a>
            <a 
              href="#contact" 
              className="font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Contact
            </a>
            <Link
              href="/ui-demo"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
              onClick={handleLinkClick}
            >
              UI Demo
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md shadow-lg absolute top-full left-0 w-full"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <a 
                href="#home" 
                className="font-medium hover:text-primary transition-colors py-2"
                onClick={handleLinkClick}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="font-medium hover:text-primary transition-colors py-2"
                onClick={handleLinkClick}
              >
                About
              </a>
              <a 
                href="#skills" 
                className="font-medium hover:text-primary transition-colors py-2"
                onClick={handleLinkClick}
              >
                Skills
              </a>
              <a 
                href="#projects" 
                className="font-medium hover:text-primary transition-colors py-2"
                onClick={handleLinkClick}
              >
                Projects
              </a>
              <a 
                href="#marketplace" 
                className="font-medium hover:text-primary transition-colors py-2"
                onClick={handleLinkClick}
              >
                Marketplace
              </a>
              <a 
                href="#color-generator" 
                className="font-medium hover:text-primary transition-colors py-2"
                onClick={handleLinkClick}
              >
                Color Generator
              </a>
              <a 
                href="#contact" 
                className="font-medium hover:text-primary transition-colors py-2"
                onClick={handleLinkClick}
              >
                Contact
              </a>
              <Link
                href="/ui-demo"
                className="font-medium text-primary hover:text-primary/80 transition-colors py-2"
                onClick={handleLinkClick}
              >
                UI Demo
              </Link>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-muted-foreground">Toggle theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
