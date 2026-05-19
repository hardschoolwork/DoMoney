import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// GET /api/transactions — liste les transactions de l'utilisateur
export async function GET(request: NextRequest) {
    try {
        const userId = await verifyToken(request)
        if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const type = searchParams.get('type')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const skip = (page - 1) * limit

        const where: any = {
            OR: [{ senderId: userId }, { receiverId: userId }],
        }
        if (status) where.status = status
        if (type) where.type = type

        const [transactions, total] = await Promise.all([
            prisma.transaction.findMany({
                where,
                include: {
                    beneficiaire: { select: { prenom: true, nom: true, pays: true, flag: true, color: true } },
                    sender:       { select: { prenom: true, nom: true } },
                    receiver:     { select: { prenom: true, nom: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip, take: limit,
            }),
            prisma.transaction.count({ where }),
        ])

        return NextResponse.json({
            transactions,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}

// POST /api/transactions — créer un transfert
export async function POST(request: NextRequest) {
    try {
        const userId = await verifyToken(request)
        if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

        const body = await request.json()
        const { beneficiaireId, amountSent, currencyFrom, currencyTo, motif, message, pin } = body

        if (!beneficiaireId || !amountSent || !currencyFrom || !currencyTo || !pin) {
            return NextResponse.json(
                { error: 'Champs requis : beneficiaireId, amountSent, currencyFrom, currencyTo, pin' },
                { status: 400 }
            )
        }

        // Vérifier le sender
        const sender = await prisma.user.findUnique({ where: { id: userId } })
        if (!sender) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

        // Vérifier le PIN
        const bcrypt = await import('bcryptjs')
        const pinValid = await bcrypt.compare(pin, sender.pin)
        if (!pinValid) return NextResponse.json({ error: 'PIN incorrect' }, { status: 401 })

        // Vérifier le bénéficiaire
        const beneficiaire = await prisma.beneficiaire.findFirst({
            where: { id: beneficiaireId, userId },
        })
        if (!beneficiaire) return NextResponse.json({ error: 'Bénéficiaire introuvable' }, { status: 404 })

        // Calcul des frais (0.5%)
        const fees = amountSent * 0.005
        const totalDeducted = amountSent + fees

        // Vérifier le solde
        if (sender.balance < totalDeducted) {
            return NextResponse.json(
                { error: `Solde insuffisant. Disponible: ${sender.balance} XAF, Requis: ${totalDeducted} XAF` },
                { status: 400 }
            )
        }

        // Obtenir le rate de change
        const rateRecord = await prisma.exchangeRate.findUnique({
            where: { fromCurrency_toCurrency: { fromCurrency: currencyFrom, toCurrency: currencyTo } },
        })
        const exchangeRate = rateRecord ? rateRecord.rate : 1
        const amountReceived = currencyFrom === currencyTo ? amountSent : amountSent / exchangeRate

        // Créer la transaction et débiter le solde (atomique)
        const [transaction] = await prisma.$transaction([
            prisma.transaction.create({
                data: {
                    senderId: userId,
                    beneficiaireId,
                    type: 'envoi',
                    status: 'completed',
                    amountSent,
                    amountReceived,
                    currencyFrom,
                    currencyTo,
                    exchangeRate,
                    fees,
                    motif,
                    message,
                },
                include: {
                    beneficiaire: { select: { prenom: true, nom: true, pays: true, flag: true } },
                },
            }),
            prisma.user.update({
                where: { id: userId },
                data: { balance: { decrement: totalDeducted } },
            }),
            prisma.beneficiaire.update({
                where: { id: beneficiaireId },
                data: { lastSent: new Date() },
            }),
        ])

        return NextResponse.json({ transaction }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
