'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export type ProjectFormData = {
    title: string
    category: string
    description: string
    tech_tags: string
    image_url: string
    project_url: string
    color: string
    span: string
    published: boolean
    display_order: number
}

interface ProjectFormProps {
    initialData?: ProjectFormData & { id: string }
    isEditing?: boolean
}

const DEFAULT_DATA: ProjectFormData = {
    title: '',
    category: '',
    description: '',
    tech_tags: '',
    image_url: '',
    project_url: '',
    color: 'from-blue-500 to-indigo-500',
    span: 'md:col-span-1 md:row-span-1',
    published: false,
    display_order: 0
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const [formData, setFormData] = useState<ProjectFormData>(
        initialData ? {
            ...initialData,
            // Convert array back to comma-separated string for the textarea
            tech_tags: Array.isArray(initialData.tech_tags) ? initialData.tech_tags.join(', ') : initialData.tech_tags
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

        // Convert comma-separated tech tags to array
        const techTagsArray = formData.tech_tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)

        const payload = {
            ...formData,
            tech_tags: techTagsArray,
            display_order: Number(formData.display_order)
        }

        try {
            if (isEditing && initialData?.id) {
                // Update existing
                const { error: updateError } = await supabase
                    .from('projects')
                    .update(payload)
                    .eq('id', initialData.id)

                if (updateError) throw updateError
            } else {
                // Insert new
                const { error: insertError } = await supabase
                    .from('projects')
                    .insert([payload])

                if (insertError) throw insertError
            }

            router.push('/sys-init/projects')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'An error occurred while saving.')
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!isEditing || !initialData?.id) return

        if (window.confirm('WARNING: Are you sure you want to delete this project? This action cannot be undone.')) {
            setIsSaving(true)
            try {
                const { error } = await supabase
                    .from('projects')
                    .delete()
                    .eq('id', initialData.id)

                if (error) throw error

                router.push('/sys-init/projects')
                router.refresh()
            } catch (err: any) {
                setError(err.message || 'Failed to delete project.')
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
                            name="published"
                            checked={formData.published}
                            onChange={handleChange}
                            className="sr-only p-4"
                        />
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${formData.published ? 'bg-emerald-500' : 'bg-white/10'}`}>
                            <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${formData.published ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                        <span className={`text-xs font-mono uppercase tracking-widest ${formData.published ? 'text-emerald-500' : 'text-white/50'}`}>
                            {formData.published ? 'LIVE' : 'DRAFT'}
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
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Title/Designation</label>
                    <input
                        required
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="e.g. NEBULA_OS"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Category Classification</label>
                    <input
                        required
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="e.g. SPATIAL COMPUTING"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Mission Description</label>
                    <textarea
                        required
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-sans resize-none"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Technology Stack (Comma separated)</label>
                    <input
                        type="text"
                        name="tech_tags"
                        value={formData.tech_tags}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="React, Three.js, WebGL"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Thumbnail Image URL</label>
                    <input
                        required
                        type="url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="https://..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">External Link (Optional)</label>
                    <input
                        type="url"
                        name="project_url"
                        value={formData.project_url}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="https://..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Bento Grid Span</label>
                    <select
                        name="span"
                        value={formData.span}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono appearance-none"
                    >
                        <option value="md:col-span-1 md:row-span-1">Small (1x1)</option>
                        <option value="md:col-span-2 md:row-span-1">Wide (2x1)</option>
                        <option value="md:col-span-1 md:row-span-2">Tall (1x2)</option>
                        <option value="md:col-span-2 md:row-span-2">Large (2x2)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-white/40 tracking-widest uppercase">Gradient Color Mapping</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow focus:bg-white/5 transition-all text-sm font-mono"
                        placeholder="from-violet to-cyan-500"
                    />
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
                        href="/sys-init/projects"
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
