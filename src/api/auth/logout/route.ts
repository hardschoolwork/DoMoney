import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization')
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '')
            await prisma.session.deleteMany({ where: { token } })
        }
        return NextResponse.json({ message: 'Déconnecté avec succès' })
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}