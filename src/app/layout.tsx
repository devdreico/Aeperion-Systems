import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { ClientLayout } from "@/components/layout/client-layout";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL("https://aeperion.com"),
  title: {
    default: "Aeperion Systems — Soluciones Digitales Inteligentes",
    template: "%s | Aeperion Systems",
  },
  description:
    "Transformamos problemas operativos en sistemas que trabajan para ti. Diagnóstico, análisis y soluciones digitales para tu negocio.",
  keywords: [
    "desarrollo web",
    "automatización",
    "CRM",
    "facturación electrónica",
    "POS",
    "transformación digital",
    "Colombia",
  ],
  authors: [{ name: "Aeperion Systems" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Aeperion Systems",
    title: "Aeperion Systems — Soluciones Digitales Inteligentes",
    description:
      "Transformamos problemas operativos en sistemas que trabajan para ti.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-screen flex flex-col bg-white text-ae-gray-900 antialiased">
        <JsonLd />
        {/* HANDOFF-FRONTEND: ScrollProgress — animar barra de progreso */}
        <ScrollProgress />

        {/* HANDOFF-FRONTEND: Nav — agregar blur en scroll, animación de links */}
        <Nav />

        <ClientLayout>{children}</ClientLayout>

        {/* HANDOFF-FRONTEND: Footer — agregar fade-in on scroll */}
        <Footer />

        {/* HANDOFF-FRONTEND: WhatsAppButton — animación de bounce flotante */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
