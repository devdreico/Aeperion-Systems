# Aeperion Systems — Sitio web

Sitio corporativo de **Aeperion Systems**, startup fintech de desarrollo de software con IA
orientada a automatización y eficiencia empresarial. Fundada en 2017 en Bogotá, Colombia.

Dominio de indexación: **aeperion.presentto.online**  
(Marca corporativa: aesystems.com)

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** con design tokens y tema claro/oscuro (`next-themes`)
- **Framer Motion** con `LazyMotion` (features diferidas)
- **three.js** para el hero WebGL (carga diferida y con fallback)
- **lucide-react** para iconografía

## Requisitos

- Node.js 20+
- npm

## Scripts

```bash
npm run dev      # Desarrollo en http://localhost:3000
npm run build    # Build de producción
npm run start    # Servir el build
npm run lint     # ESLint
```

## Variables de entorno

Todas son opcionales: si no se definen, el sitio usa los valores por defecto de
`src/lib/constants.ts`.

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (canonical, sitemap, JSON-LD). Por defecto: `https://aeperion.presentto.online`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp en formato internacional sin `+` (ej. `573000000000`). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo de contacto. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | URL del perfil de Instagram. |
| `NEXT_PUBLIC_LINKEDIN_URL` | URL de la página de LinkedIn. |
| `NEXT_PUBLIC_MP_LINK` | Link de pago de Mercado Pago. |
| `NEXT_PUBLIC_MP_PUBLIC_KEY` | Public key de Mercado Pago (uso futuro). |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Token opcional de verificación de Google Search Console. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Token opcional de verificación de Bing Webmaster Tools. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Endpoint del formulario de contacto. |
| `NEXT_PUBLIC_ADVISORY_ENDPOINT` | Endpoint del formulario de asesoría. |

## Estructura

```
src/
├── app/            # Rutas (App Router), SEO, sitemap, robots y OG image
├── components/
│   ├── animations/ # Efectos reutilizables (respetan prefers-reduced-motion)
│   ├── demo/       # Demos interactivas por tipo de solución
│   ├── features/   # Secciones de la landing y páginas
│   ├── layout/     # Nav, footer, container, section, motion provider
│   ├── shared/     # Logo, botones de pago, JSON-LD
│   ├── theme/      # Proveedor y toggle de tema
│   └── ui/         # Primitivas (button, card, badge, input, dialog…)
├── lib/            # Datos, constantes, utilidades y fuentes
└── types/          # Tipos compartidos
```

## Despliegue

Optimizado para **Vercel**. El comando de build es `npm run build`.

## Accesibilidad y rendimiento

- Tema claro/oscuro/auto con `prefers-color-scheme`.
- Todas las animaciones respetan `prefers-reduced-motion`.
- WebGL con detección de gama baja y fallback CSS.
- Fuente self-hosted (`next/font`), sin requests externos en runtime.
