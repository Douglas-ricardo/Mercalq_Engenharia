import { DEPOIMENTOS } from "@/lib/content";

/** Voz de cliente entre os achados e o FAQ. Só aparece com depoimentos reais em `DEPOIMENTOS`. */
export function Testimonials() {
  if (!DEPOIMENTOS.length) return null;
  return (
    <section data-theme="claro" className="mq-section" aria-labelledby="depoimentos-title">
      <div className="mq-container">
        <h2 id="depoimentos-title" className="heading-2 mq-display x-quotes-title">Quem já recebeu com laudo.</h2>
        <ul className="x-quotes">
          {DEPOIMENTOS.map((d) => (
            <li key={d.nome + d.local}>
              <figure>
                <blockquote className="lead">{d.texto}</blockquote>
                <figcaption>
                  <span className="x-quotes-nome">{d.nome}</span>
                  <span className="mono">{[d.local, d.achados].filter(Boolean).join(" · ")}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
