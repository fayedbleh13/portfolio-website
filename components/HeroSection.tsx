import { motion } from 'framer-motion'
import ScrambleText from './ScrambleText'
import { useAppStore } from '@/store/useAppStore'

export default function HeroSection({ tagline, subtitle }: { tagline?: string, subtitle?: string }) {
    const { isInitialized } = useAppStore()

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Content Overlay */}
            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInitialized ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] text-cyan-glow mb-6 backdrop-blur-md uppercase">
                        {tagline || "INITIALIZING SYSTEM..."}
                    </span>
                </motion.div>

                <h1 className="text-6xl md:text-9xl font-bold font-space-grotesk tracking-tighter mb-6 relative z-10 text-gradient uppercase">
                    <ScrambleText 
                        text="DIGITAL SOUL" 
                        duration={0.8} 
                        isReady={isInitialized} 
                        delay={400} 
                        useUnderscore={true}
                    />
                </h1>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={isInitialized ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="text-white/60 font-inter max-w-lg mx-auto mb-10 text-lg whitespace-pre-wrap"
                >
                    {subtitle}
                </motion.p>

                <div className={`flex items-center justify-center gap-2 transition-opacity duration-1000 ${isInitialized ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '3s' }}>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-green-500 tracking-widest uppercase">
                        System Online
                    </span>
                </div>
            </div>
        </section>
    )
}
