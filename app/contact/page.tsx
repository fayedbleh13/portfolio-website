"use client";

import { motion } from "framer-motion";
import ContactSection from "@/components/ContactSection";
import ParticleOrb from "@/components/three/ParticleOrb";
import FloatingDock from "@/components/FloatingDock";

export default function ContactPage() {
    return (
        <main className="h-screen relative overflow-hidden">
            {/* Particles Background - always visible */}
            <div className="absolute inset-0 z-0">
                <ParticleOrb alwaysVisible />
            </div>

            {/* Background Accents */}
            <div className="absolute top-0 -right-64 w-[500px] h-[500px] bg-violet/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 -left-64 w-[500px] h-[500px] bg-cyan-glow/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Content Container - vertically and horizontally centered */}
            <div className="relative z-20 h-screen flex items-center justify-center">
                {/* Contact Form - no header, ContactSection has its own */}
                <ContactSection />
            </div>

            {/* Navigation Dock - fixed at bottom, above particles */}
            <FloatingDock alwaysShow />

        </main>
    );
}
