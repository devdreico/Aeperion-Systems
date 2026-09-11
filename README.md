# Aeperion Systems

## Descripción

Aeperion Systems es una plataforma de soluciones digitales enfocada en analizar, categorizar y brindar soluciones a negocios con problemas operativos.

## Estructura del Proyecto

```
Aeperion-Systems/
├── Aeperion Web-App/
│   ├── Aeperion App Web/          # Aplicación principal (Next.js)
│   └── Aeperion Modules/          # Módulos de servicios
└── README.md
```

## Stack Tecnológico

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS v4 con tokens personalizados
- **Animaciones**: Framer Motion
- **Estado**: React hooks

## Instalación

```bash
cd "Aeperion Web-App/Aeperion App Web"
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el resultado.

## Comandos disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm run build:static # Build estático para servidores sin Node
npm run serve        # Servir build estático en puerto 3000
npm run lint         # Ejecutar linter
```

## Estructura de Rutas

- `/` - Landing page
- `/asesoria` - Asesoría gratuita (quiz)
- `/planes` - Planes de precios
- `/herramientas` - Catálogo de herramientas (39 herramientas)
- `/herramientas/[slug]` - Detalle de herramienta
- `/demo/[slug]` - Demo interactiva
- `/about` - Sobre Aeperion
- `/metodo` - Nuestro método
- `/blog` - Blog
- `/blog/[slug]` - Artículo del blog
- `/faq` - Preguntas frecuentes
- `/contacto` - Contacto

## Características Principales

### 1. **Asesoría Gratuita** (`/asesoria`)
- Quiz interactivo de 5 preguntas
- Diagnóstico automático
- Recomendación de plan personalizada
- Agendamiento de cita

### 2. **Catálogo de Herramientas**
- 39 herramientas individuales
- 10 categorías
- Búsqueda y filtros
- Demos interactivas para 12 herramientas

### 3. **Sistema de Planes**
- **Standart**: Entrada básica
- **Fullpack**: Solución integral
- **Syspack**: Enterprise completo
- Comparación interactiva

### 4. **Demos Interactivas**
- Terminal (typewriter)
- Visual (interfaz mockup)
- Formulario (validación)
- Dashboard (KPIs y gráficos)

## Datos y Configuración

### Archivos de datos
- `src/lib/constants.ts` - Configuración global
- `src/lib/plans-data.ts` - Planes y precios
- `src/lib/tools-data.ts` - Catálogo de 39 herramientas
- `src/lib/blog-data.ts` - 6 artículos del blog

### Diseño
- `src/app/globals.css` - Tokens de diseño (colores, tipografía, sombras)
- Tema verde primario: `#6EC45E`
- Escala de grises: `ae-gray-{50...900}`

## Componentes Principales

### UI Primitives
- `Button` (5 variants, 5 sizes)
- `Card` (5 subcomponentes)
- `Badge` (6 variants)
- `Input`, `Dialog`, `Separator`

### Animaciones
- `ParticleSystem` - Efecto de partículas
- `MagneticButton` - Botón con efecto magnético
- `CounterAnimation` - Números animados
- `TextReveal` - Texto con reveal
- `StaggerReveal` - Stagger grid
- Y más...

## Performance & Accesibilidad

- ✅ Responsive design (mobile-first)
- ✅ Lazy loading de componentes
- ✅ Respeta `prefers-reduced-motion`
- ✅ SEO optimizado (Next.js metadata)
- ✅ Accessibility: ARIA labels, semantic HTML

## Deploy

### Vercel (recomendado)
```bash
npm run build
# Pushea a GitHub y conecta con Vercel
```

### Servidor estático
```bash
npm run build:static
npx serve@latest out/ -l 3000
```

## Soporte

- WhatsApp: +57 300 123 4567
- Email: contacto@aeperion.com
- Web: https://aeperion.systems

## Licencia

Privada - Aeperion Systems 2026
