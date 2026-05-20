export const MOCK_USER = {
    name: 'Jean-Paul N.',
    username: '@jeanpaul237',
    balance: 892500,
    currency: 'XAF',
}

export const NAV_ITEMS = [
    {
        section: 'PRINCIPAL',
        items: [
            { label: 'Tableau de bord', icon: '🏠', href: '/dashboard' },
            { label: "Envoyer de l'argent", icon: '💸', href: '/dashboard/transfert' },
            { label: 'Historique', icon: '📋', href: '/dashboard/historique' },
        ],
    },
    {
        section: 'GESTION',
        items: [
            { label: 'Bénéficiaires', icon: '👥', href: '/dashboard/beneficiaires' },
            { label: 'Taux de change', icon: '📊', href: '/dashboard/taux-change' },
        ],
    },
    {
        section: 'COMPTE',
        items: [
            { label: 'Paramètres', icon: '⚙️', href: '/dashboard/parametres' },
            { label: 'Support', icon: '💬', href: '/dashboard/support' },
        ],
    },
]

export const MOCK_BENEFICIAIRES = [
    { initials: 'MD', name: 'Marie Dupont', country: 'Paris, France', flag: '🇫🇷', currency: 'EUR', account: 'DMY-FR-45892', color: '#C9A84C', lastSent: '14 Jan 2025' },
    { initials: 'PS', name: 'Peter Smith', country: 'London, UK', flag: '🇬🇧', currency: 'GBP', account: 'DMY-GB-12034', color: '#2196F3', lastSent: '10 Jan 2025' },
    { initials: 'AM', name: 'Alain Mbarga', country: 'Douala, Cameroun', flag: '🇨🇲', currency: 'XAF', account: 'DMY-CM-88421', color: '#4CAF50', lastSent: '8 Jan 2025' },
    { initials: 'FD', name: 'Fatou Diallo', country: 'Dakar, Sénégal', flag: '🇸🇳', currency: 'XOF', account: 'DMY-SN-34567', color: '#9C27B0', lastSent: '5 Jan 2025' },
    { initials: 'LK', name: 'Léa Koffi', country: 'Abidjan, CI', flag: '🇨🇮', currency: 'XOF', account: 'DMY-CI-99123', color: '#FF5722', lastSent: '2 Jan 2025' },
    { initials: 'TM', name: 'Tunde Musa', country: 'Lagos, Nigeria', flag: '🇳🇬', currency: 'NGN', account: 'DMY-NG-55671', color: '#009688', lastSent: '28 Déc 2024' },
]

export const MOCK_TRANSACTIONS = [
    { id: 'TXN-001', type: 'envoi', recipient: 'Marie Dupont', country: '🇫🇷 Paris', amountSent: '75 000 XAF', amountReceived: '114.42 EUR', date: '14 Jan 2025', status: 'completed', initials: 'MD', color: '#C9A84C' },
    { id: 'TXN-002', type: 'reception', recipient: 'Peter Smith', country: '🇬🇧 London', amountSent: '200 GBP', amountReceived: '148 500 XAF', date: '12 Jan 2025', status: 'completed', initials: 'PS', color: '#2196F3' },
    { id: 'TXN-003', type: 'envoi', recipient: 'Fatou Diallo', country: '🇸🇳 Dakar', amountSent: '50 000 XAF', amountReceived: '84.25 EUR', date: '10 Jan 2025', status: 'pending', initials: 'FD', color: '#9C27B0' },
    { id: 'TXN-004', type: 'envoi', recipient: 'Alain Mbarga', country: '🇨🇲 Douala', amountSent: '30 000 XAF', amountReceived: '30 000 XAF', date: '8 Jan 2025', status: 'completed', initials: 'AM', color: '#4CAF50' },
    { id: 'TXN-005', type: 'envoi', recipient: 'Léa Koffi', country: '🇨🇮 Abidjan', amountSent: '25 000 XAF', amountReceived: '38.13 EUR', date: '5 Jan 2025', status: 'cancelled', initials: 'LK', color: '#FF5722' },
]

export const EXCHANGE_RATES = [
    { from: 'XAF', to: 'EUR', flag: '🇫🇷', rate: '655.57', change: '+0.12%', trend: 'up' },
    { from: 'XAF', to: 'USD', flag: '🇺🇸', rate: '609.00', change: '-0.08%', trend: 'down' },
    { from: 'XAF', to: 'GBP', flag: '🇬🇧', rate: '770.20', change: '+0.25%', trend: 'up' },
    { from: 'XAF', to: 'CAD', flag: '🇨🇦', rate: '443.80', change: '+0.05%', trend: 'up' },
    { from: 'XAF', to: 'NGN', flag: '🇳🇬', rate: '0.410',  change: '-1.20%', trend: 'down' },
    { from: 'XAF', to: 'XOF', flag: '🇸🇳', rate: '1.000',  change: '0.00%', trend: 'stable' },
    { from: 'XAF', to: 'CHF', flag: '🇨🇭', rate: '700.30', change: '+0.18%', trend: 'up' },
    { from: 'XAF', to: 'JPY', flag: '🇯🇵', rate: '4.05',   change: '-0.30%', trend: 'down' },
]