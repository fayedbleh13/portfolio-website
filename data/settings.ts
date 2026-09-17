/**
 * Site-wide settings.
 * Edit these values directly to update your portfolio content.
 */
export const settings = {
    // Hero Section
    hero_tagline: "Full-Stack Developer · Philippines",
    hero_subtitle: "Building fast, purposeful web systems\n— with a designer's eye.",

    // About Section (DualNature component)
    about_architect:
        "I care about the system behind the feature — the latency, the failure modes, the cost. I build things I won't be embarrassed by when they break in production at 3am.",
    about_creator:
        "I've been designing interfaces since before I could name the discipline. If something looks off by 4px, I'll notice — and fix it before anyone asks.",
} as const;

export type Settings = typeof settings;
