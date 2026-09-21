import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { ClientLayout } from "@/components/layout/client-layout";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Aeperion Systems — Automatización e IA para empresas",
    template: "%s | Aeperion Systems",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "desarrollo de software",
    "automatización empresarial",
    "inteligencia artificial",
    "fintech",
    "transformación digital",
    "CRM",
    "facturación electrónica",
    "Colombia",
    "Bogotá",
  ],
  authors: [{ name: "Aeperion Systems" }],
  creator: "Aeperion Systems",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Aeperion Systems",
    title: "Aeperion Systems — Automatización e IA para empresas",
    description: SITE_CONFIG.valueProp,
    url: SITE_CONFIG.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aeperion Systems — Automatización e IA para empresas",
    description: SITE_CONFIG.valueProp,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-surface text-fg antialiased">
        <ThemeProvider>
          <JsonLd />
          <ScrollProgress />
          <Nav />
          <ClientLayout>{children}</ClientLayout>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
