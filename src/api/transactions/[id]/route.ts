import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// GET /api/transactions/:id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = await verifyToken(request)
        if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

        const transaction = await prisma.transaction.findFirst({
            where: {
                id: params.id,
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            include: {
                beneficiaire: true,
                sender:   { select: { prenom: true, nom: true, email: true } },
                receiver: { select: { prenom: true, nom: true, email: true } },
            },
        })

        if (!transaction) return NextResponse.json({ error: 'Transaction introuvable' }, { status: 404 })
        return NextResponse.json({ transaction })
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}

// PUT /api/transactions/:id — annuler une transaction (si pending)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = await verifyToken(request)
        if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

        const body = await request.json()
        const { status } = body

        if (status !== 'cancelled') {
            return NextResponse.json({ error: 'Seul le statut "cancelled" est accepté' }, { status: 400 })
        }

        const existing = await prisma.transaction.findFirst({
            where: { id: params.id, senderId: userId, status: 'pending' },
        })
        if (!existing) {
            return NextResponse.json({ error: 'Transaction introuvable ou déjà traitée' }, { status: 404 })
        }

        // Rembourser l'utilisateur
        const [transaction] = await prisma.$transaction([
            prisma.transaction.update({ where: { id: params.id }, data: { status: 'cancelled' } }),
            prisma.user.update({
                where: { id: userId },
                data: { balance: { increment: existing.amountSent + existing.fees } },
            }),
        ])

        return NextResponse.json({ transaction })
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
