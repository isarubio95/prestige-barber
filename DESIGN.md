# Prestige Barber Studio — sistema de diseño

Fuente de verdad extraída del sello `logo.jpg` (1060×1060). Usar estos tokens al maquetar la web. No inventar colores fuera de esta paleta salvo estados de UI documentados aquí.

Este archivo es **marca + brief de la maqueta**: paleta, logo, tipo, motion y ritmo Apple (§1–§10) y qué página se enseña al cliente (§11–§13). Sin el mapa de secciones y los datos del local, la web se parece al sello pero no al negocio.

**Marca:** Prestige Barber Studio  
**Tono:** lujo clásico, sello heráldico, barbería contemporánea  
**Modo principal:** oscuro (negro + oro). La web debe sentirse como el sello, no como una plantilla genérica.  
**Idioma de la web:** español (tú). El sello y el nombre de marca se quedan en inglés.

---

## 1. Logotipo

Sello circular negro con trazos en oro champán.

| Elemento | Descripción |
| --- | --- |
| Campo | Disco negro puro `#000000` |
| Anillos | Doble filete circular en oro |
| Wordmark superior | `PRESTIGE` en serif clásica, arco superior, versales |
| Wordmark inferior | `BARBER STUDIO` en la misma serif, arco inferior, versales |
| Estrellas | 5 arriba + 5 abajo; la central inferior es algo mayor |
| Icono | Poste de barbero en oro, con brillo metálico (no plano) |

### Assets

Master y original en la raíz. Recortes de producción en `assets/brand/` (PNG + WebP). Servir **WebP** con PNG de respaldo.

| Archivo | Píxeles | Peso ~ | Uso |
| --- | --- | --- | --- |
| `logo.jpg` | 1060 | 123 KB | Original. No usar en la web. |
| `logo.png` | 1060 | 435 KB | Master web (alpha, campo negro limpio). Hero desktop @3x o fallback de `logo-1024.webp`. |
| `assets/brand/logo-64` | 64 | 3–7 KB | Favicon / pestaña. Silueta reconocible; el wordmark **no** se lee. |
| `assets/brand/logo-128` | 128 | 8–19 KB | Sello del lockup @2x (44–48 px CSS). |
| `assets/brand/logo-180` | 180 | 13–34 KB | `apple-touch-icon`. |
| `assets/brand/logo-256` | 256 | 20–59 KB | Lockup @3x. Hero móvil @1x. |
| `assets/brand/logo-512` | 512 | 45–167 KB | Hero móvil @2x / tablet. |
| `assets/brand/logo-1024.webp` | 1024 | 101 KB | Hero desktop retina. El PNG de este tamaño no se genera: pesa más que el master. |

Cada tamaño excepto 1024 existe en `.png` y `.webp`. Preferir `.webp` (calidad 92, ~60 % menos peso).

### Qué archivo usar según viewport

El sello en pantalla (CSS) va muy por debajo del archivo: en retina hace falta 2× o 3×.

| Contexto | Ancho CSS | Archivo |
| --- | --- | --- |
| Favicon | 16–32 px | `logo-64` |
| Header (sello del lockup) | 40–48 px | `logo-128` (@2x) o `logo-256` (@3x) |
| Hero móvil | 160–200 px | `logo-256` / `logo-512` |
| Hero tablet | 220–280 px | `logo-512` |
| Hero desktop | 280–400 px | `logo-512` / `logo-1024.webp` / `logo.png` |

**Nunca** servir `logo.png` (1060) en el header: el móvil descargaría 435 KB para pintar ~48 px. El master solo vale como fallback del hero desktop.

Snippet del **sello dentro del lockup** (no del hero):

```html
<picture>
  <source
    type="image/webp"
    srcset="
      /assets/brand/logo-128.webp 128w,
      /assets/brand/logo-180.webp 180w,
      /assets/brand/logo-256.webp 256w
    "
    sizes="(max-width: 640px) 44px, 48px"
  />
  <img
    src="/assets/brand/logo-256.png"
    srcset="
      /assets/brand/logo-128.png 128w,
      /assets/brand/logo-180.png 180w,
      /assets/brand/logo-256.png 256w
    "
    sizes="(max-width: 640px) 44px, 48px"
    width="48"
    height="48"
    alt=""
  />
</picture>
```

`alt` vacío si el wordmark del lockup (texto HTML) ya dice el nombre; si el sello va solo, `alt="Prestige Barber Studio"`.

En un hero, cambiar `sizes` a `(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px` y entonces sí incluir `/logo.png 1060w` en el `srcset` PNG.

### Reglas de uso

- Respetar el sello completo. No separar el poste, las estrellas o una sola palabra salvo que se diseñe una variante explícita.
- El negro interior **forma parte del logo**. Sobre fondos claros el disco negro se mantiene; no recortar el oro como line-art.
- Sobre fotos, apoyar el sello en una zona oscura o con velo negro. No colocarlo sobre cielos o fachadas claras.
- No recolorear el oro. No añadir sombra, bisel, trazo blanco ni degradados extra.
- **Espacio de respiro:** mínimo ~12 % del diámetro alrededor del sello.
- **Tamaño mínimo del sello solo:** 56–64 px CSS (archivo 128 o 256, no el de 64). A 64 px de archivo `BARBER STUDIO` desaparece; solo vale como favicon. Para leer el sello entero, ≥ 120 px CSS (archivo 256+).
- **En el header no va el sello solo.** A 40–48 px el lettering del disco no se lee: hace falta el lockup de abajo.
- No distorsionar. Escalar de forma proporcional. No interpolar a un tamaño mayor que el archivo elegido.

