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
    const [activeSection, setActiveSection] = useState(0)
    const [notifs, setNotifs] = useState({ email: true, sms: false, push: true })

    return (
        <>
            <Topbar breadcrumb="PARAMÈTRES" title="Paramètres du Compte ⚙️" />
            <div className="p-8">
                <div className="grid grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="col-span-1">
                        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                            <p className="text-xs font-semibold text-[#888] tracking-[2px] px-5 pt-5 pb-3 uppercase">Sections</p>
                            <div className="divide-y divide-[#F8F7F4]">
                                {sections.map((s, idx) => (
                                    <button
                                        key={s.label}
                                        onClick={() => setActiveSection(idx)}
                                        className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-left transition-colors"
                                        style={
                                            activeSection === idx
                                                ? { background: 'rgba(201,168,76,0.08)', color: '#E8C878', fontWeight: 'bold' }
                                                : { color: '#666' }
                                        }
                                    >
                                        <span>{s.icon}</span>
                                        <span>{s.label}</span>
                                        {activeSection === idx && <span className="ml-auto text-[#C9A84C]">›</span>}
                                    </button>
                                ))}
                            </div>

                            {/* API info box */}
                            {activeSection === 4 && (
                                <div className="m-4 rounded-xl p-4" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}>
                                    <p className="text-xs font-bold text-[#C9A84C] mb-1">ℹ️ INTÉGRATION API</p>
                                    <p className="text-xs text-[#888]">Permet aux développeurs d accéder aux services DoMoney via notre API REST.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-span-3 rounded-2xl p-7" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                        {/* Profile */}
                        {activeSection === 0 && (
                            <>
                                <h3 className="text-lg font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Informations personnelles</h3>
                                <div className="w-14 h-0.5 rounded mb-6" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />

                                {/* Avatar */}
                                <div className="flex items-center gap-5 mb-7 p-5 rounded-xl" style={{ background: '#F8F7F4' }}>
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)', color: '#1A1A2E' }}>JP</div>
                                    <div>
                                        <p className="font-bold text-[#1A1A2E] text-lg" style={{ fontFamily: 'Georgia, serif' }}>Jean-Paul Nguetsop</p>
                                        <p className="text-[#888] text-sm">@jeanpaul237 · Douala, Cameroun</p>
                                        <p className="text-xs text-[#C9A84C] mt-1">✓ Compte vérifié · Membre depuis Jan 2025</p>
                                    </div>
                                    <button className="ml-auto btn-outline text-xs !px-3 !py-1.5">Changer la photo</button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {[
                                        { label: 'Prénom', value: 'Jean-Paul' },
                                        { label: 'Nom', value: 'Nguetsop' },
                                        { label: 'Email', value: 'jeanpaul@domoney.cm' },
                                        { label: 'Téléphone', value: '+237 6XX XXX XXX' },
                                    ].map((f) => (
                                        <div key={f.label}>
                                            <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">{f.label}</label>
                                            <input type="text" defaultValue={f.value} className="dm-input" />
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Pays de résidence</label>
                                    <select className="dm-input">
                                        <option>🇨🇲 Cameroun</option>
                                        <option>🇫🇷 France</option>
                                    </select>
                                </div>

                                <button className="btn-primary !w-auto px-8">Sauvegarder les modifications</button>
                            </>
                        )}

                        {/* Security */}
                        {activeSection === 1 && (
                            <>
                                <h3 className="text-lg font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Sécurité du compte</h3>
                                <div className="w-14 h-0.5 rounded mb-6" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Mot de passe actuel</label>
                                        <input type="password" placeholder="••••••••••••" className="dm-input" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Nouveau mot de passe</label>
                                        <input type="password" placeholder="Min. 8 caractères" className="dm-input" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Confirmer le mot de passe</label>
                                        <input type="password" placeholder="Répéter le mot de passe" className="dm-input" />
                                    </div>

                                    {/* 2FA */}
                                    <div className="rounded-xl p-4" style={{ background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.3)' }}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-[#1A1A2E] text-sm">🔐 Authentification à 2 facteurs</p>
                                                <p className="text-xs text-[#888] mt-0.5">Protège ton compte avec un code SMS ou une app d authentification</p>
                                            </div>
                                            <div className="w-12 h-6 rounded-full bg-[#4CAF50] relative cursor-pointer flex-shrink-0">
                                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow" />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn-primary !w-auto px-8">Modifier le mot de passe</button>
                                </div>
                            </>
                        )}

                        {/* Notifications */}
                        {activeSection === 2 && (
                            <>
                                <h3 className="text-lg font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Notifications</h3>
                                <div className="w-14 h-0.5 rounded mb-6" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />
                                <div className="space-y-4">
                                    {[
                                        { key: 'email', label: 'Notifications par email', sub: 'Reçois les confirmations et alertes par email' },
                                        { key: 'sms', label: 'Notifications SMS', sub: 'Reçois les alertes importantes par SMS' },
                                        { key: 'push', label: 'Notifications push', sub: 'Alertes en temps réel dans l\'application' },
                                    ].map((n) => (
                                        <div key={n.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F8F7F4' }}>
                                            <div>
                                                <p className="font-medium text-[#1A1A2E] text-sm">{n.label}</p>
                                                <p className="text-xs text-[#888] mt-0.5">{n.sub}</p>
                                            </div>
                                            <div
                                                onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                                                className="w-12 h-6 rounded-full relative cursor-pointer transition-colors"
                                                style={{ background: notifs[n.key as keyof typeof notifs] ? '#C9A84C' : '#E0D9CC' }}
                                            >
                                                <div
                                                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
                                                    style={{ left: notifs[n.key as keyof typeof notifs] ? '26px' : '4px' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Language */}
                        {activeSection === 3 && (
                            <>
                                <h3 className="text-lg font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Langue et devise</h3>
                                <div className="w-14 h-0.5 rounded mb-6" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Langue</label>
                                        <select className="dm-input">
                                            <option>🇫🇷 Français</option>
                                            <option>🇬🇧 English</option>
                                            <option>🇪🇸 Español</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Devise par défaut</label>
                                        <select className="dm-input">
                                            <option>🇨🇲 XAF — Franc CFA</option>
                                            <option>🇫🇷 EUR — Euro</option>
                                            <option>🇺🇸 USD — Dollar américain</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Fuseau horaire</label>
                                        <select className="dm-input">
                                            <option>Africa/Douala (UTC+1)</option>
                                            <option>Europe/Paris (UTC+2)</option>
                                            <option>America/New_York (UTC-5)</option>
                                        </select>
                                    </div>
                                    <button className="btn-primary !w-auto px-8">Sauvegarder</button>
                                </div>
                            </>
                        )}

                        {/* API */}
                        {activeSection === 4 && (
                            <>
                                <h3 className="text-lg font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Intégration API</h3>
                                <div className="w-14 h-0.5 rounded mb-6" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />
                                <div className="rounded-xl p-5 mb-5" style={{ background: '#F8F7F4', border: '1px solid #E0D9CC' }}>
                                    <p className="text-xs font-semibold text-[#888] tracking-wider uppercase mb-2">Clé API (masquée)</p>
                                    <div className="flex items-center gap-3">
                                        <input type="password" defaultValue="dmk_live_xxxxxxxxxxxxxxxxxxxx" className="dm-input flex-1 font-mono" readOnly />
                                        <button className="btn-outline !px-3 !py-2 text-xs">Copier</button>
                                        <button className="btn-outline !px-3 !py-2 text-xs !border-red-300 !text-red-400">Révoquer</button>
                                    </div>
                                </div>
                                <div className="rounded-xl p-4" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}>
                                    <p className="text-xs font-bold text-[#C9A84C] mb-1">⚠️ SÉCURITÉ</p>
                                    <p className="text-xs text-[#888]">Ne partagez jamais votre clé API. Révoquez-la immédiatement si vous suspectez une compromission.</p>
                                </div>
                                <div className="mt-4">
                                    <button className="btn-primary !w-auto px-8">Générer une nouvelle clé</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
