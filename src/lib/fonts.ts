import { Montserrat } from "next/font/google";

/**
 * Montserrat self-hosted via next/font.
 * Se descarga en build y se sirve desde el mismo dominio:
 * sin request externo, sin bloqueo de render y con fallback métrico.
 */
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});
