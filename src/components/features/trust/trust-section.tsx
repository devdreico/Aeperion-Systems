"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { CounterAnimation } from "@/components/animations/counter-animation";
import { SectionTransition } from "@/components/animations/section-transition";
import { Container } from "@/components/layout/container";
import { TRUST_METRICS, COMPANY_VALUES } from "@/lib/constants";
import {
  Search,
  Bot,
  Target,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

interface TrustSectionProps {
  className?: string;
}

const VALUE_ICONS: Record<string, LucideIcon> = {
  search: Search,
  bot: Bot,
  target: Target,
  "heart-handshake": HeartHandshake,
};

export function TrustSection({ className }: TrustSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const metrics = [
    { value: TRUST_METRICS.clientsServed, label: "Clientes atendidos", suffix: "+" },
    { value: TRUST_METRICS.toolsOffered, label: "Soluciones disponibles", suffix: "" },
    { value: TRUST_METRICS.satisfactionRate, label: "Satisfacción", suffix: "%" },
    { value: TRUST_METRICS.yearsActive, label: "Años de experiencia", suffix: "+" },
  ];

  return (
    <section className={cn("py-20 md:py-28 bg-surface relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[700px] rounded-full bg-ae-green-400/8 blur-[140px]" />
      <Container className="relative">
        {/* Metrics */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, i) => (
            <m.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient-green mb-1">
                <CounterAnimation
                  from={0}
                  to={metric.value}
                  duration={2}
                  delay={i * 0.15 + 0.3}
                />
                {metric.suffix}
              </div>
              <p className="text-sm text-fg-muted">{metric.label}</p>
            </m.div>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {COMPANY_VALUES.map((value, i) => {
            const Icon = VALUE_ICONS[value.icon] ?? Target;
            return (
              <SectionTransition key={value.title} delay={i * 0.1} direction="up">
                <div className="p-6 rounded-3xl glass-card hover:border-ae-green-400/40 transition-all duration-300 group h-full">
                  <div className="h-11 w-11 rounded-2xl bg-ae-green-400/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-ae-green-500" />
                  </div>
                  <h3 className="text-base font-bold text-fg mb-2">{value.title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{value.description}</p>
                </div>
              </SectionTransition>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
