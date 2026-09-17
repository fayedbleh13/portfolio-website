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
        id: "cytech-interim-manager",
        company: "Cytech International",
        role: "Interim Manager",
        duration: "Nov 2025 – Mar 2026",
        description:
            "Directed technical operations, spearheaded system architecture modernization, and accelerated delivery cycles across cross-functional engineering teams.",
        technologies: [
            "TypeScript",
            "Next.js",
            "System Architecture",
            "Team Leadership",
        ],
        is_featured: true,
        display_order: 1,
    },
];
