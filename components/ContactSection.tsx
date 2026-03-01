'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LiquidButton from './LiquidButton'

export default function ContactSection() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    // This would be triggered by LiquidButton's internal state in a real app, 
    // but for now we'll simulate by passing a handler or rewriting LiquidButton to accept onClick.
    // Ideally LiquidButton handles the animation, but we want the FORM to disappear.
    // Let's modify LiquidButton's prop or just handle the submit button here directly 
    // or wrap LiquidButton. 

    // For simplicity, let's just use LiquidButton as is, but rely on a transparent overlay or 
    // refactor LiquidButton to bubble up the 'sent' event.
    // Actually, I'll rewrite this to handle the submit logic here for better control of the form visibility.
    return (
        <section id="contact" className="py-32 px-4 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="glass-panel p-8 md:p-16 rounded-3xl w-full max-w-2xl relative overflow-hidden min-h-[500px] flex items-center justify-center">

                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-glow/20 blur-[100px] rounded-full pointer-events-none" />

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="w-full relative z-10"
                        >
                            <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white mb-2 text-center text-gradient-cyan">
                                ESTABLISH CONNECTION
                            </h2>
                            <p className="text-white/50 text-center mb-12 font-inter">
                                Ready to decode the future? Send a signal.
                            </p>

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Identity</label>
                                        <input
                                            type="text"
                                            placeholder="Name or Alias"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet/50 focus:bg-white/10 transition-all hover:bg-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Frequency</label>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet/50 focus:bg-white/10 transition-all hover:bg-white/10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Transmission</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Your message parameters..."
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet/50 focus:bg-white/10 transition-all resize-none hover:bg-white/10"
                                    />
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        className="relative px-8 py-4 overflow-hidden rounded-full glass-panel group w-full md:w-auto hover:border-violet/50 transition-colors"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet via-cyan-glow to-deep-indigo bg-[length:200%_auto] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-gradient-shift" />
                                        <span className="relative z-10 font-space-grotesk font-bold tracking-widest text-white">INITIATE UPLINK</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="w-20 h-20 rounded-full border-2 border-cyan-glow flex items-center justify-center shadow-[0_0_30px_#06B6D4]">
                                <span className="text-4xl text-cyan-glow">✓</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-space-grotesk font-bold text-white tracking-widest">SIGNAL ESTABLISHED</h3>
                                <p className="text-white/40 font-mono text-sm mt-2">Transmission Received. Stand by.</p>
                            </div>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-8 text-xs text-white/30 hover:text-white underline"
                            >
                                Send another transmission
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    )
}
