import type { Testimonial } from "@/types";

/**
 * Reseñas de clientes — contenido de ejemplo de alta fidelidad.
 * Reemplazar por reseñas verificadas cuando estén disponibles.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "r1",
    name: "Camila Restrepo",
    role: "Fundadora",
    company: "Clínica Dental Sonrisa Viva",
    city: "Bogotá",
    rating: 5,
    quote:
      "Antes perdíamos citas porque nadie contestaba el WhatsApp a tiempo. Ahora el sistema agenda, confirma y recuerda solo. Bajamos las citas perdidas casi a la mitad en dos meses.",
    plan: "Plan Fullpack",
    featured: true,
    date: "Marzo 2026",
  },
  {
    id: "r2",
    name: "Andrés Villalba",
    role: "Gerente General",
    company: "Distribuciones El Progreso",
    city: "Medellín",
    rating: 5,
    quote:
      "Teníamos todo en cuadernos y Excel. Aeperion entendió la operación antes de vendernos nada. Hoy facturamos electrónico y el inventario cuadra solo.",
    plan: "Plan Syspack",
    featured: true,
    date: "Febrero 2026",
  },
  {
    id: "r3",
    name: "Laura Gómez",
    role: "Directora Comercial",
    company: "Inmobiliaria Altavista",
    city: "Bogotá",
    rating: 5,
    quote:
      "El CRM cambió la forma en que seguimos a los clientes. Ya no se nos enfría un prospecto. Pasamos de cerrar 6 a 11 ventas mensuales.",
    plan: "Plan Fullpack",
    featured: true,
    date: "Enero 2026",
  },
  {
    id: "r4",
    name: "Julián Ospina",
    role: "Propietario",
    company: "Café Montaña Roja",
    city: "Pereira",
    rating: 5,
    quote:
      "Pedí una página web y terminé con un sistema completo de domicilios y POS. La relación calidad-precio es difícil de creer.",
    plan: "Plan Fullpack",
    date: "Diciembre 2025",
  },
  {
    id: "r5",
    name: "Daniela Cruz",
    role: "Coordinadora Administrativa",
    company: "Transportes Andinos SAS",
    city: "Bogotá",
    rating: 4,
    quote:
      "La implementación tomó un par de días más de lo prometido, pero el resultado valió la pena. El soporte responde rápido y en español claro.",
    plan: "Plan Standart",
    date: "Noviembre 2025",
  },
  {
    id: "r6",
    name: "Ricardo Peña",
    role: "CEO",
    company: "Fintech AhorraYa",
    city: "Bogotá",
    rating: 5,
    quote:
      "Necesitábamos automatizar conciliaciones y reportes con IA. El equipo de Aeperion es de otro nivel técnico. Nos ahorraron dos cargos operativos.",
    plan: "Proyecto a medida",
    featured: true,
    date: "Octubre 2025",
  },
  {
    id: "r7",
    name: "Valentina Arias",
    role: "Jefa de Marketing",
    company: "Estudio Creativo Nova",
    city: "Cali",
    rating: 5,
    quote:
      "La programación de redes y el creador de contenido nos devolvieron horas cada semana. Se nota que piensan en eficiencia, no en vender humo.",
    plan: "Plan Standart",
    date: "Septiembre 2025",
  },
  {
    id: "r8",
    name: "Mauricio Herrera",
    role: "Socio Fundador",
    company: "Constructora Sólida",
    city: "Bucaramanga",
    rating: 5,
    quote:
      "El dashboard de obra en tiempo real nos dejó ver por fin los sobrecostos a tiempo. Ya tomamos decisiones con datos y no con corazonadas.",
    plan: "Plan Syspack",
    date: "Agosto 2025",
  },
  {
    id: "r9",
    name: "Paula Sánchez",
    role: "Fundadora",
    company: "Pet Spa Huellitas",
    city: "Bogotá",
    rating: 5,
    quote:
      "Empecé sin ninguna herramienta digital. La asesoría gratis me dio un plan claro y hoy tengo agenda, recordatorios y pagos en línea.",
    plan: "Asesoría + Standart",
    date: "Julio 2025",
  },
  {
    id: "r10",
    name: "Felipe Ramírez",
    role: "Gerente de Operaciones",
    company: "Alimentos del Valle",
    city: "Yumbo",
    rating: 4,
    quote:
      "La automatización de correos y pedidos redujo errores de digitación. Buena comunicación durante todo el proyecto.",
    plan: "Plan Fullpack",
    date: "Junio 2025",
  },
];

export const REVIEW_SUMMARY = {
  average: 4.9,
  total: 87,
  distribution: [
    { stars: 5, percent: 91 },
    { stars: 4, percent: 7 },
    { stars: 3, percent: 1 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
} as const;
