import type { OrigemWhatsApp } from "./whatsapp";

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
};

/** Métrica de conversão do site: cada clique de WhatsApp vira `cta_whatsapp`. */
export function trackWhatsApp(origem: OrigemWhatsApp) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer?.push({ event: "cta_whatsapp", origem });
  w.gtag?.("event", "cta_whatsapp", { origem });
}
