import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "alt" | "hero" | "dark" | "green" | "glass";
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
          "bg-surface": variant === "default" || variant === "hero",
          "bg-surface-1": variant === "alt",
          "bg-ae-gray-900 text-white": variant === "dark",
          "bg-ae-green-400/5": variant === "green",
          "mesh-bg bg-surface": variant === "glass",
        },
        {
          "py-12 md:py-16": size === "sm",
          "py-14 md:py-20": size === "md",
          "py-16 md:py-24": size === "default",
          "py-20 md:py-32": size === "lg",
          "min-h-screen py-16 md:py-24": size === "xl" && variant === "hero",
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
