import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PricingSection } from "@/components/features/pricing/pricing-section";
import { PaymentButtons } from "@/components/shared/payment-buttons";
import { SectionHeader } from "@/components/shared/section-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLAN_COMPARISON_HEADERS, PLAN_COMPARISON_ROWS } from "@/lib/plans-data";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Planes y precios",
  description:
    "Planes Standart ($200K), Fullpack ($450K) y Syspack ($1M). Todos incluyen diagnóstico gratuito. Paga con Mercado Pago o Wompi.",
};

export default function PlanesPage() {
  return (
    <div className="pt-20">
      <section className="relative overflow-hidden mesh-bg bg-surface py-16 md:py-24">
        <Container className="text-center relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ae-green-600 dark:text-ae-green-300">
            Soluciones para negocios en crecimiento
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight">
            Planes de ejecución
          </h1>
          <p className="mt-4 text-lg text-fg-muted max-w-3xl mx-auto">
            {SITE_CONFIG.valueProp}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/asesoria">
              <Button variant="primary" size="xl" className="group">
                Agendar diagnóstico gratuito
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Badge variant="glass" className="px-4 py-2">
              <Sparkles className="h-3.5 w-3.5 text-ae-green-500" />
              Diagnóstico y asesoría 100% gratis
            </Badge>
          </div>
        </Container>
      </section>

      <PricingSection showHeader={false} showPayments />

      <section className="py-16 md:py-24 bg-surface-1">
        <Container>
          <SectionHeader
            badge="Comparativa"
            title="Compara los planes en detalle"
            description="La asesoría gratuita aplica para cualquier negocio, sin compromiso de compra."
          />

          <div className="overflow-x-auto rounded-3xl glass-card">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  {PLAN_COMPARISON_HEADERS.map((header, i) => (
                    <th
                      key={header.key}
                      className={`py-4 px-4 font-bold ${
                        i === 0
                          ? "text-left text-fg"
                          : i === 2
                            ? "text-center text-ae-green-600 dark:text-ae-green-300 bg-ae-green-400/5"
                            : "text-center text-fg-muted"
                      }`}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-border last:border-0 hover:bg-surface-2/60 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-fg-muted">{row.feature}</td>
                    <td className="text-center py-3.5 px-4 text-fg-muted">{row.standart}</td>
                    <td className="text-center py-3.5 px-4 text-ae-green-700 dark:text-ae-green-300 bg-ae-green-400/5 font-semibold">
                      {row.fullpack}
                    </td>
                    <td className="text-center py-3.5 px-4 text-fg-muted">{row.syspack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
            <PaymentButtons planName="Plan Fullpack" amount={450000} showNote={false} />
            <p className="text-xs text-fg-subtle text-center sm:text-left self-center">
              Elige tu plan y paga en línea. También puedes agendar una asesoría
              y te acompañamos en la decisión.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
