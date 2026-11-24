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

## 11. Handoff — Problemas específicos para agente de mayor potencia

Esta sección detalla los problemas concretos que requieren un agente de mayor potencia (modelo superior) para resolverlos. Cada problema incluye contexto, archivos afectados, pasos exactos y criterio de verificación.

### P1. Migración de routing (Next App Router → React Router v7)
- **Contexto**: 13 rutas en `src/app/` (incluye dinámicas `[slug]`). Next usa file-based routing + `layout.tsx` raíz.
- **Archivos afectados**: `src/app/**/page.tsx`, `src/app/layout.tsx`, `src/lib/seo.ts`.
- **Pasos**:
  1. Crear `src/routes/` con un archivo por ruta (`Home.tsx`, `Kspr.tsx`, ...).
  2. Definir router en `src/router.tsx` con `createBrowserRouter` + `RouterProvider`, incluyendo `errorElement` y `loader` para datos (projects, tools).
  3. Portar `layout.tsx` a `src/components/layout/RootLayout.tsx` (Nav + Outlet + Footer + providers).
  4. Reemplazar `next/link` por `react-router-dom` `Link`/`NavLink` en todos los componentes (grep `from "next/link"`).
  5. Reemplazar `next/navigation` (`useRouter`, `usePathname`) por `useNavigate`/`useLocation`.
- **Verificación**: `npm run build` sin errores; navegación entre las 13 rutas sin 404; refresh en ruta dinámica funciona con SPA fallback.

### P2. Tema claro/oscuro sin next-themes
- **Contexto**: `src/components/theme/theme-provider.tsx` usa `next-themes`. Clase `.dark` en `<html>`.
- **Pasos**:
  1. Crear `src/store/theme.ts` (zustand) con `theme: 'light'|'dark'|'system'`, `resolvedTheme`, `setTheme`.
  2. Inicializar en `main.tsx` antes de render (evitar flash): leer `localStorage` o `matchMedia('(prefers-color-scheme: dark)')`.
  3. Aplicar clase `.dark` al `<html>` vía `useEffect` en provider.
  4. Reemplazar `useTheme` de next-themes por el store en todos los consumidores (grep `useTheme`).
- **Verificación**: toggle funciona, persiste en reload, respeta `prefers-color-scheme`, sin FOUC.

### P3. Fuentes self-hosted sin next/font
- **Contexto**: `src/lib/fonts.ts` exporta `montserrat` variable usada en `layout.tsx` className.
- **Pasos**:
  1. Instalar `@fontsource-variable/montserrat` (o `@fontsource/montserrat`).
  2. Importar en `src/main.tsx`: `import '@fontsource-variable/montserrat'`.
  3. Mapear `--font-montserrat` en `index.css` (Tailwind v4 `@theme`).
  4. Eliminar `src/lib/fonts.ts` y referencias.
- **Verificación**: fuente Montserrat visible, sin requests externos a Google Fonts.

### P4. Three.js / R3F lazy load y fallback
- **Contexto**: `cinematic-hero.tsx` usa `next/dynamic` con `ssr:false`. En Vite no hay SSR, pero lazy load sigue siendo necesario para bundle.
- **Pasos**:
  1. Reemplazar `next/dynamic` por `React.lazy(() => import('./command-center-3d'))` + `Suspense` con `<HeroVisualFallback />`.
  2. Mantener detección de gama baja (`deviceMemory`, `hardwareConcurrency`, `saveData`) y `IntersectionObserver` para montar.
  3. Verificar que `three` y `@react-three/*` queden en chunk separado (Vite code splitting automático por dynamic import).
- **Verificación**: `npm run build` genera chunk separado para three; Lighthouse no bloquea; fallback se muestra en equipos de gama baja.

### P5. SEO en SPA (meta tags, sitemap, robots, OG)
- **Contexto**: Next genera metadata vía `export const metadata` y `opengraph-image.tsx`. En SPA no hay SSR.
- **Pasos**:
  1. Instalar `react-helmet-async`. Crear `src/components/shared/Seo.tsx` wrapper.
  2. Portar `src/lib/seo.ts` (`pageMetadata`) a función que devuelve props para `<Seo />`.
  3. Crear `public/sitemap.xml` y `public/robots.txt` estáticos (portar `src/app/sitemap.ts` y `robots.ts`).
  4. Generar OG image estática (1200x630) en `public/og-image.png` (reemplazar `opengraph-image.tsx`).
  5. (Opcional avanzado) prerender rutas clave con `vite-plugin-prerender` para SEO.
- **Verificación**: cada ruta tiene `<title>` y meta description correctos; sitemap accesible; OG image válida.

### P6. Variables de entorno (NEXT_PUBLIC_ → VITE_)
- **Contexto**: constantes usan `process.env.NEXT_PUBLIC_*`.
- **Pasos**:
  1. Renombrar todas a `import.meta.env.VITE_*` en `src/lib/constants.ts`.
  2. Crear `.env.example` con las variables `VITE_*`.
  3. Actualizar `vercel.json` / Vercel project env vars.
- **Verificación**: build con env vacío usa defaults; con env definido usa valores.

### P7. Formularios y endpoints
- **Contexto**: `TOOL_SALES_FORM_URL` (Formspree) y endpoints de contacto/asesoría.
- **Pasos**:
  1. Portar `tool-purchase-form.tsx` y formularios a React (sin cambios de lógica).
  2. Mantener endpoints en `import.meta.env.VITE_CONTACT_ENDPOINT` etc.
