import React from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge, LicenseBadge } from './VerifiedBadge';
import { X, MapPin, Star, ShieldCheck, MessageSquare, CheckCircle2 } from 'lucide-react';

export const DriverDetailModal = ({ driver, onClose, onChatDriver }) => {
  const { formatMoney, FEES } = useApp();

  if (!driver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="relative h-32 bg-gradient-to-r from-amber-900/40 via-slate-800 to-slate-900 p-6 flex items-start justify-between">
          <div className="relative z-10 flex items-center space-x-2">
            <VerifiedBadge size="md" />
          </div>

          <button 
            onClick={onClose}
            className="relative z-10 p-2 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 rounded-full transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 -mt-12 relative z-20 pb-4 border-b border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-end space-x-4">
            <img 
              src={driver.avatar} 
              alt={driver.name} 
              className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-900 shadow-xl"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-white">{driver.name}</h2>
                <div className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/30">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span>{driver.rating}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                <MapPin size={14} className="text-amber-500" />
                <span>{driver.location}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => { onClose(); onChatDriver(driver); }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-amber-500/20"
          >
            <MessageSquare size={16} />
            <span>Chat Driver Directly</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-medium block">Experience</span>
              <span className="text-sm font-bold text-amber-400">{driver.experienceYears} Years</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-medium block">Transmission</span>
              <span className="text-sm font-bold text-white">{driver.transmission}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-medium block">Daily Rate</span>
              <span className="text-sm font-bold text-amber-400 font-mono">{formatMoney(driver.dailyRate)}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-medium block">Hourly Rate</span>
              <span className="text-sm font-bold text-white font-mono">{formatMoney(driver.hourlyRate)}</span>
            </div>
          </div>

          {/* Verification & License Details */}
          <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck size={16} />
              <span>D-Drive Credentials & Membership</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>License ({driver.licenseAuthority || 'Official'}): <strong className="text-white font-mono">{driver.licenseNumber}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>License Expiry: <strong className="text-amber-400 font-mono">{driver.licenseExpiry || '2028-12-31'}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Registration Status: <strong className="text-amber-400">{driver.isBonafidePaid ? 'Bonafide Paid' : 'Pending Fee'}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Phone Verified: <strong className="text-white font-mono">{driver.phone}</strong></span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Driver Biography</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {driver.bio}
            </p>
          </div>

          {/* Vehicle Specialties */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Vehicle Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {driver.vehicleTypes.map((v, i) => (
                <span key={i} className="text-xs bg-slate-800 text-amber-300 px-3 py-1 rounded-xl border border-slate-700 font-medium">
                  {v}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
