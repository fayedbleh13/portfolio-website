export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image_url: string;
    image_urls: string[];
    project_url: string;
    tech_tags: string[];
    color: string;
    span: string;
    published: boolean;
    featured?: boolean;
    display_order?: number;
}

/**
 * Static projects list.
 * Update or append projects directly here.
 */
export const projects: Project[] = [
    {
        id: "ai-apac-media",
        title: "AI APAC Media Platform",
        category: "Full-Stack & Media",
        description:
            "Comprehensive B2B media and market intelligence platform delivering coverage on enterprise AI governance, sovereign compute, and tech ecosystems across 8 APAC regions. Features real-time trend radar, editorial CMS workflows, and Project Stargate intelligence synthesis.",
        image_url: "/projects/aiapac-media-1.png",
        image_urls: [
            "/projects/aiapac-media-1.png",
            "/projects/aiapac-media-2.png",
            "/projects/aiapac-media-3.png",
        ],
        project_url: "https://staging.aiapac.net",
        tech_tags: [
            "TanStack Start",
            "React",
            "TypeScript",
            "TailwindCSS",
            "FastAPI",
            "Python",
            "GCP",
            "PostgreSQL",
            "Cloudflare",
        ],
        color: "from-blue-600/20 to-indigo-600/20",
        span: "col-span-1 md:col-span-2",
        published: true,
        featured: true,
        display_order: 1,
    },
    {
        id: "ai-apac-assistant",
        title: "APAC AI Assistant Agent",
        category: "Agentic AI & RAG",
        description:
            "Interactive prompt-based B2B intelligence assistant for APAC technology decision-makers. Implements vector search and retrieval-augmented generation (RAG) over regional regulatory frameworks, market radars, and isolated enterprise databases.",
        image_url: "/projects/aiapac-assistant-1.png",
        image_urls: [
            "/projects/aiapac-assistant-1.png",
            "/projects/aiapac-assistant-2.png",
        ],
        project_url: "https://assistant-demo.aiapac.net",
        tech_tags: [
            "TanStack Router",
            "React",
            "TypeScript",
            "TailwindCSS",
            "FastAPI",
            "Vector Search / RAG",
            "OpenAI GPT",
            "GCP",
            "Cloudflare",
        ],
        color: "from-cyan-500/20 to-blue-600/20",
        span: "col-span-1 md:col-span-2",
        published: true,
        featured: true,
        display_order: 2,
    },
    {
        id: "nexus-portfolio",
        title: "Nexus Portfolio",
        category: "Web Engineering",
        description:
            "Cinematic, high-performance portfolio featuring Three.js particle systems, dynamic shaders, and streamlined static data architecture.",
        image_url: "/gradient-mesh-default-1.png",
        image_urls: ["/gradient-mesh-default-1.png", "/gradient-mesh-default-2.png"],
        project_url: "https://github.com/fayedbleh13/portfolio-website",
        tech_tags: ["Next.js", "React 19", "Three.js", "TypeScript", "TailwindCSS"],
        color: "from-purple-500/20 to-pink-600/20",
        span: "col-span-1 md:col-span-4",
        published: true,
        featured: false,
        display_order: 3,
    },
];
