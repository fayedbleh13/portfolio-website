"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";
import TipTapEditor from "./TipTapEditor";
import ScrambleText from "./ScrambleText";
import { LuGithub, LuLinkedin, LuPhone, LuMail } from 'react-icons/lu';

const TransmissionEffect = dynamic(() => import("./three/TransmissionEffect"), { ssr: false });

export default function ContactSection() {
    const [status, setStatus] = useState<
        "idle" | "submitting" | "animating" | "success"
    >("idle");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const formRef = useRef<HTMLFormElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);
    const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status !== "idle") return;

        setStatus("submitting");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Signal could not reach the server. Try again.");
            }

            // API Success -> Trigger Animation
            setStatus("animating");
            playWormholeAnimation();
        } catch (error: unknown) {
            console.error("Transmission failed:", error);
            setStatus("idle");
            const errorMessage = error instanceof Error ? error.message : "Transmission failed. Terminal offline.";
            setErrorMessage(errorMessage);
            
            if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
            errorTimeoutRef.current = setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    // Effect to expand container smoothly when success
    useEffect(() => {
        if (status === "success" && containerRef.current) {
            // First clear all the ball/circle inline styles left over from the shrink animation
            gsap.set(containerRef.current, {
                clearProps: "width,height,borderRadius,padding,overflow,backgroundColor,boxShadow"
            });
            // Then elegantly fade the success card back in without jittery dual-scaling
            gsap.fromTo(
                containerRef.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    clearProps: "all",
                },
            );
        }
    }, [status]);

    const playWormholeAnimation = () => {
        const tl = gsap.timeline();

        // Scene 2: Glass panel shrinks into an energy ball (Form disappears)
        tl.to(formRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                if (formRef.current) formRef.current.style.display = "none";
            },
        });

        tl.to(
            containerRef.current,
            {
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                padding: "0px",
                overflow: "hidden", // ensures contents don't squish out
                backgroundColor: "rgba(255,255,255,1)",
                boxShadow: "0 0 100px #06B6D4, 0 0 200px #8B5CF6",
                duration: 0.6,
                ease: "expo.inOut",
            },
            "-=0.1",
        );

        // Scene 3 triggers here: 3D canvas takes over, we hide the HTML ball
        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.1,
            onComplete: () => {
                setStatus("animating");
            },
        });
    };

    return (
        <section id="contact" className="py-32 px-4 flex flex-col items-center justify-center min-h-[80vh] relative">

            {/* 3D WebGL Canvas replacing the 2D CSS GSAP Wormhole Animation */}
            {status === 'animating' && (
                <TransmissionEffect onComplete={() => setStatus('success')} />
            )}

            <motion.div
                ref={containerRef}
                className={`p-8 md:p-12 rounded-3xl w-full max-w-5xl relative z-10 mx-auto bg-[#1c1c1c] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${status === 'success' ? 'flex flex-col items-center justify-center min-h-[400px]' : ''}`}
            >
                {/* Background Grid Accent */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#06B6D405_1px,transparent_1px),linear-gradient(to_bottom,#06B6D405_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none rounded-3xl" />

                {/* Background Glow */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-glow/10 blur-[100px] rounded-full pointer-events-none" />

                <AnimatePresence mode="wait">
                    {status === "idle" ||
                        status === "submitting" ||
                        status === "animating" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="w-full relative z-10 grid md:grid-cols-5 gap-12"
                        >
                            {/* Left Side: Info & Socials */}
                            <div className="md:col-span-2 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white mb-2 uppercase tracking-tighter">
                                        <ScrambleText text="ESTABLISH CONNECTION" />
                                    </h2>
                                    <p className="text-white/50 font-inter mt-4">
                                        Ready to decode the future? Send a signal through the channels below.
                                    </p>
                                </div>

                                <div className="mt-12 space-y-6">
                                    <div className="flex items-center gap-4 text-white/70 hover:text-cyan-glow transition-colors">
                                        <LuMail className="w-6 h-6" />
                                        <a href="mailto:faemauyag13@gmail.com" className="font-mono text-sm tracking-widest uppercase">faemauyag13@gmail.com</a>
                                    </div>
                                    <div className="flex items-center gap-4 text-white/70 hover:text-cyan-glow transition-colors">
                                        <LuPhone className="w-6 h-6" />
                                        <span className="font-mono text-sm tracking-widest">+63 9457669015</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-white/70 hover:text-violet transition-colors">
                                        <LuGithub className="w-6 h-6" />
                                        <a href="https://github.com/fayedbleh13" target="_blank" rel="noopener noreferrer" className="font-mono text-sm tracking-widest uppercase">github/fayedbleh13</a>
                                    </div>
                                    <div className="flex items-center gap-4 text-white/70 hover:text-violet transition-colors">
                                        <LuLinkedin className="w-6 h-6" />
                                        <a href="https://linkedin.com/in/fayedbleh13" target="_blank" rel="noopener noreferrer" className="font-mono text-sm tracking-widest uppercase">linkedin/fayedbleh13</a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div className="md:col-span-3">
                                <form
                                    ref={formRef}
                                    className="space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-cyan-glow/70 tracking-[0.2em] uppercase">
                                            Identity
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            disabled={status !== "idle"}
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Name or Alias"
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet/50 focus:bg-white/5 transition-all hover:bg-white/5 disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-cyan-glow/70 tracking-[0.2em] uppercase">
                                            Frequency
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            disabled={status !== "idle"}
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Email Address"
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet/50 focus:bg-white/5 transition-all hover:bg-white/5 disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-cyan-glow/70 tracking-[0.2em] uppercase">
                                        Transmission
                                    </label>
                                    <div
                                        className={
                                            status !== "idle"
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                        }
                                    >
                                        <TipTapEditor
                                            value={message}
                                            onChange={setMessage}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        disabled={status !== "idle"}
                                        className="relative px-8 py-4 overflow-hidden rounded-full glass-panel group w-full md:w-auto hover:border-violet/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet via-cyan-glow to-deep-indigo bg-[length:200%_auto] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-gradient-shift" />
                                        <span className="relative z-10 font-space-grotesk font-bold tracking-widest text-white">
                                            {status === "submitting"
                                                ? "UPLINKING..."
                                                : "INITIATE UPLINK"}
                                        </span>
                                    </button>
                                </div>
                                </form>
                            </div>
                        </motion.div>
                    ) : null}

                    {status === "success" && (
                        <motion.div
                            key="success"
                            ref={successRef}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1], // Custom smooth realistic ease out
                            }}
                            className="flex flex-col items-center justify-center text-center space-y-6 w-full"
                        >
                            <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-glow/30 bg-[#050505] shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-glow/10 to-transparent pointer-events-none" />
                                <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
                                <span className="font-space-grotesk font-bold tracking-widest text-cyan-glow text-sm uppercase">
                                    TRANSMISSION SUCCESSFUL
                                </span>
                            </div>

                            <p className="text-white/40 font-mono text-sm max-w-sm">
                                Signal routed safely through the nexus. Stand by
                                for response.
                            </p>

                            <button
                                onClick={() => {
                                    setStatus("idle");
                                    setMessage("");
                                    setName("");
                                    setEmail("");
                                    setErrorMessage("");
                                    // Reset GSAP styles
                                    if (formRef.current) {
                                        formRef.current.style.display = "block";
                                        gsap.set(formRef.current, {
                                            clearProps: "all",
                                        });
                                    }
                                    if (containerRef.current) {
                                        gsap.set(containerRef.current, {
                                            clearProps: "all",
                                        });
                                    }
                                }}
                                className="mt-6 px-8 py-3 rounded-full border border-white/30 text-sm font-space-grotesk font-bold text-white hover:text-white hover:bg-white/10 hover:border-cyan-glow/60 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all uppercase tracking-widest"
                            >
                                Initiate New Uplink
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Error Snackbar Overlay */}
            <AnimatePresence>
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: 20 }}
                        className="fixed top-8 right-4 md:right-8 z-[100] min-w-[320px] max-w-[90vw] bg-[#0A0A0A] border border-red-500/30 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.15)] overflow-hidden flex flex-col"
                    >
                        <div className="px-6 py-4 flex items-center justify-between gap-6">
                            <span className="font-mono text-red-500 text-sm tracking-widest uppercase flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                {errorMessage}
                            </span>
                            <button 
                                type="button" 
                                onClick={() => setErrorMessage("")} 
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        {/* 5-second shrinking progress bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="h-1 bg-gradient-to-r from-red-500/80 to-red-900/80"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
