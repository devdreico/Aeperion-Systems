/* ============================================================
   AEPERION SYSTEMS — Landing Page Principal
   ============================================================
   HANDOFF-FRONTEND (GENERAL):
   - Cada sección tiene comentarios con instrucciones específicas
   - NO modificar estructura de secciones ni props
   - SÍ agregar animaciones, transiciones y microinteracciones
   - Las animaciones clave están marcadas con HANDOFF-FRONTEND
   ============================================================ */

import { CinematicHero } from "@/components/features/hero/cinematic-hero";
import { CapabilitiesGrid } from "@/components/features/capabilities/capabilities-grid";
import { PricingSection } from "@/components/features/pricing/pricing-section";
import { ToolsShowcase } from "@/components/features/tools/tools-showcase";
import { TrustSection } from "@/components/features/trust/trust-section";
import { FinalCTA } from "@/components/features/trust/final-cta";

export default function HomePage() {
  return (
    <>
      {/* 
        HERO — Animación crítica
        Partículas, text-reveal, magnetic buttons, scroll indicator
      */}
      <CinematicHero />

      {/* 
        CAPABILITIES — Stagger reveal en cards
      */}
      <CapabilitiesGrid />

      {/* 
        PRICING — Counter en precios, highlight card glow
      */}
      <PricingSection />

      {/* 
        TOOLS — Grid de 10 categorías, hover effects
      */}
      <ToolsShowcase />

      {/* 
        TRUST — Counter animations en métricas, values stagger
      */}
      <TrustSection />

      {/* 
        FINAL CTA — Gradient background, text reveal
      */}
      <FinalCTA />
    </>
  );
}
