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
            "Managed day-to-day technical operations and served as the team's primary point of escalation. Mentored three junior developers through complex deliverables, conducting regular code reviews. Spearheaded a high-priority feature deployment under a tight deadline, shipping on schedule. Proposed and implemented an agentic CI/CD workflow adopted company-wide. Integrated an AI Code Reviewer into GitLab pipelines, reducing production bugs by 35%.",
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
