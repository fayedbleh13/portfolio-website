'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import TipTapEditor from './TipTapEditor'
import TransmissionEffect from './three/TransmissionEffect'

export default function ContactSection() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'animating' | 'success'>('idle')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const formRef = useRef<HTMLFormElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const successRef = useRef<HTMLDivElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (status !== 'idle') return

        setStatus('submitting')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            })

            if (!res.ok) throw new Error('API Error')

            // API Success -> Trigger Animation
            setStatus('animating')
            playWormholeAnimation()
        } catch (error) {
            console.error('Transmission failed:', error)
            setStatus('idle')
            alert('Transmission failed. Terminal offline.')
        }
    }

    // Effect to expand container smoothly when success
    useEffect(() => {
        if (status === 'success' && containerRef.current) {
            gsap.fromTo(containerRef.current, {
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,1)',
                opacity: 1,
            }, {
                width: '100%',
                height: '400px',
                borderRadius: '24px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                boxShadow: 'none',
                duration: 0.8,
                ease: 'back.out(1.2)',
                clearProps: 'all'
            })
        }
    }, [status])

    const playWormholeAnimation = () => {
        const tl = gsap.timeline()

        // Scene 2: Glass panel shrinks into an energy ball (Form disappears)
        tl.to(formRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                if (formRef.current) formRef.current.style.display = 'none';
            }
        })

        tl.to(containerRef.current, {
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,1)',
            boxShadow: '0 0 100px #06B6D4, 0 0 200px #8B5CF6',
            duration: 0.6,
            ease: 'expo.inOut',
        }, '-=0.1')

        // Scene 3 triggers here: 3D canvas takes over, we hide the HTML ball
        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.1,
            onComplete: () => {
                setStatus('animating')
            }
        })
    }

    return (
        <section id="contact" className="py-32 px-4 flex flex-col items-center justify-center min-h-[80vh] relative">

            {/* 3D WebGL Canvas replacing the 2D CSS GSAP Wormhole Animation */}
            {status === 'animating' && (
                <TransmissionEffect onComplete={() => setStatus('success')} />
            )}

            <motion.div
                ref={containerRef}
                layout
                className={`glass-panel p-8 md:p-12 rounded-3xl w-full max-w-2xl relative z-10 mx-auto ${status === 'success' ? 'flex flex-col items-center justify-center min-h-[400px]' : ''}`}
            >
                {/* Background Glow */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-glow/10 blur-[100px] rounded-full pointer-events-none" />

                <AnimatePresence mode="wait">
                    {status === 'idle' || status === 'submitting' || status === 'animating' ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="w-full relative z-10"
                        >
                            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                                <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white mb-2 text-center text-gradient-cyan">
                                    ESTABLISH CONNECTION
                                </h2>
                                <p className="text-white/50 text-center mb-12 font-inter">
                                    Ready to decode the future? Send a signal.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Identity</label>
                                        <input
                                            type="text"
                                            required
                                            disabled={status !== 'idle'}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Name or Alias"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet/50 focus:bg-white/10 transition-all hover:bg-white/10 disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Frequency</label>
                                        <input
                                            type="email"
                                            required
                                            disabled={status !== 'idle'}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email Address"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet/50 focus:bg-white/10 transition-all hover:bg-white/10 disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Transmission</label>
                                    <div className={status !== 'idle' ? 'pointer-events-none opacity-50' : ''}>
                                        <TipTapEditor value={message} onChange={setMessage} />
                                    </div>
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        disabled={status !== 'idle'}
                                        className="relative px-8 py-4 overflow-hidden rounded-full glass-panel group w-full md:w-auto hover:border-violet/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet via-cyan-glow to-deep-indigo bg-[length:200%_auto] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-gradient-shift" />
                                        <span className="relative z-10 font-space-grotesk font-bold tracking-widest text-white">
                                            {status === 'submitting' ? 'UPLINKING...' : 'INITIATE UPLINK'}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    ) : null}

                    {status === 'success' && (
                        <motion.div
                            key="success"
                            ref={successRef}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2, type: 'spring', bounce: 0.4 }}
                            className="flex flex-col items-center justify-center text-center space-y-6 w-full"
                        >
                            <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-glow/30 bg-black/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-glow/10 to-transparent pointer-events-none" />
                                <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
                                <span className="font-space-grotesk font-bold tracking-widest text-cyan-glow text-sm uppercase">TRANSMISSION SUCCESSFUL</span>
                            </div>

                            <p className="text-white/40 font-mono text-sm max-w-sm">
                                Signal routed safely through the nexus. Stand by for response.
                            </p>

                            <button
                                onClick={() => {
                                    setStatus('idle')
                                    setMessage('')
                                    setName('')
                                    setEmail('')
                                    // Reset GSAP styles
                                    if (formRef.current) {
                                        formRef.current.style.display = 'block';
                                        gsap.set(formRef.current, { clearProps: 'all' })
                                    }
                                    if (containerRef.current) {
                                        gsap.set(containerRef.current, { clearProps: 'all' })
                                    }
                                }}
                                className="mt-4 px-6 py-2 rounded-full border border-white/10 text-xs font-mono text-white/50 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all uppercase tracking-widest"
                            >
                                Initiate New Uplink
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    )
}
