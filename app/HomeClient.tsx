"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import dynamic from "next/dynamic";
import InitializeOverlay from "@/components/InitializeOverlay";
import HeroSection from "@/components/HeroSection";
import DualNature from "@/components/DualNature";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import LeadershipSection from "@/components/LeadershipSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import FloatingDock from "@/components/FloatingDock";
import { WorkExperience } from "@/components/WorkExperienceSection";

// Lazy load heavy 3D component — deferred to avoid blocking FCP
const ParticleOrb = dynamic(() => import("@/components/three/ParticleOrb"), {
  loading: () => null,
  ssr: false
});

export type Project = {
    id: string;
    title: string;
    category: string;
    description: string;
    image_url: string;
    image_urls: string[];
    project_url: string;
    tech_tags: string[];
    color: string;
    span: string;
    published: boolean;
};

export type HomeClientProps = {
    settings: Record<string, string>;
    experiences: WorkExperience[];
    projects: Project[];
};

export default function HomeClient({ settings, experiences, projects }: HomeClientProps) {
    const { isInitialized } = useAppStore();
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Parallax & Scroll setup
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [percentage, setPercentage] = useState(0);
    useEffect(() => {
        return scrollYProgress.on("change", (v) => setPercentage(Math.round(v * 100)));
    }, [scrollYProgress]);

    // Background Layer Transforms
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
    
    // Dynamic Spotlight (Following Scroll) - More prominent now
    const spotlightY = useSpring(useTransform(scrollYProgress, [0, 1], ["0vh", "80vh"]), {
        stiffness: 80,
        damping: 30
    });

    // Section Offsets
    const aboutY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
    const expY = useTransform(scrollYProgress, [0.2, 0.5], [0, -50]);
    const leadY = useTransform(scrollYProgress, [0.4, 0.7], [0, -40]);
    const projY = useTransform(scrollYProgress, [0.6, 1], [0, -30]);

    return (
        <main ref={containerRef} className="min-h-screen relative bg-black selection:bg-cyan-glow/30 overflow-x-hidden">
            {/* 1. DEPTH-LINKED BACKGROUND RE-ENGINEERED (AMPLIFIED GLOWS) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Fixed Grid Layer */}
                <motion.div 
                    style={{ y: gridY }}
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:10rem_10rem] opacity-30"
                />

                {/* Moving Ambient Glows (Fills the "Empty" Black Space) */}
                <motion.div 
                    style={{ y: bgY }}
                    className="absolute inset-0 z-0"
                >
                    {/* Top Glow (Violet) - Much Hotter */}
                    <div className="absolute top-[5%] left-[10%] w-[800px] h-[800px] bg-[#8B5CF6]/20 blur-[130px] rounded-full mix-blend-screen opacity-60" />
                    
                    {/* Middle Glow (Cyan) - Much Hotter */}
                    <div className="absolute top-[35%] right-[0%] w-[900px] h-[900px] bg-[#22d3ee]/15 blur-[160px] rounded-full mix-blend-screen opacity-50" />
                    
                    {/* Bottom Glow (Violet) - Much Hotter */}
                    <div className="absolute top-[65%] left-[0%] w-[1000px] h-[1000px] bg-[#8B5CF6]/15 blur-[180px] rounded-full mix-blend-screen opacity-40" />

                    {/* New Accent: Deep Indigo Glow */}
                    <div className="absolute top-[85%] right-[20%] w-[600px] h-[600px] bg-[#4F46E5]/15 blur-[120px] rounded-full mix-blend-screen opacity-40" />
                </motion.div>

                {/* Scroll-Following Primary Spotlight - Brighter Gradient */}
                <motion.div 
                    style={{ y: spotlightY }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[50vh] bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent blur-3xl opacity-80"
                />

                {/* Subtle Scanning Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.005)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />
            </div>

            {/* Depth Progress Sidebar */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isInitialized ? 1 : 0, x: 0 }}
                className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4"
            >
                <div className="h-32 w-[1px] bg-white/5 relative">
                    <motion.div 
                        style={{ height: `${percentage}%` }}
                        className="absolute top-0 left-0 w-full bg-cyan-glow shadow-[0_0_10px_#22d3ee]"
                    />
                </div>
                <div className="rotate-90 origin-left translate-x-3 mt-4">
                    <span className="text-[10px] font-mono text-white/40 tracking-[0.2em] whitespace-nowrap">
                        DEPTH: <span className="text-cyan-glow">{percentage.toString().padStart(3, '0')}%</span>
                    </span>
                </div>
            </motion.div>

            {/* 2. HERO: PARTICLES LOCATED HERE SO THEY SCROLL AWAY */}
            <div className="relative h-screen overflow-hidden">
                <ParticleOrb />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInitialized ? 1 : 0 }}
                    transition={{ duration: 1.2 }}
                    className="relative z-10 h-full"
                >
                    <section id="hero" className="h-full">
                        <HeroSection
                            tagline={settings.hero_tagline || "Latency is the enemy."}
                            subtitle={settings.hero_subtitle || "Re-imagining the digital frontier. \n Where logic meets emotion."}
                        />
                    </section>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!isInitialized && <InitializeOverlay />}
                </AnimatePresence>
            </div>

            {/* 3. TRANSITION SECTIONS */}
            <AnimatePresence>
                {isInitialized && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative z-10"
                    >
                        <FloatingDock />

                        <motion.section id="about" style={{ y: aboutY }} className="relative z-20">
                            <DualNature
                                aboutArchitect={settings.about_architect}
                                aboutCreator={settings.about_creator}
                            />
                        </motion.section>

                        <motion.section id="experience" style={{ y: expY }} className="relative z-30">
                            <WorkExperienceSection experiences={experiences} />
                        </motion.section>

                        <motion.section id="leadership" style={{ y: leadY }} className="relative z-20">
                            <LeadershipSection />
                        </motion.section>

                        <motion.section id="featured" style={{ y: projY }} className="relative z-10">
                            <FeaturedProjects projects={projects} />
                        </motion.section>

                        <footer className="py-20 text-center text-white/10 font-mono text-[10px] tracking-widest relative z-50">
                            <p>
                                SYSTEM DEPTH: 100% &bull; OPERATIONAL &bull; MMXXVI
                            </p>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
