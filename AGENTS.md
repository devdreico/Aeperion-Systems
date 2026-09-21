# Aeperion Systems — Guía del proyecto

Sitio corporativo de **Aeperion Systems** (dominio `aesystems.com`), startup fintech
de desarrollo de software con IA para automatización y eficiencia empresarial.
Fundada en 2017 en Bogotá, Colombia.

## Comandos

```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run start    # Servir build
npm run lint     # ESLint
```

Antes de entregar cambios, ejecutar **`npm run build`** y **`npm run lint`** sin errores.

## Arquitectura

- **Next.js 16** (App Router) + **React 19** + **TypeScript**.
- **Tailwind CSS v4**: tokens en `src/app/globals.css`. Usar colores semánticos
  (`bg-surface`, `text-fg`, `text-fg-muted`, `border-border`) para que el tema
  claro/oscuro funcione. Evitar colores fijos tipo `bg-white` / `text-gray-*`.
- **Tema**: `next-themes` con clase `.dark`; toggle en `src/components/theme`.
- **Animación**: Framer Motion con `LazyMotion` (`MotionProvider`). Usar `m`
  (no `motion`) en los componentes; las features se cargan de forma diferida.
  Respetar siempre `prefers-reduced-motion`.
- **WebGL**: hero con three.js, cargado por intersección y con fallback para
  equipos de gama baja (`src/components/features/hero`).
- **Fuente**: Montserrat self-hosted vía `next/font` (`src/lib/fonts.ts`).

## Estructura

```
src/app/         Rutas, SEO (sitemap, robots, opengraph-image)
src/components/  animations · demo · features · layout · shared · theme · ui
src/lib/         Datos, constantes, fuentes y utilidades
src/types/       Tipos compartidos
```

## Convenciones

- Datos y configuración en `src/lib`; nada de contenido hardcodeado en componentes
  cuando ya exista en los datos.
- Variables de entorno públicas documentadas en `README.md`; usar `process.env`
  con fallback en `src/lib/constants.ts`.
- Contenido de reseñas/proyectos/equipo es de ejemplo en `src/lib/*-data.ts`.

## Criterios de diseño

- Glassmorphism con la utilidad `glass` / `glass-card` (blur acotado).
- Verde de marca `#6EC45E`; en tema oscuro se combina con negros carbón.
- Tipografía: Montserrat Light (300) para cuerpo, Bold/ExtraBold para títulos.
- Animaciones con propósito: nada de movimiento que no aporte.
