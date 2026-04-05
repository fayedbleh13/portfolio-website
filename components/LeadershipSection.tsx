import { motion } from 'framer-motion'
import { LuUsers, LuTrendingUp, LuBrain } from 'react-icons/lu'
import ScrambleText from './ScrambleText'

const highlights = [
    {
        Icon: LuUsers,
        stat: '3',
        label: 'Junior devs supervised',
    },
    {
        Icon: LuTrendingUp,
        stat: '90%',
        label: 'Projected productivity gain',
    },
    {
        Icon: LuBrain,
        stat: '35%',
        label: 'Production bug reduction via AI Code Reviewer',
    },
]

const achievements = [
    'Spearheaded the rapid deployment of a high-priority initiative under tight deadlines',
    'Supervised and mentored a team of three junior developers through complex deliverables',
    'Proposed an agentic workflow solution projected to boost company productivity by 90%',
    'Initiated and oversaw an AI Code Reviewer integrated with GitLab, reducing production bugs by 35%',
]

export default function LeadershipSection() {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <p className="font-mono text-xs text-violet tracking-[0.4em] uppercase mb-3">
                        Leadership
                    </p>
                    <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white uppercase tracking-tighter">
                        <ScrambleText text="BEYOND THE CODE" />
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="group relative"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF608_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF608_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                    <div className="glass-panel rounded-3xl border border-violet/20 bg-black/40 overflow-hidden relative z-10 transition-all duration-500 group-hover:border-violet/40">
                        <div className="flex flex-col md:flex-row">
                            {/* Left — Role Info */}
                            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 md:w-72 shrink-0">
                                <div className="mb-6">
                                    <p className="text-[10px] font-mono text-violet/60 tracking-widest uppercase mb-2">
                                        Role
                                    </p>
                                    <p className="text-lg font-space-grotesk font-bold text-white">
                                        Interim Manager
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <p className="text-[10px] font-mono text-violet/60 tracking-widest uppercase mb-2">
                                        Company
                                    </p>
                                    <p className="text-sm font-mono text-white/70">
                                        Cytech International
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-violet/60 tracking-widest uppercase mb-2">
                                        Duration
                                    </p>
                                    <p className="text-sm font-mono text-white/70">
                                        Nov 2025 – Mar 2026
                                    </p>
                                </div>

                                {/* Stat highlights */}
                                <div className="mt-10 space-y-4">
                                    {highlights.map(({ Icon, stat, label }) => (
                                        <div key={label} className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0">
                                                <Icon className="w-4 h-4 text-violet" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-space-grotesk font-bold text-violet leading-none">
                                                    {stat}
                                                </p>
                                                <p className="text-[10px] font-mono text-white/40 leading-snug mt-0.5">
                                                    {label}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right — Achievements */}
                            <div className="p-8 md:p-12 flex flex-col justify-center flex-1">
                                <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-6">
                                    Key Achievements
                                </p>
                                <ul className="space-y-4">
                                    {achievements.map((point, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + i * 0.08 }}
                                            viewport={{ once: true }}
                                            className="flex gap-3 text-white/65 font-inter leading-relaxed"
                                        >
                                            <span className="text-violet mt-1 shrink-0 text-xs">▸</span>
                                            <span>{point}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
