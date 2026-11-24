import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Car,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Crown,
  ArrowRight,
  AlertCircle,
  Phone,
  MapPin,
  CheckCircle2,
  Landmark,
  PhoneCall,
  Copy,
  Check,
  Loader2,
  CheckCircle,
  X,
  Sparkles,
  CreditCard,
  Star
} from 'lucide-react';

/**
 * RegistrationGate — Full-screen overlay that blocks platform access
 * until a user has:
 *   1. Signed up or logged in
 *   2. Completed the one-time registration fee payment
 *
 * Only the admin bypasses the payment requirement.
 */
export const RegistrationGate = () => {
  const {
    currentUser,
    loginUser,
    registerUser,
    formatMoney,
    FEES,
    ownerBankDetails,
    driverUser,
    clientUser,
    handlePaymentSuccess
  } = useApp();

  // ───── Step Management ─────
  // step: 'auth' | 'payment' | null (null = fully registered, should not render)
  const getStep = () => {
    if (!currentUser) return 'auth';
    if (currentUser.role === 'admin') return null; // admin bypasses payment gate

    // Check if payment is done
    if (currentUser.role === 'driver') {
      if (driverUser?.isBonafidePaid) return null;
      return 'payment';
    }
    if (currentUser.role === 'client') {
      if (clientUser?.isAccessPaid) return null;
      return 'payment';
    }

    return 'payment';
  };

  const step = getStep();

  // ───── Auth State ─────
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState('client');      // 'client' | 'driver'

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup fields
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Lagos');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ───── Payment State ─────
  const [payMethod, setPayMethod] = useState('transfer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');

  // Don't render if fully registered
  if (!step) return null;

  // ───── Auth Handlers ─────
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      await loginUser(loginEmail, loginPassword);
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
        country: 'Nigeria',
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
      // After registration, the step will automatically change to 'payment'
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMsg('');
    try {
      loginUser(email, pass);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // ───── Payment Handlers ─────
  const handleCopyAccount = () => {
    const accNum = ownerBankDetails.accountNumber || '0251589130';
    navigator.clipboard?.writeText(accNum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmTransfer = (e) => {
    e?.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const payerType = currentUser?.role === 'driver' ? 'driver' : 'client';
      const userObj = payerType === 'driver' ? driverUser : clientUser;

      setTimeout(() => {
        setIsSuccess(false);
        handlePaymentSuccess(payerType, 'registration', {
          reference: `WEMA-TRF-${Math.floor(Math.random() * 900000 + 100000)}`,
          senderName: senderName || userObj?.name
        });
      }, 1500);
    }, 1800);
  };

  const baseAmountNGN = FEES.registrationNGN;
  const formattedDisplay = formatMoney(baseAmountNGN);

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#070a14] text-slate-100 overflow-y-auto">
      
      {/* ── Top Brand Bar ── */}
      <div className="w-full bg-slate-950/80 border-b border-slate-800/80 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Car className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">D-DRIVE</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-wider">NG</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">Nigeria Chauffeurs</p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold border ${
              step === 'auth' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}>
              {step === 'auth' ? '1' : <CheckCircle2 size={16} />}
            </div>
            <div className="w-6 h-0.5 bg-slate-800 rounded" />
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold border ${
              step === 'payment' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>
              2
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-md">

          {/* ═══════ STEP 1: AUTH (Login / Signup) ═══════ */}
          {step === 'auth' && (
            <div className="bg-slate-900 border border-slate-700/70 rounded-3xl shadow-2xl overflow-hidden">
              
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">Welcome to D-Drive Nigeria</h3>
                    <p className="text-[11px] text-slate-400">Step 1 of 2 — Create or access your account</p>
                  </div>
                </div>
              </div>

              {/* Tab Switcher */}
              <div className="grid grid-cols-2 p-1.5 bg-slate-950 border-b border-slate-800 text-xs font-bold">
                <button
                  onClick={() => { setAuthTab('login'); setErrorMsg(''); }}
                  className={`py-2 rounded-xl transition ${
                    authTab === 'login'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => { setAuthTab('signup'); setErrorMsg(''); }}
                  className={`py-2 rounded-xl transition ${
                    authTab === 'signup'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create New Account
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                
                {/* Error */}
                {errorMsg && (
                  <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs flex items-center space-x-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Info Banner */}
                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-xs text-amber-300/90 flex items-start space-x-2">
                  <Lock size={14} className="shrink-0 mt-0.5" />
                  <span>Registration and payment of <strong>{formattedDisplay}</strong> registration fee are required before accessing the platform.</span>
                </div>

                {authTab === 'login' ? (
                  /* ── LOGIN FORM ── */
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

                    {/* Demo Shortcuts */}
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
                  /* ── SIGNUP FORM ── */
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    
                    {/* Role Selector */}
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
                          placeholder="e.g. Lagos, Abuja"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Driver-specific fields */}
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
          )}

          {/* ═══════ STEP 2: PAYMENT ═══════ */}
          {step === 'payment' && (
            <div className="bg-slate-900 border border-slate-700/70 rounded-3xl shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg shadow-sm">
                    ₦
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                      Registration Fee Payment
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-bold">
                        Step 2 of 2
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">{currentUser?.email}</p>
                  </div>
                </div>
              </div>

              {/* Welcome Banner */}
              <div className="p-4 bg-emerald-500/5 border-b border-emerald-500/20 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-300">Account Created Successfully!</p>
                  <p className="text-[11px] text-slate-400">Welcome, <strong className="text-white">{currentUser?.name}</strong>. Complete payment to access the platform.</p>
                </div>
              </div>

              {/* Amount Summary */}
              <div className="bg-amber-500/10 border-b border-amber-500/20 p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">One-Time Registration Fee</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentUser?.role === 'driver' ? 'Bonafide Driver Membership (Nigeria)' : 'Client Marketplace Access Unlock'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-amber-400 font-mono tracking-tight">{formattedDisplay}</span>
                  <span className="text-[10px] text-slate-400 block font-semibold">NGN (One-time)</span>
                </div>
              </div>

              {isSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                    <CheckCircle size={36} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Payment Confirmed!</h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                      {currentUser?.role === 'driver'
                        ? 'Congratulations! You are now a Bonafide D-Drive Member. Welcome to the platform!'
                        : 'Platform Access Unlocked! You can now search & chat verified drivers across Nigeria.'}
                    </p>
                  </div>
                  <div className="inline-flex items-center space-x-2 text-xs text-emerald-400 font-mono bg-emerald-950/70 px-3.5 py-2 rounded-xl border border-emerald-800">
                    <ShieldCheck size={14} />
                    <span>Paid to: {ownerBankDetails.accountName} ({ownerBankDetails.bankName})</span>
                  </div>
                </div>
              ) : isProcessing ? (
                <div className="p-12 text-center space-y-4">
                  <Loader2 size={40} className="text-amber-400 animate-spin mx-auto" />
                  <h4 className="text-base font-bold text-white">Confirming {formattedDisplay} Bank Transfer...</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Verifying payment with {ownerBankDetails.bankName}. Please wait a moment.
                  </p>
                </div>
              ) : (
                <div className="p-5 space-y-5">
                  
                  {/* Payment Method Tabs */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPayMethod('transfer')}
                      className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 transition border ${
                        payMethod === 'transfer'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Landmark size={16} />
                      <span>Bank Transfer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayMethod('ussd')}
                      className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 transition border ${
                        payMethod === 'ussd'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <PhoneCall size={16} />
                      <span>USSD Code</span>
                    </button>
                  </div>

                  {/* Bank Transfer Form */}
                  {payMethod === 'transfer' && (
                    <form onSubmit={handleConfirmTransfer} className="space-y-4">
                      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-400">Official Payment Bank Account:</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                            Nigeria Only
                          </span>
                        </div>

                        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700/80 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Bank Name:</span>
                            <strong className="text-white font-bold">{ownerBankDetails.bankName}</strong>
                          </div>
                          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
                            <span className="text-slate-400">Account Number:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-extrabold text-amber-400 font-mono tracking-wider">
                                {ownerBankDetails.accountNumber}
                              </span>
                              <button
                                type="button"
                                onClick={handleCopyAccount}
                                className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition"
                                title="Copy account number"
                              >
                                {copied ? (
                                  <>
                                    <Check size={11} className="text-emerald-400" />
                                    <span className="text-emerald-400">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
                            <span className="text-slate-400">Account Name:</span>
                            <strong className="text-slate-200 font-semibold">{ownerBankDetails.accountName}</strong>
                          </div>
                          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
                            <span className="text-slate-400">Amount to Send:</span>
                            <strong className="text-amber-400 font-mono font-bold">{formattedDisplay}</strong>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Sender Account / Depositor Name <span className="text-slate-500">(for instant matching)</span>
                        </label>
                        <input
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="e.g. Sandra Adeleke / Emeka Okafor"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 text-xs"
                      >
                        <ShieldCheck size={16} />
                        <span>I Have Transferred {formattedDisplay}</span>
                        <ArrowRight size={16} />
                      </button>
                    </form>
                  )}

                  {/* USSD View */}
                  {payMethod === 'ussd' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-center">
                        <p className="text-xs text-slate-400">
                          Dial this USSD code on your mobile phone to transfer <strong className="text-amber-400">{formattedDisplay}</strong> directly:
                        </p>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="text-lg font-mono font-extrabold text-amber-400 tracking-wider">
                            {ownerBankDetails.ussdCode}
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            Transfer to {ownerBankDetails.bankName} ({ownerBankDetails.accountNumber})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Or dial your bank's USSD transfer code and send to <strong>{ownerBankDetails.accountNumber}</strong> ({ownerBankDetails.bankName}).
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleConfirmTransfer}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition text-xs flex items-center justify-center space-x-2"
                      >
                        <CheckCircle size={15} />
                        <span>I Have Completed USSD Payment</span>
                      </button>
                    </div>
                  )}

                  {/* Secure Footer */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Lock size={12} className="text-emerald-400" />
                      <span>Paid directly to: {ownerBankDetails.accountName}</span>
                    </div>
                    <span className="font-semibold text-slate-300">WEMA BANK</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Trust Badge */}
          <div className="mt-6 text-center text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>Verified FRSC-Licensed Drivers Only</span>
            </div>
            <p>© {new Date().getFullYear()} D-Drive Nigeria. All rights reserved.</p>
          </div>

        </div>
      </div>
    </div>
  );
};
