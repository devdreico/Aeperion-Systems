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
  image: string;
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
// DEMO
// ============================================================

export type DemoType = "terminal" | "visual" | "form" | "dashboard";

export interface DemoConfig {
  toolId: string;
  type: DemoType;
  title: string;
  description: string;
  duration: number;
  steps: DemoStep[];
  ctaText: string;
  ctaRoute: string;
  theme: "light" | "dark" | "auto";
}

export interface DemoStep {
  id: string;
  instruction: string;
  component: string;
  animation: "fade" | "slide" | "typewriter" | "scale";
  duration: number;
  nextLabel?: string;
}

// ============================================================
// BLOG
// ============================================================

export interface BlogPost {
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
  image: string;
}

// ============================================================
// COMPANY / ABOUT
// ============================================================

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  image: string;
}

// ============================================================
// FAQ
// ============================================================

export interface FAQItem {
  question: string;
  answer: string;
  category: "planes" | "proceso" | "pagos" | "soporte" | "general";
}

// ============================================================
// METADATA HELPERS
// ============================================================

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}
