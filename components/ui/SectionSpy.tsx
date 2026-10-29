"use client";

import { useEffect } from "react";
import { NAV } from "@/lib/site";

/**
 * Marca no header a seção que está no meio da tela (`aria-current` nos links da nav e do menu)
 * e esconde o botão "Solicitar orçamento" enquanto o próprio formulário está visível.
 */
export function SectionSpy() {
  useEffect(() => {
    const header = document.querySelector(".mq-header");
    const marcar = (href: string | null) => {
      document.querySelectorAll<HTMLAnchorElement>(".mq-header a[href^='#']").forEach((a) => {
        if (a.getAttribute("href") === href) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    };

    const secoes = NAV.map((n) => document.querySelector(n.href)).filter((el): el is Element => !!el);
    let atual: string | null = null;
    const meio = new IntersectionObserver((entries) => {
      // Saídas antes das entradas, para a seção que entra não ser desmarcada no mesmo lote
      const ordem = [...entries].sort((a, b) => Number(a.isIntersecting) - Number(b.isIntersecting));
      for (const e of ordem) {
        const href = `#${e.target.id}`;
        if (e.isIntersecting) atual = href;
        else if (atual === href) atual = null;
      }
      marcar(atual);
    }, { rootMargin: "-45% 0px -50% 0px" });
    secoes.forEach((s) => meio.observe(s));

    const form = document.querySelector("#orcamento");
    const noForm = new IntersectionObserver(([e]) => {
      header?.classList.toggle("is-form", e.isIntersecting);
    }, { rootMargin: "-20% 0px -20% 0px" });
    if (form) noForm.observe(form);

    return () => { meio.disconnect(); noForm.disconnect(); };
  }, []);

  return null;
}
