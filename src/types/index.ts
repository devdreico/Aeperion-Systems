/* ============================================================
   AEPERION SYSTEMS — Type Definitions
   ============================================================ */

// ============================================================
// PLANS & PRICING
// ============================================================

export type PlanId = "asesoria" | "standart" | "fullpack" | "syspack";

export interface PlanFeature {
  name: string;
  included: boolean;
  detail?: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  subtitle: string;
  price: number;
  currency: "COP";
  period: "one-time" | "monthly" | "custom";
  description: string;
  idealFor: string;
  highlight: boolean;
  ctaText: string;
  ctaRoute: string;
  features: PlanFeature[];
  deliveryDays: number;
  supportMonths: number;
  color: string;
  icon: string;
  badge?: string;
}

// ============================================================
// 39 TOOLS
// ============================================================

export type ToolCategory =
  | "web-presencia"
  | "automatizacion"
  | "crm-ventas"
  | "facturacion"
  | "pos-pagos"
  | "redes-sociales"
  | "administracion"
  | "analitica"
  | "comunicacion"
  | "diseno";

export interface Tool {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  price: number;
  icon: string;
  hasDemo: boolean;
  demoType?: "terminal" | "visual" | "form" | "dashboard";
  features: string[];
  requirements: string[];
  relatedTools: string[];
  complexity: 1 | 2 | 3;
  popularity: 1 | 2 | 3;
}

export interface ToolCategoryInfo {
  id: ToolCategory;
  name: string;
  icon: string;
  description: string;
}

// ============================================================
// LEAD / CONSULTING
// ============================================================

export interface QuizAnswers {
  businessSize: "less-3" | "3-10" | "more-10";
  mainChallenge: "web" | "automation" | "sales" | "admin" | "everything";
  hasWebsite: "yes" | "no" | "redesigning";
  usesTools: "none" | "crm" | "excel" | "whatsapp" | "other";
  timeline: "urgent" | "soon" | "no-rush";
}

export interface LeadFormData {
  name: string;
  email: string;
  whatsapp: string;
  company?: string;
  quizAnswers: QuizAnswers;
  recommendedPlan?: PlanId;
}

// ============================================================
// COMPANY / ABOUT
// ============================================================

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  clientName: string;
  industry: string;
  year: number;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  accent: string;
  tags: string[];
}

// ============================================================
// TESTIMONIALS / REVIEWS
// ============================================================

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  plan: string;
  featured?: boolean;
  date: string;
}

// ============================================================
// FAQ
// ============================================================

export interface FAQItem {
  question: string;
  answer: string;
  category: "planes" | "proceso" | "pagos" | "soporte" | "general";
}
