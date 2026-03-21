import WorkExperienceForm from '@/components/admin/WorkExperienceForm'

export default function NewWorkExperiencePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <WorkExperienceForm isEditing={false} />
        </div>
    )
}
