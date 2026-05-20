import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'
import getDb from '@/lib/db'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, telephone, prenom, nom, pays, password, pin } = body

        if (!email || !prenom || !nom || !password || !pin) {
            return NextResponse.json(
                { error: 'Champs requis : email, prenom, nom, password, pin' },
                { status: 400 }
            )
        }
        if (password.length < 8) {
            return NextResponse.json({ error: 'Mot de passe trop court (8 caractères min)' }, { status: 400 })
        }
        if (!/^\d{4}$/.test(pin)) {
            return NextResponse.json({ error: 'Le PIN doit être 4 chiffres' }, { status: 400 })
        }

        const db = getDb()

        // Vérifier email unique
        const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
        if (existing) {
            return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 409 })
        }

        const hashedPwd = await bcrypt.hash(password, 10)
        const hashedPin = await bcrypt.hash(pin, 10)
        const userId = randomUUID().replace(/-/g, '')
        const username = '@' + prenom.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 9000 + 1000)

        db.prepare(`
      INSERT INTO users (id, email, telephone, prenom, nom, username, password, pin, pays, balance, currency)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'XAF')
    `).run(userId, email, telephone || null, prenom, nom, username, hashedPwd, hashedPin, pays || 'Cameroun')

        const user = db.prepare('SELECT id, email, prenom, nom, username, pays, balance, currency, is_verified, created_at FROM users WHERE id = ?').get(userId)

        const token = signToken({ userId, email })

        return NextResponse.json({ user, token }, { status: 201 })
    } catch (error: any) {
        console.error('Register error:', error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
