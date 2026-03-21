'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

type Setting = {
    key: string
    value: string
}

export default function SettingsAdminPage() {
    const [settings, setSettings] = useState<Setting[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [savingKey, setSavingKey] = useState<string | null>(null)
    const [toast, setToast] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const fetchSettings = async () => {
            const { data, error } = await supabase
                .from('settings')
                .select('*')
                .order('key')

            if (!error && data) {
                setSettings(data)
            }
            setIsLoading(false)
        }
        fetchSettings()
    }, [supabase])

    const handleValueChange = (key: string, newValue: string) => {
        setSettings(prev => prev.map(s => s.key === key ? { ...s, value: newValue } : s))
    }

    const handleSave = async (key: string, value: string) => {
        setSavingKey(key)

        const { error } = await supabase
            .from('settings')
            .update({ value })
            .eq('key', key)

        setSavingKey(null)

        if (error) {
            showToast('ERROR: ' + error.message)
        } else {
            showToast(`[${key}] UPDATED`)
        }
    }

    const showToast = (message: string) => {
        setToast(message)
        setTimeout(() => setToast(null), 3000)
    }

    if (isLoading) {
        return <div className="text-white/50 font-mono text-sm animate-pulse">Loading core settings...</div>
    }

    return (
        <div className="space-y-8 relative">
            <div>
                <h1 className="text-3xl font-space-grotesk font-bold text-white tracking-widest uppercase">
                    CORE_SETTINGS
                </h1>
                <p className="text-white/50 font-mono text-sm mt-2">
                    Modify global text parameters. Changes propagate immediately.
                </p>
            </div>

            <div className="grid gap-6">
                {settings.map((setting) => (
                    <div key={setting.key} className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="w-full md:w-1/3">
                            <h3 className="text-sm font-mono text-cyan-glow uppercase tracking-widest overflow-hidden text-ellipsis">
                                {setting.key.replace(/_/g, ' ')}
                            </h3>
                            <p className="text-xs font-mono text-white/30 truncate mt-1">DB_KEY: {setting.key}</p>
                        </div>

                        <div className="w-full md:w-2/3 flex flex-col gap-3">
                            <textarea
                                value={setting.value}
                                onChange={(e) => handleValueChange(setting.key, e.target.value)}
                                rows={3}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-sans resize-y"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleSave(setting.key, setting.value)}
                                    disabled={savingKey === setting.key}
                                    className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded font-mono text-xs text-white uppercase tracking-widest transition-colors disabled:opacity-50"
                                >
                                    {savingKey === setting.key ? 'SAVING...' : 'SAVE'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 z-50 glass-panel border border-cyan-glow/50 px-6 py-4 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                    >
                        <p className="font-mono text-sm text-cyan-glow uppercase tracking-widest">{toast}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
