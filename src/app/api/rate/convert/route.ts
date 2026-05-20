import { NextRequest, NextResponse } from 'next/server'
import getDb from '@/lib/db'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { from, to, amount } = body

    if (!from || !to || !amount) {
        return NextResponse.json({ error: 'from, to et amount requis' }, { status: 400 })
    }
    if (from === to) {
        return NextResponse.json({ from, to, amount, result: amount, rate: 1, fees: Math.round(amount * 0.005) })
    }

    const db = getDb()
    const rate = db.prepare(
        'SELECT * FROM exchange_rates WHERE from_currency = ? AND to_currency = ?'
    ).get(from, to) as any

    if (!rate) return NextResponse.json({ error: `Taux ${from}/${to} introuvable` }, { status: 404 })

    const fees = Math.round(amount * 0.005)
    const result = Math.round(((amount - fees) / rate.rate) * 100) / 100

    return NextResponse.json({
        from, to, amount, result,
        rate: rate.rate,
        fees,
        change_pct: rate.change_pct,
        trend: rate.trend,
        display: `1 ${to} = ${rate.rate} ${from}`,
    })
}