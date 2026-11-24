# Plan de refinamiento — Aeperion Systems (post-release 0.2.0-alpha)

Estado: `main` desplegado en `https://aeperion.presentto.online`.
Objetivo: corregir los defectos reales verificados y reconstruir el hero scrollytelling con criterio, sin reescrituras innecesarias.

---

## 0. Diagnóstico (evidencia verificada, no suposiciones)

| # | Defecto | Evidencia |
|---|---------|-----------|
| D1 | **Toda la tipografía está rota, no solo el hero.** `src/index.css:112-113` usa `var(--font-montserrat)`, pero `@fontsource-variable/montserrat@5.3.0` solo registra `@font-face { font-family: 'Montserrat Variable' }`; nunca define esa variable CSS. | En navegador: `getComputedStyle(document.body).fontFamily` → `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...`; `document.fonts.check('16px "Montserrat Variable"')` → `false`. En el bundle: `--font-sans:var(--font-montserrat),...` y **ninguna** definición de `--font-montserrat`. |
| D2 | **Capas invisibles del hero capturan clics.** Las 3 capas son `absolute inset-0` con `opacity` animado pero `pointer-events: auto`. | `document.elementFromPoint(innerWidth/2, innerHeight/2)` en fase logo devuelve el `<h2>AI</h2>` con `opacity: 0`. Los CTAs reales quedan tapados por elementos invisibles. |
| D3 | **No hay morph real.** Es un crossfade de 3 bloques con `scale`/`y` distintos; se lee como "tres pantallas", no como logo → AE → AI. | `agentic-hero.tsx:20-37`: rangos de opacity solapados (0.22–0.32, 0.26–0.36, 0.6–0.72) con transformaciones independientes. |
| D4 | **El hero rompe el sistema de temas.** Fuerza `bg-[#05070A]` + `text-white`, mientras los botones `variant="glass"` consumen `--glass-bg` (blanco en tema claro). | `agentic-hero.tsx:74`, `src/index.css:28,50`. Resultado: botones claros sobre fondo negro en light mode. |
| D5 | **El video no es un dron.** `public/videos/hero-drone.mp4` es un placeholder generado con `ffmpeg` (ruido + gradient, 14.4 s). Además se reproduce desde el inicio aunque su capa esté en `opacity: 0`. | `ffprobe`: 14.4 s, 467 KB; `video.paused === false`, `readyState === 4` en fase logo. |
| D6 | **Scroll largo y `scroll-behavior: smooth` global** compiten con el scroll-driven; en viewport corto la sección de 320vh se siente pesada. | `agentic-hero.tsx:74` (`h-[320vh]`), `src/index.css:153`. |
| D7 | **Deuda menor:** `ease` sin usar (`agentic-hero.tsx:9`); ~9 `<h2>` y textos duplicados entre fallback y capas; componentes huérfanos (`cinematic-hero`, `pricing-section`, cluster `demo-*`); README/AGENTS dicen "Vite 8" pero `package.json` tiene `^6.0.0` (build real 6.4.6); `.gitignore` con `# videos` suelto. | Verificado por grep local y lectura de archivos. |

