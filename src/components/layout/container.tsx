import { cn } from "@/lib/utils";

/**
 * AEPERION — Container Layout Component
 *
 * Contenedor de contenido con max-width y padding consistente.
 */

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "header";
  variant?: "default" | "wide" | "narrow" | "full";
}

export function Container({
  className,
  as: Tag = "div",
  variant = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-[1200px]": variant === "default",
          "max-w-[1440px]": variant === "wide",
          "max-w-[720px]": variant === "narrow",
          "max-w-full": variant === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
