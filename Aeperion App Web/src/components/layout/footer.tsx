"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";

const footerLinks = {
  Empresa: NAV_LINKS.filter((l) => l.href !== "/"),
  Planes: [
    { href: "/planes", label: "Plan Standart" },
    { href: "/planes", label: "Plan Fullpack" },
    { href: "/planes", label: "Plan Syspack" },
    { href: "/asesoria", label: "Asesoría Gratuita" },
  ],
  Herramientas: [
    { href: "/herramientas?categoria=web-presencia", label: "Presencia Web" },
    { href: "/herramientas?categoria=automatizacion", label: "Automatización" },
    { href: "/herramientas?categoria=crm-ventas", label: "CRM y Ventas" },
    { href: "/herramientas", label: "Ver todas (39)" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Footer() {
  return (
    <footer className="border-t border-ae-gray-100 bg-ae-gray-50">
      <div className="container-ae py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-ae-gray-500 leading-relaxed max-w-xs">
              {SITE_CONFIG.tagline}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={SOCIAL_LINKS.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-ae-gray-200 hover:bg-ae-green-400 hover:text-white flex items-center justify-center text-ae-gray-600 transition-colors duration-200"
                aria-label={SOCIAL_LINKS.whatsapp.label}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-ae-gray-200 hover:bg-ae-green-400 hover:text-white flex items-center justify-center text-ae-gray-600 transition-colors duration-200"
                aria-label={SOCIAL_LINKS.instagram.label}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-ae-gray-200 hover:bg-ae-green-400 hover:text-white flex items-center justify-center text-ae-gray-600 transition-colors duration-200"
                aria-label={SOCIAL_LINKS.linkedin.label}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div key={title} variants={itemVariants}>
              <h4 className="text-sm font-semibold text-ae-gray-900 mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ae-gray-500 hover:text-ae-green-600 transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ae-gray-200">
        <div className="container-ae flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
          <p className="text-xs text-ae-gray-400">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-ae-gray-400">
            <Link href="/faq" className="hover:text-ae-green-600 transition-colors">
              FAQ
            </Link>
            <Link href="/contacto" className="hover:text-ae-green-600 transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
