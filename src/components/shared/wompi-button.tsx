"use client";

import { Wallet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { formatCOP } from "@/lib/utils";

interface WompiButtonProps {
  planName: string;
  amount: number;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "glass";
  size?: "md" | "lg" | "xl";
}

export function WompiButton({
  planName,
  amount,
  label = "Pagar con Wompi",
  className,
  variant = "primary",
  size = "lg",
}: WompiButtonProps) {
  const href = SITE_CONFIG.payments.wompi.link;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${planName} ${formatCOP(amount)}`}
      className={className}
    >
      <Button variant={variant} size={size} className="w-full">
        <Wallet className="h-4 w-4" />
        {label}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </a>
  );
}
