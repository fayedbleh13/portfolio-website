export interface WorkExperience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
    technologies: string[];
    featured_projects?: string[];
    is_featured?: boolean;
    display_order?: number;
}

/**
 * Static work experiences list.
 * Update or append records directly here.
 */
export const workExperiences: WorkExperience[] = [
    {
        id: "columns-media-asia-freelance",
        company: "Columns Media Asia",
        role: "Full-Stack Developer (Freelance)",
        duration: "Apr 2026 – Sep 2026",
        description:
            "Architected and deployed the AI APAC media platform (staging.aiapac.net) and interactive AI Assistant demo (assistant-demo.aiapac.net). Engineered responsive interfaces with TanStack Start, TanStack Router, TailwindCSS, Lucide, and Shadcn UI. Developed high-performance backend microservices using Hono on Bun.js and FastAPI/Python with vector search and RAG capabilities. Configured and managed GCP cloud infrastructure including Cloud Run, Cloud SQL PostgreSQL, Cloud Storage, and Compute Engine VMs with Cloudflare CDN. Automated build pipelines and package workflows utilizing Bun and pnpm.",
        technologies: [
            "TanStack Start",
            "TanStack",
            "Hono",
            "Bun",
            "FastAPI",
            "Python",
            "GCP",
            "PostgreSQL",
            "Cloudflare",
            "OpenAI",
            "TailwindCSS",
        ],
        featured_projects: ["ai-apac-media", "ai-apac-assistant"],
        is_featured: true,
        display_order: 1,
    },
    {
        id: "cytech-interim-manager",
        company: "Cytech International",
        role: "Interim Manager",
        duration: "Nov 2025 – Mar 2026",
        description:
            "Managed day-to-day technical operations and served as the team's primary point of escalation. Mentored three junior developers through complex deliverables, conducting regular code reviews. Spearheaded a high-priority feature deployment under a tight deadline, shipping on schedule. Proposed and implemented an agentic CI/CD workflow adopted company-wide. Integrated an AI Code Reviewer into GitLab pipelines, reducing production bugs by 35%.",
        technologies: [
            "TypeScript",
            "Next.js",
            "System Architecture",
            "Team Leadership",
        ],
        is_featured: true,
        display_order: 2,
    },
];
