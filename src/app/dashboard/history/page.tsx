'use client'

import { useState } from 'react'
import Topbar from '@/components/topbar'
import { MOCK_TRANSACTIONS } from '@/lib/constants'

const summaryStats = [
    { label: 'TOTAL ENVOYÉ',  value: '892 500 XAF', sub: '↑ 24 transactions', subColor: '#C62828' },
    { label: 'TOTAL REÇU',    value: '570 500 XAF', sub: '↓ 12 transactions', subColor: '#2E7D32' },
    { label: 'EN ATTENTE',    value: '75 000 XAF',  sub: '⏳ 3 transactions',  subColor: '#E65100' },
    { label: 'FRAIS PAYÉS',   value: '4 460 XAF',   sub: '0.5% moy.',          subColor: '#888' },
]

const filters = [ 'Complétés', 'En attente', 'Annulés', 'Envois', 'Reçus', 'Tous']

export default function HistoriquePage() {
    const [active, setActive] = useState('Tous')

    return (
        <>
            <Topbar breadcrumb="HISTORIQUE" title="Historique des Transactions 📋" />
            <div style={{ padding: '28px 32px' }}>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
                    {summaryStats.map(s => (
                        <div key={s.label} className="dm-card" style={{ padding: '20px' }}>
                            <p style={{ fontSize: '10px', color: '#999', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</p>
                            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1A1A2E', fontFamily: 'Georgia,serif' }}>{s.value}</p>
                            <p style={{ fontSize: '11px', marginTop: '4px', fontWeight: 600, color: s.subColor }}>{s.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="dm-card" style={{ padding: 0, overflow: 'hidden' }}>
                    {/* Barre filtres */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 24px', borderBottom: '1px solid #F0EDE5', flexWrap: 'wrap' }}>
                        <input type="text" placeholder="🔍  Rechercher une transaction..." className="dm-input" style={{ width: '280px', padding: '8px 14px' }} />
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {filters.map(f => (
                                <button key={f} onClick={() => setActive(f)} style={{
                                    padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                                    background: active === f ? 'linear-gradient(135deg,#C9A84C,#E8C878)' : '#F0EDE5',
                                    color: active === f ? '#1A1A2E' : '#666',
                                }}>{f}</button>
                            ))}
                        </div>
                    </div>

                    {/* En-tête */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: '80px 1fr 160px 160px 120px 120px',
                        gap: '12px', padding: '12px 24px',
                        background: '#FAFAF8', borderBottom: '1px solid #F0EDE5',
                    }}>
                        {['TYPE','DESTINATAIRE / EXPÉDITEUR','MONTANT ENVOYÉ','MONTANT REÇU','DATE','STATUT'].map(h => (
                            <p key={h} style={{ fontSize: '10px', fontWeight: 700, color: '#888', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</p>
                        ))}
                    </div>

                    {/* Lignes */}
                    {MOCK_TRANSACTIONS.map(tx => (
                        <div key={tx.id} style={{
                            display: 'grid', gridTemplateColumns: '80px 1fr 160px 160px 120px 120px',
                            gap: '12px', padding: '14px 24px', borderBottom: '1px solid #F8F7F4',
                            alignItems: 'center',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666' }}>
                                <span>{tx.type === 'envoi' ? '📤' : '📥'}</span>
                                <span style={{ fontSize: '11px' }}>{tx.type === 'envoi' ? 'Envoi' : 'Réception'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                                    background: tx.color + '22', color: tx.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '12px', fontWeight: 'bold',
                                }}>{tx.initials}</div>
                                <div>
                                    <p style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A2E' }}>{tx.recipient}</p>
                                    <p style={{ fontSize: '11px', color: '#888' }}>{tx.country}</p>
                                </div>
                            </div>
                            <p style={{ fontWeight: 'bold', fontSize: '13px', color: tx.type === 'envoi' ? '#C62828' : '#888' }}>
                                {tx.type === 'envoi' ? '-' : ''}{tx.amountSent}
                            </p>
                            <p style={{ fontWeight: 'bold', fontSize: '13px', color: tx.type === 'reception' ? '#2E7D32' : '#888' }}>
                                {tx.type === 'reception' ? '+' : ''}{tx.amountReceived}
                            </p>
                            <p style={{ fontSize: '12px', color: '#888' }}>{tx.date}</p>
                            <span className={tx.status === 'completed' ? 'badge-completed' : tx.status === 'pending' ? 'badge-pending' : 'badge-cancelled'}>
                {tx.status === 'recu' ? '✓ recu ' : tx.status === 'pending' ? '⏳ En attente' : '✕ Annulé'}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
