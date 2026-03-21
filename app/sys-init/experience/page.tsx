import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function WorkExperienceAdminPage() {
    const supabase = await createClient()

    const { data: experiences, error } = await supabase
        .from('work_experiences')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        return <div className="text-red-500">Error loading work experiences: {error.message}</div>
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-space-grotesk font-bold text-white tracking-widest uppercase">
                        WORK_EXPERIENCE_DB
                    </h1>
                    <p className="text-white/50 font-mono text-sm mt-2">
                        Manage professional history and career milestones.
                    </p>
                </div>

                <Link
                    href="/sys-init/experience/new"
                    className="px-6 py-3 bg-cyan-glow/10 border border-cyan-glow/50 text-cyan-glow hover:bg-cyan-glow/20 rounded-lg font-mono text-sm uppercase tracking-widest transition-colors"
                >
                    [+ ADD NEW RECORD]
                </Link>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-black/40">
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Role</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Company</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Duration</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experiences?.map((exp) => (
                            <tr key={exp.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <p className="font-space-grotesk font-bold text-white group-hover:text-cyan-glow transition-colors">
                                        {exp.role}
                                    </p>
                                </td>
                                <td className="p-4 text-sm text-white/70">
                                    {exp.company}
                                </td>
                                <td className="p-4">
                                    <span className="text-xs font-mono text-white/50">
                                        {exp.duration}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-4">
                                    <Link
                                        href={`/sys-init/experience/${exp.id}`}
                                        className="text-xs font-mono text-white/50 hover:text-white uppercase tracking-widest transition-colors"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {experiences?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-white/50 font-mono text-sm">
                                    No work experience records found. Add your first entry.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
