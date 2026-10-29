"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/site";

/** Menu das seções abaixo de 960px, onde a navegação do header não cabe. */
export function MobileMenu() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setAberto(false); botao.current?.focus(); }
    };
    // Toque fora do menu fecha o painel
    const onPointer = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAberto(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    // Trava a rolagem da página e leva o foco ao primeiro link (UX-M08)
    document.body.style.overflow = "hidden";
    raiz.current?.querySelector<HTMLAnchorElement>(".mq-menu-panel a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <div className="mq-menu" ref={raiz}>
      <button
        ref={botao}
        type="button"
        className="mq-menu-btn"
        aria-expanded={aberto}
        aria-controls="mq-menu-panel"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        onClick={() => setAberto((a) => !a)}
      >
        <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.75}
             strokeLinecap="round" aria-hidden="true" focusable="false">
          {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <nav id="mq-menu-panel" aria-label="Seções" className="mq-menu-panel" hidden={!aberto}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setAberto(false)}>{n.label}</a>
        ))}
      </nav>
      {aberto && <div className="mq-menu-backdrop" aria-hidden="true" onClick={() => setAberto(false)} />}
    </div>
  );
}
