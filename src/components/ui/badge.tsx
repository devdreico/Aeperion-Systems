import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * AEPERION — Badge UI Primitive
 *
 * Usado para: badges de planes, categorías, etiquetas blog.
 *
 * HANDOFF-FRONTEND:
 *   - El badge "MÁS POPULAR" y "GRATIS" deben tener animación pulse
 *   - Usar <motion.div> para animación de entrada
 */

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "border-ae-green-200 bg-ae-green-50 text-ae-green-700",
        secondary:
          "border-ae-gray-200 bg-ae-gray-100 text-ae-gray-700",
        destructive:
          "border-red-200 bg-red-50 text-red-700",
        outline: "border-ae-gray-300 text-ae-gray-600",
        success: "border-ae-green-200 bg-ae-green-100 text-ae-green-800",
        premium: "border-ae-gray-800 bg-ae-gray-900 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
