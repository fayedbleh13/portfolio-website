import { config } from 'dotenv'
config({ path: '.env.local' })

import { createAdminClient } from '../lib/supabase/server'

const skills = [
    { name: 'Three.js', icon: '🧊', level: 85, status: 'RENDERING', category: 'frontend', display_order: 1, is_featured: true },
    { name: 'React', icon: '⚛️', level: 90, status: 'OPTIMIZED', category: 'frontend', display_order: 2, is_featured: true },
    { name: 'WebGL', icon: '🌐', level: 85, status: 'ACCELERATED', category: 'frontend', display_order: 3, is_featured: false },
    { name: 'GLSL', icon: '✨', level: 80, status: 'SHADING', category: 'frontend', display_order: 4, is_featured: false },
    { name: 'TailwindCSS', icon: '🍃', level: 95, status: 'STYLED', category: 'frontend', display_order: 5, is_featured: true },
    { name: 'Framer Motion', icon: '🎬', level: 88, status: 'ANIMATED', category: 'frontend', display_order: 6, is_featured: false },
    { name: 'Solidity', icon: '🔗', level: 75, status: 'SECURED', category: 'blockchain', display_order: 7, is_featured: false },
    { name: 'Ethers.js', icon: '💰', level: 78, status: 'INTERFACING', category: 'blockchain', display_order: 8, is_featured: false },
    { name: 'Next.js', icon: '➡️', level: 92, status: 'SSR', category: 'frontend', display_order: 9, is_featured: true },
    { name: 'Go', icon: '🐹', level: 80, status: 'CONCURRENT', category: 'backend', display_order: 10, is_featured: false },
    { name: 'Kubernetes', icon: '☸️', level: 70, status: 'ORCHESTRATED', category: 'devops', display_order: 11, is_featured: false },
    { name: 'PostgreSQL', icon: '🐘', level: 85, status: 'INDEXED', category: 'backend', display_order: 12, is_featured: false },
    { name: 'Python', icon: '🐍', level: 88, status: 'SCRIPTED', category: 'backend', display_order: 13, is_featured: false },
    { name: 'TypeScript', icon: 'TS', level: 90, status: 'TYPED', category: 'frontend', display_order: 14, is_featured: true },
]

async function seedSkills() {
    console.log('Seeding skills...')
    
    const supabase = await createAdminClient()
    
    const { error } = await supabase
        .from('skills')
        .upsert(skills, { onConflict: 'name' })

    if (error) {
        console.error('Error seeding skills:', error)
        process.exit(1)
    }

    console.log('Skills seeded successfully!')
}

seedSkills()
