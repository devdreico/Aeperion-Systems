"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { ParticleSystem } from "@/components/animations/particle-system";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg bg-surface relative overflow-hidden">
      <ParticleSystem
        count={24}
        color="rgba(110, 196, 94, 0.3)"
        speed={0.1}
        interactive={false}
        maxDistance={100}
      />

      <div className="text-center max-w-md px-6 relative z-10">
        <m.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-2"
        >
          <span className="text-[120px] md:text-[160px] font-extrabold text-fg/5 leading-none select-none">
            404
          </span>
          <m.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center text-[110px] md:text-[150px] font-extrabold text-gradient-green leading-none select-none -mt-1"
          >
            404
          </m.span>
        </m.div>

        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl md:text-3xl font-extrabold text-fg mb-3"
        >
          Página no encontrada
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-fg-muted mb-8"
        >
          La página que buscas no existe o fue movida. Revisa la URL o vuelve al inicio.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ae-green-500 text-white font-semibold rounded-xl hover:bg-ae-green-600 transition-colors shadow-lg shadow-ae-green-500/20"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 glass text-fg font-semibold rounded-xl hover:border-ae-green-400/50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Contactar soporte
          </Link>
        </m.div>
      </div>
    </div>
  );
}
