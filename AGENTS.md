# AEPERION SYSTEMS — FRONTEND AGENT HANDOFF (DEFINITIVO)

> **⚠️ Fecha:** 26 Mayo 2026
> **Fullstack Agent completó:** 51 archivos fuente, 12 rutas, build exitoso 0 errores
> **Tu tarea (Frontend Agent):** Implementar TODAS las animaciones con Framer Motion, crear 10 componentes de animación reutilizables, implementar 12 demos interactivas, y animar todos los estados del sistema.
>
> **Build actual:** ✅ `npm run build` pasa sin errores. **No romper el build.**

---

## 📋 DIAGNÓSTICO COMPLETO DEL ESTADO ACTUAL

### ✅ Lo que YA funciona (0 errores, build limpio)
- Design system completo en `globals.css` (tokenes Tailwind v4, colores, fuentes, sombras, radii)
- UI primitives: Button (5 variants, 5 sizes), Card (5 subcomponentes), Badge (6 variants), Input, Dialog, Separator
- Layout: Nav (responsive desktop/mobile), Footer (4 columnas), Container (4 variants), Section (5 variants)
- Shared: Logo (SVG honeycomb), CTAButton (4 variants), WhatsAppButton (FAB flotante), SectionHeader
- Data layer: 4 planes, 39 tools en 10 categorías, 6 trust metrics, constants, utils
- Types: 15 interfaces/type aliases
- Pages: 12 rutas estáticas y dinámicas
- Blog data: 6 artículos con contenido completo HTML
- System states: loading.tsx, error.tsx, not-found.tsx
- Hooks: useMediaQuery, useIntersectionObserver, useScrollProgress, useMousePosition (CREADOS)
- Demo scaffolding: DemoContainer con estados loading/error/empty (CREADO)

### ❌ Lo que NO existe (debe crearlo el Frontend agent)

| # | Elemento | Archivo destino | Prioridad |
|---|---------|----------------|-----------|
| 1 | Framer Motion en features | `src/components/features/` (6 archivos) | 🔴 CRÍTICA |
| 2 | Framer Motion en layout | `src/components/layout/nav.tsx`, `footer.tsx`, etc. | 🔴 CRÍTICA |
| 3 | Page transitions | `src/app/layout.tsx` (AnimatePresence) | 🔴 CRÍTICA |
| 4 | 10 animation components | `src/components/animations/` (crear 10 archivos) | 🔴 CRÍTICA |
| 5 | 4 demo implementations | `src/components/demo/demo-*.tsx` | 🟡 ALTA |
| 6 | Page-specific animations | 7 páginas con handoff markers | 🟡 ALTA |
| 7 | Animated system states | `loading.tsx`, `error.tsx`, `not-found.tsx` | 🟢 MEDIA |

### 🐛 Findings críticos (issues existentes que NO debes corregir pero debes conocer)

1. **⚠️ Typo "standart" en PlanId**: `plans-data.ts` usa `"standart"` en vez de `"standard"`. Esto está en el tipo `PlanId`, el plan data, y la tabla comparativa. Está consistente (todo el sistema usa el typo). No corregir — rompería consistencia.
2. **⚠️ Imágenes de blog no existen**: `BLOG_POSTS[].image` referencia `/images/blog/*.jpg` en el array de posts — los archivos reales no están en `public/`. Mostrar placeholder gris o el logo por defecto.
3. **⚠️ WhatsApp placeholder**: Número en `constants.ts` y `.env.local` es `3001234567` (placeholder). Usar variable de entorno.
4. **⚠️ Asesoria Gratuita no está en comparación**: La tabla compara solo 3 planes pagos (Standart, Fullpack, Syspack). Asesoria es gratis y no aparece.
5. **⚠️ Demos de 9 herramientas sin demo**: `tool.hasDemo === false` para 9 herramientas. La ruta `/demo/[slug]` debe redirigir a 404 o mostrar "Demo no disponible".
6. **⚠️ Blog image paths**: Las 6 imágenes usan extensión `.jpg`. Verificar si existen archivos o usar fallback.

---

## 🗺️ MAPA COMPLETO DE ARCHIVOS (51 archivos fuente)

