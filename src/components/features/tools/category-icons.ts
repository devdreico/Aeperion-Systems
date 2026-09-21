import {
  Globe,
  Zap,
  Handshake,
  FileText,
  CreditCard,
  Share2,
  Building2,
  BarChart3,
  MessageSquare,
  Palette,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "web-presencia": Globe,
  automatizacion: Zap,
  "crm-ventas": Handshake,
  facturacion: FileText,
  "pos-pagos": CreditCard,
  "redes-sociales": Share2,
  administracion: Building2,
  analitica: BarChart3,
  comunicacion: MessageSquare,
  diseno: Palette,
};

export const CATEGORY_COLORS: Record<string, string> = {
  "web-presencia": "text-sky-500",
  automatizacion: "text-ae-green-500",
  "crm-ventas": "text-violet-500",
  facturacion: "text-amber-500",
  "pos-pagos": "text-emerald-500",
  "redes-sociales": "text-pink-500",
  administracion: "text-cyan-500",
  analitica: "text-blue-500",
  comunicacion: "text-teal-500",
  diseno: "text-fuchsia-500",
};
