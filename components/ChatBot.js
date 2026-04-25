'use client';

import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Send, Bot, User, Sparkles, RefreshCw, MessageCircle, X } from 'lucide-react';

export default function ChatBot({ externalOpen, onExternalClose, hideFab = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (externalOpen !== undefined) setIsOpen(externalOpen);
  }, [externalOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onExternalClose?.();
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! Saya adalah asisten AI yang membantu anda lebih mengenali siapa Richie, apa yang ingin anda ketahui tentang Richie? Atau ada hal lain yang ingin anda tanyakan?",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMessage = inputText.trim();
    const newUserMsg = { id: Date.now(), text: userMessage, sender: 'user', timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
        }),
      });

      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: data.reply || 'Maaf, saya tidak dapat memproses permintaan Anda saat ini.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      }]);
    } catch (error) {
      const isRateLimit = error.message?.includes('429') || error.message?.includes('rate limit') || error.message?.includes('quota');
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: isRateLimit
          ? '⚠️ Mencapai Rate Limit Penggunaan! Hubungi Richie untuk memperbarui limitnya.'
          : 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([{
      id: 1,
      text: "Halo! Saya adalah asisten AI yang membantu anda lebih mengenali siapa Richie, apa yang ingin anda ketahui tentang Richie? Atau ada hal lain yang ingin anda tanyakan?",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    }]);
  };

  const formatTime = (iso) => new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* FAB Button — hidden when accessed from Dock/ControlCenter */}
      {!hideFab && <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
        className="fixed bottom-24 md:bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-orange flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,159,64,0.35)] transition-all duration-200 hover:scale-110 hover:shadow-[0_0_28px_rgba(255,159,64,0.50)]"
      >
        {isOpen ? <X className="w-5 h-5" /> : (
          <>
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_6px_rgba(74,222,128,0.8)] animate-pulse" />
          </>
        )}
      </button>}

      {/* Chat Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          <div
            className="w-full max-w-lg flex flex-col overflow-hidden animate-spring-in"
            style={{
              height: 'min(600px, 85vh)',
              background: 'rgba(12, 10, 28, 0.80)',
              backdropFilter: 'blur(48px) saturate(180%)',
              WebkitBackdropFilter: 'blur(48px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '28px',
              boxShadow: '0 1px 0 rgba(255,255,255,0.18) inset, 0 32px 80px rgba(0,0,0,0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-none flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl glass-orange flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-orange-300" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Richie&apos;s AI</p>
                  <p className="text-[10px] text-green-400/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset chat"
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all hover:scale-110"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClose}
                  title="Close"
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all hover:scale-110"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-white ${msg.sender === 'user' ? 'bg-blue-500/70' : 'glass-orange'}`}>
                      {msg.sender === 'user' ? <User size={11} /> : <Bot size={11} />}
                    </div>
                    {/* Bubble */}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'rounded-2xl rounded-tr-sm text-white/90'
                            : 'rounded-2xl rounded-tl-sm text-white/80'
                        }`}
                        style={msg.sender === 'user'
                          ? { background: 'rgba(10, 132, 255, 0.30)', border: '1px solid rgba(10,132,255,0.25)' }
                          : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }
                        }
                      >
                        {msg.sender === 'bot' ? (
                          <Markdown components={{
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                            a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:underline">{children}</a>,
                            ul: ({ children }) => <ul className="list-disc list-inside my-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside my-1">{children}</ol>,
                            li: ({ children }) => <li className="ml-2">{children}</li>,
                            code: ({ children }) => <code className="bg-white/10 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                          }}>
                            {msg.text}
                          </Markdown>
                        ) : msg.text}
                      </div>
                      <span className={`text-[10px] text-white/25 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] gap-2">
                    <div className="w-6 h-6 rounded-full glass-orange flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={11} className="text-orange-300" />
                    </div>
                    <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}>
                      {[0, 150, 300].map((delay) => (
                        <div key={delay} className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-none px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <form
                onSubmit={handleSendMessage}
                className="flex items-end gap-2 rounded-2xl px-3 py-2"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
              >
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); }
                  }}
                  placeholder="Tulis pesan..."
                  rows={1}
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-white/80 placeholder-white/25 resize-none max-h-20 py-1 text-sm outline-none"
                  style={{ minHeight: '32px' }}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    inputText.trim() && !isTyping
                      ? 'text-white hover:scale-110 shadow-[0_0_12px_rgba(255,159,64,0.4)]'
                      : 'text-white/20 cursor-not-allowed'
                  }`}
                  style={inputText.trim() && !isTyping ? { background: 'rgba(255,140,50,0.80)' } : { background: 'rgba(255,255,255,0.06)' }}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
