"use client";

import { type ReactNode } from "react";
import { LazyMotion } from "framer-motion";

/**
 * Carga diferida de las features de Framer Motion.
 * domMax incluye animaciones de layout (layoutId) usadas en nav, faq y demos.
 * Al importarse dinámicamente, las features quedan fuera del bundle inicial.
 */
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domMax);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
