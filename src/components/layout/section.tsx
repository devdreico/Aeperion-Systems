import { cn } from "@/lib/utils";

/**
 * AEPERION — Section Layout Component
 *
 * Sección estándar con padding vertical y layout consistente.
 *
 * HANDOFF-FRONTEND:
 *   - Envolver content en <FadeInView> para animación al scroll
 *   - Agregar <SectionTransition> entre secciones
 *   - variant=hero: ocupa viewport completo
 *   - variant=alt: fondo alterno (gray-50)
 */

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "alt" | "hero" | "dark" | "green";
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
          "bg-white": variant === "default" || variant === "hero",
          "bg-ae-gray-50": variant === "alt",
          "bg-ae-gray-900 text-white": variant === "dark",
          "bg-ae-green-50": variant === "green",
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
