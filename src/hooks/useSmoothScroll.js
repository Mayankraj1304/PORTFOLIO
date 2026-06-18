import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 0.48,
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [reducedMotion]);
}
