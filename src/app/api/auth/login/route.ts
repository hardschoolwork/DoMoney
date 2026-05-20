import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import getDb from '@/lib/db'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
        }

        const db = getDb()
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any

        if (!user) {
            return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
        }

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
        }

        const token = signToken({ userId: user.id, email: user.email })

        return NextResponse.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                prenom: user.prenom,
                nom: user.nom,
                username: user.username,
                balance: user.balance,
                currency: user.currency,
                pays: user.pays,
                is_verified: user.is_verified,
            },
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}