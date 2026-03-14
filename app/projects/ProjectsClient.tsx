'use client'

import { motion } from 'framer-motion'
import BentoGrid from '@/components/BentoGrid'

type Project = {
    id: string
    title: string
    category: string
    description: string
    span: string
    color: string
    published: boolean
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-4 text-gradient">
                    PROJECT ARCHIVE
                </h1>
                <p className="text-white/50 font-mono text-sm tracking-widest max-w-2xl mx-auto">
                    ENGINEERING DIGITAL EXPERIENCES AT THE INTERSECTION OF AESTHETICS AND PURE LOGIC.
                </p>
            </div>
            <BentoGrid projects={projects} />
        </motion.div>
    )
}
