import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { globalCountries } from '../data/mockData';
import { DriverCard } from '../components/DriverCard';
import { DriverDetailModal } from '../components/DriverDetailModal';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Car, 
  Lock, 
  ShieldCheck, 
  CreditCard 
} from 'lucide-react';

export const ClientPortal = () => {
  const { 
    drivers, 
    clientUser, 
    openPaymentModal, 
    startChatWithDriver,
    formatMoney,
    FEES
  } = useApp();

  const [selectedDriver, setSelectedDriver] = useState(null);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Nigeria');
  const [transmissionFilter, setTransmissionFilter] = useState('All');
  const [minExperience, setMinExperience] = useState(0);

  // Filtered drivers list
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          driver.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (driver.state && driver.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          driver.vehicleTypes.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation = selectedLocation === 'All Nigeria' || 
                            driver.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
                            (driver.state && driver.state.toLowerCase().includes(selectedLocation.toLowerCase()));
    
    const matchesTransmission = transmissionFilter === 'All' || 
                                 driver.transmission.toLowerCase().includes(transmissionFilter.toLowerCase());

    const matchesExp = driver.experienceYears >= minExperience;

    return matchesSearch && matchesLocation && matchesTransmission && matchesExp;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck size={16} />
            <span>D-Drive Nigeria Chauffeur Marketplace</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Find Professional Drivers Across Nigeria</h1>
          <p className="text-sm text-slate-400 mt-1">Browse background-checked executive chauffeurs in Lagos, Abuja, Port Harcourt, Ibadan, and nationwide.</p>
        </div>

        {!clientUser.isAccessPaid ? (
          <button
            onClick={() => openPaymentModal('client', 'registration')}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center space-x-2 transition shadow-xl shadow-amber-500/20 shrink-0"
          >
            <Lock size={16} />
            <span>Unlock Access ({formatMoney(FEES.registrationNGN)})</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-semibold">
            <ShieldCheck size={16} />
            <span>Active Nigeria Access ({formatMoney(FEES.monthlyNGN)}/mo)</span>
          </div>
        )}
      </div>

      {/* Locked Platform Callout Banner */}
      {!clientUser.isAccessPaid && (
        <div className="p-6 bg-slate-900/90 border border-amber-500/40 rounded-3xl space-y-4 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl shrink-0 border border-amber-500/30">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Nigeria Chauffeur Directory: One-Time {formatMoney(FEES.registrationNGN)} Access Fee</span>
                  <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30 font-mono">
                    + {formatMoney(FEES.monthlyNGN)}/mo
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  To view verified FRSC driver credentials, filter drivers by location across Nigeria, and initiate direct live chat, complete your <strong>{formatMoney(FEES.registrationNGN)}</strong> platform registration fee via direct bank transfer to our official WEMA BANK account.
                </p>
              </div>
            </div>

            <button
              onClick={() => openPaymentModal('client', 'registration')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center space-x-2 transition shadow-xl shadow-amber-500/20 shrink-0"
            >
              <CreditCard size={16} />
              <span>Unlock Drivers & Live Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Search & Filtering Control Panel */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-3">
        
        {/* Text Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search driver, city, car model..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
          />
        </div>

        {/* Location Filter */}
        <div className="relative">
          <MapPin size={16} className="absolute left-3.5 top-3.5 text-amber-500" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-amber-400 font-bold focus:border-amber-500 outline-none appearance-none cursor-pointer"
          >
            {globalCountries.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Transmission Filter */}
        <div className="relative">
          <Car size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          <select
            value={transmissionFilter}
            onChange={(e) => setTransmissionFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white font-medium focus:border-amber-500 outline-none appearance-none cursor-pointer"
          >
            <option value="All">All Transmission Types</option>
            <option value="Automatic">Automatic Only</option>
            <option value="Manual">Manual Only</option>
            <option value="Both">Both (Manual & Automatic)</option>
          </select>
        </div>

        {/* Min Experience */}
        <div className="relative">
          <SlidersHorizontal size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          <select
            value={minExperience}
            onChange={(e) => setMinExperience(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-amber-500 outline-none appearance-none cursor-pointer"
          >
            <option value={0}>Any Experience Level</option>
            <option value={5}>5+ Years Experience</option>
            <option value={8}>8+ Years Experience</option>
            <option value={10}>10+ Years Experience</option>
          </select>
        </div>

      </div>

      {/* Driver Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing <strong className="text-white">{filteredDrivers.length}</strong> available chauffeurs across Nigeria</span>
          <span>Sorted by FRSC Verification & Rating</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map(driver => (
            <DriverCard 
              key={driver.id} 
              driver={driver} 
              onSelectDriver={(d) => setSelectedDriver(d)}
              onChatDriver={(d) => startChatWithDriver(d)}
            />
          ))}
        </div>
      </div>

      {/* Driver Detail Modal */}
      {selectedDriver && (
        <DriverDetailModal 
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
          onChatDriver={(d) => startChatWithDriver(d)}
        />
      )}

    </div>
  );
};
