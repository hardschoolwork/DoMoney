import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'domoney_fallback_secret_2025'

export interface JwtPayload {
    userId: string
    email: string
}

export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyTokenFromRequest(request: NextRequest): JwtPayload | null {
    try {
        const authHeader = request.headers.get('Authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) return null
        const token = authHeader.replace('Bearer ', '')
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
        return decoded
    } catch {
        return null
    }
}

export function getUserIdFromRequest(request: NextRequest): string | null {
    const payload = verifyTokenFromRequest(request)
    return payload ? payload.userId : null
}