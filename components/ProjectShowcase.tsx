'use client'

import ProjectCard, { Project } from './ProjectCard'

interface ProjectShowcaseProps {
    projects: Project[]
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
    return (
        <section className="py-32 px-4 md:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-24">
                <h2 className="text-sm font-mono text-violet tracking-[0.5em] mb-4">Based on Data</h2>
                <h3 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white text-center">
                    SELECT WORKS
                </h3>
            </div>

            <div className="flex flex-col">
                {projects?.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    )
}
