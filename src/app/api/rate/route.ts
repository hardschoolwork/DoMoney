import { NextRequest, NextResponse } from 'next/server'
import getDb from '@/lib/db'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from') || 'XAF'

    const db = getDb()
    const taux = db.prepare(
        'SELECT * FROM exchange_rates WHERE from_currency = ? ORDER BY to_currency'
    ).all(from)

    return NextResponse.json({ taux, updatedAt: new Date().toISOString() })
}