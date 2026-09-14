"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/** @description Animated number count-up/down that triggers when scrolled into view */
interface CounterAnimationProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  formatFn?: (value: number) => string;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function CounterAnimation({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  formatFn,
  className,
  suffix = "",
  prefix = "",
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);
  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setCount(to);
      return;
    }

    const startTime = Date.now() + delay * 1000;
    const startValue = from;
    const diff = to - from;

    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(animate);
        return;
      }

      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + diff * eased;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to, duration, delay, prefersReducedMotion]);

  const displayValue = formatFn ? formatFn(count) : Math.round(count).toLocaleString();

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}
