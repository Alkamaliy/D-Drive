import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Send, MapPin, Phone, Car, ShieldCheck, Check, Clock, User } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';

export const ChatWindow = () => {
  const { chats, activeChatId, sendMessage, currentRole, drivers, clientUser } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
  const targetDriver = drivers.find(d => d.id === activeChat?.driverId) || drivers[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-slate-400 glass-panel rounded-3xl">
        <div>
          <Car size={48} className="mx-auto text-slate-600 mb-3" />
          <p className="text-base font-semibold text-slate-300">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChat.id, inputText);
    setInputText('');
  };

  const handleQuickPrompt = (prompt) => {
    sendMessage(activeChat.id, prompt);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden glass-panel">
      
      {/* Chat Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={targetDriver?.avatar || activeChat.driverAvatar} 
              alt={targetDriver?.name} 
              className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-sm">{targetDriver?.name || 'Driver Chauffeur'}</h3>
              <VerifiedBadge size="sm" showText={false} />
            </div>
            <p className="text-xs text-slate-400 flex items-center space-x-1">
              <MapPin size={12} className="text-amber-500" />
              <span>{targetDriver?.location || 'Lagos, Nigeria'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`tel:${targetDriver?.phone || '+234800000000'}`}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl border border-slate-700 text-xs font-semibold flex items-center space-x-1 transition"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">Call</span>
          </a>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
        
        {/* Verification banner in chat */}
        <div className="max-w-md mx-auto p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center text-xs text-amber-300 flex items-center justify-center space-x-2">
          <ShieldCheck size={16} className="text-amber-400 shrink-0" />
          <span>D-Drive Protected Chat — Driver is a verified ₦5,000 Bonafide Member.</span>
        </div>

        {activeChat.messages?.map((msg) => {
          const isMe = (currentRole === 'driver' && msg.sender === 'driver') || 
                       (currentRole !== 'driver' && msg.sender === 'client');

          return (
            <div 
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  isMe 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-tr-none shadow-md shadow-amber-500/10' 
                    : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/80'
                }`}
              >
                {msg.text}
              </div>

              <span className="text-[10px] text-slate-500 mt-1 px-1 flex items-center space-x-1">
                <span>{msg.timestamp}</span>
                {isMe && <Check size={12} className="text-amber-400" />}
              </span>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Shortcuts */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-slate-500 uppercase font-bold shrink-0">Quick Prompts:</span>
        <button
          onClick={() => handleQuickPrompt('Are you available for an all-day drive tomorrow?')}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full border border-slate-700 whitespace-nowrap"
        >
          Check Availability
        </button>
        <button
          onClick={() => handleQuickPrompt(`What is your rate for a drive within ${targetDriver?.state || 'Lagos'}?`)}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full border border-slate-700 whitespace-nowrap"
        >
          Ask Rate Quote
        </button>
        <button
          onClick={() => handleQuickPrompt('Can you handle an executive SUV / Lexus LX570?')}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full border border-slate-700 whitespace-nowrap"
        >
          Vehicle Inquiry
        </button>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type a message to ${targetDriver?.name || 'driver'}...`}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 rounded-2xl transition shadow-lg shadow-amber-500/20 font-bold"
        >
          <Send size={18} />
        </button>
      </form>

    </div>
  );
};
