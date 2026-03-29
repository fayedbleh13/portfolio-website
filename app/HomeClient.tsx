"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import dynamic from "next/dynamic";
import InitializeOverlay from "@/components/InitializeOverlay";
import HeroSection from "@/components/HeroSection";
import DualNature from "@/components/DualNature";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import FloatingDock from "@/components/FloatingDock";

// Lazy load heavy 3D component
const ParticleOrb = dynamic(() => import("@/components/three/ParticleOrb"), {
  loading: () => null,
  ssr: false
});

import { WorkExperience } from "@/components/WorkExperienceSection";

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

type HomeClientProps = {
    settings: Record<string, string>;
    experiences: WorkExperience[];
    projects: Project[];
};

export default function HomeClient({ settings, experiences, projects }: HomeClientProps) {
    const { isInitialized } = useAppStore();

    return (
        <main className="min-h-screen relative">
            <div className="relative h-screen overflow-hidden">
                <ParticleOrb />
                <AnimatePresence mode="wait">
                    {!isInitialized && <InitializeOverlay />}
                </AnimatePresence>

                {isInitialized && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="relative z-10 h-full"
                    >
                        <section id="hero" className="h-full">
                            <HeroSection
                                tagline={
                                    settings.hero_tagline ||
                                    "Latency is the enemy."
                                }
                                subtitle={
                                    settings.hero_subtitle ||
                                    "Re-imagining the digital frontier. \n Where logic meets emotion."
                                }
                            />
                        </section>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isInitialized && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="relative z-10"
                    >
                        <FloatingDock />

                        <section id="about">
                            <DualNature
                                aboutArchitect={settings.about_architect}
                                aboutCreator={settings.about_creator}
                            />
                        </section>

                        <section id="experience">
                            <WorkExperienceSection experiences={experiences} />
                        </section>

                        <section id="featured">
                            <FeaturedProjects projects={projects} />
                        </section>

                        <footer className="py-8 text-center text-white/20 font-mono text-xs">
                            <p>
                                DESIGNED BY STITCH &bull; BUILT BY ANTIGRAVITY
                                &bull; 2026
                            </p>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
