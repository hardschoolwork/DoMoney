import { NextRequest, NextResponse } from 'next/server'
import getDb from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const db = getDb()
    const user = db.prepare(
        'SELECT id, email, telephone, prenom, nom, username, pays, balance, currency, is_verified, created_at FROM users WHERE id = ?'
    ).get(userId)

    const txCount = (db.prepare('SELECT COUNT(*) as c FROM transactions WHERE sender_id = ?').get(userId) as any).c
    const bCount = (db.prepare('SELECT COUNT(*) as c FROM beneficiaires WHERE user_id = ?').get(userId) as any).c

    return NextResponse.json({ user, stats: { transactions: txCount, beneficiaires: bCount } })
}

export async function PUT(request: NextRequest) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const body = await request.json()
    const { prenom, nom, telephone, pays } = body

    const db = getDb()
    db.prepare(`
    UPDATE users SET prenom = ?, nom = ?, telephone = ?, pays = ?, updated_at = datetime('now') WHERE id = ?
  `).run(prenom, nom, telephone || null, pays, userId)

    const user = db.prepare(
        'SELECT id, email, telephone, prenom, nom, username, pays, balance, currency FROM users WHERE id = ?'
    ).get(userId)

    return NextResponse.json({ user })
}