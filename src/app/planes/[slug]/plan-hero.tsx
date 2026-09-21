"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { m } from "framer-motion";
import type { Plan } from "@/types";
import { AuroraBackground } from "@/components/animations/aurora-background";
import { CounterAnimation } from "@/components/animations/counter-animation";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export function PlanHero({ plan }: { plan: Plan }) {
  const isDarkPlan = plan.id === "syspack";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 md:py-28",
        isDarkPlan ? "bg-ae-gray-900 text-white" : "mesh-bg bg-surface"
      )}
    >
      <AuroraBackground />
      <Container className="relative z-10">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/planes"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-ae-green-500 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a planes
          </Link>

          <div className="max-w-3xl">
            {plan.badge && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ae-green-400/15 text-ae-green-700 dark:text-ae-green-300 border border-ae-green-400/25 text-xs font-bold mb-5">
                <Sparkles className="h-3 w-3" />
                {plan.badge}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              {plan.name}
            </h1>
            <p className="mt-4 text-lg text-fg-muted max-w-2xl leading-relaxed">
              {plan.description}
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3">
              <div className="text-4xl md:text-5xl font-extrabold text-ae-green-500">
                <CounterAnimation
                  from={0}
                  to={plan.price}
                  duration={1.4}
                  formatFn={(v) => `$${Math.round(v).toLocaleString()}`}
                />
              </div>
              <span className="text-sm text-fg-subtle pb-1">
                pago único · {plan.idealFor}
              </span>
            </div>
          </div>
        </m.div>
      </Container>
    </section>
  );
}
