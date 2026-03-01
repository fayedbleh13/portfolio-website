'use client'

import { motion } from 'framer-motion'
import SkillsMatrix from '@/components/SkillsMatrix'
import ManifestoSection from '@/components/ManifestoSection'
import FloatingDock from '@/components/FloatingDock'

export default function SkillsPage() {
    return (
        <main className="min-h-screen pt-32 pb-32">
            <FloatingDock />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-4 text-gradient">
                        SYSTEM CAPABILITIES
                    </h1>
                    <p className="text-white/50 font-mono text-sm tracking-widest">
                        CORE COMPETENCIES & OPERATIONAL PARAMETERS
                    </p>
                </div>

                <SkillsMatrix />

                <div className="mt-20">
                    <ManifestoSection />
                </div>
            </motion.div>
        </main>
    )
}
