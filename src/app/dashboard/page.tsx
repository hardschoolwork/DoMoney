import Topbar from '../../components/topbar'
import { MOCK_BENEFICIAIRES, MOCK_TRANSACTIONS } from '@/lib/constants'

const stats = [
    { label: 'Solde principal', value: '892 500', currency: 'XAF', sub: '≈ 1,361.32 EUR', icon: '💳', trend: '+12.4%', trendUp: true, color: 'gold' },
    { label: 'Envoyé ce mois', value: '125 000', currency: 'XAF', sub: '5 transactions', icon: '📤', trend: '+8.2%', trendUp: true, color: 'blue' },
    { label: 'Reçu ce mois', value: '48 500', currency: 'XAF', sub: '2 transactions', icon: '📥', trend: '-3.1%', trendUp: false, color: 'green' },
    { label: 'Frais payés', value: '856', currency: 'XAF', sub: '0.5% moy.', icon: '💰', trend: '+0.5%', trendUp: true, color: 'purple' },
]

export default function DashboardPage() {
    return (
        <>
            <Topbar breadcrumb="TABLEAU DE BORD" title="Bonjour, Jean-Paul 👋" />
            <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-5 mb-8">
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="rounded-2xl p-6"
                            style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0EDE5' }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-3xl">{s.icon}</div>
                                <span
                                    className="text-xs font-semibold px-2 py-1 rounded-full"
                                    style={
                                        s.trendUp
                                            ? { background: 'rgba(76,175,80,0.1)', color: '#4CAF50' }
                                            : { background: 'rgba(229,57,53,0.1)', color: '#E53935' }
                                    }
                                >
                  {s.trend}
                </span>
                            </div>
                            <p className="text-[#888] text-xs tracking-wider uppercase mb-1">{s.label}</p>
                            <p className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Georgia, serif' }}>
                                {s.value} <span className="text-sm text-[#9999BB]">{s.currency}</span>
                            </p>
                            <p className="text-xs text-[#888] mt-1">{s.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Quick actions */}
                    <div className="rounded-2xl p-6 col-span-1" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                        <h3 className="text-base font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Actions rapides</h3>
                        <div className="w-10 h-0.5 rounded mb-5" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />
                        <div className="space-y-3">
                            {[
                                { icon: '💸', label: 'Envoyer', sub: 'Vers un bénéficiaire', href: '/transfert' },
                                { icon: '📋', label: 'Historique', sub: 'Voir les transactions', href: '/historique' },
                                { icon: '👥', label: 'Bénéficiaires', sub: 'Gérer les contacts', href: '/beneficiaires' },
                                { icon: '📊', label: 'Taux de change', sub: 'Consulter en direct', href: '/taux-change' },
                            ].map((a) => (
                                <a
                                    key={a.label}
                                    href={a.href}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F7F4] transition-colors group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                                        style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(232,200,120,0.08))' }}
                                    >
                                        {a.icon}
                                    </div>
                                    <div>
                                        <p className="text-[#1A1A2E] font-medium text-sm">{a.label}</p>
                                        <p className="text-[#888] text-xs">{a.sub}</p>
                                    </div>
                                    <span className="ml-auto text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Recent transactions */}
                    <div className="col-span-2 rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-base font-bold text-[#1A1A2E]" style={{ fontFamily: 'Georgia, serif' }}>Transactions récentes</h3>
                            <a href="/historique" className="text-[#C9A84C] text-sm hover:underline">Voir tout →</a>
                        </div>
                        <div className="w-10 h-0.5 rounded mb-5" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }} />
                        <div className="space-y-3">
                            {MOCK_TRANSACTIONS.slice(0, 4).map((tx) => (
                                <div key={tx.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8F7F4] transition-colors">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                                        style={{ background: `${tx.color}22`, color: tx.color }}
                                    >
                                        {tx.initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-[#1A1A2E]">{tx.recipient}</p>
                                        <p className="text-xs text-[#888]">{tx.country} · {tx.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm" style={{ color: tx.type === 'envoi' ? '#E53935' : '#4CAF50' }}>
                                            {tx.type === 'envoi' ? '-' : '+'}{tx.amountSent}
                                        </p>
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full"
                                            style={
                                                tx.status === 'completed' ? { background: 'rgba(76,175,80,0.1)', color: '#4CAF50' }
                                                    : tx.status === 'pending' ? { background: 'rgba(255,152,0,0.1)', color: '#FF9800' }
                                                        : { background: 'rgba(229,57,53,0.1)', color: '#E53935' }
                                            }
                                        >
                      {tx.status === 'completed' ? '✓ Complété' : tx.status === 'pending' ? '⏳ En attente' : '✕ Annulé'}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Beneficiaries quick bar */}
                <div className="mt-6 rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-[#1A1A2E]" style={{ fontFamily: 'Georgia, serif' }}>Bénéficiaires fréquents</h3>
                        <a href="/beneficiaires" className="text-[#C9A84C] text-sm hover:underline">Gérer →</a>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {MOCK_BENEFICIAIRES.slice(0, 5).map((b) => (
                            <div
                                key={b.name}
                                className="flex flex-col items-center gap-2 min-w-20 p-3 rounded-xl cursor-pointer hover:bg-[#F8F7F4] transition-colors"
                            >
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{ background: `${b.color}22`, color: b.color }}
                                >
                                    {b.initials}
                                </div>
                                <p className="text-xs text-[#1A1A2E] font-medium text-center whitespace-nowrap">{b.name.split(' ')[0]}</p>
                                <p className="text-xs text-[#888]">{b.flag}</p>
                            </div>
                        ))}
                        <a
                            href="/beneficiaires"
                            className="flex flex-col items-center gap-2 min-w-20 p-3 rounded-xl hover:bg-[#F8F7F4] transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light text-[#C9A84C]" style={{ border: '2px dashed #C9A84C' }}>
                                +
                            </div>
                            <p className="text-xs text-[#C9A84C] font-medium">Ajouter</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
