'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export type WorkExperienceFormData = {
    company: string
    role: string
    duration: string
    description: string
    technologies: string
    featured_projects: string
    display_order: number
    is_featured: boolean
}

interface WorkExperienceFormProps {
    initialData?: WorkExperienceFormData & { id: string }
    isEditing?: boolean
}

const DEFAULT_DATA: WorkExperienceFormData = {
    company: '',
    role: '',
    duration: '',
    description: '',
    technologies: '',
    featured_projects: '',
    display_order: 0,
    is_featured: false
}

export default function WorkExperienceForm({ initialData, isEditing = false }: WorkExperienceFormProps) {
    const [formData, setFormData] = useState<WorkExperienceFormData>(
        initialData ? {
            ...initialData,
            // Convert arrays back to comma-separated strings
            technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : initialData.technologies,
            featured_projects: Array.isArray(initialData.featured_projects) ? initialData.featured_projects.join(', ') : initialData.featured_projects
        } : DEFAULT_DATA
    )
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        setError(null)

        // Convert comma-separated strings to arrays
        const technologiesArray = formData.technologies
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)

        const featuredProjectsArray = formData.featured_projects
            .split(',')
            .map(proj => proj.trim().toLowerCase())
            .filter(proj => proj.length > 0)

        const payload = {
            company: formData.company,
            role: formData.role,
            duration: formData.duration,
            description: formData.description,
            technologies: technologiesArray,
            featured_projects: featuredProjectsArray,
            display_order: Number(formData.display_order),
            is_featured: formData.is_featured
        }

        try {
            if (isEditing && initialData?.id) {
                // Update existing
                const { error: updateError } = await supabase
                    .from('work_experiences')
                    .update(payload)
                    .eq('id', initialData.id)

                if (updateError) throw updateError
            } else {
                // Insert new
                const { error: insertError } = await supabase
                    .from('work_experiences')
                    .insert([payload])

                if (insertError) throw insertError
            }

            router.push('/sys-init/experience')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'An error occurred while saving.')
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!isEditing || !initialData?.id) return

        if (window.confirm('WARNING: Are you sure you want to delete this work experience? This action cannot be undone.')) {
            setIsSaving(true)
            try {
                const { error } = await supabase
                    .from('work_experiences')
                    .delete()
                    .eq('id', initialData.id)

                if (error) throw error

                router.push('/sys-init/experience')
                router.refresh()
            } catch (err: any) {
                setError(err.message || 'Failed to delete work experience.')
                setIsSaving(false)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 glass-panel p-8 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <div>
                    <h2 className="text-2xl font-space-grotesk font-bold text-white tracking-widest uppercase mb-1">
                        {isEditing ? 'EDIT RECORD' : 'NEW RECORD'}
                    </h2>
                    <p className="text-white/50 font-mono text-sm">Fill parameters below to commit to database.</p>
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            name="is_featured"
                            checked={formData.is_featured}
                            onChange={handleChange}
                            className="sr-only"
                        />
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${formData.is_featured ? 'bg-violet-500' : 'bg-white/10'}`}>
                            <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${formData.is_featured ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                        <span className={`text-xs font-mono uppercase tracking-widest ${formData.is_featured ? 'text-violet-500' : 'text-white/50'}`}>
                            {formData.is_featured ? 'FEATURED' : 'NORMAL'}
                        </span>
                    </label>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm font-mono">
                    ERROR: {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Company/Organization</label>
                    <input
                        required
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="e.g. TECH NAVE"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Role/Designation</label>
                    <input
                        required
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="e.g. LEAD SOLUTIONS ARCHITECT"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Duration</label>
                    <input
                        required
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="e.g. 2023 - PRESENT"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Mission Description</label>
                    <textarea
                        required
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-sans resize-none"
                        placeholder="Describe your achievements and responsibilities..."
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Technologies Used (Comma separated)</label>
                    <input
                        type="text"
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="React, Three.js, Go, Kubernetes"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Featured Project IDs (Comma separated, optional)</label>
                    <input
                        type="text"
                        name="featured_projects"
                        value={formData.featured_projects}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="nexus, aether"
                    />
                    <p className="text-[10px] font-mono text-white/30">Enter project IDs that link to this work experience.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Sort Order (Lowest first)</label>
                    <input
                        type="number"
                        name="display_order"
                        value={formData.display_order}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <Link
                        href="/sys-init/experience"
                        className="text-white/50 hover:text-white font-mono text-sm uppercase tracking-widest transition-colors"
                    >
                        Cancel
                    </Link>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isSaving}
                            className="text-red-500/70 hover:text-red-500 font-mono text-sm uppercase tracking-widest transition-colors disabled:opacity-50"
                        >
                            Delete Record
                        </button>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="px-8 py-3 bg-cyan-glow text-black font-space-grotesk font-bold tracking-widest uppercase rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? 'OVERWRITING...' : 'COMMIT CHANGES'}
                </button>
            </div>
        </form>
    )
}
