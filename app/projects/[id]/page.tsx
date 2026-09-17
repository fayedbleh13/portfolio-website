import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import FloatingDock from "@/components/FloatingDock";

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return {
            title: "Project Not Found | Fayed Mauyag",
        };
    }

    return {
        title: `${project.title} | Fayed Mauyag`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    const images = project.image_urls?.length
        ? project.image_urls
        : [project.image_url || "/gradient-mesh-default-1.png"];

    return (
        <main className="min-h-screen pt-28 pb-32 px-4 md:px-8 relative overflow-hidden">
            <FloatingDock alwaysShow />

            {/* Ambient Background Glows */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-violet/10 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-[500px] h-[300px] bg-cyan-glow/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10 space-y-12">
                {/* Navigation Back Link */}
                <div>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-cyan-glow transition-colors px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md"
                    >
                        <span>←</span> Back to Projects
                    </Link>
                </div>

                {/* Header Info */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-mono tracking-[0.25em] text-cyan-glow uppercase px-3 py-1 rounded-full border border-cyan-glow/30 bg-cyan-glow/10">
                            {project.category}
                        </span>
                        {project.featured && (
                            <span className="text-[10px] font-mono tracking-widest text-violet uppercase px-2.5 py-0.5 rounded-full border border-violet/30 bg-violet/10">
                                Featured
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white tracking-tight uppercase">
                        {project.title}
                    </h1>

                    <p className="text-white/70 font-inter text-lg md:text-xl leading-relaxed max-w-3xl">
                        {project.description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        {project.project_url && (
                            <a
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-space-grotesk font-bold text-sm uppercase tracking-wider hover:bg-cyan-glow transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                            >
                                Visit Live Platform
                                <span>↗</span>
                            </a>
                        )}
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-black/40 text-white font-space-grotesk font-bold text-sm uppercase tracking-wider hover:border-cyan-glow/60 hover:text-cyan-glow transition-all"
                        >
                            Inquire About This Work
                        </Link>
                    </div>
                </div>

                {/* Media Hero Showcase (16:9 Aspect Ratio) */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#050505] shadow-2xl flex items-center justify-center p-2 md:p-4">
                    {/* Ambient Blurred Backdrop */}
                    <div className="absolute inset-0 overflow-hidden">
                        <Image
                            src={images[0]}
                            alt=""
                            fill
                            aria-hidden="true"
                            className="object-cover blur-2xl opacity-20 scale-110 pointer-events-none"
                        />
                    </div>
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl z-10">
                        <Image
                            src={images[0]}
                            alt={project.title}
                            fill
                            priority
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 1200px"
                        />
                    </div>
                </div>

                {/* Tech Stack Grid */}
                <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 bg-black/40 space-y-6">
                    <h2 className="text-xl font-space-grotesk font-bold text-white uppercase tracking-wider">
                        Technologies & Infrastructure
                    </h2>
                    <div className="flex flex-wrap gap-2.5">
                        {project.tech_tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-white/80"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Additional Screenshots if available */}
                {images.length > 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-space-grotesk font-bold text-white uppercase tracking-wider">
                            Gallery & Views
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {images.slice(1).map((imgUrl, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#050505] p-2 flex items-center justify-center"
                                >
                                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                                        <Image
                                            src={imgUrl}
                                            alt={`${project.title} preview ${i + 2}`}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
