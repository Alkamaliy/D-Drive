import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { 
  Crown, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Building, 
  Key, 
  Save, 
  Check, 
  Eye, 
  FileText, 
  XCircle, 
  X, 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Calendar,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    adminMetrics, 
    transactions, 
    drivers, 
    formatMoney, 
    ownerBankDetails, 
    setOwnerBankDetails,
    approveDriverLicense,
    rejectDriverLicense
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'payment-settings'
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Document Inspection Modal State
  const [inspectingDriver, setInspectingDriver] = useState(null);
  const [activeDocTab, setActiveDocTab] = useState('licenseFront'); // 'licenseFront' | 'licenseBack' | 'identityDoc'
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  // Local form state for owner bank details
  const [bankForm, setBankForm] = useState(ownerBankDetails);

  const handleOpenInspect = (driver) => {
    setInspectingDriver(driver);
    setActiveDocTab('licenseFront');
    setShowRejectForm(false);
    setRejectionReason('');
  };

  const handleApprove = (driverId) => {
    approveDriverLicense(driverId);
    setInspectingDriver(null);
  };

  const handleReject = (driverId) => {
    const reason = rejectionReason.trim() || 'Document image is unclear, blurry, or expired. Please upload a clear official copy.';
    rejectDriverLicense(driverId, reason);
    setInspectingDriver(null);
  };

  const handleSaveBankDetails = (e) => {
    e.preventDefault();
    setOwnerBankDetails(bankForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Crown size={16} />
            <span>Platform Owner Control Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Platform Owner Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Review uploaded driver license documents, manage your payout bank accounts, and monitor registrations.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
            }`}
          >
            Metrics & Document Review
          </button>
          <button
            onClick={() => setActiveTab('payment-settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
              activeTab === 'payment-settings'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
            }`}
          >
            <Building size={14} />
            <span>Owner Bank Accounts</span>
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-8">

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase font-bold">Total Platform Revenue</span>
                <DollarSign size={18} className="text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono mt-2">
                {formatMoney(adminMetrics.totalRevenueNaira)}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Deposits collected</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase font-bold">Bonafide Drivers</span>
                <Users size={18} className="text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono mt-2">
                {adminMetrics.verifiedDriversCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Paid & Verified</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase font-bold">Completed Payments</span>
                <CreditCard size={18} className="text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono mt-2">
                {adminMetrics.totalTransactions}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Audit Logged</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase font-bold">Pending Document Review</span>
                <Clock size={18} className="text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono mt-2">
                {adminMetrics.pendingVerifications}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Awaiting Inspection</p>
            </div>

          </div>

          {/* Main Grid: Ledger & Driver Document Approval Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Financial Audit Ledger */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                <span>Fee Collection Audit Ledger</span>
                <span className="text-xs text-slate-400 font-mono">Live Ledger</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Reference</th>
                      <th className="p-3">User</th>
                      <th className="p-3">Fee Type</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {transactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-900/50 transition">
                        <td className="p-3 font-mono text-slate-400">{tx.ref}</td>
                        <td className="p-3 font-bold text-white">{tx.user}</td>
                        <td className="p-3 text-slate-300">{tx.type}</td>
                        <td className="p-3 font-mono font-extrabold text-amber-400">
                          {formatMoney(tx.amountNGN)}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Col: Driver License & Document Approval Queue */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Driver Verification Queue</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                  {drivers.length} Drivers
                </span>
              </div>
              <p className="text-xs text-slate-400">Inspect uploaded license scans and national identity cards before granting verified status.</p>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {drivers.map(driver => (
                  <div key={driver.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <img src={driver.avatar} alt={driver.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{driver.name}</h4>
                          <p className="text-[10px] text-slate-400 truncate">{driver.location}, {driver.country || 'Nigeria'}</p>
                          <p className="text-[10px] font-mono text-amber-400 truncate mt-0.5">{driver.licenseNumber}</p>
                        </div>
                      </div>

                      {/* Status Tag */}
                      {driver.licenseVerified ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold shrink-0">
                          Verified
                        </span>
                      ) : driver.verificationStatus === 'rejected' ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 font-bold shrink-0">
                          Rejected
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold shrink-0">
                          Review Needed
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenInspect(driver)}
                        className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-amber-400 text-[11px] font-bold rounded-xl border border-slate-800 hover:border-amber-500/40 transition flex items-center justify-center space-x-1.5"
                      >
                        <Eye size={13} />
                        <span>Inspect Documents</span>
                      </button>

                      {!driver.licenseVerified && (
                        <button
                          onClick={() => handleApprove(driver.id)}
                          className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-xl transition shrink-0"
                        >
                          Quick Approve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Owner Bank & Payment Settings Manager Form */
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Building size={24} className="text-amber-400" />
              <span>Configure Official Nigerian Bank Account</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              All registration fees (₦15,000) and monthly subscriptions (₦5,000) across Nigeria are paid directly to this verified bank account.
            </p>
          </div>

          {saveSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-bold flex items-center space-x-2">
              <Check size={18} />
              <span>Official Nigerian Bank Account Updated Successfully! All website checkout modals updated live.</span>
            </div>
          )}

          <form onSubmit={handleSaveBankDetails} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Bank Name</label>
              <input 
                type="text" 
                required
                value={bankForm.bankName}
                onChange={e => setBankForm({ ...bankForm, bankName: e.target.value })}
                placeholder="e.g. WEMA BANK"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Bank Account Number</label>
                <input 
                  type="text" 
                  required
                  value={bankForm.accountNumber}
                  onChange={e => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                  placeholder="e.g. 0251589130"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-400 font-bold focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Account Name</label>
                <input 
                  type="text" 
                  required
                  value={bankForm.accountName}
                  onChange={e => setBankForm({ ...bankForm, accountName: e.target.value })}
                  placeholder="e.g. HUSSEIN KAMALDEEN OPEYEMI"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">USSD Direct Payment Code</label>
              <input 
                type="text" 
                value={bankForm.ussdCode}
                onChange={e => setBankForm({ ...bankForm, ussdCode: e.target.value })}
                placeholder="*945*000*0251589130#"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-400 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-400 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span><strong>Nigeria Local Payouts Active:</strong> Paystack & card gateways paused for now. Direct Nigerian bank transfer to WEMA BANK is the primary payment system.</span>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center space-x-2"
            >
              <Save size={18} />
              <span>Save & Update Website Payment Accounts</span>
            </button>
          </form>
        </div>
      )}

      {/* Driver Document Inspection Modal */}
      {inspectingDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={inspectingDriver.avatar} 
                  alt={inspectingDriver.name} 
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-700"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-white text-base">{inspectingDriver.name}</h3>
                    {inspectingDriver.licenseVerified ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                        Pending Admin Review
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                    <span>{inspectingDriver.location}, {inspectingDriver.country}</span>
                    <span>•</span>
                    <span className="font-mono text-amber-400">{inspectingDriver.licenseNumber}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInspectingDriver(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">

              {/* License Specs Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Authority</span>
                  <strong className="text-white truncate block">{inspectingDriver.licenseAuthority || 'Official Authority'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">License Expiry</span>
                  <strong className="text-amber-400 font-mono">{inspectingDriver.licenseExpiry || '2028-12-31'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Experience</span>
                  <strong className="text-white">{inspectingDriver.experienceYears} Years</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Contact Phone</span>
                  <strong className="text-white font-mono">{inspectingDriver.phone}</strong>
                </div>
              </div>

              {/* Document Tabs */}
              <div>
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Uploaded Scans:</span>
                  <button
                    onClick={() => setActiveDocTab('licenseFront')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activeDocTab === 'licenseFront'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    License (Front)
                  </button>
                  <button
                    onClick={() => setActiveDocTab('licenseBack')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activeDocTab === 'licenseBack'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    License (Back)
                  </button>
                  <button
                    onClick={() => setActiveDocTab('identityDoc')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activeDocTab === 'identityDoc'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    National ID / Passport
                  </button>
                </div>

                {/* Document Display Window */}
                <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                  {inspectingDriver.documents?.[activeDocTab] ? (
                    <div className="space-y-3">
                      <img 
                        src={inspectingDriver.documents[activeDocTab]} 
                        alt="Document Preview" 
                        className="max-h-72 w-auto mx-auto rounded-xl border border-slate-700 shadow-lg object-contain"
                      />
                      <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        <span>High-Resolution Document Scan • Official D-Drive Security Checked</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-slate-500 space-y-2">
                      <FileText size={36} className="mx-auto text-slate-600" />
                      <p className="text-xs">No scan uploaded for this section</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Rejection Note Form (If toggled) */}
              {showRejectForm && (
                <div className="p-4 bg-red-950/40 border border-red-900 rounded-2xl space-y-3">
                  <div className="flex items-center space-x-2 text-red-400 text-xs font-bold">
                    <AlertTriangle size={15} />
                    <span>State Reason for Document Rejection</span>
                  </div>
                  <textarea
                    rows={2}
                    value={rejectionReason}
                    onChange={e => setRejectionReason(e.target.value)}
                    placeholder="e.g. License image is blurry, please take a clear well-lit photo showing the official seal and expiry date."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 outline-none"
                  />
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => setShowRejectForm(false)}
                      className="px-3 py-1.5 bg-slate-900 text-slate-300 text-xs rounded-xl font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReject(inspectingDriver.id)}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Admin Action for <strong className="text-white">{inspectingDriver.name}</strong>
              </span>

              <div className="flex items-center space-x-2">
                {!showRejectForm && (
                  <button
                    onClick={() => setShowRejectForm(true)}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-red-950 text-red-400 border border-slate-800 hover:border-red-800 text-xs font-bold rounded-xl transition"
                  >
                    Reject Documents
                  </button>
                )}

                <button
                  onClick={() => handleApprove(inspectingDriver.id)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center space-x-1.5"
                >
                  <CheckCircle size={15} />
                  <span>Approve & Grant Bonafide Verified Status</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
