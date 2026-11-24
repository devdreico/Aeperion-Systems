"use client";

import { type ReactNode } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = useLocation().pathname;
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className="flex-1">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <m.main
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {children}
      </m.main>
    </AnimatePresence>
  );
}
