import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen" style={{ background: 'linear-gradient(135deg, #FAFAF7 0%, #F5F0E8 100%)' }}>
            <Sidebar />
            <main className="flex-1 ml-[280px] pt-[72px] min-h-screen">
                {children}
            </main>
        </div>
    )
}
