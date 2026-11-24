/**
 * AEPERION — Blog / Notas técnicas
 */
export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  publishedAtISO: string;
  modifiedAtISO?: string;
  readingTime: number;
  category: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    slug: "que-es-un-flujo-de-trabajo-agentico",
    title: "Qué es un flujo de trabajo agéntico (y qué no lo es)",
    excerpt:
      "No todo chatbot es un agente. Un flujo agéntico tiene objetivo, herramientas, memoria, permisos y evaluación. Esta es la diferencia que importa en producción.",
    content: `
      <p>La palabra “agente” se usa para todo. Un chatbot con respuestas precargadas no es un agente. Un prompt que resume texto tampoco. Un flujo de trabajo agéntico es un sistema que recibe un objetivo, decide pasos, usa herramientas y ejecuta acciones con supervisión.</p>
      <h2>Los cinco componentes</h2>
      <p><strong>1. Objetivo:</strong> el agente sabe qué resultado debe producir, no solo qué decir.</p>
      <p><strong>2. Herramientas:</strong> APIs, bases de datos, correo, CRM. Sin herramientas, el agente solo habla.</p>
      <p><strong>3. Memoria:</strong> contexto de la tarea y del negocio. Sin memoria, cada ejecución empieza de cero.</p>
      <p><strong>4. Permisos:</strong> qué puede leer, escribir y ejecutar. La autonomía sin límites es un incidente esperando ocurrir.</p>
      <p><strong>5. Evaluación:</strong> métricas de calidad, costo, latencia y riesgo. Sin evaluación no hay producción, solo fe.</p>
      <h2>Qué no es un flujo agéntico</h2>
      <p>Un asistente que solo responde preguntas. Un script que ejecuta pasos fijos sin decidir. Un modelo con acceso total a todo. Un demo que funciona con tres ejemplos cuidadosamente elegidos.</p>
      <p>La diferencia entre un demo y un sistema es la misma que entre una idea y una operación: evidencia.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "Ingeniería",
    publishedAt: "12 Nov 2026",
    publishedAtISO: "2026-11-12T08:00:00-05:00",
    readingTime: 5,
    category: "Agentes",
    tags: ["Agentes", "Producción", "Evaluación"],
  },
  {
    slug: "ingenieria-inversa-con-agentes",
    title: "Ingeniería inversa con agentes: cómo KSPR entiende un sistema legado",
    excerpt:
      "Reconstruir la lógica de un sistema de 12 años no es leer código. Es recuperar reglas, dependencias y decisiones que nadie documentó. Así lo hace KSPR.",
    content: `
      <p>Los sistemas legados no fallan por falta de código. Fallan porque nadie recuerda por qué el código hace lo que hace. La documentación está desactualizada, las reglas viven en la cabeza de alguien que se fue y cada cambio es una apuesta.</p>
      <h2>El problema real</h2>
      <p>Antes de migrar, integrar o reemplazar, hay que entender. La ingeniería inversa tradicional es manual, lenta y depende de heroicidades individuales. Los agentes cambian la economía de ese proceso.</p>
      <h2>Cómo opera KSPR</h2>
      <p><strong>Lectura multi-repositorio:</strong> los agentes SPR recorren código, infraestructura, migraciones y documentación.</p>
      <p><strong>Extracción de reglas:</strong> identifican condiciones, validaciones y flujos de negocio, y los contrastan entre capas.</p>
      <p><strong>Mapa de dependencias:</strong> reconstruyen qué depende de qué, qué es crítico y dónde intervenir primero.</p>
      <p><strong>Documentación viva:</strong> generan especificaciones que se actualizan cuando el sistema cambia.</p>
      <h2>El resultado</h2>
      <p>No es un informe bonito. Es un mapa de intervención con evidencia: qué se puede tocar, qué no, y qué riesgo tiene cada decisión.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "KSPR",
    publishedAt: "28 Oct 2026",
    publishedAtISO: "2026-10-28T08:00:00-05:00",
    readingTime: 6,
    category: "Ingeniería inversa",
    tags: ["KSPR", "Legacy", "Agentes"],
  },
  {
    slug: "ciberseguridad-agentica-donde-si-donde-no",
    title: "Ciberseguridad agéntica: dónde sí y dónde no",
    excerpt:
      "Un agente puede triagear alertas y preparar respuesta. No debería decidir solo un bloqueo crítico. Estos son los límites que aplicamos en AELOCK.",
    content: `
      <p>La ciberseguridad es un dominio donde la autonomía mal calibrada es más peligrosa que la falta de automatización. Un falso positivo puede tumbar un servicio; un falso negativo puede abrir una brecha.</p>
      <h2>Dónde un agente aporta</h2>
      <p>Correlación de señales, enriquecimiento de alertas, triage inicial, búsqueda de contexto, generación de hipótesis, preparación de playbooks y documentación de evidencia.</p>
      <h2>Dónde el humano decide</h2>
      <p>Acciones destructivas, cambios de producción, comunicación externa, decisiones legales y cualquier respuesta con impacto irreversible.</p>
      <h2>El principio</h2>
      <p>El agente amplifica la capacidad del equipo, no sustituye su criterio. AELOCK está diseñado con human-in-the-loop para acciones críticas y con trazabilidad completa de cada recomendación.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "AELOCK",
    publishedAt: "14 Oct 2026",
    publishedAtISO: "2026-10-14T08:00:00-05:00",
    readingTime: 4,
    category: "Ciberseguridad",
    tags: ["AELOCK", "Seguridad", "Human-in-the-loop"],
  },
  {
    slug: "evaluar-un-agente-antes-de-produccion",
    title: "Cómo evaluar un agente antes de ponerlo en producción",
    excerpt:
      "Calidad, costo, latencia, seguridad y regresión. Un checklist práctico para decidir si un agente está listo o solo parece estarlo.",
    content: `
      <p>Un agente que responde bien en una demo no está listo para producción. Producción significa usuarios reales, datos sucios, casos límite y consecuencias.</p>
      <h2>Las cinco evaluaciones</h2>
      <p><strong>Calidad:</strong> ¿resuelve la tarea? ¿con qué frecuencia? ¿con qué tipo de errores?</p>
      <p><strong>Costo:</strong> ¿cuánto cuesta cada ejecución y cada resultado exitoso?</p>
      <p><strong>Latencia:</strong> ¿el tiempo de respuesta es compatible con el proceso?</p>
      <p><strong>Seguridad:</strong> ¿puede filtrar datos, ejecutar acciones no permitidas o ser manipulado?</p>
      <p><strong>Regresión:</strong> ¿qué pasa cuando cambia el modelo, el prompt o una herramienta?</p>
      <h2>El criterio</h2>
      <p>No preguntamos “¿funciona?”. Preguntamos “¿bajo qué condiciones deja de funcionar y qué pasa cuando eso ocurre?”. Esa respuesta es la que separa un piloto de un sistema.</p>
    `,
    author: "Equipo Aeperion",
    authorRole: "Ingeniería",
    publishedAt: "30 Sep 2026",
    publishedAtISO: "2026-09-30T08:00:00-05:00",
    readingTime: 5,
    category: "Producción",
    tags: ["Evaluación", "Producción", "Calidad"],
  },
];

export const BLOG_POST_MAP = Object.fromEntries(
  BLOG_POSTS.map((post) => [post.slug, post])
) as Record<string, BlogPostData>;