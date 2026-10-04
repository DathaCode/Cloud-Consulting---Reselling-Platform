import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element is near the viewport.
 * `seen` latches true the first time, so heavy content can mount lazily and stay mounted.
 */
export const useInView = ({ rootMargin = '200px' } = {}) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setInView(true);
            setSeen(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
                if (entry.isIntersecting) setSeen(true);
            },
            { rootMargin }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    return { ref, inView, seen };
};
