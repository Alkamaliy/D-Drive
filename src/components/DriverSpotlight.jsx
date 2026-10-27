import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Activity, Star } from 'lucide-react';

// ─── 10 Spotlight profiles ─────────────────────────────────────────────────
const SPOTLIGHTS = [
  {
    id: 1,
    name: 'Emeka Okafor',
    title: 'SENIOR EXECUTIVE CHAUFFEUR',
    location: 'Lekki Phase 1, Lagos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Driving Expertise',    score: 95 },
      { label: 'Client Communication', score: 98 },
      { label: 'Trip Punctuality',     score: 92 },
    ],
    appreciation: [
      {
        id: 1, from: 'Sarah J.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        quote: '"Emeka\'s professionalism completely transformed our VIP trip. Incredibly punctual and thoughtful!"',
      },
      {
        id: 2, from: 'Liam K.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        quote: '"A natural leader who brings out the best in every assignment. Highly recommended!"',
      },
      {
        id: 3, from: 'Maria Chen',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        quote: '"Fantastic work on our Lagos-Abuja run. Exceptionally well-planned and executed."',
      },
    ],
  },
  {
    id: 2,
    name: 'Babatunde Adeyemi',
    title: 'VIP PROTOCOL CHAUFFEUR',
    location: 'Maitama, Abuja',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Route Knowledge',     score: 99 },
      { label: 'Safety Record',       score: 100 },
      { label: 'Client Satisfaction', score: 97 },
    ],
    appreciation: [
      {
        id: 1, from: 'Adeola V.',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80',
        quote: '"Babatunde handled our diplomatic escort with class and zero drama. Absolute professional!"',
      },
      {
        id: 2, from: 'James O.',
        avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&auto=format&fit=crop&q=80',
        quote: '"Best Abuja chauffeur I\'ve worked with. Always 10 minutes early. Impeccable."',
      },
      {
        id: 3, from: 'Ngozi F.',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&auto=format&fit=crop&q=80',
        quote: '"Trustworthy, calm, and incredibly skilled. Our whole executive team relies on him."',
      },
    ],
  },
  {
    id: 3,
    name: 'Ibrahim Danladi',
    title: 'FRSC & LASDRI CERTIFIED DRIVER',
    location: 'Victoria Island, Lagos',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Vehicle Handling',     score: 97 },
      { label: 'Discretion & Privacy', score: 96 },
      { label: 'Trip Planning',        score: 93 },
    ],
    appreciation: [
      {
        id: 1, from: 'Chidi M.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        quote: '"Ibrahim drove us through heavy VI traffic without breaking a sweat. Outstanding composure."',
      },
      {
        id: 2, from: 'Funke A.',
        avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&auto=format&fit=crop&q=80',
        quote: '"Our confidential meetings were always handled discreetly. Five stars, every time."',
      },
      {
        id: 3, from: 'David E.',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&auto=format&fit=crop&q=80',
        quote: '"14 years of experience shows in every drive. The smoothest ride in Lagos hands down."',
      },
    ],
  },
  {
    id: 4,
    name: 'Chinonso Eze',
    title: 'CORPORATE FLEET SPECIALIST',
    location: 'Port Harcourt, Rivers State',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Fleet Management',     score: 94 },
      { label: 'Night Driving Safety', score: 91 },
      { label: 'Client Communication', score: 96 },
    ],
    appreciation: [
      {
        id: 1, from: 'Blessing O.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        quote: '"Chinonso managed our oil company convoy flawlessly across PH. Absolute gem!"',
      },
      {
        id: 2, from: 'Tunde B.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        quote: '"Calm under pressure. Night drives from the terminal to GRA — always safe and on time."',
      },
      {
        id: 3, from: 'Grace N.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
        quote: '"He treated my elderly parents with such care and respect on their long journey. Thank you!"',
      },
    ],
  },
  {
    id: 5,
    name: 'Yusuf Abdullahi',
    title: 'INTERSTATE LOGISTICS DRIVER',
    location: 'Kano, Kano State',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Long Distance Driving', score: 98 },
      { label: 'Cargo Safety',          score: 95 },
      { label: 'Punctuality',           score: 97 },
    ],
    appreciation: [
      {
        id: 1, from: 'Amina K.',
        avatar: 'https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=100&auto=format&fit=crop&q=80',
        quote: '"Kano to Lagos, zero incidents, cargo intact. Yusuf is the gold standard for interstate."',
      },
      {
        id: 2, from: 'Peter C.',
        avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&auto=format&fit=crop&q=80',
        quote: '"He delivered our medical supplies on time despite road closures. A true lifesaver!"',
      },
      {
        id: 3, from: 'Hauwa S.',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80',
        quote: '"Reliable, respectful, and always communicates updates. Best long-haul driver in Nigeria!"',
      },
    ],
  },
  {
    id: 6,
    name: 'Adaeze Okonkwo',
    title: 'FEMALE EXECUTIVE CHAUFFEUR',
    location: 'Enugu, Enugu State',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Passenger Comfort',  score: 99 },
      { label: 'Defensive Driving',  score: 96 },
      { label: 'Route Efficiency',   score: 93 },
    ],
    appreciation: [
      {
        id: 1, from: 'Chidinma U.',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&auto=format&fit=crop&q=80',
        quote: '"Finally a female chauffeur I can trust completely. Adaeze is a trailblazer!"',
      },
      {
        id: 2, from: 'Dr. Kalu E.',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80',
        quote: '"My wife specifically requests Adaeze for all her trips. Incredibly professional."',
      },
      {
        id: 3, from: 'Stella M.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        quote: '"She navigated Enugu\'s traffic better than any GPS. Smooth, safe, and super friendly!"',
      },
    ],
  },
  {
    id: 7,
    name: 'Oluwaseun Fashola',
    title: 'AIRPORT TRANSFER SPECIALIST',
    location: 'Ikeja, Lagos',
    avatar: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Airport Logistics', score: 100 },
      { label: 'Flight Tracking',   score: 94 },
      { label: 'Luggage Handling',  score: 97 },
    ],
    appreciation: [
      {
        id: 1, from: 'Daniel R.',
        avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&auto=format&fit=crop&q=80',
        quote: '"Flight delayed 2 hours and Seun waited without complaint. Exceptional dedication!"',
      },
      {
        id: 2, from: 'Ifeoma L.',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&auto=format&fit=crop&q=80',
        quote: '"He tracks my flight and always has a cold bottle of water ready. That\'s real service!"',
      },
      {
        id: 3, from: 'Mr. Benson A.',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&auto=format&fit=crop&q=80',
        quote: '"MMIA to Lekki in under 40 minutes. Seun knows every shortcut and never misses a beat."',
      },
    ],
  },
  {
    id: 8,
    name: 'Musa Garba',
    title: 'DIPLOMATIC ESCORT DRIVER',
    location: 'Asokoro, Abuja',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Security Awareness', score: 98 },
      { label: 'Protocol Knowledge', score: 99 },
      { label: 'Confidentiality',    score: 100 },
    ],
    appreciation: [
      {
        id: 1, from: 'Ambassador T.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        quote: '"Musa is the definition of discretion. Our embassy trusts him with our highest-profile guests."',
      },
      {
        id: 2, from: 'Col. Adamu I.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        quote: '"Impeccable protocol, zero incidents across 3 years of diplomatic assignments. Outstanding."',
      },
      {
        id: 3, from: 'Hajiya B.',
        avatar: 'https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=100&auto=format&fit=crop&q=80',
        quote: '"Cool-headed under pressure, always professional. Musa raises the bar for everyone."',
      },
    ],
  },
  {
    id: 9,
    name: 'Tochukwu Nwosu',
    title: 'LUXURY VEHICLE CHAUFFEUR',
    location: 'Ikoyi, Lagos',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Luxury Car Handling', score: 97 },
      { label: 'Interior Care',       score: 95 },
      { label: 'Client Experience',   score: 99 },
    ],
    appreciation: [
      {
        id: 1, from: 'Chief Eze P.',
        avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&auto=format&fit=crop&q=80',
        quote: '"He treats my Rolls Royce like it\'s his own. Immaculate delivery every single time."',
      },
      {
        id: 2, from: 'Victoria S.',
        avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&auto=format&fit=crop&q=80',
        quote: '"Tochukwu is my go-to for all our high-profile client pickups. Never a complaint."',
      },
      {
        id: 3, from: 'Emeka R.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
        quote: '"The smoothest G-Wagon rides in Lagos. He knows exactly how to handle luxury."',
      },
    ],
  },
  {
    id: 10,
    name: 'Rasheed Oladele',
    title: 'NIGHT SHIFT & EVENT DRIVER',
    location: 'Ibadan, Oyo State',
    avatar: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=300&auto=format&fit=crop&q=80',
    skills: [
      { label: 'Night Safety Record',  score: 96 },
      { label: 'Event Coordination',   score: 94 },
      { label: 'Sobriety & Alertness', score: 100 },
    ],
    appreciation: [
      {
        id: 1, from: 'DJ Lambo K.',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80',
        quote: '"3am pickups after events — Rasheed is always alert, sober, and ready. Absolute legend!"',
      },
      {
        id: 2, from: 'Sola A.',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&auto=format&fit=crop&q=80',
        quote: '"Our wedding convoy of 12 cars — he coordinated everything perfectly. Zero stress!"',
      },
      {
        id: 3, from: 'Pastor Idris F.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        quote: '"Every church event, conference, and late retreat — Rasheed has never let us down."',
      },
    ],
  },
];

