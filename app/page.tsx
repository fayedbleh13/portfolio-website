import { createClient } from "@/lib/supabase/server";
import HomeClient from "./HomeClient";
import { WorkExperience } from "@/components/WorkExperienceSection";

export default async function Home() {
    const supabase = await createClient();

    // Fetch all settings
    const { data: settingsData } = await supabase.from("settings").select("*");

    // Fetch work experiences
    const { data: experiencesData } = await supabase
        .from("work_experiences")
        .select("*")
        .order("display_order", { ascending: true });

    // Fetch featured projects
    const { data: projectsData } = await supabase
        .from("projects")
        .select("id, title, category, description, image_url, image_urls, project_url, tech_tags, color, span, published")
        .eq("published", true)
        .order("display_order", { ascending: true })
        .limit(2);

    // Convert array of {key, value} into a simple record lookup
    const settingsMap: Record<string, string> = {};
    if (settingsData) {
        settingsData.forEach((s) => {
            settingsMap[s.key] = s.value;
        });
    }

    return (
        <HomeClient
            settings={settingsMap}
            experiences={(experiencesData as WorkExperience[]) || []}
            projects={projectsData || []}
        />
    );
}
