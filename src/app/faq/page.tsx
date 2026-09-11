import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { FAQSection } from "./faq-client";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Respuestas a las preguntas más comunes sobre los planes, herramientas, proceso de trabajo y soporte de Aeperion Systems.",
};

/**
 * AEPERION — FAQ Page
 *
 * HANDOFF-FRONTEND:
 *   - Accordion: animación de expansión con framer-motion
 *   - Categorías: filter tabs animados
 *   - Búsqueda (opcional): filtro en tiempo real
 */
export default function FAQPage() {
  return (
    <div className="pt-20">
      <Section variant="default" size="lg">
        <Container variant="narrow">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-ae-gray-900 tracking-tight mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-ae-gray-500 max-w-xl mx-auto">
              Respuestas rápidas a las dudas más comunes. Si no encuentras lo que buscas,
              escríbenos directamente.
            </p>
          </div>

          <FAQSection />

          <div className="mt-12 text-center p-8 rounded-2xl bg-ae-gray-50 border border-ae-gray-100">
            <h2 className="text-xl font-semibold text-ae-gray-900 mb-2">
              ¿Aún tienes dudas?
            </h2>
            <p className="text-sm text-ae-gray-500 mb-6">
              Escríbenos por WhatsApp o agenda una asesoría gratuita.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/asesoria">
                <Button variant="primary" size="lg">
                  Asesoría Gratuita
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a
                href="https://wa.me/573001234567"
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
