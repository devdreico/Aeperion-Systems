"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Calendar, Sparkles, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";
import { PLANS } from "@/lib/plans-data";
import type { QuizAnswers, PlanId } from "@/types";

type Step = "welcome" | "q1" | "q2" | "q3" | "q4" | "q5" | "result" | "calendar" | "confirm";

interface AnswerOption {
  value: string;
  label: string;
  description?: string;
}

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
      { value: "web", label: "Presencia Web", description: "No tengo web o está desactualizada" },
      { value: "automation", label: "Automatización", description: "Procesos manuales que quiero agilizar" },
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
      { value: "none", label: "Ninguna", description: "Todo en papel o mental" },
      { value: "excel", label: "Excel / Google Sheets", description: "Hoja de cálculo básica" },
      { value: "whatsapp", label: "WhatsApp nomas", description: "Atención desorganizada" },
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
  const total = (sizeScore[answers.businessSize] || 1) + (challengeScore[answers.mainChallenge] || 1);

  if (total <= 2) return "standart";
  if (total <= 4) return "fullpack";
  return "syspack";
}

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

  const progress = {
    welcome: 0,
    q1: 10,
    q2: 25,
    q3: 40,
    q4: 55,
    q5: 70,
    result: 85,
    calendar: 90,
    confirm: 100,
  };

  const handleAnswer = (key: keyof QuizAnswers, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    const questionIndex = QUESTIONS.findIndex((q) => q.key === key);
    if (questionIndex < QUESTIONS.length - 1) {
      setStep(`q${questionIndex + 2}` as Step);
    } else {
      const fullAnswers = newAnswers as QuizAnswers;
      if (fullAnswers.businessSize && fullAnswers.mainChallenge && fullAnswers.hasWebsite && fullAnswers.usesTools && fullAnswers.timeline) {
        setStep("result");
      }
    }
  };

  const recommendedPlan = (Object.keys(answers).length === 5)
    ? getRecommendedPlan(answers as QuizAnswers)
    : null;

  const planInfo = recommendedPlan ? PLANS.find((p) => p.id === recommendedPlan) : null;

  const currentQuestionIndex = step.startsWith("q") ? parseInt(step[1]) - 1 : -1;
  const currentQuestion = currentQuestionIndex >= 0 ? QUESTIONS[currentQuestionIndex] : null;

  return (
    <Section variant="default" size="xl">
      <Container variant="narrow">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1.5 bg-ae-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-ae-green-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress[step]}%` }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-ae-gray-400 mt-2 text-right">
            Paso {step.startsWith("q") ? step[1] : step === "result" ? "5/5" : step === "calendar" ? "✓" : step === "confirm" ? "✓" : "0"} de 5
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center pt-8"
            >
              <Badge variant="default" className="mb-4">GRATIS · SIN COMPROMISO</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-ae-gray-900 tracking-tight mb-4">
                Asesoría Gratuita
              </h1>
              <p className="text-lg text-ae-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                Respondé 5 preguntas rápidas. Te diagnosticamos tu negocio y te recomendamos el plan ideal.
              </p>
              <div className="space-y-3 text-sm text-ae-gray-500 max-w-xs mx-auto mb-8">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-ae-green-500" />
                  <span>Llamada de 30 minutos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-ae-green-500" />
                  <span>Reporte de oportunidades</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-ae-green-500" />
                  <span>Sin compromiso de compra</span>
                </div>
              </div>
              <Button variant="primary" size="xl" onClick={() => setStep("q1")} className="animate-pulse-glow">
                Comenzar Diagnóstico
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {currentQuestion && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8"
            >
              <span className="text-xs font-medium text-ae-green-600 mb-2 block">
                PREGUNTA {currentQuestionIndex + 1} DE 5
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-2">
                {currentQuestion.title}
              </h2>
              <p className="text-ae-gray-500 mb-8">{currentQuestion.subtitle}</p>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.key, option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-4 rounded-xl border border-ae-gray-200 hover:border-ae-green-300 hover:bg-ae-green-50/50 transition-all duration-200 group"
                  >
                    <span className="font-medium text-ae-gray-900 group-hover:text-ae-green-700">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="block text-sm text-ae-gray-500 mt-0.5">
                        {option.description}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "result" && planInfo && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="h-16 w-16 rounded-2xl bg-ae-green-100 flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="h-8 w-8 text-ae-green-500" />
              </motion.div>
              <Badge variant="default" className="mb-4">DIAGNÓSTICO COMPLETO</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-4">
                Según tus respuestas, te recomendamos
              </h2>
              <div className="text-5xl font-bold text-ae-green-500 mb-2">{planInfo.name}</div>
              <p className="text-ae-gray-500 max-w-md mx-auto mb-8">{planInfo.description}</p>
              <Button variant="primary" size="xl" onClick={() => setStep("calendar")} className="animate-pulse-glow">
                Agendar mi Asesoría Gratuita
                <Calendar className="h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {step === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-2 text-center">
                Casi listo
              </h2>
              <p className="text-ae-gray-500 mb-8 text-center">
                Dejanos tus datos y elegí el mejor horario para tu asesoría.
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  try {
                    const res = await fetch("https://formspree.io/f/xdeoryjj", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                      },
                      body: JSON.stringify({
                        ...formData,
                        quizAnswers: answers,
                        recommendedPlan: planInfo?.name || recommendedPlan,
                      }),
                    });
                    if (res.ok) {
                      setStep("confirm");
                    } else {
                      setStep("confirm");
                    }
                  } catch (err) {
                    setStep("confirm");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="space-y-4 max-w-sm mx-auto"
              >
                <div>
                  <label className="block text-sm font-medium text-ae-gray-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 rounded-xl border border-ae-gray-200 bg-white px-4 text-sm text-ae-gray-900 focus:outline-none focus:ring-2 focus:ring-ae-green-400"
                    placeholder="Ej: Carlos Martínez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ae-gray-700 mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 rounded-xl border border-ae-gray-200 bg-white px-4 text-sm text-ae-gray-900 focus:outline-none focus:ring-2 focus:ring-ae-green-400"
                    placeholder="carlos@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ae-gray-700 mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full h-11 rounded-xl border border-ae-gray-200 bg-white px-4 text-sm text-ae-gray-900 focus:outline-none focus:ring-2 focus:ring-ae-green-400"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ae-gray-700 mb-1">Horario preferido</label>
                  <select
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    className="w-full h-11 rounded-xl border border-ae-gray-200 bg-white px-4 text-sm text-ae-gray-900 focus:outline-none focus:ring-2 focus:ring-ae-green-400"
                  >
                    <option>Mañana (8:00 - 12:00)</option>
                    <option>Tarde (14:00 - 18:00)</option>
                    <option>Indiferente</option>
                  </select>
                </div>
                <Button type="submit" variant="primary" size="xl" className="w-full" disabled={submitting}>
                  {submitting ? "Enviando..." : "Agendar Asesoría"}
                  <Calendar className="h-5 w-5" />
                </Button>
              </form>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-16 w-16 rounded-full bg-ae-green-100 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="h-8 w-8 text-ae-green-500" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-4">
                ¡Todo listo!
              </h2>
              <p className="text-ae-gray-500 max-w-md mx-auto mb-4 leading-relaxed">
                Te hemos enviado un correo con los detalles de tu asesoría. Te recordaremos 1 hora antes por WhatsApp.
              </p>
              <p className="text-sm text-ae-gray-400 mb-8">
                Mientras tanto, puedes ir explorando nuestras herramientas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={SITE_CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="lg">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp directo
                  </Button>
                </a>
                <a href="/herramientas">
                  <Button variant="ghost" size="lg">
                    Ver herramientas
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
