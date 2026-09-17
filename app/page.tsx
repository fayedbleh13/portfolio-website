import HomeClient from "./HomeClient";
import { settings } from "@/data/settings";
import { workExperiences } from "@/data/workExperiences";
import { projects } from "@/data/projects";

export default function Home() {
    // Top 2 published projects for the homepage featured section
    const featuredProjects = projects
        .filter((p) => p.published)
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .slice(0, 2);

    return (
        <HomeClient
            settings={settings}
            experiences={workExperiences}
            projects={featuredProjects}
        />
    );
}
