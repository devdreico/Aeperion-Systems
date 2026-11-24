# Aeperion Systems — Main System

Sitio corporativo de **Aeperion Systems**, empresa de desarrollo de flujos de trabajo
agénticos e IA aplicada. Expertos en uso, aplicación y desarrollo de IA.

Productos principales:
- **KSPR** — ingeniería inversa agéntica (`kspr.presentto.online`)
- **AELOCK** — ciberseguridad agéntica (`aelock.presentto.online`)
- **Presentto Online** — administración digital completa (`presentto.online`)

## Stack
- **React 19** + **Vite 8** + **TypeScript**
- **Tailwind CSS v4**
- **React Router v6**
- **Framer Motion** + **GSAP** + **Three.js / R3F**
- **lucide-react** para iconografía
- **react-helmet-async** para SEO

## Scripts
```bash
npm run dev      # Desarrollo en http://localhost:5173
npm run build    # Build de producción (dist/)
npm run preview  # Servir el build
npm run lint     # ESLint
```

## Variables de entorno
Ver `.env.example`. Todas opcionales; el sitio usa defaults de `src/lib/constants.ts`.

## Despliegue
Optimizado para **Vercel** (framework Vite, output `dist`). SPA fallback incluido en `vercel.json`.