### Lockup de navegación (obligatorio en header)

Variante explícita para chrome de web. El sello **completo** (no recortado) + wordmark **composición HTML** en Cinzel. No extraer `PRESTIGE` del arco del logo ni usar el disco como icono lineal.

```
[ sello 40–48 px ]  PRESTIGE
                    BARBER STUDIO
```

| Pieza | Spec |
| --- | --- |
| Sello | 44 px CSS móvil, 48 px desktop. Archivo `logo-128` / `logo-256`. Nunca `logo.png`. |
| `PRESTIGE` | Cinzel 700, `gold`, uppercase, tracking 0.14–0.18 em, ~15–18 px |
| `BARBER STUDIO` | Cinzel 400, `gold-deep`, uppercase, tracking 0.16 em, ~10–11 px |
| Alineación | Sello a la izquierda, texto a la derecha, centrados en vertical. Gap ~12 px. |
| Enlace | Todo el lockup es un `<a href="#hero">`. |
| Móvil estrecho | Las dos líneas se mantienen; no pasar a una sola línea `PRESTIGE BARBER STUDIO` (rompe el ritmo del sello). |
| Hover | El wordmark sube a `gold-bright`. El sello no se recolorea ni escala. |
| Fondo | Header `surface-2` a ~90 % con `backdrop-filter` si hay scroll. Filete inferior 1 px `line`. |

El hero cinematográfico **no** usa este lockup: ahí el sello, si aparece, va grande (≥ 160 px) o no va (el vídeo + Cinzel de cierre bastan).

```html
<a class="brand" href="#hero" aria-label="Prestige Barber Studio">
  <!-- <picture> del sello, 48×48, alt="" -->
  <span class="brand-text">
    <span class="brand-name">Prestige</span>
    <span class="brand-sub">Barber Studio</span>
  </span>
</a>
```

`text-transform: uppercase` en CSS. El `aria-label` cubre el sello con `alt` vacío.

---

## 2. Paleta extraída del sello

Muestreo de píxeles del lettering, anillos y poste. El oro del texto y de los filetes es el color canónico.

### Primarios (obligatorios)

| Token | Hex | RGB | HSL | Rol |
| --- | --- | --- | --- | --- |
| `black` | `#000000` | 0, 0, 0 | 0° 0% 0% | Campo del sello, fondo de página, UI oscura |
| `gold` | `#DABC80` | 218, 188, 128 | 40° 55% 68% | Color de marca. Texto del sello, filetes, estrellas, acentos |
| `gold-bright` | `#DDC490` | 221, 196, 144 | 41° 53% 72% | Brillo metálico (poste). Highlights, hover de oro |
| `gold-deep` | `#CDB47C` | 205, 180, 124 | 41° 45% 65% | Oro en reposo, bordes suaves, iconos menos luminosos |
| `gold-shadow` | `#CCA85C` | 204, 168, 92 | 40° 52% 58% | Franjas oscuras del poste. Profundidad, active |

`gold` es el valor a usar por defecto (`#DABC80`). Es el color más frecuente en el lettering `PRESTIGE` / `BARBER STUDIO` y en los anillos.

### Superficies (derivadas, misma familia)

No aparecen como planos en el sello, pero hacen falta para maquetar sin salir del clima visual.

| Token | Hex | Rol |
| --- | --- | --- |
| `surface` | `#0C0A08` | Fondos de sección ligeramente por encima del negro puro (evita un negro “apagado” en pantallas) |
| `surface-2` | `#1A1610` | Cards, header sticky, paneles |
| `line` | `#2A2418` | Separadores sobre oscuro |
| `ivory` | `#F5F0E6` | Superficie clara puntual (no es el modo por defecto) |
| `cream` | `#E8D8C4` | Metal/cuero claro del sillón (pie dorado, capa, producto). Fotografía / detalle, no texto |
| `white` | `#FFFFFF` | Texto sobre negro cuando no se usa oro |

### Color de apoyo solo para texto oro sobre claro

`gold` sobre blanco **no cumple WCAG** (ver §4). Si hiciera falta texto dorado sobre `ivory` / blanco:

| Token | Hex | RGB | Uso |
| --- | --- | --- | --- |
| `gold-ink` | `#8A6A28` | 138, 106, 40 | Texto u iconos pequeños sobre superficie clara. Misma familia de matiz (~40°) |

No usar `gold-ink` en el sello ni como oro decorativo de marca; es solo accesibilidad.

### Fuera de paleta

No introducir el rojo/azul clásico de poste de barbero. Este sello es **monocromo oro sobre negro**. Tampoco grises fríos de UI genérica (`#111827`, `#6B7280`) ni azul corporativo.

---

## 3. Cómo aplicar el color

### Jerarquía

1. **Negro** — lienzo. La mayor parte de la página.
2. **Oro** — marca, títulos de display, CTAs, filetes, hover.
3. **Ivory / blanco** — texto de lectura larga y UI secundaria sobre negro.
4. **Cream** — acento fotográfico, no un tercer color de interfaz.

