import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Modal } from '@/components/ui/modal';
import { Popup } from '@/components/ui/popup';
import { AIChatbot } from '@/components/ui/ai-chatbot';
import { useToast } from '@/hooks/use-toast';

const AutomaticUI = () => {
  // State untuk komponen-komponen UI
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();

  // Tentukan apakah pengunjung baru berdasarkan localStorage
  const isNewVisitor = () => {
    // Reset localStorage untuk debugging
    localStorage.removeItem('lastVisit');
    
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().toISOString();
    
    if (!lastVisit) {
      localStorage.setItem('lastVisit', now);
      return true;
    }
    
    // Jika kunjungan terakhir lebih dari 24 jam yang lalu, anggap sebagai pengunjung baru
    const lastVisitDate = new Date(lastVisit);
    const hoursSinceLastVisit = (new Date().getTime() - lastVisitDate.getTime()) / (1000 * 3600);
    
    if (hoursSinceLastVisit > 24) {
      localStorage.setItem('lastVisit', now);
      return true;
    }
    
    return false;
  };

  // Menampilkan komponen-komponen UI secara berurutan saat halaman pertama kali dimuat
  useEffect(() => {
    // Hanya tampilkan di halaman utama
    if (location !== '/') return;
    
    // Selalu tampilkan semua komponen UI (tidak memperhatikan apakah pengunjung baru atau tidak)
    
    // Tampilkan toast setelah 1 detik
    const toastTimer = setTimeout(() => {
      toast({
        title: "Selamat Datang!",
        description: "Terima kasih telah mengunjungi portfolio website saya.",
        variant: "default",
      });
    }, 1000);
    
    // Tampilkan popup setelah 3 detik
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    
    // Tampilkan modal setelah 6 detik
    const modalTimer = setTimeout(() => {
      setShowWelcomeModal(true);
    }, 6000);
    
    // Tampilkan chatbot setelah 10 detik
    const chatbotTimer = setTimeout(() => {
      setShowChatbot(true);
    }, 10000);
    
    // Cleanup timers
    return () => {
      clearTimeout(toastTimer);
      clearTimeout(popupTimer);
      clearTimeout(modalTimer);
      clearTimeout(chatbotTimer);
    };
  }, [location, toast]);

  // Template untuk modal selamat datang
  const welcomeModalContent = (
    <div className="space-y-4">
      <p>Terima kasih telah mengunjungi website portfolio saya. Saya adalah seorang full-stack developer dengan pengalaman dalam pengembangan web modern.</p>
      
      <p>Jelajahi berbagai proyek dan layanan yang saya tawarkan. Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi saya melalui formulir kontak atau gunakan chatbot untuk bantuan cepat.</p>
      
      <div className="flex justify-center mt-4">
        <img 
          src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1764&q=80" 
          alt="Welcome" 
          className="rounded-lg max-h-40 object-cover"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Welcome Modal */}
      <Modal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        title="Selamat Datang di Portfolio Saya"
        description="Saya senang Anda berkunjung!"
        size="md"
      >
        {welcomeModalContent}
        
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => setShowWelcomeModal(false)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Jelajahi Website
          </button>
        </div>
      </Modal>
      
      {/* Welcome Popup */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type="info"
        position="top"
        title="Lihat Proyek Terbaru"
        message="Saya baru saja menambahkan beberapa proyek baru ke portfolio. Jangan lupa untuk melihatnya!"
        actionButton={{
          label: 'Lihat Proyek',
          onClick: () => {
            setShowPopup(false);
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          },
        }}
        duration={8000} // Auto close after 8 seconds
      />
      
      {/* AI Chatbot */}
      <AIChatbot
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
        botName="Portfolio Assistant"
        initialMessage="Halo! Saya adalah asisten virtual yang dapat membantu Anda menjelajahi portfolio ini. Ada yang bisa saya bantu?"
      />
    </>
  );
};

export default AutomaticUI;