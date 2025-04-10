import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

// Define message types
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  botName?: string;
  botAvatar?: string;
  userAvatar?: string;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

const AIChatbot = ({
  isOpen,
  onClose,
  initialMessage = "Hello! I'm your AI assistant. How can I help you today?",
  botName = "AI Assistant",
  botAvatar = "",
  userAvatar = "",
  position = 'bottom-right',
  className,
}: ChatbotProps) => {
  // State for messages and input
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: generateId(),
          content: initialMessage,
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, initialMessage, messages.length]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate response (replace with actual API call)
    setTimeout(() => {
      // This is where you'd call your actual API in a real implementation
      const botResponses = [
        "I understand what you're asking. Let me help with that.",
        "That's an interesting question! Here's what I think...",
        "I'd be happy to help you with that request.",
        "Let me process that information and get back to you.",
        "Based on what you've told me, I would suggest...",
        "I'm here to assist with your questions and concerns.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: generateId(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  // Format timestamps
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Chat toggle button
  const ChatToggle = () => (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg",
        position === 'bottom-right' ? 'bottom-4 right-4' : 'bottom-4 left-4'
      )}
      onClick={() => (isOpen ? onClose() : onClose())}
    >
      <MessageSquare className="h-6 w-6" />
    </motion.button>
  );

  return (
    <>
      {!isOpen && <ChatToggle />}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed z-50 flex flex-col w-80 sm:w-96 h-[500px] max-h-[calc(100vh-2rem)] rounded-xl shadow-xl bg-background border',
              positionClasses[position],
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-muted/40">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {botAvatar ? (
                    <AvatarImage src={botAvatar} alt={botName} />
                  ) : (
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">{botName}</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full opacity-70 hover:opacity-100"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex w-full',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {message.role === 'assistant' && (
                      <Avatar className="h-6 w-6">
                        {botAvatar ? (
                          <AvatarImage src={botAvatar} alt={botName} />
                        ) : (
                          <AvatarFallback>
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                    )}
                    
                    <div
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <div>{message.content}</div>
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    
                    {message.role === 'user' && (
                      <Avatar className="h-6 w-6">
                        {userAvatar ? (
                          <AvatarImage src={userAvatar} alt="You" />
                        ) : (
                          <AvatarFallback>You</AvatarFallback>
                        )}
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2 max-w-[80%]">
                    <Avatar className="h-6 w-6">
                      {botAvatar ? (
                        <AvatarImage src={botAvatar} alt={botName} />
                      ) : (
                        <AvatarFallback>
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="px-3 py-2 rounded-lg bg-muted">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t p-3 flex gap-2 items-end"
            >
              <Textarea
                placeholder="Type your message..."
                className="min-h-10 resize-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!inputValue.trim() || isTyping} 
                className="h-10 w-10 shrink-0"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { AIChatbot };