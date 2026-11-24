import { Seo } from "@/components/shared/seo";
import { AgenticHero } from "@/components/features/hero/agentic-hero";
import { ProductsShowcase } from "@/components/features/products/products-showcase";
import { CapabilitiesSection } from "@/components/features/capabilities/capabilities-section";
import { MethodSection } from "@/components/features/method/method-section";
import { CaseStudiesSection } from "@/components/features/projects/case-studies-section";
import { ReviewsSection } from "@/components/features/reviews/reviews-section";
import { ValueTiersSection } from "@/components/features/value/value-tiers-section";
import { AgenticCTA } from "@/components/features/trust/agentic-cta";
import { SITE_CONFIG } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Seo
        title="Aeperion Systems — Flujos de trabajo agénticos e IA aplicada"
        description={SITE_CONFIG.description}
        path="/"
      />
      <AgenticHero />
      <ProductsShowcase />
      <CapabilitiesSection />
      <MethodSection compact />
      <CaseStudiesSection limit={3} />
      <ReviewsSection limit={3} />
      <ValueTiersSection />
      <AgenticCTA />
    </>
  );
}