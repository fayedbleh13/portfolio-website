'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import InitializeOverlay from '@/components/InitializeOverlay'
import HeroSection from '@/components/HeroSection'
import DualNature from '@/components/DualNature'
import ContactSection from '@/components/ContactSection'
import FloatingDock from '@/components/FloatingDock'
import ParticleOrb from '@/components/three/ParticleOrb'

type HomeClientProps = {
    settings: Record<string, string>
}

export default function HomeClient({ settings }: HomeClientProps) {
    const { isInitialized } = useAppStore()

    return (
        <main className="min-h-screen relative">
            <div className="relative h-screen overflow-hidden">
                <ParticleOrb />
                <AnimatePresence mode="wait">
                    {!isInitialized && <InitializeOverlay />}
                </AnimatePresence>

                {isInitialized && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="relative z-10 h-full"
                    >
                        <section id="hero" className="h-full">
                            <HeroSection
                                tagline={settings.hero_tagline || "Latency is the enemy."}
                                subtitle={settings.hero_subtitle || "Re-imagining the digital frontier. \n Where logic meets emotion."}
                            />
                        </section>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isInitialized && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="relative z-10"
                    >
                        <FloatingDock />

                        <section id="about">
                            <DualNature
                                aboutArchitect={settings.about_architect}
                                aboutCreator={settings.about_creator}
                            />
                        </section>

                        <section id="contact">
                            <ContactSection />
                        </section>

                        <footer className="py-8 text-center text-white/20 font-mono text-xs">
                            <p>DESIGNED BY STITCH &bull; BUILT BY ANTIGRAVITY &bull; 2026</p>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
