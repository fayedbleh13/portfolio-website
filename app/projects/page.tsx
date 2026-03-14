import FloatingDock from '@/components/FloatingDock'
import { createClient } from '@/lib/supabase/server'
import ProjectsClient from './ProjectsClient'

export default async function ProjectsPage() {
    const supabase = await createClient()

    // Fetch published projects, ordered by display_order
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true })

    return (
        <main className="min-h-screen pt-32 pb-32">
            <FloatingDock />
            <ProjectsClient projects={projects || []} />
        </main>
    )
}
