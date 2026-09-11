"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** @description SVG path morphing between multiple shapes with continuous looping animation */
interface MorphingShapeProps {
  paths: string[];
  duration?: number;
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  viewBox?: string;
}

export function MorphingShape({
  paths,
  duration = 3,
  className,
  width = 200,
  height = 200,
  fill = "currentColor",
  viewBox,
}: MorphingShapeProps) {
  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  if (!paths.length) return null;

  const vb = viewBox || `0 0 ${width} ${height}`;

  if (prefersReducedMotion) {
    return (
      <svg width={width} height={height} viewBox={vb} className={className}>
        <path d={paths[0]} fill={fill} />
      </svg>
    );
  }

  return (
    <svg width={width} height={height} viewBox={vb} className={cn("overflow-visible", className)}>
      <motion.path
        d={paths[0]}
        fill={fill}
        animate={{ d: paths }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
