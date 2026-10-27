import React from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge, LicenseBadge } from './VerifiedBadge';
import { MapPin, Star, MessageSquare } from 'lucide-react';

export const DriverCard = ({ driver, onSelectDriver, onChatDriver }) => {
  const { formatMoney } = useApp();

  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-slate-800 bg-slate-950/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.38)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_24px_60px_rgba(251,191,36,0.15)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      <div className="flex items-start justify-between gap-3">
        <div className="relative shrink-0">
          <img
            src={driver.avatar}
            alt={driver.name}
            className="h-16 w-16 rounded-2xl border border-slate-700 object-cover shadow-md"
          />
          <span
            className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-950 ${
              driver.availability === 'available'
                ? 'bg-emerald-500 animate-pulse'
                : driver.availability === 'busy'
                  ? 'bg-amber-500'
                  : 'bg-slate-600'
            }`}
          />
        </div>

        <div className="flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-300">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span>{driver.rating}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-amber-300">
            {driver.name}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <MapPin size={12} className="text-amber-400" />
            <span>{driver.location}</span>
          </p>
        </div>

        {driver.isBonafidePaid ? (
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
            Verified
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[10px] font-medium text-slate-300">
          {driver.experienceYears} yrs exp
        </span>
        <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium text-amber-300">
          {driver.transmission}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        <VerifiedBadge size="sm" />
        <LicenseBadge verified={driver.licenseVerified} />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300 line-clamp-3">
        “{driver.bio}”
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {driver.vehicleTypes.slice(0, 3).map((vehicle, idx) => (
          <span
            key={idx}
            className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[10px] font-medium text-slate-300"
          >
            {vehicle}
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">From</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-amber-400 font-mono">{formatMoney(driver.dailyRate)}</span>
            <span className="text-[10px] text-slate-400">/day</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={() => onSelectDriver(driver)}
          className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
        >
          Profile
        </button>

        <button
          onClick={() => onChatDriver(driver)}
          className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-3 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-300"
        >
          <span className="inline-flex items-center justify-center gap-1.5">
            <MessageSquare size={14} />
            Chat
          </span>
        </button>
      </div>
    </div>
  );
};
