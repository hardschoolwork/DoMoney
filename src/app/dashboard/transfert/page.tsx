'use client'

import { useState } from 'react'
import Topbar from '@/components/topbar'
import { MOCK_BENEFICIAIRES } from '@/lib/constants'

export default function TransfertPage() {
    const [step, setStep] = useState(1)
    const [selectedBenef, setSelectedBenef] = useState(0)
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('XAF')

    const benef = MOCK_BENEFICIAIRES[selectedBenef]

    return (
        <>
            <Topbar breadcrumb="TRANSFERT" title="Envoyer de l'Argent 💸" />
            <div className="p-8">
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="flex items-center gap-2 bg-white rounded-xl px-5 py-2 shadow-sm" style={{ border: '1px solid #E0D9CC' }}>
                        {[
                            { n: 1, label: 'Destinataire' },
                            { n: 2, label: 'Montant' },
                            { n: 3, label: 'Confirmation' },
                        ].map((s, i) => (
                            <div key={s.n} className="flex items-center gap-2">
                                {i > 0 && <div className="w-8 h-px bg-[#E0D9CC]" />}
                                <button
                                    onClick={() => step > s.n && setStep(s.n)}
                                    className="flex items-center gap-2 text-sm font-medium"
                                    style={{ color: step === s.n ? '#C9A84C' : step > s.n ? '#1A1A2E' : '#BBB' }}
                                >
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                        style={
                                            step > s.n
                                                ? { background: '#4CAF50', color: '#fff' }
                                                : step === s.n
                                                    ? { background: 'linear-gradient(135deg, #C9A84C, #E8C878)', color: '#1A1A2E' }
                                                    : { background: '#E0D9CC', color: '#BBB' }
                                        }
                                    >
                                        {step > s.n ? '✓' : s.n}
                                    </div>
                                    {s.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Main form */}
                    <div className="col-span-2 rounded-2xl p-7" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                        {step === 1 && (
                            <>
                                <h3 className="text-lg font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Informations du transfert</h3>
                                <div className="w-14 h-0.5 rounded mb-6" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />

                                <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Sélectionner un bénéficiaire</label>
                                <div className="flex gap-2 mb-4">
                                    <input type="text" placeholder="🔍  Rechercher un bénéficiaire..." className="dm-input flex-1" />
                                    <button className="px-4 py-2 rounded-xl font-bold text-[#1A1A2E] text-lg" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }}>+</button>
                                </div>

                                <p className="text-xs text-[#888] mb-3">Contacts récents :</p>
                                <div className="flex gap-3 mb-5 flex-wrap">
                                    {MOCK_BENEFICIAIRES.slice(0, 4).map((b, idx) => (
                                        <button
                                            key={b.name}
                                            onClick={() => setSelectedBenef(idx)}
                                            className="flex flex-col items-center gap-1 w-[120px] py-3 rounded-xl transition-all"
                                            style={
                                                selectedBenef === idx
                                                    ? { background: 'linear-gradient(135deg, #1A1A2E, #16213E)', border: '2px solid #C9A84C' }
                                                    : { background: '#F8F7F4', border: '1.5px solid #E0D9CC' }
                                            }
                                        >
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                                style={selectedBenef === idx ? { color: '#E8C878' } : { color: b.color }}
                                            >
                                                {b.initials}
                                            </div>
                                            <span className={`text-xs font-medium ${selectedBenef === idx ? 'text-white' : 'text-[#444]'}`}>{b.name.split(' ')[0]}</span>
                                            <span className={`text-[10px] ${selectedBenef === idx ? 'text-[#9999BB]' : 'text-[#888]'}`}>{b.country.split(',')[0]} · {b.currency}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Selected benef card */}
                                <div className="rounded-xl p-4 mb-5 flex items-center gap-4" style={{ background: '#F5F3EE', border: '1.5px solid #E8C878' }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0" style={{ background: `${benef.color}22`, color: benef.color }}>{benef.initials}</div>
                                    <div>
                                        <p className="font-bold text-[#1A1A2E]">{benef.name}</p>
                                        <p className="text-[#666] text-sm">{benef.country}</p>
                                        <p className="text-[#888] text-xs">Compte : {benef.account} · {benef.currency}</p>
                                    </div>
                                    <span className="ml-auto text-[#4CAF50] text-sm">✓ Vérifié</span>
                                </div>

                                <div className="mb-5">
                                    <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Motif du transfert</label>
                                    <select className="dm-input">
                                        <option>Transfert famille</option>
                                        <option>Paiement service</option>
                                        <option>Business</option>
                                        <option>Autre</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Message (optionnel)</label>
                                    <textarea className="dm-input !h-20 resize-none" placeholder="Ajouter un message pour le destinataire..." />
                                </div>

                                <button className="btn-primary" onClick={() => setStep(2)}>CONTINUER → MONTANT</button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h3 className="text-lg font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Montant du transfert</h3>
                                <div className="w-14 h-0.5 rounded mb-6" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />

                                <div className="grid grid-cols-2 gap-4 mb-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Vous envoyez</label>
                                        <div className="flex gap-2">
                                            <select className="dm-input !w-24 !px-2 text-sm" value={currency} onChange={e => setCurrency(e.target.value)}>
                                                <option>XAF</option>
                                                <option>EUR</option>
                                                <option>USD</option>
                                            </select>
                                            <input type="number" className="dm-input flex-1 text-xl font-bold" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Le destinataire reçoit</label>
                                        <div className="dm-input flex items-center gap-2" style={{ borderColor: '#E8C878', background: '#FFFDF7' }}>
                                            <span className="text-xl">🇫🇷</span>
                                            <span className="text-sm font-bold text-[#C9A84C]">EUR</span>
                                            <span className="ml-auto text-xl font-bold text-[#E8C878]">{amount ? (parseFloat(amount) / 655.57).toFixed(2) : '0.00'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rate info */}
                                <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-[#888]">Taux de change</span>
                                        <span className="font-bold text-[#1A1A2E]">1 EUR = 655.57 XAF</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-[#888]">Frais (0.5%)</span>
                                        <span className="font-bold text-[#1A1A2E]">{amount ? (parseFloat(amount) * 0.005).toFixed(0) : '0'} XAF</span>
                                    </div>
                                    <div className="h-px bg-[#E0D9CC] my-2" />
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold text-[#1A1A2E]">Total débité</span>
                                        <span className="font-bold text-[#C9A84C]">{amount ? (parseFloat(amount) * 1.005).toFixed(0) : '0'} XAF</span>
                                    </div>
                                </div>

                                {/* Quick amounts */}
                                <p className="text-xs text-[#888] mb-2">Montants rapides :</p>
                                <div className="flex gap-2 mb-6">
                                    {['5 000', '10 000', '25 000', '50 000', '100 000'].map((v) => (
                                        <button
                                            key={v}
                                            onClick={() => setAmount(v.replace(' ', ''))}
                                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                            style={{ background: '#F0EDE5', color: '#666', border: '1px solid #E0D9CC' }}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <button className="btn-outline flex-1" onClick={() => setStep(1)}>← Retour</button>
                                    <button className="btn-primary flex-1" onClick={() => setStep(3)}>CONTINUER → CONFIRMER</button>
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <h3 className="text-lg font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Confirmer le transfert</h3>
                                <div className="w-14 h-0.5 rounded mb-6" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />

                                <div className="rounded-2xl p-5 mb-5" style={{ background: 'linear-gradient(135deg, #1A1A2E, #16213E)', border: '1px solid rgba(201,168,76,0.3)' }}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0" style={{ background: `${benef.color}33`, color: benef.color }}>{benef.initials}</div>
                                        <div>
                                            <p className="font-bold text-white">{benef.name}</p>
                                            <p className="text-[#9999BB] text-sm">{benef.country}</p>
                                        </div>
                                    </div>
                                    <div className="h-px bg-white/10 mb-4" />
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div><p className="text-[#9999BB]">Vous envoyez</p><p className="text-white font-bold text-lg">{amount || '0'} XAF</p></div>
                                        <div><p className="text-[#9999BB]">Reçoit</p><p className="font-bold text-lg" style={{ color: '#E8C878' }}>{amount ? (parseFloat(amount) / 655.57).toFixed(2) : '0'} EUR</p></div>
                                        <div><p className="text-[#9999BB]">Frais</p><p className="text-white font-medium">{amount ? (parseFloat(amount) * 0.005).toFixed(0) : '0'} XAF</p></div>
                                        <div><p className="text-[#9999BB]">Taux garanti</p><p className="text-[#4CAF50] font-medium">10 minutes ⏱</p></div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">PIN de confirmation</label>
                                    <div className="flex gap-3">
                                        {[1,2,3,4].map((i) => (
                                            <input key={i} type="password" maxLength={1} className="dm-input !w-14 !text-center text-xl font-bold" />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="btn-outline flex-1" onClick={() => setStep(2)}>← Modifier</button>
                                    <button className="btn-primary flex-1">✓ CONFIRMER L ENVOI</button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Summary sidebar */}
                    <div className="space-y-4">
                        <div className="rounded-2xl p-5" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                            <h4 className="font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Georgia, serif' }}>Récapitulatif</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-[#888]">Destinataire</span><span className="font-medium text-[#1A1A2E]">{benef.name}</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Pays</span><span className="font-medium text-[#1A1A2E]">{benef.flag} {benef.country}</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Devise</span><span className="font-medium text-[#1A1A2E]">{benef.currency}</span></div>
                                <div className="h-px bg-[#F0EDE5]" />
                                <div className="flex justify-between"><span className="text-[#888]">Montant</span><span className="font-bold text-[#C9A84C]">{amount || '—'} XAF</span></div>
                            </div>
                        </div>

                        <div className="rounded-2xl p-5" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}>
                            <p className="text-xs font-bold text-[#C9A84C] mb-2">⚡ Transfert instantané</p>
                            <p className="text-xs text-[#888]">Délai estimé : 1 à 5 minutes. Taux garanti 10 minutes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
