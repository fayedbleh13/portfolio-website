import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from './LogoutButton'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/access')
    }

    return (
        <div className="min-h-screen flex bg-black">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col justify-between hidden md:flex">
                <div>
                    <h2 className="text-xl font-space-grotesk font-bold text-white tracking-widest uppercase mb-12">
                        SYS<span className="text-cyan-glow">INIT</span>
                    </h2>

                    <nav className="space-y-4">
                        <Link href="/sys-init" className="block text-sm font-mono text-white/50 hover:text-white transition-colors truncate">
                            [00] OVERVIEW
                        </Link>
                        <Link href="/sys-init/projects" className="block text-sm font-mono text-white/50 hover:text-white transition-colors truncate">
                            [01] PROJECTS_DB
                        </Link>
                        <Link href="/sys-init/settings" className="block text-sm font-mono text-white/50 hover:text-white transition-colors truncate">
                            [02] CORE_SETTINGS
                        </Link>
                    </nav>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/10">
                    <p className="text-xs font-mono text-white/30 truncate" title={user.email}>
                        ID: {user.email}
                    </p>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-hidden overflow-y-auto">
                {/* Background Glow */}
                <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-violet/5 blur-[150px] rounded-full pointer-events-none -z-10" />
                <div className="fixed bottom-0 left-64 w-[800px] h-[800px] bg-cyan-glow/5 blur-[150px] rounded-full pointer-events-none -z-10" />

                <div className="p-8 md:p-12 max-w-5xl mx-auto z-10 relative">
                    {children}
                </div>
            </main>
        </div>
    )
}
