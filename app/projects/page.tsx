import FloatingDock from "@/components/FloatingDock";
import { projects } from "@/data/projects";
import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
    const publishedProjects = projects
        .filter((p) => p.published)
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    return (
        <main className="min-h-screen pt-32 pb-32">
            <FloatingDock alwaysShow />
            <ProjectsClient projects={publishedProjects} />
        </main>
    );
}
