'use client'

interface TopbarProps {
    breadcrumb: string
    title: string
}

export default function Topbar({ breadcrumb, title }: TopbarProps) {
    return (
        <header
            className="fixed top-0 left-[280px] right-0 h-[72px] flex items-center justify-between px-10 z-30"
            style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E0D9CC' }}
        >
            <div>
                <p className="text-[#888] text-xs tracking-wider uppercase">{breadcrumb}</p>
                <h1 className="text-[#1A1A2E] text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                    {title}
                </h1>
            </div>
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="🔍  Rechercher..."
                        className="dm-input !w-[220px] !py-2 text-sm"
                    />
                </div>
                {/* Bell */}
                <button
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: '#F0EDE5' }}
                >
                    🔔
                    <span
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-[#1A1A2E]"
                        style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C878)' }}
                    >
            3
          </span>
                </button>
                {/* Avatar */}
                <button
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: 'rgba(201,168,76,0.2)' }}
                >
                    👤
                </button>
            </div>
        </header>
    )
}
