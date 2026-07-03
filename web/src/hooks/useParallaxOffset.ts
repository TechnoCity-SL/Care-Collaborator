import { useEffect, useState } from 'react';

/**
 * Tracks vertical scroll position and returns `window.scrollY * speed`,
 * so multiple elements can drift at different rates for a parallax effect.
 * Returns 0 during SSR and when the user has requested reduced motion.
 */
export function useParallaxOffset(speed: number): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    const update = () => {
      setOffset(window.scrollY * speed);
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
  }, [speed]);

  return offset;
}
