import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "alt" | "glass";
  size?: "default" | "sm" | "md" | "lg" | "xl";
}

export function Section({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        {
          "bg-surface": variant === "default",
          "bg-surface-1": variant === "alt",
          "mesh-bg bg-surface": variant === "glass",
        },
        {
          "py-12 md:py-16": size === "sm",
          "py-14 md:py-20": size === "md",
          "py-16 md:py-24": size === "default" || size === "xl",
          "py-20 md:py-32": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
