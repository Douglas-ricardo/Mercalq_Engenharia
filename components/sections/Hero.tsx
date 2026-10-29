import { SITE } from "@/lib/site";

/** Entrada em sequência no carregamento (não na rolagem): eyebrow, título linha a linha, texto e botão. */
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/** Faixa técnica na base do hero, com dados de SITE. */
const FAIXA = [
  { rotulo: "Responsável", valor: SITE.crea ? `Eng.\u00a0civil\u00a0·\u00a0${SITE.crea}` : "Eng.\u00a0civil\u00a0·\u00a0CREA\u2011SP" },
  { rotulo: "Normas", valor: "NBR\u00a016747 · 17170" },
  { rotulo: "Entrega", valor: "Laudo + ART" },
  { rotulo: "Atendimento", valor: SITE.area },
];

export function Hero() {
  return (
    <section id="topo" className="x-hero" aria-labelledby="hero-title">
      <div className="mq-container">
        <div className="x-hero-copy">
          <p className="mq-eyebrow x-in" style={d(0.05)}>
            Vistoria <span className="x-long">de recebimento </span>de imóvel novo
          </p>
          <h1 id="hero-title" className="x-hero-title mq-display">
            <span className="x-line"><span className="x-in" style={d(0.12)}>Receba seu</span></span>{" "}
            <span className="x-line"><span className="x-in" style={d(0.22)}>apartamento</span></span>{" "}
            <span className="x-line"><span className="x-in" style={d(0.32)}><span className="mq-hl">sem surpresas.</span></span></span>
          </h1>
          <p className="lead x-hero-lead x-in" style={d(0.5)}>
            Antes de assinar o termo de recebimento, um engenheiro civil confere acabamentos, instalações e
            projeto. Você recebe laudo com fotos e ART.
          </p>
          <div className="x-actions x-in" style={d(0.62)}>
            <a href="#orcamento" className="mq-btn mq-btn-primary mq-btn-lg">Solicitar orçamento</a>
          </div>
        </div>
        <dl className="x-stamp">
          {FAIXA.map((f) => (
            <div key={f.rotulo}>
              <dt>{f.rotulo}</dt>
              <dd>{f.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
