import type { Metadata } from "next";
import { CinematicHero } from "@/components/features/hero/cinematic-hero";
import { CapabilitiesGrid } from "@/components/features/capabilities/capabilities-grid";
import { PricingSection } from "@/components/features/pricing/pricing-section";
import { ToolsShowcase } from "@/components/features/tools/tools-showcase";
import { ProjectsSection } from "@/components/features/projects/projects-section";
import { ReviewsSection } from "@/components/features/reviews/reviews-section";
import { IntegrationsSection } from "@/components/features/integrations/integrations-section";
import { TrustSection } from "@/components/features/trust/trust-section";
import { FinalCTA } from "@/components/features/trust/final-cta";
import { SITE_CONFIG } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  titleAbsolute: "Aeperion Systems — Automatización e IA para empresas",
  description: SITE_CONFIG.description,
  path: "/",
  keywords: [
    "desarrollo de software Colombia",
    "automatización empresarial",
    "inteligencia artificial para empresas",
    "fintech Bogotá",
    "transformación digital pymes",
    "CRM y facturación electrónica",
  ],
});

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <CapabilitiesGrid />
      <ReviewsSection limit={6} />
      <PricingSection />
      <ToolsShowcase />
      <ProjectsSection limit={3} />
      <IntegrationsSection />
      <TrustSection />
      <FinalCTA />
    </>
  );
}
