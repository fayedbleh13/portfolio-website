"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        // Call server-side logout to clear cookies properly
        await fetch("/api/auth/logout", { method: "POST" });

        // Clear local browser session
        await supabase.auth.signOut({ scope: "local" });

        router.push("/access");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="text-xs font-mono text-cyan-glow hover:text-white transition-colors uppercase tracking-widest text-left"
        >
            [ TERMINATE SESSION ]
        </button>
    );
}