- **Verificación**: envío de formulario llega a Formspree (test manual).

### P8. Rebranding de contenido (IA-first)
- **Contexto**: constants, plans-data, tools-data, projects-data, team-data, faq-data orientados a fintech/automatización.
- **Pasos**:
  1. Refactor `SITE_CONFIG` (tagline, description, valueProp) a IA-first.
  2. Crear `src/lib/products-data.ts` (KSPR, AELOCK, Presentto) con tipos en `types`.
  3. Crear `src/lib/value-tiers-data.ts` (niveles de valor, sin precios fijos).
  4. Deprecar `plans-data.ts` (o convertir a value-tiers).
  5. Reframed `projects-data.ts` como casos de IA (o mantener como evidencia).
  6. Añadir tipos `Product`, `ValueTier` en `src/types/index.ts`.
- **Verificación**: ningún texto menciona "planes con precio" en UI principal; productos principales visibles en home.

### P9. Animaciones 3D — pipeline de recorrido
- **Contexto**: hero actual es "command center" 3D. Nuevo concepto: pipeline de recorrido (imágenes → video → animaciones nativas) representando flujo de IA.
- **Pasos**:
  1. Diseñar escena R3F: nodos flotantes (glass panels) conectados por flujo de partículas, representando etapas (input multimodal → modelo → agente → output).
  2. Integrar videos/imágenes como texturas en planos 3D (lazy).
  3. Añadir scroll-driven (GSAP ScrollTrigger) que avanza el pipeline.
  4. Fallback CSS con animación 2D equivalente.
  5. Respetar `prefers-reduced-motion` (desactivar 3D, mostrar estático).
- **Verificación**: hero carga < 3s en desktop; no jank en scroll; fallback funciona.

### P10. Deploy y verificación en producción
- **Contexto**: Vercel configurado para Next.js (`vercel.json` framework nextjs).
- **Pasos**:
  1. Actualizar `vercel.json`: `framework: "vite"`, `buildCommand: "npm run build"`, `outputDirectory: "dist"`, SPA fallback rewrites.
  2. Configurar env vars `VITE_*` en Vercel.
  3. Deploy a preview (rama migration/react-vite) y validar.
  4. Smoke test: todas las rutas, formularios, tema, 3D.
- **Verificación**: preview deploy OK, Lighthouse ≥ 90.

---

## 12. Primera base de producción real (Release 0.2.0-alpha)

Objetivo: dejar en la rama `migration/react-vite` una base mínima funcional de React+Vite+Tailwind que compile, se despliegue y sirva como punto de partida para las fases siguientes.

### Pasos (ejecutables)

1. **Snapshot**: rama `backup/next` ya creada ✓.
2. **Limpiar Next**: en `migration/react-vite`, eliminar `next.config.ts`, `src/app/`, `postcss.config.mjs` (se recrea), mantener `src/components`, `src/lib`, `src/types`, `public`, `globals.css`.
3. **Scaffold Vite**:
   - Crear `index.html` en raíz con `<div id="root">` y script `src/main.tsx`.
   - Crear `vite.config.ts` con plugins `react()` y `tailwindcss()`, alias `@` → `./src`.
   - Crear `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` (sin plugin next).
4. **package.json**: actualizar `name` a `aeperion-vite`, scripts (`dev`, `build`, `preview`, `lint`), deps (react, react-dom, react-router-dom, vite, @vitejs/plugin-react, tailwindcss v4, @tailwindcss/vite, framer-motion, three, @react-three/fiber, @react-three/drei, gsap, lucide-react, zustand, react-helmet-async, clsx, tailwind-merge, cva, radix-ui, @vercel/analytics), devDeps (typescript, eslint + react hooks, @types/*).
5. **Entry**: crear `src/main.tsx` (render App, import index.css, fonts).
6. **App shell**: crear `src/App.tsx` con `RouterProvider` + providers (Theme, Motion) + RootLayout.
7. **Estilos**: portar `src/app/globals.css` → `src/index.css` (ajustar `@import "tailwindcss"` y `@theme inline`).
8. **Tema**: implementar `src/store/theme.ts` + `ThemeProvider` (P2).
9. **Fuentes**: instalar `@fontsource-variable/montserrat`, importar en main (P3).
10. **Home mínima**: portar `CinematicHero` (con fallback, sin 3D por ahora) + `CapabilitiesGrid` + `FinalCTA` a una ruta `/`.
11. **Verificación**: `npm install` → `npm run dev` (puerto 5173) → `npm run build` → `npm run preview`. Lint sin errores.
12. **Deploy preview**: actualizar `vercel.json`, push, validar preview URL.
13. **Commit**: `feat: primera base de produccion React+Vite+Tailwind (0.2.0-alpha)` en `migration/react-vite`.

### Criterio de "base de producción real"
- `npm run build` exitoso, output en `dist/`.
- Preview deploy en Vercel accesible.
- Ruta `/` renderiza Home con hero + capacidades + CTA.
- Tema claro/oscuro funcional.
- Sin errores de consola en producción.

---

## Decisiones pendientes para Andrei

- [ ] ¿Mantener los 39 módulos (tools) como "soluciones" o reframed como "capacidades IA"?
- [ ] ¿Paleta final: verde + cian + violeta, o solo verde + cian?
- [ ] ¿Dominio de indexación sigue siendo `aeperion.presentto.online` o migra a `aesystems.com`?
- [ ] ¿Prerender SSR para SEO o SPA puro?
- [ ] ¿AELOCK tiene repo propio o se presenta solo como producto en este sitio?