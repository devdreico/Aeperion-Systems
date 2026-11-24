# Plan de implementación — Hero scrollytelling (Logo → AE → AI)

## Objetivo
Reemplazar el hero actual por una experiencia de scroll-driven (scrollytelling) que:
1. Empieza con el logo de Aeperion Systems (2 botones).
2. A medida que se desplaza, el logo se transforma en "AE".
3. Luego se transforma en "AI".
4. Al final, un video de dron (stock) de fondo con 3 botones: Asesoría, KSPR, Presentación de startup.

## Decisiones
- Scroll-driven con Framer Motion `useScroll` + `useTransform` (sin GSAP ScrollTrigger adicional).
- Altura del hero: ~300vh con sticky inner (100vh).
- Video de dron: archivo local `/public/videos/hero-drone.mp4` (stock a descargar). Fallback: gradiente animado si no carga.
- Solo 2 botones en la fase principal; 3 botones en la fase final.
- Respetar `prefers-reduced-motion`: mostrar versión estática (logo + botones) sin scroll.

## Fases
1. Descargar video stock de dron a `public/videos/hero-drone.mp4` (instrucción en README).
2. Crear `AgenticHero` nuevo con scrollytelling.
3. Reemplazar en Home.
4. Build + lint + push.

## Problemas para agente de mayor potencia
- P-H1: Sincronización de opacidad/scale entre 3 capas sin jank en mobile.
- P-H2: Video autoplay en mobile (muted, playsInline, loop).
- P-H3: Fallback si el video no carga (onError → gradiente).
- P-H4: Accesibilidad: reduced motion → versión estática.
- P-H5: Performance: lazy load del video; no bloquear LCP.