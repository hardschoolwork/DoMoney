'use client'

import { useState } from 'react'
import Topbar from '@/components/topbar'
import { EXCHANGE_RATES } from '@/lib/constants'

export default function TauxChangePage() {
    const [fromAmount, setFromAmount] = useState('50000')
    const [fromCurrency, setFromCurrency] = useState('XAF')
    const [toCurrency, setToCurrency] = useState('EUR')

    const eurRate = 655.57
    const converted = (parseFloat(fromAmount || '0') / eurRate).toFixed(2)

    return (
        <>
            <Topbar breadcrumb="TAUX DE CHANGE" title="Taux de Change en Direct 📊" />
            <div className="p-8">
                <div className="grid grid-cols-3 gap-6">
                    {/* Converter */}
                    <div className="col-span-1">
                        <div className="rounded-2xl p-6 mb-4" style={{ background: 'linear-gradient(135deg, #1A1A2E, #16213E)', border: '1px solid rgba(201,168,76,0.3)' }}>
                            <h3 className="text-[#E8C878] font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Convertisseur rapide</h3>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex-1 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span>🇨🇲</span>
                                        <select
                                            value={fromCurrency}
                                            onChange={(e) => setFromCurrency(e.target.value)}
                                            className="bg-transparent text-[#E8C878] font-bold text-sm outline-none"
                                        >
                                            <option value="XAF" className="bg-[#1A1A2E]">XAF</option>
                                            <option value="EUR" className="bg-[#1A1A2E]">EUR</option>
                                        </select>
                                    </div>
                                    <input
                                        type="number"
                                        value={fromAmount}
                                        onChange={(e) => setFromAmount(e.target.value)}
                                        className="bg-transparent text-white text-2xl font-bold w-full outline-none"
                                    />
                                </div>

                                <button className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold text-[#1A1A2E] flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }}>⇄</button>

                                <div className="flex-1 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span>🇫🇷</span>
                                        <select
                                            value={toCurrency}
                                            onChange={(e) => setToCurrency(e.target.value)}
                                            className="bg-transparent text-[#E8C878] font-bold text-sm outline-none"
                                        >
                                            <option value="EUR" className="bg-[#1A1A2E]">EUR</option>
                                            <option value="USD" className="bg-[#1A1A2E]">USD</option>
                                            <option value="GBP" className="bg-[#1A1A2E]">GBP</option>
                                        </select>
                                    </div>
                                    <p className="text-[#E8C878] text-2xl font-bold">{converted}</p>
                                </div>
                            </div>
                            <p className="text-[#9999BB] text-xs mb-4">1 EUR = 655.57 XAF · Frais inclus · Taux garanti 10 min</p>
                            <button className="btn-primary !text-[#1A1A2E] !border-[#E8C878]" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)', color: '#1A1A2E' }}>
                                Envoyer maintenant
                            </button>
                        </div>

                        {/* API info */}
                        <div className="rounded-2xl p-5" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                            <h4 className="font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Georgia, serif' }}>Infos API Forex</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-[#888]">Source</span><span className="font-medium text-[#1A1A2E]">Open Exchange Rates</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Mise à jour</span><span className="font-medium text-[#4CAF50]">● Live (15:44)</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Fréquence</span><span className="font-medium text-[#1A1A2E]">Toutes les 5 min</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Rates table */}
                    <div className="col-span-2 rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0EDE5]">
                            <h3 className="font-bold text-[#1A1A2E]" style={{ fontFamily: 'Georgia, serif' }}>Taux XAF vs Devises mondiales</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                                <span className="text-xs font-bold text-[#4CAF50]">LIVE</span>
                                <span className="text-xs text-[#888] ml-2">Mis à jour: 15:44:30</span>
                            </div>
                        </div>
                        <div className="divide-y divide-[#F8F7F4]">
                            {EXCHANGE_RATES.map((r) => (
                                <div key={r.to} className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFAF7] transition-colors">
                                    <span className="text-2xl">{r.flag}</span>
                                    <div className="flex-1">
                                        <p className="font-bold text-[#1A1A2E]">XAF / {r.to}</p>
                                        <p className="text-xs text-[#888]">1 {r.to} = {r.rate} XAF</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Georgia, serif' }}>{r.rate}</p>
                                        <p
                                            className="text-xs font-medium"
                                            style={{ color: r.trend === 'up' ? '#4CAF50' : r.trend === 'down' ? '#E53935' : '#888' }}
                                        >
                                            {r.trend === 'up' ? '▲' : r.trend === 'down' ? '▼' : '—'} {r.change}
                                        </p>
                                    </div>
                                    <button
                                        className="ml-4 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                        style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
                                    >
                                        Envoyer
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
