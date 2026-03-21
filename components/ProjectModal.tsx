'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Project } from '@/app/HomeClient'
import Link from 'next/link'

interface ProjectModalProps {
    project: Project | null
    isOpen: boolean
    onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight') {
                setCurrentSlide((prev) => {
                    const length = project?.image_urls?.length || 1;
                    return (prev + 1) % length;
                })
            }
            if (e.key === 'ArrowLeft') {
                setCurrentSlide((prev) => {
                    const length = project?.image_urls?.length || 1;
                    return (prev - 1 + length) % length;
                })
            }
        }
        if (isOpen) window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, project, onClose])

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentSlide(0) // reset on close
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    if (!project) return null

    const images = project.image_urls?.length 
        ? project.image_urls 
        : [project.image_url || '/gradient-mesh-default-1.png']

    const handleNext = () => setCurrentSlide((prev) => (prev + 1) % images.length)
    const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-6xl max-h-full flex flex-col md:flex-row bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors border border-white/10"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Slideshow */}
                        <div className="relative w-full md:w-2/3 h-[40vh] md:h-[80vh] bg-black overflow-hidden flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    src={images[currentSlide]}
                                    alt={`${project.title} slide ${currentSlide + 1}`}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Arrows (only if multiple images) */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/10 z-10"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/10 z-10"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* Dots */}
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentSlide(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Details Panel */}
                        <div className="w-full md:w-1/3 flex flex-col p-6 md:p-10 md:overflow-y-auto">
                            <div className="flex flex-col flex-grow">
                                <span className="text-cyan-glow font-mono text-xs uppercase tracking-[0.2em] mb-4 block">
                                    {project.category}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-white mb-6">
                                    {project.title}
                                </h2>
                                
                                <div className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed mb-8">
                                    <p>{project.description}</p>
                                </div>

                                {project.tech_tags && project.tech_tags.length > 0 && (
                                    <div className="mb-10 block">
                                        <h3 className="text-white/40 font-mono text-xs uppercase tracking-widest mb-3 block">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech_tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70 text-xs font-mono">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
                                <Link 
                                    href={`/projects/${project.id}`}
                                    className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-white text-black font-space-grotesk font-bold tracking-widest uppercase rounded-lg hover:bg-cyan-glow transition-colors"
                                >
                                    Open Full Page
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </Link>

                                {project.project_url && (
                                    <a 
                                        href={project.project_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-black border border-white/20 text-white hover:text-cyan-glow hover:border-cyan-glow/50 font-space-grotesk font-bold tracking-widest uppercase rounded-lg transition-colors"
                                    >
                                        Visit Live Site
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
