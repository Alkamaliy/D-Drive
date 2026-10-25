import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialDrivers, initialChats } from '../data/mockData';
import { storage } from '../services/storage';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const FX_RATES = {
  NGN: { symbol: '₦', rate: 1, code: 'NGN', label: 'Nigerian Naira (₦)' }
};

export const AppProvider = ({ children }) => {
  // Initialize storage once
  useEffect(() => {
    storage.init();
  }, []);

  // Real Persistent User Auth Session
  const [currentUser, setCurrentUser] = useState(() => storage.getCurrentUser());

  // Active Role: 'visitor' | 'driver' | 'client' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => currentUser?.role || 'visitor');

  // Currency strictly NGN for Nigeria
  const [currency, setCurrency] = useState(() => storage.getCurrency('NGN'));

  useEffect(() => {
    storage.saveCurrency(currency);
  }, [currency]);

  const FEES = {
    registrationNGN: 15000,
    monthlyNGN: 5000
  };

  // Official Owner Bank Details (WEMA BANK - HUSSEIN KAMALDEEN OPEYEMI)
  const [ownerBankDetails, setOwnerBankDetails] = useState(() => 
    storage.getOwnerSettings({
      bankName: 'WEMA BANK',
      accountNumber: '0251589130',
      accountName: 'HUSSEIN KAMALDEEN OPEYEMI',
      swiftCode: 'WEMANGBA',
      ussdCode: '*945*000*0251589130#'
    })
  );

  useEffect(() => {
    storage.saveOwnerSettings(ownerBankDetails);
  }, [ownerBankDetails]);

  const formatMoney = (amountNGN) => {
    const num = Math.round(Number(amountNGN) || 0);
    return `₦${num.toLocaleString()}`;
  };

  // Driver User Profile (State for logged-in or simulated driver)
  const [driverUser, setDriverUser] = useState(() => {
    const session = storage.getCurrentUser();
    if (session?.role === 'driver') return session;
    return {
      id: 'drv-current',
      name: 'Samuel Okon',
      email: 'driver@d-drive.global',
      phone: '+234 812 345 6789',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      location: 'Victoria Island, Lagos',
      country: 'Nigeria',
      state: 'Lagos',
      experienceYears: 8,
      licenseNumber: 'FRSC-DRV-99201-LA',
      licenseAuthority: 'FRSC (Federal Road Safety Corps - Nigeria)',
      licenseVerified: true,
      verificationStatus: 'verified',
      isBonafidePaid: true,
      isMonthlyPaid: true,
      transmission: 'Both (Manual & Automatic)',
      vehicleTypes: ['Executive SUV', 'Luxury Sedan', 'Toyota Prado'],
      dailyRate: 25000,
      hourlyRate: 3500,
      rating: 4.9,
      tripsCompleted: 45,
      availability: 'available',
      bio: 'Professional corporate chauffeur certified with FRSC & LASDRI. Executive VIP transfer specialist across Lagos and inter-state.',
    };
  });

  // Client User Profile
  const [clientUser, setClientUser] = useState(() => {
    const session = storage.getCurrentUser();
    if (session?.role === 'client') return session;
    return {
      id: 'cli-current',
      name: 'Dr. Sandra Okafor',
      email: 'client@d-drive.global',
      phone: '+234 802 345 6789',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      location: 'Ikoyi, Lagos',
      country: 'Nigeria',
      isAccessPaid: true,
      isMonthlyPaid: true,
    };
  });

  // Drivers Dataset with Persistence
  const [drivers, setDrivers] = useState(() => storage.getDrivers());

  useEffect(() => {
    storage.saveDrivers(drivers);
  }, [drivers]);

  // Chats with Persistence
  const [chats, setChats] = useState(() => storage.getChats());

  useEffect(() => {
    storage.saveChats(chats);
  }, [chats]);

  const [activeChatId, setActiveChatId] = useState(null);

  // Transactions with Persistence
  const [transactions, setTransactions] = useState(() => 
    storage.getTransactions([
      { id: 'tx-101', user: 'Emeka Okafor', type: 'Driver Registration Fee', amountNGN: 15000, date: '2025-02-14', status: 'Successful', ref: 'DDRV-NGN-9812' },
      { id: 'tx-102', user: 'Babatunde Adeyemi', type: 'Driver Monthly Fee', amountNGN: 5000, date: '2025-02-15', status: 'Successful', ref: 'DDRV-NGN-5541' },
      { id: 'tx-103', user: 'Dr. Sandra Okafor', type: 'Client Access Fee', amountNGN: 15000, date: '2025-02-19', status: 'Successful', ref: 'DDRV-NGN-8812' }
    ])
  );

  useEffect(() => {
    storage.saveTransactions(transactions);
  }, [transactions]);

  // Auth Modal State
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    initialTab: 'login', // 'login' | 'signup'
    initialRole: 'client' // 'client' | 'driver'
  });

  const openAuthModal = (initialTab = 'login', initialRole = 'client') => {
    setAuthModal({ isOpen: true, initialTab, initialRole });
  };

  const closeAuthModal = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  // Real Login Handler
  const loginUser = (email, password) => {
    const user = storage.login(email, password);
    setCurrentUser(user);
    setCurrentRole(user.role);

    if (user.role === 'driver') {
      setDriverUser(user);
    } else if (user.role === 'client') {
      setClientUser(user);
    }

    return user;
  };

  // Real Registration Handler
  const registerUser = (userData) => {
    const user = storage.register(userData);
    setCurrentUser(user);
    setCurrentRole(user.role);

    if (user.role === 'driver') {
      setDriverUser(user);
      setDrivers(prev => [user, ...prev]);
      openPaymentModal('driver', 'registration');
    } else if (user.role === 'client') {
      setClientUser(user);
      openPaymentModal('client', 'registration');
    }

    return user;
  };

  // Real Logout Handler
  const logoutUser = () => {
    storage.logout();
    setCurrentUser(null);
    setCurrentRole('visitor');
  };

  // Payment Modal State
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    payerType: 'driver',
    feeType: 'registration',
    amountNGN: 15000,
    title: 'D-Drive Nigeria Registration & Membership'
  });

  const openPaymentModal = (payerType = 'driver', feeType = 'registration') => {
    const amountNGN = feeType === 'registration' ? FEES.registrationNGN : FEES.monthlyNGN;
    const feeTitle = feeType === 'registration' 
      ? `D-Drive ${payerType === 'driver' ? 'Driver' : 'Client'} Registration Fee`
      : `D-Drive ${payerType === 'driver' ? 'Driver' : 'Client'} Monthly Subscription Fee`;

    setPaymentModal({
      isOpen: true,
      payerType,
      feeType,
      amountNGN,
      title: feeTitle
    });
  };

  const closePaymentModal = () => {
    setPaymentModal(prev => ({ ...prev, isOpen: false }));
  };

  const handlePaymentSuccess = (payerType, feeType, paymentDetails) => {
    const paidAmount = feeType === 'registration' ? FEES.registrationNGN : FEES.monthlyNGN;
    const activeUserName = payerType === 'driver' ? driverUser.name : clientUser.name;

    const newTx = {
      id: `tx-${Date.now()}`,
      user: activeUserName,
      type: `${payerType === 'driver' ? 'Driver' : 'Client'} ${feeType === 'registration' ? 'Registration Fee' : 'Monthly Subscription'}`,
      amountNGN: paidAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'Successful',
      ref: paymentDetails?.reference || `DDRV-NGN-${Math.floor(Math.random() * 899999 + 100000)}`
    };

    setTransactions(prev => [newTx, ...prev]);

    if (payerType === 'driver') {
      setDriverUser(prev => {
        const updated = { ...prev, isBonafidePaid: true, isMonthlyPaid: true };
        if (currentUser?.id === prev.id) storage.updateUser(prev.id, updated);
        return updated;
      });
      setDrivers(prev => prev.map(d => d.id === driverUser.id ? { ...d, isBonafidePaid: true } : d));
    } else {
      setClientUser(prev => {
        const updated = { ...prev, isAccessPaid: true, isMonthlyPaid: true };
        if (currentUser?.id === prev.id) storage.updateUser(prev.id, updated);
        return updated;
      });
    }

    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch (e) {
      console.log('Confetti effect triggered');
    }

    closePaymentModal();
  };

  const startChatWithDriver = (driver) => {
    if (!clientUser.isAccessPaid) {
      openPaymentModal('client', 'registration');
      return;
    }

    let existingChat = chats.find(c => c.driverId === driver.id && c.clientId === clientUser.id);
    if (!existingChat) {
      const newChat = {
        id: `chat-${Date.now()}`,
        driverId: driver.id,
        clientId: clientUser.id,
        clientName: clientUser.name,
        clientAvatar: clientUser.avatar,
        driverName: driver.name,
        driverAvatar: driver.avatar,
        lastMessage: `Hi ${driver.name}, I am interested in hiring you as a professional chauffeur.`,
        lastTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `m-${Date.now()}`,
            sender: 'client',
            text: `Hi ${driver.name}, I saw your D-Drive profile in ${driver.location}. Are you available for an executive trip?`,
            timestamp: 'Just now'
          }
        ]
      };

      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newChat.id);
    } else {
      setActiveChatId(existingChat.id);
    }

    setCurrentRole('client');
  };

  const sendMessage = (chatId, text) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        const newMsg = { id: `m-${Date.now()}`, sender: currentRole === 'driver' ? 'driver' : 'client', text, timestamp: now };
        return { ...c, lastMessage: text, lastTime: now, messages: [...c.messages, newMsg] };
      }
      return c;
    }));

    if (currentRole === 'client' || currentRole === 'visitor') {
      setTimeout(() => {
        setChats(prev => prev.map(c => {
          if (c.id === chatId) {
            const autoMsg = {
              id: `m-reply-${Date.now()}`,
              sender: 'driver',
              text: `Hello! Thank you for contacting me on D-Drive Nigeria. Yes, I am available. What location and schedule do you prefer?`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            return { ...c, lastMessage: autoMsg.text, lastTime: autoMsg.timestamp, messages: [...c.messages, autoMsg] };
          }
          return c;
        }));
      }, 1500);
    }
  };

  const registerNewDriver = (driverData) => {
    const newDriver = {
      id: `drv-${Date.now()}`,
      name: driverData.name,
      avatar: driverData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      location: driverData.location,
      country: 'Nigeria',
      state: driverData.state || 'Lagos',
      experienceYears: parseInt(driverData.experienceYears) || 5,
      licenseNumber: driverData.licenseNumber,
      licenseAuthority: driverData.licenseAuthority || 'FRSC (Federal Road Safety Corps - Nigeria)',
      licenseExpiry: driverData.licenseExpiry || '2028-12-31',
      licenseVerified: false,
      verificationStatus: 'pending',
      isBonafidePaid: false,
      isMonthlyPaid: false,
      transmission: driverData.transmission,
      vehicleTypes: driverData.vehicleTypes ? driverData.vehicleTypes.split(',') : ['Executive SUV', 'Luxury Sedan'],
      dailyRate: parseInt(driverData.dailyRate) || 30000,
      hourlyRate: parseInt(driverData.hourlyRate) || 4500,
      rating: 5.0,
      tripsCompleted: 0,
      availability: 'available',
      bio: driverData.bio || 'Professional driver registered on D-Drive Nigeria.',
      phone: driverData.phone,
      registeredDate: new Date().toISOString().split('T')[0],
      documents: {
        licenseFront: driverData.licenseFront || null,
        licenseBack: driverData.licenseBack || null,
        identityDoc: driverData.identityDoc || null,
        notes: driverData.documentsNotes || 'New registration documents awaiting review.'
      }
    };

    setDriverUser(newDriver);
    setDrivers(prev => [newDriver, ...prev]);
    setCurrentRole('driver');
    openPaymentModal('driver', 'registration');
  };

  const approveDriverLicense = (driverId) => {
    setDrivers(prev => prev.map(d => d.id === driverId ? { ...d, licenseVerified: true, verificationStatus: 'verified' } : d));
    if (driverUser.id === driverId) {
      setDriverUser(prev => ({ ...prev, licenseVerified: true, verificationStatus: 'verified' }));
    }
  };

  const rejectDriverLicense = (driverId, reason = 'Uploaded document is unreadable or expired. Please upload a clear official copy.') => {
    setDrivers(prev => prev.map(d => d.id === driverId ? { ...d, licenseVerified: false, verificationStatus: 'rejected', rejectionReason: reason } : d));
    if (driverUser.id === driverId) {
      setDriverUser(prev => ({ ...prev, licenseVerified: false, verificationStatus: 'rejected', rejectionReason: reason }));
    }
  };

  const adminMetrics = {
    totalRevenueNaira: transactions.reduce((acc, curr) => acc + curr.amountNGN, 0),
    totalTransactions: transactions.length,
    verifiedDriversCount: drivers.filter(d => d.licenseVerified && d.isBonafidePaid).length,
    pendingVerifications: drivers.filter(d => !d.licenseVerified).length,
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentRole,
        authModal,
        openAuthModal,
        closeAuthModal,
        loginUser,
        registerUser,
        logoutUser,
        currency,
        setCurrency,
        FEES,
        formatMoney,
        ownerBankDetails,
        setOwnerBankDetails,
        driverUser,
        setDriverUser,
        clientUser,
        setClientUser,
        drivers,
        setDrivers,
        chats,
        activeChatId,
        setActiveChatId,
        transactions,
        paymentModal,
        openPaymentModal,
        closePaymentModal,
        handlePaymentSuccess,
        startChatWithDriver,
        sendMessage,
        registerNewDriver,
        approveDriverLicense,
        rejectDriverLicense,
        adminMetrics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
