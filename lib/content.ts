export type Status = "ok" | "nc" | "at";

export const STATUS_LABEL: Record<Status, string> = {
  ok: "Conforme",
  nc: "Não conforme",
  at: "Atenção",
};

/** 01 · O que avaliamos: os 6 sistemas e o instrumento que mede cada um */
export const SISTEMAS = [
  { titulo: "Acabamentos e revestimentos", instrumento: "Percussão",
    detalhe: "Cerâmicas, rejuntes, pintura, louças e metais",
    vistoria: "Percussão e luz rasante para achar peças ocas, trincas e manchas." },
  { titulo: "Pisos, paredes e forros", instrumento: "Caimento",
    detalhe: "Planicidade, prumo, esquadro e fissuras no gesso",
    vistoria: "Caimento medido em direção ao ralo, com régua, nível e trena." },
  { titulo: "Portas, janelas e esquadrias", instrumento: "Estanqueidade",
    detalhe: "Vedação, folgas e ferragens",
    vistoria: "Folga, travamento e estanqueidade testados com água." },
  { titulo: "Instalações elétricas", instrumento: "Testador",
    detalhe: "Tomadas, interruptores, DR e quadro",
    vistoria: "Polaridade e aterramento testados ponto a ponto." },
  { titulo: "Instalações hidráulicas", instrumento: "Escoamento",
    detalhe: "Pressão, vazão, ralos e registros",
    vistoria: "Escoamento, vazamentos e registros testados um a um." },
  { titulo: "Conformidade com projetos", instrumento: "Projeto",
    detalhe: "Metragem, layout e pontos elétricos e hidráulicos",
    vistoria: "Comparado ao projeto e ao memorial descritivo assinado." },
] as const;

/** 02 · O laudo: cada item explica uma linha da página de exemplo (mesmo número). */
export const LAUDO_ITENS = [
  { titulo: "Cada ocorrência numerada", texto: "O mesmo número na foto, na planta e na lista." },
  { titulo: "Status e norma por item", texto: "Conforme, atenção ou não conforme, com a NBR que embasa a cobrança." },
  { titulo: "ART do engenheiro", texto: "Responsabilidade técnica registrada no CREA." },
] as const;

/** Página de exemplo do laudo (02) */
export const LAUDO_EXEMPLO = {
  numero: "Laudo nº 2026-0147",
  pagina: "Pág. 07/18",
  ambiente: "Banheiro social",
  linhas: [
    { item: "Caimento do box", status: "nc" as Status },
    { item: "Rejunte da bancada", status: "at" as Status },
    { item: "Pressão do chuveiro", status: "ok" as Status },
  ],
};

/** 03 · Como funciona: linha do tempo até as chaves */
export const PASSOS = [
  {
    quando: "Assim que a construtora agendar",
    titulo: "Orçamento",
    texto: "Você conta o tipo, a metragem e o bairro. Respondemos com valor e disponibilidade.",
  },
  {
    quando: "No dia da vistoria de entrega",
    titulo: "Vistoria no imóvel",
    texto: "O engenheiro percorre o apartamento com você, sistema por sistema, com instrumentos.",
  },
  {
    quando: "Antes de assinar o termo",
    titulo: "Laudo técnico",
    texto: "Fotos numeradas, status de cada item, normas e ART. É o que você entrega à construtora.",
  },
  {
    quando: "Até os reparos",
    titulo: "Acompanhamento",
    texto: "Orientamos o pedido de reparo e tiramos dúvidas até a revistoria.",
  },
] as const;

