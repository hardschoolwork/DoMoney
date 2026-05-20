import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/rate/convertir
// Body: { from: "XAF", to: "EUR", amount: 50000 }
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { from, to, amount } = body

        if (!from || !to || !amount) {
            return NextResponse.json({ error: 'Paramètres requis : from, to, amount' }, { status: 400 })
        }

        if (from === to) {
            return NextResponse.json({ from, to, amount, result: amount, rate: 1, fees: amount * 0.005 })
        }

        const rateRecord = await prisma.exchangeRate.findUnique({
            where: { fromCurrency_toCurrency: { fromCurrency: from, toCurrency: to } },
        })

        if (!rateRecord) {
            return NextResponse.json({ error: `Taux ${from}/${to} introuvable` }, { status: 404 })
        }

        const fees = amount * 0.005
        const result = (amount - fees) / rateRecord.rate

        return NextResponse.json({
            from, to, amount,
            result: Math.round(result * 100) / 100,
            rate: rateRecord.rate,
            fees: Math.round(fees),
            rateDisplay: `1 ${to} = ${rateRecord.rate} ${from}`,
        })
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
