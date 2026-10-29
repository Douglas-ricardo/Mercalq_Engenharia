import { IconChaves } from "@/components/icons";
import { SectionHead } from "@/components/ui/SectionHead";
import { PASSOS } from "@/lib/content";

/** Linha do tempo: a entrega das chaves é o nó que abre o último passo; a linha se desenha uma vez. */
export function ProcessSteps() {
  return (
    <section id="como-funciona" data-theme="claro" className="mq-section x-process" aria-labelledby="como-title">
      <div className="mq-container">
        <SectionHead idx="03" rotulo="Como funciona" id="como-title"
                     title={<>Do orçamento <span className="mq-hl">às chaves.</span></>} />
        <ol className="x-timeline" data-inview="">
          {PASSOS.map((p, i) => (
            <li key={p.titulo} className={i === 3 ? "has-keys" : undefined} style={{ "--i": i } as React.CSSProperties}>
              {i === 3 && (
                <span className="x-timeline-keys">
                  <IconChaves width={18} height={18} />
                  Entrega das chaves
                </span>
              )}
              <p className="x-timeline-when">{p.quando}</p>
              <h3 className="heading-3">{p.titulo}</h3>
              <p className="body-sm">{p.texto}</p>
            </li>
          ))}
        </ol>
        {/* Único botão de orçamento no meio da página: fecha o passo 1 da linha do tempo */}
        <div className="x-process-cta">
          <p className="body">O primeiro passo é o orçamento: conte sobre o imóvel e respondemos pelo WhatsApp.</p>
          <a href="#orcamento" className="mq-btn mq-btn-primary">Solicitar orçamento</a>
        </div>
      </div>
    </section>
  );
}
