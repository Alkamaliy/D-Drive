import React, { useState } from 'react';
import { useApp, FX_RATES } from '../context/AppContext';
import { VerifiedBadge } from './VerifiedBadge';
import { 
  Car, 
  Search, 
  MessageSquare, 
  UserCheck, 
  Menu, 
  X, 
  CreditCard,
  Crown,
  Globe,
  LogIn,
  LogOut,
  User,
  UserPlus
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { 
    currentUser,
    currentRole, 
    setCurrentRole, 
    openAuthModal,
    logoutUser,
    driverUser, 
    clientUser, 
    openPaymentModal, 
    chats,
    currency,
    setCurrency,
    formatMoney,
    FEES
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const unreadTotal = chats.reduce((acc, curr) => acc + (curr.unreadCount || 0), 0);

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    if (role === 'driver') setActiveTab('driver-portal');
    else if (role === 'client') setActiveTab('client-portal');
    else if (role === 'admin') setActiveTab('admin-dashboard');
    else setActiveTab('home');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Car className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl font-extrabold tracking-tight text-white font-sans">D-DRIVE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-wider">NG</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">Nigeria Chauffeurs</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'home' 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => { setActiveTab('client-portal'); setCurrentRole('client'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'client-portal' 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Search size={14} />
            <span>Find Drivers</span>
          </button>

          <button
            onClick={() => { setActiveTab('driver-portal'); setCurrentRole('driver'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'driver-portal' 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <UserCheck size={14} />
            <span>Driver Portal</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition relative ${
              activeTab === 'messages' 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare size={14} />
            <span>Messages</span>
            {unreadTotal > 0 && (
              <span className="w-4 h-4 bg-amber-500 text-slate-950 rounded-full text-[10px] font-extrabold flex items-center justify-center">
                {unreadTotal}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('admin-dashboard'); setCurrentRole('admin'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'admin-dashboard' 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Crown size={14} className="text-amber-400" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Currency Selector, Auth Buttons, & Persona Cluster */}
        <div className="hidden lg:flex items-center space-x-3">
          
          {/* Currency Indicator */}
          <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-amber-400 font-bold">
            <span>₦ NGN (Nigeria)</span>
          </div>

          {/* Quick Role Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <span className="text-[10px] text-slate-400 px-2 uppercase font-bold tracking-wider">Role:</span>
            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="bg-slate-950 text-amber-400 text-xs font-semibold rounded-lg px-2.5 py-1 border border-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="visitor">Visitor Persona</option>
              <option value="driver">Driver Persona</option>
              <option value="client">Client Persona</option>
              <option value="admin">Admin Portal</option>
            </select>
          </div>

          {/* Authenticated User Status or Login/Signup Buttons */}
          {currentUser ? (
            <div className="flex items-center space-x-2 bg-slate-900 p-1.5 pr-2.5 rounded-2xl border border-slate-800">
              <img 
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'} 
                alt={currentUser.name} 
                className="w-8 h-8 rounded-xl object-cover border border-amber-500/40"
              />
              <div className="text-left">
                <span className="text-xs font-bold text-white block max-w-[110px] truncate leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block">
                  {currentUser.role}
                </span>
              </div>
              <button
                onClick={logoutUser}
                title="Log Out"
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition ml-1"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition flex items-center space-x-1.5"
              >
                <LogIn size={13} />
                <span>Log In</span>
              </button>

              <button
                onClick={() => openAuthModal('signup', 'client')}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center space-x-1.5"
              >
                <UserPlus size={13} />
                <span>Sign Up</span>
              </button>
            </div>
          )}

        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-3">
          
          {/* User Auth Section on Mobile */}
          {currentUser ? (
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center space-x-2.5">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-xl object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">{currentUser.name}</h4>
                  <span className="text-[10px] text-amber-400 uppercase font-semibold">{currentUser.role}</span>
                </div>
              </div>
              <button
                onClick={() => { logoutUser(); setMobileMenuOpen(false); }}
                className="px-3 py-1 bg-red-950/60 text-red-300 text-xs font-bold rounded-lg border border-red-800"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                className="p-2.5 text-center text-xs font-bold text-white bg-slate-900 border border-slate-800 rounded-xl"
              >
                Log In
              </button>
              <button
                onClick={() => { openAuthModal('signup'); setMobileMenuOpen(false); }}
                className="p-2.5 text-center text-xs font-bold text-slate-950 bg-amber-500 rounded-xl"
              >
                Sign Up
              </button>
            </div>
          )}

          <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold">Platform Currency:</span>
            <span className="text-xs font-bold text-amber-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              ₦ NGN (Nigeria)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="p-2.5 text-xs text-left font-semibold text-slate-200 bg-slate-900 rounded-xl"
            >
              Home Page
            </button>
            <button
              onClick={() => { setActiveTab('client-portal'); setCurrentRole('client'); setMobileMenuOpen(false); }}
              className="p-2.5 text-xs text-left font-semibold text-slate-200 bg-slate-900 rounded-xl"
            >
              Find Drivers
            </button>
            <button
              onClick={() => { setActiveTab('driver-portal'); setCurrentRole('driver'); setMobileMenuOpen(false); }}
              className="p-2.5 text-xs text-left font-semibold text-slate-200 bg-slate-900 rounded-xl"
            >
              Driver Portal
            </button>
            <button
              onClick={() => { setActiveTab('messages'); setMobileMenuOpen(false); }}
              className="p-2.5 text-xs text-left font-semibold text-slate-200 bg-slate-900 rounded-xl"
            >
              Direct Chat
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
