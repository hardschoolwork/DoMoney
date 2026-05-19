'use client'

import { useState } from 'react'
import { MOCK_BENEFICIAIRES } from '@/lib/constants'

type Benef = typeof MOCK_BENEFICIAIRES[0]

const MOTIFS = ['Transfert famille', 'Paiement service', 'Scolarité', 'Santé', 'Business', 'Autre']
const MONTANTS_RAPIDES = [5000, 10000, 25000, 50000, 100000, 200000]

export default function TransfertPage() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
    const [selectedBenef, setSelectedBenef] = useState<Benef | null>(null)
    const [search, setSearch] = useState('')
    const [amount, setAmount] = useState('')
    const [motif, setMotif] = useState(MOTIFS[0])
    const [message, setMessage] = useState('')
    const [pin, setPin] = useState(['', '', '', ''])
    const [success, setSuccess] = useState(false)

    const solde = 892500
    const tauxEUR = 655.57
    const fees = amount ? Math.round(parseFloat(amount) * 0.005) : 0
    const amountReceived = amount ? ((parseFloat(amount) - fees) / tauxEUR).toFixed(2) : '0.00'
    const totalDeducted = amount ? parseFloat(amount) + fees : 0

    const filteredBenef = MOCK_BENEFICIAIRES.filter(b =>
        (b.name || `${b.initials}`).toLowerCase().includes(search.toLowerCase()) ||
        b.country.toLowerCase().includes(search.toLowerCase())
    )

    const handlePinChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return
        const newPin = [...pin]
        newPin[index] = value
        setPin(newPin)
        // focus suivant
        if (value && index < 3) {
            const next = document.getElementById(`pin-${index + 1}`)
            next?.focus()
        }
    }

    const handleConfirm = () => {
        if (pin.join('').length !== 4) return
        setSuccess(true)
    }

    if (success) {
        return (
            <div style={{ padding: '60px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <div style={{ background: '#fff', borderRadius: '24px', padding: '60px 48px', maxWidth: '520px', width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,#4CAF50,#66BB6A)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '36px' }}>✓</div>
                    <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '26px', fontWeight: 'bold', color: '#1A1A2E', marginBottom: '8px' }}>Transfert envoyé !</h2>
                    <p style={{ color: '#888', fontSize: '14px', marginBottom: '32px' }}>
                        {selectedBenef?.name} recevra <strong>{amountReceived} {selectedBenef?.currency}</strong> dans moins de 5 minutes.
                    </p>
                    <div style={{ background: '#F8F7F4', borderRadius: '14px', padding: '20px', marginBottom: '28px', textAlign: 'left' }}>
                        {[
                            { l: 'Montant envoyé', v: `${parseFloat(amount).toLocaleString()} XAF` },
                            { l: 'Frais', v: `${fees} XAF` },
                            { l: 'Total débité', v: `${totalDeducted.toLocaleString()} XAF` },
                            { l: 'Montant reçu', v: `${amountReceived} ${selectedBenef?.currency}` },
                            { l: 'Référence', v: `TXN-${Date.now().toString().slice(-8)}` },
                        ].map(r => (
                            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                                <span style={{ color: '#888' }}>{r.l}</span>
                                <span style={{ fontWeight: 'bold', color: '#1A1A2E' }}>{r.v}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => { setStep(1); setSelectedBenef(null); setAmount(''); setPin(['','','','']); setSuccess(false) }}
                            style={{ flex: 1, padding: '13px', borderRadius: '10px', background: 'transparent', border: '1.5px solid #C9A84C', color: '#C9A84C', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Georgia,serif' }}
                        >Nouveau transfert</button>
                        <a href="/dashboard/historique" style={{ flex: 1 }}>
                            <button style={{ width: '100%', padding: '13px', borderRadius: '10px', background: 'linear-gradient(135deg,#1A1A2E,#16213E)', border: '1px solid rgba(201,168,76,0.3)', color: '#E8C878', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Georgia,serif' }}>
                                Voir l'historique
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ padding: '28px 32px' }}>
            {/* Stepper */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '28px', background: '#fff', borderRadius: '14px', padding: '14px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', width: 'fit-content' }}>
                {([
                    { n: 1, label: 'Destinataire' },
                    { n: 2, label: 'Montant' },
                    { n: 3, label: 'Confirmation' },
                ] as const).map((s, i) => (
                    <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                        {i > 0 && <div style={{ width: '40px', height: '1px', background: step > s.n ? '#C9A84C' : '#E0D9CC', margin: '0 8px' }} />}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: step > s.n ? 'pointer' : 'default' }}
                             onClick={() => { if (step > s.n) setStep(s.n as 1|2|3|4) }}
                        >
                            <div style={{
                                width: '28px', height: '28px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '12px', fontWeight: 'bold',
                                background: step > s.n ? '#4CAF50' : step === s.n ? 'linear-gradient(135deg,#C9A84C,#E8C878)' : '#E0D9CC',
                                color: step >= s.n ? '#fff' : '#BBB',
                            }}>
                                {step > s.n ? '✓' : s.n}
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: step === s.n ? 'bold' : 'normal', color: step === s.n ? '#C9A84C' : step > s.n ? '#1A1A2E' : '#BBB' }}>
                {s.label}
              </span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
                {/* FORM */}
                <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>

                    {/* ── ÉTAPE 1 : DESTINATAIRE ── */}
                    {step === 1 && (
                        <>
                            <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '20px', fontWeight: 'bold', color: '#1A1A2E', marginBottom: '4px' }}>
                                Informations du transfert
                            </h3>
                            <div style={{ width: '48px', height: '2px', background: 'linear-gradient(135deg,#C9A84C,#E8C878)', borderRadius: '1px', marginBottom: '24px' }} />

                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#666', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
                                SÉLECTIONNER UN BÉNÉFICIAIRE
                            </label>

                            {/* Recherche + bouton ajouter */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#BBB' }}>🔍</span>
                                    <input
                                        type="text" placeholder="Rechercher un bénéficiaire..."
                                        value={search} onChange={e => setSearch(e.target.value)}
                                        style={{ width: '100%', background: '#F8F7F4', border: '1.5px solid #E0D9CC', borderRadius: '10px', padding: '12px 12px 12px 36px', fontSize: '14px', fontFamily: 'Georgia,serif', outline: 'none', color: '#1A1A2E' }}
                                    />
                                </div>
                                <button style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'linear-gradient(135deg,#C9A84C,#E8C878)', border: 'none', fontSize: '22px', fontWeight: 'bold', color: '#1A1A2E', cursor: 'pointer' }}>+</button>
                            </div>

                            <p style={{ color: '#888', fontSize: '12px', marginBottom: '10px' }}>Contacts récents :</p>

                            {/* Grille bénéficiaires */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '20px' }}>
                                {filteredBenef.slice(0, 4).map(b => (
                                    <button
                                        key={b.account}
                                        onClick={() => setSelectedBenef(b)}
                                        style={{
                                            padding: '14px 8px', borderRadius: '12px', cursor: 'pointer',
                                            border: selectedBenef?.account === b.account ? '2px solid #C9A84C' : '1.5px solid #E0D9CC',
                                            background: selectedBenef?.account === b.account ? 'linear-gradient(135deg,#1A1A2E,#16213E)' : '#F8F7F4',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', transition: 'all 0.15s',
                                        }}
                                    >
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            background: selectedBenef?.account === b.account ? b.color + '33' : b.color + '22',
                                            color: b.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '13px', fontWeight: 'bold',
                                        }}>{b.initials}</div>
                                        <span style={{ fontSize: '12px', fontWeight: 500, color: selectedBenef?.account === b.account ? '#fff' : '#1A1A2E' }}>{b.name.split(' ')[0]}</span>
                                        <span style={{ fontSize: '10px', color: selectedBenef?.account === b.account ? '#9999BB' : '#888' }}>{b.country.split(',')[0]} · {b.currency}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Bénéficiaire sélectionné */}
                            {selectedBenef && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#FFFDF5', border: '1.5px solid #E8C878', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: selectedBenef.color + '22', color: selectedBenef.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', flexShrink: 0 }}>{selectedBenef.initials}</div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 'bold', color: '#1A1A2E', fontSize: '15px' }}>{selectedBenef.name}</p>
                                        <p style={{ color: '#666', fontSize: '12px' }}>{selectedBenef.flag} {selectedBenef.country}</p>
                                        <p style={{ color: '#888', fontSize: '11px' }}>Compte : {selectedBenef.account} · {selectedBenef.currency}</p>
                                    </div>
                                    <span style={{ color: '#4CAF50', fontSize: '13px', fontWeight: 600 }}>✓ Vérifié</span>
                                </div>
                            )}

                            {/* Motif */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#666', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>MOTIF DU TRANSFERT</label>
                                <select value={motif} onChange={e => setMotif(e.target.value)} style={{ width: '100%', background: '#fff', border: '1.5px solid #D0C9BB', borderRadius: '8px', padding: '12px 14px', fontSize: '14px', fontFamily: 'Georgia,serif', color: '#1A1A2E', outline: 'none' }}>
                                    {MOTIFS.map(m => <option key={m}>{m}</option>)}
                                </select>
                            </div>

                            {/* Message */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#666', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>MESSAGE (OPTIONNEL)</label>
                                <textarea
                                    placeholder="Ajouter un message pour le destinataire..."
                                    value={message} onChange={e => setMessage(e.target.value)}
                                    rows={3}
                                    style={{ width: '100%', background: '#fff', border: '1.5px solid #D0C9BB', borderRadius: '8px', padding: '12px 14px', fontSize: '14px', fontFamily: 'Georgia,serif', color: '#1A1A2E', outline: 'none', resize: 'none' }}
                                />
                            </div>

                            <button
                                onClick={() => { if (selectedBenef) setStep(2) }}
                                disabled={!selectedBenef}
                                style={{
                                    width: '100%', padding: '15px', borderRadius: '10px',
                                    background: selectedBenef ? 'linear-gradient(135deg,#1A1A2E,#16213E)' : '#E0D9CC',
                                    border: selectedBenef ? '1.5px solid #C9A84C' : 'none',
                                    color: selectedBenef ? '#E8C878' : '#BBB',
                                    fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px',
                                    cursor: selectedBenef ? 'pointer' : 'not-allowed',
                                    fontFamily: 'Georgia,serif',
                                }}
                            >
                                CONTINUER → MONTANT
                            </button>
                        </>
                    )}

                    {/* ── ÉTAPE 2 : MONTANT ── */}
                    {step === 2 && (
                        <>
                            <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '20px', fontWeight: 'bold', color: '#1A1A2E', marginBottom: '4px' }}>Montant du transfert</h3>
                            <div style={{ width: '48px', height: '2px', background: 'linear-gradient(135deg,#C9A84C,#E8C878)', borderRadius: '1px', marginBottom: '24px' }} />

                            {/* VOUS ENVOYEZ */}
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#666', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>VOUS ENVOYEZ (XAF)</label>
                            <div style={{ background: 'linear-gradient(135deg,#1A1A2E,#16213E)', borderRadius: '14px', padding: '20px 24px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '24px' }}>🇨🇲</span>
                                <span style={{ color: '#E8C878', fontWeight: 'bold', fontSize: '14px' }}>XAF</span>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '32px', fontWeight: 'bold', fontFamily: 'Georgia,serif', textAlign: 'right' }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <span style={{ fontSize: '12px', color: '#888' }}>Solde disponible</span>
                                <span style={{ fontSize: '12px', color: '#C9A84C', fontWeight: 600 }}>{solde.toLocaleString()} XAF</span>
                            </div>

                            {/* Flèche swap */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0EDE5', border: '1.5px solid #E0D9CC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#C9A84C' }}>⇅</div>
                            </div>

                            {/* DESTINATAIRE REÇOIT */}
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#666', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
                                {selectedBenef?.name.split(' ')[0].toUpperCase()} REÇOIT ({selectedBenef?.currency})
                            </label>
                            <div style={{ background: '#FFFDF5', border: '1.5px solid #E8C878', borderRadius: '14px', padding: '20px 24px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '24px' }}>{selectedBenef?.flag}</span>
                                <span style={{ color: '#C9A84C', fontWeight: 'bold', fontSize: '14px' }}>{selectedBenef?.currency}</span>
                                <span style={{ flex: 1, color: '#C9A84C', fontSize: '32px', fontWeight: 'bold', fontFamily: 'Georgia,serif', textAlign: 'right' }}>{amountReceived}</span>
                            </div>
                            <p style={{ fontSize: '11px', color: '#888', marginBottom: '20px', textAlign: 'right' }}>Calculé automatiquement</p>

                            {/* Détail rate */}
                            <div style={{ background: '#F8F7F4', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                    <span style={{ color: '#888' }}>Taux appliqué</span>
                                    <span style={{ fontWeight: 'bold', color: '#1A1A2E' }}>1 EUR = {tauxEUR} XAF</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                    <span style={{ color: '#888' }}>Frais (0.5%)</span>
                                    <span style={{ fontWeight: 'bold', color: '#1A1A2E' }}>{fees} XAF</span>
                                </div>
                                <div style={{ height: '1px', background: '#E0D9CC', margin: '10px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{ fontWeight: 'bold', color: '#1A1A2E' }}>Total débité</span>
                                    <span style={{ fontWeight: 'bold', color: '#C9A84C' }}>{totalDeducted ? totalDeducted.toLocaleString() : '0'} XAF</span>
                                </div>
                            </div>

                            {/* Montants rapides */}
                            <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Montants rapides :</p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                {MONTANTS_RAPIDES.map(v => (
                                    <button key={v} onClick={() => setAmount(String(v))} style={{
                                        padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                                        background: amount === String(v) ? 'linear-gradient(135deg,#C9A84C,#E8C878)' : '#F0EDE5',
                                        color: amount === String(v) ? '#1A1A2E' : '#666',
                                        border: 'none', cursor: 'pointer',
                                    }}>
                                        {(v / 1000).toFixed(0)}k
                                    </button>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => setStep(1)} style={{ flex: 1, padding: '14px', borderRadius: '10px', background: 'transparent', border: '1.5px solid #C9A84C', color: '#C9A84C', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Georgia,serif' }}>← Retour</button>
                                <button
                                    onClick={() => { if (amount && parseFloat(amount) > 0) setStep(3) }}
                                    disabled={!amount || parseFloat(amount) <= 0}
                                    style={{ flex: 2, padding: '14px', borderRadius: '10px', background: amount ? 'linear-gradient(135deg,#1A1A2E,#16213E)' : '#E0D9CC', border: amount ? '1.5px solid #C9A84C' : 'none', color: amount ? '#E8C878' : '#BBB', fontWeight: 'bold', cursor: amount ? 'pointer' : 'not-allowed', fontFamily: 'Georgia,serif', fontSize: '14px', letterSpacing: '1px' }}
                                >CONTINUER → CONFIRMER</button>
                            </div>
                        </>
                    )}

                    {/* ── ÉTAPE 3 : CONFIRMATION ── */}
                    {step === 3 && (
                        <>
                            <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '20px', fontWeight: 'bold', color: '#1A1A2E', marginBottom: '4px' }}>Confirmer le transfert</h3>
                            <div style={{ width: '48px', height: '2px', background: 'linear-gradient(135deg,#C9A84C,#E8C878)', borderRadius: '1px', marginBottom: '24px' }} />

                            {/* Récap visuel */}
                            <div style={{ background: 'linear-gradient(135deg,#1A1A2E,#16213E)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(201,168,76,0.3)', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: selectedBenef!.color + '33', color: selectedBenef!.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', flexShrink: 0 }}>{selectedBenef!.initials}</div>
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '15px' }}>{selectedBenef!.name}</p>
                                        <p style={{ color: '#9999BB', fontSize: '12px' }}>{selectedBenef!.flag} {selectedBenef!.country}</p>
                                    </div>
                                </div>
                                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '16px' }} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div><p style={{ color: '#9999BB', fontSize: '11px', marginBottom: '4px' }}>VOUS ENVOYEZ</p><p style={{ color: '#fff', fontWeight: 'bold', fontSize: '22px', fontFamily: 'Georgia,serif' }}>{parseFloat(amount).toLocaleString()} XAF</p></div>
                                    <div><p style={{ color: '#9999BB', fontSize: '11px', marginBottom: '4px' }}>REÇOIT</p><p style={{ fontWeight: 'bold', fontSize: '22px', fontFamily: 'Georgia,serif', color: '#E8C878' }}>{amountReceived} {selectedBenef!.currency}</p></div>
                                    <div><p style={{ color: '#9999BB', fontSize: '11px', marginBottom: '4px' }}>FRAIS</p><p style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{fees} XAF</p></div>
                                    <div><p style={{ color: '#9999BB', fontSize: '11px', marginBottom: '4px' }}>TOTAL DÉBITÉ</p><p style={{ color: '#E8C878', fontWeight: 'bold', fontSize: '14px' }}>{totalDeducted.toLocaleString()} XAF</p></div>
                                </div>
                            </div>

                            {/* Infos */}
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ flex: 1, background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.25)', borderRadius: '10px', padding: '12px 14px' }}>
                                    <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4CAF50', marginBottom: '2px' }}>⚡ Transfert instantané</p>
                                    <p style={{ fontSize: '11px', color: '#888' }}>Fonds reçus en moins de 5 minutes</p>
                                </div>
                                <div style={{ flex: 1, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '10px', padding: '12px 14px' }}>
                                    <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#C9A84C', marginBottom: '2px' }}>🔒 Sécurisé</p>
                                    <p style={{ fontSize: '11px', color: '#888' }}>SSL 256-bit · Conforme SWIFT</p>
                                </div>
                            </div>

                            {/* PIN */}
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#666', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
                                PIN DE CONFIRMATION
                            </label>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', justifyContent: 'center' }}>
                                {[0, 1, 2, 3].map(i => (
                                    <input
                                        key={i}
                                        id={`pin-${i}`}
                                        type="password"
                                        maxLength={1}
                                        value={pin[i]}
                                        onChange={e => handlePinChange(i, e.target.value)}
                                        style={{
                                            width: '60px', height: '60px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold',
                                            background: pin[i] ? '#FFFDF5' : '#F8F7F4',
                                            border: pin[i] ? '2px solid #C9A84C' : '1.5px solid #E0D9CC',
                                            borderRadius: '12px', outline: 'none', fontFamily: 'Georgia,serif',
                                        }}
                                    />
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => setStep(2)} style={{ flex: 1, padding: '14px', borderRadius: '10px', background: 'transparent', border: '1.5px solid #C9A84C', color: '#C9A84C', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Georgia,serif' }}>← Modifier</button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={pin.join('').length !== 4}
                                    style={{ flex: 2, padding: '14px', borderRadius: '10px', background: pin.join('').length === 4 ? 'linear-gradient(135deg,#1A1A2E,#16213E)' : '#E0D9CC', border: pin.join('').length === 4 ? '1.5px solid #C9A84C' : 'none', color: pin.join('').length === 4 ? '#E8C878' : '#BBB', fontWeight: 'bold', cursor: pin.join('').length === 4 ? 'pointer' : 'not-allowed', fontFamily: 'Georgia,serif', fontSize: '14px', letterSpacing: '1px' }}
                                >✓ CONFIRMER L'ENVOI</button>
                            </div>
                        </>
                    )}
                </div>

                {/* SIDEBAR RÉCAP */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Récap */}
                    <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                        <h4 style={{ fontFamily: 'Georgia,serif', fontWeight: 'bold', color: '#1A1A2E', fontSize: '15px', marginBottom: '16px' }}>Récapitulatif</h4>
                        {[
                            { l: 'Destinataire', v: selectedBenef?.name ?? '—' },
                            { l: 'Pays', v: selectedBenef ? `${selectedBenef.flag} ${selectedBenef.country}` : '—' },
                            { l: 'Devise', v: selectedBenef?.currency ?? '—' },
                            { l: 'Motif', v: motif },
                        ].map(r => (
                            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                                <span style={{ color: '#888' }}>{r.l}</span>
                                <span style={{ fontWeight: 500, color: '#1A1A2E', textAlign: 'right', maxWidth: '170px' }}>{r.v}</span>
                            </div>
                        ))}
                        <div style={{ height: '1px', background: '#F0EDE5', margin: '12px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span style={{ color: '#888' }}>Montant</span>
                            <span style={{ fontWeight: 'bold', color: '#C9A84C' }}>{amount ? parseFloat(amount).toLocaleString() : '—'} XAF</span>
                        </div>
                    </div>

                    {/* Infos rate */}
                    <div style={{ background: 'linear-gradient(135deg,#1A1A2E,#16213E)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(201,168,76,0.25)' }}>
                        <p style={{ color: '#E8C878', fontWeight: 'bold', fontSize: '13px', marginBottom: '12px' }}>📊 Taux EUR/XAF aujourd'hui</p>
                        {[
                            { l: 'Ouverture', v: '654.80' },
                            { l: 'Haut', v: '658.12' },
                            { l: 'Bas', v: '653.20' },
                            { l: 'Actuel', v: '655.57', gold: true },
                        ].map(r => (
                            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                                <span style={{ color: '#9999BB' }}>{r.l}</span>
                                <span style={{ fontWeight: 'bold', color: r.gold ? '#E8C878' : '#fff' }}>{r.v}</span>
                            </div>
                        ))}
                    </div>

                    {/* Délai */}
                    <div style={{ background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.25)', borderRadius: '12px', padding: '14px 16px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4CAF50', marginBottom: '4px' }}>⚡ Transfert instantané</p>
                        <p style={{ fontSize: '11px', color: '#888' }}>Délai estimé : 1 à 5 minutes. Taux garanti 10 minutes.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}