### ARCHIVOS QUE NO DEBES TOCAR (29 archivos — solo añadir motion wrappers)

```
src/types/index.ts                           ← Types: solo importar
src/lib/utils.ts                             ← cn(), formatCOP(), etc.
src/lib/constants.ts                         ← SITE_CONFIG, NAV_LINKS...
src/lib/plans-data.ts                        ← 4 planes
src/lib/tools-data.ts                        ← 39 herramientas
src/lib/blog-data.ts                         ← 6 posts blog
src/app/layout.tsx                           ← Root layout (metadata)
src/app/globals.css                          ← Design tokens (NO ELIMINAR keyframes)
src/components/ui/button.tsx                 ← Button primitives
src/components/ui/card.tsx                   ← Card system
src/components/ui/badge.tsx                  ← Badge system
src/components/ui/input.tsx                  ← Input primitive
src/components/ui/dialog.tsx                 ← Dialog primitive
src/components/ui/separator.tsx              ← Separator primitive
src/components/layout/container.tsx          ← Container variants
src/components/layout/section.tsx            ← Section variants
src/components/shared/logo.tsx               ← SVG logo
src/components/shared/section-header.tsx     ← Section headers
src/app/page.tsx                             ← Landing page
src/app/asesoria/page.tsx                    ← Asesoria page wrapper
src/app/planes/page.tsx                      ← Planes page
src/app/herramientas/page.tsx               ← Herramientas page wrapper
src/app/herramientas/[slug]/page.tsx         ← Tool detail page
src/app/about/page.tsx                       ← About page
src/app/metodo/page.tsx                      ← Metodo page
src/app/faq/page.tsx                         ← FAQ page wrapper
src/app/contacto/page.tsx                    ← Contacto page wrapper
```

### ARCHIVOS QUE PUEDES MODIFICAR (solo para AÑADIR motion wrappers y efectos)

```
src/components/layout/nav.tsx               ← AÑADIR: scroll blur, mobile anim, link hover
src/components/layout/footer.tsx             ← AÑADIR: fade-in on scroll, link anims
src/components/shared/cta-button.tsx         ← AÑADIR: magnetic effect wrapper
src/components/shared/whatsapp-button.tsx    ← AÑADIR: floating bounce, pulse glow
src/app/asesoria/asesoria-client.tsx          ← AÑADIR: step transitions, confetti
src/app/contacto/contact-form.tsx            ← AÑADIR: field focus, success confetti
src/app/herramientas/tools-grid-client.tsx   ← AÑADIR: stagger reveal, filter anims
src/app/faq/faq-client.tsx                   ← AÑADIR: accordion smooth anim, filter
src/components/features/hero/cinematic-hero.tsx    ← REEMPLAZAR: particles + text reveal
src/components/features/capabilities/capabilities-grid.tsx ← REEMPLAZAR: stagger + hover
src/components/features/pricing/pricing-section.tsx  ← REEMPLAZAR: counter + stagger
src/components/features/tools/tools-showcase.tsx    ← REEMPLAZAR: stagger + hover tilt
src/components/features/trust/trust-section.tsx     ← REEMPLAZAR: counter + fade-in
src/components/features/trust/final-cta.tsx         ← REEMPLAZAR: parallax + pulse
src/app/blog/page.tsx                        ← AÑADIR: stagger reveal posts grid
src/app/blog/[slug]/page.tsx                 ← AÑADIR: fade-in on scroll sections
src/app/demo/[slug]/page.tsx                 ← AÑADIR: top bar animation
src/app/loading.tsx                          ← REEMPLAZAR: skeleton + logo pulse
src/app/error.tsx                            ← AÑADIR: shake + bounce
src/app/not-found.tsx                        ← AÑADIR: floating 404 + particles
src/hooks/index.ts                           ← CREADO (no tocar exportaciones)
src/hooks/use-media-query.ts                 ← CREADO
src/hooks/use-intersection-observer.ts       ← CREADO
src/hooks/use-scroll-progress.ts             ← CREADO
src/hooks/use-mouse-position.ts              ← CREADO
src/components/animations/scroll-progress.tsx ← MEJORAR: conectar con useScrollProgress
src/components/animations/fade-in-view.tsx   ← MEJORAR: usar Framer Motion en vez de CSS
src/components/animations/stagger-reveal.tsx ← MEJORAR: usar Framer Motion
src/components/demo/demo-container.tsx       ← CREADO (implementar 4 demo types)
```

