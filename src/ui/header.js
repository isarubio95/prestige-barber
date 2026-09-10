/**
 * Header sticky (§1/§6): filete y velo al hacer scroll, ancla activa y panel
 * de navegación a pantalla en móvil.
 */
export function initHeader({ lenis } = {}) {
  const header = document.querySelector("[data-header]");
  const panel = document.querySelector("[data-nav-panel]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const close = document.querySelector("[data-nav-close]");

  if (header) {
    const syncScrolled = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    syncScrolled();
    window.addEventListener("scroll", syncScrolled, { passive: true });
  }

  const setPanel = (open) => {
    if (!panel) return;
    panel.classList.toggle("is-open", open);
    panel.inert = !open;
    toggle?.setAttribute("aria-expanded", String(open));
    toggle?.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");

    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  };

  toggle?.addEventListener("click", () => setPanel(!panel.classList.contains("is-open")));
  close?.addEventListener("click", () => setPanel(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel?.classList.contains("is-open")) setPanel(false);
  });

  // Anclas: scroll suave por Lenis, descontando el alto del header.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      // Los CTA de la maqueta no navegan (§11).
      if (href === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      setPanel(false);

      const offset = href === "#hero" ? 0 : -(header?.offsetHeight ?? 0);
      if (lenis) {
        lenis.scrollTo(target, { offset });
      } else {
        window.scrollTo({ top: target.offsetTop + offset, behavior: "smooth" });
      }
    });
  });

  initActiveAnchor();
}

function initActiveAnchor() {
  const links = [...document.querySelectorAll(".nav-link[href^='#']")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.toggleAttribute("aria-current", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "true");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}
