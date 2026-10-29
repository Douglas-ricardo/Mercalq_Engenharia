"use client";

import { useEffect } from "react";

/**
 * F5 sempre volta ao topo (UX3-F01): o hash gravado por um link interno levava o recarregamento
 * para #orcamento. Os links internos rolam sem gravar hash; um link externo com #orcamento
 * continua abrindo na seção na primeira visita.
 */
export function ScrollManager() {
  useEffect(() => {
    history.scrollRestoration = "manual";
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload") {
      history.replaceState(null, "", location.pathname + location.search);
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const href = a.getAttribute("href")!;
      if (href.startsWith("/#") && location.pathname !== "/") return;
      const id = href.split("#")[1];
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      // Espera o menu fechar e liberar o overflow do body antes de rolar
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
