"use client";

import { CreditCard, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PAYMENT_METHODS } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/section-header";
import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/animations/marquee";

interface IntegrationsSectionProps {
  className?: string;
  showHeader?: boolean;
}

const INTEGRATIONS = [
  "WhatsApp Business",
  "DIAN",
  "Mercado Pago",
  "Wompi",
  "Google Workspace",
  "Microsoft 365",
  "Stripe",
  "Nequi",
  "Bancolombia",
  "OpenAI",
  "Meta Ads",
  "Shopify",
];

export function IntegrationsSection({
  className,
  showHeader = true,
}: IntegrationsSectionProps) {
  return (
    <section className={cn("py-20 md:py-24 bg-surface-1 relative overflow-hidden", className)}>
      <Container className="relative">
        {showHeader && (
          <SectionHeader
            badge="Integraciones"
            title="Conectamos todo tu ecosistema"
            description="Trabajamos con las herramientas que tu negocio ya usa y con los medios de pago que tus clientes prefieren."
            align="center"
          />
        )}

        {/* Payments */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {PAYMENT_METHODS.map((method, i) => (
            <a
              key={method.id}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl glass-card p-6 hover:border-ae-green-400/40 transition-all duration-300"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="h-11 w-11 rounded-2xl bg-ae-green-400/15 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-ae-green-500" />
                </span>
                <h3 className="text-lg font-bold text-fg">{method.name}</h3>
              </div>
              <p className="text-sm text-fg-muted">{method.description}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-fg-subtle">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-ae-green-500" />
                  Pago seguro
                </span>
                <span className="inline-flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-ae-green-500" />
                  Activación inmediata
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-14">
          <Marquee duration={38}>
            {INTEGRATIONS.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="mx-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-fg-muted whitespace-nowrap"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ae-green-400" />
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </Container>
    </section>
  );
}
