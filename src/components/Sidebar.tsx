'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, MOCK_USER } from '@/lib/constants'

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside
            className="fixed left-0 top-0 h-screen w-[280px] flex flex-col z-40"
            style={{ background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)' }}
        >
            {/* Gold accent left border */}
            <div
                className="absolute left-0 top-0 w-[3px] h-full"
                style={{ background: 'linear-gradient(180deg, #C9A84C, #E8C878)' }}
            />

            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#1A1A2E] text-lg"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }}
                >
                    D
                </div>
                <div>
                    <div className="font-bold text-[#E8C878] text-lg leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                        DoMoney
                    </div>
                    <div className="text-[#C9A84C] text-[9px] tracking-[3px] mt-0.5">TCHOKO TRANSFER</div>
                </div>
            </div>

            <div className="mx-6 h-px bg-white opacity-5" />

            {/* User profile */}
            <div className="flex items-center gap-3 px-6 py-4">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'rgba(201,168,76,0.2)' }}
                >
                    👤
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-sm truncate">{MOCK_USER.name}</div>
                    <div className="text-[#9999BB] text-xs">{MOCK_USER.username}</div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>

            <div className="mx-6 h-px bg-white opacity-5" />

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 pt-4 space-y-1">
                {NAV_ITEMS.map((group) => (
                    <div key={group.section} className="mb-3">
                        <p className="text-[#666688] text-[9px] font-semibold tracking-[2px] px-2 mb-1">
                            {group.section}
                        </p>
                        {group.items.map((item) => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 relative group"
                                    style={
                                        isActive
                                            ? { background: 'rgba(201,168,76,0.12)', color: '#E8C878' }
                                            : { color: '#9999BB' }
                                    }
                                >
                                    {/* Active left bar */}
                                    {isActive && (
                                        <div
                                            className="absolute left-0 top-1 bottom-1 w-1 rounded-r-sm"
                                            style={{ background: 'linear-gradient(180deg, #C9A84C, #E8C878)' }}
                                        />
                                    )}
                                    <span className="text-base">{item.icon}</span>
                                    <span className={`font-${isActive ? 'bold' : 'normal'}`}>{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                ))}
            </nav>

            {/* Notification box */}
            <div className="mx-4 mb-4">
                <div
                    className="rounded-xl p-3 flex items-center gap-3"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(201,168,76,0.3)' }}
                >
                    <span className="text-2xl">🔔</span>
                    <div className="flex-1 min-w-0">
                        <div className="text-[#CCCCDD] text-xs font-medium">Notifications</div>
                        <div className="text-[#888] text-xs">3 nouvelles alertes</div>
                    </div>
                    <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-[#1A1A2E]"
                        style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }}
                    >
                        3
                    </div>
                </div>
            </div>

            {/* Logout */}
            <button className="flex items-center gap-2 px-6 py-4 text-[#666688] text-sm hover:text-[#C9A84C] transition-colors border-t border-white/5 text-left">
                <span>🚪</span>
                <span>Déconnexion</span>
            </button>
        </aside>
    )
}
