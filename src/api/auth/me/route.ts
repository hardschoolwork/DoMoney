import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
    try {
        const userId = await verifyToken(request)
        if (!userId) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true, email: true, telephone: true, prenom: true, nom: true,
                username: true, pays: true, balance: true, currency: true,
                isVerified: true, createdAt: true,
            },
        })

        return NextResponse.json({ user })
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