### Combinaciones permitidas

| Fondo | Texto / trazo | Uso |
| --- | --- | --- |
| `black` / `surface` | `gold` | Títulos, nav, datos de marca |
| `black` / `surface` | `white` o `ivory` | Cuerpo, párrafos, labels |
| `gold` | `black` | Botón primario, chip, CTA |
| `ivory` | `black` | Modo claro puntual (ficha, email) |
| `ivory` | `gold-ink` | Microcopy dorado sobre claro |

### Combinaciones prohibidas

| Fondo | Texto | Motivo |
| --- | --- | --- |
| `white` / `ivory` | `gold` (`#DABC80`) | Contraste 1.83:1. Ilegible |
| `gold` | `white` | Contraste 1.83:1 |
| `gold` | `ivory` / `cream` | Casi sin contraste |

### Componentes (orientación)

- **Botón primario:** fondo `gold`, texto `black`. Hover: `gold-bright`. Active: `gold-shadow`.
- **Botón secundario:** fondo transparente, borde `gold`, texto `gold`. Hover: fondo `gold`, texto `black`.
- **Links:** `gold`, underline en `gold-deep`.
- **Filetes / divisores:** 1 px `gold-deep` al 40 % de opacidad, o sólido `line`.
- **Focus:** anillo 2 px `gold` sobre `black`.
- **Header:** `surface-2` a ~90 % si hay scroll; lockup §1 (sello 40–48 px + Cinzel). Nunca `logo.png` aquí.
- **Botón disabled:** fondo `gold-shadow` al 40 %, texto `black`, `cursor: not-allowed`.
- **Error / éxito (formulario, si aparece):** texto `ivory`; el error no usa rojo de poste. Filete `gold-shadow` + copy. Éxito: filete `gold`.

---

## 4. Contraste (WCAG 2.2)

Relación sobre `black` `#000000`:

| Color | Ratio | Texto normal | Texto grande / UI ≥ 3:1 |
| --- | --- | --- | --- |
| `gold` `#DABC80` | **11.49:1** | AAA | AAA |
| `gold-bright` `#DDC490` | **12.37:1** | AAA | AAA |
| `gold-deep` `#CDB47C` | **10.42:1** | AAA | AAA |
| `gold-shadow` `#CCA85C` | **9.32:1** | AAA | AAA |
| `ivory` `#F5F0E6` | **18.49:1** | AAA | AAA |
| `white` | **21:1** | AAA | AAA |

Sobre `white` `#FFFFFF`:

| Color | Ratio | Texto normal |
| --- | --- | --- |
| `gold` `#DABC80` | 1.83:1 | **Falla** |
| `gold-ink` `#8A6A28` | 5.03:1 | AA |

Cuerpo de texto en páginas oscuras: `ivory` o `white`, no `gold`. Reservar el oro para display, nav y acentos.

---

## 5. Tipografía

El lettering del sello es una **serif de inscripción romana** (tipo Trajan): versales, serifs finos, eje vertical, aire entre letras.

### Stack recomendado (Google Fonts)

| Rol | Fuente | Peso | Notas |
| --- | --- | --- | --- |
| Display / marca | **Cinzel** | 400–700 | La más cercana al sello. Usar en `PRESTIGE`, h1, h2 |
| Display opcional | Cinzel Decorative | 400–700 | Solo piezas hero, no UI |
| Cuerpo y UI | **Outfit** | 300–600 | Sans contemporánea. Encaja con el interior real del local (líneas limpias, no vintage) |
| Campaña / banner | **Oswald** | 400–600 | Solo la línea de lona. No nav, no párrafos, no botones |

### Escala de partida

| Token | Fuente | Tamaño | Tracking | Transform |
| --- | --- | --- | --- | --- |
| `display` | Cinzel | 40–72 px | 0.12–0.22 em | uppercase |
| `h1` | Cinzel | 32–48 px | 0.08 em | uppercase |
| `h2` | Cinzel | 24–32 px | 0.06 em | uppercase |
| `kicker` | Outfit | 12–14 px | 0.18 em | uppercase |
| `body` | Outfit | 16–18 px | 0 | none |
| `small` | Outfit | 13–14 px | 0.02 em | none |
| `button` | Cinzel o Outfit | 14–16 px | 0.1 em | uppercase |

Cinzel en párrafos largos no. Outfit para lectura, formularios y nav auxiliar.

**Oswald** replica la lona física «RESERVA TU CITA EN PRESTIGE»: una línea de campaña por página como máximo (cierre del hero o bloque CTA). El botón en sí sigue siendo Cinzel o Outfit uppercase (`button`). No mezclar Oswald y Cinzel Decorative en la misma vista.

---

## 6. Forma, ritmo y UI

