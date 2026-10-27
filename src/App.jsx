import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { PaymentModal } from './components/PaymentModal';
import { AuthModal } from './components/AuthModal';
import { HomeLanding } from './pages/HomeLanding';
import { DriverPortal } from './pages/DriverPortal';
import { ClientPortal } from './pages/ClientPortal';
import { DirectMessages } from './pages/DirectMessages';
import { AdminDashboard } from './pages/AdminDashboard';
import { Car, ShieldCheck, Heart, Lock, Globe } from 'lucide-react';

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { currency, formatMoney, FEES } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeLanding setActiveTab={setActiveTab} />;
      case 'client-portal':
        return <ClientPortal />;
      case 'driver-portal':
        return <DriverPortal />;
      case 'messages':
        return <DirectMessages />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomeLanding setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070a14] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderActiveTab()}
      </main>

      {/* Auth & Payment Modals */}
      <AuthModal />
      <PaymentModal />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-10 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Car size={16} />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-wide">D-DRIVE</span>
              <p className="text-[11px] text-slate-500">Nigeria's Premier Professional Driver Marketplace</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>FRSC Verified Drivers</span>
            </span>
            <span className="flex items-center space-x-1">
              <Lock size={14} className="text-amber-400" />
              <span>Registration: {formatMoney(FEES.registrationNGN)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Globe size={14} className="text-amber-400" />
              <span>Driver Subscription: {formatMoney(FEES.monthlyNGN)}/mo</span>
            </span>
          </div>

          <div className="text-center md:text-right text-slate-500">
            © {new Date().getFullYear()} D-Drive Nigeria. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
