import { SectionHead } from "@/components/ui/SectionHead";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { CREA_CONSULTA_URL, SITE } from "@/lib/site";
import { MENSAGENS } from "@/lib/whatsapp";

/** Ficha do engenheiro; campos PENDENTE (null) não aparecem. */
const FICHA = [
  { rotulo: "Responsabilidade", valor: "ART emitida em todo laudo" },
  { rotulo: "Normas de referência", valor: "NBR\u00a016747 · NBR\u00a017170" },
  { rotulo: "Atendimento", valor: SITE.area },
];

export function About() {
  return (
    <section id="sobre" data-theme="claro" className="mq-section" aria-labelledby="sobre-title">
      <div className="mq-container">
        <SectionHead idx="06" rotulo="Responsável técnico" id="sobre-title"
                     title={<>Quem vistoria é <span className="mq-hl">quem assina.</span></>} />
        <div className={SITE.fotoEngenheiro ? "x-eng" : "x-eng x-eng-sem-foto"}>
          {SITE.fotoEngenheiro && (
            <img className="x-eng-foto" src={SITE.fotoEngenheiro}
                 alt={`${SITE.engenheiro ?? "Engenheiro responsável"} durante uma vistoria`}
                 width={800} height={1000} loading="lazy" />
          )}
          <div>
            <p className="x-eng-nome mq-display">{SITE.engenheiro ?? SITE.nome}</p>
            <p className="x-eng-cargo">
              {SITE.engenheiro ? "Engenheiro civil · Mercalq Engenharia" : "Vistoria de recebimento de imóvel novo"}
              {SITE.crea && (
                <> · <a href={CREA_CONSULTA_URL} target="_blank" rel="noopener noreferrer"
                        title="Consultar no site do CREA-SP" className="mono">{SITE.crea}</a></>
              )}
            </p>
            <dl className="x-ficha">
              {FICHA.map((f) => (
                <div key={f.rotulo}><dt>{f.rotulo}</dt><dd>{f.valor}</dd></div>
              ))}
              <div>
                <dt>WhatsApp</dt>
                <dd><WhatsAppLink origem="footer" mensagem={MENSAGENS.footer} className="x-nowrap">{SITE.whatsapp}</WhatsAppLink></dd>
              </div>
            </dl>
            <p className="body x-eng-bio">
              A Mercalq Engenharia faz vistoria técnica de recebimento de imóveis novos. Avaliamos o apartamento
              antes da entrega das chaves com método, instrumentos e critério normativo. O engenheiro responsável
              acompanha cada vistoria, do primeiro contato à emissão da ART.
            </p>
            {SITE.bioEngenheiro && <p className="body x-eng-bio">{SITE.bioEngenheiro}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
