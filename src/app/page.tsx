import { CinematicHero } from "@/components/features/hero/cinematic-hero";
import { CapabilitiesGrid } from "@/components/features/capabilities/capabilities-grid";
import { PricingSection } from "@/components/features/pricing/pricing-section";
import { ToolsShowcase } from "@/components/features/tools/tools-showcase";
import { ProjectsSection } from "@/components/features/projects/projects-section";
import { ReviewsSection } from "@/components/features/reviews/reviews-section";
import { IntegrationsSection } from "@/components/features/integrations/integrations-section";
import { TrustSection } from "@/components/features/trust/trust-section";
import { FinalCTA } from "@/components/features/trust/final-cta";

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
