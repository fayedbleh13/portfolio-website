export interface WorkExperience {
    id: string
    company: string
    role: string
    duration: string
    description: string
    technologies: string[]
    featuredProjects?: string[]
}

export const WORK_EXPERIENCES: WorkExperience[] = [
    {
        id: '1',
        company: 'TECH NAVE',
        role: 'LEAD SOLUTIONS ARCHITECT',
        duration: '2023 - PRESENT',
        description: 'Pioneering high-scale distributed systems and real-time visualization engines. Orchestrated the transition to a micro-frontend architecture, improving system modularity and developer velocity by 40%.',
        technologies: ['React', 'Three.js', 'Go', 'Kubernetes'],
        featuredProjects: ['nexus']
    },
    {
        id: '2',
        company: 'QUANTUM SYSTEMS',
        role: 'SENIOR FULL-STACK ENGINEER',
        duration: '2021 - 2023',
        description: 'Engineered performant data pipelines and immersive dashboard experiences. Developed a custom GLSL shader library for real-time data representation, reducing latency in visualization rendering by 60%.',
        technologies: ['Next.js', 'WebGL', 'PostgreSQL', 'Python'],
        featuredProjects: ['aether']
    },
    {
        id: '3',
        company: 'NEBULA LABS',
        role: 'FRONTEND ENGINEER',
        duration: '2019 - 2021',
        description: 'Crafted fluid, reactive user interfaces for decentralized applications. Focused on state management optimization and cross-chain interaction protocols using Ethereum and smart contracts.',
        technologies: ['TypeScript', 'TailwindCSS', 'Solidity', 'Ethers.js'],
        featuredProjects: ['chronos']
    }
]
