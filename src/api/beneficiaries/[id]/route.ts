import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// GET /api/beneficiaries/:id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = await verifyToken(request)
        if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

        const beneficiaire = await prisma.beneficiaire.findFirst({
            where: { id: params.id, userId },
        })
        if (!beneficiaire) return NextResponse.json({ error: 'Bénéficiaire introuvable' }, { status: 404 })

        return NextResponse.json({ beneficiaire })
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}

// PUT /api/beneficiaries/:id — modifier un bénéficiaire
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = await verifyToken(request)
        if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

        const existing = await prisma.beneficiaire.findFirst({ where: { id: params.id, userId } })
        if (!existing) return NextResponse.json({ error: 'Bénéficiaire introuvable' }, { status: 404 })

        const body = await request.json()
        const { prenom, nom, email, telephone, pays, flag, currency, color } = body

        const beneficiaire = await prisma.beneficiaire.update({
            where: { id: params.id },
            data: { prenom, nom, email, telephone, pays, flag, currency, color },
        })

        return NextResponse.json({ beneficiaire })
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}

// DELETE /api/beneficiaries/:id — supprimer un bénéficiaire
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = await verifyToken(request)
        if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

        const existing = await prisma.beneficiaire.findFirst({ where: { id: params.id, userId } })
        if (!existing) return NextResponse.json({ error: 'Bénéficiaire introuvable' }, { status: 404 })

        await prisma.beneficiaire.delete({ where: { id: params.id } })

        return NextResponse.json({ message: 'Bénéficiaire supprimé avec succès' })
    } catch (error) {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
