import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ProjectsAdminPage() {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        return <div className="text-red-500">Error loading projects: {error.message}</div>
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-space-grotesk font-bold text-white tracking-widest uppercase">
                        PROJECTS_DB
                    </h1>
                    <p className="text-white/50 font-mono text-sm mt-2">
                        Manage portfolio records and visibility.
                    </p>
                </div>

                <Link
                    href="/sys-init/projects/new"
                    className="px-6 py-3 bg-cyan-glow/10 border border-cyan-glow/50 text-cyan-glow hover:bg-cyan-glow/20 rounded-lg font-mono text-sm uppercase tracking-widest transition-colors"
                >
                    [+ ADD NEW RECORD]
                </Link>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-black/40">
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Title</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Category</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Status</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects?.map((project) => (
                            <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <p className="font-space-grotesk font-bold text-white group-hover:text-cyan-glow transition-colors">
                                        {project.title}
                                    </p>
                                </td>
                                <td className="p-4 text-sm text-white/70">
                                    {project.category}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-mono uppercase tracking-widest ${project.published
                                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                            : 'bg-white/10 text-white/50 border border-white/20'
                                        }`}>
                                        {project.published ? 'LIVE' : 'DRAFT'}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-4">
                                    <Link
                                        href={`/sys-init/projects/${project.id}`}
                                        className="text-xs font-mono text-white/50 hover:text-white uppercase tracking-widest transition-colors"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {projects?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-white/50 font-mono text-sm">
                                    No records found in database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
