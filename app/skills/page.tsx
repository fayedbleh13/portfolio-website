import FloatingDock from "@/components/FloatingDock";
import { getAllSkills } from "@/data/skills";
import SkillsPageClient from "./SkillsPageClient";

export default function SkillsPage() {
    const skills = getAllSkills();

    return (
        <main className="min-h-screen pt-32 pb-32">
            <FloatingDock alwaysShow />
            <SkillsPageClient skills={skills} />
        </main>
    );
}
