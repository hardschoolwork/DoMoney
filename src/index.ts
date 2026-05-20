export type Currency =
    | 'XAF' | 'USD' | 'EUR' | 'GBP' | 'CAD'
    | 'AED' | 'XOF' | 'GHS' | 'CNY' | 'JPY' | 'NGN';

export type TransactionStatus = 'completed' | 'pending' | 'cancelled';
export type TransactionType   = 'send' | 'receive';
export type ButtonVariant     = 'dark' | 'gold' | 'outline' | 'ghost';
export type ButtonSize        = 'sm' | 'md' | 'lg';
export type BadgeColor        = 'success' | 'pending' | 'danger' | 'info' | 'gold';

// ─── Entités métier ───────────────────────────────────────────────────────────

export interface User {
    id:            string;
    firstName:     string;
    lastName:      string;
    username:      string;
    email:         string;
    phone:         string;
    country:       string;
    currency:      Currency;
    balance:       number;
    accountNumber: string;
    verified:      boolean;
    birthdate:     string;
    address:       string;
}

export interface Beneficiary {
    id:           string;
    initials:     string;
    name:         string;
    country:      string;
    city:         string;
    currency:     Currency;
    account:      string;
    lastTransfer: string | null;
    color:        string;
    pending?:     boolean;
    cancelled?:   boolean;
}

export interface Transaction {
    id:               string;
    type:             TransactionType;
    name:             string;
    location:         string;
    currency:         Currency;
    amountSent:       number;
    amountReceived:   number | null;
    receivedCurrency: Currency;
    date:             string;
    time:             string;
    status:           TransactionStatus;
    initials:         string;
    color:            string;
}

export interface ExchangeRate {
    flag:    string;
    name:    string;
    country: string;
    code:    Currency;
    rate:    number;
    change:  number;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface AppContextValue {
    user:          User;
    notifications: number;
}