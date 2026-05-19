import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import getDb from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const db = getDb()
    let beneficiaires

    if (search) {
        beneficiaires = db.prepare(`
      SELECT * FROM beneficiaires
      WHERE user_id = ? AND (prenom LIKE ? OR nom LIKE ? OR pays LIKE ?)
      ORDER BY last_sent DESC
    `).all(userId, `%${search}%`, `%${search}%`, `%${search}%`)
    } else {
        beneficiaires = db.prepare(
            'SELECT * FROM beneficiaires WHERE user_id = ? ORDER BY last_sent DESC'
        ).all(userId)
    }

    return NextResponse.json({ beneficiaires })
}

export async function POST(request: NextRequest) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const body = await request.json()
    const { prenom, nom, email, telephone, pays, flag, currency, color } = body

    if (!prenom || !nom || !pays || !currency) {
        return NextResponse.json({ error: 'Champs requis : prenom, nom, pays, currency' }, { status: 400 })
    }

    const db = getDb()
    const id = randomUUID().replace(/-/g, '')

    // Générer un numéro de compte unique
    const code = pays.slice(-2).toUpperCase().replace(/[^A-Z]/g, 'XX').slice(0, 2)
    const num = Math.floor(10000 + Math.random() * 90000)
    const account = `DMY-${code}-${num}`

    db.prepare(`
    INSERT INTO beneficiaires (id, user_id, prenom, nom, email, telephone, pays, flag, currency, account, color)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, userId, prenom, nom, email || null, telephone || null, pays, flag || '🌍', currency, account, color || '#C9A84C')

    const beneficiaire = db.prepare('SELECT * FROM beneficiaires WHERE id = ?').get(id)
    return NextResponse.json({ beneficiaire }, { status: 201 })
}