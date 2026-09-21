"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ae-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-ae-green-400 text-white hover:bg-ae-green-500 active:bg-ae-green-600 shadow-sm hover:shadow-glow",
        secondary:
          "bg-surface text-fg border border-border hover:border-ae-green-400/60 hover:bg-surface-1",
        ghost:
          "text-fg-muted hover:text-fg hover:bg-surface-2",
        outline:
          "border-2 border-ae-green-400/70 text-ae-green-600 dark:text-ae-green-300 hover:bg-ae-green-400/10",
        dark:
          "bg-fg text-surface hover:opacity-90 shadow-sm hover:shadow-md",
        glass:
          "glass text-fg hover:border-ae-green-400/50 hover:text-ae-green-600 dark:hover:text-ae-green-300",
        link:
          "text-ae-green-600 dark:text-ae-green-300 underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
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
