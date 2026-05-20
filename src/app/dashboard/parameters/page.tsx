'use client'

import { useState } from 'react'
import Topbar from '@/components/topbar'

const sections = [
    { icon: '👤', label: 'Informations personnelles' },
    { icon: '🔐', label: 'Sécurité du compte' },
    { icon: '🔔', label: 'Notifications' },
    { icon: '🌍', label: 'Langue et devise' },
    { icon: '🔌', label: 'Intégration API' },
]

export default function ParametresPage() {
    const [active, setActive] = useState(0)
    const [notifs, setNotifs] = useState({ email: true, sms: false, push: true })

    return (
        <>
            <Topbar breadcrumb="PARAMÈTRES" title="Paramètres du Compte ⚙️" />
            <div style={{ padding: '28px 32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '20px' }}>

                    {/* Menu latéral */}
                    <div className="dm-card" style={{ padding: 0, overflow: 'hidden', alignSelf: 'start' }}>
                        <p style={{ fontSize: '9px', fontWeight: 700, color: '#888', letterSpacing: '2px', padding: '16px 20px 8px', textTransform: 'uppercase' }}>SECTIONS</p>
                        {sections.map((s, i) => (
                            <button key={s.label} onClick={() => setActive(i)} style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                width: '100%', padding: '12px 20px', textAlign: 'left',
                                background: active === i ? 'rgba(201,168,76,0.08)' : 'transparent',
                                border: 'none', borderBottom: '1px solid #F8F7F4',
                                color: active === i ? '#E8C878' : '#555',
                                fontWeight: active === i ? 'bold' : 'normal',
                                fontSize: '13px', cursor: 'pointer',
                                borderLeft: active === i ? '3px solid #C9A84C' : '3px solid transparent',
                                fontFamily: 'Georgia,serif',
                            }}>
                                <span>{s.icon}</span>
                                <span>{s.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Contenu */}
                    <div className="dm-card">
                        {active === 0 && (
                            <>
                                <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#1A1A2E', fontFamily: 'Georgia,serif', marginBottom: '4px' }}>Informations personnelles</h3>
                                <div className="gold-divider" />

                                {/* Avatar block */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#F8F7F4', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                                    <div style={{
                                        width: '72px', height: '72px', borderRadius: '50%', flexShrink: 0,
                                        background: 'linear-gradient(135deg,#C9A84C,#E8C878)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '24px', fontWeight: 'bold', color: '#1A1A2E',
                                    }}>JP</div>
                                    <div>
                                        <p style={{ fontWeight: 'bold', fontSize: '17px', color: '#1A1A2E', fontFamily: 'Georgia,serif' }}>Jean-Paul Nguetsop</p>
                                        <p style={{ color: '#888', fontSize: '13px' }}>@jeanpaul237 · Douala, Cameroun</p>
                                        <p style={{ color: '#C9A84C', fontSize: '11px', marginTop: '4px' }}>✓ Compte vérifié · Membre depuis Jan 2025</p>
                                    </div>
                                    <button className="btn-outline" style={{ marginLeft: 'auto', padding: '8px 16px', fontSize: '12px' }}>Changer la photo</button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                    {[
                                        { l: 'PRÉNOM', v: 'Jean-Paul' },
                                        { l: 'NOM', v: 'Nguetsop' },
                                        { l: 'EMAIL', v: 'jeanpaul@domoney.cm' },
                                        { l: 'TÉLÉPHONE', v: '+237 6XX XXX XXX' },
                                    ].map(f => (
                                        <div key={f.l}>
                                            <label className="field-label">{f.l}</label>
                                            <input type="text" defaultValue={f.v} className="dm-input" />
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label className="field-label">PAYS DE RÉSIDENCE</label>
                                    <select className="dm-input">
                                        <option>🇨🇲 Cameroun</option>
                                        <option>🇫🇷 France</option>
                                    </select>
                                </div>

                                <button className="btn-primary" style={{ width: 'auto', padding: '13px 32px', display: 'inline-block' }}>
                                    Sauvegarder les modifications
                                </button>
                            </>
                        )}

                        {active === 1 && (
                            <>
                                <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#1A1A2E', fontFamily: 'Georgia,serif', marginBottom: '4px' }}>Sécurité du compte</h3>
                                <div className="gold-divider" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { l: 'MOT DE PASSE ACTUEL', t: 'password', p: '••••••••••••' },
                                        { l: 'NOUVEAU MOT DE PASSE', t: 'password', p: 'Min. 8 caractères' },
                                        { l: 'CONFIRMER LE MOT DE PASSE', t: 'password', p: 'Répéter le mot de passe' },
                                    ].map(f => (
                                        <div key={f.l}>
                                            <label className="field-label">{f.l}</label>
                                            <input type={f.t} placeholder={f.p} className="dm-input" />
                                        </div>
                                    ))}
                                    <div style={{ background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.25)', borderRadius: '10px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: 'bold', fontSize: '13px', color: '#1A1A2E' }}>🔐 Authentification à 2 facteurs</p>
                                            <p style={{ fontSize: '11px', color: '#888', marginTop: '3px' }}>Protège ton compte avec un code SMS</p>
                                        </div>
                                        <div style={{ width: '48px', height: '26px', borderRadius: '13px', background: '#4CAF50', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
                                            <div style={{ position: 'absolute', right: '3px', top: '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff' }} />
                                        </div>
                                    </div>
                                    <button className="btn-primary" style={{ width: 'auto', padding: '13px 32px', display: 'inline-block' }}>Modifier le mot de passe</button>
                                </div>
                            </>
                        )}

                        {active === 2 && (
                            <>
                                <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#1A1A2E', fontFamily: 'Georgia,serif', marginBottom: '4px' }}>Notifications</h3>
                                <div className="gold-divider" />
                                {[
                                    { k: 'email', l: 'Notifications par email', s: 'Reçois les confirmations et alertes par email' },
                                    { k: 'sms', l: 'Notifications SMS', s: 'Reçois les alertes importantes par SMS' },
                                    { k: 'push', l: 'Notifications push', s: "Alertes en temps réel dans l'application" },
                                ].map(n => (
                                    <div key={n.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8F7F4', borderRadius: '10px', padding: '14px 16px', marginBottom: '10px' }}>
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: '13px', color: '#1A1A2E' }}>{n.l}</p>
                                            <p style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{n.s}</p>
                                        </div>
                                        <div
                                            onClick={() => setNotifs(p => ({ ...p, [n.k]: !p[n.k as keyof typeof p] }))}
                                            style={{ width: '48px', height: '26px', borderRadius: '13px', background: notifs[n.k as keyof typeof notifs] ? '#C9A84C' : '#DDDDDD', position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}
                                        >
                                            <div style={{ position: 'absolute', top: '3px', left: notifs[n.k as keyof typeof notifs] ? '25px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {active === 3 && (
                            <>
                                <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#1A1A2E', fontFamily: 'Georgia,serif', marginBottom: '4px' }}>Langue et devise</h3>
                                <div className="gold-divider" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { l: 'LANGUE', opts: ['🇫🇷 Français', '🇬🇧 English'] },
                                        { l: 'DEVISE PAR DÉFAUT', opts: ['🇨🇲 XAF — Franc CFA', '🇫🇷 EUR — Euro', '🇺🇸 USD — Dollar américain'] },
                                        { l: 'FUSEAU HORAIRE', opts: ['Africa/Douala (UTC+1)', 'Europe/Paris (UTC+2)'] },
                                    ].map(f => (
                                        <div key={f.l}>
                                            <label className="field-label">{f.l}</label>
                                            <select className="dm-input">{f.opts.map(o => <option key={o}>{o}</option>)}</select>
                                        </div>
                                    ))}
                                    <button className="btn-primary" style={{ width: 'auto', padding: '13px 32px', display: 'inline-block' }}>Sauvegarder</button>
                                </div>
                            </>
                        )}

                        {active === 4 && (
                            <>
                                <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#1A1A2E', fontFamily: 'Georgia,serif', marginBottom: '4px' }}>Intégration API</h3>
                                <div className="gold-divider" />
                                <div style={{ background: '#F8F7F4', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                                    <label className="field-label">CLÉ API (masquée)</label>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <input type="password" defaultValue="dmk_live_xxxxxxxxxxxxxxxxxxxx" className="dm-input" readOnly style={{ fontFamily: 'monospace' }} />
                                        <button className="btn-outline" style={{ padding: '10px 16px', whiteSpace: 'nowrap' }}>Copier</button>
                                        <button className="btn-outline" style={{ padding: '10px 16px', whiteSpace: 'nowrap', borderColor: '#E53935', color: '#E53935' }}>Révoquer</button>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '10px', padding: '14px', marginBottom: '20px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#C9A84C', marginBottom: '4px' }}>⚠️ SÉCURITÉ</p>
                                    <p style={{ fontSize: '11px', color: '#888' }}>Ne partagez jamais votre clé API. Révoquez-la immédiatement si vous suspectez une compromission.</p>
                                </div>
                                <button className="btn-primary" style={{ width: 'auto', padding: '13px 32px', display: 'inline-block' }}>Générer une nouvelle clé</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
