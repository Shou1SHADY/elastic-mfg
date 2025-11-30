import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // Disable browser's default scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Temporarily disable smooth scrolling to force immediate jump
        const originalScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';

        // 1. Immediate reset
        window.scrollTo(0, 0);

        // 2. Reset on next frame (catches some layout shifts)
        const rafId = requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });

        // 3. Reset after a small delay (catches async loading/production timing issues)
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
            // Restore smooth scrolling only after we are sure we are at the top
            document.documentElement.style.scrollBehavior = originalScrollBehavior;
        }, 50);

        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(timeoutId);
            // Ensure we restore behavior if component unmounts early
            document.documentElement.style.scrollBehavior = originalScrollBehavior;
        };
    }, [pathname]);

    return null;
};
