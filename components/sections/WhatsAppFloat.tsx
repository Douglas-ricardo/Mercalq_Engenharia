"use client";

import { useEffect, useState } from "react";
import { IconWhatsApp } from "@/components/icons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { MENSAGENS } from "@/lib/whatsapp";

/**
 * Seções que já têm o próprio caminho para o WhatsApp; nelas o flutuante se esconde.
 * O FAQ não tem WhatsApp próprio, então o flutuante aparece lá.
 */
const COM_WHATSAPP = ["#orcamento", "footer.mq-footer"];

/** Fixo no canto inferior direito; some enquanto uma seção com WhatsApp próprio está na tela. */
export function WhatsAppFloat() {
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    const alvos = COM_WHATSAPP.map((s) => document.querySelector(s)).filter((el): el is Element => !!el);
    const visiveis = new Set<Element>();
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target);
      setOculto(visiveis.size > 0);
    }, { rootMargin: "0px 0px -25% 0px" });
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <WhatsAppLink
      origem="float"
      mensagem={MENSAGENS.float}
      className={`x-wa-float${oculto ? " is-hidden" : ""}`}
      aria-label="Fale no WhatsApp"
      aria-hidden={oculto || undefined}
      tabIndex={oculto ? -1 : undefined}
    >
      <span className="x-wa-float-icon"><IconWhatsApp width={30} height={30} /></span>
      <span className="x-wa-float-label">Fale no WhatsApp</span>
    </WhatsAppLink>
  );
}
