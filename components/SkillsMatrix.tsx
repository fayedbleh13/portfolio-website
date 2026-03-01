'use client'

import { motion } from 'framer-motion'

const SKILLS = [
    { name: 'REACT / NEXT.JS', level: 95, icon: '⚛️', status: 'OPTIMIZED' },
    { name: 'TYPESCRIPT', level: 90, icon: 'TS', status: 'STABLE' },
    { name: 'THREE.JS / WEBGL', level: 85, icon: '🧊', status: 'RENDERING' },
    { name: 'NODE.JS', level: 88, icon: '🟢', status: 'ACTIVE' },
    { name: 'TAILWIND CSS', level: 98, icon: '🌊', status: 'LOADED' },
    { name: 'GRAPHQL', level: 82, icon: '◈', status: 'CONNECTED' },
    { name: 'POSTGRESQL', level: 85, icon: '🐘', status: 'INDEXED' },
    { name: 'FIGMA / UI', level: 90, icon: '🎨', status: 'DESIGNING' },
]

export default function SkillsMatrix() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SKILLS.map((skill, i) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative bg-black/40 border border-white/10 rounded-xl p-6 hover:border-cyan-glow/50 transition-colors duration-300"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-4xl filter drop-shadow-lg grayscale group-hover:grayscale-0 transition-all duration-300">
                                {skill.icon}
                            </span>
                            <span className="text-[10px] font-mono text-cyan-glow/50 border border-cyan-glow/20 px-2 py-0.5 rounded bg-cyan-glow/5">
                                {skill.status}
                            </span>
                        </div>

                        <h3 className="font-space-grotesk font-bold text-white mb-2 tracking-wide group-hover:text-cyan-glow transition-colors">
                            {skill.name}
                        </h3>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                className="h-full bg-gradient-to-r from-violet to-cyan-glow"
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-mono text-white/40">
                            <span>CAPACITY</span>
                            <span>{skill.level}%</span>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
