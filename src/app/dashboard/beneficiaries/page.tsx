'use client'

import { useState } from 'react'
import Topbar from '@/components/topbar'
import { MOCK_BENEFICIAIRES } from '@/lib/constants'

type Beneficiaire = {
    initials: string; name: string; country: string; flag: string
    currency: string; account: string; color: string; lastSent: string
}

const regions = ['Tous', 'Europe', 'Afrique', 'Amériques', 'Asie']

export default function BeneficiairesPage() {
    const [search, setSearch] = useState('')
    const [region, setRegion] = useState('Tous')

    const filtered = (MOCK_BENEFICIAIRES as Beneficiaire[]).filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.country.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <Topbar breadcrumb="BÉNÉFICIAIRES" title="Mes Bénéficiaires 👥" />
            <div style={{ padding: '28px 32px' }}>

                {/* Barre de contrôles */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <input
                        type="text" placeholder="🔍  Rechercher un bénéficiaire..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="dm-input" style={{ width: '280px', padding: '9px 14px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#888', fontSize: '13px' }}>Pays :</span>
                        {regions.map(r => (
                            <button key={r} onClick={() => setRegion(r)} style={{
                                padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                                border: 'none', cursor: 'pointer',
                                background: region === r ? 'linear-gradient(135deg,#C9A84C,#E8C878)' : '#F0EDE5',
                                color: region === r ? '#1A1A2E' : '#666',
                            }}>{r}</button>
                        ))}
                    </div>
                    <span style={{ color: '#888', fontSize: '12px', marginLeft: 'auto' }}>{filtered.length} bénéficiaires</span>
                    <button className="btn-outline" style={{ padding: '8px 18px' }}>+ Ajouter</button>
                </div>


                {/* Grille */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
                    {filtered.map(b => (
                        <div key={b.name} className="dm-card" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                                <div style={{
                                    width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                                    background: b.color + '22', color: b.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '18px', fontWeight: 'bold',
                                }}>{b.initials}</div>
                                <div>
                                    <p style={{ fontWeight: 'bold', fontSize: '15px', color: '#1A1A2E', fontFamily: 'Georgia,serif' }}>{b.name}</p>
                                    <p style={{ color: '#888', fontSize: '12px' }}>{b.flag} {b.country}</p>
                                    <p style={{ color: '#C9A84C', fontSize: '11px', marginTop: '2px' }}>{b.currency} · {b.account}</p>
                                </div>
                            </div>
                            <p style={{ color: '#888', fontSize: '11px', marginBottom: '14px' }}>Dernier envoi : {b.lastSent}</p>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <a href="/dashboard/transfert" style={{ flex: 1 }}>
                                    <button style={{
                                        width: '100%', padding: '9px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold',
                                        background: 'linear-gradient(135deg,#1A1A2E,#16213E)',
                                        color: '#E8C878', border: '1px solid rgba(201,168,76,0.3)', cursor: 'pointer',
                                    }}>💸 Envoyer</button>
                                </a>
                                <button style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #E0D9CC', background: '#fff', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
                                <button style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #E0D9CC', background: '#fff', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                            </div>
                        </div>
                    ))}

                    {/* Carte ajout */}
                    <div style={{
                        borderRadius: '16px', padding: '20px', minHeight: '150px',
                        border: '2px dashed #C9A84C', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer',
                    }}>
                        <div style={{
                            width: '52px', height: '52px', borderRadius: '50%',
                            border: '2px dashed #C9A84C', color: '#C9A84C',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
                        }}>+</div>
                        <p style={{ fontWeight: 'bold', color: '#C9A84C', fontSize: '14px', fontFamily: 'Georgia,serif' }}>Ajouter un bénéficiaire</p>
                        <p style={{ color: '#888', fontSize: '11px', textAlign: 'center', maxWidth: '180px' }}>
                            Enregistre un nouveau contact pour vos prochains transferts
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}
