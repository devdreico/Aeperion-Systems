"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends Omit<ButtonProps, "children" | "variant"> {
  label?: string;
  href?: string;
  showIcon?: boolean;
  variant?: "primary" | "primary-glow" | "secondary" | "dark";
}

export function CTAButton({
  label = "Asesoría Gratuita",
  href = "/asesoria",
  showIcon = true,
  variant = "primary",
  className,
  size = "lg",
  ...props
}: CTAButtonProps) {
  const variantMap: Record<string, ButtonProps["variant"]> = {
    primary: "primary",
    "primary-glow": "primary",
    secondary: "secondary",
    dark: "dark",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={href}>
        <Button
          variant={variantMap[variant]}
          size={size}
          className={cn(
            "group",
            variant === "primary-glow" && "animate-pulse-glow",
            className
          )}
          {...props}
        >
          {variant === "primary-glow" && (
            <Sparkles className="h-4 w-4" />
          )}
          {label}
          {showIcon && (
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          )}
        </Button>
      </Link>
    </motion.div>
  );
}