### ARCHIVOS QUE DEBES CREAR (12 nuevos)

```
src/components/animations/particle-system.tsx     ← Sistema de partículas canvas
src/components/animations/magnetic-button.tsx     ← Botón magnético (cursor follower)
src/components/animations/counter-animation.tsx   ← Número count-up animado
src/components/animations/text-reveal.tsx         ← Texto typing / character reveal
src/components/animations/parallax-layer.tsx      ← Efecto parallax en scroll
src/components/animations/section-transition.tsx  ← Scroll-triggered section reveal
src/components/animations/page-transition.tsx     ← AnimatePresence page wrapper
src/components/animations/hover-card.tsx          ← 3D tilt hover effect
src/components/animations/morphing-shape.tsx      ← SVG path morphing
src/components/animations/noise-texture.tsx       ← Noise overlay SVG filter
src/components/demo/demo-terminal.tsx             ← Terminal interactivo
src/components/demo/demo-visual.tsx               ← Mock visual interactivo
src/components/demo/demo-form.tsx                 ← Formulario animado
src/components/demo/demo-dashboard.tsx            ← Dashboard con charts
```

---

## 🚨 PLAN DE EJECUCIÓN ESTRICTO (7 FASES — ORDEN OBLIGATORIO)

### FASE 1 — COMPONENTES DE ANIMACIÓN REUTILIZABLES (prioridad #1)

Crear los 10 componentes en `src/components/animations/`:

| Componente | Props | Descripción |
|-----------|-------|-------------|
| `particle-system` | `count?: number; color?: string; speed?: number; className?: string` | Canvas particles animados con requestAnimationFrame |
| `magnetic-button` | `strength?: number; radius?: number; children: ReactNode` | Wrap children, sigue posición del mouse relativa |
| `counter-animation` | `from?: number; to: number; duration?: number; formatFn?: (n: number) => string` | Count-up animado con spring |
| `text-reveal` | `text: string; delay?: number; stagger?: number; className?: string` | Letras aparecen secuencialmente |
| `parallax-layer` | `speed?: number; direction?: 'vertical' \| 'horizontal'; className?: string` | Transform basado en scroll |
| `section-transition` | `children: ReactNode; className?: string` | Scroll-triggered fade-in-up |
| `page-transition` | `children: ReactNode; className?: string` | AnimatePresence wrapper |
| `hover-card` | `children: ReactNode; className?: string; glare?: boolean` | 3D tilt on hover |
| `morphing-shape` | `paths: string[]; duration?: number; className?: string` | SVG path morphing |
| `noise-texture` | `opacity?: number; className?: string` | SVG feTurbulence overlay |

**Actualizar** `src/components/animations/index.ts` con todos los exports.

### FASE 2 — FEATURE COMPONENTS (reemplazar CSS por Framer Motion)

#### `cinematic-hero.tsx`
```tsx
// AGREGAR al principio del archivo:
"use client";
import { motion } from "framer-motion";
```

- **Particle background**: `<ParticleSystem count={50} color="#6EC45E" speed={0.3} />` en el fondo
- **Badge**: `motion.div` con fade-in + slide-up (delay: 0.2s)
- **Title**: `motion.h1` con text-reveal o fade-in-up (stagger: 0.05s entre líneas)
- **CTA buttons**: Wrap en `<MagneticButton strength={20}>` 
- **Scroll indicator**: `motion.div` con float animation infinita

#### `capabilities-grid.tsx`
```tsx
"use client";
import { motion } from "framer-motion";
```

- **Grid**: Wrap en `<StaggerReveal staggerDelay={0.1}>`
- **Each card**: `motion.div` con hover: scale(1.02) + box-shadow glow verde
- **Icons**: float animation suave

