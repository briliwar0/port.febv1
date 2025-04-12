import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
  showCloseButton = true,
  closeOnOutsideClick = true,
}: ModalProps) => {
  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key press
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Size classes - updated for mobile responsiveness
  const sizeClasses = {
    sm: 'w-[85vw] max-w-xs',
    md: 'w-[90vw] max-w-sm',
    lg: 'w-[92vw] max-w-md',
    xl: 'w-[95vw] max-w-lg',
    full: 'w-[97vw] max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: 'spring',
              duration: 0.3,
              bounce: 0.2,
            }}
            className={cn(
              'relative z-50 w-full rounded-lg bg-background p-4 sm:p-6 shadow-lg',
              sizeClasses[size],
              className
            )}
          >
            {/* Close Button */}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 sm:right-4 sm:top-4 h-6 w-6 sm:h-8 sm:w-8 rounded-full opacity-70 hover:bg-muted hover:opacity-100"
                onClick={onClose}
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Close</span>
              </Button>
            )}

            {/* Header */}
            {(title || description) && (
              <div className="mb-3 sm:mb-4">
                {title && <h2 className="text-base sm:text-xl font-bold">{title}</h2>}
                {description && (
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            )}

            {/* Content */}
            <div className="max-h-[calc(60vh-120px)] sm:max-h-[calc(80vh-160px)] overflow-y-auto text-sm sm:text-base">
              {children}
            </div>

            {/* Footer */}
            {footer && <div className="mt-3 sm:mt-6">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export { Modal };