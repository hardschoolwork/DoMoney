'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image";

export default function LoginPage() {
    const [showPass, setShowPass] = useState(false)

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #FAFAF7, #F5F0E8)' }}>

            {/* Panneau gauche sombre */}
            <div style={{
                width: '580px', minHeight: '100vh', flexShrink: 0,
                background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Ligne or */}
                <div style={{ position: 'absolute', left: '60px', top: 0, width: '3px', height: '100%', background: 'linear-gradient(180deg,#C9A84C,#E8C878)', opacity: 0.3 }} />
                {/* Cercle déco */}
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(201,168,76,0.04)' }} />
                <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(201,168,76,0.03)' }} />

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '40px 60px 0' }}>
                    <Image
                        src="/logo.png"
                        alt="DoMoney"
                        width={42}
                        height={42}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#E8C878', fontSize: '22px', fontFamily: 'Georgia,serif' }}>DoMoney</div>
                        <div style={{ color: '#C9A84C', fontSize: '9px', letterSpacing: '3px' }}>TCHOKO TRANSFER</div>
                    </div>
                </div>

                {/* Tagline centre */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '42px', fontWeight: 'bold', color: '#FFFFFF', fontFamily: 'Georgia,serif', lineHeight: 1.2, marginBottom: '8px' }}>
                        Ton Argent,
                    </h2>
                    <h2 style={{
                        fontSize: '42px', fontWeight: 'bold', fontFamily: 'Georgia,serif', lineHeight: 1.2, marginBottom: '16px',
                        background: 'linear-gradient(135deg,#C9A84C,#E8C878)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        Partout au Monde
                    </h2>
                    <p style={{ color: '#9999BB', fontSize: '13px', letterSpacing: '1px', marginBottom: '48px' }}>
                        Transferts multi-devises en toute sécurité
                    </p>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '380px' }}>
                        {[
                            { v: '150+', l: 'Devises supportées' },
                            { v: '0.5%', l: 'Frais compétitifs' },
                        ].map(s => (
                            <div key={s.l} style={{
                                borderRadius: '12px', padding: '20px', textAlign: 'center',
                                background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(201,168,76,0.25)',
                            }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#E8C878', fontFamily: 'Georgia,serif' }}>{s.v}</div>
                                <div style={{ color: '#9999BB', fontSize: '11px', marginTop: '4px' }}>{s.l}</div>
                            </div>
                        ))}
                        <div style={{
                            gridColumn: '1/-1', borderRadius: '12px', padding: '20px', textAlign: 'center',
                            background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(201,168,76,0.25)',
                        }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#E8C878', fontFamily: 'Georgia,serif' }}>24/7</div>
                            <div style={{ color: '#9999BB', fontSize: '11px', marginTop: '4px' }}>Transferts instantanés disponibles</div>
                        </div>
                    </div>
                </div>

                <p style={{ textAlign: 'center', color: '#555577', fontSize: '10px', letterSpacing: '2px', padding: '24px' }}>
                    © 2025 DOMONEY · TOUS DROITS RÉSERVÉS
                </p>
            </div>

            {/* Panneau droit — formulaire */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 60px' }}>
                <div style={{
                    width: '100%', maxWidth: '480px',
                    background: '#FFFFFF', borderRadius: '20px',
                    padding: '44px 44px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A1A2E', fontFamily: 'Georgia,serif', marginBottom: '6px' }}>
                        Bon Retour 👋
                    </h2>
                    <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px', fontFamily: 'Georgia,serif' }}>
                        Connecte-toi à ton compte DoMoney
                    </p>
                    <div className="gold-divider" />

                    {/* Email */}
                    <div style={{ marginBottom: '18px' }}>
                        <label className="field-label">Email / Téléphone</label>
                        <div style={{ position: 'relative' }}>
                            <input type="text" placeholder="exemple@email.com" className="dm-input" style={{ paddingRight: '44px' }} />
                            <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#C9A84C' }}>✉</span>
                        </div>
                    </div>

                    {/* Mot de passe */}
                    <div style={{ marginBottom: '12px' }}>
                        <label className="field-label">Mot de passe</label>
                        <div style={{ position: 'relative' }}>
                            <input type={showPass ? 'text' : 'password'} placeholder="••••••••••••" className="dm-input" style={{ paddingRight: '44px' }} />
                            <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#C9A84C', fontSize: '16px' }}>👁</button>
                        </div>
                    </div>

                    {/* Oublié */}
                    <div style={{ textAlign: 'right', marginBottom: '24px' }}>
                        <Link href="#" style={{ color: '#C9A84C', fontSize: '13px', textDecoration: 'none', fontFamily: 'Georgia,serif' }}>
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    <button className="btn-primary" style={{ marginBottom: '20px' }}>SE CONNECTER</button>

                    {/* Séparateur */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ flex: 1, height: '1px', background: '#E0D9CC' }} />
                        <span style={{ color: '#BBB', fontSize: '12px' }}>ou</span>
                        <div style={{ flex: 1, height: '1px', background: '#E0D9CC' }} />
                    </div>

                    <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '14px', fontFamily: 'Georgia,serif' }}>
                        Pas encore de compte ?
                    </p>
                    <Link href="/auth/inscription">
                        <button className="btn-outline" style={{ width: '100%' }}>CRÉER UN COMPTE</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
