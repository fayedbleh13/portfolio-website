import ProjectForm from '@/components/admin/ProjectForm'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error || !project) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <ProjectForm initialData={project} isEditing={true} />
        </div>
    )
}
