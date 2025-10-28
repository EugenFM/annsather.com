export const delayedScroll = (el: HTMLElement, offset = 100) => {
    let tries = 0;
    const tryScroll = () => {
        if (!el || el.getBoundingClientRect().height === 0) {
            if (tries < 30) {
                tries++;
                setTimeout(tryScroll, 100);
            }
            return;
        }

        const elementTop = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementTop - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    };
    tryScroll();
};
