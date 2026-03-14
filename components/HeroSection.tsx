'use client'

import { motion } from 'framer-motion'
import ParticleOrb from './three/ParticleOrb'
import TypewriterText from './TypewriterText'

export default function HeroSection({ tagline, subtitle }: { tagline?: string, subtitle?: string }) {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <ParticleOrb />

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] text-cyan-glow mb-6 backdrop-blur-md uppercase">
                        {tagline || "INITIALIZING SYSTEM..."}
                    </span>
                </motion.div>

                <h1 className="text-6xl md:text-9xl font-bold font-space-grotesk tracking-tighter mb-6 relative z-10 text-gradient">
                    <TypewriterText text="DIGITAL SOUL" />
                </h1>

                <p className="text-white/60 font-inter max-w-lg mx-auto mb-10 text-lg whitespace-pre-wrap">
                    {subtitle}
                </p>

                <div className="flex items-center justify-center gap-2 animate-fade-in opacity-0" style={{ animationDelay: '2s' }}>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-green-500 tracking-widest uppercase">
                        System Online
                    </span>
                </div>
            </div>

            {/* Scroll Indicator Removed */}
        </section>
    )
}
