import type { User, Beneficiary, Transaction, ExchangeRate } from './index';

export const MOCK_USER: User = {
    id:            'usr_001',
    firstName:     'Jean-Paul',
    lastName:      'Nkemeni',
    username:      'jeanpaul237',
    email:         'jeanpaul.nkemeni@gmail.com',
    phone:         '+237 677 123 456',
    country:       'Cameroun',
    currency:      'XAF',
    balance:       2_456_750,
    accountNumber: 'DMY-2025-7734',
    verified:      true,
    birthdate:     '15/03/1992',
    address:       'Quartier Bastos, Yaoundé, Centre, Cameroun',
};

export const MOCK_BENEFICIARIES: Beneficiary[] = [
    { id: 'b1', initials: 'MD', name: 'Marie Dupont',  country: 'France',        city: 'Paris',   currency: 'EUR', account: 'DMY-FR-45892', lastTransfer: '14 Jan 2025', color: '#C9A84C' },
    { id: 'b2', initials: 'PS', name: 'Peter Smith',   country: 'UK',            city: 'London',  currency: 'GBP', account: 'DMY-UK-29014', lastTransfer: '12 Jan 2025', color: '#2196F3' },
    { id: 'b3', initials: 'AM', name: 'Alain Mbarga',  country: 'Cameroun',      city: 'Douala',  currency: 'XAF', account: 'DMY-CM-88132', lastTransfer: '10 Jan 2025', color: '#4CAF50' },
    { id: 'b4', initials: 'FD', name: 'Fatou Diallo',  country: 'Sénégal',       city: 'Dakar',   currency: 'XOF', account: 'DMY-SN-33701', lastTransfer: null,          color: '#9C27B0', pending: true },
    { id: 'b5', initials: 'AH', name: 'Ahmed Hassan',  country: 'UAE',           city: 'Dubai',   currency: 'AED', account: 'DMY-AE-67124', lastTransfer: '5 Jan 2025',  color: '#FF9800' },
    { id: 'b6', initials: 'BM', name: 'Brice Manga',   country: "Côte d'Ivoire", city: 'Abidjan', currency: 'XOF', account: 'DMY-CI-44219', lastTransfer: '30 Déc 2024', color: '#C9A84C' },
    { id: 'b7', initials: 'SA', name: 'Sophie Aumont', country: 'France',        city: 'Lyon',    currency: 'EUR', account: 'DMY-FR-11902', lastTransfer: '28 Déc 2024', color: '#E91E63' },
    { id: 'b8', initials: 'KN', name: 'Kofi Nkrumah',  country: 'Ghana',         city: 'Accra',   currency: 'GHS', account: 'DMY-GH-72834', lastTransfer: '3 Jan 2025',  color: '#388E3C', cancelled: true },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 't1', type: 'send',    name: 'Marie Dupont',  location: 'Paris, France',          currency: 'EUR', amountSent: 50_000, amountReceived: 76.28,   receivedCurrency: 'EUR', date: '14 Jan 2025', time: '14:32', status: 'completed', initials: 'MD', color: '#C9A84C' },
    { id: 't2', type: 'receive', name: 'Peter Smith',   location: 'London, UK',             currency: 'GBP', amountSent: 100,    amountReceived: 65_530,  receivedCurrency: 'XAF', date: '12 Jan 2025', time: '09:15', status: 'completed', initials: 'PS', color: '#2196F3' },
    { id: 't3', type: 'send',    name: 'Fatou Diallo',  location: 'Dakar, Sénégal',         currency: 'XOF', amountSent: 25_000, amountReceived: 25_125,  receivedCurrency: 'XOF', date: '9 Jan 2025',  time: '11:44', status: 'pending',   initials: 'FD', color: '#9C27B0' },
    { id: 't4', type: 'send',    name: 'Alain Mbarga',  location: 'Douala, Cameroun',       currency: 'XAF', amountSent: 50_000, amountReceived: 50_000,  receivedCurrency: 'XAF', date: '7 Jan 2025',  time: '16:20', status: 'completed', initials: 'AM', color: '#4CAF50' },
    { id: 't5', type: 'receive', name: 'Ahmed Hassan',  location: 'Dubai, UAE',             currency: 'AED', amountSent: 300,    amountReceived: 185_000, receivedCurrency: 'XAF', date: '5 Jan 2025',  time: '08:30', status: 'completed', initials: 'AH', color: '#FF9800' },
    { id: 't6', type: 'send',    name: 'Kofi Nkrumah',  location: 'Accra, Ghana',           currency: 'GHS', amountSent: 30_000, amountReceived: null,    receivedCurrency: 'GHS', date: '3 Jan 2025',  time: '13:05', status: 'cancelled', initials: 'KN', color: '#388E3C' },
    { id: 't7', type: 'send',    name: 'Brice Manga',   location: "Abidjan, Côte d'Ivoire", currency: 'XOF', amountSent: 80_000, amountReceived: 80_400,  receivedCurrency: 'XOF', date: '30 Déc 2024', time: '10:18', status: 'completed', initials: 'BM', color: '#C9A84C' },
    { id: 't8', type: 'receive', name: 'Sophie Aumont', location: 'Lyon, France',           currency: 'EUR', amountSent: 200,    amountReceived: 131_000, receivedCurrency: 'XAF', date: '28 Déc 2024', time: '15:50', status: 'completed', initials: 'SA', color: '#E91E63' },
];

export const MOCK_RATES: ExchangeRate[] = [
    { flag: '🇪🇺', name: 'Euro',             country: 'Zone Euro',      code: 'EUR', rate: 655.57, change:  0.2 },
    { flag: '🇺🇸', name: 'Dollar Américain', country: 'États-Unis',     code: 'USD', rate: 610.50, change: -0.1 },
    { flag: '🇬🇧', name: 'Livre Sterling',   country: 'Royaume-Uni',    code: 'GBP', rate: 775.30, change:  0.5 },
    { flag: '🇸🇳', name: 'Franc CFA Ouest',  country: 'Sénégal, Mali…', code: 'XOF', rate:   1.00, change:  0.0 },
    { flag: '🇦🇪', name: 'Dirham Émirati',   country: 'Émirats Arabes', code: 'AED', rate: 166.22, change:  0.1 },
    { flag: '🇨🇦', name: 'Dollar Canadien',  country: 'Canada',         code: 'CAD', rate: 449.80, change: -0.2 },
    { flag: '🇬🇭', name: 'Cedi Ghanéen',     country: 'Ghana',          code: 'GHS', rate:  41.30, change:  0.3 },
    { flag: '🇨🇳', name: 'Yuan Chinois',     country: 'Chine',          code: 'CNY', rate:  84.15, change:  0.4 },
    { flag: '🇯🇵', name: 'Yen Japonais',     country: 'Japon',          code: 'JPY', rate:   4.08, change: -0.3 },
    { flag: '🇳🇬', name: 'Naira Nigérian',   country: 'Nigeria',        code: 'NGN', rate:   0.38, change:  0.6 },
];