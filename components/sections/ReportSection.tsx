import { Pin } from "@/components/ui/Pin";
import { SectionHead } from "@/components/ui/SectionHead";
import { StatusTag } from "@/components/ui/StatusTag";
import { LAUDO_EXEMPLO, LAUDO_ITENS } from "@/lib/content";
import { SITE } from "@/lib/site";

export function ReportSection() {
  return (
    <section id="laudo" data-theme="claro" className="mq-section" aria-labelledby="laudo-title">
      <div className="mq-container">
        <SectionHead idx="02" rotulo="O laudo" id="laudo-title"
                     title={<>O documento que você entrega <span className="mq-hl">à construtora.</span></>} />
        <div className="x-laudo">
          {/* PENDENTE: trocar por fotos de um laudo real anonimizado; o PDF entra em SITE.laudoExemploPdf */}
          <figure className="x-laudo-page" aria-label="Exemplo de página do laudo">
            <div className="x-laudo-ph mono"><span>{LAUDO_EXEMPLO.numero}</span><span>{LAUDO_EXEMPLO.pagina}</span></div>
            <p className="heading-3">{LAUDO_EXEMPLO.ambiente}</p>
            {LAUDO_EXEMPLO.linhas.map((l, i) => (
              <div key={l.item} className="x-laudo-row" data-p={i + 1}>
                <Pin n={i + 1} /><span>{l.item}</span><StatusTag status={l.status} />
              </div>
            ))}
            <figcaption className="x-laudo-foot mono">
              <span>NBR 16747 · NBR 17170</span><span>ART · CREA-SP</span>
            </figcaption>
          </figure>
          <div>
            <ol className="x-laudo-points">
              {LAUDO_ITENS.map((it, i) => (
                <li key={it.titulo} data-point={i + 1}>
                  <Pin n={i + 1} />
                  <div>
                    <h3 className="heading-3">{it.titulo}</h3>
                    <p className="body-sm">{it.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
            {SITE.laudoExemploPdf && (
              <a className="mq-btn mq-btn-ghost" href={SITE.laudoExemploPdf} target="_blank" rel="noopener noreferrer">
                Ver um laudo completo (PDF)
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
