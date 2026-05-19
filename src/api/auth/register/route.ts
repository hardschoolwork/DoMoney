import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, telephone, prenom, nom, pays, password, pin } = body

        // Validation
        if (!email || !prenom || !nom || !password || !pin) {
            return NextResponse.json(
                { error: 'Champs obligatoires manquants : email, prenom, nom, password, pin' },
                { status: 400 }
            )
        }
        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Le mot de passe doit contenir au moins 8 caractères' },
                { status: 400 }
            )
        }
        if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
            return NextResponse.json(
                { error: 'Le PIN doit être composé de 4 chiffres' },
                { status: 400 }
            )
        }

        // Vérifier si email déjà utilisé
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) {
            return NextResponse.json(
                { error: 'Cet email est déjà utilisé' },
                { status: 409 }
            )
        }

        // Hash password et pin
        const hashedPassword = await bcrypt.hash(password, 10)
        const hashedPin = await bcrypt.hash(pin, 10)

        // Générer un numéro de compte
        const username = '@' + prenom.toLowerCase() + Math.floor(Math.random() * 1000)

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                telephone,
                prenom,
                nom,
                username,
                password: hashedPassword,
                pin: hashedPin,
                pays: pays || 'Cameroun',
                balance: 0,
                currency: 'XAF',
            },
            select: {
                id: true, email: true, prenom: true, nom: true,
                username: true, pays: true, balance: true, currency: true, createdAt: true,
            },
        })

        // Créer une session
        const token = generateToken()
        await prisma.session.create({
            data: {
                userId: user.id,
                token,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
            },
        })

        return NextResponse.json({ user, token }, { status: 201 })
    } catch (error) {
        console.error('Register error:', error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
