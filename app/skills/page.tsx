import FloatingDock from "@/components/FloatingDock";
import { getAllSkills } from "@/lib/supabase/skills";
import SkillsPageClient from "./SkillsPageClient";

export const dynamic = 'force-dynamic';

export default async function SkillsPage() {
    const skills = await getAllSkills();

    return (
        <main className="min-h-screen pt-32 pb-32">
            <FloatingDock alwaysShow />
            <SkillsPageClient skills={skills} />
        </main>
    );
}
