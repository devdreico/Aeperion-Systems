# Plan de Implementación — Aeperion Systems (Main System)

> Repo: `devdreico/Aeperion-Systems` · Rama de trabajo: `migration/react-vite`
> Fecha: 2026-11-24 · Autor: KSPR (Andrei)

## 0. Objetivo

Convertir el sitio corporativo actual (Next.js 16, branding fintech/automatización) en el **main system de presentación de Aeperion Systems**: la mejor empresa de IA en Colombia. Toda la potencia y los proyectos de la compañía giran en torno a la IA. El sitio debe presentar la empresa, sus capacidades y sus **niveles de valor** (no planes fijos), con CTA de cotización/contacto directo.

Productos principales a destacar:
1. **KSPR** (`kspr.presentto.online`) — sistema de IA agentica de ingeniería inversa; agentes propios = **SPR**.
2. **AELOCK** — agente de IA para procesos de ciberseguridad.
3. **Presentto Online** — host y empresa de administración digital completa para clientes inexpertos.

Carácter: multimodal, multinicho. Sin planes con precio fijo: **mejoras, cotizaciones y experiencias** entregadas a clientes contactados directamente.

Frontend: migrar a **React + Vite + Tailwind** para animaciones profesionales en 3D, estilografía glassmorphism/tecnológica, base futurista y atractiva, con un **pipeline de recorrido** (imágenes → video → animaciones nativas) que represente técnicamente a la mejor empresa de IA en Colombia.

---

## 1. Decisiones de arquitectura

| Área | Decisión |
|---|---|
| Framework | React 19 + Vite 8 + TypeScript |
| Estilos | Tailwind CSS v4 (tokens en `src/index.css`, portar `globals.css`) |
| Routing | `react-router-dom` v7 (data router) |
| Animación | Framer Motion (`motion/react`) con `LazyMotion`; GSAP + ScrollTrigger para scroll-driven; Three.js / R3F para 3D |
| Estado | Zustand (ligero) para tema/UI; Context para providers |
| Tema | Custom `ThemeProvider` (localStorage + `prefers-color-scheme`), reemplaza `next-themes` |
| Fuentes | `@fontsource/montserrat` (self-hosted) o assets en `public/fonts` |
| Iconos | `lucide-react` |
| SEO | `react-helmet-async` + `sitemap.xml`/`robots.txt` estáticos en `public` |
| Analytics | `@vercel/analytics` (web) |
| Deploy | Vercel static: `framework: vite`, `outputDirectory: dist`, SPA fallback |

### Estructura de carpetas (objetivo)

```
src/
├── app/            # (opcional) rutas si se usa file-based; por defecto routes/ en main.tsx
├── routes/         # páginas por ruta (Home, Kspr, Aelock, Presentto, Capacidades, Casos, Metodo, Nosotros, Cotizacion, Contacto, Demo, Blog, Faq)
├── components/     # animations · demo · features · layout · shared · theme · ui (reutilizar)
├── lib/            # datos, constantes, utilidades
├── store/          # zustand stores
└── types/
```

---

## 2. Rebranding de contenido

- `SITE_CONFIG`: nombre Aeperion Systems, tagline orientado a IA ("Ingeniería inversa con IA · la mejor empresa de IA en Colombia"), descripción IA-first.
- Eliminar concepto de **planes con precio fijo** (Standart/Fullpack/Syspack). Reemplazar por:
  - **Niveles de valor** (Value Tiers): Starter IA, Growth IA, Enterprise IA (descriptivos, sin precio público).
  - **Mejoras (Upgrades)**: módulos IA adicionales.
  - **Cotización**: formulario principal (`/cotizacion`).
  - **Experiencias**: demos interactivas (`/demo/:slug`) y casos.
- CTA principal: "Solicitar cotización" / "Agendar diagnóstico".
- Proyectos principales: KSPR, AELOCK, Presentto Online (nuevo `products-data.ts`).
- Capacidades: IA agentiva, ingeniería inversa, ciberseguridad, multimodal, multinicho, host/admin digital.
- `tools-data.ts` (39 herramientas) → reframed como **módulos/capacidades IA** o mantener como "soluciones" (decisión: mantener datos, renombrar categorías a capacidades IA).

---

## 3. Diseño visual y animaciones

- **Glassmorphism tecnológico**: reutilizar `glass`/`glass-card`, blur acotado, bordes sutiles, gradientes.
- **Paleta**: mantener verde marca `#6EC45E` + añadir acento cian (IA) `#22D3EE` y violeta (seguridad) `#A78BFA`. Definir tokens `--color-ae-cyan-*`, `--color-ae-violet-*`.
- **Tipografía**: Montserrat (Light 300 cuerpo, Bold/ExtraBold títulos) self-hosted.
- **Animaciones**:
  - Hero: **pipeline 3D de recorrido** (imágenes → video → animaciones nativas) representando flujo de IA. Three.js/R3F con partículas + glass panels flotantes + fallback CSS.
  - Scroll-driven: secciones que se ensamblan, parallax sutil (GSAP ScrollTrigger).
  - Micro-interacciones: hover tilt, magnetic buttons, cursor spotlight.
  - Page transitions: View Transitions API o `AnimatePresence`.
  - Respetar `prefers-reduced-motion` en todo.
- **Performance**: code splitting por ruta, lazy load de Three.js, imágenes WebP/AVIF, videos `preload="metadata"`.

---

## 4. Estructura de rutas (React Router)

