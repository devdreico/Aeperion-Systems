"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/plans-data";
import { CounterAnimation } from "@/components/animations/counter-animation";
import { HoverCard } from "@/components/animations/hover-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { formatCOP } from "@/lib/utils";

interface PricingSectionProps {
  className?: string;
  showHeader?: boolean;
}

export function PricingSection({ className, showHeader = true }: PricingSectionProps) {
  const paidPlans = PLANS.filter((p) => p.id !== "asesoria");

  return (
    <section className={cn("py-20 md:py-28 bg-ae-gray-50 relative overflow-hidden", className)}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ae-green-400/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-ae-green-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

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
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <HoverCard tiltDegree={4} scale={plan.highlight ? 1.03 : 1.02} glare={plan.highlight}>
                <div
                  className={cn(
                    "relative h-full p-8 rounded-2xl border transition-all duration-300",
                    plan.highlight
                      ? "bg-white border-ae-green-200 shadow-xl shadow-ae-green-400/10"
                      : "bg-white border-ae-gray-200 hover:border-ae-gray-300 shadow-sm"
                  )}
                >
                  {/* Highlight Glow */}
                  {plan.highlight && (
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-ae-green-400/20 via-ae-green-400/10 to-ae-green-400/20 blur-sm -z-10"
                    />
                  )}

                  {/* Badge */}
                  {plan.badge && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ae-green-100 text-ae-green-700 text-[10px] font-semibold mb-4">
                      <Sparkles className="h-3 w-3" />
                      {plan.badge}
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-ae-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-ae-gray-500 mb-4">{plan.subtitle}</p>

                  {/* Price with Counter Animation */}
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-ae-gray-900">
                      <CounterAnimation
                        from={0}
                        to={plan.price}
                        duration={1.5}
                        delay={index * 0.2 + 0.5}
                        formatFn={(v) => `$${Math.round(v).toLocaleString()}`}
                      />
                    </div>
                    <p className="text-xs text-ae-gray-400 mt-1">
                      {plan.deliveryDays > 0 ? `Entrega en ${plan.deliveryDays} días` : "Implementación inmediata"}
                    </p>
                  </div>

                  <p className="text-sm text-ae-gray-600 mb-6">{plan.description}</p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={cn(
                            "h-4 w-4 mt-0.5 flex-shrink-0",
                            feature.included ? "text-ae-green-500" : "text-ae-gray-300"
                          )}
                        />
                        <span className={feature.included ? "text-ae-gray-700" : "text-ae-gray-400"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={plan.ctaRoute}>
                    <Button
                      variant={plan.highlight ? "primary" : "secondary"}
                      size="xl"
                      className="w-full"
                    >
                      {plan.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>

        {/* Free consultation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-ae-gray-500 mb-3">
            ¿No estás seguro de cuál elegir?
          </p>
          <Link href="/asesoria">
            <Button variant="secondary" size="lg">
              Asesoría Gratuita — Te ayudamos a decidir
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
