"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WORK_EXPERIENCES } from "@/data/workExperience";

type Project = {
    id: string;
    title: string;
    category: string;
    description: string;
    span: string;
    color: string;
    featured?: boolean;
};

export default function BentoGrid({ projects }: { projects: Project[] }) {
    if (!projects || projects.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-white/50 font-mono text-sm tracking-widest">
                    NO PUBLISHED RECORDS FOUND.
                </p>
            </div>
        );
    }

    // Helper to find work experience related to a project
    const getRelatedWork = (projectId: string) => {
        return WORK_EXPERIENCES.find((exp) =>
            exp.featuredProjects?.includes(projectId),
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
            {projects.map((project, i) => {
                const relatedWork = getRelatedWork(project.id);

                return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${project.span} group relative overflow-hidden rounded-3xl glass-panel p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-500 min-h-[240px] border border-white/5 bg-black/40`}
                    >
                        {/* Background Gradient Blob */}
                        <div
                            className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${project.color} opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity duration-500`}
                        />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase border border-white/10 px-2 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                    {project.featured && (
                                        <span className="text-[10px] font-mono tracking-widest text-cyan-glow uppercase border border-cyan-glow/30 px-2 py-1 rounded-full bg-cyan-glow/10">
                                            FEATURED
                                        </span>
                                    )}
                                </div>
                                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-cyan-glow transition-colors" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-space-grotesk font-bold text-white mb-2 group-hover:text-cyan-glow transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-sm text-white/60 line-clamp-3">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1.5 mt-4">
                                {project.id === "nexus" && (
                                    <>
                                        <span className="text-[9px] font-mono text-white/30 border border-white/5 px-1.5 py-0.5 rounded">
                                            Three.js
                                        </span>
                                        <span className="text-[9px] font-mono text-white/30 border border-white/5 px-1.5 py-0.5 rounded">
                                            React
                                        </span>
                                        <span className="text-[9px] font-mono text-white/30 border border-white/5 px-1.5 py-0.5 rounded">
                                            WebGL
                                        </span>
                                    </>
                                )}
                                {project.id === "aether" && (
                                    <>
                                        <span className="text-[9px] font-mono text-white/30 border border-white/5 px-1.5 py-0.5 rounded">
                                            Next.js
                                        </span>
                                        <span className="text-[9px] font-mono text-white/30 border border-white/5 px-1.5 py-0.5 rounded">
                                            Framer
                                        </span>
                                    </>
                                )}
                                {project.id === "chronos" && (
                                    <>
                                        <span className="text-[9px] font-mono text-white/30 border border-white/5 px-1.5 py-0.5 rounded">
                                            Solidity
                                        </span>
                                        <span className="text-[9px] font-mono text-white/30 border border-white/5 px-1.5 py-0.5 rounded">
                                            Ethers.js
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Work Experience Context */}
                            {relatedWork && (
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet/80" />
                                        <span className="text-[9px] font-mono text-white/30 tracking-wider uppercase">
                                            Deployed at
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-mono text-white/50">
                                        {relatedWork.company}
                                    </p>
                                    <p className="text-[9px] font-mono text-white/30">
                                        {relatedWork.duration}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="relative z-10 mt-4 md:mt-0 flex items-center justify-between gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <Link
                                href={`/projects/${project.id}`}
                                className="text-xs font-mono tracking-widest text-cyan-glow flex items-center gap-2 hover:text-white transition-colors"
                            >
                                CASE STUDY <span className="text-lg">→</span>
                            </Link>
                            {relatedWork && (
                                <Link
                                    href="/#experience"
                                    className="text-[10px] font-mono tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded hover:border-violet/50 hover:text-violet transition-colors"
                                >
                                    VIEW WORK
                                </Link>
                            )}
                        </div>

                        {/* Interactive Overlay */}
                        <Link
                            href={`/projects/${project.id}`}
                            className="absolute inset-0 z-20"
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
