"use client";

import * as React from "react";
import { ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

interface MercadoPagoButtonProps {
  planName: string;
  amount: number;
  customerEmail?: string;
  label?: string;
  className?: string;
}

export function MercadoPagoButton({
  planName,
  amount,
  customerEmail = SITE_CONFIG.links.email,
  label = "Pagar con Mercado Pago",
  className,
}: MercadoPagoButtonProps) {
  const isEnabled = Boolean(SITE_CONFIG.payments.mercadoPago.enabled);

  if (!isEnabled) {
    return (
      <a
        href={SITE_CONFIG.links.mercadoPago}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <Button variant="secondary" size="lg" className="w-full">
          {label}
          <CreditCard className="h-4 w-4" />
        </Button>
      </a>
    );
  }

  const payload = {
    items: [
      {
        title: planName,
        quantity: 1,
        unit_price: Number(amount),
        currency_id: "COP",
      },
    ],
    payer: {
      email: customerEmail,
    },
    metadata: {
      planName,
      source: "aeperion-site",
    },
  };

  const handleClick = () => {
    if (typeof window === "undefined") return;
    window.open(
      `https://www.mercadopago.com.co/checkout/v1/redirect?source=button&${new URLSearchParams({
        title: planName,
        amount: String(amount),
        currency: "COP",
        email: customerEmail,
      }).toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Button
      type="button"
      variant="primary"
      size="lg"
      onClick={handleClick}
      className={className}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
}
