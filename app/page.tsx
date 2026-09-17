import HomeClient from "./HomeClient";
import { settings } from "@/data/settings";
import { workExperiences } from "@/data/workExperiences";
import { projects } from "@/data/projects";

export default function Home() {
    // Featured projects for the homepage
    const featuredProjects = projects
        .filter((p) => p.published && p.featured)
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    return (
        <HomeClient
            settings={settings}
            experiences={workExperiences}
            projects={featuredProjects}
        />
    );
}
