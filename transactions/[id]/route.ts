import { NextRequest, NextResponse } from 'next/server'
import getDb from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const db = getDb()
    const tx = db.prepare(`
    SELECT t.*, b.prenom as benef_prenom, b.nom as benef_nom, b.pays as benef_pays, b.flag as benef_flag
    FROM transactions t
    LEFT JOIN beneficiaires b ON t.beneficiaire_id = b.id
    WHERE t.id = ? AND t.sender_id = ?
  `).get(params.id, userId)

    if (!tx) return NextResponse.json({ error: 'Transaction introuvable' }, { status: 404 })
    return NextResponse.json({ transaction: tx })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const body = await request.json()
    const { status } = body

    if (status !== 'cancelled') {
        return NextResponse.json({ error: 'Seul le statut "cancelled" est autorisé' }, { status: 400 })
    }

    const db = getDb()
    const tx = db.prepare(
        "SELECT * FROM transactions WHERE id = ? AND sender_id = ? AND status = 'pending'"
    ).get(params.id, userId) as any

    if (!tx) return NextResponse.json({ error: 'Transaction introuvable ou déjà traitée' }, { status: 404 })

    // Annuler et rembourser
    const cancel = db.transaction(() => {
        db.prepare("UPDATE transactions SET status = 'cancelled', updated_at = datetime('now') WHERE id = ?").run(params.id)
        db.prepare('UPDATE users SET balance = balance + ? WHERE id = ?').run(tx.amount_sent + tx.fees, userId)
    })
    cancel()

    const transaction = db.prepare('SELECT * FROM transactions WHERE id = ?').get(params.id)
    return NextResponse.json({ transaction })
}