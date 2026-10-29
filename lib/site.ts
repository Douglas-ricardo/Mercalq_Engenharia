import { WHATSAPP_DISPLAY } from "./whatsapp";

/**
 * Dados institucionais. Campos PENDENTE ficam `null` até a Mercalq confirmar
 * (design system §12); enquanto forem `null`, o site simplesmente não os exibe.
 */
const PENDENTE: string | null = null;

export const SITE = {
  nome: "Mercalq Engenharia",
  assinatura: "Precisão que constrói confiança.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mercalq.com.br",
  titulo: "Vistoria de Imóvel Novo em São Paulo | Mercalq Engenharia",
  descricao:
    "Vistoria de recebimento de imóvel novo em São Paulo: engenheiro civil verifica acabamentos e instalações e entrega laudo fotográfico com ART.",
  whatsapp: WHATSAPP_DISPLAY,
  telefoneE164: "+5511991884544",
  instagram: "@mercalq.eng",
  instagramUrl: "https://www.instagram.com/mercalq.eng",
  // PENDENTE: confirmar a área com a Mercalq
  area: "São Paulo e Grande SP",
  // PENDENTE: preencher com os dados reais, ex.: "Eng. Fulano de Tal", "CREA-SP 000000000", "00.000.000/0001-00"
  engenheiro: PENDENTE,
  crea: PENDENTE,
  cnpj: PENDENTE,
  // PENDENTE: foto 4:5 do engenheiro em vistoria, em public/assets/fotos/ (ex.: "/assets/fotos/engenheiro.jpg")
  fotoEngenheiro: PENDENTE,
  // PENDENTE: laudo real anonimizado em PDF, em public/assets/ (ex.: "/assets/laudo-exemplo.pdf")
  laudoExemploPdf: PENDENTE,
  // PENDENTE: 1–2 frases: formação, anos de experiência, nº de vistorias
  bioEngenheiro: PENDENTE,
};

/** Consulta pública do registro no CREA-SP (abre a partir do número do carimbo). */
export const CREA_CONSULTA_URL = "https://www.creasp.org.br/";

export const LOGOS = {
  // Recortados do arquivo do cliente (design/logo/). Só usar sobre grafite.
  simbolo: "/assets/logos/mercalq-simbolo.png",       // 146×176
  completo: "/assets/logos/mercalq-logo-completo.png", // 480×458
} as const;

export const NAV = [
  { href: "#avaliamos", label: "O que avaliamos" },
  { href: "#laudo", label: "O laudo" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
] as const;
