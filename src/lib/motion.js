import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

export const prefersReducedMotion = () => reducedMotionQuery.matches;

/**
 * Lenis y ScrollTrigger comparten el ticker de GSAP. Dos bucles de rAF dan
 * tirones (DESIGN.md §7).
 */
export function initSmoothScroll() {
  const lenis = new Lenis({
    autoRaf: false,
    duration: 1.1,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export { gsap, ScrollTrigger };
