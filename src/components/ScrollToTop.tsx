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

        window.scrollTo(0, 0);

        // Restore smooth scrolling after a brief delay to ensure the scroll happened instantly
        // Using setTimeout ensures it runs after the current paint cycle
        const timeoutId = setTimeout(() => {
            document.documentElement.style.scrollBehavior = originalScrollBehavior;
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
};
