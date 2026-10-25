import React from 'react';
import { useApp } from '../context/AppContext';
import { ChatWindow } from '../components/ChatWindow';
import { MessageSquare, Search, ShieldCheck } from 'lucide-react';
import { VerifiedBadge } from '../components/VerifiedBadge';

export const DirectMessages = () => {
  const { chats, activeChatId, setActiveChatId, drivers, currentRole } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 h-[calc(100vh-6rem)]">
      <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sidebar Conversation List */}
        <div className="glass-panel rounded-3xl border border-slate-800 p-4 flex flex-col space-y-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <MessageSquare size={18} className="text-amber-400" />
              <span>Direct Messages</span>
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
              {chats.length} Active
            </span>
          </div>

          {/* Chat Threads list */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {chats.map(chat => {
              const driver = drivers.find(d => d.id === chat.driverId);
              const isActive = chat.id === activeChatId || (!activeChatId && chat.id === chats[0]?.id);

              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition flex items-center space-x-3 border ${
                    isActive 
                      ? 'bg-amber-500/10 border-amber-500/40 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img 
                      src={driver?.avatar || chat.driverAvatar} 
                      alt={chat.driverName} 
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">
                        {driver?.name || chat.clientName}
                      </h4>
                      <span className="text-[10px] text-slate-500">{chat.lastTime}</span>
                    </div>

                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Chat Interface Window */}
        <div className="md:col-span-2 h-full">
          <ChatWindow />
        </div>

      </div>
    </div>
  );
};
