"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  distance?: number;
  as?: "div" | "span" | "section" | "article";
}

export function FadeInView({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
  distance = 30,
  as: Tag = "div",
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const prefersReducedMotion = useReducedMotion();

  const offsets = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = prefersReducedMotion ? {} : { opacity: 0, ...offsets[direction] };

  const MotionTag = {
    div: motion.div,
    span: motion.span,
    section: motion.section,
    article: motion.article,
  }[Tag];

  return (
    <MotionTag
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
    </MotionTag>
  );
}
