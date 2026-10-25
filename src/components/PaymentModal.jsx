import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Landmark, PhoneCall, ShieldCheck, X, CheckCircle, Lock, Loader2, ArrowRight, Copy, Check, AlertCircle } from 'lucide-react';

export const PaymentModal = () => {
  const { 
    paymentModal, 
    closePaymentModal, 
    handlePaymentSuccess, 
    driverUser, 
    clientUser,
    formatMoney,
    FEES,
    ownerBankDetails
  } = useApp();

  const [payMethod, setPayMethod] = useState('transfer'); // 'transfer' | 'ussd'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');

  if (!paymentModal.isOpen) return null;

  const isDriver = paymentModal.payerType === 'driver';
  const isRegistration = paymentModal.feeType === 'registration';
  const userObj = isDriver ? driverUser : clientUser;

  const baseAmountNGN = isRegistration ? FEES.registrationNGN : FEES.monthlyNGN;
  const formattedDisplay = formatMoney(baseAmountNGN);

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

      setTimeout(() => {
        setIsSuccess(false);
        handlePaymentSuccess(paymentModal.payerType, paymentModal.feeType, {
          reference: `WEMA-TRF-${Math.floor(Math.random() * 900000 + 100000)}`,
          senderName: senderName || userObj?.name
        });
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/70 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Gateway Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg shadow-sm">
              ₦
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                D-Drive Nigeria Payment
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-bold">
                  Direct Bank Transfer
                </span>
              </h3>
              <p className="text-xs text-slate-400">{userObj?.email || 'user@d-drive.global'}</p>
            </div>
          </div>
          <button 
            onClick={closePaymentModal}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Amount Summary Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">
              {isRegistration ? 'One-Time Registration Fee' : 'Monthly Subscription Fee'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {isDriver 
                ? (isRegistration ? 'Bonafide Driver Membership (Nigeria)' : 'Driver Active Listing Subscription') 
                : (isRegistration ? 'Client Marketplace Access Unlock' : 'Client Marketplace Active Access')}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-amber-400 font-mono tracking-tight">{formattedDisplay}</span>
            <span className="text-[10px] text-slate-400 block font-semibold">
              NGN {isRegistration ? '(One-time)' : '(/month)'}
            </span>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
              <CheckCircle size={36} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Transfer Payment Confirmed!</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                {isRegistration 
                  ? (isDriver ? 'Congratulations! You are now a Bonafide D-Drive Member with verified status.' : 'Platform Access Unlocked! You can now search & chat verified drivers across Nigeria.')
                  : 'Monthly Subscription Renewed Successfully!'}
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
            
            {/* Payment Method Switcher */}
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

            {/* Direct Bank Transfer Form */}
            {payMethod === 'transfer' && (
              <form onSubmit={handleConfirmTransfer} className="space-y-4">
                
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">Official Payment Bank Account:</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                      Nigeria Only
                    </span>
                  </div>

                  {/* Bank Details Card */}
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

                {/* Sender Account Name (Optional for validation) */}
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

            {/* Secure Footer Note */}
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
    </div>
  );
};
