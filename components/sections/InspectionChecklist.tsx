import { SectionHead } from "@/components/ui/SectionHead";
import { SISTEMAS } from "@/lib/content";

/** 01 · Seis sistemas em grade 3×2; o traço laranja de cada card se desenha uma vez. */
export function InspectionChecklist() {
  return (
    <section id="avaliamos" data-theme="claro" className="mq-section" aria-labelledby="avaliamos-title">
      <div className="mq-container">
        <SectionHead idx="01" rotulo="O que avaliamos" id="avaliamos-title"
                     title={<>Seis sistemas, <span className="mq-hl">medidos</span> um a um.</>}>
          <p className="body x-head-text">
            Numa visita comum você vê o acabamento. Na vistoria, o engenheiro confere cada sistema com
            instrumento e registra tudo num laudo que a construtora precisa responder.
          </p>
        </SectionHead>
        <ol className="x-sistemas" data-inview="">
          {SISTEMAS.map((s, i) => (
            <li key={s.titulo} style={{ "--i": i } as React.CSSProperties}>
              <span className="x-sistemas-instr">{s.instrumento}</span>
              <h3 className="heading-3">{s.titulo}</h3>
              <p className="x-sistemas-detalhe">{s.detalhe}</p>
              <p className="x-sistemas-vistoria">{s.vistoria}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
