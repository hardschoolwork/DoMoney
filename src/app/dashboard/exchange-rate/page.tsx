'use client'

import { useState } from 'react'
import Topbar from '@/components/topbar'
import { EXCHANGE_RATES } from '@/lib/constants'

export default function TauxChangePage() {
    const [amount, setAmount] = useState('50000')

    return (
        <>
            <Topbar breadcrumb="TAUX DE CHANGE" title="Taux de Change en Direct 📊" />
            <div style={{ padding: '28px 32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>

                    {/* Convertisseur */}
                    <div>
                        <div style={{
                            borderRadius: '16px', padding: '24px', marginBottom: '16px',
                            background: 'linear-gradient(135deg,#1A1A2E,#16213E)',
                            border: '1px solid rgba(201,168,76,0.25)',
                        }}>
                            <h3 style={{ color: '#E8C878', fontWeight: 'bold', fontSize: '15px', fontFamily: 'Georgia,serif', marginBottom: '18px' }}>
                                Convertisseur rapide
                            </h3>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                {/* De */}
                                <div style={{ flex: 1, borderRadius: '10px', padding: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                        <span>🇨🇲</span>
                                        <span style={{ color: '#E8C878', fontWeight: 'bold', fontSize: '12px' }}>XAF ▼</span>
                                    </div>
                                    <input
                                        type="number" value={amount} onChange={e => setAmount(e.target.value)}
                                        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '20px', fontWeight: 'bold', width: '100%', fontFamily: 'Georgia,serif' }}
                                    />
                                </div>

                                {/* Swap */}
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                                    background: 'linear-gradient(135deg,#C9A84C,#E8C878)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '16px', fontWeight: 'bold', color: '#1A1A2E', cursor: 'pointer',
                                }}>⇄</div>

                                {/* Vers */}
                                <div style={{ flex: 1, borderRadius: '10px', padding: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                        <span>🇫🇷</span>
                                        <span style={{ color: '#E8C878', fontWeight: 'bold', fontSize: '12px' }}>EUR ▼</span>
                                    </div>
                                    <p style={{ color: '#E8C878', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Georgia,serif' }}>
                                        {(parseFloat(amount || '0') / 655.57).toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <p style={{ color: '#9999BB', fontSize: '11px', marginBottom: '16px' }}>
                                1 EUR = 655.57 XAF · Frais inclus · Taux garanti 10 min
                            </p>

                            <button style={{
                                width: '100%', padding: '13px', borderRadius: '10px',
                                background: 'linear-gradient(135deg,#C9A84C,#E8C878)',
                                border: 'none', color: '#1A1A2E', fontWeight: 'bold',
                                fontSize: '13px', letterSpacing: '1px', cursor: 'pointer',
                                fontFamily: 'Georgia,serif',
                            }}>Envoyer maintenant</button>
                        </div>

                        {/* Info API */}
                        <div className="dm-card" style={{ padding: '18px' }}>
                            <h4 style={{ fontWeight: 'bold', color: '#1A1A2E', fontSize: '14px', fontFamily: 'Georgia,serif', marginBottom: '14px' }}>Infos API Forex</h4>
                            {[
                                { l: 'Source', v: 'Open Exchange Rates' },
                                { l: 'Mise à jour', v: '● Live (15:44)', vc: '#4CAF50' },
                                { l: 'Fréquence', v: 'Toutes les 5 min' },
                            ].map(r => (
                                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                    <span style={{ color: '#888' }}>{r.l}</span>
                                    <span style={{ fontWeight: 500, color: r.vc || '#1A1A2E' }}>{r.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tableau des rate */}
                    <div className="dm-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid #F0EDE5' }}>
                            <h3 style={{ fontWeight: 'bold', color: '#1A1A2E', fontSize: '15px', fontFamily: 'Georgia,serif' }}>
                                Taux XAF vs Devises mondiales
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50' }} />
                                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#4CAF50' }}>LIVE</span>
                                <span style={{ fontSize: '11px', color: '#888', marginLeft: '8px' }}>Mis à jour: 15:44:30</span>
                            </div>
                        </div>

                        {EXCHANGE_RATES.map(r => (
                            <div key={r.to} style={{
                                display: 'flex', alignItems: 'center', gap: '16px',
                                padding: '14px 24px', borderBottom: '1px solid #F8F7F4',
                            }}>
                                <span style={{ fontSize: '20px', flexShrink: 0 }}>{r.flag}</span>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 'bold', color: '#1A1A2E', fontSize: '14px' }}>XAF / {r.to}</p>
                                    <p style={{ fontSize: '11px', color: '#888' }}>1 {r.to} = {r.rate} XAF</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1A1A2E', fontFamily: 'Georgia,serif' }}>{r.rate}</p>
                                    <p style={{ fontSize: '11px', fontWeight: 600, color: r.trend === 'up' ? '#2E7D32' : r.trend === 'down' ? '#C62828' : '#888' }}>
                                        {r.trend === 'up' ? '▲' : r.trend === 'down' ? '▼' : '—'} {r.change}
                                    </p>
                                </div>
                                <button style={{
                                    padding: '7px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold',
                                    background: 'rgba(201,168,76,0.1)', color: '#C9A84C',
                                    border: '1px solid rgba(201,168,76,0.3)', cursor: 'pointer', marginLeft: '8px',
                                }}>Envoyer</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
