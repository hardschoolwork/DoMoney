import Database from 'better-sqlite3'
import path from 'path'

// Le fichier domoney.db sera créé automatiquement à la racine du projet
const DB_PATH = path.join(process.cwd(), 'domoney.db')

let db: Database.Database

function getDb(): Database.Database {
    if (!db) {
        db = new Database(DB_PATH)
        db.pragma('journal_mode = WAL')
        db.pragma('foreign_keys = ON')
        initDb(db)
    }
    return db
}

// Création de toutes les tables au démarrage
function initDb(db: Database.Database) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id          TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      email       TEXT UNIQUE NOT NULL,
      telephone   TEXT UNIQUE,
      prenom      TEXT NOT NULL,
      nom         TEXT NOT NULL,
      username    TEXT UNIQUE NOT NULL,
      password    TEXT NOT NULL,
      pin         TEXT NOT NULL,
      pays        TEXT DEFAULT 'Cameroun',
      balance     REAL DEFAULT 0,
      currency    TEXT DEFAULT 'XAF',
      is_verified INTEGER DEFAULT 0,
      created_at  TEXT DEFAULT (datetime('now')),
      updated_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id         TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      user_id    TEXT NOT NULL,
      token      TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS beneficiaires (
      id         TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      user_id    TEXT NOT NULL,
      prenom     TEXT NOT NULL,
      nom        TEXT NOT NULL,
      email      TEXT,
      telephone  TEXT,
      pays       TEXT NOT NULL,
      flag       TEXT DEFAULT '🌍',
      currency   TEXT NOT NULL,
      account    TEXT UNIQUE NOT NULL,
      color      TEXT DEFAULT '#C9A84C',
      last_sent  TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id               TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      sender_id        TEXT NOT NULL,
      beneficiaire_id  TEXT,
      type             TEXT NOT NULL,
      status           TEXT DEFAULT 'pending',
      amount_sent      REAL NOT NULL,
      amount_received  REAL NOT NULL,
      currency_from    TEXT NOT NULL,
      currency_to      TEXT NOT NULL,
      exchange_rate    REAL NOT NULL,
      fees             REAL NOT NULL,
      motif            TEXT,
      message          TEXT,
      created_at       TEXT DEFAULT (datetime('now')),
      updated_at       TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (sender_id) REFERENCES users(id),
      FOREIGN KEY (beneficiaire_id) REFERENCES beneficiaires(id)
    );

    CREATE TABLE IF NOT EXISTS exchange_rates (
      id            TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      from_currency TEXT NOT NULL,
      to_currency   TEXT NOT NULL,
      rate          REAL NOT NULL,
      change_pct    REAL DEFAULT 0,
      trend         TEXT DEFAULT 'stable',
      updated_at    TEXT DEFAULT (datetime('now')),
      UNIQUE(from_currency, to_currency)
    );
  `)

    // Insérer les taux de change par défaut si la table est vide
    const count = db.prepare('SELECT COUNT(*) as c FROM exchange_rates').get() as { c: number }
    if (count.c === 0) {
        const insertRate = db.prepare(`
      INSERT OR IGNORE INTO exchange_rates (from_currency, to_currency, rate, change_pct, trend)
      VALUES (?, ?, ?, ?, ?)
    `)
        const rates = [
            ['XAF', 'EUR', 655.57,  0.12,  'up'],
            ['XAF', 'USD', 609.00, -0.08,  'down'],
            ['XAF', 'GBP', 770.20,  0.25,  'up'],
            ['XAF', 'CAD', 443.80,  0.05,  'up'],
            ['XAF', 'NGN', 0.41,   -1.20,  'down'],
            ['XAF', 'XOF', 1.00,    0.00,  'stable'],
            ['XAF', 'CHF', 700.30,  0.18,  'up'],
            ['XAF', 'JPY', 4.05,   -0.30,  'down'],
        ]
        rates.forEach(r => insertRate.run(...r))
    }

    // Insérer un utilisateur de test si la table est vide
    const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get() as { c: number }
    if (userCount.c === 0) {
        seedTestData(db)
    }
}

function seedTestData(db: Database.Database) {
    const bcrypt = require('bcryptjs')
    const hashedPwd = bcrypt.hashSync('DoMoney2025!', 10)
    const hashedPin = bcrypt.hashSync('1234', 10)

    const userId = require('crypto').randomUUID().replace(/-/g, '')

    db.prepare(`
    INSERT INTO users (id, email, telephone, prenom, nom, username, password, pin, pays, balance, currency, is_verified)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(userId, 'jeanpaul@domoney.cm', '+237600000000', 'Jean-Paul', 'Nguetsop', '@jeanpaul237', hashedPwd, hashedPin, 'Cameroun', 892500, 'XAF', 1)

    const benefs = [
        [require('crypto').randomUUID().replace(/-/g,''), userId, 'Marie', 'Dupont', 'marie@email.fr', null, 'Paris, France', '🇫🇷', 'EUR', 'DMY-FR-45892', '#C9A84C', '2025-01-14'],
        [require('crypto').randomUUID().replace(/-/g,''), userId, 'Peter', 'Smith', 'peter@email.co.uk', null, 'London, UK', '🇬🇧', 'GBP', 'DMY-GB-12034', '#2196F3', '2025-01-10'],
        [require('crypto').randomUUID().replace(/-/g,''), userId, 'Alain', 'Mbarga', null, '+237690000001', 'Douala, Cameroun', '🇨🇲', 'XAF', 'DMY-CM-88421', '#4CAF50', '2025-01-08'],
        [require('crypto').randomUUID().replace(/-/g,''), userId, 'Fatou', 'Diallo', 'fatou@email.sn', null, 'Dakar, Sénégal', '🇸🇳', 'XOF', 'DMY-SN-34567', '#9C27B0', '2025-01-05'],
        [require('crypto').randomUUID().replace(/-/g,''), userId, 'Léa', 'Koffi', 'lea@email.ci', null, 'Abidjan, CI', '🇨🇮', 'XOF', 'DMY-CI-99123', '#FF5722', '2025-01-02'],
        [require('crypto').randomUUID().replace(/-/g,''), userId, 'Tunde', 'Musa', 'tunde@email.ng', null, 'Lagos, Nigeria', '🇳🇬', 'NGN', 'DMY-NG-55671', '#009688', '2024-12-28'],
    ]

    const insertBenef = db.prepare(`
    INSERT INTO beneficiaires (id, user_id, prenom, nom, email, telephone, pays, flag, currency, account, color, last_sent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
    benefs.forEach(b => insertBenef.run(...b))
}

export default getDb
