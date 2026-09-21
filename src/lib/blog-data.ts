/**
 * AEPERION — Blog Posts Data
 */

export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    slug: "transformacion-digital-pymes-colombia",
    title: "Transformación Digital para PYMES en Colombia: Por dónde empezar",
    excerpt: "Guía práctica para pequeñas y medianas empresas que quieren dar el salto digital sin morir en el intento. Pasos concretos, herramientas clave y errores comunes.",
    content: `
      <p>La transformación digital ya no es una opción para las pequeñas y medianas empresas en Colombia. Es una necesidad competitiva. Sin embargo, muchos negocios no saben por dónde empezar y terminan paralizados frente a la decisión.</p>
      <p>En Aeperion, nuestro primer paso siempre es un diagnóstico. No vendemos sin entender. Y ese enfoque nos ha permitido ayudar a más de 150 negocios a dar el salto digital de forma ordenada.</p>
      <h2>Los 3 pilares de la transformación digital</h2>
      <p><strong>1. Presencia Digital:</strong> Tu sitio web es tu carta de presentación. No necesitas 10 páginas. Necesitas una página que comunique claramente qué haces.</p>
      <p><strong>2. Automatización de Procesos:</strong> WhatsApp, email, redes sociales. Automatizar no es reemplazar personas, es liberarlas para que hagan trabajo de verdad.</p>
      <p><strong>3. Gestión de Clientes:</strong> Un CRM no es un lujo. Es una necesidad. Si no tienes un registro organizado de tus clientes, estás perdiendo ventas todos los días.</p>
      <h2>Por dónde empezar hoy</h2>
      <p>El primer paso no es comprar software. Es tomar 30 minutos para hablar con alguien que entienda de transformación digital. Por eso ofrecemos asesorías gratuitas.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "Content",
    publishedAt: "15 Mayo 2026",
    readingTime: 8,
    category: "Transformación Digital",
    tags: ["pymes", "digitalización", "colombia"],
  },
  {
    slug: "automatizacion-whatsapp-ventas",
    title: "Automatización de Ventas con WhatsApp: Guía Completa 2026",
    excerpt: "Cómo implementar un sistema de ventas automatizado por WhatsApp que califica leads, responde al instante y cierra más ventas.",
    content: `
      <p>WhatsApp se ha convertido en el canal de comunicación más importante para los negocios en Latinoamérica. Con más de 50 millones de usuarios activos en Colombia, no es una opción — es el estándar.</p>
      <h2>¿Por qué automatizar WhatsApp?</h2>
      <p>La automatización de WhatsApp no se trata de enviar mensajes masivos. Se trata de responder al instante, calificar leads automáticamente y cerrar ventas mientras tu equipo duerme.</p>
      <h2>Casos de uso reales</h2>
      <p><strong>Restaurantes:</strong> Recibir pedidos por WhatsApp, confirmar automáticamente, y enviar actualizaciones de estado.</p>
      <p><strong>Tiendas:</strong> Catálogo interactivo, cotizaciones automáticas, seguimiento post-venta.</p>
      <p><strong>Servicios:</strong> Agenda de citas, recordatorios, notificaciones de pago.</p>
      <h2>Lo que necesitas para empezar</h2>
      <p>Un número de WhatsApp Business API, un sistema de gestión (como nuestro CRM), y reglas de automatización claras. Nosotros te ayudamos con todo.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "Product",
    publishedAt: "8 Mayo 2026",
    readingTime: 12,
    category: "Automatización",
    tags: ["whatsapp", "ventas", "automatización"],
  },
  {
    slug: "facturacion-electronica-dian-2026",
    title: "Facturación Electrónica DIAN 2026: Todo lo que debes saber",
    excerpt: "Actualización completa sobre los requisitos de facturación electrónica en Colombia. Resolución, plazos, sanciones y cómo cumplir sin complicaciones.",
    content: `
      <p>La facturación electrónica en Colombia sigue evolucionando. La DIAN ha implementado nuevos requisitos para 2026 que todos los negocios deben conocer.</p>
      <h2>¿Qué cambió en 2026?</h2>
      <p>Este año, la DIAN ha actualizado la resolución de facturación electrónica con nuevos campos obligatorios, plazos de reporte más estrictos, y mayores controles de validación en tiempo real.</p>
      <h2>Obligaciones principales</h2>
      <p>Si facturas electrónicamente, debes: validar la existencia del cliente en el RUT, incluir códigos de productos y servicios actualizados, reportar en los plazos establecidos, y conservar los documentos por 5 años.</p>
      <h2>Sanciones por incumplimiento</h2>
      <p>Las multas por no facturar electrónicamente pueden alcanzar los 15.000 UVT (más de 600 millones de pesos colombianos). No vale la pena arriesgarse.</p>
      <h2>Cómo cumplir sin complicaciones</h2>
      <p>Con nuestro sistema de facturación, todo el proceso está automatizado. Nosotros nos encargamos de las validaciones, los reportes y el cumplimiento normativo.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "Legal",
    publishedAt: "1 Mayo 2026",
    readingTime: 10,
    category: "Facturación",
    tags: ["dian", "facturación", "colombia", "legal"],
  },
  {
    slug: "crm-para-pequenos-negocios",
    title: "CRM para Pequeños Negocios: La herramienta que necesitas para organizar tus ventas",
    excerpt: "Deja el Excel. Descubre cómo un CRM puede transformar la gestión de clientes de tu negocio y aumentar tus ventas.",
    content: `
      <p>Si todavía estás manejando tus clientes en Excel, hojas sueltas o —peor— en tu memoria, este artículo es para ti.</p>
      <h2>¿Qué es un CRM y por qué lo necesitas?</h2>
      <p>CRM significa Customer Relationship Management. Es un sistema que centraliza toda la información de tus clientes: contactos, historial de compras, preferencias, interacciones, y más.</p>
      <h2>Señales de que necesitas un CRM</h2>
      <p>Has perdido una venta porque olvidaste hacer seguimiento. Tus clientes te repiten información que ya te dieron. No sabes quién compró qué ni cuándo. Tus descuentos son al azar.</p>
      <h2>Qué buscar en un CRM para PYME</h2>
      <p>Que sea fácil de usar (no necesitas un ingeniero), que tenga integración con WhatsApp, que permita automatizar seguimientos, y que tenga un precio claro sin costos ocultos. Como nuestro CRM básico.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "Product",
    publishedAt: "24 Abril 2026",
    readingTime: 7,
    category: "CRM",
    tags: ["crm", "ventas", "pequeños-negocios"],
  },
  {
    slug: "errores-comunes-presencia-digital",
    title: "5 Errores Comunes en Presencia Digital que están ahuyentando clientes",
    excerpt: "Identifica y corrige los errores más frecuentes que cometen los negocios colombianos en su presencia digital.",
    content: `
      <p>Tu presencia digital es muchas veces el primer contacto que un cliente potencial tiene con tu negocio. Si está mal, probablemente no haya segunda oportunidad.</p>
      <h2>Error 1: Sitio web que no carga en móvil</h2>
      <p>Más del 70% del tráfico web en Colombia viene de dispositivos móviles. Si tu sitio no está optimizado para móvil, estás perdiendo 7 de cada 10 clientes potenciales.</p>
      <h2>Error 2: Información de contacto difícil de encontrar</h2>
      <p>Si un cliente tiene que buscar más de 5 segundos para encontrar tu número de WhatsApp, lo pierdes. Pon tu contacto en un lugar visible y repetido.</p>
      <h2>Error 3: No tener WhatsApp Business</h2>
      <p>WhatsApp Business es gratis, profesionaliza tu comunicación, y permite automatizar respuestas. No tenerlo en 2026 es imperdonable.</p>
      <h2>Error 4: Redes sociales sin plan</h2>
      <p>Publicar sin estrategia es ruido. Define objetivos, público y métricas antes de publicar.</p>
      <h2>Error 5: No medir nada</h2>
      <p>Lo que no se mide no se mejora. Google Analytics es gratis. Instagram Insights es gratis. No hay excusa.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "Marketing",
    publishedAt: "17 Abril 2026",
    readingTime: 6,
    category: "Presencia Web",
    tags: ["web", "errores", "marketing"],
  },
  {
    slug: "pos-sistema-ventas-restaurante",
    title: "Sistema POS para Restaurantes: Cómo elegir el mejor para tu negocio",
    excerpt: "Todo lo que necesitas saber para elegir e implementar un sistema POS en tu restaurante. Comparativa, costos y funcionalidades clave.",
    content: `
      <p>Elegir un sistema POS para tu restaurante es una decisión que afecta directamente tus ingresos, la experiencia de tus clientes y la eficiencia de tu operación.</p>
      <h2>¿Qué debe tener un buen POS para restaurantes?</h2>
      <p>Gestión de mesas, comandas digitales, integración con cocina, control de inventario, facturación electrónica, y reportes de ventas en tiempo real. Todo esto lo ofrecemos en nuestro sistema POS.</p>
      <h2>Errores al elegir POS</h2>
      <p>Elegir el más barato (luego sale caro), no verificar que cumpla con facturación electrónica, no considerar la velocidad del internet en tu zona, y no capacitar al personal.</p>
      <h2>El costo real de un POS</h2>
      <p>Un buen POS no es un gasto, es una inversión. Con nuestro sistema, recuperas la inversión en los primeros meses gracias a la reducción de errores y el aumento en la eficiencia operativa.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "Product",
    publishedAt: "10 Abril 2026",
    readingTime: 9,
    category: "POS",
    tags: ["pos", "restaurantes", "ventas"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRecentPosts(count: number = 4): BlogPostData[] {
  return BLOG_POSTS.slice(0, count);
}
