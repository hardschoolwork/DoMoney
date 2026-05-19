'use client'

import { usePathname } from 'next/navigation'

// Mapping URL → titre de page
const PAGE_TITLES: Record<string, { breadcrumb: string; title: string }> = {
    '/dashboard':              { breadcrumb: 'TABLEAU DE BORD',  title: 'Bonjour, Jean-Paul 👋' },
    '/dashboard/transfert':    { breadcrumb: 'TRANSFERT',         title: "Envoyer de l'Argent 💸" },
    '/dashboard/historique':   { breadcrumb: 'HISTORIQUE',        title: 'Historique des Transactions 📋' },
    '/dashboard/beneficiaires':{ breadcrumb: 'BÉNÉFICIAIRES',     title: 'Mes Bénéficiaires 👥' },
    '/dashboard/taux-change':  { breadcrumb: 'TAUX DE CHANGE',    title: 'Taux de Change en Direct 📊' },
    '/dashboard/parametres':   { breadcrumb: 'PARAMÈTRES',        title: 'Paramètres du Compte ⚙️' },
}

export default function TopbarClient() {
    const pathname = usePathname()
    const page = PAGE_TITLES[pathname] ?? { breadcrumb: 'DOMONEY', title: 'Tableau de bord' }

    return (
        <header style={{
            position: 'fixed', top: 0, left: '280px', right: 0, height: '68px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 32px', zIndex: 30,
            background: 'rgba(250,248,244,0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #E0D9CC',
        }}>
            <div>
                <p style={{ color: '#999', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {page.breadcrumb}
                </p>
                <h1 style={{ color: '#1A1A2E', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
                    {page.title}
                </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Recherche */}
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#BBB', fontSize: '13px' }}>🔍</span>
                    <input type="text" placeholder="Rechercher..." style={{
                        background: '#F5F0E8', border: '1px solid #E0D9CC', borderRadius: '10px',
                        padding: '8px 12px 8px 34px', fontSize: '13px',
                        fontFamily: 'Georgia, serif', color: '#1A1A2E', width: '200px', outline: 'none',
                    }} />
                </div>

                {/* Cloche */}
                <div style={{ position: 'relative' }}>
                    <button style={{
                        width: '38px', height: '38px', borderRadius: '10px',
                        background: '#F0EDE5', border: 'none', cursor: 'pointer', fontSize: '16px',
                    }}>🔔</button>
                    <span style={{
                        position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px',
                        borderRadius: '50%', background: 'linear-gradient(135deg,#C9A84C,#E8C878)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '9px', fontWeight: 'bold', color: '#1A1A2E',
                    }}>3</span>
                </div>

                {/* Avatar */}
                <button style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: 'rgba(201,168,76,0.2)', border: 'none', cursor: 'pointer', fontSize: '18px',
                }}>👤</button>

                <div style={{ width: '1px', height: '28px', background: '#E0D9CC' }} />

                {/* Déconnexion */}
                <button
                    onClick={() => { localStorage.removeItem('domoney_token'); window.location.href = '/auth/login' }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 16px', borderRadius: '10px',
                        background: 'rgba(229,57,53,0.08)', border: '1.5px solid rgba(229,57,53,0.35)',
                        color: '#E53935', fontSize: '13px', fontWeight: 'bold',
                        cursor: 'pointer', fontFamily: 'Georgia, serif',
                    }}
                >
                    <span>🚪</span>
                    <span>Déconnexion</span>
                </button>
            </div>
        </header>
    )
}
