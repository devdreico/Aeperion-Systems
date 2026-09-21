import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SITE_CONFIG } from "@/lib/constants";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos por WhatsApp, email o nuestro formulario online. Estamos listos para escuchar tu proyecto.",
};

/**
 * AEPERION — Contacto Page
 *
 * HANDOFF-FRONTEND:
 *   - Form: focus animations en inputs
 *   - Submit: loading state animado
 *   - Success: checkmark animado + confetti
 *   - Contact cards: stagger reveal
 */
export default function ContactoPage() {
  return (
    <div className="pt-20">
      <Section variant="default" size="lg">
        <Container variant="narrow">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-ae-gray-900 tracking-tight mb-4">
              Contáctanos
            </h1>
            <p className="text-lg text-ae-gray-500 max-w-xl mx-auto">
          Estamos listos para escuchar tu proyecto. Responde en menos de 1 hora en horario laboral.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-ae-gray-200 hover:border-ae-green-200 transition-colors">
                <h3 className="font-semibold text-ae-gray-900 mb-2">WhatsApp</h3>
                <p className="text-sm text-ae-gray-500 mb-3">{SITE_CONFIG.contact.responseTime}</p>
                <a
                  href={SITE_CONFIG.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ae-green-600 font-medium hover:underline text-sm"
                >
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
              </div>

              <div className="p-6 rounded-2xl border border-ae-gray-200 hover:border-ae-green-200 transition-colors">
                <h3 className="font-semibold text-ae-gray-900 mb-2">Email</h3>
                <p className="text-sm text-ae-gray-500 mb-3">Respuesta en menos de 24 horas</p>
                <a
                  href={`mailto:${SITE_CONFIG.links.email}`}
                  className="text-ae-green-600 font-medium hover:underline text-sm"
                >
                  {SITE_CONFIG.links.email}
                </a>
              </div>

              <div className="p-6 rounded-2xl border border-ae-gray-200 hover:border-ae-green-200 transition-colors">
                <h3 className="font-semibold text-ae-gray-900 mb-2">Horario</h3>
                <p className="text-sm text-ae-gray-500">
                  {SITE_CONFIG.contact.businessHours}<br />
                  Sábados: 9:00 - 13:00
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-ae-green-200 bg-ae-green-50/60">
                <h3 className="font-semibold text-ae-gray-900 mb-2">Pago seguro</h3>
                <p className="text-sm text-ae-gray-600 mb-4">
                  Paga por tu plan o herramienta con Mercado Pago, de forma segura y rápida.
                </p>
                <a
                  href={SITE_CONFIG.links.mercadoPago}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-ae-green-600 hover:underline"
                >
                  Ir a Mercado Pago →
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-ae-green-50 border border-ae-green-200">
                <h3 className="font-semibold text-ae-gray-900 mb-2">¿Primera vez?</h3>
                <p className="text-sm text-ae-gray-600 mb-4">
                  Agenda una asesoría gratuita de 30 minutos. Sin compromiso.
                </p>
                <a
                  href="/asesoria"
                  className="inline-flex items-center gap-1 text-sm font-medium text-ae-green-600 hover:underline"
                >
                  Agendar asesoría gratuita →
                </a>
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
