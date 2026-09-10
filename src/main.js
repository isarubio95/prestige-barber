import "./styles/app.css";

import { initSmoothScroll, prefersReducedMotion } from "./lib/motion.js";
import { initCinematicHero } from "./scenes/hero.js";
import { initHeader } from "./ui/header.js";
import { initReveal } from "./ui/reveal.js";

// Sin pin ni scrub con reduced motion: queda el poster y la tipografía (§7).
const lenis = prefersReducedMotion() ? null : initSmoothScroll();

initHeader({ lenis });
initReveal();

if (!prefersReducedMotion()) {
  initCinematicHero();
}