- **Geometría:** el círculo del sello es el motivo. Avatares, botones icono, aros de hover y marcos de imagen pueden citar el doble filete, sin copiar el logo entero como decoración de fondo a baja opacidad (queda sucio).
- **Radio:** 0 en bloques hero y botones de marca (corte seco, sello). 2–4 px como máximo en inputs.
- **Líneas:** finas. El logo usa filete delgado; bordes gordos rompen el clima.
- **Espaciado:** holgado. Lujo = aire. Secciones con padding vertical generoso (80–120 px desktop, 56–80 px móvil).
- **Contenedor:** max-width 1120 px, gutters 24 px móvil / 40 px desktop. Breakpoints: 640 / 768 / 1024 / 1280.
- **Fotografía:** el local real es diurno y claro; el sitio es negro. Tratar las fotos según §13. No pegar un JPG de Instagram a sangre sobre `black`.
- **Header / nav móvil:** lockup a la izquierda, CTA `Reservar` a la derecha. El menú de anclas va en un panel `surface-2` a pantalla (no hamburger genérico gris).
- **Motion de UI:** lento y corto. Fade/opacity 200–300 ms. Evitar bounces. El scroll cinematográfico va en §7; el ritmo de página en §8. No mezclar los dos.

---

## 7. Motion y scroll cinematográfico

La web debe tener **al menos una escena anclada al scroll**, del tipo product page de Apple (el portátil que se cierra al bajar). Eso no es un `animate-*` de Tailwind ni un fade al entrar en viewport.

Apple no anima un CSS 3D: usa un **vídeo o una secuencia de fotogramas** y el scroll elige el frame. La sección se queda fija (`pin`); al bajar avanza; al subir revierte.

Prestige Barber **no** copia un MacBook. Copia la mecánica y la traduce a marca: el diseño a máquina se revela al hacer scroll y deja el wordmark **Prestige Barber Studio · Logroño**.

### Asset de escena (ya existe)

Clip vertical del salón: nuca del cliente, capa negra, diseño *freestyle* a máquina que se completa mientras la cámara gira al perfil. Interior real (lavacabezas, puertas blancas, sello al fondo). Origen IG: `🪬 Arte libre sobre piel — freestyle puro`.

**No servir el archivo de la raíz** (emoji + unicode; rompe Vite, git y URLs). Copias de producción:

| Archivo | Uso |
| --- | --- |
| `assets/video/salon-arte-libre.mp4` | Master (~1.9 MB, 720×1280, 10.56 s, 30 fps, H.264). No usar en el hero: GOP de 5 s, el seek salta. |
| `assets/video/salon-arte-libre-scrub.mp4` | **Hero.** Mudo, `faststart`, keyframe cada 2 frames (~11.6 MB). Scrub 1:1 con el scroll. |
| `assets/video/salon-arte-libre-poster.jpg` | Still final (perfil + diseño completo). `poster` del `<video>` y fallback de `prefers-reduced-motion`. |

| Dato | Valor |
| --- | --- |
| Formato | 9:16 (Stories / Reels) |
| Frames | 314 |
| Audio en web | **Siempre mute.** El scrub no lleva banda sonora. |
| Overlay quemado | Texto IG «MISSION PASSED! RESPECT +». No es marca. No replicarlo en HTML. Titular web: Cinzel + `gold` encima o en el cierre de la escena. |

En desktop: `object-fit: cover` (recortar laterales) o el 9:16 dentro de un marco circular que cite el sello. No letterbox gris.

### Stack (obligatorio para esta escena)

| Capa | Herramienta | Rol |
| --- | --- | --- |
| Layout, color, tipo | Tailwind + tokens de este archivo | No anima el scroll |
| Escena cinematográfica | **GSAP + ScrollTrigger** | `pin` + `scrub` |
| Scroll suave | **Lenis** | Sensación Apple; un solo `requestAnimationFrame` con GSAP |
| App | Vite | Maqueta |

Framer Motion, AOS, WOW y utilidades Tailwind no sirven para este efecto. Lenis y ScrollTrigger tienen que compartir **el mismo** ticker. Dos bucles = tirones.

### Técnicas (de más “Apple” a más práctica)

| # | Técnica | Cuándo |
| --- | --- | --- |
| 1 | Secuencia de frames en `<canvas>` | Fotogramas 3D o recorte de vídeo (60–150 WebP). El resultado más premium. Sin esos assets no se clona Apple. |
| 2 | Vídeo scrub (`currentTime` ← scroll) | **Por defecto.** El clip del salón ya está. Usar `salon-arte-libre-scrub.mp4`, no el master. |
| 3 | Transforms GSAP (`rotateX`, `clip-path`, escala) | Reserva si el vídeo no carga o en `prefers-reduced-motion` (el poster hace de “tapa”). |

Primera maqueta: **técnica 2**. Al hacer scroll, el diseño a máquina se “dibuja”; al subir, se deshace.

### Patrón de la escena

Una sola escena hero (`#hero` en §11; no varias competiendo). Distancia de scroll ~200 % de viewport en desktop. `scrub: 0.5`, `ease: "none"` (1:1 con la rueda/el dedo). Esperar `loadeddata` antes de crear el tween (`duration` tiene que ser real).

```js
const video = document.querySelector(".cinematic video");
video.muted = true;
video.pause();
video.preload = "auto";

const playhead = { t: 0 };

video.addEventListener("loadeddata", () => {
  gsap.to(playhead, {
    t: video.duration,
    ease: "none",
    scrollTrigger: {
      trigger: ".cinematic",
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 0.5,
    },
    onUpdate: () => {
      if (Math.abs(video.currentTime - playhead.t) > 0.01) {
        video.currentTime = playhead.t;
      }
    },
  });
});
```

El copy de cierre (cuando el diseño está completo) usa Cinzel + `gold` sobre `black`. Ritmo §8: `Logroño. A máquina. Sin prisa.` y debajo el wordmark. No usar el sticker de GTA del Reel.

