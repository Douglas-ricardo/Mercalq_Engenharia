"use client";

import { useEffect } from "react";

/**
 * Marca como `pending` os [data-inview] abaixo da dobra e libera (`done`) quando entram na tela.
 * O CSS define o estado `pending`; o estado sem atributo é o final.
 */
export function InView() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute("data-inview", "done");
        io.unobserve(e.target);
      }
    }, { threshold: 0.35 });
    document.querySelectorAll<HTMLElement>("[data-inview]").forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * 0.8) return; // já na tela: fica como está
      el.setAttribute("data-inview", "pending");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
