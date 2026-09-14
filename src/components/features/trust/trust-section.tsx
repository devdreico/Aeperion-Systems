"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { CounterAnimation } from "@/components/animations/counter-animation";
import { SectionTransition } from "@/components/animations/section-transition";
import { Container } from "@/components/layout/container";
import { TRUST_METRICS, COMPANY_VALUES } from "@/lib/constants";
import { TrendingUp, Users, Clock, Star } from "lucide-react";

interface TrustSectionProps {
  className?: string;
}

const metricIcons = [TrendingUp, Users, Clock, Star] as const;

export function TrustSection({ className }: TrustSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={cn("py-20 md:py-28 bg-white relative overflow-hidden", className)}>
      <Container>
        {/* Metrics Grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: TRUST_METRICS.clientsServed, label: "Clientes atendidos", suffix: "+" },
            { value: TRUST_METRICS.toolsOffered, label: "Herramientas disponibles", suffix: "" },
            { value: TRUST_METRICS.satisfactionRate, label: "Satisfacción", suffix: "%" },
            { value: TRUST_METRICS.yearsActive, label: "Años de experiencia", suffix: "+" },
          ].map((metric, i) => {
            const Icon = metricIcons[i];
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center bg-ae-gray-50/50 rounded-2xl p-6 border border-ae-gray-100"
              >
                <div className="h-10 w-10 rounded-xl bg-ae-green-50 flex items-center justify-center mx-auto mb-3 text-ae-green-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-ae-gray-900 mb-1">
                  <CounterAnimation
                    from={0}
                    to={metric.value}
                    duration={2}
                    delay={i * 0.15 + 0.3}
                  />
                  {metric.suffix}
                </div>
                <p className="text-xs text-ae-gray-500 font-medium">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {COMPANY_VALUES.map((value, i) => (
            <SectionTransition key={value.title} delay={i * 0.1} direction="up">
              <div className="p-6 rounded-2xl border border-ae-gray-100 bg-white hover:border-ae-green-200 hover:shadow-md transition-all duration-300 group">
                <div className="h-10 w-10 rounded-lg bg-ae-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-ae-green-600 text-lg">{value.icon}</span>
                </div>
                <h3 className="text-base font-bold text-ae-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-ae-gray-500 leading-relaxed">{value.description}</p>
              </div>
            </SectionTransition>
          ))}
        </div>
      </Container>
    </section>
  );
}
