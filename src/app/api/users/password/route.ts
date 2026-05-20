import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import getDb from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

export async function PUT(request: NextRequest) {
    const userId = getUserIdFromRequest(request)
    if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
        return NextResponse.json({ error: 'Mot de passe actuel et nouveau requis' }, { status: 400 })
    }
    if (newPassword.length < 8) {
        return NextResponse.json({ error: 'Nouveau mot de passe trop court (8 min)' }, { status: 400 })
    }

    const db = getDb()
    const user = db.prepare('SELECT password FROM users WHERE id = ?').get(userId) as any

    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 401 })

    const hashed = await bcrypt.hash(newPassword, 10)
    db.prepare("UPDATE users SET password = ?, updated_at = datetime('now') WHERE id = ?").run(hashed, userId)

    return NextResponse.json({ message: 'Mot de passe modifié avec succès' })
}