// ─── Animated skill bar ────────────────────────────────────────────────────
function SkillBar({ label, score, animate }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
        <span className="flex items-center gap-1.5 text-slate-400">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          {label}
        </span>
        <span className="text-slate-300">{score}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-1000 ease-out"
          style={{ width: animate ? `${score}%` : '0%' }}
        />
      </div>
    </div>
  );
}

// ─── Appreciation card ─────────────────────────────────────────────────────
function AppreciationCard({ from, avatar, quote }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 min-w-0">
      <div className="flex items-center gap-2">
        <img
          src={avatar}
          alt={from}
          className="w-8 h-8 rounded-full object-cover border border-slate-700 flex-shrink-0"
        />
        <span className="text-xs font-bold text-white truncate">From {from}</span>
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed italic">{quote}</p>
    </div>
  );
}

// ─── Dot indicator ─────────────────────────────────────────────────────────
function DotNav({ total, current, onSelect }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Spotlight ${i + 1}`}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'w-5 h-2 bg-amber-400'
              : 'w-2 h-2 bg-slate-600 hover:bg-slate-500'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Main component — always visible, no controls ─────────────────────────
const AUTO_INTERVAL = 6000;

export function DriverSpotlight() {
  const [index,   setIndex]   = useState(0);
  const [animate, setAnimate] = useState(false);
  const [fading,  setFading]  = useState(false);
  const timerRef = useRef(null);

  const total   = SPOTLIGHTS.length;
  const current = SPOTLIGHTS[index];

  // ── slide transition ──────────────────────────────────────────────────────
  const goTo = useCallback((next) => {
    setFading(true);
    setAnimate(false);
    setTimeout(() => {
      setIndex(next);
      setFading(false);
      setTimeout(() => setAnimate(true), 120);
    }, 250);
  }, []);

  const goNext = useCallback(() => goTo((index + 1) % total), [goTo, index, total]);

  // ── auto-advance ──────────────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(goNext, AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [goNext]);

  // ── initial bar animation ─────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden">

        {/* ── Title bar — label only, no buttons ── */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/70">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">
            Driver Spotlight · Appreciation &amp; Feedback
          </span>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Activity size={13} className="text-amber-400 animate-pulse" />
            <span>{index + 1} / {total}</span>
          </div>
        </div>

        {/* ── Content ── */}
        <div
          className="transition-opacity duration-250"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {/* Avatar hero */}
          <div className="relative flex flex-col items-center pt-8 pb-4 bg-gradient-to-b from-slate-800/60 to-transparent px-4">
            {/* decorative diamonds */}
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-16 border border-amber-400 rotate-45"
                  style={{ left: `${i * 18}%`, top: `${(i % 3) * 30}%` }}
                />
              ))}
            </div>

            <div className="relative">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-700 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse" />
              </span>
            </div>

            <h2 className="mt-4 text-xl font-extrabold text-white tracking-tight text-center">
              {current.name}
            </h2>
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mt-0.5">
              {current.title}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">{current.location}</p>

            <div className="mt-4">
              <DotNav total={total} current={index} onSelect={goTo} />
            </div>
          </div>

          {/* Feedback Summary */}
          <div className="mx-4 mt-2 mb-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300 block mb-1">
              Feedback Summary
            </span>
            {current.skills.map((s) => (
              <SkillBar key={s.label} label={s.label} score={s.score} animate={animate} />
            ))}
          </div>

          {/* Appreciation Wall */}
          <div className="mx-4 mb-5 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300 block mb-4">
              Appreciation Wall
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {current.appreciation.map((a) => (
                <AppreciationCard key={a.id} {...a} />
              ))}
            </div>
          </div>

          {/* Auto-progress bar */}
          <div className="mx-4 mb-4 h-0.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              key={index}
              className="h-full bg-amber-500/60 rounded-full"
              style={{ animation: `spotlight-progress ${AUTO_INTERVAL}ms linear forwards` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spotlight-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
