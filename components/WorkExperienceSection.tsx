"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export interface WorkExperience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
    technologies: string[];
    featured_projects?: string[];
    is_featured?: boolean;
    display_order?: number;
}

interface WorkExperienceSectionProps {
    experiences: WorkExperience[];
}

const EXPERIENCES_TO_SHOW_EXPANDED = 3;

export default function WorkExperienceSection({
    experiences,
}: WorkExperienceSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!experiences || experiences.length === 0) {
        return (
            <section
                id="experience"
                className="py-32 px-4 relative overflow-hidden"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-white/50 font-mono text-sm tracking-widest">
                        NO OPERATIONAL RECORDS FOUND.
                    </p>
                </div>
            </section>
        );
    }

    // Sort by display_order
    const sortedExperiences = [...experiences].sort(
        (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
    );

    // Split into expanded and collapsed
    const expandedExperiences = sortedExperiences.slice(
        0,
        EXPERIENCES_TO_SHOW_EXPANDED,
    );
    const collapsedExperiences = sortedExperiences.slice(
        EXPERIENCES_TO_SHOW_EXPANDED,
    );
    const shouldShowCollapse = collapsedExperiences.length > 0;

    return (
        <section
            id="experience"
            className="py-32 px-4 relative overflow-hidden"
        >
            {/* Background Accents */}
            <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-violet/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-cyan-glow/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-space-grotesk font-bold text-white mb-4 text-gradient-cyan"
                    >
                        OPERATIONAL HISTORY
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/40 font-mono text-sm tracking-[0.3em] uppercase"
                    >
                        Professional Milestones & Technical Deployments
                    </motion.p>
                </div>

                {/* Expanded Experience Cards (Top 3) */}
                <div className="space-y-12">
                    {expandedExperiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -20 : 20,
                            }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 bg-black/40 hover:border-white/20 transition-all duration-500">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="space-y-4 max-w-2xl">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-mono text-cyan-glow px-3 py-1 border border-cyan-glow/20 rounded-full bg-cyan-glow/5">
                                                {exp.duration}
                                            </span>
                                            <div className="h-[1px] w-8 bg-white/10" />
                                            <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
                                                {exp.company}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-4xl font-space-grotesk font-bold text-white group-hover:text-cyan-glow transition-colors">
                                            {exp.role}
                                        </h3>

                                        <p className="text-white/60 font-inter leading-relaxed">
                                            {exp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 pt-4">
                                            {exp.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-[10px] font-mono text-white/30 border border-white/5 px-2 py-1 rounded bg-white/5"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {exp.featured_projects &&
                                        exp.featured_projects.length > 0 && (
                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                <span className="text-[10px] font-mono text-white/20 tracking-tighter uppercase">
                                                    Primary Output
                                                </span>
                                                <div className="flex gap-2">
                                                    {exp.featured_projects.map(
                                                        (projId) => (
                                                            <Link
                                                                key={projId}
                                                                href={`/projects/${projId}`}
                                                                className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center group/proj hover:border-cyan-glow/50 transition-colors"
                                                            >
                                                                <span className="text-[10px] font-mono text-white/40 group-hover/proj:text-cyan-glow">
                                                                    {projId
                                                                        .substring(
                                                                            0,
                                                                            3,
                                                                        )
                                                                        .toUpperCase()}
                                                                </span>
                                                            </Link>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>

                            {/* Decorative line connector */}
                            {index !== expandedExperiences.length - 1 && (
                                <div className="hidden md:block absolute left-1/2 -bottom-12 w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Collapsed Previous Experience Section */}
                <AnimatePresence>
                    {shouldShowCollapse && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-12"
                        >
                            {/* Toggle Button */}
                            <motion.button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="w-full py-4 glass-panel rounded-2xl border border-white/10 hover:border-cyan-glow/50 transition-all group"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <motion.span
                                        animate={{
                                            rotate: isExpanded ? 180 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="text-cyan-glow"
                                    >
                                        ▼
                                    </motion.span>
                                    <span className="text-xs font-mono text-white/60 tracking-widest uppercase">
                                        {isExpanded
                                            ? "Hide Previous Experience"
                                            : `Previous Experience (${collapsedExperiences.length} more)`}
                                    </span>
                                </div>
                            </motion.button>

                            {/* Collapsed List */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="mt-6 space-y-4 overflow-hidden"
                                    >
                                        {collapsedExperiences.map(
                                            (exp, index) => (
                                                <motion.div
                                                    key={exp.id}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: index * 0.05,
                                                    }}
                                                    className="glass-panel px-6 py-4 rounded-xl border border-white/5 bg-black/30 hover:border-white/10 transition-all"
                                                >
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                        <div className="flex items-center gap-4 flex-wrap">
                                                            <span className="text-[10px] font-mono text-white/40 px-2 py-1">
                                                                {exp.duration}
                                                            </span>
                                                            <div className="h-4 w-px bg-white/10" />
                                                            <span className="text-sm font-mono text-white/60 tracking-wider uppercase">
                                                                {exp.company}
                                                            </span>
                                                            <div className="h-4 w-px bg-white/10" />
                                                            <span className="text-sm font-space-grotesk font-bold text-white">
                                                                {exp.role}
                                                            </span>
                                                        </div>

                                                        {exp.featured_projects &&
                                                            exp
                                                                .featured_projects
                                                                .length > 0 && (
                                                                <div className="flex gap-2">
                                                                    {exp.featured_projects.map(
                                                                        (
                                                                            projId,
                                                                        ) => (
                                                                            <Link
                                                                                key={
                                                                                    projId
                                                                                }
                                                                                href={`/projects/${projId}`}
                                                                                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[8px] font-mono text-white/40 hover:border-cyan-glow/50 hover:text-cyan-glow transition-colors"
                                                                            >
                                                                                {projId
                                                                                    .substring(
                                                                                        0,
                                                                                        3,
                                                                                    )
                                                                                    .toUpperCase()}
                                                                            </Link>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            )}
                                                    </div>
                                                </motion.div>
                                            ),
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
