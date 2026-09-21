import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "border-ae-green-400/30 bg-ae-green-400/10 text-ae-green-700 dark:text-ae-green-300",
        secondary:
          "border-border bg-surface-2 text-fg-muted",
        destructive:
          "border-red-400/30 bg-red-400/10 text-red-600 dark:text-red-400",
        outline: "border-border-strong text-fg-muted",
        success:
          "border-ae-green-400/40 bg-ae-green-400/15 text-ae-green-700 dark:text-ae-green-300",
        premium: "border-fg/10 bg-fg text-surface",
        glass: "glass text-fg-muted",
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
