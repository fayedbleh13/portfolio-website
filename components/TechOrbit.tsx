'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SKILLS = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Three.js', icon: '🧊' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Tailwind', icon: '🌊' },
    { name: 'Figma', icon: '🎨' },
    { name: 'GraphQL', icon: '◈' },
]

export default function TechOrbit() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    // Tilt the orbit on X-axis based on scroll
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15])

    return (
        <section ref={containerRef} className="py-32 relative flex justify-center overflow-hidden min-h-[80vh] items-center">

            {/* Section Header */}
            <div className="absolute top-10 left-0 w-full text-center">
                <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-gradient opacity-90">
                    TECH ORBIT
                </h2>
            </div>

            <div className="perspective-1000 relative">
                {/* Central Planet */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-violet via-deep-indigo to-obsidian shadow-[0_0_80px_rgba(139,92,246,0.5)] z-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-full opacity-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay" />
                    <span className="text-4xl">🌍</span>
                </div>

                <motion.div
                    style={{ rotateX }}
                    className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] preserve-3d animate-spin-slow z-10"
                >
                    {SKILLS.map((skill, i) => {
                        // Distribute items in a circle
                        const angle = (i / SKILLS.length) * 360
                        const radius = 280 // Increased radius
                        const rad = (angle * Math.PI) / 180

                        // Calculate position
                        const x = Math.sin(rad) * radius
                        const z = Math.cos(rad) * radius

                        return (
                            <div
                                key={skill.name}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backface-hidden"
                                style={{
                                    transform: `translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg)`,
                                }}
                            >
                                {/* Counter-rotate to face camera */}
                                <div
                                    className="w-16 h-16 md:w-24 md:h-24 glass-panel rounded-full flex flex-col items-center justify-center gap-1
                             hover:scale-125 hover:border-violet/80 transition-all duration-300 group cursor-default shadow-[0_0_20px_rgba(255,255,255,0.05)] animate-counter-spin-slow"
                                >
                                    <span className="text-xl md:text-3xl filter drop-shadow-lg">{skill.icon}</span>
                                    <span className="text-[8px] md:text-[10px] font-mono text-white/80 group-hover:text-cyan-glow opacity-0 group-hover:opacity-100 transition-opacity">
                                        {skill.name}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
