// src/utils/intersectionUtils.ts

interface IntersectionOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

/**
 * Creates an intersection observer that calls the callback when the target element
 * intersects with the viewport or a specified root element
 */
export function observeIntersection(
    element: Element,
    callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
    options: IntersectionOptions = {}
): () => void {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                callback(entry.isIntersecting, entry);
            });
        },
        {
            root: options.root || null,
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold || 0,
        }
    );

    observer.observe(element);

    // Return cleanup function
    return () => {
        observer.disconnect();
    };
}

/**
 * Hook to detect if an element is in viewport
 */
export function useInViewport(
    ref: React.RefObject<Element>,
    options: IntersectionOptions = {}
): boolean {
    const [isInViewport, setIsInViewport] = React.useState(false);

    React.useEffect(() => {
        if (!ref.current) return;

        const cleanup = observeIntersection(
            ref.current,
            (isIntersecting) => {
                setIsInViewport(isIntersecting);
            },
            options
        );

        return cleanup;
    }, [ref, options.root, options.rootMargin, options.threshold]);

    return isInViewport;
}

/**
 * Hook to detect if element is within a section
 */
export function useIsInSection(
    elementRef: React.RefObject<Element>,
    sectionRef: React.RefObject<Element>
): boolean {
    const [isInSection, setIsInSection] = React.useState(false);

    React.useEffect(() => {
        if (!elementRef.current || !sectionRef.current) return;

        const checkPosition = () => {
            const element = elementRef.current;
            const section = sectionRef.current;

            if (!element || !section) return;

            const elementRect = element.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();

            // Check if viewport is within the section bounds
            const viewportTop = window.scrollY;
            const viewportBottom = viewportTop + window.innerHeight;
            const sectionTop = sectionRect.top + window.scrollY;
            const sectionBottom = sectionTop + sectionRect.height;

            setIsInSection(
                viewportTop >= sectionTop - 100 && // 100px buffer
                viewportTop <= sectionBottom
            );
        };

        checkPosition();
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', checkPosition);

        return () => {
            window.removeEventListener('scroll', checkPosition);
            window.removeEventListener('resize', checkPosition);
        };
    }, [elementRef, sectionRef]);

    return isInSection;
}

// Import React at the top of the file for the hooks
import React from 'react';