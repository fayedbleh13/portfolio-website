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
        id: "nexus-portfolio",
        title: "Nexus Portfolio",
        category: "Web Engineering",
        description:
            "Cinematic, high-performance portfolio featuring Three.js particle systems, dynamic shaders, and streamlined static data architecture.",
        image_url: "/gradient-mesh-default-1.png",
        image_urls: ["/gradient-mesh-default-1.png", "/gradient-mesh-default-2.png"],
        project_url: "https://github.com/fayedbleh13/portfolio-website",
        tech_tags: ["Next.js", "React 19", "Three.js", "TypeScript", "TailwindCSS"],
        color: "from-cyan-500/20 to-blue-600/20",
        span: "col-span-1 md:col-span-2",
        published: true,
        featured: true,
        display_order: 1,
    },
];
