"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
  once?: boolean;
  as?: "div" | "section";
}

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.08,
  delay = 0,
  once = true,
  as: Tag = "div",
}: StaggerRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const MotionTag = {
    div: motion.div,
    section: motion.section,
  }[Tag];

  return (
    <MotionTag
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}
