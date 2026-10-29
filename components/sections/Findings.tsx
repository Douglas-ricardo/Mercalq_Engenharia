"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { CaimentoDiagrama } from "@/components/ui/CaimentoDiagrama";
import { Ilustracao } from "@/components/ui/Ilustracao";
import { Pin } from "@/components/ui/Pin";
import { SectionHead } from "@/components/ui/SectionHead";
import { StatusTag } from "@/components/ui/StatusTag";
import { ACHADOS } from "@/lib/content";

/** 04 · Achados em abas; o box traz o diagrama de caimento com o "antes e depois" do reparo. */
export function Findings() {
  const [ativo, setAtivo] = useState(0);
  const [corrigido, setCorrigido] = useState(false);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + ACHADOS.length) % ACHADOS.length;
    setAtivo(n);
    abas.current[n]?.focus();
  };

  return (
    <section id="achados" data-theme="claro" className="mq-section" aria-labelledby="achados-title">
      <div className="mq-container">
        <SectionHead idx="04" rotulo="Achados" id="achados-title"
                     title={<>O que costumamos <span className="mq-hl">encontrar.</span></>}>
          <p className="body x-head-text">
            Ocorrências frequentes em apartamentos recém-entregues, em exemplos ilustrativos no formato do laudo.
          </p>
        </SectionHead>

        <div className="x-tabs" role="tablist" aria-label="Achados">
          {ACHADOS.map((a, i) => (
            <button key={a.id} ref={(el) => { abas.current[i] = el; }} type="button" role="tab"
                    id={`aba-${a.id}`} aria-controls={`painel-${a.id}`} aria-selected={ativo === i}
                    tabIndex={ativo === i ? 0 : -1} onClick={() => setAtivo(i)} onKeyDown={(e) => onKey(e, i)}>
              {a.aba}
            </button>
          ))}
        </div>

        {ACHADOS.map((a, i) => {
          const caimento = a.id === "caimento";
          const status = caimento && corrigido ? "ok" : a.status;
          return (
            <div key={a.id} id={`painel-${a.id}`} role="tabpanel" aria-labelledby={`aba-${a.id}`}
                 hidden={ativo !== i} className="x-case">
              <figure className="x-case-fig">
                {caimento
                  ? <CaimentoDiagrama corrigido={corrigido} />
                  : <Ilustracao src={a.imagem} alt={a.alt} loading="lazy" />}
                <figcaption className="mono">Exemplo ilustrativo</figcaption>
              </figure>
              <div className="x-case-body">
                <div className="mq-project-meta">
                  <StatusTag status={status} />
                  <span className="mono">{a.ambiente}</span>
                </div>
                <h3 className="heading-3">{a.titulo}</h3>
                <ol className="mq-project-list">
                  {a.ocorrencias.map((o, j) => (
                    <li key={o}><Pin n={j + 1} /><span className="body-sm">{o}</span></li>
                  ))}
                </ol>
                {caimento && (
                  <button type="button" className="x-switch" aria-pressed={corrigido}
                          onClick={() => setCorrigido((c) => !c)}>
                    {corrigido ? "Ver na entrega" : "Ver depois do reparo"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
