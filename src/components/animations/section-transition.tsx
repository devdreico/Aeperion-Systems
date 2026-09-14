"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/** @description Wraps sections to reveal on scroll with fade-in-up/down/left/right animation */
interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  distance?: number;
}

export function SectionTransition({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
  distance = 40,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = prefersReducedMotion ? {} : { opacity: 0, ...directionOffset[direction] };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={initial}
      animate={isInView || prefersReducedMotion ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
