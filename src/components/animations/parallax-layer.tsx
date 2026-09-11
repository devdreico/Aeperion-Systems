"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** @description Creates a parallax scroll effect using Framer Motion's useScroll + useTransform */
interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: "vertical" | "horizontal";
  offset?: number;
  className?: string;
  as?: "div" | "section";
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = "vertical",
  offset = 0,
  className,
  as: Tag = "div",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const moveRange = speed * 100;
  const y = useTransform(scrollYProgress, [0, 1], [moveRange + offset, -moveRange + offset]);
  const x = useTransform(scrollYProgress, [0, 1], [moveRange + offset, -moveRange + offset]);

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      ref={ref}
      style={direction === "vertical" ? { y } : { x }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