#### `pricing-section.tsx`
```tsx
"use client";
import { motion } from "framer-motion";
```

- **Prices**: Cada precio envuelto en `<CounterAnimation to={price} formatFn={formatCOP} />`
- **Cards**: `<StaggerReveal>` con stagger 0.15s
- **Fullpack**: glow pulsante, border-l-4 verde animado
- **Hover**: elevate card, subtle glow

#### `tools-showcase.tsx`
```tsx
"use client";
import { motion } from "framer-motion";
```

- **Category cards**: Stagger reveal grid, hover tilt con `<HoverCard>`

#### `trust-section.tsx`
```tsx
"use client";
import { motion } from "framer-motion";
```

- **Metrics numbers**: Cada trust stat envuelto en `<CounterAnimation>`
- **Value cards**: Fade-in con stagger usando `useIntersectionObserver`
- **Trigger**: solo cuando entran en viewport (triggerOnce)

#### `final-cta.tsx`
```tsx
"use client";
import { motion } from "framer-motion";
```

- **Background**: `<ParallaxLayer speed={0.5}>` con gradient animado
- **CTAs**: Wrap magnetic button, pulse glow animation
- **Content**: fade-in-up con delay

### FASE 3 — PAGE TRANSITIONS

En `src/app/layout.tsx`:

```tsx
// AGREGAR imports
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// ENVOLVER children:
const pathname = usePathname();
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

**⚠️ ADVERTENCIA**: `layout.tsx` tiene `export const metadata`. No puedes usar `"use client"` y exportar metadata simultáneamente. Solución: Crear un `ClientLayout` wrapper interno:

```tsx
// layout.tsx mantiene metadata (server component)
// AGREGAR un ClientLayoutWrapper:

// En layout.tsx, importar y usar:
import { ClientLayout } from "@/components/layout/client-layout";

// Envolver children:
<body className="...">
  <ScrollProgress />
  <Nav />
  <ClientLayout>{children}</ClientLayout>
  <Footer />
  <WhatsAppButton />
