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

    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    return NextResponse.json({ user })
}