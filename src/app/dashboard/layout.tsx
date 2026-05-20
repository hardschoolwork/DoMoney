import Sidebar from '@/components/Sidebar'
import TopbarServer from '@/components/TopbarServer'

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F0E8' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '280px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <TopbarServer />
                <main style={{ flex: 1, paddingTop: '68px' }}>
                    {children}
                </main>
            </div>
        </div>
    )
}
