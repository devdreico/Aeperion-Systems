"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types";

interface DemoFormProps {
  tool: Tool;
  className?: string;
}

export function DemoForm({ tool, className }: DemoFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("rounded-3xl glass-card p-8 text-center", className)}
      >
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="h-16 w-16 rounded-full bg-ae-green-400/15 flex items-center justify-center mx-auto mb-4"
        >
          <m.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="h-8 w-8 text-ae-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <m.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </m.svg>
        </m.div>
        <h3 className="text-xl font-bold text-fg mb-2">¡Solicitud enviada!</h3>
        <p className="text-sm text-fg-muted mb-6">Nos pondremos en contacto contigo en las próximas 24 horas.</p>
        <button
          onClick={() => { setStep(0); setIsSuccess(false); setFormData({ name: "", email: "", phone: "", business: "", message: "" }); }}
          className="text-sm text-ae-green-600 hover:underline"
        >
          Volver a empezar
        </button>
      </m.div>
    );
  }

  const fields = [
    { name: "name", label: "Nombre completo", type: "text", placeholder: "Tu nombre" },
    { name: "email", label: "Correo electrónico", type: "email", placeholder: "correo@ejemplo.com" },
    { name: "phone", label: "Teléfono", type: "tel", placeholder: "+57 300 000 0000" },
    { name: "business", label: "Nombre del negocio", type: "text", placeholder: "Tu empresa" },
    { name: "message", label: "Mensaje", type: "textarea", placeholder: "Cuéntanos sobre tu proyecto..." },
  ];

  return (
    <div className={cn("rounded-3xl glass-card overflow-hidden", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-fg">Solicitar información</h3>
          <span className="text-xs text-fg-muted">Demo: {tool.name}</span>
        </div>

        <AnimatePresence mode="wait">
          <m.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {fields.slice(step, step + 1).map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-fg-muted">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:border-ae-green-400 focus:ring-2 focus:ring-ae-green-400/20 outline-none transition-all"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:border-ae-green-400 focus:ring-2 focus:ring-ae-green-400/20 outline-none transition-all"
                  />
                )}
              </div>
            ))}
          </m.div>
        </AnimatePresence>

        {/* Progress */}
        <div className="flex items-center gap-2 mt-6">
          {fields.map((_, i) => (
            <m.div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                i <= step ? "bg-ae-green-400" : "bg-surface-3"
              )}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-sm text-fg-muted hover:text-fg-muted disabled:opacity-30 transition-colors"
          >
            Anterior
          </button>
          {step < fields.length - 1 ? (
            <button
              onClick={() => setStep((s) => Math.min(fields.length - 1, s + 1))}
              className="px-6 py-2 bg-ae-green-500 text-white text-sm font-medium rounded-xl hover:bg-ae-green-600 transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-ae-green-500 text-white text-sm font-medium rounded-xl hover:bg-ae-green-600 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <m.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block"
                  />
                  Enviando...
                </span>
              ) : "Enviar solicitud"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
