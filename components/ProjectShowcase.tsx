'use client'

import { PROJECTS } from '@/data/projects'
import ProjectCard from './ProjectCard'

export default function ProjectShowcase() {
    return (
        <section className="py-32 px-4 md:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-24">
                <h2 className="text-sm font-mono text-violet tracking-[0.5em] mb-4">Based on Data</h2>
                <h3 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white text-center">
                    SELECT WORKS
                </h3>
            </div>

            <div className="flex flex-col">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    )
}
