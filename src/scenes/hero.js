import { gsap, ScrollTrigger } from "../lib/motion.js";

/**
 * Escena anclada del hero (DESIGN.md §7, técnica 2): el scroll elige el frame
 * del clip. Al bajar el diseño a máquina se dibuja; al subir se deshace.
 */
export function initCinematicHero() {
  const scene = document.querySelector("[data-cinematic]");
  if (!scene) return;

  const video = scene.querySelector("[data-cinematic-video]");
  const copy = scene.querySelector("[data-hero-copy]");
  const hint = scene.querySelector("[data-hero-hint]");
  if (!video) return;

  video.muted = true;
  video.pause();

  // El copy de cierre solo aparece cuando el diseño está completo. Se oculta
  // desde JS para que sin JS (o sin vídeo) el texto siga siendo legible.
  gsap.set(copy, { autoAlpha: 0, y: 24 });

  const buildScene = () => {
    if (!Number.isFinite(video.duration) || video.duration === 0) return;

    const playhead = { t: 0 };
    // En `duration` exacto el vídeo pasa a `ended` y deja de pintar: el cierre
    // de la escena se quedaría en negro. Paramos un par de frames antes.
    const lastFrame = Math.max(0, video.duration - 0.1);

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: scene,
        start: "top top",
        // El pin largo en táctil se siente atrapado (§7).
        end: () =>
          window.matchMedia("(max-width: 767px)").matches ? "+=120%" : "+=200%",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(hint, { autoAlpha: 0, duration: 0.08 }, 0)
      .to(
        playhead,
        {
          t: lastFrame,
          duration: 0.78,
          onUpdate: () => {
            if (Math.abs(video.currentTime - playhead.t) > 0.01) {
              video.currentTime = playhead.t;
            }
          },
        },
        0,
      )
      .to(copy, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.74);

    ScrollTrigger.refresh();
  };

  if (video.readyState >= 2) {
    buildScene();
  } else {
    video.addEventListener("loadeddata", buildScene, { once: true });
  }

  // Safari/iOS no decodifica el primer frame hasta que el vídeo se reproduce.
  video
    .play()
    .then(() => video.pause())
    .catch(() => {});
}
