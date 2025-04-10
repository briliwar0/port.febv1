import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X, 
  MessageSquare,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Popup } from '@/components/ui/popup';
import { useToast } from '@/hooks/use-toast';
import { AIChatbot } from '@/components/ui/ai-chatbot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UIDemo() {
  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for Popup notifications
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [popupPosition, setPopupPosition] = useState<'top' | 'center' | 'bottom'>('center');
  
  // State for Chatbot
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  // Toast hook
  const { toast } = useToast();

  const showToast = (type: 'default' | 'destructive' | 'success') => {
    const toastOptions = {
      title: type === 'default' ? 'Information' : type === 'destructive' ? 'Error' : 'Success',
      description: `This is a ${type} toast notification example.`,
      variant: type === 'destructive' ? 'destructive' : type === 'success' ? 'default' : 'default',
    };
    
    if (type === 'success') {
      toast({
        ...toastOptions,
        description: 'Operation completed successfully!',
      });
    } else {
      toast(toastOptions);
    }
  };

  const showPopup = (type: 'success' | 'error' | 'warning' | 'info', position: 'top' | 'center' | 'bottom') => {
    setPopupType(type);
    setPopupPosition(position);
    setIsPopupOpen(true);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">UI Components Demo</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          This page demonstrates various UI components including modals, popups, toast notifications, and an AI chatbot.
        </p>
      </div>
      
      <Tabs defaultValue="modals" className="mx-auto max-w-3xl">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="modals">Modals</TabsTrigger>
          <TabsTrigger value="popups">Popups</TabsTrigger>
          <TabsTrigger value="toasts">Toasts</TabsTrigger>
          <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
        </TabsList>
        
        {/* Modals Section */}
        <TabsContent value="modals" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </span>
                Custom Modal
              </CardTitle>
              <CardDescription>
                A flexible modal component with animations and different size options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => setIsModalOpen(true)}>
                  Open Custom Modal
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Shadcn Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Shadcn Dialog</DialogTitle>
                      <DialogDescription>
                        This is the built-in dialog component from shadcn/ui.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>You can use this for simple dialog needs. The custom modal offers more features.</p>
                    </div>
                    <div className="flex justify-end">
                      <Button>Action</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          
          {/* Custom Modal Example */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            description="This is a custom modal component with various options and animations."
            size="md"
          >
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              
              <p className="text-sm text-muted-foreground">
                This modal features smooth animations, backdrop blur, and can be closed by clicking outside
                or pressing the Escape key.
              </p>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setIsModalOpen(false);
                showToast('success');
              }}>
                Submit
              </Button>
            </div>
          </Modal>
        </TabsContent>
        
        {/* Popups Section */}
        <TabsContent value="popups" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-primary" />
                </span>
                Popup Notifications
              </CardTitle>
              <CardDescription>
                Attention-grabbing popup notifications with different styles and positions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button onClick={() => showPopup('success', 'center')} className="bg-green-600 hover:bg-green-700">
                  Success
                </Button>
                <Button onClick={() => showPopup('error', 'center')} variant="destructive">
                  Error
                </Button>
                <Button onClick={() => showPopup('warning', 'center')} className="bg-yellow-600 hover:bg-yellow-700">
                  Warning
                </Button>
                <Button onClick={() => showPopup('info', 'center')} className="bg-blue-600 hover:bg-blue-700">
                  Info
                </Button>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Positions</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" onClick={() => showPopup('info', 'top')}>
                    Top
                  </Button>
                  <Button variant="outline" onClick={() => showPopup('info', 'center')}>
                    Center
                  </Button>
                  <Button variant="outline" onClick={() => showPopup('info', 'bottom')}>
                    Bottom
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Popup Component */}
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            type={popupType}
            position={popupPosition}
            title={`${popupType.charAt(0).toUpperCase() + popupType.slice(1)} Notification`}
            message={`This is an example of a ${popupType} popup notification placed at the ${popupPosition} of the screen.`}
            actionButton={{
              label: 'Action',
              onClick: () => setIsPopupOpen(false),
            }}
          />
        </TabsContent>
        
        {/* Toasts Section */}
        <TabsContent value="toasts" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-full">
                  <Info className="h-5 w-5 text-primary" />
                </span>
                Toast Notifications
              </CardTitle>
              <CardDescription>
                Non-intrusive notifications that appear briefly and disappear automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => showToast('default')}>
                  Default Toast
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => showToast('success')}>
                  Success Toast
                </Button>
                <Button variant="destructive" onClick={() => showToast('destructive')}>
                  Error Toast
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Toasts automatically disappear after a few seconds or when dismissed.
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Chatbot Section */}
        <TabsContent value="chatbot" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </span>
                AI Chatbot
              </CardTitle>
              <CardDescription>
                Interactive chatbot component for providing instant assistance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The AI chatbot component provides a conversational interface for users to get assistance.
                This is a demo version that simulates responses - in a real application, you would connect
                this to an API like OpenAI's ChatGPT.
              </p>
              <Button onClick={() => setIsChatbotOpen(true)}>
                Open Chatbot
              </Button>
            </CardContent>
          </Card>
          
          {/* Chatbot Component */}
          <AIChatbot
            isOpen={isChatbotOpen}
            onClose={() => setIsChatbotOpen(false)}
            botName="Portfolio Assistant"
            initialMessage="Hello! I'm your portfolio assistant. How can I help you today?"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}