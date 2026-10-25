import { initialDrivers, initialChats } from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 'ddrive_users_v2',
  CURRENT_USER: 'ddrive_current_user_v2',
  DRIVERS: 'ddrive_drivers_v2',
  CHATS: 'ddrive_chats_v2',
  TRANSACTIONS: 'ddrive_transactions_v2',
  OWNER_SETTINGS: 'ddrive_owner_settings_v2',
  CURRENCY: 'ddrive_currency_v2'
};

// Default seed accounts for instant login & testing in Nigeria
const DEFAULT_SEED_USERS = [
  {
    id: 'usr-admin-1',
    email: 'kamaldeenhussein123@gmail.com',
    password: 'Adekunle1234.',
    role: 'admin',
    name: 'Hussein Kamaldeen (Owner)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+234 800 000 0199',
    createdAt: '2025-01-01'
  },
  {
    id: 'usr-drv-1',
    email: 'driver@d-drive.global',
    password: 'driver123',
    role: 'driver',
    name: 'Samuel Okon',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    phone: '+234 812 345 6789',
    country: 'Nigeria',
    location: 'Victoria Island, Lagos',
    state: 'Lagos',
    experienceYears: 8,
    licenseNumber: 'FRSC-DRV-99201-LA',
    licenseAuthority: 'FRSC (Federal Road Safety Corps - Nigeria)',
    licenseExpiry: '2028-12-31',
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
    createdAt: '2025-01-15'
  },
  {
    id: 'usr-cli-1',
    email: 'client@d-drive.global',
    password: 'client123',
    role: 'client',
    name: 'Dr. Sandra Okafor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    phone: '+234 802 345 6789',
    country: 'Nigeria',
    location: 'Ikoyi, Lagos',
    isAccessPaid: true,
    isMonthlyPaid: true,
    createdAt: '2025-02-01'
  }
];

export const storage = {
  // Safe getItem with JSON parsing
  get: (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Error reading ${key} from localStorage:`, e);
      return defaultValue;
    }
  },

  // Safe setItem
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing ${key} to localStorage:`, e);
    }
  },

  // Initialize DB with seed data if empty
  init: () => {
    const existingUsers = storage.get(STORAGE_KEYS.USERS, null);
    if (!existingUsers) {
      storage.set(STORAGE_KEYS.USERS, DEFAULT_SEED_USERS);
    } else {
      // Ensure admin user always has latest credentials
      const adminIdx = existingUsers.findIndex(u => u.role === 'admin' || u.id === 'usr-admin-1');
      if (adminIdx !== -1) {
        existingUsers[adminIdx].email = 'kamaldeenhussein123@gmail.com';
        existingUsers[adminIdx].password = 'Adekunle1234.';
        existingUsers[adminIdx].name = 'Hussein Kamaldeen (Owner)';
      } else {
        existingUsers.unshift(DEFAULT_SEED_USERS[0]);
      }
      storage.set(STORAGE_KEYS.USERS, existingUsers);
    }
    if (!localStorage.getItem(STORAGE_KEYS.DRIVERS)) {
      storage.set(STORAGE_KEYS.DRIVERS, initialDrivers);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CHATS)) {
      storage.set(STORAGE_KEYS.CHATS, initialChats);
    }
  },

  // USER AUTHENTICATION
  login: (email, password) => {
    const users = storage.get(STORAGE_KEYS.USERS, DEFAULT_SEED_USERS);
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password. Please try again.');
    }

    const sessionUser = { ...user };
    delete sessionUser.password; // Don't keep password in active session
    storage.set(STORAGE_KEYS.CURRENT_USER, sessionUser);
    return sessionUser;
  },

  register: (userData) => {
    const users = storage.get(STORAGE_KEYS.USERS, DEFAULT_SEED_USERS);
    const normalizedEmail = userData.email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error('An account with this email address already exists. Please log in.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      ...userData,
      email: normalizedEmail
    };

    users.push(newUser);
    storage.set(STORAGE_KEYS.USERS, users);

    const sessionUser = { ...newUser };
    delete sessionUser.password;
    storage.set(STORAGE_KEYS.CURRENT_USER, sessionUser);
    return sessionUser;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: () => {
    return storage.get(STORAGE_KEYS.CURRENT_USER, null);
  },

  // USERS MANAGEMENT
  getUsers: () => {
    return storage.get(STORAGE_KEYS.USERS, DEFAULT_SEED_USERS);
  },

  updateUser: (userId, updates) => {
    const users = storage.get(STORAGE_KEYS.USERS, DEFAULT_SEED_USERS);
    const updatedUsers = users.map(u => u.id === userId ? { ...u, ...updates } : u);
    storage.set(STORAGE_KEYS.USERS, updatedUsers);

    const current = storage.getCurrentUser();
    if (current && current.id === userId) {
      storage.set(STORAGE_KEYS.CURRENT_USER, { ...current, ...updates });
    }
  },

  // DRIVERS PERSISTENCE
  getDrivers: () => {
    return storage.get(STORAGE_KEYS.DRIVERS, initialDrivers);
  },

  saveDrivers: (drivers) => {
    storage.set(STORAGE_KEYS.DRIVERS, drivers);
  },

  // CHATS PERSISTENCE
  getChats: () => {
    return storage.get(STORAGE_KEYS.CHATS, initialChats);
  },

  saveChats: (chats) => {
    storage.set(STORAGE_KEYS.CHATS, chats);
  },

  // TRANSACTIONS PERSISTENCE
  getTransactions: (defaultTxs) => {
    return storage.get(STORAGE_KEYS.TRANSACTIONS, defaultTxs);
  },

  saveTransactions: (txs) => {
    storage.set(STORAGE_KEYS.TRANSACTIONS, txs);
  },

  // OWNER SETTINGS PERSISTENCE
  getOwnerSettings: (defaultSettings) => {
    return storage.get(STORAGE_KEYS.OWNER_SETTINGS, defaultSettings);
  },

  saveOwnerSettings: (settings) => {
    storage.set(STORAGE_KEYS.OWNER_SETTINGS, settings);
  },

  // CURRENCY PERSISTENCE
  getCurrency: (defaultCurrency) => {
    return storage.get(STORAGE_KEYS.CURRENCY, defaultCurrency);
  },

  saveCurrency: (currency) => {
    storage.set(STORAGE_KEYS.CURRENCY, currency);
  }
};

export { STORAGE_KEYS };