Fuera de alcance de este plan (decisión comercial, issue #2): métricas, testimonios, casos, equipo y URL de AELOCK.

---

## 1. Principios rectores

1. **Un solo sistema visual.** Ningún componente define font-family, color de marca ni glass propio; todo sale de `src/index.css`.
2. **El scroll gobierna, el DOM no miente.** Elemento invisible = `pointer-events: none` + `aria-hidden` + `inert`. El estado interactivo debe derivar del progreso de scroll.
3. **Morph, no apilado.** Una sola "etapa" de glifo en el mismo bounding box; la transformación se vende con blur + escala compartidos, no con tres layouts distintos.
4. **Video es contexto, no ruido.** Se monta y reproduce solo en la fase final; siempre hay fallback visual.
5. **Cero regresiones silenciosas.** Cada fase termina con comprobación en navegador real, no solo `tsc`.

---

## 2. Fase 0 — Contrato de no regresión (30 min)

- [ ] Crear `scripts/qa-site.mjs` (Playwright ya disponible en el entorno) que verifique:
  - `getComputedStyle(document.body).fontFamily` contiene `Montserrat`.
  - `document.fonts.check('16px "Montserrat Variable"') === true`.
  - `elementFromPoint` en el centro del hero **no** devuelve un nodo de una capa inactiva.
  - Las 13 rutas responden y no hay errores en consola.
- [ ] Ejecutar antes de tocar nada: debe fallar en D1 y D2 (prueba de que el test detecta el bug).

---

## 3. Fase 1 — Tipografía (P0, bloqueante)

Archivos: `src/index.css`, `src/main.tsx`.

- [ ] Definir la variable que falta, una sola vez, antes de `@theme inline`:
  ```css
  :root { --font-montserrat: "Montserrat Variable"; }
  ```
- [ ] Hacer los tokens a prueba de fallos:
  ```css
  --font-sans: var(--font-montserrat, "Montserrat Variable"), system-ui, sans-serif;
  --font-mono: var(--font-montserrat, "Montserrat Variable"), system-ui, sans-serif;
  ```
  Con fallback dentro de `var()`, una variable ausente nunca más invalida toda la propiedad.
- [ ] Añadir `font-variant-numeric: tabular-nums` al ámbito de las etiquetas numéricas para que `font-mono` (ahora Montserrat) conserve alineación de dígitos.
- [ ] Importar solo el subconjunto latino para recortar peso:
  ```ts
  import "@fontsource-variable/montserrat/wght.css"; // o latin.css según el paquete
  ```
  Verificar cuál entry expone `5.3.0` antes de fijarlo.
- [ ] Aceptación: QA de Fase 0 pasa; screenshot del hero y de `/cotizacion` muestran Montserrat en títulos, cuerpo y etiquetas.

---

## 4. Fase 2 — Hero scrollytelling, reescrito bien (P0)

Archivo: `src/components/features/hero/agentic-hero.tsx` (reescritura completa, mantener API exportada).

### Estructura
```
<section className="hero-scope relative h-[240vh] md:h-[300vh]">
  <div className="sticky top-0 h-[100svh] overflow-hidden">
    <HeroBackdrop />        // grid + mesh + gradiente, siempre presente
    <VideoLayer />          // se monta solo cuando progress > 0.62
    <GlyphStage />          // UNA caja, 3 estados: LOGO / AE / AI
    <CtaLayer stage={...} />// 2 botones en LOGO, 3 en AI
    <ScrollHint />
  </div>
</section>
```

### Comportamiento
- [ ] `useScroll({ target, offset: ["start start", "end end"] })` como única fuente de verdad.
- [ ] Un `useTransform` deriva `stage: 0 | 1 | 2` con rangos **sin solape**:
  - `0` → `[0, 0.30)`, `1` → `[0.33, 0.60)`, `2` → `[0.63, 1]`.
  - Zonas de transición (0.30–0.33, 0.60–0.63) son solo de blur/escala, sin texto solidado.
- [ ] Morph percibido: la etapa activa entra con `filter: blur(10px) → 0`, `scale: 0.94 → 1` y `opacity: 0 → 1`; la saliente con `blur(0 → 8px)`, `scale: 1 → 1.04`, `opacity: 1 → 0`. Misma posición y mismo `line-height` para los 3 estados (evita salto de layout).
- [ ] `AE` y `AI` usan Montserrat 900 con `tabular-nums`; "AE" y "AI" comparten exactamente el mismo ancho de caja para que el cambio no desplace nada. El logo se muestra a la misma altura central.
- [ ] **Accesibilidad e interacción:** capas inactivas → `pointer-events-none`, `aria-hidden="true"` y atributo `inert`. Un único `<h1 className="sr-only">` con el nombre completo de la empresa; las letras gigantes son decorativas.
- [ ] CTAs: fase LOGO = 2 botones (cotización, KSPR). Fase AI = 3 botones (asesoría, KSPR, presentación de startup). Los botones se montan solo en la fase activa → imposible clic invisible.
- [ ] `prefers-reduced-motion`: versión estática de 100vh con logo + 2 CTAs + video como poster (sin autoplay ni scroll).
- [ ] Eliminar `const ease` sin usar.
- [ ] `100svh` en vez de `h-screen` para móvil (evita salto con la barra de URL).

### Tema
- [ ] Añadir `.hero-scope` en `src/index.css` que sobrescriba **solo dentro del hero**:
  ```css
  .hero-scope {
    --surface: #05070A;
    --fg: #F4F5F6;
    --fg-muted: rgba(244,245,246,.62);
    --glass-bg: rgba(18,19,23,.62);
    --glass-strong: rgba(18,19,23,.82);
    --glass-border: rgba(255,255,255,.10);
  }
  ```
  Así los botones `glass` se ven igual bien en light y dark, sin duplicar estilos en el componente.
- [ ] Quitar `scroll-behavior: smooth` global (`index.css:153`); si se necesita para anclas, aplicarlo solo al contenedor que corresponda.

---

## 5. Fase 3 — Video de dron real (P1)

- [ ] Obtener un clip **stock real**, no generado. Fuentes ya probadas sin éxito: Mixkit/Pixabay CDN → `403`, Coverr `cdn.coverr.co` → `301` a su home. Ruta recomendada: **Wikimedia Commons** (URLs directas `upload.wikimedia.org`, licencia CC verificable) o asset alojado por Andrei.
- [ ] Transcodificar con `ffmpeg` a `1280x720`, H.264, `crf 26`, `≤12 s`, `-movflags +faststart`, sin audio; objetivo `< 2 MB`.
- [ ] Reemplazar `public/videos/hero-drone.mp4`; **no** versionar el placeholder nuevo si se descarta.
- [ ] En `VideoLayer`:
  - `preload="none"`, sin `autoPlay` hasta que `stage === 2`.
  - Montar el `<video>` condicionalmente en `stage === 2`; `poster` = primer frame real extraído con `ffmpeg`.
  - `onError` → ocultar video; el backdrop con gradiente queda como fallback (ya existe).
  - Respetar `prefers-reduced-motion` (no reproducir).
- [ ] Añadir `public/videos/README.md` con fuente, licencia y comando de regeneración.

---

## 6. Fase 4 — Consistencia y limpieza (P1/P2)

- [ ] Corregir `README.md` y `AGENTS.md`: Vite **6.4.6**, no 8. Añadir nota de `.npmrc`/`legacy-peer-deps` y del video.
- [ ] Auditar imports y eliminar componentes huérfanos confirmados: `cinematic-hero.tsx`, `pricing-section.tsx`. Revisar el cluster `demo-*` y `command-center-3d` antes de borrar (algunos se referencian entre sí).
- [ ] Normalizar `.gitignore`: quitar el `# videos` suelto, añadir `/dist` (ya está) y `*.tsbuildinfo` (ya está).
- [ ] Revisar `vercel.json`: el rewrite catch-all puede enmascarar 404 de assets; acotarlo a rutas sin extensión.
- [ ] Resolver los 5 warnings de ESLint (`react-refresh/only-export-components`) separando constantes/hooks de componentes, o documentarlos como aceptados. **0 errores es obligatorio; 0 warnings es el objetivo.**

---

## 7. Fase 5 — Verificación y entrega

- [ ] `npx tsc -b` → sin errores.
- [ ] `npm run build` → sin errores (el build tarda ~3 min; ejecutar en background).
- [ ] `npm run lint` → 0 errores.
- [ ] `node scripts/qa-site.mjs` sobre preview local → verde.
- [ ] Revisión visual en 375 / 768 / 1440 px del hero en 4 posiciones de scroll (0%, 33%, 66%, 100%) + `/`, `/kspr`, `/cotizacion`.
- [ ] Verificar CTAs: 2 en fase 1, 3 en fase final, enlaces correctos, clics efectivos (no comidos por capas).
- [ ] Commit atómico por fase en rama `refine/hero-typography`, PR a `main`, merge squash, deploy y verificación en `https://aeperion.presentto.online` (repetir QA en producción).
- [ ] Actualizar issue #2 y memoria con el cierre de D1–D7.

---

## 8. Criterios de aceptación (checklist final)

- [ ] `getComputedStyle(body).fontFamily` incluye `Montserrat Variable` en **production**.
- [ ] No existe ningún elemento con `opacity: 0` que capture clics en el hero.
- [ ] La transición se percibe como un solo glifo que muta, no como 3 bloques apilados.
- [ ] Sin solape de texto de fases vecinas en ningún punto del scroll.
- [ ] Video real de dron, cargado solo en la fase final, con fallback funcional.
- [ ] Hero idéntico en light/dark salvo el fondo intencionalmente cinematográfico.
- [ ] `prefers-reduced-motion` muestra versión estática usable.
- [ ] Build, lint y QA en verde; deploy verificado en el dominio.

---

## 9. Riesgos y decisiones pendientes

- **R1 — Fuente del video:** si Wikimedia no tiene un dron nocturno adecuado, usar clip propio de Andrei o asset de Coverr con licencia; no reincidir en placeholder generado sin avisar.
- **R2 — Palabras clave del hero:** la versión anterior mostraba "Tu operación en piloto automático". Confirmar si ese copy debe volver como subtítulo o si queda descartado definitivamente.
- **R3 — Datos comerciales:** métricas/testimonios/casos siguen siendo de ejemplo (issue #2). No tocar en este plan sin validación.
- **R4 — Performance:** el chunk `three` pesa ~1.1 MB. El hero ya no lo usa; confirmar que R3F quedó fuera del entry y, si no, eliminar la dependencia del bundle principal.
