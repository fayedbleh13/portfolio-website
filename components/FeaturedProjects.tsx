'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import type { Project } from '@/app/HomeClient'
import ProjectModal from './ProjectModal'

interface FeaturedProjectsProps {
    projects?: Project[]
}

const FALLBACK_IMAGES = [
    '/gradient-mesh-default-1.png',
    '/gradient-mesh-default-2.png'
]

export default function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    return (
        <section id="featured" className="py-32 px-4 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-1/2 -left-64 w-[500px] h-[500px] bg-violet/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] bg-cyan-glow/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                {/* Section Header */}
                <div className="mb-16 text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-space-grotesk font-bold text-white mb-4 uppercase tracking-tighter"
                    >
                        FEATURED PROJECTS
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/40 font-mono text-sm tracking-[0.3em] uppercase max-w-2xl"
                    >
                        Selected Deployments & Technical Achievements
                    </motion.p>
                </div>

                {/* Vertical Stacked Layout */}
                <div className="flex flex-col gap-6 w-full">
                    {projects.map((project, index) => {
                        const bgImage = project.image_url || FALLBACK_IMAGES[index % 2]

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="group relative w-full cursor-pointer h-[320px] md:h-[400px] overflow-hidden rounded-2xl"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Background Image with Gradient Overlay */}
                                <div 
                                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), url(${bgImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />

                                {/* Project Content Overlay */}
                                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
                                    {/* Top Row: Category */}
                                    <div className="flex justify-between items-start w-full">
                                        <span className="text-xs md:text-sm font-mono tracking-widest text-white/80 uppercase border border-white/20 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
                                            {project.category} {"//"} {project.title}
                                        </span>
                                    </div>

                                    {/* Bottom Row: Title + CTA */}
                                    <div className="flex justify-between items-end w-full translate-y-4 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <h3 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white max-w-2xl leading-tight">
                                            {project.title}
                                        </h3>
                                        
                                        <div className="hidden md:flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-sm rounded-full font-bold uppercase tracking-widest hover:bg-cyan-glow transition-colors">
                                            CASE STUDY ↗
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* View All Projects Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-xs font-mono tracking-widest text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all uppercase"
                    >
                        View All Projects
                        <span className="text-lg">↘</span>
                    </Link>
                </motion.div>
            </div>

            <ProjectModal 
                project={selectedProject} 
                isOpen={!!selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </section>
    )
}
