'use client'

import { useState } from 'react'
import Topbar from '@/components/topbar'
import { MOCK_BENEFICIAIRES } from '@/lib/constants'

const regionFilters = ['Tous', 'Europe', 'Afrique', 'Amériques', 'Asie']

export default function BeneficiairesPage() {
    const [region, setRegion] = useState('Tous')
    const [search, setSearch] = useState('')

    const filtered = MOCK_BENEFICIAIRES.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.country.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <Topbar breadcrumb="BÉNÉFICIAIRES" title="Mes Bénéficiaires 👥" />
            <div className="p-8">
                {/* Search + filters + add button */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <input
                            type="text"
                            placeholder="🔍  Rechercher un bénéficiaire..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="dm-input py-2! text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[#888]">Région :</span>
                        {regionFilters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setRegion(f)}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                style={
                                    region === f
                                        ? { background: 'linear-gradient(135deg, #C9A84C, #E8C878)', color: '#1A1A2E' }
                                        : { background: '#F0EDE5', color: '#888' }
                                }
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <span className="text-xs text-[#888] ml-auto">{filtered.length} bénéficiaires</span>
                    <button className="btn-outline px-4! py-2! text-sm">+ Ajouter</button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-3 gap-5">
                    {filtered.map((b) => (
                        <div
                            key={b.name}
                            className="rounded-2xl p-5 group hover:shadow-lg transition-shadow"
                            style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0EDE5' }}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
                                    style={{ background: `${b.color}22`, color: b.color, fontSize: '20px' }}
                                >
                                    {b.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-[#1A1A2E] text-base" style={{ fontFamily: 'Georgia, serif' }}>{b.name}</p>
                                    <p className="text-[#888] text-sm">{b.flag} {b.country}</p>
                                    <p className="text-[#C9A84C] text-xs mt-0.5">{b.currency} · {b.account}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-[#888] mb-4">
                                <span>Dernier envoi : {b.lastSent}</span>
                            </div>
                            <div className="flex gap-2">
                                <a href="dashboard/transfert">
                                    <button
                                        className="flex-1 py-2 rounded-xl text-xs font-bold tracking-wide transition-all"
                                        style={{ background: 'linear-gradient(135deg, #1A1A2E, #16213E)', color: '#E8C878', border: '1px solid rgba(201,168,76,0.3)' }}
                                    >
                                        💸 Envoyer
                                    </button>
                                </a>
                                <button className="w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-colors hover:bg-[#F0EDE5]" style={{ border: '1px solid #E0D9CC' }}>✏️</button>
                                <button className="w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-colors hover:bg-red-50" style={{ border: '1px solid #E0D9CC' }}>🗑️</button>
                            </div>
                        </div>
                    ))}

                    {/* Add card */}
                    <div
                        className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#FFFDF7] transition-colors"
                        style={{ border: '2px dashed #C9A84C', minHeight: '180px' }}
                    >
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl font-light text-[#C9A84C]" style={{ border: '2px dashed #C9A84C' }}>+</div>
                        <p className="font-bold text-[#C9A84C]" style={{ fontFamily: 'Georgia, serif' }}>Ajouter un bénéficiaire</p>
                        <p className="text-xs text-[#888] text-center">Enregistre un nouveau contact pour vos prochains transferts</p>
                    </div>
                </div>
            </div>
        </>
    )
}
