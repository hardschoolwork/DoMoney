'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function InscriptionPage() {
    const [step, setStep] = useState(1)
    const [showPass, setShowPass] = useState(false)

    return (
        <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #FAFAF7 0%, #F5F0E8 100%)' }}>
            {/* Left panel */}
            <div
                className="hidden lg:flex flex-col w-[480px] min-h-screen relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}
            >
                <div className="absolute left-[60px] top-0 w-[3px] h-full opacity-30" style={{ background: 'linear-gradient(180deg, #C9A84C, #E8C878)' }} />

                {/* Logo */}
                <div className="flex items-center gap-3 px-[60px] pt-10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[#1A1A2E] text-xl" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }}>D</div>
                    <div>
                        <div className="font-bold text-[#E8C878] text-xl" style={{ fontFamily: 'Georgia, serif' }}>DoMoney</div>
                        <div className="text-[#C9A84C] text-[9px] tracking-[3px]">TCHOKO TRANSFER</div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
                    <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>Rejoins DoMoney</h2>
                    <p className="text-[#9999BB] text-sm leading-relaxed mb-10">
                        Crée ton compte en quelques minutes et commence à envoyer de l argent partout dans le monde.
                    </p>

                    {/* Steps */}
                    <div className="w-full max-w-xs space-y-4">
                        {[
                            { n: 1, label: 'Informations personnelles' },
                            { n: 2, label: 'Sécurité du compte' },
                            { n: 3, label: 'Vérification identité' },
                        ].map((s) => (
                            <div key={s.n} className="flex items-center gap-4">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                                    style={
                                        step >= s.n
                                            ? { background: 'linear-gradient(135deg, #C9A84C, #E8C878)', color: '#1A1A2E' }
                                            : { background: 'rgba(255,255,255,0.08)', color: '#9999BB' }
                                    }
                                >
                                    {step > s.n ? '✓' : s.n}
                                </div>
                                <span className={`text-sm ${step >= s.n ? 'text-[#E8C878]' : 'text-[#9999BB]'}`}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-center text-[#555577] text-xs tracking-[2px] pb-8">© 2025 DOMONEY · TOUS DROITS RÉSERVÉS</p>
            </div>

            {/* Right - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-[520px] rounded-3xl p-10" style={{ background: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Créer un Compte 🚀</h2>
                    <p className="text-[#888] text-sm mb-6">Rejoins des milliers d utilisateurs qui font confiance à DoMoney</p>
                    <div className="w-16 h-0.5 rounded mb-8" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />

                    {/* Stepper bar */}
                    <div className="flex gap-2 mb-8">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                onClick={() => setStep(s)}
                                className="flex-1 h-1.5 rounded-full cursor-pointer transition-all"
                                style={{ background: step >= s ? 'linear-gradient(135deg, #C9A84C, #E8C878)' : '#E0D9CC' }}
                            />
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Prénom</label>
                                    <input type="text" placeholder="Jean-Paul" className="dm-input" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Nom</label>
                                    <input type="text" placeholder="Nguetsop" className="dm-input" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Email</label>
                                <input type="email" placeholder="exemple@email.com" className="dm-input" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Téléphone</label>
                                <div className="flex gap-2">
                                    <div className="dm-input !w-20 !px-2 flex items-center gap-1 cursor-pointer">🇨🇲 +237</div>
                                    <input type="tel" placeholder="6XX XXX XXX" className="dm-input flex-1" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Pays de résidence</label>
                                <select className="dm-input">
                                    <option value="">Sélectionner un pays...</option>
                                    <option value="cm">🇨🇲 Cameroun</option>
                                    <option value="fr">🇫🇷 France</option>
                                    <option value="sn">🇸🇳 Sénégal</option>
                                    <option value="ci">🇨🇮 Côte d Ivoire</option>
                                    <option value="gb">🇬🇧 Royaume-Uni</option>
                                </select>
                            </div>
                            <button className="btn-primary" onClick={() => setStep(2)}>CONTINUER →</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Mot de passe</label>
                                <div className="relative">
                                    <input type={showPass ? 'text' : 'password'} placeholder="Min. 8 caractères" className="dm-input pr-12" />
                                    <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A84C]">👁</button>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {['Longueur', 'Majuscule', 'Chiffre', 'Symbole'].map((c) => (
                                        <span key={c} className="text-xs px-2 py-0.5 rounded-full text-[#888]" style={{ background: '#F0EDE5' }}>{c}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">Confirmer le mot de passe</label>
                                <input type="password" placeholder="Répéter le mot de passe" className="dm-input" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">PIN de sécurité (4 chiffres)</label>
                                <div className="flex gap-3">
                                    {[1,2,3,4].map((i) => (
                                        <input key={i} type="password" maxLength={1} className="dm-input !w-12 !text-center text-xl font-bold" />
                                    ))}
                                </div>
                            </div>
                            <button className="btn-primary" onClick={() => setStep(3)}>CONTINUER →</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-5">
                            <div
                                className="rounded-2xl p-6 text-center"
                                style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(232,200,120,0.05))', border: '1.5px dashed #C9A84C' }}
                            >
                                <div className="text-4xl mb-3">📄</div>
                                <p className="text-[#1A1A2E] font-bold mb-1" style={{ fontFamily: 'Georgia, serif' }}>Pièce d identité</p>
                                <p className="text-[#888] text-sm mb-4">CNI, Passeport ou Permis de conduire</p>
                                <label className="btn-outline cursor-pointer">
                                    Choisir un fichier
                                    <input type="file" className="hidden" accept="image/*,.pdf" />
                                </label>
                            </div>
                            <div
                                className="rounded-xl p-4"
                                style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}
                            >
                                <p className="text-[#C9A84C] text-xs font-bold mb-1">ℹ️ POURQUOI ?</p>
                                <p className="text-[#888] text-xs">Requis par la réglementation pour valider votre identité et protéger votre compte contre la fraude.</p>
                            </div>
                            <button className="btn-primary">CRÉER MON COMPTE 🎉</button>
                        </div>
                    )}

                    <p className="text-center text-[#888] text-sm mt-6">
                        Déjà un compte ?{' '}
                        <Link href="auth/login" className="text-[#C9A84C] font-bold hover:underline">Se connecter</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}