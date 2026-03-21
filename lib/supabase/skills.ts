import { createClient } from './server'

export interface Skill {
    id: string
    name: string
    icon: string
    level: number
    status: string
    category: string
    display_order: number
    is_featured: boolean
    created_at: string
    updated_at: string
}

export async function getAllSkills(): Promise<Skill[]> {
    const supabase = await createClient()
    
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true })
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching skills:', error)
        return []
    }

    return data || []
}

export async function getFeaturedSkills(): Promise<Skill[]> {
    const supabase = await createClient()
    
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching featured skills:', error)
        return []
    }

    return data || []
}

export async function getSkillsByCategory(category: string): Promise<Skill[]> {
    const supabase = await createClient()
    
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('category', category)
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching skills by category:', error)
        return []
    }

    return data || []
}
