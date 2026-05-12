'use client'

import { useState } from 'react'
import Topbar from '@/components/topbar'
import { MOCK_TRANSACTIONS } from '@/lib/constants'

const summaryStats = [
    { label: 'TOTAL ENVOYÉ', value: '892 500 XAF', sub: '↑ 24 transactions', subColor: '#E53935' },
    { label: 'TOTAL REÇU', value: '570 500 XAF', sub: '↓ 12 transactions', subColor: '#4CAF50' },
    { label: 'EN ATTENTE', value: '75 000 XAF', sub: '⏳ 3 transactions', subColor: '#FF9800' },
    { label: 'FRAIS PAYÉS', value: '4 460 XAF', sub: '0.5% moy.', subColor: '#888' },
]

const filters = ['Tous', 'Complétés', 'En attente', 'Annulés', 'Envois', 'Reçus']

export default function HistoriquePage() {
    const [activeFilter, setActiveFilter] = useState('Tous')

    return (
        <>
            <Topbar breadcrumb="HISTORIQUE" title="Historique des Transactions 📋" />
            <div className="p-8">
                {/* Summary stats */}
                <div className="grid grid-cols-4 gap-5 mb-6">
                    {summaryStats.map((s) => (
                        <div key={s.label} className="rounded-2xl p-5" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                            <p className="text-xs text-[#888] tracking-wider uppercase mb-2">{s.label}</p>
                            <p className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Georgia, serif' }}>{s.value}</p>
                            <p className="text-xs mt-1 font-medium" style={{ color: s.subColor }}>{s.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Table card */}
                <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                    {/* Filters row */}
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-[#F0EDE5]">
                        <div className="relative flex-1 max-w-xs">
                            <input type="text" placeholder="🔍  Rechercher une transaction..." className="dm-input !py-2 text-sm" />
                        </div>
                        <div className="flex gap-1 ml-4">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                    style={
                                        activeFilter === f
                                            ? { background: 'linear-gradient(135deg, #C9A84C, #E8C878)', color: '#1A1A2E' }
                                            : { background: '#F0EDE5', color: '#888' }
                                    }
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table header */}
                    <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b border-[#F0EDE5] bg-[#FAFAF9]">
                        {['TYPE', 'DESTINATAIRE / EXPÉDITEUR', 'MONTANT ENVOYÉ', 'MONTANT REÇU', 'DATE', 'STATUT'].map((h) => (
                            <p key={h} className="text-xs font-semibold text-[#888] tracking-wider uppercase">{h}</p>
                        ))}
                    </div>

                    {/* Table rows */}
                    <div className="divide-y divide-[#F8F7F4]">
                        {MOCK_TRANSACTIONS.map((tx) => (
                            <div key={tx.id} className="grid grid-cols-6 gap-4 px-6 py-4 items-center hover:bg-[#FAFAF7] transition-colors">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{tx.type === 'envoi' ? '📤' : '📥'}</span>
                                    <span className="text-xs text-[#888]">{tx.type === 'envoi' ? 'Envoi' : 'Réception'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${tx.color}22`, color: tx.color }}>
                                        {tx.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#1A1A2E]">{tx.recipient}</p>
                                        <p className="text-xs text-[#888]">{tx.country}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold" style={{ color: tx.type === 'envoi' ? '#E53935' : '#888' }}>
                                    {tx.type === 'envoi' ? '-' : ''}{tx.amountSent}
                                </p>
                                <p className="text-sm font-bold" style={{ color: tx.type === 'reception' ? '#4CAF50' : '#888' }}>
                                    {tx.type === 'reception' ? '+' : ''}{tx.amountReceived}
                                </p>
                                <p className="text-xs text-[#888]">{tx.date}</p>
                                <span
                                    className="text-xs px-2 py-1 rounded-full font-medium w-fit"
                                    style={
                                        tx.status === 'completed' ? { background: 'rgba(76,175,80,0.1)', color: '#4CAF50' }
                                            : tx.status === 'pending' ? { background: 'rgba(255,152,0,0.1)', color: '#FF9800' }
                                                : { background: 'rgba(229,57,53,0.1)', color: '#E53935' }
                                    }
                                >
                  {tx.status === 'completed' ? '✓ Complété' : tx.status === 'pending' ? '⏳ En attente' : '✕ Annulé'}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
