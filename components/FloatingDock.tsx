"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

const NAV_ITEMS = [
    { href: "/", label: "HOME" },
    { href: "/skills", label: "SKILLS" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/contact", label: "CONTACT" },
];

type FloatingDockProps = {
    alwaysShow?: boolean;
};

export default function FloatingDock({
    alwaysShow = false,
}: FloatingDockProps) {
    const { isInitialized } = useAppStore();
    const pathname = usePathname();

    // Always show if alwaysShow prop is true (for pages like /contact)
    if (!alwaysShow && !isInitialized) return null;

    const isActive = (href: string) => {
        if (href === "/" && pathname === "/") return true;
        if (href !== "/" && pathname.startsWith(href)) return true;
        return false;
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
        >
            <nav className="glass-panel px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl backdrop-blur-xl bg-black/40">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`relative text-xs font-space-grotesk tracking-widest transition-colors duration-300 ${
                            isActive(item.href)
                                ? "text-white"
                                : "text-white/40 hover:text-white/80"
                        }`}
                    >
                        {item.label}

                        {/* Active Indicator Dot */}
                        {isActive(item.href) && (
                            <motion.div
                                layoutId="active-dot"
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet rounded-full shadow-[0_0_8px_#8B5CF6]"
                            />
                        )}
                    </Link>
                ))}
            </nav>
        </motion.div>
    );
}
