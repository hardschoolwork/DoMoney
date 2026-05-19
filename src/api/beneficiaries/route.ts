import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// GET /api/beneficiaries — liste tous les bénéficiaires de l'utilisateur
export async function GET(request: NextRequest) {
    try {
        const userId = await verifyToken(request)
        if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search') || ''

        const beneficiaires = await prisma.beneficiaire.findMany({
            where: {
                userId,
                OR: search ? [
                    { nom: { contains: search } },
                    { prenom: { contains: search } },
                    { pays: { contains: search } },
                ] : undefined,
            },
            orderBy: { lastSent: 'desc' },
        })

        return NextResponse.json({ beneficiaires })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}

// POST /api/beneficiaries — ajouter un bénéficiaire
export async function POST(request: NextRequest) {
    try {
        const userId = await verifyToken(request)
        if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

        const body = await request.json()
        const { prenom, nom, email, telephone, pays, flag, currency, color } = body

        if (!prenom || !nom || !pays || !currency) {
            return NextResponse.json(
                { error: 'Champs requis : prenom, nom, pays, currency' },
                { status: 400 }
            )
        }

        // Générer un numéro de compte unique
        const countryCode = pays.slice(-2).toUpperCase()
        const accountNum = Math.floor(10000 + Math.random() * 90000)
        const account = `DMY-${countryCode}-${accountNum}`

        const beneficiaire = await prisma.beneficiaire.create({
            data: {
                userId, prenom, nom, email, telephone,
                pays, flag: flag || '🌍', currency,
                account, color: color || '#C9A84C',
            },
        })

        return NextResponse.json({ beneficiaire }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
