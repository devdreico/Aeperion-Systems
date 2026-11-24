import { m } from "framer-motion";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Seo } from "@/components/shared/seo";
import { SITE_CONFIG } from "@/lib/constants";

export default function Contacto() {
  return (
    <>
      <Seo
        title="Contacto — Aeperion Systems"
        description="Habla con Aeperion Systems. WhatsApp, correo y diagnóstico inicial para tu flujo de trabajo agéntico."
        path="/contacto"
      />

      <section className="relative overflow-hidden border-b border-border/60 bg-surface">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-cyan-400/[0.06] blur-[140px]" />
        <Container className="relative py-16 md:py-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-300">
              Contacto
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-fg md:text-5xl">
              Hablemos de tu siguiente flujo.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              Respondemos en menos de una hora hábil. Si ya sabes qué proceso
              quieres transformar, usa la cotización para llegar con contexto.
            </p>
          </m.div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                label: "WhatsApp directo",
                value: SITE_CONFIG.contact.phoneDisplay,
                href: SITE_CONFIG.links.whatsapp,
              },
              {
                icon: Mail,
                label: "Correo",
                value: SITE_CONFIG.links.email,
                href: `mailto:${SITE_CONFIG.links.email}`,
              },
              {
                icon: MapPin,
                label: "Base",
                value: `${SITE_CONFIG.city}, ${SITE_CONFIG.country}`,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <Icon className="h-5 w-5 text-ae-green-400" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="mt-1 block text-sm font-semibold text-fg hover:text-ae-green-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-fg">{item.value}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-ae-green-400" />
              <div>
                <p className="text-sm font-semibold text-fg">{SITE_CONFIG.contact.businessHours}</p>
                <p className="text-xs text-fg-muted">{SITE_CONFIG.contact.responseTime}</p>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href="/cotizacion">
                Ir a cotización
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}