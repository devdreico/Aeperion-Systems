"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOOL_SALES_FORM_URL } from "@/lib/constants";

interface ToolPurchaseFormProps {
  toolName: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

export function ToolPurchaseForm({ toolName }: ToolPurchaseFormProps) {
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [form, setForm] = React.useState({ name: "", phone: "" });

  const update = (field: keyof typeof form) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(TOOL_SALES_FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          herramienta: toolName,
          nombre: form.name,
          telefono: form.phone,
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div id="tool-request">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-48 flex-col items-center justify-center text-center"
            aria-live="polite"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ae-green-400/15">
              <Check className="h-6 w-6 text-ae-green-500" />
            </div>
            <h3 className="text-lg font-bold text-fg">Solicitud enviada</h3>
            <p className="mt-1 max-w-sm text-sm text-fg-muted">
              Te contactaremos pronto para hablar de {toolName.toLowerCase()}.
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <input type="hidden" name="herramienta" value={toolName} />
            <div>
              <label htmlFor="tool-name" className="mb-1.5 block text-sm font-semibold text-fg">
                Nombre completo *
              </label>
              <Input
                id="tool-name"
                name="nombre"
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="tool-phone" className="mb-1.5 block text-sm font-semibold text-fg">
                Teléfono o WhatsApp *
              </label>
              <Input
                id="tool-phone"
                name="telefono"
                type="tel"
                required
                value={form.phone}
                onChange={update("phone")}
                placeholder="+57 300 000 0000"
              />
            </div>

            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-500" role="alert">
                <AlertCircle className="h-4 w-4" />
                No pudimos enviar la solicitud. Intenta de nuevo.
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Enviando...
                </>
              ) : (
                <>
                  Pedir información
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
