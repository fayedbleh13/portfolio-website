export interface Skill {
    name: string;
    level: number;
    icon: string;
    status: string;
}

export const SKILLS: Skill[] = [
    { name: 'Three.js', level: 85, icon: '🧊', status: 'RENDERING' },
    { name: 'React', level: 90, icon: '⚛️', status: 'OPTIMIZED' },
    { name: 'WebGL', level: 85, icon: '🌐', status: 'ACCELERATED' },
    { name: 'GLSL', level: 80, icon: '✨', status: 'SHADING' },
    { name: 'TailwindCSS', level: 95, icon: '🍃', status: 'STYLED' },
    { name: 'Framer Motion', level: 88, icon: '🎬', status: 'ANIMATED' },
    { name: 'Solidity', level: 75, icon: '🔗', status: 'SECURED' },
    { name: 'Ethers.js', level: 78, icon: '💰', status: 'INTERFACING' },
    { name: 'Next.js', level: 92, icon: '➡️', status: 'SSR' },
    { name: 'Go', level: 80, icon: '🐹', status: 'CONCURRENT' },
    { name: 'Kubernetes', level: 70, icon: '☸️', status: 'ORCHESTRATED' },
    { name: 'PostgreSQL', level: 85, icon: '🐘', status: 'INDEXED' },
    { name: 'Python', level: 88, icon: '🐍', status: 'SCRIPTED' },
    { name: 'TypeScript', level: 90, icon: 'TS', status: 'TYPED' },
];
