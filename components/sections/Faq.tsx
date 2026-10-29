import { SectionHead } from "@/components/ui/SectionHead";
import { FAQ } from "@/lib/content";

export function Faq() {
  return (
    <section id="duvidas" data-theme="claro" className="mq-section" aria-labelledby="duvidas-title">
      <div className="mq-container">
        <SectionHead idx="05" rotulo="Dúvidas" id="duvidas-title" title="Perguntas frequentes.">
          <p className="body x-head-text">O que os compradores mais perguntam antes da entrega das chaves.</p>
        </SectionHead>
        <div className="x-faq">
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p className="body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
