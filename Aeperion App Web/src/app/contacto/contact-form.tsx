"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center p-8 rounded-2xl border border-ae-green-200 bg-ae-green-50/50 text-center min-h-[400px]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="h-16 w-16 rounded-full bg-ae-green-100 flex items-center justify-center mb-4"
        >
          <Check className="h-8 w-8 text-ae-green-500" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-xl font-semibold text-ae-gray-900 mb-2"
        >
          ¡Mensaje enviado!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-sm text-ae-gray-500 max-w-xs"
        >
          Te responderemos en menos de 24 horas. Revisa tu correo y WhatsApp.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 rounded-2xl border border-ae-gray-200 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-ae-gray-700 mb-1">
          Nombre completo *
        </label>
        <input
          type="text"
          required
          className="w-full h-11 rounded-xl border border-ae-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ae-green-400 transition-all"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ae-gray-700 mb-1">
          Correo electrónico *
        </label>
        <input
          type="email"
          required
          className="w-full h-11 rounded-xl border border-ae-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ae-green-400 transition-all"
          placeholder="correo@ejemplo.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ae-gray-700 mb-1">
          WhatsApp
        </label>
        <input
          type="tel"
          className="w-full h-11 rounded-xl border border-ae-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ae-green-400 transition-all"
          placeholder="+57 300 123 4567"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ae-gray-700 mb-1">
          Mensaje *
        </label>
        <textarea
          required
          rows={4}
          className="w-full rounded-xl border border-ae-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ae-green-400 transition-all resize-none"
          placeholder="Cuéntanos sobre tu proyecto..."
        />
      </div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
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
              Enviar Mensaje
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
