/**
 * Tras el hero la página está quieta: solo fades de 200–300 ms (§6/§8).
 * Sin GSAP a propósito — el scrub es únicamente del hero.
 */
export function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = `${Math.min(index * 60, 180)}ms`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );

  targets.forEach((target) => observer.observe(target));
}