</body>
```

Crear `src/components/layout/client-layout.tsx`:
```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
```

### FASE 4 — LAYOUT ANIMATIONS

#### `nav.tsx`
- AGREGAR `"use client"` + `motion`
- **Scroll blur**: `useScrollProgress().scrollY > 50 → bg-white/80 backdrop-blur-xl`
- **Mobile menu**: `motion.div` con animate desde `{ x: "100%" }` a `{ x: 0 }`
- **Active link**: underline animation con `layoutId="nav-indicator"`
- **CTA button**: wrap en MagneticButton

#### `footer.tsx`
- AGREGAR `"use client"` + `motion`
- **Link columns**: stagger reveal con intersection observer
- **Brand section**: fade-in

#### `scroll-progress.tsx`
- REEMPLAZAR: usar `useScrollProgress()` hook
- `motion.div` con `scaleX` animado

#### `whatsapp-button.tsx`
- AGREGAR `"use client"` + `motion`
- **Floating**: animate `y` con float infinito
- **Show/hide**: aparece después de 300px scroll, desaparece en top
- **Tooltip**: `motion.div` con fade en hover

### FASE 5 — DEMOS INTERACTIVAS

En `src/components/demo/`, crear:

#### `demo-terminal.tsx`
- Estado: array de líneas de terminal
- Efecto typewriter: setInterval agregando chars
- Comandos cliqueables: el usuario hace clic en comandos sugeridos
- Respuestas predefinidas: mock data según tool.id
- Transiciones: fade entre comandos

#### `demo-visual.tsx`
- Mock de interfaz visual con datos mock
- Tabs funcionales (cambian vista)
- Tooltips informativos en elementos clave
- Responsive: mobile/desktop layout

#### `demo-form.tsx`
- Formulario con campos mock
- Validación visual (verde/rojo)
- Botón submit → loading spinner → resultado animado
- Success: confetti opcional

#### `demo-dashboard.tsx`
- KPIs con CounterAnimation
- Tabla con datos mock
- Filtros funcionales (cambian data mock)
- Gráficos placeholder (barras/círculos SVG simples)

Actualizar `src/components/demo/demo-container.tsx` para renderizar el demo correcto según tool.demoType.

### FASE 6 — PAGE-SPECIFIC ANIMATIONS

#### Landing (`src/app/page.tsx`)
- AGREGAR `"use client"` o crear wrapper
- Cada section envuelta en `<SectionTransition>`
- Hero con ParticleSystem

#### Asesoria (`asesoria-client.tsx`)
- Step transitions: `motion.div` con `AnimatePresence`, slide entre pasos
- Progress bar: animated fill
- Option buttons: pulse en selección, scale on tap
- Success: confetti animation (usar canvas o emojis)

#### Planes (`planes/page.tsx`)
- AGREGAR wrapper client component o `"use client"` + motion
- Tabla comparativa: row highlight animation en hover

#### About (`about/page.tsx`)
- Timeline: scroll-triggered reveal de items
- Value cards: stagger con intersection observer

#### Metodo (`metodo/page.tsx`)
- Timeline: connector line animada que se llena en scroll
- Steps: fade-in-up con stagger en scroll

#### FAQ (`faq-client.tsx`)
- Accordion: `AnimatePresence` para height suave
- Category filter: `layout` animation en grid de preguntas

#### Contacto (`contact-form.tsx`)
- Fields: focus ring animado con spring
- Submit: loading spinner → success checkmark animado
- Success: confetti o fade

### FASE 7 — SYSTEM STATES

#### `loading.tsx`
- REEMPLAZAR completamente
- Logo pulse: `<motion.img>` con scale infinito suave
- Skeleton screens: barras animadas con shimmer gradient
- Loading dots: animated stagger

#### `error.tsx`
- Icono: bounce/shake en mount
- Retry button: pulse glow
- Fade-in del contenido completo

#### `not-found.tsx`
- Número 404: floating animation
- Particle background sutiles
- Back button: fade-in con delay

---

## 🎨 SPEC DE ANIMACIONES (copia exacta)

### Easing
```typescript
const easeOutCustom = [0.16, 1, 0.3, 1];    // Entrada: Apple-style
const easeInCustom = [0.4, 0, 1, 1];          // Salida: rápido
const easeSpring = { type: "spring", stiffness: 300, damping: 30 };
```

### Variants comunes
```typescript
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutCustom } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: easeOutCustom } },
};
```

### Glow verde
```css
box-shadow: 0 0 20px rgba(110, 196, 94, 0.3);
```
En Framer Motion:
```tsx
animate={{ boxShadow: "0 0 20px rgba(110, 196, 94, 0.3)" }}
transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
```

### Reduced Motion
```tsx
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

// En todos los motion components:
if (prefersReducedMotion) return <div>{children}</div>; // Skip animation
```

---

## 🔌 CÓMO CONSUMIR DATA

```tsx
// Planes
import { PLANS, PLAN_COMPARISON_ROWS } from "@/lib/plans-data";
// PLANS.find(p => p.id === "fullpack")

