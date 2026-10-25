import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const VerifiedBadge = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 space-x-1',
    md: 'text-xs px-2.5 py-1 space-x-1.5',
    lg: 'text-sm px-3.5 py-1.5 space-x-2'
  }[size];

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16
  }[size];

  return (
    <div className={`inline-flex items-center rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 ${sizeClasses} shadow-sm shadow-amber-500/20`}>
      <ShieldCheck size={iconSize} className="text-amber-400 fill-amber-400/20 shrink-0" />
      {showText && <span className="font-semibold tracking-wide">D-Drive Bonafide Member</span>}
    </div>
  );
};

export const LicenseBadge = ({ verified = true }) => {
  if (!verified) return null;
  return (
    <div className="inline-flex items-center space-x-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
      <CheckCircle2 size={12} className="text-emerald-400" />
      <span>FRSC License Verified</span>
    </div>
  );
};
