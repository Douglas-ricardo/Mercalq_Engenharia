export const WHATSAPP = "5511991884544";
export const WHATSAPP_DISPLAY = "(11) 99188-4544";

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export type Lead = {
  nome: string; tel?: string; tipo: string; m2?: string;
  local: string; data?: string; emp?: string; obs?: string;
};

const fmtData = (iso?: string) => (iso ? iso.split("-").reverse().join("/") : "");

export function mensagemOrcamento(l: Lead) {
  const dados = [
    `*Nome:* ${l.nome}`,
    l.tel && `*WhatsApp:* ${l.tel}`,
    `*Imóvel:* ${l.tipo}${l.m2 ? ` · ${l.m2} m²` : ""}`,
    `*Local:* ${l.local}`,
    l.data && `*Entrega prevista:* ${fmtData(l.data)}`,
    l.emp && `*Empreendimento:* ${l.emp}`,
    l.obs && `*Observações:* ${l.obs}`,
  ].filter(Boolean).join("\n");
  return `Olá, Mercalq! Gostaria de um orçamento de vistoria de recebimento.\n\n${dados}`;
}

/** Mensagens pré-preenchidas por contexto (DESIGN-SYSTEM §9). */
export const MENSAGENS = {
  float: "Olá! Quero um orçamento de vistoria.",
  footer: "Olá! Vim pelo site e quero saber mais sobre a vistoria de recebimento.",
} as const;

export type OrigemWhatsApp = "form" | "float" | "footer";
