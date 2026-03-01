export interface Project {
    id: string
    title: string
    description: string
    techStack: string[]
    imageUrl: string
    link?: string
}

export const PROJECTS: Project[] = [
    {
        id: 'nexus',
        title: 'NEXUS ENGINE',
        description: 'A high-performance WebGL rendering engine for real-time architectural visualization.',
        techStack: ['Three.js', 'React', 'WebGL', 'GLSL'],
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Abstract geometric placeholder
        link: '#'
    },
    {
        id: 'aether',
        title: 'AETHER UI',
        description: 'Next-gen component library focusing on glassmorphism and fluid micro-interactions.',
        techStack: ['React', 'TailwindCSS', 'Framer Motion'],
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop', // Cyberpunk UI placeholder
        link: '#'
    },
    {
        id: 'chronos',
        title: 'CHRONOS PROTOCOL',
        description: 'Decentralized time-stamping service built on Ethereum with sub-second precision.',
        techStack: ['Solidity', 'Ethers.js', 'Next.js'],
        imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop', // Blockchain abstract placeholder
        link: '#'
    }
]
