"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "https://formspree.io/f/xdeoryjj";

export function ContactForm() {
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-3xl glass-card p-6 md:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center min-h-[420px]"
          >
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.15, 1] }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-16 w-16 rounded-full bg-ae-green-400/15 flex items-center justify-center mb-4"
            >
              <Check className="h-8 w-8 text-ae-green-500" />
            </m.div>
            <h3 className="text-xl font-bold text-fg mb-2">¡Mensaje enviado!</h3>
            <p className="text-sm text-fg-muted max-w-xs">
              Te responderemos en menos de 24 horas. Revisa tu correo y WhatsApp.
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-fg mb-1.5">
                Nombre completo *
              </label>
              <Input
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-fg mb-1.5">
                Correo electrónico *
              </label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-fg mb-1.5">
                WhatsApp
              </label>
              <Input
                type="tel"
                value={form.whatsapp}
                onChange={update("whatsapp")}
                placeholder="+57 300 000 0000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-fg mb-1.5">
                Mensaje *
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={update("message")}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-ae-green-400/60 focus:border-ae-green-400 transition-all resize-none"
                placeholder="Cuéntanos sobre tu proyecto..."
              />
            </div>

            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.
              </p>
            )}

            <m.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </m.div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
