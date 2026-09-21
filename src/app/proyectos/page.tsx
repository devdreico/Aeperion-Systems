import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { Container } from "@/components/layout/container";
import { AuroraBackground } from "@/components/animations/aurora-background";
import { PROJECTS, PROJECT_INDUSTRIES } from "@/lib/projects-data";
import { ProjectsGridClient } from "./projects-grid-client";

export const metadata: Metadata = {
  title: "Proyectos y casos de éxito",
  description:
    "Casos reales de automatización, software a medida e IA en empresas colombianas. Resultados medibles con Aeperion Systems.",
};

export default function ProyectosPage() {
  return (
    <div className="pt-20">
      <section className="relative overflow-hidden mesh-bg bg-surface py-16 md:py-24">
        <AuroraBackground />
        <Container className="relative z-10">
          <SectionHeader
            badge="Proyectos"
            title="Casos que cambiaron operaciones"
            description="Cada proyecto parte de un problema real y termina en resultados medibles. Explora por industria."
          />
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-surface">
        <Container>
          <ProjectsGridClient
            projects={PROJECTS}
            industries={PROJECT_INDUSTRIES}
          />
        </Container>
      </section>
    </div>
  );
}