### Traducción a marca (sí / no)

| Sí | No |
| --- | --- |
| Clip real del salón (`salon-arte-libre-scrub`) | MacBook, iPhone o mockup de producto tech |
| El diseño a máquina revelado por el scroll | Autoplay con audio de Instagram |
| Oro y negro de esta paleta en titulación sobre la escena | Recolorear el vídeo o añadir glow genérico |
| Un momento cinematográfico + el resto de la página más quieta | Toda la home en pin/scrub (cansa y en móvil se rompe) |

### Viewport y accesibilidad

- **Móvil:** el 9:16 puede ir a sangre (`object-fit: cover`). `end` más corto (~120 %) o still del poster. El pin largo en táctil se siente atrapado.
- **`prefers-reduced-motion: reduce`:** sin pin ni scrub. `salon-arte-libre-poster.jpg` + tipografía. La escena no es requisito para entender la marca.
- Microinteracciones (hover de botón, underline) siguen en 200–300 ms, §6. No aplicar `scrub` a la UI.

### Qué no usar

- Solo Tailwind (`animate-bounce`, `animate-pulse`) para la escena hero.
- Three.js de un portátil de stock: peso y fuera de marca.
- Varios catálogos de componentes para “resolver” el motion. Aquí el problema es GSAP + assets, no botones.

---

## 8. Ritmo Apple (sí / no)

El cliente quiere la **sensación** de las product pages de Apple. Eso no es clonar `apple.com`. San Francisco, el azul `#0071E3`, las tiles squircles y un MacBook 3D harían de Prestige un reseller. Se copia el ritmo; la piel es el sello.

Frase para la demo: *la sensación de una página de producto de Apple, con tu salón y tu sello*.

### Qué se rasca

Apple no es «mucha animación». Es **una idea por pantalla**, mucho aire y el media mandando.

| De Apple | En Prestige |
| --- | --- |
| Vídeo o frames al scroll | Ya: `#hero` + `salon-arte-libre-scrub` (§7) |
| «Buy» siempre a mano | «Reservar cita» en el header, mismo destino (§11) |
| Producto a sangre | El corte a máquina, no un gadget |
| Copy mínimo, tipo grande | Cinzel + `gold`. Pocas palabras. Outfit para datos |
| Nav baja, borrosa, tipo pequeño | Lockup §1 + `surface-2` ~90 % + `backdrop-filter`. Chrome delgado; el sello no es un logo de 96 px |
| Un media a sangre, luego silencio | Reel oscuro a sangre; fotos claras del local **veladas o enmarcadas** (§13) |
| Capítulos, no plantilla | Cada ancla de §11 es un acto con **un** titular Cinzel, no un WordPress de 8 cards |
| Grid editorial | Galería: 1 foto grande + 2 chicas, hueco generoso. No 12 thumbnails de Instagram |
| Resto de la page quieta | Tras el hero, solo fades 200–300 ms |

Titulares al estilo Apple (corto, sobre o bajo el media), no un párrafo de barbería genérica. Cierre de hero de partida: `Logroño. A máquina. Sin prisa.` Luego el wordmark `Prestige Barber Studio`.

### Segundo truco (después de la primera maqueta)

Apple a menudo deja un titular **fijo** y cambia la foto al bajar (páginas de cámara). En Prestige serviría para `#servicios` o `#galeria`. **No** es un segundo vídeo scrub. El `pin` largo solo vive en `#hero`. Si el cliente pide «más como Apple» tras ver la demo, este es el siguiente paso.

### Qué no se rasca

| No | Por qué |
| --- | --- |
| SF Pro / San Francisco | El sello es Cinzel; el local, Outfit |
| CTA azul Apple, pills, radius 16–24 | Paleta §2; radio 0 (§6) |
| Varios `pin` seguidos | En móvil se siente una trampa |
| Three.js / mockup de portátil o iPhone | Fuera de marca y pesado |
| Carrusel de reseñas con estrellas, iconos de tijera | Ruido de plantilla. La prueba social es un enlace a Google (§12), no un widget |
| «Nuestro equipo» + 4 fotos stock | Si hay equipo, una línea: Jey |

### Capítulos (cómo se siente al bajar)

Tras el hero, cada sección ocupa **aire de product page** (min-height generoso en desktop, no necesariamente 100vh en todas). Un kicker Outfit, un h2 Cinzel, un bloque de media o de datos. Sin segundo CTA dorado compitiendo.

```text
#hero        media manda (scrub)
#estudio     titular + una foto tratada
#servicios   titular + lista/cards quietas
#galeria     grid 1+2, no feed
#ubicacion   datos + mapa en surface-2
```

---

## 9. Tokens CSS

Copiar a `:root` al empezar la maqueta.

```css
:root {
  --black: #000000;
  --gold: #dabc80;
  --gold-bright: #ddc490;
  --gold-deep: #cdb47c;
  --gold-shadow: #cca85c;
  --gold-ink: #8a6a28;

  --surface: #0c0a08;
  --surface-2: #1a1610;
  --line: #2a2418;
  --ivory: #f5f0e6;
  --cream: #e8d8c4;
  --white: #ffffff;

  --font-display: "Cinzel", "Times New Roman", serif;
  --font-body: "Outfit", system-ui, sans-serif;
  --font-campaign: "Oswald", system-ui, sans-serif;

  --text-on-dark: var(--ivory);
  --text-display: var(--gold);
  --bg: var(--black);
  --bg-elevated: var(--surface);

  --container: 1120px;
  --gutter: 24px;
  --header-seal: 48px;
}
```

