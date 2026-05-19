import Topbar from '../../components/topbar'
import { MOCK_BENEFICIAIRES, MOCK_TRANSACTIONS } from '@/lib/constants'

const stats = [
    { label: 'Solde principal', value: '892 500', currency: 'XAF', sub: '≈ 1 361.32 EUR', icon: '💳', trend: '+12.4%', up: true },
    { label: 'Envoyé ce mois',  value: '125 000', currency: 'XAF', sub: '5 transactions',  icon: '📤', trend: '+8.2%',  up: true },
    { label: 'Reçu ce mois',    value: '48 500',  currency: 'XAF', sub: '2 transactions',  icon: '📥', trend: '-3.1%',  up: false },
    { label: 'Frais payés',     value: '856',     currency: 'XAF', sub: '0.5% moy.',       icon: '💰', trend: '+0.5%',  up: true },
]

export default function DashboardPage() {
    return (
        <>

            <div style={{ padding: '28px 32px' }}>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '24px' }}>
                    {stats.map(s => (
                        <div key={s.label} className="dm-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <span style={{ fontSize: '28px' }}>{s.icon}</span>
                                <span style={{
                                    fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
                                    background: s.up ? 'rgba(76,175,80,0.1)' : 'rgba(229,57,53,0.1)',
                                    color: s.up ? '#2E7D32' : '#C62828',
                                }}>{s.trend}</span>
                            </div>
                            <p style={{ fontSize: '10px', color: '#999', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{s.label}</p>
                            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#1A1A2E', fontFamily: 'Georgia,serif' }}>
                                {s.value} <span style={{ fontSize: '12px', color: '#9999BB' }}>{s.currency}</span>
                            </p>
                            <p style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>{s.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Ligne 2 : actions rapides + transactions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>

                    {/* Actions rapides */}
                    <div className="dm-card">
                        <h3 style={{ fontWeight: 'bold', fontSize: '15px', color: '#1A1A2E', fontFamily: 'Georgia,serif', marginBottom: '4px' }}>Actions rapides</h3>
                        <div className="gold-divider" />
                        {[
                            { icon: '💸', label: 'Envoyer', sub: 'Vers un bénéficiaire', href: '/dashboard/transfert' },
                            { icon: '📋', label: 'Historique', sub: 'Voir les transactions', href: '/dashboard/historique' },
                            { icon: '👥', label: 'Bénéficiaires', sub: 'Gérer les contacts', href: '/dashboard/beneficiaires' },
                            { icon: '📊', label: 'Taux de change', sub: 'Consulter en direct', href: '/dashboard/taux-change' },
                        ].map(a => (
                            <a key={a.label} href={a.href} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '10px', textDecoration: 'none', marginBottom: '4px' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                                    background: 'rgba(201,168,76,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                                }}>{a.icon}</div>
                                <div>
                                    <p style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A2E' }}>{a.label}</p>
                                    <p style={{ fontSize: '11px', color: '#888' }}>{a.sub}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Transactions récentes */}
                    <div className="dm-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <h3 style={{ fontWeight: 'bold', fontSize: '15px', color: '#1A1A2E', fontFamily: 'Georgia,serif' }}>Transactions récentes</h3>
                            <a href="/dashboard/historique" style={{ color: '#C9A84C', fontSize: '13px', textDecoration: 'none' }}>Voir tout →</a>
                        </div>
                        <div className="gold-divider" />
                        {MOCK_TRANSACTIONS.slice(0, 4).map(tx => (
                            <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px', borderRadius: '10px', marginBottom: '4px' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                                    background: tx.color + '22', color: tx.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '13px', fontWeight: 'bold',
                                }}>{tx.initials}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A2E' }}>{tx.recipient}</p>
                                    <p style={{ fontSize: '11px', color: '#888' }}>{tx.country} · {tx.date}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 'bold', fontSize: '13px', color: tx.type === 'envoi' ? '#C62828' : '#2E7D32' }}>
                                        {tx.type === 'envoi' ? '-' : '+'}{tx.amountSent}
                                    </p>
                                    <span className={tx.status === 'completed' ? 'badge-completed' : tx.status === 'pending' ? 'badge-pending' : 'badge-cancelled'}>
                    {tx.status === 'completed' ? '✓ Complété' : tx.status === 'pending' ? '⏳ En attente' : '✕ Annulé'}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bénéficiaires fréquents */}
                <div className="dm-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '15px', color: '#1A1A2E', fontFamily: 'Georgia,serif' }}>Bénéficiaires fréquents</h3>
                        <a href="/dashboard/beneficiaires" style={{ color: '#C9A84C', fontSize: '13px', textDecoration: 'none' }}>Gérer →</a>
                    </div>
                    <div className="gold-divider" />
                    <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
                        {MOCK_BENEFICIAIRES.slice(0, 5).map(b => (
                            <div key={b.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '70px', cursor: 'pointer' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: b.color + '22', color: b.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '13px', fontWeight: 'bold',
                                }}>{b.initials}</div>
                                <p style={{ fontSize: '11px', color: '#1A1A2E', fontWeight: 500, textAlign: 'center' }}>{b.name.split(' ')[0]}</p>
                                <p style={{ fontSize: '11px', color: '#888' }}>{b.flag}</p>
                            </div>
                        ))}
                        <a href="/dashboard/beneficiaires" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '70px', textDecoration: 'none' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                border: '2px dashed #C9A84C', color: '#C9A84C',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                            }}>+</div>
                            <p style={{ fontSize: '11px', color: '#C9A84C', fontWeight: 500 }}>Ajouter</p>
                        </a>
                    </div>
                </div>

            </div>
        </>
    )
}
