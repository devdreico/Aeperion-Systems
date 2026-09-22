"use client";

import { CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { formatCOP } from "@/lib/utils";

interface MercadoPagoButtonProps {
  planName: string;
  amount: number;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "glass";
  size?: "md" | "lg" | "xl";
  href?: string;
}

export function MercadoPagoButton({
  planName,
  amount,
  label = "Pagar con Mercado Pago",
  className,
  variant = "secondary",
  size = "lg",
  href,
}: MercadoPagoButtonProps) {
  const paymentHref = href ?? SITE_CONFIG.payments.mercadoPago.link;

  return (
    <a
      href={paymentHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${planName} ${formatCOP(amount)}`}
      className={className}
    >
      <Button variant={variant} size={size} className="w-full">
        <CreditCard className="h-4 w-4" />
        {label}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </a>
  );
}
