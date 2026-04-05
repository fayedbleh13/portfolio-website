"use client";

import { motion } from "framer-motion";
import SkillsMatrix from "@/components/SkillsMatrix";
import ManifestoSection from "@/components/ManifestoSection";
import ScrambleText from "@/components/ScrambleText";
import { Skill } from "@/lib/supabase/skills";

interface SkillsPageClientProps {
    skills: Skill[];
}

export default function SkillsPageClient({ skills }: SkillsPageClientProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-4 text-gradient uppercase tracking-tighter shadow-cyan-glow/5">
                    <ScrambleText text="SYSTEM CAPABILITIES" duration={1.2} />
                </h1>
                <p className="text-white/50 font-mono text-sm tracking-widest">
                    CORE COMPETENCIES & OPERATIONAL PARAMETERS
                </p>
            </div>

            <SkillsMatrix skills={skills} />

            <div className="mt-20">
                <ManifestoSection />
            </div>
        </motion.div>
    );
}
