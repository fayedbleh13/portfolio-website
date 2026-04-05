"use client";

import { motion } from "framer-motion";
import { Skill } from "@/lib/supabase/skills";
import { getSkillIcon, getSkillColor } from "@/lib/skillIconMap";

interface SkillsMatrixProps {
    skills: Skill[];
}

export default function SkillsMatrix({ skills }: SkillsMatrixProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills.map((skill, i) => {
                    const Icon = getSkillIcon(skill.name);
                    const brandColor = getSkillColor(skill.name);

                    return (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04, duration: 0.3 }}
                            className="group relative bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-all duration-300 cursor-default"
                            style={{
                                ["--brand-color" as string]: brandColor,
                            }}
                        >
                            {/* Glow blob on hover */}
                            <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                                style={{ background: `${brandColor}15` }}
                            />

                            {/* Icon */}
                            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                                <Icon
                                    className="w-9 h-9 transition-colors duration-300 drop-shadow-md"
                                    style={{
                                        color: brandColor,
                                    }}
                                />
                            </div>

                            {/* Skill Name */}
                            <p className="relative z-10 text-[11px] font-mono text-white/50 text-center tracking-wide group-hover:text-white/80 transition-colors duration-300 leading-tight">
                                {skill.name}
                            </p>

                            {/* Corner accent */}
                            <div
                                className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ borderColor: `${brandColor}40` }}
                            />
                            <div
                                className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ borderColor: `${brandColor}40` }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
