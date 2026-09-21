"use client";

import * as React from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Calendar,
  Sparkles,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SITE_CONFIG } from "@/lib/constants";
import { PLANS } from "@/lib/plans-data";
import type { QuizAnswers, PlanId } from "@/types";

type Step = "welcome" | "q1" | "q2" | "q3" | "q4" | "q5" | "result" | "calendar" | "confirm";

interface AnswerOption {
  value: string;
  label: string;
  description?: string;
}

const ENDPOINT =
  process.env.NEXT_PUBLIC_ADVISORY_ENDPOINT ?? "https://formspree.io/f/xdeoryjj";

const QUESTIONS: {
  key: keyof QuizAnswers;
  title: string;
  subtitle: string;
  options: AnswerOption[];
}[] = [
  {
    key: "businessSize",
    title: "¿Cuántos empleados tiene tu negocio?",
    subtitle: "Esto nos ayuda a entender la escala de tu operación.",
    options: [
      { value: "less-3", label: "Menos de 3", description: "Negocio unipersonal o micro" },
      { value: "3-10", label: "3 a 10", description: "Pequeña empresa" },
      { value: "more-10", label: "Más de 10", description: "Empresa en crecimiento" },
    ],
  },
  {
    key: "mainChallenge",
    title: "¿Cuál es tu principal desafío digital?",
    subtitle: "¿Qué área necesita más atención en este momento?",
    options: [
      { value: "web", label: "Presencia web", description: "No tengo web o está desactualizada" },
      { value: "automation", label: "Automatización con IA", description: "Procesos manuales que quiero agilizar" },
      { value: "sales", label: "Ventas", description: "Necesito organizar clientes y ventas" },
      { value: "admin", label: "Administración", description: "Facturación, inventarios, empleados" },
      { value: "everything", label: "Todo", description: "Necesito una transformación completa" },
    ],
  },
  {
    key: "hasWebsite",
    title: "¿Tienes página web actualmente?",
    subtitle: "Queremos saber desde dónde partimos.",
    options: [
      { value: "no", label: "No tengo", description: "Empezamos desde cero" },
      { value: "yes", label: "Sí, pero necesita mejoras", description: "Actualización o rediseño" },
      { value: "redesigning", label: "Estamos renovándola", description: "En proceso de cambio" },
    ],
  },
  {
    key: "usesTools",
    title: "¿Usas alguna herramienta para gestionar clientes?",
    subtitle: "¿Cómo llevas el control de tus clientes hoy?",
    options: [
      { value: "none", label: "Ninguna", description: "Todo en papel o de memoria" },
      { value: "excel", label: "Excel / Google Sheets", description: "Hoja de cálculo básica" },
      { value: "whatsapp", label: "Solo WhatsApp", description: "Atención desorganizada" },
      { value: "crm", label: "Un CRM básico", description: "Ya tengo algo implementado" },
      { value: "other", label: "Otro sistema", description: "Herramienta específica" },
    ],
  },
  {
    key: "timeline",
    title: "¿En cuánto tiempo necesitas una solución?",
    subtitle: "Para priorizar tu caso adecuadamente.",
    options: [
      { value: "urgent", label: "Urgente", description: "Esta semana" },
      { value: "soon", label: "Pronto", description: "En el próximo mes" },
      { value: "no-rush", label: "Sin prisa", description: "Tres meses o más" },
    ],
  },
];

