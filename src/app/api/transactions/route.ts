import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'
import getDb from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const db = getDb()

    let query = `
    SELECT t.*, b.prenom as benef_prenom, b.nom as benef_nom, b.pays as benef_pays, b.flag as benef_flag, b.color as benef_color
    FROM transactions t
    LEFT JOIN beneficiaires b ON t.beneficiaire_id = b.id
    WHERE t.sender_id = ?
  `
    const queryParams: any[] = [userId]

    if (status) { query += ' AND t.status = ?'; queryParams.push(status) }
    if (type)   { query += ' AND t.type = ?';   queryParams.push(type) }

    query += ' ORDER BY t.created_at DESC LIMIT ? OFFSET ?'
    queryParams.push(limit, offset)

    const transactions = db.prepare(query).all(...queryParams)
    const total = (db.prepare(
        'SELECT COUNT(*) as c FROM transactions WHERE sender_id = ?'
    ).get(userId) as any).c

    return NextResponse.json({
        transactions,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
}

export async function POST(request: NextRequest) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const body = await request.json()
    const { beneficiaireId, amountSent, currencyFrom, currencyTo, motif, message, pin } = body

    if (!beneficiaireId || !amountSent || !currencyFrom || !currencyTo || !pin) {
        return NextResponse.json(
            { error: 'Champs requis : beneficiaireId, amountSent, currencyFrom, currencyTo, pin' },
            { status: 400 }
        )
    }
    if (amountSent <= 0) {
        return NextResponse.json({ error: 'Le montant doit être supérieur à 0' }, { status: 400 })
    }

    const db = getDb()

    // Vérifier l'utilisateur
    const sender = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any
    if (!sender) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    // Vérifier le PIN
    const pinValid = await bcrypt.compare(pin, sender.pin)
    if (!pinValid) return NextResponse.json({ error: 'PIN incorrect' }, { status: 401 })

    // Vérifier le bénéficiaire
    const benef = db.prepare('SELECT * FROM beneficiaires WHERE id = ? AND user_id = ?').get(beneficiaireId, userId) as any
    if (!benef) return NextResponse.json({ error: 'Bénéficiaire introuvable' }, { status: 404 })

    // Calcul des frais
    const fees = Math.round(amountSent * 0.005)
    const totalDeducted = amountSent + fees

    if (sender.balance < totalDeducted) {
        return NextResponse.json(
            { error: `Solde insuffisant. Disponible: ${sender.balance} XAF, Requis: ${totalDeducted} XAF` },
            { status: 400 }
        )
    }

    // Obtenir le taux de change
    let exchangeRate = 1
    let amountReceived = amountSent
    if (currencyFrom !== currencyTo) {
        const rate = db.prepare(
            'SELECT rate FROM exchange_rates WHERE from_currency = ? AND to_currency = ?'
        ).get(currencyFrom, currencyTo) as any
        if (!rate) return NextResponse.json({ error: `Taux ${currencyFrom}/${currencyTo} introuvable` }, { status: 404 })
        exchangeRate = rate.rate
        amountReceived = (amountSent - fees) / exchangeRate
    }

    // Transaction atomique : créer la transaction + débiter le solde
    const txId = randomUUID().replace(/-/g, '')
    const doTransaction = db.transaction(() => {
        db.prepare(`
      INSERT INTO transactions (id, sender_id, beneficiaire_id, type, status, amount_sent, amount_received, currency_from, currency_to, exchange_rate, fees, motif, message)
      VALUES (?, ?, ?, 'envoi', 'completed', ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(txId, userId, beneficiaireId, amountSent, amountReceived, currencyFrom, currencyTo, exchangeRate, fees, motif || null, message || null)

        db.prepare('UPDATE users SET balance = balance - ? WHERE id = ?').run(totalDeducted, userId)
        db.prepare("UPDATE beneficiaires SET last_sent = datetime('now') WHERE id = ?").run(beneficiaireId)
    })

    doTransaction()

    const transaction = db.prepare(`
    SELECT t.*, b.prenom as benef_prenom, b.nom as benef_nom, b.pays as benef_pays, b.flag as benef_flag
    FROM transactions t
    LEFT JOIN beneficiaires b ON t.beneficiaire_id = b.id
    WHERE t.id = ?
  `).get(txId)

    return NextResponse.json({ transaction }, { status: 201 })
}