/** 04 · O que costumamos encontrar */
export const ACHADOS: {
  id: "caimento" | "tomada" | "janela"; aba: string;
  imagem: string; alt: string; status: Status; ambiente: string; titulo: string; ocorrencias: string[];
}[] = [
  {
    id: "caimento", aba: "Box",
    imagem: "", // desenho em CaimentoDiagrama (SVG inline)
    alt: "Corte do piso do box com o caimento invertido",
    status: "nc",
    ambiente: "Banheiro · box",
    titulo: "Caimento invertido no piso do box",
    ocorrencias: ["Água acumula junto à parede, longe do ralo", "Desnível medido de 4 mm em 1 m"],
  },
  {
    id: "tomada", aba: "Tomada",
    imagem: "/assets/ilustracoes/tomada-aterramento.svg",
    alt: "Tomada testada com o testador: o LED do terra fica apagado, e a tomada está a 0,30 m do piso, quando o projeto previa 1,10 m",
    status: "nc", // falta de aterramento é requisito de segurança (NBR 5410): Não conforme
    ambiente: "Sala · elétrica",
    titulo: "Tomada sem aterramento",
    ocorrencias: ["Pino terra sem continuidade no teste", "Ponto diferente do projeto elétrico"],
  },
  {
    id: "janela", aba: "Janela",
    imagem: "/assets/ilustracoes/esquadria-vedacao.svg",
    alt: "Desenho técnico de janela com cotas de folga e vedação",
    status: "nc",
    ambiente: "Dormitório · esquadria",
    titulo: "Janela com folga e vedação falhando",
    ocorrencias: ["Infiltração no teste de estanqueidade", "Fecho não trava a folha", "Borracha de vedação descolada"],
  },
];

/**
 * Depoimentos reais de clientes, com autorização. Enquanto a lista estiver vazia a seção não aparece.
 * Formato: { texto: "A construtora refez o box e duas janelas.", nome: "Ana", local: "Vila Mariana", achados: "14 ocorrências" }
 */
export const DEPOIMENTOS: { texto: string; nome: string; local: string; achados?: string }[] = [];

/** Orçamento */
export const TIPOS_IMOVEL = ["Apartamento", "Studio", "Cobertura", "Casa em condomínio", "Sala comercial"] as const;

/** FAQ: também gera o JSON-LD FAQPage */
export const FAQ = [
  {
    q: "Quanto custa a vistoria?",
    a: "O valor depende da metragem, do tipo de imóvel e do bairro. Com essas três informações, pelo formulário ou pelo WhatsApp, respondemos com o valor e a disponibilidade para a data da sua entrega.",
  },
  {
    q: "Quando devo agendar a vistoria?",
    a: "Assim que a construtora marcar a data de vistoria ou entrega das chaves. O ideal é que a vistoria aconteça antes de você assinar o termo de recebimento, para que as ocorrências entrem no pedido de reparo.",
  },
  {
    q: "Já recebi as chaves. Ainda vale fazer a vistoria?",
    a: "Vale. O laudo registra o estado do imóvel e serve de base para pedir reparos à construtora dentro dos prazos de garantia. Quanto antes a vistoria acontecer, mais fácil mostrar que o problema veio da obra e não do uso.",
  },
  {
    q: "Quanto tempo leva a vistoria?",
    a: "Depende da metragem e do tipo de imóvel. Um apartamento de 2 dormitórios costuma levar de 2 a 3 horas no local. Informamos a estimativa no orçamento.",
  },
  {
    q: "E se a construtora não corrigir os problemas?",
    a: "O laudo com registro fotográfico e ART documenta o estado do imóvel na entrega. Com ele você formaliza o pedido de reparo à construtora e, se ela não responder, tem uma prova técnica assinada por engenheiro para negociar ou recorrer aos órgãos de defesa do consumidor.",
  },
  {
    q: "O que é o laudo de vistoria de imóvel novo?",
    a: "É o documento em que o engenheiro civil registra, com fotos e indicação da norma técnica aplicável, cada ocorrência encontrada no imóvel: acabamentos, instalações, caimentos, esquadrias e projeto. Ele acompanha a ART e serve de base para o pedido de reparo à construtora.",
  },
  {
    q: "Quais normas a vistoria segue?",
    a: "Usamos como referência a NBR 16747, da ABNT, que trata de inspeção predial, e a NBR 17170, que trata de garantias em edificações. Cada ocorrência do laudo cita a norma que embasa a cobrança.",
  },
] as const;
