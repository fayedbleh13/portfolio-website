'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

type Project = {
    id: string
    title: string
    category: string
    description: string
    span: string
    color: string
}

export default function BentoGrid({ projects }: { projects: Project[] }) {
    if (!projects || projects.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-white/50 font-mono text-sm tracking-widest">NO PUBLISHED RECORDS FOUND.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
            {projects.map((project, i) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`${project.span} group relative overflow-hidden rounded-3xl glass-panel p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-500 min-h-[240px] border border-white/5 bg-black/40`}
                >
                    {/* Background Gradient Blob */}
                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${project.color} opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity duration-500`} />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase border border-white/10 px-2 py-1 rounded-full">
                                {project.category}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-cyan-glow transition-colors" />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-space-grotesk font-bold text-white mb-2 group-hover:text-cyan-glow transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-sm text-white/60 line-clamp-3">
                            {project.description}
                        </p>
                    </div>

                    <div className="relative z-10 mt-6 md:mt-0 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-xs font-mono tracking-widest text-cyan-glow flex items-center gap-2">
                            VIEW CASE STUDY <span className="text-lg">→</span>
                        </span>
                    </div>

                    {/* Interactive Overlay */}
                    <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20" />
                </motion.div>
            ))}
        </div>
    )
}
