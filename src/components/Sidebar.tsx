'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, MOCK_USER } from '@/lib/constants'
import Image from 'next/image'

// Dans le JSX, remplace le div rond "D" par :


export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside style={{
            position: 'fixed', left: 0, top: 0,
            width: '280px', height: '100vh',
            background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)',
            display: 'flex', flexDirection: 'column',
            zIndex: 40,
            borderRight: '1px solid rgba(201,168,76,0.15)',
        }}>
            {/* Barre or gauche */}
            <div style={{
                position: 'absolute', left: 0, top: 0,
                width: '3px', height: '100%',
                background: 'linear-gradient(180deg, #C9A84C, #E8C878)',
            }} />

            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 24px 16px' }}>

                <Image
                    src="/logo.png"       // ← ton fichier dans public/
                    alt="DoMoney"
                    width={42}
                    height={42}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                />

                <div>
                    <div style={{ fontWeight: 'bold', color: '#E8C878', fontSize: '18px', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
                        DoMoney
                    </div>
                    <div style={{ color: '#C9A84C', fontSize: '8px', letterSpacing: '3px', marginTop: '3px' }}>
                        TCHOKO TRANSFER
                    </div>
                </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 20px' }} />

            {/* Profil */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 20px' }}>
                <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: 'rgba(201,168,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0,
                }}>👤</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '13px' }}>{MOCK_USER.name}</div>
                    <div style={{ color: '#9999BB', fontSize: '11px' }}>{MOCK_USER.username}</div>
                </div>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#4CAF50', flexShrink: 0 }} />
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 20px' }} />

            {/* Navigation */}
            <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
                {NAV_ITEMS.map((group) => (
                    <div key={group.section} style={{ marginBottom: '8px' }}>
                        <p style={{
                            color: '#666688', fontSize: '9px', fontWeight: 600,
                            letterSpacing: '2px', padding: '8px 8px 4px',
                        }}>
                            {group.section}
                        </p>
                        {group.items.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link key={item.href} href={item.href} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 12px', borderRadius: '10px',
                                    marginBottom: '2px', textDecoration: 'none',
                                    background: isActive ? 'rgba(201,168,76,0.12)' : 'transparent',
                                    color: isActive ? '#E8C878' : '#9999BB',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                    fontSize: '13px',
                                    borderLeft: isActive ? '3px solid #C9A84C' : '3px solid transparent',
                                }}>
                                    <span style={{ fontSize: '15px' }}>{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                ))}
            </nav>

            {/* Notification box */}
            <div style={{ margin: '0 12px 16px' }}>
                <div style={{
                    borderRadius: '12px', padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '0.5px solid rgba(201,168,76,0.25)',
                    display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                    <span style={{ fontSize: '20px' }}>🔔</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: '#CCCCDD', fontSize: '12px', fontWeight: '500' }}>Notifications</div>
                        <div style={{ color: '#888', fontSize: '11px' }}>3 nouvelles alertes</div>
                    </div>
                    <div style={{
                        width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #C9A84C, #E8C878)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: 'bold', color: '#1A1A2E',
                    }}>3</div>
                </div>
            </div>
        </aside>
    )
}