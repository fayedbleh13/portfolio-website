'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LiquidButton() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

    const handleClick = () => {
        if (status !== 'idle') return
        setStatus('sending')
        // Simulate API call
        setTimeout(() => setStatus('sent'), 1500)
    }

    return (
        <div className="relative group">
            <AnimatePresence mode="wait">
                {status === 'sent' ? (
                    <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-cyan-glow font-mono tracking-widest"
                    >
                        <span className="w-2 h-2 bg-cyan-glow rounded-full animate-pulse" />
                        SIGNAL_ESTABLISHED
                    </motion.div>
                ) : (
                    <button
                        onClick={handleClick}
                        disabled={status !== 'idle'}
                        className="relative px-8 py-4 overflow-hidden rounded-full glass-panel group-hover:border-violet/50 transition-all duration-500 w-full md:w-auto"
                    >

                        {/* Liquid Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet via-cyan-glow to-deep-indigo bg-[length:200%_auto] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-gradient-shift" />

                        <span className="relative z-10 font-space-grotesk font-bold tracking-widest text-white group-hover:tracking-[0.2em] transition-all duration-300">
                            {status === 'sending' ? 'TRANSMITTING...' : 'INITIATE UPLINK'}
                        </span>
                    </button>
                )}
            </AnimatePresence>
        </div>
    )
}
