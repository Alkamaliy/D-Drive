import React from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge, LicenseBadge } from './VerifiedBadge';
import { MapPin, Star, MessageSquare } from 'lucide-react';

export const DriverCard = ({ driver, onSelectDriver, onChatDriver }) => {
  const { formatMoney } = useApp();

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      
      {/* Top Header: Avatar & Main Info */}
      <div>
        <div className="flex items-start space-x-4">
          <div className="relative shrink-0">
            <img 
              src={driver.avatar} 
              alt={driver.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 group-hover:border-amber-500 transition-colors shadow-md"
            />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
              driver.availability === 'available' ? 'bg-emerald-500 animate-pulse' : driver.availability === 'busy' ? 'bg-amber-500' : 'bg-slate-600'
            }`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-base font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                {driver.name}
              </h3>
              <div className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20 shrink-0">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{driver.rating}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
              <MapPin size={13} className="text-amber-500 shrink-0" />
              <span className="truncate">{driver.location}</span>
            </p>

            <div className="flex items-center space-x-2 mt-2">
              <span className="text-[11px] font-medium text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                {driver.experienceYears} Yrs Exp.
              </span>
              <span className="text-[11px] font-medium text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900">
                {driver.transmission}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Status Badges */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
          {driver.isBonafidePaid ? (
            <VerifiedBadge size="sm" />
          ) : (
            <span className="text-[11px] text-slate-500 font-medium italic">Pending Registration</span>
          )}
          <LicenseBadge verified={driver.licenseVerified} />
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
          "{driver.bio}"
        </p>

        {/* Vehicle Specialties Pills */}
        <div className="mt-3 flex flex-wrap gap-1">
          {driver.vehicleTypes.slice(0, 3).map((vehicle, idx) => (
            <span key={idx} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
              {vehicle}
            </span>
          ))}
          {driver.vehicleTypes.length > 3 && (
            <span className="text-[10px] text-slate-500">+{driver.vehicleTypes.length - 3} more</span>
          )}
        </div>
      </div>

      {/* Pricing & Action Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Daily Chauffeur Rate</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-lg font-extrabold text-amber-400 font-mono">
              {formatMoney(driver.dailyRate)}
            </span>
            <span className="text-[10px] text-slate-400">/day</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSelectDriver(driver)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            Profile
          </button>

          <button
            onClick={() => onChatDriver(driver)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center space-x-1.5 transition shadow-lg shadow-amber-500/20"
          >
            <MessageSquare size={14} />
            <span>Chat Driver</span>
          </button>
        </div>
      </div>

    </div>
  );
};
