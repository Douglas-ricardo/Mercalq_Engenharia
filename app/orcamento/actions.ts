"use server";

import { waLink, mensagemOrcamento, type Lead } from "@/lib/whatsapp";

const limpa = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function enviarOrcamento(input: Lead) {
  const lead: Lead = {
    nome: limpa(input.nome, 120),
    tel: limpa(input.tel, 20) || undefined,
    tipo: limpa(input.tipo, 40),
    m2: limpa(input.m2, 6) || undefined,
    local: limpa(input.local, 160),
    data: limpa(input.data, 10) || undefined,
    emp: limpa(input.emp, 160) || undefined,
    obs: limpa(input.obs, 1000) || undefined,
  };

  if (!lead.nome || !lead.tipo || !lead.local) {
    throw new Error("Preencha nome, tipo de imóvel e bairro.");
  }

  // Salva o lead antes de redirecionar: wa.me só abre a conversa preenchida.
  // Uma falha na API não pode impedir o cliente de chegar ao WhatsApp.
  if (process.env.API_URL) {
    try {
      await fetch(`${process.env.API_URL}/leads`, {          // FastAPI → PostgreSQL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, origem: "form_site" }),
        signal: AbortSignal.timeout(4000),
      });
    } catch (err) {
      console.error("[orcamento] falha ao salvar lead", err);
    }
  }

  return waLink(mensagemOrcamento(lead));               // o cliente abre na aba reservada no clique
}
