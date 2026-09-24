import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { MetodoTimeline } from "./metodo-timeline";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Método de trabajo",
  description:
    "Nuestra metodología de 5 fases: Diagnóstico, Análisis de brechas, Arquitectura, Implementación y Expansión.",
  path: "/metodo",
});

export default function MetodoPage() {
  return (
    <div className="pt-20">
      <Section variant="glass" size="lg">
        <Container variant="narrow" className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight mb-6">
            Nuestro método:
            <br />
            <span className="text-gradient-green">5 fases</span> para transformar tu negocio
          </h1>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto leading-relaxed">
            No improvisamos. Cada solución sigue un proceso probado que garantiza
            resolver el problema correcto, de la manera correcta.
          </p>
        </Container>
      </Section>

      <Section variant="alt" size="lg">
        <Container variant="narrow">
          <SectionHeader badge="Proceso" title="Un camino claro" align="center" />
          <MetodoTimeline />
        </Container>
      </Section>

      <Section variant="default" size="md">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-4">
            Comienza con la Fase 1 hoy
          </h2>
          <p className="text-fg-muted mb-8 max-w-md mx-auto">
            Agenda tu diagnóstico gratuito de 30 minutos. Sin compromiso.
          </p>
          <Link href="/asesoria">
            <Button variant="primary" size="xl" className="group">
              Agendar diagnóstico
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}
