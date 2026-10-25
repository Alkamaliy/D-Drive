import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Car, 
  Crown, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Phone, 
  MapPin, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const AuthModal = () => {
  const { 
    authModal, 
    closeAuthModal, 
    loginUser, 
    registerUser,
    formatMoney,
    FEES
  } = useApp();

  const [activeTab, setActiveTab] = useState(authModal.initialTab || 'login'); // 'login' | 'signup'
  const [role, setRole] = useState(authModal.initialRole || 'client'); // 'client' | 'driver'

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign up form
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [location, setLocation] = useState('Lagos');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!authModal.isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      await loginUser(loginEmail, loginPassword);
      closeAuthModal();
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const payload = {
        name,
        email: signupEmail,
        password: signupPassword,
        phone,
        country,
        location,
        role
      };

      if (role === 'driver') {
        payload.licenseNumber = licenseNumber || 'FRSC-DRV-PENDING';
        payload.experienceYears = parseInt(experienceYears) || 5;
        payload.licenseAuthority = 'FRSC (Federal Road Safety Corps - Nigeria)';
        payload.licenseVerified = false;
        payload.verificationStatus = 'pending';
        payload.isBonafidePaid = false;
        payload.isMonthlyPaid = false;
      } else {
        payload.isAccessPaid = false;
        payload.isMonthlyPaid = false;
      }

      await registerUser(payload);
      closeAuthModal();
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick 1-Click Demo Login
  const handleQuickDemo = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMsg('');
    try {
      loginUser(email, pass);
      closeAuthModal();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/70 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Car size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">D-Drive Nigeria</h3>
              <p className="text-[11px] text-slate-400">Secure Account Authentication</p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-950 border-b border-slate-800 text-xs font-bold">
          <button
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition ${
              activeTab === 'login'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition ${
              activeTab === 'signup'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs flex items-center space-x-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="e.g. kamaldeenhussein123@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold py-3 rounded-xl transition text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
              >
                <span>{isLoading ? 'Verifying...' : 'Log In to Account'}</span>
                <ArrowRight size={15} />
              </button>

              {/* 1-Click Demo Login Shortcuts */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block text-center">
                  ⚡ 1-Click Fast Demo Login:
                </span>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('kamaldeenhussein123@gmail.com', 'Adekunle1234.')}
                    className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl text-center transition"
                  >
                    <Crown size={15} className="text-amber-400 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-white block">Owner/Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('driver@d-drive.global', 'driver123')}
                    className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl text-center transition"
                  >
                    <Car size={15} className="text-emerald-400 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-white block">Driver</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('client@d-drive.global', 'client123')}
                    className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl text-center transition"
                  >
                    <User size={15} className="text-blue-400 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-white block">Client</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              
              {/* Account Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">I am joining as:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-center space-x-1.5 ${
                      role === 'client'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <User size={14} />
                    <span>Client (Need a Driver)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('driver')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-center space-x-1.5 ${
                      role === 'driver'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Car size={14} />
                    <span>Professional Driver</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Sandra Adeleke or John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +234 803 123 4567"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City / Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Lagos, Abuja, Port Harcourt"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Extra fields if Driver */}
              {role === 'driver' && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    FRSC Driver License Credentials:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">FRSC License Number</label>
                      <input
                        type="text"
                        required
                        value={licenseNumber}
                        onChange={e => setLicenseNumber(e.target.value)}
                        placeholder="FRSC-DRV-xxxxx-xx"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Experience</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={experienceYears}
                        onChange={e => setExperienceYears(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3 rounded-xl transition text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
              >
                <span>{isLoading ? 'Registering...' : `Create ${role === 'driver' ? 'Driver' : 'Client'} Account`}</span>
                <CheckCircle2 size={15} />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
