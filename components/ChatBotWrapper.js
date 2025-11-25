'use client';

import React, { useState } from 'react';
import ChatBot from './ChatBot';

export default function ChatBotWrapper() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Fungsi ini akan dipanggil dari Header
  if (typeof window !== 'undefined') {
    window.openChatbot = () => setIsChatbotOpen(true);
  }

  return (
    <ChatBot 
      externalOpen={isChatbotOpen} 
      onExternalClose={() => setIsChatbotOpen(false)} 
    />
  );
}
