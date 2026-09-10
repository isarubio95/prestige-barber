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
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("webkit-playsinline", "true");
  video.pause();

  // El copy de cierre solo aparece cuando el diseño está completo. Se oculta
  // desde JS para que sin JS (o sin vídeo) el texto siga siendo legible.
  gsap.set(copy, { autoAlpha: 0, y: 24 });

  let sceneBuilt = false;

  const buildScene = () => {
    if (sceneBuilt) return;
    if (!Number.isFinite(video.duration) || video.duration === 0) return;
    sceneBuilt = true;

    const playhead = { t: 0 };
    // En `duration` exacto el vídeo pasa a `ended` y deja de pintar: el cierre
    // de la escena se quedaría en negro. Paramos un par de frames antes.
    const lastFrame = Math.max(0, video.duration - 0.1);

    // iOS ignora `currentTime` si llega otro seek antes de `seeked`. En desktop
    // el decode es lo bastante rápido para que no se note; en táctil el clip
    // se queda en el primer frame. Un seek a la vez; si el dedo sigue, se
    // aplica el playhead más reciente al terminar.
    let seeking = false;
    let queued = false;
    const frameGap = window.matchMedia("(pointer: coarse)").matches ? 0.04 : 0.01;

    const applyPlayhead = () => {
      if (seeking) {
        queued = true;
        return;
      }
      if (Math.abs(video.currentTime - playhead.t) < frameGap) return;
      seeking = true;
      queued = false;
      video.currentTime = playhead.t;
    };

    video.addEventListener("seeked", () => {
      seeking = false;
      if (queued) applyPlayhead();
    });

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
          onUpdate: applyPlayhead,
        },
        0,
      )
      .to(copy, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.74);

    ScrollTrigger.refresh();
  };

  // En iOS `loadeddata` a veces llega con duration Infinity; sin reintento
  // la escena no se construye y el swipe no mueve el clip.
  const tryBuild = () => {
    buildScene();
    if (!sceneBuilt) return;
    video.removeEventListener("loadedmetadata", tryBuild);
    video.removeEventListener("loadeddata", tryBuild);
    video.removeEventListener("durationchange", tryBuild);
    video.removeEventListener("canplay", tryBuild);
  };
  video.addEventListener("loadedmetadata", tryBuild);
  video.addEventListener("loadeddata", tryBuild);
  video.addEventListener("durationchange", tryBuild);
  video.addEventListener("canplay", tryBuild);
  tryBuild();

  const unlock = () => {
    const playPromise = video.play();
    video.pause();
    playPromise?.catch(() => {});
  };

  // Safari/iOS no decodifica el primer frame hasta que el vídeo se reproduce.
  // Sin gesto de usuario el play() se rechaza; el primer toque lo desbloquea.
  unlock();
  window.addEventListener("pointerdown", unlock, { once: true, passive: true });
}