// Herramientas
import { TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data";
// TOOLS.filter(t => t.category === "web-presencia")

// Blog
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-data";

// Config
import { SITE_CONFIG, NAV_LINKS, TRUST_METRICS } from "@/lib/constants";

// Hooks
import { useMediaQuery, useIntersectionObserver, useScrollProgress, useMousePosition } from "@/hooks";

// Utils
import { cn, formatCOP } from "@/lib/utils";
```

---

## 🔧 COMANDOS

```bash
cd /home/dev/Escritorio/Aeperion\ Web-App/Aeperion\ App\ Web
npm run dev          # Desarrollo local (http://localhost:3000)
npm run build        # Build producción (OBLIGATORIO antes de entregar)
npm run lint         # ESLint
```

---

## 📐 ESTRUCTURA FINAL (cómo debe quedar)

```
src/
├── app/                          ← 12 rutas (NO MODIFICAR lógica, solo AÑADIR motion)
│   ├── layout.tsx                ← ClientLayout wrapper
│   ├── page.tsx                  ← Landing + SectionTransition wrappers
│   ├── loading.tsx               ← REEMPLAZADO: skeleton + pulse
│   ├── error.tsx                 ← MEJORADO: bounce + shake
│   ├── not-found.tsx             ← MEJORADO: floating 404 + particles
│   └── ... (9 subdirectorios)
├── components/
│   ├── animations/               ← 10 NUEVOS + 3 MEJORADOS
│   │   ├── index.ts              ← Exportar todos
│   │   ├── particle-system.tsx   ← NUEVO
│   │   ├── magnetic-button.tsx   ← NUEVO
│   │   ├── counter-animation.tsx ← NUEVO
│   │   ├── text-reveal.tsx       ← NUEVO
│   │   ├── parallax-layer.tsx    ← NUEVO
│   │   ├── section-transition.tsx← NUEVO
│   │   ├── page-transition.tsx   ← NUEVO
│   │   ├── hover-card.tsx        ← NUEVO
│   │   ├── morphing-shape.tsx    ← NUEVO
│   │   ├── noise-texture.tsx     ← NUEVO
│   │   ├── scroll-progress.tsx   ← MEJORADO: useScrollProgress
│   │   ├── fade-in-view.tsx      ← MEJORADO: Framer Motion
│   │   └── stagger-reveal.tsx    ← MEJORADO: Framer Motion
│   ├── demo/
│   │   ├── index.ts              ← Exportar DemoContainer
│   │   ├── demo-container.tsx    ← CREADO (mejorar para renderizar demos)
│   │   ├── demo-terminal.tsx     ← NUEVO
│   │   ├── demo-visual.tsx       ← NUEVO
│   │   ├── demo-form.tsx         ← NUEVO
│   │   └── demo-dashboard.tsx    ← NUEVO
│   ├── features/                 ← 6 archivos REEMPLAZADOS (CSS → Framer Motion)
│   ├── layout/
│   │   ├── client-layout.tsx     ← NUEVO (page transitions wrapper)
│   │   └── ... (nav.tsx, footer.tsx MEJORADOS)
│   ├── shared/                   ← cta-button, whatsapp-button MEJORADOS
│   └── ui/                       ← NO TOCAR
├── hooks/                        ← 4 archivos CREADOS (no modificar)
├── lib/                          ← NO TOCAR
└── types/                        ← NO TOCAR
```

---

## 🚩 CHECKLIST DE VERIFICACIÓN FINAL

Antes de entregar, marcar TODOS:

- [ ] `npm run build` — 0 errores, 0 warnings
- [ ] `npm run lint` — 0 errores
- [ ] Landing page: particle hero, text reveal, magnetic CTAs, scroll sections
- [ ] Pricing: counter animations, stagger reveal, Fullpack glow
- [ ] Tools: filter animation, stagger cards
- [ ] Trust: counter numbers, value cards fade-in
- [ ] Asesoria: step transitions, progress bar, success confetti
- [ ] Blog: stagger posts, article fade-in
- [ ] FAQ: accordion smooth, category filter
- [ ] Contacto: focus animations, success confetti
- [ ] Demos: terminal/visual/form/dashboard funcionales
- [ ] Nav: scroll blur, mobile slide-in, active indicator
- [ ] WhatsApp: float, show/hide on scroll, tooltip
- [ ] Page transitions: fade en todas las rutas
- [ ] Loading: skeleton + logo pulse
- [ ] Error: bounce + shake
- [ ] 404: floating + particles
- [ ] `prefers-reduced-motion` respetado en TODOS los animations
- [ ] No se modificaron archivos de la sección 🚫 NO TOCAR

---

## 🆘 SI TE ATASCAS

1. **Build falla**: Revisar que `"use client"` esté en componentes que usan hooks/motion. Revisar que `params` sea `Promise<{ slug }>`.
2. **Animación no se ve**: Verificar que el componente esté dentro del viewport. IntersectionObserver no trigger si el elemento está fuera.
3. **Error de tipos**: Correr `npx next build` para ver el error exacto de TypeScript.
4. **Radix conflict**: Algunos primitives Radix necesitan `"use client"`. Ya están en los componentes que los usan.
5. **No sabes qué animar en una demo**: Poner datos mock, transiciones suaves con Framer Motion, y tooltips explicativos. No necesitas backend.
