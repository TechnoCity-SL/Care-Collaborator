import { useEffect, useState, type RefObject } from 'react';

/**
 * Drifts an element for a parallax effect once its containing section has scrolled
 * past the sticky header, growing with how far past. Offset stays 0 while the section
 * hasn't reached that point yet, so an element's configured top/left/etc. holds exactly
 * until the section is actually visible below the header — regardless of how far down
 * the page that section sits.
 * Returns 0 during SSR and when the user has requested reduced motion.
 */
export function useParallaxOffset(containerRef: RefObject<HTMLElement | null>, speed: number): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
    let ticking = false;
    const update = () => {
      const container = containerRef.current;
      if (container) {
        const distancePastHeader = Math.max(0, headerHeight - container.getBoundingClientRect().top);
        setOffset(distancePastHeader * speed);
      }
      ticking = false;
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef, speed]);

  return offset;
}
