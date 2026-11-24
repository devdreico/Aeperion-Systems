import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MotionProvider } from "@/components/layout/motion-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ClientLayout } from "@/components/layout/client-layout";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export function RootLayout() {
  return (
    <MotionProvider>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col bg-surface text-fg antialiased">
          <ScrollProgress />
          <Nav />
          <ClientLayout>
            <div className="flex-1 pt-16 md:pt-20">
              <Outlet />
            </div>
          </ClientLayout>
          <Footer />
          <WhatsAppButton />
        </div>
      </ThemeProvider>
    </MotionProvider>
  );
}