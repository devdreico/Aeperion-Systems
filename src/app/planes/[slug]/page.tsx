import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  X,
  Sparkles,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { PLANS } from "@/lib/plans-data";
import { formatCOP } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaymentButtons } from "@/components/shared/payment-buttons";
import { PlanHero } from "./plan-hero";

interface PlanPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PLANS.filter((p) => p.id !== "asesoria").map((plan) => ({
    slug: plan.id,
  }));
}

export async function generateMetadata({ params }: PlanPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = PLANS.find((p) => p.id === slug);
  if (!plan) return { title: "Plan no encontrado" };
  return {
    title: plan.name,
    description: `${plan.description} Desde ${formatCOP(plan.price)}.`,
  };
}

export default async function PlanPage({ params }: PlanPageProps) {
  const { slug } = await params;
  const plan = PLANS.find((p) => p.id === slug && p.id !== "asesoria");
  if (!plan) notFound();

  const included = plan.features.filter((f) => f.included);
  const excluded = plan.features.filter((f) => !f.included);

  return (
    <div className="pt-20">
      <PlanHero plan={plan} />

      <section className="py-16 md:py-20 bg-surface">
        <Container className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-6">
              ¿Qué incluye {plan.name}?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {included.map((feature) => (
                <div
                  key={feature.name}
                  className="flex items-start gap-3 rounded-2xl glass-card p-4"
                >
                  <Check className="h-5 w-5 text-ae-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-fg-muted">{feature.name}</span>
                </div>
              ))}
            </div>

            {excluded.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-fg mt-10 mb-4">
                  No incluido en este plan
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {excluded.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex items-start gap-3 rounded-2xl border border-border p-4 opacity-70"
                    >
                      <X className="h-5 w-5 text-fg-subtle shrink-0 mt-0.5" />
                      <span className="text-sm text-fg-subtle">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="mt-10 rounded-3xl glass-card p-6">
              <h3 className="text-lg font-bold text-fg mb-4">
                Cómo funciona este plan
              </h3>
              <ol className="space-y-4">
                {[
                  "Diagnóstico gratuito de tu operación.",
                  "Propuesta y cronograma a tu medida.",
                  "Implementación en " + plan.deliveryDays + " días.",
                  `Soporte durante ${plan.supportMonths} mes(es) tras la entrega.`,
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="h-7 w-7 rounded-full bg-ae-green-400/15 text-ae-green-600 dark:text-ae-green-300 text-sm font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-fg-muted pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 h-fit rounded-3xl glass-strong p-7">
            {plan.badge && (
              <Badge variant="default" className="mb-4">
                <Sparkles className="h-3 w-3" />
                {plan.badge}
              </Badge>
            )}
            <h2 className="text-2xl font-extrabold text-fg">{plan.name}</h2>
            <p className="text-sm text-fg-subtle mt-1">{plan.subtitle}</p>

            <div className="mt-6 text-4xl font-extrabold text-fg">
              {formatCOP(plan.price)}
            </div>
            <p className="text-xs text-fg-subtle mt-1">pago único · COP</p>

            <div className="mt-6 space-y-2 text-sm text-fg-muted">
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-ae-green-500" />
                Entrega en {plan.deliveryDays} días
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-ae-green-500" />
                {plan.supportMonths} mes(es) de soporte
              </p>
            </div>

            <div className="mt-7">
              <PaymentButtons
                planName={plan.name}
                amount={plan.price}
                mercadoPagoLink={plan.mercadoPagoLink}
              />
            </div>

            <Link href="/asesoria" className="block mt-4">
              <Button variant="secondary" size="lg" className="w-full group">
                Hablar con un asesor
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>

            <p className="text-[11px] text-fg-subtle text-center mt-4">
              {plan.idealFor}
            </p>
          </aside>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-surface-1">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-3">
            ¿Listo para empezar?
          </h2>
          <p className="text-fg-muted max-w-xl mx-auto mb-8">
            Agenda una asesoría gratuita y confirmamos si este plan es el
            adecuado para tu negocio.
          </p>
          <Link href="/asesoria">
            <Button variant="primary" size="xl" className="group">
              Asesoría Gratuita
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
