"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isShaking, setIsShaking] = useState(true);

  useEffect(() => {
    console.error(error);
    const timer = setTimeout(() => setIsShaking(false), 600);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-ae-gray-50">
      <div className="text-center max-w-md px-6">
        <motion.div
          animate={isShaking ? {
            x: [0, -8, 8, -6, 6, -3, 3, 0],
          } : {}}
          transition={{ duration: 0.5 }}
          className="h-16 w-16 rounded-2xl bg-ae-error/10 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <AlertTriangle className="h-8 w-8 text-ae-error" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl font-bold text-ae-gray-900 mb-3"
        >
          Algo salió mal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-ae-gray-500 mb-8"
        >
          Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
          Por favor, intenta de nuevo.
        </motion.p>

        <motion.button
          onClick={reset}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ae-green-500 text-white font-medium rounded-xl hover:bg-ae-green-600 transition-colors shadow-lg shadow-ae-green-500/20"
        >
          <RefreshCw className="h-4 w-4" />
          Intentar de nuevo
        </motion.button>

        {error.digest && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-ae-gray-400 mt-8 font-mono"
          >
            Error ID: {error.digest}
          </motion.p>
        )}
      </div>
    </div>
  );
}
