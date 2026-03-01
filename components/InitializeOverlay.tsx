'use client'

import { useRef } from 'react'
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

    if (isInitialized) return null

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent text-foreground overflow-hidden"
        >
            <div className="text-center z-10 space-y-8">
                <div className="relative">
                    <button
                        ref={buttonRef}
                        onClick={handleInitialize}
                        onMouseEnter={() => {
                            // Optional: Could trigger store state for "Hover" effect on global orb
                        }}
                        className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-500 hover:scale-110"
                    >
                        {/* Solid Backing to block particles */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-full group-hover:bg-black/80 transition-all duration-500" />

                        {/* Button Glow */}
                        <div className="absolute inset-0 bg-violet-500/20 blur-xl group-hover:bg-cyan-500/30 transition-all duration-500 rounded-full" />
                        <div className="absolute inset-0 border border-violet-500/40 rounded-full group-hover:border-cyan-400/60 transition-colors duration-500" />

                        <span className="relative z-10 font-mono text-sm tracking-[0.3em] font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-cyan-50 transition-colors duration-300">
                            INITIALIZE_SYSTEM
                        </span>
                    </button>

                    {/* Decorative lines */}
                    <div className="absolute -left-12 top-1/2 w-8 h-[1px] bg-white/20" />
                    <div className="absolute -right-12 top-1/2 w-8 h-[1px] bg-white/20" />
                </div>
            </div>

            <div className="absolute bottom-12 text-[10px] font-mono text-white/30 tracking-widest uppercase">
                Awaiting Input sequences...
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </div>
    )
}