| Ruta | Página |
|---|---|
| `/` | Home (Hero pipeline + capacidades + productos + casos + trust + CTA) |
| `/kspr` | KSPR — IA agentica de ingeniería inversa, agentes SPR |
| `/aelock` | AELOCK — ciberseguridad con agente IA |
| `/presentto` | Presentto Online — host & admin digital para inexpertos |
| `/capacidades` | Grid de capacidades IA |
| `/casos` | Case studies |
| `/metodo` | Metodología |
| `/nosotros` | About, equipo, valores, milestones |
| `/cotizacion` | Formulario de cotización (reemplaza planes) |
| `/contacto` | Contacto |
| `/demo/:slug` | Demos interactivas |
| `/blog`, `/blog/:slug` | Blog |
| `/faq` | FAQ |

---

## 5. Migración técnica — Fases

### Fase 0 — Preparación
- Crear rama `backup/next` (snapshot del estado actual).
- Crear rama `migration/react-vite`.
- Inventario de componentes reutilizables (UI primitives, animations, lib).
- Definir tokens Tailwind v4 en `index.css`.

### Fase 1 — Scaffolding Vite
- `npm create vite@latest` template react-ts (o manual).
- Configurar `tsconfig.json` paths `@/*`, `vite.config.ts` (plugins: react, tailwindcss, svgr opcional).
- Instalar deps: react-router-dom, framer-motion, three, @react-three/fiber, @react-three/drei, gsap, lucide-react, tailwind-merge, clsx, cva, radix-ui, zustand, react-helmet-async, @vercel/analytics.
- Migrar `globals.css` → `src/index.css`.

### Fase 2 — Core infra
- ThemeProvider (custom), MotionProvider (LazyMotion), Container, Section, Nav, Footer, WhatsAppButton, ScrollProgress, CursorSpotlight.
- Migrar `utils` (`cn`), `constants` (refactor), fuentes.

### Fase 3 — Datos
- Migrar `lib/*-data.ts` y `types`.
- Refactor `constants.ts` (nuevo branding).
- Crear `products-data.ts`, `value-tiers-data.ts`, `capabilities-data.ts`.
- Refactor `plans-data.ts` → niveles de valor (o deprecar).

### Fase 4 — Páginas y features
- Home con nuevo Hero pipeline 3D.
- Páginas de productos (KSPR, AELOCK, Presentto).
- Capacidades, Casos, Método, Nosotros, Cotización, Contacto.
- Demos interactivas (reutilizar `demo/*`).

### Fase 5 — Animaciones 3D
- `CommandCenter3D` → `AIPipeline3D` (pipeline de recorrido).
- `HeroVisualFallback`.
- Scroll-driven sections (GSAP).

### Fase 6 — SEO & deploy
- `react-helmet-async` meta tags por ruta.
- `sitemap.xml`, `robots.txt` estáticos en `public`.
- `vercel.json`: `framework: vite`, `outputDirectory: dist`, SPA fallback (`rewrites`).
- OG image estática en `public`.

### Fase 7 — QA
- `npm run lint` y `npm run build` sin errores.
- Lighthouse performance ≥ 90 en home.
- Reduced motion respetado.
- Todas las rutas funcionan en refresh (SPA fallback).
- Contenido refleja nueva identidad IA.
- Sin referencias a planes con precios fijos en UI principal.

---

## 6. Datos y contenido a crear/editar

- `constants.ts`: nuevo branding, links (`kspr.presentto.online`, presentto online, aelock).
- `products-data.ts` (nuevo): KSPR, AELOCK, Presentto.
- `value-tiers-data.ts` (nuevo): niveles de valor.
- `capabilities-data.ts` (nuevo) o refactor `capabilities-grid`.
- `projects-data.ts`: reframed como casos de IA.
- `tools-data.ts`: refactor a módulos/capacidades IA o mantener como soluciones.

---

## 7. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Pérdida de SEO al migrar SSR→SPA | Prerender de rutas clave (`vite-plugin-prerender`) o aceptar SEO menor; mantener meta tags con helmet |
| Bundle Three.js pesado | Lazy load + code split por ruta; fallback CSS |
| Tokens tema claro/oscuro | Portar `globals.css` tal cual (Tailwind v4) |
| Formularios | Mantener endpoint Formspree |
| Regresión de componentes | Migrar por fases, validar build/lint en cada fase |

---

## 8. Criterios de aceptación

- Build y lint sin errores.
- Lighthouse performance ≥ 90 en home (desktop).
- Reduced motion respetado (sin animaciones forzadas).
- Todas las rutas funcionan en refresh (SPA fallback en Vercel).
- Contenido refleja nueva identidad IA y productos principales.
- No hay referencias a planes con precios fijos en UI principal (solo cotización).

---

## 9. Cronograma sugerido (sprints de 1 semana)

- Sprint 1: Fase 0–1 (scaffolding + tokens).
- Sprint 2: Fase 2–3 (core + datos).
- Sprint 3: Fase 4 (páginas).
- Sprint 4: Fase 5 (animaciones 3D).
- Sprint 5: Fase 6–7 (SEO + QA + deploy).

---

## 10. Siguiente acción inmediata

1. Crear rama `backup/next` desde `main`.
2. Crear rama `migration/react-vite`.
3. Ejecutar Fase 1 (scaffolding Vite) en la nueva rama.
4. Validar `npm run dev` y `npm run build`.

---

## Decisiones pendientes para Andrei

- [ ] ¿Mantener los 39 módulos (tools) como "soluciones" o reframed como "capacidades IA"?
- [ ] ¿Paleta final: verde + cian + violeta, o solo verde + cian?
- [ ] ¿Dominio de indexación sigue siendo `aeperion.presentto.online` o migra a `aesystems.com`?
- [ ] ¿Prerender SSR para SEO o SPA puro?
- [ ] ¿AELOCK tiene repo propio o se presenta solo como producto en este sitio?