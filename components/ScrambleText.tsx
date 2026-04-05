"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrambleTextProps {
    text: string;
    triggerOnce?: boolean;
    duration?: number; // Total animation length in seconds
    scrambleSpeed?: number; // MS between scramble iterations
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    useUnderscore?: boolean;
    delay?: number; // Optional start delay after inView
    isReady?: boolean; // Manual control for synchronization
}

const CHARS = "!<>-_\\|[]{}—=+*^#%&";

export default function ScrambleText({
    text,
    triggerOnce = false,
    duration = 1.0,
    scrambleSpeed = 35,
    className = "",
    as: Component = "span",
    useUnderscore = false,
    delay = 150,
    isReady = true,
}: ScrambleTextProps) {
    const [scrambled, setScrambled] = useState(text);
    const [isComplete, setIsComplete] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: triggerOnce, margin: "-5% 0px" });

    useEffect(() => {
        if (!isInView || !isReady) {
            setIsComplete(false);
            setScrambled(text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
            return;
        }

        if (isComplete) return;

        const initTimeout = setTimeout(() => {
            let frame = 0;
            const totalFrames = (duration * 1000) / scrambleSpeed;
            
            const interval = setInterval(() => {
                frame++;
                
                const nextText = text
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        
                        const revealProbability = (frame / totalFrames) * 1.5;
                        const isRevealed = Math.random() < revealProbability * (index / text.length + 0.3);

                        if (isRevealed) return char;
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("");

                setScrambled(nextText);

                if (frame >= totalFrames) {
                    setScrambled(text);
                    setIsComplete(true);
                    clearInterval(interval);
                }
            }, scrambleSpeed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(initTimeout);
    }, [isInView, text, duration, scrambleSpeed, isComplete, isReady, delay]);

    return (
        <Component ref={ref} className={`${className} inline-flex items-center gap-3 md:gap-4`}>
            <span>{scrambled}</span>
            {useUnderscore && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isComplete ? { opacity: [1, 0, 1] } : { opacity: 1 }}
                    transition={isComplete ? {
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.5, 1]
                    } : { duration: 0.1 }}
                    className="w-[0.4em] h-[0.08em] bg-[#8B5CF6] translate-y-[0.3em] shadow-[0_0_8px_#8B5CF6]"
                />
            )}
        </Component>
    );
}
