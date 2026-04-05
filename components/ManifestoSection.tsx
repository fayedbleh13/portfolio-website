import { motion } from 'framer-motion'
import ScrambleText from './ScrambleText'

export default function ManifestoSection() {
    return (
        <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-16 items-start">
                {/* Left: Manifesto Headers */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-sm font-mono text-cyan-glow tracking-[0.3em] mb-2 uppercase">{"//"} PHILOSOPHY</h3>
                        <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white mb-6 uppercase tracking-tighter">
                            <ScrambleText text="THE MANIFESTO" />
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF608_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF608_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                        <div className="glass-panel p-8 md:p-12 rounded-2xl border-l-4 border-l-violet/40 bg-black/40 relative z-10 transition-all duration-500 group-hover:border-l-violet" >
                            <h4 className="text-2xl font-bold text-white mb-4 font-space-grotesk tracking-tight uppercase">CODE WITH CONSCIENCE.</h4>
                            <p className="text-white/70 font-inter leading-relaxed">
                                We do not just build systems; we architect the nervous system of the digital age.
                                Every line of code is a decision. Every algorithm carries weight.
                                <br /><br />
                                Efficiency is moral. Bloated software consumes energy, time, and attention.
                                We strive for the elegance of absolute necessity.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Detailed Principles */}
                <div className="space-y-10 pt-12">
                    {[
                        {
                            title: "Latency is the Enemy",
                            desc: "In a realtime world, delay is disconnection. We optimize for the millisecond, pushing the boundaries of WebAssembly and edge computing to deliver experiences that feel instantaneous."
                        },
                        {
                            title: "Transparency by Design",
                            desc: "Open source is not a choice; it's a responsibility. We build in the light. Our architecture is self-documenting, our patterns are predictable, and our chaos is controlled."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + (i * 0.2) }}
                            className="group"
                        >
                            <h4 className="text-xl font-space-grotesk font-bold text-white/90 mb-3 group-hover:text-cyan-glow transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-white/60 font-inter text-sm leading-relaxed border-l border-white/10 pl-4 group-hover:border-cyan-glow/50 transition-colors">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
