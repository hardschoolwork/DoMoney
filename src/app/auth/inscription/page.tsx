'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image";

export default function InscriptionPage() {
    const [step, setStep] = useState(1)
    const [showPass, setShowPass] = useState(false)

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #FAFAF7, #F5F0E8)' }}>


            <div style={{
                width: '480px', minHeight: '100vh', flexShrink: 0,
                background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
            }}>

                <div style={{ position: 'absolute', left: '60px', top: 0, width: '3px', height: '100%', background: 'linear-gradient(180deg,#C9A84C,#E8C878)', opacity: 0.3 }} />
                {/* Cercles déco */}
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(201,168,76,0.04)' }} />
                <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(201,168,76,0.03)' }} />

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '40px 56px 0' }}>
                    <Image
                        src="/logo.png"
                        alt="DoMoney"
                        width={42}
                        height={42}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#E8C878', fontSize: '20px', fontFamily: 'Georgia,serif' }}>DoMoney</div>
                        <div style={{ color: '#C9A84C', fontSize: '9px', letterSpacing: '3px' }}>TCHOKO TRANSFER</div>
                    </div>
                </div>

                {/* Texte central */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 56px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#FFFFFF', fontFamily: 'Georgia,serif', marginBottom: '12px' }}>
                        Rejoins DoMoney
                    </h2>
                    <p style={{ color: '#9999BB', fontSize: '13px', lineHeight: 1.7, marginBottom: '48px' }}>
                        Crée ton compte en quelques minutes et commence à envoyer de l'argent partout dans le monde.
                    </p>

                    {/* Étapes visuelles */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { n: 1, label: 'Informations personnelles' },
                            { n: 2, label: 'Sécurité du compte' },
                            { n: 3, label: "Vérification d'identité" },
                        ].map(s => (
                            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '13px', fontWeight: 'bold',
                                    background: step > s.n
                                        ? 'linear-gradient(135deg,#4CAF50,#66BB6A)'
                                        : step === s.n
                                            ? 'linear-gradient(135deg,#C9A84C,#E8C878)'
                                            : 'rgba(255,255,255,0.08)',
                                    color: step >= s.n ? '#1A1A2E' : '#9999BB',
                                }}>
                                    {step > s.n ? '✓' : s.n}
                                </div>
                                <span style={{
                                    fontSize: '13px',
                                    color: step === s.n ? '#E8C878' : step > s.n ? '#9999BB' : '#666688',
                                    fontWeight: step === s.n ? 'bold' : 'normal',
                                }}>
                  {s.label}
                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <p style={{ textAlign: 'center', color: '#555577', fontSize: '10px', letterSpacing: '2px', padding: '24px' }}>
                    © 2025 DOMONEY · TOUS DROITS RÉSERVÉS
                </p>
            </div>

            {/* Panneau droit — formulaire */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 60px' }}>
                <div style={{
                    width: '100%', maxWidth: '520px',
                    background: '#FFFFFF', borderRadius: '20px',
                    padding: '44px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                }}>
                    <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1A1A2E', fontFamily: 'Georgia,serif', marginBottom: '6px' }}>
                        Créer un Compte 🚀
                    </h2>
                    <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px', fontFamily: 'Georgia,serif' }}>
                        Rejoins des milliers d'utilisateurs qui font confiance à DoMoney
                    </p>
                    <div className="gold-divider" />

                    {/* Barre de progression */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
                        {[1, 2, 3].map(s => (
                            <div
                                key={s}
                                onClick={() => step > s && setStep(s)}
                                style={{
                                    flex: 1, height: '5px', borderRadius: '3px', cursor: step > s ? 'pointer' : 'default',
                                    background: step >= s ? 'linear-gradient(135deg,#C9A84C,#E8C878)' : '#E0D9CC',
                                    transition: 'background 0.3s',
                                }}
                            />
                        ))}
                    </div>

                    {/* ÉTAPE 1 */}
                    {step === 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                <div>
                                    <label className="field-label">Prénom</label>
                                    <input type="text" placeholder="Jean-Paul" className="dm-input" />
                                </div>
                                <div>
                                    <label className="field-label">Nom</label>
                                    <input type="text" placeholder="Nguetsop" className="dm-input" />
                                </div>
                            </div>
                            <div>
                                <label className="field-label">Email</label>
                                <input type="email" placeholder="exemple@email.com" className="dm-input" />
                            </div>
                            <div>
                                <label className="field-label">Téléphone</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <div className="dm-input" style={{ width: '90px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                        🇨🇲 <span style={{ fontSize: '12px', color: '#888' }}>+237</span>
                                    </div>
                                    <input type="tel" placeholder="6XX XXX XXX" className="dm-input" style={{ flex: 1 }} />
                                </div>
                            </div>
                            <div>
                                <label className="field-label">Pays de résidence</label>
                                <select className="dm-input">
                                    <option value="">Sélectionner un pays...</option>
                                    <option>🇨🇲 Cameroun</option>
                                    <option>🇫🇷 France</option>
                                    <option>🇸🇳 Sénégal</option>
                                    <option>🇨🇮 Côte d'Ivoire</option>
                                    <option>🇬🇧 Royaume-Uni</option>
                                </select>
                            </div>
                            <button className="btn-primary" onClick={() => setStep(2)}>
                                CONTINUER →
                            </button>
                        </div>
                    )}

                    {/* ÉTAPE 2 */}
                    {step === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label className="field-label">Mot de passe</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="Min. 8 caractères"
                                        className="dm-input"
                                        style={{ paddingRight: '44px' }}
                                    />
                                    <button
                                        onClick={() => setShowPass(!showPass)}
                                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#C9A84C', fontSize: '16px' }}
                                    >👁</button>
                                </div>
                                {/* Indicateurs force */}
                                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                                    {['Longueur', 'Majuscule', 'Chiffre', 'Symbole'].map(c => (
                                        <span key={c} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: '#F0EDE5', color: '#888' }}>{c}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="field-label">Confirmer le mot de passe</label>
                                <input type="password" placeholder="Répéter le mot de passe" className="dm-input" />
                            </div>
                            <div>
                                <label className="field-label">PIN de sécurité (4 chiffres)</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {[1, 2, 3, 4].map(i => (
                                        <input
                                            key={i} type="password" maxLength={1}
                                            className="dm-input"
                                            style={{ width: '52px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', padding: '12px 0' }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>← Retour</button>
                                <button className="btn-primary" style={{ flex: 2 }} onClick={() => setStep(3)}>CONTINUER →</button>
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 3 */}
                    {step === 3 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Zone upload */}
                            <div style={{
                                borderRadius: '14px', padding: '32px 24px', textAlign: 'center',
                                background: 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(232,200,120,0.04))',
                                border: '2px dashed #C9A84C',
                            }}>
                                <div style={{ fontSize: '44px', marginBottom: '12px' }}>📄</div>
                                <p style={{ fontWeight: 'bold', color: '#1A1A2E', fontSize: '15px', fontFamily: 'Georgia,serif', marginBottom: '6px' }}>
                                    Pièce d'identité
                                </p>
                                <p style={{ color: '#888', fontSize: '12px', marginBottom: '16px' }}>
                                    CNI, Passeport ou Permis de conduire
                                </p>
                                <label style={{ cursor: 'pointer' }}>
                  <span className="btn-outline" style={{ padding: '9px 20px', fontSize: '12px' }}>
                    Choisir un fichier
                  </span>
                                    <input type="file" style={{ display: 'none' }} accept="image/*,.pdf" />
                                </label>
                            </div>

                            {/* Info box */}
                            <div style={{
                                borderRadius: '10px', padding: '14px 16px',
                                background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)',
                            }}>
                                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#C9A84C', marginBottom: '4px' }}>ℹ️ POURQUOI ?</p>
                                <p style={{ fontSize: '11px', color: '#888' }}>
                                    Requis par la réglementation pour valider votre identité et protéger votre compte contre la fraude.
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="btn-outline" style={{ flex: 1 }} onClick={() => setStep(2)}>← Retour</button>
                                <button className="btn-primary" style={{ flex: 2 }}>CRÉER MON COMPTE 🎉</button>
                            </div>
                        </div>
                    )}

                    {/* Lien connexion */}
                    <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginTop: '24px' }}>
                        Déjà un compte ?{' '}
                        <Link href="/auth/login" style={{ color: '#C9A84C', fontWeight: 'bold', textDecoration: 'none' }}>
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}