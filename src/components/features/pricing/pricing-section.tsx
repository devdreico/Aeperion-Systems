"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/plans-data";
import { CounterAnimation } from "@/components/animations/counter-animation";
import { HoverCard } from "@/components/animations/hover-card";
import { SectionHeader } from "@/components/shared/section-header";
import { PaymentButtons } from "@/components/shared/payment-buttons";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  className?: string;
  showHeader?: boolean;
  showPayments?: boolean;
}

export function PricingSection({
  className,
  showHeader = true,
  showPayments = false,
}: PricingSectionProps) {
  const paidPlans = PLANS.filter((p) => p.id !== "asesoria");

  return (
    <section className={cn("py-20 md:py-28 bg-surface-1 relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-ae-green-400/8 blur-[130px] -translate-y-1/2 translate-x-1/2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-ae-green-400/8 blur-[110px] translate-y-1/2 -translate-x-1/2" />

      <Container className="relative z-10">
        {showHeader && (
          <SectionHeader
            badge="Planes"
            title="Inversión clara, resultados reales"
            description="Elige el plan que mejor se adapte a tu negocio. Todos incluyen diagnóstico gratuito."
            align="center"
          />
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {paidPlans.map((plan, index) => (
            <m.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <HoverCard tiltDegree={4} scale={plan.highlight ? 1.03 : 1.02} glare={plan.highlight}>
                <div
                  className={cn(
                    "relative h-full p-8 rounded-3xl border transition-all duration-300",
                    plan.highlight
                      ? "glass-strong border-ae-green-400/40 shadow-xl shadow-ae-green-400/10"
                      : "glass-card border-border hover:border-border-strong"
                  )}
                >
                  {plan.highlight && (
                    <m.div
                      animate={{ opacity: [0.25, 0.5, 0.25] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-px rounded-3xl bg-gradient-to-r from-ae-green-400/25 via-ae-green-400/10 to-ae-green-400/25 blur-sm -z-10"
                    />
                  )}

                  {plan.badge && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ae-green-400/15 text-ae-green-700 dark:text-ae-green-300 text-[10px] font-bold mb-4">
                      <Sparkles className="h-3 w-3" />
                      {plan.badge}
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-fg mb-1">{plan.name}</h3>
                  <p className="text-xs text-fg-subtle mb-4">{plan.subtitle}</p>

                  <div className="mb-6">
                    <div className="text-3xl font-extrabold text-fg">
                      <CounterAnimation
                        from={0}
                        to={plan.price}
                        duration={1.5}
                        delay={index * 0.2 + 0.5}
                        formatFn={(v) => `$${Math.round(v).toLocaleString()}`}
                      />
                    </div>
                    <p className="text-xs text-fg-subtle mt-1">
                      {plan.deliveryDays > 0
                        ? `Entrega en ${plan.deliveryDays} días`
                        : "Implementación inmediata"}
                    </p>
                  </div>

                  <p className="text-sm text-fg-muted mb-6">{plan.description}</p>

                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={cn(
                            "h-4 w-4 mt-0.5 flex-shrink-0",
                            feature.included
                              ? "text-ae-green-500"
                              : "text-fg-subtle/50"
                          )}
                        />
                        <span className={feature.included ? "text-fg-muted" : "text-fg-subtle/70"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.ctaRoute} className="block">
                    <Button
                      variant={plan.highlight ? "primary" : "secondary"}
                      size="lg"
                      className="w-full group"
                    >
                      {plan.ctaText}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>

                  {showPayments && (
                    <div className="mt-4">
                      <PaymentButtons
                        planName={plan.name}
                        amount={plan.price}
                        showNote={false}
                      />
                    </div>
                  )}
                </div>
              </HoverCard>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-fg-muted mb-3">
            ¿No estás seguro de cuál elegir?
          </p>
          <Link href="/asesoria">
            <Button variant="secondary" size="lg" className="group">
              Asesoría Gratuita — te ayudamos a decidir
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </m.div>
      </Container>
    </section>
  );
}
