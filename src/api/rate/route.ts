import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/rate — tous les rate de change
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const from = searchParams.get('from') || 'XAF'

        const taux = await prisma.exchangeRate.findMany({
            where: { fromCurrency: from },
            orderBy: { toCurrency: 'asc' },
        })

        return NextResponse.json({ taux, updatedAt: new Date().toISOString() })
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
