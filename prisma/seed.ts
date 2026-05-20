import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Supprimer les données existantes
    await prisma.transaction.deleteMany()
    await prisma.beneficiaire.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()
    await prisma.exchangeRate.deleteMany()

    // Créer l'utilisateur principal
    const hashedPassword = await bcrypt.hash('DoMoney2025!', 10)
    const hashedPin = await bcrypt.hash('1234', 10)

    const user = await prisma.user.create({
        data: {
            email: 'jeanpaul@domoney.cm',
            telephone: '+237600000000',
            prenom: 'Jean-Paul',
            nom: 'Nguetsop',
            username: '@jeanpaul237',
            password: hashedPassword,
            pin: hashedPin,
            pays: 'Cameroun',
            balance: 892500,
            currency: 'XAF',
            isVerified: true,
        },
    })

    // Créer les bénéficiaires
    await prisma.beneficiaire.createMany({
        data: [
            { userId: user.id, prenom: 'Marie', nom: 'Dupont', email: 'marie@email.fr', pays: 'Paris, France', flag: '🇫🇷', currency: 'EUR', account: 'DMY-FR-45892', color: '#C9A84C', lastSent: new Date('2025-01-14') },
            { userId: user.id, prenom: 'Peter', nom: 'Smith', email: 'peter@email.co.uk', pays: 'London, UK', flag: '🇬🇧', currency: 'GBP', account: 'DMY-GB-12034', color: '#2196F3', lastSent: new Date('2025-01-10') },
            { userId: user.id, prenom: 'Alain', nom: 'Mbarga', telephone: '+237690000001', pays: 'Douala, Cameroun', flag: '🇨🇲', currency: 'XAF', account: 'DMY-CM-88421', color: '#4CAF50', lastSent: new Date('2025-01-08') },
            { userId: user.id, prenom: 'Fatou', nom: 'Diallo', email: 'fatou@email.sn', pays: 'Dakar, Sénégal', flag: '🇸🇳', currency: 'XOF', account: 'DMY-SN-34567', color: '#9C27B0', lastSent: new Date('2025-01-05') },
            { userId: user.id, prenom: 'Léa', nom: 'Koffi', email: 'lea@email.ci', pays: 'Abidjan, CI', flag: '🇨🇮', currency: 'XOF', account: 'DMY-CI-99123', color: '#FF5722', lastSent: new Date('2025-01-02') },
            { userId: user.id, prenom: 'Tunde', nom: 'Musa', email: 'tunde@email.ng', pays: 'Lagos, Nigeria', flag: '🇳🇬', currency: 'NGN', account: 'DMY-NG-55671', color: '#009688', lastSent: new Date('2024-12-28') },
        ],
    })

    // Taux de change
    await prisma.exchangeRate.createMany({
        data: [
            { fromCurrency: 'XAF', toCurrency: 'EUR', rate: 655.57, change: 0.12, trend: 'up' },
            { fromCurrency: 'XAF', toCurrency: 'USD', rate: 609.00, change: -0.08, trend: 'down' },
            { fromCurrency: 'XAF', toCurrency: 'GBP', rate: 770.20, change: 0.25, trend: 'up' },
            { fromCurrency: 'XAF', toCurrency: 'CAD', rate: 443.80, change: 0.05, trend: 'up' },
            { fromCurrency: 'XAF', toCurrency: 'NGN', rate: 0.41,  change: -1.20, trend: 'down' },
            { fromCurrency: 'XAF', toCurrency: 'XOF', rate: 1.00,  change: 0.00, trend: 'stable' },
            { fromCurrency: 'XAF', toCurrency: 'CHF', rate: 700.30, change: 0.18, trend: 'up' },
            { fromCurrency: 'XAF', toCurrency: 'JPY', rate: 4.05,  change: -0.30, trend: 'down' },
        ],
    })

    console.log('✅ Base de données initialisée avec succès !')
}

main().catch(console.error).finally(() => prisma.$disconnect())