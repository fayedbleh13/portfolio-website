'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useAppStore } from '@/store/useAppStore'

export default function InitializeOverlay() {
    const { initialize, isInitialized } = useAppStore()
    const overlayRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleInitialize = () => {
        const tl = gsap.timeline({
            onComplete: initialize,
        })

        // Initialization Sequence
        tl.to(buttonRef.current, {
            scale: 0.9,
            duration: 0.1,
            ease: 'power2.in',
        })
            .to(buttonRef.current, {
                scale: 1.5,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out',
            })
            // Overlay fades out
            .to(overlayRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
            }, '-=0.2')
    }

    // Allow keyboard Enter or Space to trigger entrance
    useEffect(() => {
        if (isInitialized) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleInitialize()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isInitialized])

    if (isInitialized) return null

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent text-foreground overflow-hidden"
        >
            <div className="text-center z-10 space-y-8">
                <div className="text-center select-none">
                    <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        Fayed Mauyag
                    </h1>
                    <div className="mt-3 flex justify-center">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/75 border border-cyan-glow/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
                            <span className="text-xs md:text-sm font-mono font-bold text-cyan-glow tracking-[0.25em] uppercase">
                                Full-Stack Developer
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <button
                        ref={buttonRef}
                        onClick={handleInitialize}
                        aria-label="Enter portfolio"
                        className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-500 hover:scale-105 cursor-pointer"
                    >
                        {/* Solid Backing to block particles */}
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-md rounded-full group-hover:bg-black/90 transition-all duration-500" />

                        {/* Button Glow */}
                        <div className="absolute inset-0 bg-violet-500/20 blur-xl group-hover:bg-cyan-500/30 transition-all duration-500 rounded-full" />
                        <div className="absolute inset-0 border border-violet-500/40 rounded-full group-hover:border-cyan-400/60 transition-colors duration-500" />

                        <span className="relative z-10 font-space-grotesk text-sm md:text-base tracking-[0.3em] font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-cyan-glow transition-colors duration-300">
                            ENTER
                        </span>
                    </button>

                    {/* Decorative lines */}
                    <div className="absolute -left-12 top-1/2 w-8 h-[1px] bg-white/20" />
                    <div className="absolute -right-12 top-1/2 w-8 h-[1px] bg-white/20" />
                </div>
            </div>

            <div className="absolute bottom-12 text-[11px] font-mono text-white/50 tracking-[0.25em] uppercase flex items-center gap-2">
                <span>Press</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white/80 font-semibold text-[10px]">ENTER</kbd>
                <span>or click above</span>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </div>
    )
}
