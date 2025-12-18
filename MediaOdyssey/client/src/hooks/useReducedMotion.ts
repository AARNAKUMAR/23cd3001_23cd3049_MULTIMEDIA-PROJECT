import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}

export function getMotionProps(prefersReducedMotion: boolean) {
    return prefersReducedMotion
        ? {
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            exit: { opacity: 1 },
            transition: { duration: 0 },
        }
        : {};
}
