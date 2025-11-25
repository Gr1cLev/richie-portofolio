'use client';

import React, { useState, useEffect } from 'react';
import ChatBot from './ChatBot';

export default function ChatBotWrapper() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    // Fungsi ini akan dipanggil dari Header
    window.openChatbot = () => setIsChatbotOpen(true);
    
    return () => {
      // Cleanup
      if (window.openChatbot) {
        delete window.openChatbot;
      }
    };
  }, []);

  return (
    <ChatBot 
      externalOpen={isChatbotOpen} 
      onExternalClose={() => setIsChatbotOpen(false)} 
    />
  );
}
