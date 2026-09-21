"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS, REVIEW_SUMMARY } from "@/lib/reviews-data";
import { SectionHeader } from "@/components/shared/section-header";
import { Container } from "@/components/layout/container";
import { CounterAnimation } from "@/components/animations/counter-animation";

interface ReviewsSectionProps {
  className?: string;
  limit?: number;
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export function ReviewsSection({ className, limit }: ReviewsSectionProps) {
  const reviews = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;

  return (
    <section className={cn("py-20 md:py-28 bg-surface-1 relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-ae-green-400/10 blur-[130px]" />
      <Container className="relative">
        <SectionHeader
          badge="Reseñas"
          title="Empresas que ya operan mejor"
          description="Más de 240 compañías en Colombia automatizan y crecen con Aeperion Systems."
          align="center"
        />

        {/* Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-14">
          <div className="text-center">
            <div className="text-5xl font-extrabold text-fg">
              <CounterAnimation from={0} to={REVIEW_SUMMARY.average} />
            </div>
            <div className="flex items-center gap-0.5 justify-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-ae-green-400 text-ae-green-400"
                />
              ))}
            </div>
            <p className="text-xs text-fg-subtle mt-1">
              {REVIEW_SUMMARY.total} reseñas verificadas
            </p>
          </div>

          <div className="w-px h-16 bg-border hidden sm:block" />

          <div className="w-full max-w-xs space-y-1.5">
            {REVIEW_SUMMARY.distribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-fg-muted">{row.stars}</span>
                <Star className="h-3 w-3 fill-ae-green-400 text-ae-green-400" />
                <div className="h-1.5 flex-1 rounded-full bg-surface-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-ae-green-400"
                  />
                </div>
                <span className="w-8 text-right text-fg-subtle">{row.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
          className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]"
        >
          {reviews.map((review) => (
            <motion.figure
              key={review.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="mb-5 break-inside-avoid rounded-3xl glass-card p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-ae-green-400 text-ae-green-400"
                    />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-ae-green-400/40" />
              </div>
              <blockquote className="text-sm text-fg-muted leading-relaxed">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-ae-green-400/15 text-ae-green-600 dark:text-ae-green-300 font-bold text-sm flex items-center justify-center">
                  {initials(review.name)}
                </span>
                <span>
                  <span className="block text-sm font-bold text-fg">
                    {review.name}
                  </span>
                  <span className="block text-xs text-fg-subtle">
                    {review.role} · {review.company} · {review.city}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
