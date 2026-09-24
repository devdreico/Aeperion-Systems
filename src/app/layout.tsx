import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MotionProvider } from "@/components/layout/motion-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { ClientLayout } from "@/components/layout/client-layout";
import { JsonLd } from "@/components/shared/json-ld";
import { BING_SITE_VERIFICATION, GOOGLE_SITE_VERIFICATION, SITE_CONFIG } from "@/lib/constants";
import { montserrat } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Aeperion Systems — Automatización e IA para empresas",
    template: "%s | Aeperion Systems",
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
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
  publisher: "Aeperion Systems",
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Aeperion Systems",
    title: "Aeperion Systems — Automatización e IA para empresas",
    description: SITE_CONFIG.valueProp,
    url: `${SITE_CONFIG.url}/`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aeperion Systems — Automatización e IA para empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aeperion Systems — Automatización e IA para empresas",
    description: SITE_CONFIG.valueProp,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/images/logo/logo-aeperion.png", sizes: "720x722", type: "image/png" },
    ],
    apple: [{ url: "/images/logo/logo-aeperion.png", sizes: "720x722", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(GOOGLE_SITE_VERIFICATION
      ? { google: GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(BING_SITE_VERIFICATION ? { bing: BING_SITE_VERIFICATION } : {}),
  },
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
    <html
      lang="es"
      className={`h-full ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-surface text-fg antialiased">
        <MotionProvider>
          <ThemeProvider>
            <JsonLd />
            <ScrollProgress />
            <Nav />
            <ClientLayout>{children}</ClientLayout>
            <Footer />
            <WhatsAppButton />
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
