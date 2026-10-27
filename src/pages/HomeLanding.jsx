import React from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { 
  Car, 
  ShieldCheck, 
  Search, 
  MapPin, 
  CreditCard, 
  ArrowRight,
  ChevronRight,
  Landmark
} from 'lucide-react';

export const HomeLanding = ({ setActiveTab }) => {
  const { drivers, setCurrentRole, formatMoney, FEES } = useApp();

  return (
    <div className="space-y-20 pb-20">

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 max-w-7xl mx-auto text-center">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-semibold mb-6 shadow-sm">
          <ShieldCheck size={14} />
          <span>Nigeria's #1 Marketplace for Verified Professional Drivers</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          Hire Verified <span className="gold-gradient-text">Professional Drivers</span> Across Nigeria
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Connect directly with background-checked executive chauffeurs across Lagos, Abuja, Port Harcourt, Ibadan, and nationwide. Fast registration, direct live chat, and transparent pricing in Nigerian Naira (₦).
        </p>

        {/* Dual Hero CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => { setCurrentRole('client'); setActiveTab('client-portal'); }}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-8 py-4 rounded-2xl text-sm transition-all duration-300 shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 group"
          >
            <Search size={18} />
            <span>Find Verified Drivers</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => { setCurrentRole('driver'); setActiveTab('driver-portal'); }}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold px-8 py-4 rounded-2xl text-sm transition flex items-center justify-center space-x-2"
          >
            <Car size={18} className="text-amber-400" />
            <span>Become a D-Drive Driver</span>
          </button>
        </div>

        {/* Transparent Naira Fee Banner */}
        <div className="mt-12 glass-panel max-w-4xl mx-auto rounded-3xl p-6 border border-amber-500/30 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">For Drivers in Nigeria</span>
              <span className="text-lg font-mono font-extrabold text-amber-400">{formatMoney(FEES.registrationNGN)}</span>
            </div>
            <h4 className="text-sm font-bold text-white">One-Time Registration + {formatMoney(FEES.monthlyNGN)}/mo</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drivers pay a one-time <strong>{formatMoney(FEES.registrationNGN)}</strong> registration fee for FRSC license verification, earn the D-Drive Bonafide Member badge, and pay <strong>{formatMoney(FEES.monthlyNGN)}/month</strong> to receive active client messages.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">For Clients in Nigeria</span>
              <span className="text-lg font-mono font-extrabold text-emerald-400">{formatMoney(FEES.registrationNGN)}</span>
            </div>
            <h4 className="text-sm font-bold text-white">Platform Access + {formatMoney(FEES.monthlyNGN)}/mo</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clients pay a <strong>{formatMoney(FEES.registrationNGN)}</strong> registration fee to unlock verified driver contacts across Nigeria and <strong>{formatMoney(FEES.monthlyNGN)}/month</strong> to maintain active direct live chat access.
            </p>
          </div>

        </div>

      </section>

      {/* Featured Nigerian Drivers */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin size={16} />
              <span>Chauffeurs Across Nigeria</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Verified Drivers Ready in Nigeria</h2>
          </div>

          <button
            onClick={() => { setCurrentRole('client'); setActiveTab('client-portal'); }}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
          >
            <span>Explore All Nigerian Drivers ({drivers.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {drivers.slice(0, 3).map((driver) => (
            <div key={driver.id} className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-amber-500/40 transition">
              <div className="flex items-center space-x-4">
                <img src={driver.avatar} alt={driver.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700" />
                <div>
                  <h3 className="font-bold text-white text-base">{driver.name}</h3>
                  <p className="text-xs text-slate-400">{driver.location}</p>
                  <div className="mt-1">
                    <VerifiedBadge size="sm" />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-xs">
                <span className="text-slate-400">Experience: <strong className="text-white">{driver.experienceYears} Years</strong></span>
                <span className="text-slate-400">Rate: <strong className="text-amber-400 font-mono">{formatMoney(driver.dailyRate)}/day</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Breakdown */}
      <section className="max-w-7xl mx-auto px-4 bg-slate-900/60 p-8 sm:p-12 rounded-3xl border border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white">How D-Drive Nigeria Works</h2>
          <p className="text-slate-400 text-sm mt-2">Connecting verified Nigerian chauffeurs and executive clients seamlessly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 font-bold text-lg flex items-center justify-center mx-auto border border-amber-500/30">
              1
            </div>
            <h3 className="text-base font-bold text-white">Create Account</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drivers upload valid FRSC driver's licenses and credentials. Clients sign up to browse executive chauffeurs in Lagos, Abuja, Port Harcourt, and beyond.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 font-bold text-lg flex items-center justify-center mx-auto border border-amber-500/30">
              2
            </div>
            <h3 className="text-base font-bold text-white">Direct Bank Transfer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete the <strong>{formatMoney(FEES.registrationNGN)}</strong> registration fee and <strong>{formatMoney(FEES.monthlyNGN)}/month</strong> membership via direct transfer to our official <strong>WEMA BANK</strong> platform account.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 font-bold text-lg flex items-center justify-center mx-auto border border-amber-500/30">
              3
            </div>
            <h3 className="text-base font-bold text-white">Direct Live Chat & Hire</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clients chat verified drivers directly, discuss itinerary and daily rates in Naira (₦), and confirm executive chauffeuring trips immediately.
            </p>
          </div>

        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]">
          <div className="flex items-center gap-3 mb-5">
            <Landmark className="text-amber-400" size={20} />
            <h3 className="text-xl font-extrabold text-white">Terms & Conditions</h3>
          </div>

          <p className="text-sm leading-7 text-slate-300">
            D-Drive is a trusted platform created to connect users in a secure, professional, and lawful environment. By using this platform, you agree to comply with all rules, regulations, and applicable laws in Nigeria.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            We maintain a strict standard of conduct and will not tolerate fraud, misconduct, abuse, harassment, unsafe behavior, or any violation of our platform policies. Any user found in breach of these terms may face warnings, account suspension, permanent removal from the platform, and possible referral to legal or security authorities where necessary.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            Users must provide accurate information, act with integrity, and respect the rights and dignity of others. We reserve the right to investigate complaints, review activities, and take appropriate action to protect the safety, transparency, and credibility of the platform.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            This platform is committed to professionalism, accountability, and compliance, and we work with legal practitioners and relevant security authorities to uphold the rule of law and protect all users across Nigeria.
          </p>

          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5">
            <p className="text-sm font-semibold text-amber-300">Report any form of fraud, misconduct, abuse, unsafe behavior, harassment, or violation of platform rules.</p>
            <p className="mt-3 text-sm text-slate-300">Contact the management:</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              <li><span className="font-medium text-white">WhatsApp:</span> 09054896930</li>
              <li><span className="font-medium text-white">Call:</span> 09022940735</li>
              <li><span className="font-medium text-white">Email:</span> kamaldeenhussein123@gmail.com</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};
