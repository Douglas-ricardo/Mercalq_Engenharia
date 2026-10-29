"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Corte do piso do box. Ao entrar na tela, o piso inclina uma vez e a gota escorre.
 * `corrigido` inverte: a água vai para o ralo. Cores no mesmo padrão das ilustrações (papel: fundo claro, traço escuro).
 */
export function CaimentoDiagrama({ corrigido }: { corrigido: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisto(true); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ang = !visto ? 0 : corrigido ? 1.8 : -1.6;
  const bolha = !visto ? 0 : corrigido ? -26 : 26;
  const gota = !visto ? 0 : corrigido ? 134 : -680;

  return (
    <svg ref={ref} className="x-dg" viewBox="0 0 1200 800" width={1200} height={800} role="img"
         aria-label={corrigido
           ? "Corte do piso do box corrigido: caimento de 1% leva a água para o ralo"
           : "Corte do piso do box: inclinação leva a água para a parede, longe do ralo"}>
      {/* Mesmo quadro (1200×800), fundo e grade de pontos das outras ilustrações */}
      <defs>
        <pattern id="x-dg-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1" fill="#e2dfda" />
        </pattern>
      </defs>
      <rect width="1200" height="800" fill="#f4f3f1" />
      <rect width="1200" height="800" fill="url(#x-dg-dots)" />
      <text className="x-dg-lb" x="140" y="120">CORTE A-A · BOX</text>
      <line x1="140" y1="200" x2="140" y2="560" stroke="#2f2b28" strokeWidth="8" strokeLinecap="square" />
      <line x1="140" y1="560" x2="1060" y2="560" stroke="#77736f" strokeWidth="1.5" strokeDasharray="10 8" />
      <g className="x-dg-slab" style={{ transform: `rotate(${ang}deg)` }}>
        <rect x="140" y="560" width="920" height="32" fill="#e9e7e3" stroke="#2f2b28" strokeWidth="4" />
        <rect x="910" y="552" width="94" height="12" fill="#f4f3f1" stroke="#2f2b28" strokeWidth="3" />
        <g transform="translate(347 508)">
          <rect width="413" height="52" rx="4" fill="#d6751b" />
          <rect x="150" y="14" width="113" height="24" rx="12" fill="#fdfcfb" />
          <line x1="190" y1="14" x2="190" y2="38" stroke="#2f2b28" strokeWidth="2" />
          <line x1="222" y1="14" x2="222" y2="38" stroke="#2f2b28" strokeWidth="2" />
          <ellipse className="x-dg-move" cx="206" cy="26" rx="15" ry="8.5" fill="#0f6e7a"
                   style={{ transform: `translateX(${bolha}px)` }} />
        </g>
        <circle className="x-dg-move x-dg-gota" cx="835" cy="546" r="9" fill="#0f6e7a"
                style={{ transform: `translateX(${gota}px)` }} />
      </g>
      <text className="x-dg-lb x-dg-ralo" x="900" y="640">RALO</text>
      <rect x="140" y="726" width="120" height="4" fill="#d6751b" />
      <text className={`x-dg-lb x-dg-lo${corrigido ? " is-ok" : ""}`} x="280" y="738">
        {corrigido ? "1,0 % PARA O RALO →" : "← 0,4 % PARA A PAREDE"}
      </text>
    </svg>
  );
}
