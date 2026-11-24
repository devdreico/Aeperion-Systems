import type { Testimonial } from "@/types";

export const REVIEWS: Testimonial[] = [
  {
    id: "r1",
    name: "Camila Restrepo",
    role: "CTO",
    company: "Fintech andina",
    city: "Bogotá",
    rating: 5,
    quote:
      "KSPR reconstruyó un core de 12 años que nadie entendía. La documentación que generó se volvió la fuente de verdad del equipo.",
    plan: "KSPR · Ingeniería inversa",
    featured: true,
    date: "2026-02-14",
  },
  {
    id: "r2",
    name: "Ricardo Peña",
    role: "Head of Security",
    company: "SaaS B2B",
    city: "Medellín",
    rating: 5,
    quote:
      "AELOCK redujo el ruido del SOC en 72%. Ahora el equipo investiga lo que importa y responde en minutos, no en horas.",
    plan: "AELOCK · Ciberseguridad",
    featured: true,
    date: "2026-01-22",
  },
  {
    id: "r3",
    name: "Julián Ospina",
    role: "Gerente Comercial",
    company: "Distribuidora nacional",
    city: "Cali",
    rating: 5,
    quote:
      "El flujo agéntico de ventas no se cansa ni olvida. Pasamos de perder el 40% de los leads a responder el 86%.",
    plan: "Piloto agéntico",
    featured: true,
    date: "2025-11-08",
  },
  {
    id: "r4",
    name: "Laura Gómez",
    role: "Socia",
    company: "Firma jurídica",
    city: "Bogotá",
    rating: 5,
    quote:
      "Buscábamos respuestas con fuente, no un chatbot creativo. La capa RAG con citas y permisos cambió nuestra operación.",
    plan: "Plataforma · RAG",
    date: "2025-10-19",
  },
  {
    id: "r5",
    name: "Andrés Villalba",
    role: "Director de Operaciones",
    company: "Operador logístico",
    city: "Barranquilla",
    rating: 5,
    quote:
      "Los agentes multimodales procesan 2.400 documentos al día. El equipo dejó de digitar y empezó a supervisar.",
    plan: "Plataforma · Agentes",
    date: "2025-08-30",
  },
  {
    id: "r6",
    name: "María Fernanda Ruiz",
    role: "Propietaria",
    company: "Negocio gastronómico",
    city: "Pereira",
    rating: 5,
    quote:
      "Yo vendo comida, no entiendo de hosting. Presentto administra todo y mi página nunca se cae.",
    plan: "Presentto Online",
    date: "2025-07-12",
  },
];
/** Alias de compatibilidad con la sección de reseñas. */
export const TESTIMONIALS = REVIEWS;

export const REVIEW_SUMMARY = {
  average: 4.9,
  total: 38,
  distribution: [
    { stars: 5, percent: 92 },
    { stars: 4, percent: 6 },
    { stars: 3, percent: 2 },
    { stars: 2, percent: 0 },
    { stars: 1, percent: 0 },
  ],
} as const;
