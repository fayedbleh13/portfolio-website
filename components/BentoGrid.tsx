'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const PROJECTS = [
    {
        id: 'nebula-os',
        title: 'NEBULA_OS',
        category: 'SPATIAL COMPUTING',
        description: 'A browser-based operating system exploring spatial computing interfaces and file management in 3D space.',
        span: 'md:col-span-2 md:row-span-2',
        color: 'from-violet via-fuchsia-500 to-indigo-500'
    },
    {
        id: 'cypher-wallet',
        title: 'CYPHER_WALLET',
        category: 'FINTECH / SECURITY',
        description: 'Zero-knowledge proof crypto wallet with biometric security integration.',
        span: 'md:col-span-1 md:row-span-1',
        color: 'from-emerald-400 to-cyan-500'
    },
    {
        id: 'synapse-ai',
        title: 'SYNAPSE_AI',
        category: 'ARTIFICIAL INTELLIGENCE',
        description: 'Neural network visualization tool for real-time data processing streams.',
        span: 'md:col-span-1 md:row-span-1',
        color: 'from-orange-400 to-red-500'
    },
    {
        id: 'void-market',
        title: 'VOID_MARKET',
        category: 'DECENTRALIZED COMMERCE',
        description: 'Decentralized marketplace for digital assets with minimal gas fees.',
        span: 'md:col-span-2 md:row-span-1',
        color: 'from-blue-400 to-indigo-600'
    },
    {
        id: 'aura-glass',
        title: 'AURA_GLASS',
        category: 'AUGMENTED REALITY',
        description: 'Augmented reality interface for smart glasses, overlaying social stats in real-time.',
        span: 'md:col-span-1 md:row-span-1',
        color: 'from-pink-400 to-rose-500'
    },
    {
        id: 'echo-server',
        title: 'ECHO_SERVER',
        category: 'BACKEND INFRASTRUCTURE',
        description: 'High-performance websocket server handling 1M+ concurrent connections.',
        span: 'md:col-span-1 md:row-span-1',
        color: 'from-gray-200 to-slate-400'
    }
]

export default function BentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
            {PROJECTS.map((project, i) => (
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