---

## 10. Método de extracción

- Imagen: `logo.jpg`, RGB, 1060×1060.
- Campo: esquinas y relleno interior `#000000` (~70 % de píxeles).
- Oro canónico: moda del lettering y anillos `rgb(218, 188, 128)` → `#DABC80`.
- Brillo: media de píxeles de oro con luminancia ≥ 195 → `#DDC490` (poste).
- Sombra del poste: `rgb(204, 168, 92)` → `#CCA85C`.
- Matiz estable en todo el oro del sello: **~40°** (amarillo-oro, no mostaza ni cobre).

Cualquier nuevo token debe mantener ese matiz (~38°–42°) y saturación media-alta. Si no encaja en esa franja, no es de esta marca.

---

## 11. Mapa de la maqueta (home)

Una sola ruta `/`. Sin blog, sin área de cliente, sin páginas legales en esta entrega (el footer puede llevar enlaces `#` desactivados).

El cliente ve **una landing** que se reconoce: el sello, el local, cómo reservar, dónde está. Las anclas del header son las secciones, no rutas nuevas.

### CTA único

Un solo botón primario en toda la maqueta: **Reservar cita**.

| Dónde | Comportamiento |
| --- | --- |
| Header (siempre visible) | Botón `gold` / texto `black`. Mismo destino. |
| Cierre del hero | Línea Oswald «Reserva tu cita en Prestige» + el mismo botón. |
| Final de servicios | Botón secundario opcional (borde oro) que va al **mismo** destino. No un segundo producto. |
| Footer | Enlace texto `gold`. |

**Destino de producto:** ruta propia `/reservar`, pantalla a medida con componente de calendario. No la ficha Yeasy, no iframe, no `target="_blank"` a un tercero.

**En esta maqueta no se construye.** El botón se ve (mismo look en header, hero, servicios y footer) y **no navega**: `href="#"` o `<button type="button">`. Ni calendario, ni formulario de reserva, ni Yeasy «mientras tanto».

