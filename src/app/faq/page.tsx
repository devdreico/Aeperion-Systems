import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { FAQSection } from "./faq-client";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas sobre planes, precios, pagos con Mercado Pago, proceso de trabajo, IA y soporte de Aeperion Systems.",
};

export default function FAQPage() {
  return (
    <div className="pt-20">
      <Section variant="glass" size="lg">
        <Container variant="narrow">
          <SectionHeader
            badge="Soporte"
            title="Preguntas frecuentes"
            description="Respuestas rápidas a las dudas más comunes. Si no encuentras lo que buscas, escríbenos directamente."
          />

          <FAQSection />

          <div className="mt-14 text-center p-8 rounded-3xl glass-card">
            <h2 className="text-xl font-bold text-fg mb-2">¿Aún tienes dudas?</h2>
            <p className="text-sm text-fg-muted mb-6">
              Escríbenos por WhatsApp o agenda una asesoría gratuita.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/asesoria">
                <Button variant="primary" size="lg" className="group">
                  Asesoría Gratuita
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <a
                href={SITE_CONFIG.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  WhatsApp directo
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
