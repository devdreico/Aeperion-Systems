"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export function ScrollProgress({
  className,
  color = "bg-ae-green-400",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left",
        color,
        className
      )}
      style={{ scaleX: prefersReducedMotion ? 1 : scaleX }}
      aria-hidden="true"
    />
  );
}