Secundario: `tel:+34677716882` («Llamar»). Redes en footer, no como segundo CTA: [@prestigebarber.s](https://www.instagram.com/prestigebarber.s/) y [facebook.com/jeybarbiere](https://www.facebook.com/jeybarbiere/). WhatsApp solo si el cliente confirma el número. Prueba social: enlace `5,0 en Google` a las reseñas de Maps (§12), no un CTA.

No competir con un «Ver más» dorado. El oro es reservar.

### Nav

| Ancla | Label | Destino |
| --- | --- | --- |
| `#hero` | Inicio | Lockup; no hace falta en el menú desktop |
| `#estudio` | El estudio | Propuesta + Jey |
| `#servicios` | Servicios | Carta |
| `#galeria` | Galería | Fotos del local / cortes |
| `#ubicacion` | Dónde | Dirección, horario, mapa |

Móvil: lockup + Reservar. Las anclas en panel a pantalla `surface-2`. Desktop: anclas en Outfit 14 px `ivory`, activo `gold`.

### Orden de secciones

```text
Header sticky (lockup + anclas + Reservar)
1. #hero        Escena cinematográfica (vídeo scrub, §7; ritmo §8)
2. #estudio     Cierre de escena + propuesta · Logroño
3. #servicios   Carta (nombres, sin precios hasta confirmar)
4. #galeria     Fotos tratadas (§13)
5. #ubicacion   Dirección, horario, mapa, llamar, 5,0 en Google
6. CTA cierre   Oswald + Reservar (si el hero ya lo dijo, aquí más quieto)
Footer          Datos, @prestigebarber.s, Facebook, © Prestige Barber Studio
```

El pin/scrub **solo** vive en `#hero`. El resto de la página es quieto (fades 200–300 ms).

### Qué no entra en esta maqueta

Otras rutas (incluida `/reservar`), calendario de reserva, modo claro de toda la web, tienda, blog, cookies reales, SEO técnico, precios en euros, enlace a Yeasy.

---

## 12. Contenido y datos del negocio

Fuentes públicas (Google Business vía [bellecenter.es/prestige-barber-studio](https://bellecenter.es/prestige-barber-studio/), Diario La Rioja 5 jun 2025, reseñas). **Confirmar con el cliente antes de dar la maqueta por cerrada.** Entre corchetes: no usar en UI como si fuera dato real.

### Identidad

| Campo | Valor | Estado |
| --- | --- | --- |
| Nombre | Prestige Barber Studio | Confirmado (sello) |
| Ciudad | Logroño | Confirmado |
| Wordmark de cierre hero | `Prestige Barber Studio · Logroño` | Cinzel + `gold` |
| Tono de copy | Español, **tú**. Cercano, sin jerga de plantilla («tu mejor versión»). | Brief |
| Barbero | Jey | Reseñas Google. Confirmar si se nombra en web |
| Valoración Google | 5,0 · 117 reseñas (todas 5★) | Ficha Maps, 10 sep 2026. El recuento cambia; no inventar |

### Contacto y reserva

| Campo | Valor | Estado |
| --- | --- | --- |
| Dirección | Santa Justa, 1 · 26005 Logroño | Confirmado (cliente). No añadir «C.» ni «bajo» en UI. |
| Teléfono | 677 71 68 82 | Confirmado (cliente). `href`: `tel:+34677716882`. En UI: `677 71 68 82` |
| Reserva (CTA web) | `/reservar` · calendario propio | Producto. Fuera de esta maqueta. No Yeasy. |
| Reserva operativa (hoy) | [cut.yeasyapp.com/PRESTIGEBARBER.S](https://cut.yeasyapp.com/PRESTIGEBARBER.S) | URL de la ficha Maps. Dato de negocio; **no** es el href del botón. |
| WhatsApp | `[WHATSAPP]` | No confirmado. El 677 es candidato a `wa.me/34677716882`; no enlazar hasta el visto bueno |
| Instagram | [@prestigebarber.s](https://www.instagram.com/prestigebarber.s/) | Confirmado |
| Facebook | [facebook.com/jeybarbiere](https://www.facebook.com/jeybarbiere/) | Confirmado (página de Jey). Sin query `ref=` de IG en el href |
| Email | `[EMAIL]` | No hay fuente pública |
| Mapa | [Ficha Maps](https://maps.google.com/?cid=3159252893748868192) | CID `0x2bd7ebc4b786b460`. Coords 42.462908, −2.4571974 |
| Reseñas Google | [Reseñas en Maps](https://www.google.com/maps/place/Prestige+Barber+Studio/@42.462908,-2.4571974,17z/data=!4m8!3m7!1s0xd5aab9047789883:0x2bd7ebc4b786b460!8m2!3d42.462908!4d-2.4571974!9m1!1b1) | Confirmado. Abre la pestaña Reseñas. `target="_blank"` `rel="noopener"` |

Copy de dirección en una línea: `Santa Justa, 1 · 26005 Logroño`.

### Reseñas como garantía (Google)

Sí: un enlace a la ficha real. No: widget, carrusel ni reseñas copiadas (ToS de Google, se quedan viejas, parece plantilla).

| Campo | Valor |
| --- | --- |
| Nota en UI | `5,0 en Google` |
| Apoyo opcional | `Ver reseñas` (Outfit 13–14 px) |
| Destino | [Pestaña Reseñas](https://www.google.com/maps/place/Prestige+Barber+Studio/@42.462908,-2.4571974,17z/data=!4m8!3m7!1s0xd5aab9047789883:0x2bd7ebc4b786b460!8m2!3d42.462908!4d-2.4571974!9m1!1b1) |
| Ficha / embed | [maps.google.com/?cid=3159252893748868192](https://maps.google.com/?cid=3159252893748868192) |

**Dónde:** bajo el copy de `#estudio` (confianza antes de la carta) y de nuevo en `#ubicacion`, junto a dirección y teléfono. Footer: la misma línea, más quieta. No un bloque propio en la nav.

**Cómo se ve:** Outfit, `gold`, sin «G» oficial ni estrellas multicolor. Cinco puntos o filetes `gold` de 4–6 px, o ningún glifo. No badge «Garantía de calidad». El click es la prueba.

**Recuento:** 117 el 10 sep 2026. Preferir `5,0 en Google` sin número, o el recuento en `ivory` al 60 % sabiendo que hay que actualizarlo. No redondear a «+100» ni dejar «38».

**Prohibido:** Elfsight / Trustindex / iframes de reseñas, scrapear textos a la web, citar una reseña suelta como testimonio (la maqueta no elige favoritos), botón oro «Déjanos una reseña» compitiendo con Reservar.

### Horario

Confirmado (cliente). En UI, lunes primero. Dos tramos en la misma línea, separados por `·` o coma.

| Día | Horario |
| --- | --- |
| Lunes | 16:00–20:00 |
| Martes | 9:30–13:30, 16:00–20:00 |
| Miércoles | 9:30–13:30, 16:00–20:00 |
| Jueves | 9:30–13:30, 16:00–20:00 |
| Viernes | 9:30–13:30, 16:00–20:00 |
| Sábado | 11:00–14:00 |
| Domingo | Cerrado |

Agrupar en copy solo si no se pierde el sábado (abre más tarde): p. ej. «Mar–vie 9:30–13:30 y 16:00–20:00». No escribir «10:00–14:00» el sábado. Domingo en `ivory` al 60 %, no tachado ni en rojo.

### Servicios (maqueta)

Reseñas citan carta en la app: corte, corte + cejas, corte + barba, corte premium, domicilio. El Reel cubre diseño a máquina / freestyle.

**No publicar precios.** No copiar tarifas de otra ficha Yeasy. En cada card: nombre + una línea Outfit + CTA «Reservar» al mismo destino (§11), inerte en esta maqueta.

| Servicio | Línea de apoyo | En maqueta |
| --- | --- | --- |
| Corte | El servicio de base. | Sí |
| Corte + cejas | Lo que piden en la app. | Sí |
| Corte + barba | Combo habitual. | Sí |
| Corte premium | Nombrado en reseñas. Sin detallar ritual hasta confirmar. | Sí |
| Barba / cejas | Servicios sueltos. | Sí, si caben sin saturar |
| Diseño a máquina | Freestyle del hero. | Sí, ancla narrativa al vídeo |
| A domicilio | Reservable en la app según reseñas. | Nota breve, no hero |

Cards: fondo `surface-2`, filete `line`, título Cinzel `gold`, cuerpo `ivory`. Radio 0.

### Copy de partida (placeholder de marca, no lorem)

Usar esto hasta que el cliente entregue textos. Está escrito para no sonar a otra barbería.

| Sitio | Copy |
| --- | --- |
| Kicker / cierre de escena | `Logroño. A máquina. Sin prisa.` (Cinzel, `gold`, §8) |
| Wordmark bajo el cierre | Prestige Barber Studio |
| Línea Oswald | Reserva tu cita en Prestige |
| `#estudio` | Estudio de barbería en Santa Justa. Corte, barba y diseño a máquina, sin prisa. |
| Prueba social | `5,0 en Google` → [reseñas](https://www.google.com/maps/place/Prestige+Barber+Studio/@42.462908,-2.4571974,17z/data=!4m8!3m7!1s0xd5aab9047789883:0x2bd7ebc4b786b460!8m2!3d42.462908!4d-2.4571974!9m1!1b1) |
| Equipo | Jey. (Si el cliente no quiere nombre, quitar la línea.) |
| `#ubicacion` | Santa Justa, 1 · 26005 Logroño |
| Teléfono | [677 71 68 82](tel:+34677716882) · Outfit, `ivory` o `gold`. Label «Llamar» |
| Instagram (footer / ubicación) | [@prestigebarber.s](https://www.instagram.com/prestigebarber.s/) · Outfit, `gold`, sin glifo oficial |
| Facebook (footer / ubicación) | [Facebook](https://www.facebook.com/jeybarbiere/) o `jeybarbiere` · Outfit, `gold`, mismo tratamiento. `target="_blank"` `rel="noopener"` |
| Footer | © Prestige Barber Studio · Logroño |

### Assets que la maqueta debe encontrar

Si falta alguno, no sustituir por stock genérico.

| Ruta | Uso |
| --- | --- |
| `assets/brand/logo-*.webp` + `.png` | Lockup y favicon |
| `logo.png` | Solo hero desktop fallback |
| `assets/video/salon-arte-libre-scrub.mp4` | Hero |
| `assets/video/salon-arte-libre-poster.jpg` | Poster / reduced motion |
| Foto WELCOME / interior (raíz) | Galería, **después** de copiar a `assets/photo/` con nombre ASCII |

---

## 13. Tratamiento fotográfico

El sello es negro + oro. El local real es **diurno**: cristal, suelo gris, capa blanca, luz de calle, pie dorado del sillón, sello vinilado en el ventanal. Si una foto clara va a sangre sobre `black`, la web se parte en dos marcas.

El Reel de §7 (capa negra, interior al fondo) ya encaja en oscuro. Las fotos tipo «Welcome to Prestige» no.

### Qué recortar

Priorizar: sello en el cristal, pie dorado del sillón, barbero trabajando, herramientas, producto en primer plano. Recortar suelo vacío, techo de pladur y ventanal de cielo/fachada si empujan la foto a postal gris.

`cream` (#E8D8C4) sale de esos destellos claros del sillón y el producto, no de un cuero de campaña inventado.

### Seis reglas

1. **Nunca** una foto de interior claro a sangre sobre `black` o `surface` sin recorte, velo o marco.
2. **Velo:** degradado `black` 0 % → 55–75 % en el tercio donde va tipo. El sello HTML (si se superpone) solo sobre la zona ya oscura.
3. **Marco que cita el sello:** recorte circular o rectangular de radio 0 con doble filete `gold-deep` 1 px, padding ~8–12 px de `black`. El círculo para 1–3 fotos heroicas (equipo, sillón). La galería en retícula, radio 0.
4. **Banda ivory puntual:** si hace falta mostrar el local «como es» (luz, blanco, calle), un bloque `ivory` de sección con foto sin velo y texto `black` / `gold-ink`. Una vez en la página, no más. El resto sigue negro.
5. **Tratamiento:** un punto hacia frío/neutro. No LUT naranja, no glow, no recortar el oro del sello en la foto. El calor lo pone la paleta UI, no un filtro sepia.
6. **Sello sobre foto:** disco negro intacto. Prohibido sobre cielo, acera clara o capa blanca. El vinilo del ventanal es foto; no es el logo de la nav.

### Por sección

| Sección | Tratamiento |
| --- | --- |
| `#hero` | Vídeo 9:16, `object-fit: cover`, mute. Overlay de tipo Cinzel/`gold` al cierre. No letterbox gris. |
| `#estudio` | Una foto interior con velo o marco circular. No un collage. |
| `#servicios` | Sin foto de fondo. Icono no: o nada o un recorte circular pequeño del oficio. |
| `#galeria` | 4–6 fotos. Radio 0, gap generoso, filete `line`. Hover: filete `gold-deep`, sin zoom bounce. |
| `#ubicacion` | Mapa en `surface-2` (no iframe blanco a sangre) o foto de fachada/cristal con velo. |

### Prohibido

Stock de barbería americana, poste rojo/azul, fotos sobreexpuestas a todo el ancho, el sticker «MISSION PASSED!» del Reel, recrear el sello a baja opacidad como watermark.
