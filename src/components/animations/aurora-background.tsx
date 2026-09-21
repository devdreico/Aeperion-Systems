"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  /** intensidad del movimiento parallax (0 desactiva) */
  parallax?: number;
}

/**
 * Fondo aurora de gradientes verdes animados.
 * Se mueve suavemente de forma autónoma y reacciona al scroll.
 */
export function AuroraBackground({
  className,
  parallax = 60,
}: AuroraBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <m.div
        style={shouldReduceMotion ? undefined : { y: y1 }}
        className="absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full bg-ae-green-400/20 blur-[140px] animate-aurora"
      />
      <m.div
        style={shouldReduceMotion ? undefined : { y: y2 }}
        className="absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-ae-green-500/15 blur-[150px] animate-aurora [animation-delay:-6s]"
      />
      <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-ae-green-300/10 blur-[130px] animate-aurora [animation-delay:-12s]" />
    </div>
  );
}
