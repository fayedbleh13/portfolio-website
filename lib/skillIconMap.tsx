import {
    SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript,
    SiHtml5, SiCss, SiSass, SiBootstrap, SiMui, SiVite, SiWebpack,
    SiNodedotjs, SiExpress, SiLaravel, SiPhp, SiPython, SiDjango,
    SiMysql, SiPostgresql, SiSupabase, SiGit, SiGithub, SiGitlab,
    SiVercel, SiDocker, SiGooglegemini, SiAnthropic,
    SiVuedotjs, SiFigma, SiWordpress, SiPrisma, SiRedis, SiMongodb,
    SiFirebase, SiLinux, SiNginx, SiSqlite,
    SiFastapi, SiCloudflare, SiGooglecloud, SiBun, SiPnpm, SiShadcnui,
    SiLucide, SiTanstack
} from 'react-icons/si'
import { RiOpenaiFill } from 'react-icons/ri'
import { LuBrain, LuCpu, LuCode, LuCloud } from 'react-icons/lu'
import type { IconType } from 'react-icons'

export const SKILL_ICON_MAP: Record<string, IconType> = {
    // Frontend
    'HTML': SiHtml5,
    'CSS': SiCss,
    'SASS': SiSass,
    'TailwindCSS': SiTailwindcss,
    'Bootstrap': SiBootstrap,
    'MaterialUI': SiMui,
    'Javascript': SiJavascript,
    'Typescript': SiTypescript,
    'ReactJS': SiReact,
    'NextJS': SiNextdotjs,
    'Vite': SiVite,
    'Webpack': SiWebpack,

    // Frontend (Variations/Extras)
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'TanStack Router': SiTanstack,
    'TanStack': SiTanstack,
    'Shadcn UI': SiShadcnui,
    'Lucide': SiLucide,
    'Tailwind CSS': SiTailwindcss,
    'Tailwind': SiTailwindcss,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'HTML/CSS': SiHtml5,
    'Vue.js': SiVuedotjs,
    'Vue': SiVuedotjs,
    'Figma': SiFigma,
    'WordPress': SiWordpress,

    // Backend
    'NodeJS': SiNodedotjs,
    'Node.js': SiNodedotjs,
    'FastAPI': SiFastapi,
    'Python': SiPython,
    'Django': SiDjango,
    'PHP': SiPhp,
    'Laravel': SiLaravel,
    'Express': SiExpress,
    'Express.js': SiExpress,

    // Database & Caching
    'Supabase': SiSupabase,
    'MongoDB': SiMongodb,
    'PostgreSQL': SiPostgresql,
    'PostgresSQL': SiPostgresql,
    'Vector Search / RAG': LuBrain,
    'Vector Search': LuBrain,
    'Sqlite': SiSqlite,
    'Redis': SiRedis,
    'MySQL': SiMysql,
    'Firebase': SiFirebase,
    'Prisma': SiPrisma,

    // DevOps & Cloud
    'Docker': SiDocker,
    'Git': SiGit,
    'Linux': SiLinux,
    'Google Cloud': SiGooglecloud,
    'GCP': SiGooglecloud,
    'Cloudflare': SiCloudflare,
    'Bun': SiBun,
    'pnpm': SiPnpm,
    'AWS EC2': LuCloud,
    'AWS S3': LuCloud,
    'AWS SES': LuCloud,
    'AWS': LuCloud,
    'GitHub': SiGithub,
    'GitLab': SiGitlab,
    'Vercel': SiVercel,
    'Nginx': SiNginx,

    // AI / LLM
    'OpenAI': RiOpenaiFill,
    'OpenAI API': RiOpenaiFill,
    'Gemini': SiGooglegemini,
    'Claude': SiAnthropic,
    'Gemini API': SiGooglegemini,
    'Claude API': SiAnthropic,
    'LangChain': LuCpu,
    'AI/LLM': LuBrain,
}

// Brand colors for exact match to official logos
export const SKILL_COLOR_MAP: Record<string, string> = {
    // Frontend
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'SASS': '#CC6699',
    'TailwindCSS': '#06B6D4',
    'Bootstrap': '#7952B3',
    'MaterialUI': '#007FFF',
    'Javascript': '#F7DF1E',
    'JavaScript': '#F7DF1E',
    'Typescript': '#3178C6',
    'TypeScript': '#3178C6',
    'ReactJS': '#61DAFB',
    'React': '#61DAFB',
    'NextJS': '#ffffff',
    'Next.js': '#ffffff',
    'TanStack Router': '#FF4154',
    'TanStack': '#FF4154',
    'Shadcn UI': '#ffffff',
    'Lucide': '#F56565',
    'Vite': '#646CFF',
    'Webpack': '#8DD6F9',
    'Tailwind CSS': '#06B6D4',
    'Tailwind': '#06B6D4',
    'HTML/CSS': '#E34F26',

    // Backend
    'NodeJS': '#339933',
    'Node.js': '#339933',
    'FastAPI': '#009688',
    'Python': '#3776AB',
    'Django': '#092E20',
    'PHP': '#777BB4',
    'Laravel': '#FF2D20',
    'Express': '#ffffff',
    'Express.js': '#ffffff',

    // Database & Caching
    'Supabase': '#3ECF8E',
    'MongoDB': '#47A248',
    'PostgreSQL': '#4169E1',
    'PostgresSQL': '#4169E1',
    'Vector Search / RAG': '#A855F7',
    'Vector Search': '#A855F7',
    'Sqlite': '#003B57',
    'Redis': '#DC382D',
    'MySQL': '#4479A1',
    'Firebase': '#FFCA28',

    // DevOps & Cloud
    'Docker': '#2496ED',
    'Git': '#F05032',
    'Linux': '#FCC624',
    'Google Cloud': '#4285F4',
    'GCP': '#4285F4',
    'Cloudflare': '#F38020',
    'Bun': '#FBF0DF',
    'pnpm': '#F69220',
    'AWS EC2': '#FF9900',
    'AWS S3': '#569A31',
    'AWS SES': '#DD344C',
    'AWS': '#FF9900',
    'GitHub': '#ffffff',
    'GitLab': '#FC6D26',
    'Vercel': '#ffffff',

    // AI
    'OpenAI': '#ffffff',
    'OpenAI API': '#ffffff',
    'Gemini': '#8E75B2',
    'Gemini API': '#8E75B2',
    'Claude': '#D97757',
    'Claude API': '#D97757',
}

/** Returns the icon component for a skill, with a generic fallback */
export function getSkillIcon(skillName: string): IconType {
    return SKILL_ICON_MAP[skillName] ?? LuCode
}

/** Returns the brand hex colour for CSS glow, with a default fallback */
export function getSkillColor(skillName: string): string {
    return SKILL_COLOR_MAP[skillName] ?? '#22d3ee' // cyan-glow default
}
