import { NextRequest, NextResponse } from 'next/server'
import getDb from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const db = getDb()
    const b = db.prepare('SELECT * FROM beneficiaires WHERE id = ? AND user_id = ?').get(params.id, userId)
    if (!b) return NextResponse.json({ error: 'Bénéficiaire introuvable' }, { status: 404 })

    return NextResponse.json({ beneficiaire: b })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const db = getDb()
    const existing = db.prepare('SELECT id FROM beneficiaires WHERE id = ? AND user_id = ?').get(params.id, userId)
    if (!existing) return NextResponse.json({ error: 'Bénéficiaire introuvable' }, { status: 404 })

    const body = await request.json()
    const { prenom, nom, email, telephone, pays, flag, currency, color } = body

    db.prepare(`
    UPDATE beneficiaires
    SET prenom = ?, nom = ?, email = ?, telephone = ?, pays = ?, flag = ?, currency = ?, color = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(prenom, nom, email || null, telephone || null, pays, flag, currency, color, params.id)

    const beneficiaire = db.prepare('SELECT * FROM beneficiaires WHERE id = ?').get(params.id)
    return NextResponse.json({ beneficiaire })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const db = getDb()
    const existing = db.prepare('SELECT id FROM beneficiaires WHERE id = ? AND user_id = ?').get(params.id, userId)
    if (!existing) return NextResponse.json({ error: 'Bénéficiaire introuvable' }, { status: 404 })

    db.prepare('DELETE FROM beneficiaires WHERE id = ?').run(params.id)
    return NextResponse.json({ message: 'Bénéficiaire supprimé avec succès' })
}