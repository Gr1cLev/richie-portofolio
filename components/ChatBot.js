'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  RefreshCw,
  MessageCircle,
  X
} from 'lucide-react';

export default function ChatBot({ externalOpen, onExternalClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Sync with external control
  useEffect(() => {
    if (externalOpen !== undefined) {
      setIsOpen(externalOpen);
    }
  }, [externalOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onExternalClose?.();
  };
  
  // Data pesan awal
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! Saya adalah asisten AI yang membantu anda lebih mengenali siapa Richie, apa yang ingin anda ketahui tentang Richie? Atau ada hal lain yang ingin anda tanyakan?",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    }
  ]);

  // Auto scroll ke bawah saat ada pesan baru
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle kirim pesan dengan Gemini API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    // 1. Tambahkan pesan user
    const userMessage = inputText.trim();
    const newUserMsg = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    // 2. Panggil API untuk mendapatkan respons dari Gemini
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          conversationHistory: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan respons dari server');
      }

      const data = await response.json();
      
      const newBotMsg = {
        id: Date.now() + 1,
        text: data.reply || 'Maaf, saya tidak dapat memproses permintaan Anda saat ini.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (error) {
      console.error('Error:', error);
      
      let errorText = 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.';
      
      // Check if it's a rate limit error
      if (error.message && (error.message.includes('429') || error.message.includes('rate limit') || error.message.includes('quota'))) {
        errorText = '⚠️ Mencapai Rate Limit Penggunaan! Hubungi Richie untuk memperbarui limitnya.';
      }
      
      const errorMsg = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Fungsi Reset Chat
  const handleReset = () => {
    setMessages([
      {
        id: 1,
        text: "Halo! Saya adalah asisten AI yang membantu anda lebih mengenali siapa Richie, apa yang ingin anda ketahui tentang Richie? Atau ada hal lain yang ingin anda tanyakan?",
        sender: 'bot',
        timestamp: new Date().toISOString(),
      }
    ]);
  };

  // Format waktu simpel
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Button - Sticky di kanan bawah */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          </>
        )}
      </button>

      {/* Chat Box - Muncul di tengah saat dibuka */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-2xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* --- HEADER --- */}
            <header className="flex-none h-14 flex items-center justify-between px-4 border-b border-gray-100 bg-white shadow-sm z-10">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                   <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-800 text-sm leading-tight">Richie&apos;s AI</h1>
                  <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              
              {/* Tombol Reset & Close */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleReset}
                  className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                  title="Ulangi Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleClose}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* --- CHAT AREA --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-gray-50/50 scroll-smooth">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm
                      ${msg.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>

                    {/* Bubble Message */}
                    <div className="flex flex-col gap-1">
                      <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                        ${msg.sender === 'user' 
                          ? 'bg-blue-100 text-gray-800 rounded-tr-none'
                          : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className={`text-[10px] text-gray-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex w-full justify-start">
                  <div className="flex max-w-[80%] gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={12} />
                    </div>
                    <div className="bg-white border border-gray-200 px-3 py-2 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Spacer untuk scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* --- INPUT AREA --- */}
            <div className="bg-white p-3 border-t border-gray-100">
              <form 
                onSubmit={handleSendMessage}
                className="relative flex items-end gap-2 bg-white border border-gray-200 rounded-2xl px-2 py-2 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all shadow-sm"
              >
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Tulis pesan..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 resize-none max-h-20 py-1.5 px-2 text-sm outline-none"
                  rows={1}
                  style={{ minHeight: '36px' }}
                  disabled={isTyping}
                />

                <button 
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className={`p-2 rounded-xl transition-all duration-200 flex-shrink-0 flex items-center justify-center mb-0.5
                    ${inputText.trim() && !isTyping
                      ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transform hover:scale-105' 
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