function getRecommendedPlan(answers: QuizAnswers): PlanId {
  const sizeScore = { "less-3": 1, "3-10": 2, "more-10": 3 };
  const challengeScore = { web: 1, automation: 2, sales: 2, admin: 2, everything: 3 };
  const total =
    (sizeScore[answers.businessSize] || 1) +
    (challengeScore[answers.mainChallenge] || 1);

  if (total <= 2) return "standart";
  if (total <= 4) return "fullpack";
  return "syspack";
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function AsesoriaClient() {
  const [step, setStep] = React.useState<Step>("welcome");
  const [answers, setAnswers] = React.useState<Partial<QuizAnswers>>({});
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    whatsapp: "",
    schedule: "Mañana (8:00 - 12:00)",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(false);

  const progress: Record<Step, number> = {
    welcome: 0,
    q1: 10,
    q2: 25,
    q3: 40,
    q4: 55,
    q5: 70,
    result: 85,
    calendar: 92,
    confirm: 100,
  };

  const handleAnswer = (key: keyof QuizAnswers, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    const questionIndex = QUESTIONS.findIndex((q) => q.key === key);
    if (questionIndex < QUESTIONS.length - 1) {
      setStep(`q${questionIndex + 2}` as Step);
    } else {
      setStep("result");
    }
  };

  const recommendedPlan =
    Object.keys(answers).length === 5
      ? getRecommendedPlan(answers as QuizAnswers)
      : null;

  const planInfo = recommendedPlan
    ? PLANS.find((p) => p.id === recommendedPlan)
    : null;

  const currentQuestionIndex = step.startsWith("q") ? parseInt(step[1]) - 1 : -1;
  const currentQuestion =
    currentQuestionIndex >= 0 ? QUESTIONS[currentQuestionIndex] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...formData,
          quizAnswers: answers,
          recommendedPlan: planInfo?.name || recommendedPlan,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStep("confirm");
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section variant="glass" size="xl">
      <Container variant="narrow">
        <div className="mb-8">
          <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
            <m.div
              className="h-full bg-gradient-to-r from-ae-green-400 to-ae-green-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress[step]}%` }}
              transition={{ ease: EASE, duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-fg-subtle mt-2 text-right">
            Paso{" "}
            {step.startsWith("q")
              ? step[1]
              : step === "result" || step === "calendar"
                ? "5/5"
                : step === "confirm"
                  ? "✓"
                  : "0"}{" "}
            de 5
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <m.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="text-center pt-8"
            >
              <Badge variant="default" className="mb-4">
                GRATIS · SIN COMPROMISO
              </Badge>
              <h1 className="text-3xl md:text-4xl font-extrabold text-fg tracking-tight mb-4">
                Asesoría gratuita
              </h1>
              <p className="text-lg text-fg-muted max-w-md mx-auto mb-8 leading-relaxed">
                Responde 5 preguntas rápidas. Diagnosticamos tu negocio y te
                recomendamos el plan ideal.
              </p>
              <div className="space-y-3 text-sm text-fg-muted max-w-xs mx-auto mb-8">
                {[
                  "Llamada de 30 minutos",
                  "Reporte de oportunidades",
                  "Sin compromiso de compra",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-ae-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="primary"
                size="xl"
                onClick={() => setStep("q1")}
                className="animate-pulse-glow group"
              >
                Comenzar diagnóstico
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </m.div>
          )}

          {currentQuestion && (
            <m.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="pt-8"
            >
              <span className="text-xs font-semibold text-ae-green-600 dark:text-ae-green-300 mb-2 block">
                PREGUNTA {currentQuestionIndex + 1} DE 5
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-2">
                {currentQuestion.title}
              </h2>
              <p className="text-fg-muted mb-8">{currentQuestion.subtitle}</p>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <m.button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.key, option.value)}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full text-left p-4 rounded-2xl glass-card hover:border-ae-green-400/50 transition-colors group"
                  >
                    <span className="font-semibold text-fg group-hover:text-ae-green-600 dark:group-hover:text-ae-green-300">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="block text-sm text-fg-muted mt-0.5">
                        {option.description}
                      </span>
                    )}
                  </m.button>
                ))}
              </div>
            </m.div>
          )}

          {step === "result" && planInfo && (
            <m.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="pt-8 text-center"
            >
              <m.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="h-16 w-16 rounded-2xl bg-ae-green-400/15 flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="h-8 w-8 text-ae-green-500" />
              </m.div>
              <Badge variant="default" className="mb-4">
                DIAGNÓSTICO COMPLETO
              </Badge>
              <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-4">
                Según tus respuestas, te recomendamos
              </h2>
              <div className="text-4xl md:text-5xl font-extrabold text-gradient-green mb-2">
                {planInfo.name}
              </div>
              <p className="text-fg-muted max-w-md mx-auto mb-8">
                {planInfo.description}
              </p>
              <Button
                variant="primary"
                size="xl"
                onClick={() => setStep("calendar")}
                className="animate-pulse-glow"
              >
                Agendar mi asesoría gratuita
                <Calendar className="h-5 w-5" />
              </Button>
            </m.div>
          )}

          {step === "calendar" && (
            <m.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="pt-8"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-2 text-center">
                Casi listo
              </h2>
              <p className="text-fg-muted mb-8 text-center">
                Déjanos tus datos y elige el mejor horario para tu asesoría.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
                <div>
                  <label className="block text-sm font-semibold text-fg mb-1.5">
                    Nombre completo
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Carlos Martínez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-fg mb-1.5">
                    Correo electrónico
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="carlos@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-fg mb-1.5">
                    WhatsApp
                  </label>
                  <Input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+57 300 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-fg mb-1.5">
                    Horario preferido
                  </label>
                  <select
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    className="w-full h-12 rounded-xl border border-border bg-surface px-4 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-ae-green-400/60"
                  >
                    <option>Mañana (8:00 - 12:00)</option>
                    <option>Tarde (14:00 - 18:00)</option>
                    <option>Indiferente</option>
                  </select>
                </div>

                {error && (
                  <p className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    No pudimos agendar. Intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="xl"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Agendar asesoría
                      <Calendar className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </m.div>
          )}

          {step === "confirm" && (
            <m.div
              key="confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="pt-8 text-center relative"
            >
              {/* Confetti sparks */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 14 }).map((_, i) => (
                  <m.span
                    key={i}
                    initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [-10, -70 - ((i * 37) % 70)],
                      x: (i - 7) * 24,
                      scale: [0, 1, 0.4],
                    }}
                    transition={{ duration: 1.4, delay: i * 0.04, ease: "easeOut" }}
                    className="absolute left-1/2 top-16 h-2 w-2 rounded-full bg-ae-green-400"
                  />
                ))}
              </div>

              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.15, 1] }}
                transition={{ duration: 0.5 }}
                className="h-16 w-16 rounded-full bg-ae-green-400/15 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="h-8 w-8 text-ae-green-500" />
              </m.div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-fg mb-4">
                ¡Todo listo!
              </h2>
              <p className="text-fg-muted max-w-md mx-auto mb-4 leading-relaxed">
                Recibimos tus datos. Te contactaremos para confirmar el horario de
                tu asesoría y te recordaremos 1 hora antes por WhatsApp.
              </p>
              <p className="text-sm text-fg-subtle mb-8">
                Mientras tanto, explora nuestras soluciones.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={SITE_CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="lg">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp directo
                  </Button>
                </Link>
                <Link href="/herramientas">
                  <Button variant="ghost" size="lg" className="group">
                    Ver soluciones
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
