'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #FAFAF7 0%, #F5F0E8 100%)' }}>
            {/* Decorative circles */}
            <div className="fixed top-[-50px] left-[-50px] w-64 h-64 rounded-full pointer-events-none" style={{ background: 'rgba(201,168,76,0.05)' }} />
            <div className="fixed bottom-[-80px] right-[-80px] w-96 h-96 rounded-full pointer-events-none" style={{ background: 'rgba(26,26,46,0.04)' }} />

            {/* Left panel */}
            <div
                className="hidden lg:flex flex-col w-[580px] min-h-screen relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}
            >
                {/* Gold accent line */}
                <div
                    className="absolute left-[60px] top-0 w-[3px] h-full opacity-30"
                    style={{ background: 'linear-gradient(180deg, #C9A84C, #E8C878)' }}
                />
                {/* Decorative circles */}
                <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full" style={{ background: 'rgba(201,168,76,0.04)' }} />
                <div className="absolute bottom-[-80px] left-[-80px] w-80 h-80 rounded-full" style={{ background: 'rgba(201,168,76,0.03)' }} />

                {/* Logo */}
                <div className="flex items-center gap-3 px-[70px] pt-10">
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-[#1A1A2E] text-2xl"
                        style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }}
                    >
                        D
                    </div>
                    <div>
                        <div className="font-bold text-[#E8C878] text-2xl" style={{ fontFamily: 'Georgia, serif' }}>DoMoney</div>
                        <div className="text-[#C9A84C] text-[10px] tracking-[3px]">TCHOKO TRANSFER</div>
                    </div>
                </div>

                {/* Tagline */}
                <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
                    <h2 className="text-5xl font-bold text-white leading-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        Ton Argent,
                    </h2>
                    <h2
                        className="text-5xl font-bold leading-tight mb-4"
                        style={{ fontFamily: 'Georgia, serif', background: 'linear-gradient(135deg, #C9A84C, #E8C878)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                        Partout au Monde
                    </h2>
                    <p className="text-[#9999BB] text-sm tracking-wider">Transferts multi-devises en toute sécurité</p>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-md">
                        {[
                            { value: '150+', label: 'Devises supportées' },
                            { value: '0.5%', label: 'Frais compétitifs' },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="rounded-xl p-5 text-center"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(201,168,76,0.3)' }}
                            >
                                <div className="text-2xl font-bold text-[#E8C878]" style={{ fontFamily: 'Georgia, serif' }}>{s.value}</div>
                                <div className="text-[#9999BB] text-xs mt-1">{s.label}</div>
                            </div>
                        ))}
                        <div
                            className="col-span-2 rounded-xl p-5 text-center"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(201,168,76,0.3)' }}
                        >
                            <div className="text-2xl font-bold text-[#E8C878]" style={{ fontFamily: 'Georgia, serif' }}>24/7</div>
                            <div className="text-[#9999BB] text-xs mt-1">Transferts instantanés disponibles</div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-[#555577] text-xs tracking-[2px] pb-8">
                    © 2025 DOMONEY · TOUS DROITS RÉSERVÉS
                </p>
            </div>

            {/* Right panel - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div
                    className="w-full max-w-[500px] rounded-3xl p-10"
                    style={{ background: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
                >
                    <h2 className="text-3xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                        Bon Retour 👋
                    </h2>
                    <p className="text-[#888] text-sm mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Connecte-toi à ton compte DoMoney
                    </p>
                    <div
                        className="w-24 h-0.5 rounded mb-8"
                        style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }}
                    />

                    {/* Email */}
                    <div className="mb-5">
                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">
                            Email / Téléphone
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="exemple@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="dm-input pr-12"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A84C]">✉</span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-[#666] tracking-wider mb-2 uppercase">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <input
                                type={showPass ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="dm-input pr-12"
                            />
                            <button
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A84C]"
                            >
                                👁
                            </button>
                        </div>
                    </div>

                    {/* Forgot */}
                    <div className="text-right mb-6">
                        <Link href="#" className="text-[#C9A84C] text-sm hover:underline" style={{ fontFamily: 'Georgia, serif' }}>
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    {/* Submit */}
                    <button className="btn-primary mb-6">SE CONNECTER</button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-[#E0D9CC]" />
                        <span className="text-[#BBB] text-xs">ou</span>
                        <div className="flex-1 h-px bg-[#E0D9CC]" />
                    </div>

                    {/* Create account */}
                    <p className="text-center text-[#666] text-sm mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                        Pas encore de compte ?
                    </p>
                    <Link href="/auth/inscription">
                        <button className="btn-outline w-full">CRÉER UN COMPTE</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
