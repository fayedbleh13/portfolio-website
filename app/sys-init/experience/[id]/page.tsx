import WorkExperienceForm from '@/components/admin/WorkExperienceForm'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditWorkExperiencePage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: experience, error } = await supabase
        .from('work_experiences')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error || !experience) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <WorkExperienceForm initialData={experience} isEditing={true} />
        </div>
    )
}
