"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className={cn(
        "max-w-2xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {badge && (
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 8 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
          }}
          className="inline-flex items-center gap-1.5 mb-4 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-ae-green-400/10 text-ae-green-700 dark:text-ae-green-300 border border-ae-green-400/25"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ae-green-400" />
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: easeOut },
          },
        }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-fg tracking-tight text-balance"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
          }}
          className={cn(
            "mt-4 text-base md:text-lg text-fg-muted leading-relaxed max-w-xl",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
