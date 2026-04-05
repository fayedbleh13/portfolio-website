'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export type Project = {
    id: string;
    title: string;
    category: string;
    description: string;
    image_url: string;
    tech_tags: string[];
}

export default function ProjectCard({ project, index }: { project: Project, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start']
    })

    // Parallax background scale
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

    // Title differential motion
    const y = useTransform(scrollYProgress, [0, 1], [0, -50])

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden group cursor-pointer mb-24"
        >
            {/* Background Image Layer */}
            <motion.div style={{ scale }} className="absolute inset-0 w-full h-full">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image_url})` }}
                />
                <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/20 transition-colors duration-500" />
            </motion.div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                <motion.div
                    style={{ y }}
                    className="glass-panel p-8 rounded-xl backdrop-blur-md border border-white/10 max-w-2xl relative z-10"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-xs text-cyan-glow tracking-widest">
                            0{index + 1}
                        </span>
                        <div className="h-px w-12 bg-white/20" />
                    </div>

                    <h3 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white mb-4 group-hover:text-violet transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-white/70 font-inter mb-6 max-w-lg">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.tech_tags?.map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white/50 bg-white/5">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

        </motion.div>
    )
}
