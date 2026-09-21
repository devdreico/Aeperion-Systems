"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { m } from "framer-motion";
import { SITE_CONFIG, SOCIAL_LINKS, PAYMENT_METHODS } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Empresa: [
    { href: "/about", label: "Nosotros" },
    { href: "/metodo", label: "Método" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/blog", label: "Blog" },
  ],
  Soluciones: [
    { href: "/herramientas", label: "Todos los servicios" },
    { href: "/herramientas?categoria=automatizacion", label: "Automatización" },
    { href: "/herramientas?categoria=crm-ventas", label: "CRM y Ventas" },
    { href: "/planes", label: "Planes y precios" },
  ],
  Soporte: [
    { href: "/faq", label: "Preguntas frecuentes" },
    { href: "/contacto", label: "Contacto" },
    { href: "/asesoria", label: "Asesoría gratuita" },
    { href: "/planes", label: "Métodos de pago" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface-1 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-ae-green-400/10 blur-[120px]" />

      <div className="container-ae relative py-16">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
        >
          {/* Brand */}
          <m.div variants={itemVariants} className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block group">
              <Logo />
            </Link>
            <p className="mt-4 text-sm text-fg-muted leading-relaxed max-w-xs">
              {SITE_CONFIG.tagline}. Desde {SITE_CONFIG.foundedYear} en{" "}
              {SITE_CONFIG.city}, {SITE_CONFIG.country}.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {Object.values(SOCIAL_LINKS).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full glass flex items-center justify-center text-fg-muted hover:text-ae-green-500 hover:border-ae-green-400/40 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </m.div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <m.div key={title} variants={itemVariants}>
              <h4 className="text-sm font-bold text-fg mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-muted hover:text-ae-green-600 dark:hover:text-ae-green-300 transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </m.div>

        {/* Newsletter + Payments */}
        <m.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 grid gap-8 rounded-3xl glass-card p-8 md:grid-cols-2 md:items-center"
        >
          <div>
            <h4 className="text-lg font-bold text-fg">
              Notas de IA y automatización
            </h4>
            <p className="mt-1.5 text-sm text-fg-muted max-w-md">
              Ideas prácticas para automatizar tu empresa. Sin spam.
            </p>
          </div>
          <form
            className="flex w-full gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              required
              placeholder="tu@empresa.com"
              aria-label="Correo para newsletter"
              className="flex-1"
            />
            <Button type="submit" variant="primary" size="md" className="shrink-0">
              <Mail className="h-4 w-4" />
              Suscribirme
            </Button>
          </form>
        </m.div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-fg-subtle uppercase tracking-wider">
            Pagos seguros
          </span>
          {PAYMENT_METHODS.map((method) => (
            <a
              key={method.id}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold rounded-full border border-border px-3 py-1.5 text-fg-muted hover:text-ae-green-600 dark:hover:text-ae-green-300 hover:border-ae-green-400/40 transition-colors"
            >
              {method.name}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-ae flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
          <p className="text-xs text-fg-subtle">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name} ·{" "}
            {SITE_CONFIG.domain} · Hecho en {SITE_CONFIG.city}.
          </p>
          <div className="flex items-center gap-4 text-xs text-fg-subtle">
            <Link href="/faq" className="hover:text-ae-green-600 dark:hover:text-ae-green-300 transition-colors">
              FAQ
            </Link>
            <Link href="/contacto" className="hover:text-ae-green-600 dark:hover:text-ae-green-300 transition-colors">
              Contacto
            </Link>
            <Link href="/proyectos" className="hover:text-ae-green-600 dark:hover:text-ae-green-300 transition-colors">
              Proyectos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "message-circle") {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    );
  }
  if (name === "instagram") {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}
