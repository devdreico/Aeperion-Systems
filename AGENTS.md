# Aeperion Systems — Guía del proyecto

Empresa de desarrollo de **flujos de trabajo agénticos e IA aplicada**.
Expertos en uso, aplicación y desarrollo de IA. Creadores de KSPR, AELOCK y Presentto Online.

## Comandos

```bash
npm run dev      # Desarrollo en http://localhost:5173
npm run build    # Build de producción (dist/)
npm run preview  # Servir el build
npm run lint     # ESLint
```

Antes de entregar cambios, ejecutar **`npm run build`** y **`npm run lint`** sin errores.

## Arquitectura

- **React 19** + **Vite 8** + **TypeScript**.
- **Tailwind CSS v4**: tokens en `src/index.css`. Usar colores semánticos (`bg-surface`, `text-fg`, `text-fg-muted`, `border-border`) para tema claro/oscuro.
- **Tema**: custom `ThemeProvider` (store Zustand) con clase `.dark`. Toggle en `src/components/theme`.
- **Animación**: Framer Motion con `LazyMotion`; GSAP para scroll-driven; Three.js/R3F para 3D.
- **Routing**: React Router v6 (`src/router.tsx`).
- **Fuente**: Montserrat self-hosted vía `@fontsource-variable/montserrat`.

## Estructura

```
src/routes/        Páginas por ruta
src/components/    animations · demo · features · layout · shared · theme · ui
src/lib/           Datos, constantes, utilidades
src/store/         Zustand stores
src/types/         Tipos compartidos
```

## Convenciones

- Datos y configuración en `src/lib`; nada de contenido hardcodeado en componentes cuando ya exista en los datos.
- Variables de entorno públicas con prefijo `VITE_` y fallback en `src/lib/constants.ts`.
- Contenido de reseñas/proyectos/equipo es de ejemplo en `src/lib/*-data.ts`.

## Criterios de diseño

- Glassmorphism tecnológico con utilidad `glass` / `glass-card` / `glass-strong`.
- Verde de marca `#6EC45E` + acentos cian `#22D3EE` y violeta `#A78BFA`.
- Tipografía: Montserrat. Agentes propios se llaman **SPR**.
- Animaciones con propósito y respeto a `prefers-reduced-motion`.