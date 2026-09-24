import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Mail, Clock, CreditCard } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { PAYMENT_METHODS, SITE_CONFIG } from "@/lib/constants";
import { ContactForm } from "./contact-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description:
    "Contáctanos por WhatsApp, email o formulario. Paga con Mercado Pago. Respuesta en menos de 1 hora.",
  path: "/contacto",
  keywords: [
    "contacto Aeperion Systems",
    "desarrollo de software Bogotá",
    "asesoría automatización Colombia",
  ],
});

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <Section variant="glass" size="lg">
        <Container>
          <SectionHeader
            badge="Contacto"
            title="Hablemos de tu proyecto"
            description="Estamos listos para escuchar tu operación y proponerte una solución. Respondemos en menos de 1 hora en horario laboral."
            level="h1"
          />

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <a
                href={SITE_CONFIG.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 rounded-3xl glass-card hover:border-ae-green-400/40 transition-colors"
              >
                <span className="h-11 w-11 rounded-2xl bg-ae-green-400/15 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5 text-ae-green-500" />
                </span>
                <span>
                  <span className="block font-bold text-fg">WhatsApp</span>
                  <span className="block text-sm text-fg-muted mb-1">
                    {SITE_CONFIG.contact.responseTime}
                  </span>
                  <span className="text-sm font-semibold text-ae-green-600 dark:text-ae-green-300">
                    {SITE_CONFIG.contact.phoneDisplay}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.links.email}`}
                className="flex items-start gap-4 p-6 rounded-3xl glass-card hover:border-ae-green-400/40 transition-colors"
              >
                <span className="h-11 w-11 rounded-2xl bg-ae-green-400/15 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-ae-green-500" />
                </span>
                <span>
                  <span className="block font-bold text-fg">Email</span>
                  <span className="block text-sm text-fg-muted mb-1">
                    Respuesta en menos de 24 horas
                  </span>
                  <span className="text-sm font-semibold text-ae-green-600 dark:text-ae-green-300">
                    {SITE_CONFIG.links.email}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4 p-6 rounded-3xl glass-card">
                <span className="h-11 w-11 rounded-2xl bg-ae-green-400/15 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-ae-green-500" />
                </span>
                <span>
                  <span className="block font-bold text-fg">Horario</span>
                  <span className="block text-sm text-fg-muted">
                    {SITE_CONFIG.contact.businessHours}
                    <br />
                    Sábados: 9:00 - 13:00
                  </span>
                </span>
              </div>

              <div className="p-6 rounded-3xl glass-card">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-11 w-11 rounded-2xl bg-ae-green-400/15 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-ae-green-500" />
                  </span>
                  <span className="font-bold text-fg">Pago seguro</span>
                </div>
                <p className="text-sm text-fg-muted mb-4">
                  Paga tu plan o solución con los medios que prefieras.
                </p>
                <div className="flex flex-wrap gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <a
                      key={method.id}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold rounded-full border border-border px-3.5 py-2 text-fg-muted hover:text-ae-green-600 dark:hover:text-ae-green-300 hover:border-ae-green-400/40 transition-colors"
                    >
                      {method.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-ae-green-400/30 bg-ae-green-400/5">
                <h3 className="font-bold text-fg mb-2">¿Primera vez?</h3>
                <p className="text-sm text-fg-muted mb-4">
                  Agenda una asesoría gratuita de 30 minutos. Sin compromiso.
                </p>
                <Link
                  href="/asesoria"
                  className="text-sm font-semibold text-ae-green-600 dark:text-ae-green-300 hover:underline"
                >
                  Agendar asesoría gratuita →
                </Link>
              </div>
            </div>

            <ContactForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
