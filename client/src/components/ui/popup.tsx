import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export type PopupType = 'success' | 'error' | 'warning' | 'info';

interface PopupProps {
  type?: PopupType;
  title: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  position?: 'top' | 'bottom' | 'center';
  duration?: number; // Auto close duration in milliseconds, 0 means no auto close
  showCloseButton?: boolean;
  className?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const Popup = ({
  type = 'info',
  title,
  message,
  isOpen,
  onClose,
  position = 'center',
  duration = 0,
  showCloseButton = true,
  className,
  actionButton,
}: PopupProps) => {
  // Auto close functionality
  React.useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  // Get icon based on type
  const getIcon = () => {
    const iconProps = { className: 'h-5 w-5' };
    
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className="text-green-500" />;
      case 'error':
        return <AlertCircle {...iconProps} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="text-yellow-500" />;
      case 'info':
      default:
        return <Info {...iconProps} className="text-blue-500" />;
    }
  };

  // Get position style
  const positionClass = {
    top: 'top-4 left-1/2 -translate-x-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    bottom: 'bottom-4 left-1/2 -translate-x-1/2',
  };

  // Get background style based on type
  const getBackgroundClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? -20 : position === 'bottom' ? 20 : 0, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? -20 : position === 'bottom' ? 20 : 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'pointer-events-auto fixed max-w-sm w-full rounded-lg border shadow-lg',
              positionClass[position],
              getBackgroundClass(),
              className
            )}
          >
            <div className="p-4">
              {/* Header with icon and title */}
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">{getIcon()}</div>
                <h3 className="text-sm font-medium">{title}</h3>
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto -mr-1 h-6 w-6 rounded-full opacity-70 hover:opacity-100"
                    onClick={onClose}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Close</span>
                  </Button>
                )}
              </div>

              {/* Message */}
              {message && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {message}
                </div>
              )}

              {/* Action button */}
              {actionButton && (
                <div className="mt-4 flex justify-end">
                  <Button 
                    size="sm"
                    variant={type === 'error' ? 'destructive' : 'default'}
                    onClick={actionButton.onClick}
                  >
                    {actionButton.label}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export { Popup };