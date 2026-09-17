/**
 * Site-wide settings.
 * Edit these values directly to update your portfolio content.
 */
export const settings = {
    // Hero Section
    hero_tagline: "Latency is the enemy.",
    hero_subtitle: "Re-imagining the digital frontier.\n Where logic meets emotion.",

    // About Section (DualNature component)
    about_architect:
        "Obsessed with system architecture, performance optimization, and clean code. Building scalable digital infrastructures that stand the test of time.",
    about_creator:
        "Crafting immersive user experiences that resonate on an emotional level. Translating complex logic into fluid, beautiful interactions.",
} as const;

export type Settings = typeof settings;
