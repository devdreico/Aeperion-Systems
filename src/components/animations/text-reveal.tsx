"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** @description Reveals text character by character, word by word, or line by line on scroll */
interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  mode?: "chars" | "words" | "lines";
  delay?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}

export function TextReveal({
  text,
  as: Tag = "p",
  mode = "chars",
  delay = 0,
  stagger = 0.03,
  className,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const prefersReducedMotion = useReducedMotion();

  if (mode === "lines") {
    const lines = text.split("\n");
    return (
      <span ref={ref} className={cn("inline", className)}>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            className="block overflow-hidden"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Tag className="inline">{line}{i < lines.length - 1 ? "" : ""}</Tag>
          </motion.span>
        ))}
      </span>
    );
  }

  const items = mode === "words" ? text.split(" ") : text.split("");
  const spacer = mode === "words" ? "\u00A0" : "";

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <span ref={ref} className={cn("inline", className)}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Tag className="inline">{item}{spacer}</Tag>
        </motion.span>
      ))}
    </span>
  );
}
