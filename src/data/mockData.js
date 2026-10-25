export const licensingAuthorities = [
  'FRSC (Federal Road Safety Corps - Nigeria)',
  'FRSC Commercial Chauffeur Permit',
  'LASDRI (Lagos State Drivers Institute)',
  'State Chauffeur License (Nigeria)'
];

export const initialDrivers = [
  {
    id: 'drv-1',
    name: 'Emeka Okafor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    location: 'Lekki Phase 1, Lagos',
    country: 'Nigeria',
    state: 'Lagos',
    experienceYears: 9,
    licenseNumber: 'FRSC-DRV-89410-LA',
    licenseAuthority: 'FRSC (Federal Road Safety Corps - Nigeria)',
    licenseExpiry: '2028-11-30',
    licenseVerified: true,
    verificationStatus: 'verified', // 'pending' | 'verified' | 'rejected'
    isBonafidePaid: true,
    transmission: 'Both (Manual & Automatic)',
    vehicleTypes: ['Executive SUV', 'Luxury Sedan', 'Range Rover', 'Prado'],
    dailyRate: 25000, // NGN base
    hourlyRate: 3500,
    rating: 4.9,
    tripsCompleted: 142,
    availability: 'available',
    bio: 'Professional executive chauffeur with 9 years experience handling VIP clients, expatriates, and corporate dignitaries across Nigeria.',
    phone: '+234 803 456 7890',
    registeredDate: '2025-01-15',
    documents: {
      licenseFront: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
      licenseBack: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      identityDoc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      notes: 'FRSC biometrics verified, valid through Nov 2028'
    }
  },
  {
    id: 'drv-2',
    name: 'Babatunde Adeyemi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    location: 'Maitama, Abuja',
    country: 'Nigeria',
    state: 'Abuja (FCT)',
    experienceYears: 12,
    licenseNumber: 'FRSC-DRV-77120-FCT',
    licenseAuthority: 'FRSC (Federal Road Safety Corps - Nigeria)',
    licenseExpiry: '2029-05-14',
    licenseVerified: true,
    verificationStatus: 'verified',
    isBonafidePaid: true,
    transmission: 'Automatic',
    vehicleTypes: ['Toyota Land Cruiser V8', 'Mercedes Benz S-Class', 'Toyota Prado'],
    dailyRate: 35000,
    hourlyRate: 5000,
    rating: 5.0,
    tripsCompleted: 210,
    availability: 'available',
    bio: 'Licensed executive protocol chauffeur. Specializes in VIP airport transfers (Nnamdi Azikiwe Airport), diplomatic escorts, and Abuja corporate movements.',
    phone: '+234 809 112 3344',
    registeredDate: '2024-11-20',
    documents: {
      licenseFront: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
      licenseBack: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      identityDoc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      notes: 'FRSC FCT verification confirmed, clean record'
    }
  },
  {
    id: 'drv-3',
    name: 'Ibrahim Danladi',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    location: 'Victoria Island, Lagos',
    country: 'Nigeria',
    state: 'Lagos',
    experienceYears: 14,
    licenseNumber: 'FRSC-DRV-88210-LA',
    licenseAuthority: 'FRSC & LASDRI Certified',
    licenseExpiry: '2028-09-30',
    licenseVerified: true,
    verificationStatus: 'verified',
    isBonafidePaid: true,
    transmission: 'Both (Manual & Automatic)',
    vehicleTypes: ['Range Rover Vogue', 'Mercedes Benz E-Class', 'Lexus LX570'],
    dailyRate: 30000,
    hourlyRate: 4500,
    rating: 4.95,
    tripsCompleted: 310,
    availability: 'available',
    bio: 'LASDRI Gold-certified chauffeur with 14 years experience. Airport transfers (Murtala Muhammed MMIA), inter-state convoys, and executive security escort driving.',
    phone: '+234 802 998 7766',
    registeredDate: '2024-09-12',
    documents: {
      licenseFront: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
      licenseBack: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      identityDoc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      notes: 'FRSC & LASDRI Professional Chauffeur Badge'
    }
  },
  {
    id: 'drv-4',
    name: 'Amina Yusuf',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    location: 'GRA Phase 2, Port Harcourt',
    country: 'Nigeria',
    state: 'Port Harcourt (Rivers)',
    experienceYears: 8,
    licenseNumber: 'FRSC-DRV-55419-RV',
    licenseAuthority: 'FRSC (Federal Road Safety Corps - Nigeria)',
    licenseExpiry: '2027-12-15',
    licenseVerified: true,
    verificationStatus: 'verified',
    isBonafidePaid: true,
    transmission: 'Automatic',
    vehicleTypes: ['Toyota Land Cruiser Prado', 'Lexus LX600', 'Toyota Hilux'],
    dailyRate: 28000,
    hourlyRate: 4000,
    rating: 4.88,
    tripsCompleted: 175,
    availability: 'available',
    bio: 'FRSC-certified executive female chauffeur. Expertise in corporate transfers, oil & gas executive protocol, and Port Harcourt airport VIP movements.',
    phone: '+234 814 556 7890',
    registeredDate: '2025-02-01',
    documents: {
      licenseFront: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
      licenseBack: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      identityDoc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      notes: 'FRSC Rivers State verified Chauffeur'
    }
  },
  {
    id: 'drv-5',
    name: 'Obinna Okeke',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    location: 'Bodija, Ibadan',
    country: 'Nigeria',
    state: 'Ibadan (Oyo)',
    experienceYears: 7,
    licenseNumber: 'FRSC-DRV-33901-OY',
    licenseAuthority: 'FRSC (Federal Road Safety Corps - Nigeria)',
    licenseExpiry: '2027-08-20',
    licenseVerified: true,
    verificationStatus: 'verified',
    isBonafidePaid: true,
    transmission: 'Both (Manual & Automatic)',
    vehicleTypes: ['Toyota Highlander', 'Ford Explorer', 'Toyota Camry'],
    dailyRate: 24000,
    hourlyRate: 3500,
    rating: 4.9,
    tripsCompleted: 115,
    availability: 'available',
    bio: 'Reliable protocol driver based in Ibadan. Extensive experience with Lagos-Ibadan expressway charters, inter-state business trips, and executive protocol.',
    phone: '+234 805 223 4455',
    registeredDate: '2025-01-28',
    documents: {
      licenseFront: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
      licenseBack: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      identityDoc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      notes: 'FRSC Oyo State commercial certification verified'
    }
  },
  {
    id: 'drv-pending-1',
    name: 'Chukwudi Nnamdi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    location: 'Ikeja, Lagos',
    country: 'Nigeria',
    state: 'Lagos',
    experienceYears: 6,
    licenseNumber: 'FRSC-DRV-44102-LA',
    licenseAuthority: 'FRSC (Federal Road Safety Corps - Nigeria)',
    licenseExpiry: '2029-01-10',
    licenseVerified: false,
    verificationStatus: 'pending',
    isBonafidePaid: true, // Paid registration, awaiting document approval
    transmission: 'Both (Manual & Automatic)',
    vehicleTypes: ['Toyota Prado', 'Mercedes E-Class'],
    dailyRate: 22000,
    hourlyRate: 3000,
    rating: 5.0,
    tripsCompleted: 0,
    availability: 'busy',
    bio: 'Executive driver seeking verification on D-Drive Nigeria. Experience in corporate protocol and executive fleet handling.',
    phone: '+234 802 119 4433',
    registeredDate: '2026-03-01',
    documents: {
      licenseFront: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
      licenseBack: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      identityDoc: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      notes: 'Documents submitted. Awaiting admin review.'
    }
  }
];

export const initialChats = [
  {
    id: 'chat-1',
    driverId: 'drv-1',
    clientId: 'cli-101',
    clientName: 'Chief Kunle Adeleke',
    clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Good morning Emeka, are you free this Thursday for an executive charter?',
    lastTime: '10:14 AM',
    unreadCount: 1,
    messages: [
      { id: 'm1', sender: 'client', text: 'Hello Emeka! I saw your D-Drive profile. Are you available for VIP transport?', timestamp: '09:50 AM' },
      { id: 'm2', sender: 'driver', text: 'Hello Chief! Yes, I am available with my verified D-Drive badge.', timestamp: '09:55 AM' },
      { id: 'm3', sender: 'client', text: 'Good morning Emeka, are you free this Thursday for an executive charter?', timestamp: '10:14 AM' }
    ]
  }
];

export const globalCountries = [
  'All Nigeria',
  'Lagos',
  'Abuja (FCT)',
  'Port Harcourt (Rivers)',
  'Ibadan (Oyo)',
  'Enugu',
  'Kano',
  'Delta',
  'Ogun'
];
