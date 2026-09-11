"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { ParticleSystem } from "@/components/animations/particle-system";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-ae-gray-50 relative overflow-hidden">
      <ParticleSystem count={20} color="rgba(110, 196, 94, 0.3)" speed={0.1} interactive={false} maxDistance={100} />

      <div className="text-center max-w-md px-6 relative z-10">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <span className="text-[120px] md:text-[160px] font-bold text-ae-gray-100 leading-none select-none">
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ marginTop: "-2rem" }}
        >
          <span className="text-[100px] md:text-[130px] font-bold text-ae-green-400/10 leading-none">
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-ae-gray-900 mb-3 relative"
        >
          Página no encontrada
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-ae-gray-500 mb-8"
        >
          La página que buscas no existe o ha sido movida.
          Revisa la URL o vuelve al inicio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ae-green-500 text-white font-medium rounded-xl hover:bg-ae-green-600 transition-colors shadow-lg shadow-ae-green-500/20"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 border border-ae-gray-200 text-ae-gray-700 font-medium rounded-xl hover:border-ae-green-400 hover:text-ae-green-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Contactar soporte
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
