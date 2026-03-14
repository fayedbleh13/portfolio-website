import { createClient } from '@/lib/supabase/server'

export default async function SysInitDashboard() {
    const supabase = await createClient()

    // We can fetch quick stats here later (like total projects)
    const { count: projectCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-space-grotesk font-bold text-white tracking-widest uppercase mb-2">
                    NEXUS CONTROL
                </h1>
                <p className="text-white/50 font-mono text-sm">
                    System runtime active. Awaiting operator input.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Card */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-cyan-glow/30 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                        <h3 className="text-xs font-mono text-white/50 tracking-widest uppercase mb-4">Active Projects</h3>
                        <p className="text-5xl font-space-grotesk font-bold text-white">
                            {projectCount ?? 0}
                        </p>
                    </div>
                </div>

                {/* Status Card */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-violet/30 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <h3 className="text-xs font-mono text-white/50 tracking-widest uppercase mb-4">Database Link</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981] animate-pulse" />
                            <span className="text-sm font-mono text-emerald-500 uppercase tracking-widest">Connected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
