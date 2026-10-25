import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { licensingAuthorities, globalCountries } from '../data/mockData';
import { VerifiedBadge, LicenseBadge } from '../components/VerifiedBadge';
import { 
  Car, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Star, 
  UserCheck, 
  FileText, 
  DollarSign, 
  AlertCircle,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Globe
} from 'lucide-react';

export const DriverPortal = () => {
  const { 
    driverUser, 
    setDriverUser, 
    openPaymentModal, 
    registerNewDriver,
    chats,
    formatMoney,
    FEES
  } = useApp();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'register'
  
  // Registration Form State with Document Uploads
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    location: 'Lekki Phase 1',
    state: 'Lagos',
    licenseNumber: 'FRSC-DRV-88219-LA',
    licenseAuthority: 'FRSC (Federal Road Safety Corps - Nigeria)',
    licenseExpiry: '2028-12-31',
    experienceYears: '7',
    transmission: 'Both (Manual & Automatic)',
    dailyRate: '25000',
    hourlyRate: '3500',
    vehicleTypes: 'Executive SUV, Luxury Sedan, Toyota Prado',
    bio: 'Experienced professional chauffeur specializing in VIP client movements and executive charters.',
    licenseFront: null,
    licenseBack: null,
    identityDoc: null,
    documentsNotes: ''
  });

  // Handle image file selection with FileReader Base64 preview
  const handleFileUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [field]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: null
    }));
  };

  const handleToggleAvailability = (newStatus) => {
    setDriverUser(prev => ({ ...prev, availability: newStatus }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    registerNewDriver(formData);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Car size={16} />
            <span>D-Drive Nigeria Driver Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Professional Driver Partner Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Upload verified driver credentials, manage your schedule, and connect with executive clients across Nigeria.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'dashboard'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
            }`}
          >
            Driver Dashboard
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'register'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
            }`}
          >
            Register & Upload Documents
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' ? (
        <div className="space-y-8">

          {/* Registration Fee Payment Callout (If Unpaid) */}
          {!driverUser.isBonafidePaid && (
            <div className="p-6 bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse-slow">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl shrink-0 border border-amber-500/30">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-amber-300">Action Required: Pay {formatMoney(FEES.registrationNGN)} Registration Fee</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    To become an official <strong>Bonafide D-Drive Member</strong>, have your license documents reviewed, and receive direct client messages, complete your one-time registration fee.
                  </p>
                </div>
              </div>

              <button
                onClick={() => openPaymentModal('driver', 'registration')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 transition shadow-xl shadow-amber-500/20 shrink-0"
              >
                <span>Pay {formatMoney(FEES.registrationNGN)} Fee Now</span>
                <CreditCard size={16} />
              </button>
            </div>
          )}

          {/* Document Verification Status Notice Banner */}
          <div className="p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs bg-slate-950">
            <div className="flex items-center space-x-3">
              {driverUser.licenseVerified ? (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <CheckCircle2 size={18} />
                </div>
              ) : driverUser.verificationStatus === 'rejected' ? (
                <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
                  <XCircle size={18} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Clock size={18} />
                </div>
              )}

              <div>
                <span className="font-bold text-white block">
                  {driverUser.licenseVerified
                    ? 'Official Driving License & Credentials Verified'
                    : driverUser.verificationStatus === 'rejected'
                    ? 'Document Verification Rejected'
                    : 'Driving License Documents Under Admin Review'}
                </span>
                <span className="text-slate-400 text-[11px]">
                  {driverUser.licenseVerified
                    ? `Verified by D-Drive Admin under ${driverUser.licenseAuthority || 'Official Authority'}`
                    : driverUser.verificationStatus === 'rejected'
                    ? (driverUser.rejectionReason || 'Please upload a clearer image of your driver license and ID.')
                    : 'The platform administrator is reviewing your uploaded license scans.'}
                </span>
              </div>
            </div>

            {!driverUser.licenseVerified && (
              <button
                onClick={() => setActiveTab('register')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-semibold text-[11px] border border-slate-700 shrink-0"
              >
                Update Documents
              </button>
            )}
          </div>

          {/* Profile Overview & Availability Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Left Card: Driver Avatar & Info */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
              <div className="text-center">
                <img 
                  src={driverUser.avatar} 
                  alt={driverUser.name} 
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-800 mx-auto shadow-xl"
                />
                <h3 className="text-xl font-bold text-white mt-3">{driverUser.name}</h3>
                <p className="text-xs text-slate-400">{driverUser.location}, Nigeria</p>

                <div className="mt-3 flex justify-center gap-1.5 flex-wrap">
                  {driverUser.isBonafidePaid ? (
                    <VerifiedBadge size="sm" />
                  ) : (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
                      Unpaid Member
                    </span>
                  )}
                  <LicenseBadge verified={driverUser.licenseVerified} />
                </div>
              </div>

              {/* Status Switcher Controls */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Set Availability Status</span>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-semibold">
                  <button
                    onClick={() => handleToggleAvailability('available')}
                    className={`py-2 rounded-xl transition ${
                      driverUser.availability === 'available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'
                    }`}
                  >
                    Available
                  </button>
                  <button
                    onClick={() => handleToggleAvailability('busy')}
                    className={`py-2 rounded-xl transition ${
                      driverUser.availability === 'busy' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'
                    }`}
                  >
                    Busy
                  </button>
                  <button
                    onClick={() => handleToggleAvailability('offline')}
                    className={`py-2 rounded-xl transition ${
                      driverUser.availability === 'offline' ? 'bg-slate-700 text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    Offline
                  </button>
                </div>
              </div>

              {/* License & Document Summary */}
              <div className="pt-4 border-t border-slate-800 text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Authority:</span>
                  <span className="text-white text-right font-medium max-w-[160px] truncate">{driverUser.licenseAuthority || 'Official DMV / FRSC'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>License No:</span>
                  <span className="font-mono text-white">{driverUser.licenseNumber}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Phone:</span>
                  <span className="font-mono text-white">{driverUser.phone}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Experience:</span>
                  <span className="text-white">{driverUser.experienceYears} Years</span>
                </div>
              </div>
            </div>

            {/* Middle & Right: Pricing & Incoming Client Requests */}
            <div className="md:col-span-2 space-y-6">

              {/* Rates Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-medium">Daily Chauffeur Rate</span>
                  <div className="text-xl font-extrabold text-amber-400 font-mono mt-1">{formatMoney(driverUser.dailyRate)}</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-medium">Hourly Rate</span>
                  <div className="text-xl font-extrabold text-white font-mono mt-1">{formatMoney(driverUser.hourlyRate)}</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-400 uppercase font-medium">Rating Score</span>
                  <div className="text-xl font-extrabold text-amber-400 mt-1 flex items-center gap-1">
                    <Star size={18} className="fill-amber-400 text-amber-400" />
                    <span>{driverUser.rating}</span>
                  </div>
                </div>
              </div>

              {/* Recent Client Messages list */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center justify-between">
                  <span>Client Messages & Hire Requests</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
                    {chats.length} Threads
                  </span>
                </h3>

                <div className="space-y-3">
                  {chats.map(chat => (
                    <div key={chat.id} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-slate-700 transition">
                      <div className="flex items-center space-x-3">
                        <img src={chat.clientAvatar} alt={chat.clientName} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                        <div>
                          <h4 className="text-sm font-bold text-white">{chat.clientName}</h4>
                          <p className="text-xs text-slate-400 truncate max-w-xs">{chat.lastMessage}</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">{chat.lastTime}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* Driver Registration Form View with Document Uploads */
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <FileText size={24} className="text-amber-400" />
              <span>Driver Registration & License Document Upload</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Join D-Drive Nigeria as a professional chauffeur. Upload your FRSC driver's license scans and ID for admin verification.
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">1. Personal & Contact Information</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name (as on license)</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Babatunde Adeyemi or Chukwudi Nnamdi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Country</label>
                  <input 
                    type="text" 
                    readOnly
                    value="Nigeria"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-amber-400 font-bold outline-none opacity-90 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City / Region in Nigeria</label>
                  <input 
                    type="text" 
                    required
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Lagos, Abuja, Port Harcourt, Ibadan"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nigerian Phone Number</label>
                  <input 
                    type="text" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +234 803 123 4567"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="driver@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* License & Credentials Section */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">2. Driver License Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Licensing Authority</label>
                  <select
                    value={formData.licenseAuthority}
                    onChange={e => setFormData({ ...formData, licenseAuthority: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-amber-400 font-semibold focus:border-amber-500 outline-none"
                  >
                    {licensingAuthorities.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">License Number</label>
                  <input 
                    type="text" 
                    required
                    value={formData.licenseNumber}
                    onChange={e => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="e.g. FRSC-DRV-XXXXX or NY-DMV-XXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">License Expiry Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.licenseExpiry}
                    onChange={e => setFormData({ ...formData, licenseExpiry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Driving Experience</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={formData.experienceYears}
                    onChange={e => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Document Uploads Zone */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">3. Document Scans (For Admin Verification)</h3>
                <span className="text-[10px] text-slate-400">JPG, PNG, or WebP</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* License Front Upload */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-3">
                  <span className="text-xs font-semibold text-slate-300 block">Driver License (Front)</span>
                  
                  {formData.licenseFront ? (
                    <div className="relative group">
                      <img 
                        src={formData.licenseFront} 
                        alt="License Front" 
                        className="w-full h-28 object-cover rounded-xl border border-amber-500/40"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('licenseFront')}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-lg opacity-90 hover:opacity-100 transition shadow"
                        title="Remove image"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-800 hover:border-amber-500/60 rounded-xl cursor-pointer p-3 transition bg-slate-900/40 hover:bg-slate-900">
                      <Upload size={22} className="text-amber-400 mb-1" />
                      <span className="text-[11px] text-slate-300 font-medium">Upload Front Scan</span>
                      <span className="text-[9px] text-slate-500">Tap to select photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={e => handleFileUpload(e, 'licenseFront')} 
                      />
                    </label>
                  )}
                </div>

                {/* License Back Upload */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-3">
                  <span className="text-xs font-semibold text-slate-300 block">Driver License (Back)</span>
                  
                  {formData.licenseBack ? (
                    <div className="relative group">
                      <img 
                        src={formData.licenseBack} 
                        alt="License Back" 
                        className="w-full h-28 object-cover rounded-xl border border-amber-500/40"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('licenseBack')}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-lg opacity-90 hover:opacity-100 transition shadow"
                        title="Remove image"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-800 hover:border-amber-500/60 rounded-xl cursor-pointer p-3 transition bg-slate-900/40 hover:bg-slate-900">
                      <Upload size={22} className="text-amber-400 mb-1" />
                      <span className="text-[11px] text-slate-300 font-medium">Upload Back Scan</span>
                      <span className="text-[9px] text-slate-500">Tap to select photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={e => handleFileUpload(e, 'licenseBack')} 
                      />
                    </label>
                  )}
                </div>

                {/* Identity / Passport Upload */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-3">
                  <span className="text-xs font-semibold text-slate-300 block">Passport / National ID</span>
                  
                  {formData.identityDoc ? (
                    <div className="relative group">
                      <img 
                        src={formData.identityDoc} 
                        alt="Identity Document" 
                        className="w-full h-28 object-cover rounded-xl border border-amber-500/40"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('identityDoc')}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-lg opacity-90 hover:opacity-100 transition shadow"
                        title="Remove image"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-800 hover:border-amber-500/60 rounded-xl cursor-pointer p-3 transition bg-slate-900/40 hover:bg-slate-900">
                      <Upload size={22} className="text-amber-400 mb-1" />
                      <span className="text-[11px] text-slate-300 font-medium">Upload ID / Passport</span>
                      <span className="text-[9px] text-slate-500">Tap to select photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={e => handleFileUpload(e, 'identityDoc')} 
                      />
                    </label>
                  )}
                </div>

              </div>
            </div>

            {/* Rates & Vehicle Specs */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">4. Rates & Vehicle Expertise</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Transmission Capability</label>
                  <select 
                    value={formData.transmission}
                    onChange={e => setFormData({ ...formData, transmission: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-amber-400 font-semibold focus:border-amber-500 outline-none"
                  >
                    <option value="Both (Manual & Automatic)">Both (Manual & Automatic)</option>
                    <option value="Automatic">Automatic Only</option>
                    <option value="Manual">Manual Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Daily Chauffeur Rate (in Base NGN)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.dailyRate}
                    onChange={e => setFormData({ ...formData, dailyRate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:border-amber-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Daily chauffeur hiring rate in Nigerian Naira (₦)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Vehicle Expertise (comma-separated)</label>
                <input 
                  type="text" 
                  value={formData.vehicleTypes}
                  onChange={e => setFormData({ ...formData, vehicleTypes: e.target.value })}
                  placeholder="e.g. Range Rover, Mercedes S-Class, Cadillac Escalade"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Driver Bio / VIP Experience</label>
                <textarea 
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center space-x-2"
            >
              <span>Submit Profile & Proceed to Registration ({formatMoney(FEES.registrationNGN)})</span>
              <CreditCard size={18} />
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
