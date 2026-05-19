import { NextRequest, NextResponse } from 'next/server'

// Avec JWT, la déconnexion est gérée côté client (supprimer le token du localStorage)
// Cette route existe pour la compatibilité et les futures blacklists de token
export async function POST(request: NextRequest) {
    return NextResponse.json({ message: 'Déconnecté avec succès. Supprimez le token côté client.' })
}