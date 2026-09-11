"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * AEPERION — Button UI Primitive
 *
 * Variants:
 *   - primary:   Fondo verde, texto blanco → CTAs principales
 *   - secondary: Fondo blanco, borde, texto oscuro → CTAs secundarios
 *   - ghost:     Sin fondo, texto → Links/acciones suaves
 *   - outline:   Borde verde, texto verde → Alternativo
 *   - dark:      Fondo negro, texto blanco → Acciones bold
 *
 * HANDOFF-FRONTEND:
 *   - primary: usar <MagneticButton> para efecto magnético en hover
 *   - sizes 'lg' y 'xl' en hero: son los CTAs principales
 *   - agregar animación de loading en estado disabled
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ae-green-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-ae-green-400 text-white hover:bg-ae-green-500 active:bg-ae-green-600 shadow-sm hover:shadow-md",
        secondary:
          "bg-white text-ae-gray-900 border border-ae-gray-200 hover:border-ae-gray-300 hover:bg-ae-gray-50 active:bg-ae-gray-100",
        ghost:
          "text-ae-gray-600 hover:text-ae-gray-900 hover:bg-ae-gray-100",
        outline:
          "border-2 border-ae-green-400 text-ae-green-600 hover:bg-ae-green-50 active:bg-ae-green-100",
        dark: "bg-ae-gray-900 text-white hover:bg-ae-gray-800 active:bg-ae-gray-700 shadow-sm hover:shadow-md",
        link: "text-ae-green-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
