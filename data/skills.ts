export interface Skill {
    id: string;
    name: string;
    category: string;
    display_order: number;
    is_featured: boolean;
    created_at?: string;
    updated_at?: string;
}

/**
 * Static skills list.
 * Update or append skills directly here.
 * Skill icons and glow colors are matched automatically in lib/skillIconMap.tsx.
 */
export const skills: Skill[] = [
    // Frontend
    { id: "react", name: "React", category: "frontend", display_order: 1, is_featured: true },
    { id: "tanstack-start", name: "TanStack Start", category: "frontend", display_order: 2, is_featured: true },
    { id: "nextjs", name: "Next.js", category: "frontend", display_order: 3, is_featured: true },
    { id: "typescript", name: "TypeScript", category: "frontend", display_order: 4, is_featured: true },
    { id: "javascript", name: "JavaScript", category: "frontend", display_order: 5, is_featured: true },
    { id: "tanstack", name: "TanStack Router", category: "frontend", display_order: 6, is_featured: true },
    { id: "tailwindcss", name: "TailwindCSS", category: "frontend", display_order: 7, is_featured: true },
    { id: "shadcn", name: "Shadcn UI", category: "frontend", display_order: 8, is_featured: true },
    { id: "lucide", name: "Lucide", category: "frontend", display_order: 9, is_featured: false },
    { id: "html", name: "HTML", category: "frontend", display_order: 10, is_featured: false },
    { id: "css", name: "CSS", category: "frontend", display_order: 11, is_featured: false },
    { id: "vite", name: "Vite", category: "frontend", display_order: 12, is_featured: false },

    // Backend
    { id: "fastapi", name: "FastAPI", category: "backend", display_order: 13, is_featured: true },
    { id: "hono", name: "Hono", category: "backend", display_order: 14, is_featured: true },
    { id: "python", name: "Python", category: "backend", display_order: 15, is_featured: true },
    { id: "nodejs", name: "Node.js", category: "backend", display_order: 16, is_featured: true },
    { id: "express", name: "Express", category: "backend", display_order: 17, is_featured: false },
    { id: "django", name: "Django", category: "backend", display_order: 18, is_featured: false },
    { id: "laravel", name: "Laravel", category: "backend", display_order: 19, is_featured: false },

    // Database & Caching
    { id: "postgresql", name: "PostgreSQL", category: "database", display_order: 20, is_featured: true },
    { id: "vector-rag", name: "Vector Search / RAG", category: "database", display_order: 21, is_featured: true },
    { id: "redis", name: "Redis", category: "database", display_order: 22, is_featured: true },
    { id: "prisma", name: "Prisma", category: "database", display_order: 23, is_featured: false },
    { id: "mysql", name: "MySQL", category: "database", display_order: 24, is_featured: false },
    { id: "mongodb", name: "MongoDB", category: "database", display_order: 25, is_featured: false },

    // DevOps & Cloud
    { id: "gcp", name: "Google Cloud", category: "devops", display_order: 26, is_featured: true },
    { id: "cloudflare", name: "Cloudflare", category: "devops", display_order: 27, is_featured: true },
    { id: "bun", name: "Bun", category: "devops", display_order: 28, is_featured: true },
    { id: "docker", name: "Docker", category: "devops", display_order: 29, is_featured: true },
    { id: "git", name: "Git", category: "devops", display_order: 30, is_featured: true },
    { id: "linux", name: "Linux", category: "devops", display_order: 31, is_featured: true },
    { id: "pnpm", name: "pnpm", category: "devops", display_order: 32, is_featured: false },
    { id: "vercel", name: "Vercel", category: "devops", display_order: 33, is_featured: false },
    { id: "github", name: "GitHub", category: "devops", display_order: 34, is_featured: false },

    // AI / LLM
    { id: "openai", name: "OpenAI", category: "ai", display_order: 35, is_featured: true },
    { id: "gemini", name: "Gemini", category: "ai", display_order: 36, is_featured: true },
    { id: "claude", name: "Claude", category: "ai", display_order: 37, is_featured: true },
];

export function getAllSkills(): Skill[] {
    return [...skills].sort((a, b) => a.display_order - b.display_order);
}

export function getFeaturedSkills(): Skill[] {
    return skills
        .filter((s) => s.is_featured)
        .sort((a, b) => a.display_order - b.display_order);
}

export function getSkillsByCategory(category: string): Skill[] {
    return skills
        .filter((s) => s.category === category)
        .sort((a, b) => a.display_order - b.display_order);
}
