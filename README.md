# Aeperion Systems

Aeperion Systems es una plataforma de soluciones digitales construida con Next.js, React y Tailwind CSS.

## Desarrollo local

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`.

## Scripts

```bash
npm run build        # Compilacion de produccion y export estatico
npm run build:static # Compilacion mas correccion de rutas relativas
npm run start        # Servir la salida de produccion
npm run serve        # Servir out/ como sitio estatico
npm run lint         # Ejecutar ESLint
```

La aplicacion esta en la raiz del repositorio para que plataformas como Vercel, Netlify o GitHub Actions detecten automaticamente `package.json`, `src/` y `public/`.

## Rutas principales

- `/` - Pagina principal
- `/asesoria` - Asesoria gratuita
- `/planes` - Planes de precios
- `/herramientas` - Catalogo de herramientas
- `/demo/[slug]` - Demos interactivas
- `/blog` y `/blog/[slug]` - Blog
- `/faq` - Preguntas frecuentes
- `/contacto` - Contacto

Los recursos de `Aeperion Modules/` son material separado del frontend y no participan en el build de Next.js.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
