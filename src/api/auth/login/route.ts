import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email et mot de passe requis' },
                { status: 400 }
            )
        }

        // Trouver l'utilisateur
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return NextResponse.json(
                { error: 'Email ou mot de passe incorrect' },
                { status: 401 }
            )
        }

        // Vérifier le mot de passe
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            return NextResponse.json(
                { error: 'Email ou mot de passe incorrect' },
                { status: 401 }
            )
        }

        // Créer la session
        const token = generateToken()
        await prisma.session.create({
            data: {
                userId: user.id,
                token,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        })

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
                isVerified: user.isVerified,
            },
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
