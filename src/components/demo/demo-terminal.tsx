"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types";

interface TerminalLine {
  type: "input" | "output" | "system" | "error";
  text: string;
  delay?: number;
}

interface DemoTerminalProps {
  tool: Tool;
  className?: string;
}

// Mock responses for different tools
const WHATSAPP_MOCK: { commands: string[]; outputs: Record<string, string[]> } = {
  commands: ["diagnóstico", "recomendar", "presupuesto", "ayuda"],
  outputs: {
      diagnóstico: [
        "🔍 INICIANDO DIAGNÓSTICO...",
        "✓ Analizando procesos actuales...",
        "✓ Identificando cuellos de botella...",
        "✓ Evaluando stack tecnológico...",
        "",
        "📊 RESULTADOS DEL DIAGNÓSTICO:",
        "  • Madurez digital: 35%",
        "  • Procesos manuales: 8/12",
        "  • Oportunidades: Automatización WhatsApp, CRM",
        "  • ROI estimado: 240% en 6 meses",
      ],
      recomendar: [
        "🎯 RECOMENDACIONES PERSONALIZADAS:",
        "",
        "1. Plan Standart ($200K COP)",
        "   → Sitio web + WhatsApp Automation",
        "   → Ideal para empezar",
        "",
        "2. Plan Fullpack ($450K COP) ★ RECOMENDADO",
        "   → Stack completo: Web + CRM + POS + WhatsApp",
        "   → Implementación en 15 días",
        "",
        "3. Plan Syspack ($1M COP)",
        "   → Solución enterprise con todo incluido",
      ],
      presupuesto: [
        "💰 PRESUPUESTO ESTIMADO:",
        "",
        "  • Diagnóstico inicial: GRATIS",
        "  • Plan básico: $200.000 COP",
        "  • Plan completo: $450.000 COP",
        "  • Plan enterprise: $1.000.000 COP",
        "",
        "📅 Tiempo de implementación:",
        "  • Desde 7 días hábiles",
        "  • Soporte incluido 1-6 meses",
      ],
      ayuda: [
        "Comandos disponibles:",
        "  • diagnóstico  → Analiza tu negocio",
        "  • recomendar   → Obtén recomendaciones",
        "  • presupuesto  → Calcula costos",
        "  • ayuda        → Muestra este mensaje",
        "",
        "💡 Tip: Escribe 'diagnóstico' para empezar",
      ],
    },
};

const MOCK_RESPONSES: Record<string, { commands: string[]; outputs: Record<string, string[]> }> = {
  "whatsapp-basico": WHATSAPP_MOCK,
  "whatsapp-flow": WHATSAPP_MOCK,
};

const DEFAULT_COMMANDS = ["help", "status", "info", "clear"];
const DEFAULT_OUTPUTS: Record<string, string[]> = {
  help: [
    "Comandos disponibles:",
    "  • help   → Muestra esta ayuda",
    "  • status → Estado del sistema",
    "  • info   → Información de la demo",
    "  • clear  → Limpia la terminal",
  ],
  status: [
    "📡 ESTADO DEL SISTEMA:",
    "  • Demo activa: ✓",
    "  • Datos mock: ✓",
    "  • Conexión API: Simulada",
    "  • Latencia: 0ms (local)",
  ],
  info: [
    "ℹ️ INFORMACIÓN DE LA DEMO:",
    "  • Herramienta: Simulación interactiva",
    "  • Tipo: Terminal",
    "  • Datos: Mock (no reales)",
    "  • Propósito: Mostrar funcionalidad",
  ],
};

export function DemoTerminal({ tool, className }: DemoTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", text: "⚡ AEPERION TERMINAL v1.0", delay: 0 },
    { type: "system", text: `🔧 Demo: ${tool.name}`, delay: 0.3 },
    { type: "system", text: "Sistema listo. Escribe un comando para empezar.", delay: 0.6 },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockResponses = MOCK_RESPONSES[tool.id] || { commands: DEFAULT_COMMANDS, outputs: DEFAULT_OUTPUTS };

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const addLine = useCallback(async (line: TerminalLine) => {
    await new Promise((r) => setTimeout(r, (line.delay || 0) * 1000));
    setLines((prev) => [...prev, line]);
  }, []);

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setLines((prev) => [...prev, { type: "input", text: `$ ${cmd}` }]);
    setInput("");
    setIsTyping(true);

    if (trimmed === "clear") {
      setLines([]);
      setIsTyping(false);
      return;
    }

    // Simulate typing delay
    const outputs = mockResponses.outputs[trimmed];
    if (outputs) {
      for (const line of outputs) {
        const type = line.startsWith("✓") || line.startsWith("📊") || line.startsWith("🎯") || line.startsWith("💰") ? "output" :
                     line.startsWith("•") || line.startsWith("  ") ? "output" :
                     line.startsWith("❌") ? "error" : "output";
        await addLine({ type, text: line, delay: 0.08 });
      }
    } else {
      await addLine({
        type: "error",
        text: `❌ Comando no reconocido: "${trimmed}". Escribe "ayuda" o "help" para ver comandos disponibles.`,
        delay: 0.1,
      });
    }

    setIsTyping(false);
    scrollToBottom();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTyping) {
      handleCommand(input);
    }
  };

  return (
    <div
      className={cn(
        "bg-ae-gray-900 rounded-2xl border border-ae-gray-700 overflow-hidden shadow-2xl",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-ae-gray-800 border-b border-ae-gray-700">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-ae-error" />
          <div className="h-3 w-3 rounded-full bg-ae-warning" />
          <div className="h-3 w-3 rounded-full bg-ae-success" />
        </div>
        <span className="text-xs text-ae-gray-400 ml-2 font-mono">terminal — {tool.name}</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-6 font-mono text-sm max-h-[500px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.15 }}
              className={cn(
                "whitespace-pre-wrap leading-relaxed",
                line.type === "input" && "text-ae-green-400",
                line.type === "output" && "text-ae-gray-200",
                line.type === "system" && "text-ae-gray-400",
                line.type === "error" && "text-ae-error",
                !line.text && "h-2"
              )}
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Line */}
        {!isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mt-2"
          >
            <span className="text-ae-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-ae-gray-100 outline-none border-none font-mono text-sm"
              placeholder={isTyping ? "" : "Escribe un comando..."}
              autoFocus
            />
          </motion.div>
        )}

        {/* Quick Commands */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-ae-gray-800">
          {mockResponses.commands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => !isTyping && handleCommand(cmd)}
              disabled={isTyping}
              className="px-2.5 py-1 text-xs rounded-md bg-ae-gray-800 text-ae-gray-300 hover:bg-ae-green-900/50 hover:text-ae-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
            >
              {cmd}
            </button>
          ))}
        </div>

        <div ref={endRef} />
      </div>
    </div>
  );
}
