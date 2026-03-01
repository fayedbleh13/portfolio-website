'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export default function DualNature() {
    const { isInitialized } = useAppStore()

    if (!isInitialized) return null

    return (
        <section className="relative min-h-screen py-32 px-4 md:px-0 overflow-hidden flex flex-col md:flex-row gap-8 md:gap-0">

            {/* Background divider */}
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 hidden md:block" />

            {/* The Architect (Left) */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex-1 flex flex-col items-end justify-center text-right pr-8 md:pr-16 relative"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF610_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF610_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="glass-panel p-8 md:p-12 rounded-2xl border-l-4 border-l-violet max-w-xl relative z-10 hover:border-violet/50 transition-colors">
                    <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white mb-4">
                        THE ARCHITECT
                    </h2>
                    <p className="font-mono text-cyan-glow/80 text-sm mb-6 tracking-widest">
            // LOGIC_CORE_INITIALIZED
                    </p>
                    <p className="text-white/70 font-inter leading-relaxed text-lg">
                        Obsessed with system architecture, performance optimization, and clean code.
                        Building scalable digital infrastructures that stand the test of time.
                    </p>
                    <div className="flex gap-4 mt-8 justify-end text-2xl text-white/40">
                        <span title="System Design">🏗️</span>
                        <span title="Cloud Architecture">☁️</span>
                        <span title="Security">🔒</span>
                    </div>
                </div>
            </motion.div>

            {/* The Creator (Right) */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex-1 flex flex-col items-start justify-center pl-8 md:pl-16 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none" />

                <div className="glass-panel p-8 md:p-12 rounded-2xl border-r-4 border-r-cyan-glow max-w-xl relative z-10 hover:border-cyan-glow/50 transition-colors">
                    <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white mb-4">
                        THE CREATOR
                    </h2>
                    <p className="font-serif italic text-violet/80 text-sm mb-6 tracking-widest">
                        Wait for the soul to ignite...
                    </p>
                    <p className="text-white/70 font-inter leading-relaxed text-lg">
                        Crafting immersive user experiences that resonate on an emotional level.
                        Translating complex logic into fluid, beautiful interactions.
                    </p>
                    <div className="flex gap-4 mt-8 text-2xl text-white/40">
                        <span title="UI/UX Design">✨</span>
                        <span title="Motion Design">🎬</span>
                        <span title="Accessibility">👁️</span>
                    </div>
                </div>
            </motion.div>

        </section>
    )
}
