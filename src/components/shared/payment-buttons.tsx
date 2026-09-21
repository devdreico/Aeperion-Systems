"use client";

import { ShieldCheck } from "lucide-react";
import { MercadoPagoButton } from "@/components/shared/mercado-pago-button";
import { WompiButton } from "@/components/shared/wompi-button";
import { cn } from "@/lib/utils";

interface PaymentButtonsProps {
  planName: string;
  amount: number;
  className?: string;
  showNote?: boolean;
}

export function PaymentButtons({
  planName,
  amount,
  className,
  showNote = true,
}: PaymentButtonsProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid gap-3">
        <WompiButton planName={planName} amount={amount} />
        <MercadoPagoButton planName={planName} amount={amount} />
      </div>
      {showNote && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-fg-subtle">
          <ShieldCheck className="h-3.5 w-3.5 text-ae-green-500" />
          Pago seguro · Tarjetas, PSE, Nequi y Bancolombia
        </p>
      )}
    </div>
  );
}
