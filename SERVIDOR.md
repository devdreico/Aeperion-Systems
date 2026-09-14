# AEPERION SYSTEMS — Servidor Estático

## Opción 1: Servidor Node.js (recomendado)

```bash
npx serve@latest out/ -l 3000
```

Abrir en navegador: http://localhost:3000

## Opción 2: Python

```bash
cd out && python3 -m http.server 3000
```

## Opción 3: VS Code Live Server

Usar la extensión Live Server y abrir `out/index.html`

## Opción 4: Abrir directamente (file://)

Navegar a `out/index.html` y abrir en el navegador.
- Las rutas funcionan con `../_next/` (relativas corregidas post-build)
- La navegación entre páginas carga cada HTML por separado (funciona sin servidor)
- Las fuentes de Google Fonts (Inter, JetBrains Mono) requieren conexión a internet

## Build

```bash
npm run build        # Build normal (Next.js server)
npm run build:static # Build estático en out/ (corrige rutas relativas automáticamente)
npm run serve        # Servir out/ en puerto 3000
```

## Post-build (corrección de rutas)

El script `fix-paths.py` se ejecuta automáticamente después de `npm run build:static`.
Corrige las rutas `./_next/` a `../_next/`, `../../_next/`, etc. según la profundidad de cada archivo HTML.
Esto permite que todos los assets (JS, CSS) carguen correctamente tanto en servidor estático como en file://.
