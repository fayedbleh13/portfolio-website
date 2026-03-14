'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

export default function AccessPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (authError) {
                setError(authError.message)
                return
            }

            // Successfully logged in
            router.push('/sys-init')
            router.refresh()
        } catch (err) {
            setError('An unexpected error occurred.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements to match portfolio */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 flex items-center justify-center">
                <div className="w-[800px] h-[800px] rounded-full" style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.4), transparent)',
                    filter: 'blur(80px)'
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-md relative z-10 mx-auto"
            >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet/20 blur-[50px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-glow/20 blur-[50px] rounded-full pointer-events-none" />

                <div className="relative z-10 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-space-grotesk font-bold text-white tracking-widest uppercase">
                            SYSTEM ACCESS
                        </h1>
                        <p className="text-white/50 font-mono text-xs mt-2 uppercase tracking-widest">
                            Authorized Personnel Only
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Identity [Email]</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                                placeholder="root@system.local"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Passkey [Password]</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono tracking-widest"
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-400 text-xs font-mono text-center border border-red-500/20 bg-red-500/10 p-3 rounded"
                                >
                                    ACCESS DENIED: {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative px-6 py-4 overflow-hidden rounded-full glass-panel group transition-colors hover:border-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-violet via-cyan-glow to-deep-indigo bg-[length:200%_auto] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-gradient-shift" />
                            <span className="relative z-10 font-space-grotesk font-bold tracking-widest text-white uppercase text-sm">
                                {isLoading ? 'Authenticating...' : 'Override Protocol'}
                            </span>
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
