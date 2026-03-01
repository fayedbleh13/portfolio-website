'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
    text: string
    speed?: number
    className?: string
    delay?: number
}

export default function TypewriterText({
    text,
    speed = 50,
    className = '',
    delay = 0,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState('')
    const [isGlitching, setIsGlitching] = useState(false)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        let currentIndex = 0

        // Initial delay
        const startTyping = setTimeout(() => {
            const typeChar = () => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1))
                    currentIndex++

                    // Random glitch effect probability (5% per char)
                    if (Math.random() < 0.05) {
                        setIsGlitching(true)
                        setTimeout(() => setIsGlitching(false), 200)
                    }

                    timeoutId = setTimeout(typeChar, speed)
                }
            }
            typeChar()
        }, delay)

        return () => {
            clearTimeout(startTyping)
            clearTimeout(timeoutId)
        }
    }, [text, speed, delay])

    return (
        <span className={`${className} ${isGlitching ? 'glitch-active' : ''}`}>
            {displayedText}
            <span className="animate-pulse text-violet">_</span>

        </span>
    )
}
