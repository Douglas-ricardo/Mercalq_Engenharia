# Redesign V2 · Guia de implementação

**Projeto:** mercalq-site (Next.js 16.4 · React 19.3)
**Base:** preview V2.3 aprovado, comparado com o código atual em `Felipe/`
**Data:** 28/10/2026

Este guia é para aplicar em ordem. Cada etapa diz o arquivo, o que muda e o porquê, e traz o código pronto. Onde a implementação difere do preview de propósito, isso está marcado com **⚠ Diferença do preview**.

---

## 0. Resumo do que muda

| Área | Hoje | Depois |
|---|---|---|
| Fundos | 4 superfícies alternadas (hero escuro, grafite, claro, deep) | 2 superfícies: **escuro nas pontas** (hero, orçamento, rodapé) e **claro no meio** (01–06) |
| Header | Nav à esquerda junto do logo | Logo à esquerda, **nav centralizada**, botão à direita |
| Hero | Régua, planta animada, card de laudo, 2 botões | Título, texto, **1 botão** e **faixa técnica** (responsável, normas, entrega, atendimento) |
| 01 Sistemas | Tabela com "visita comum" + "ver mais" no celular | **Grade 3×2**, sem "visita comum"; 2 colunas no celular |
| 02 Laudo | Imagem SVG + 2 itens | **Página de laudo em HTML** + 3 itens; passar o mouse no item acende a linha (CSS puro) |
| 03 Processo | Linha estática | A linha **se desenha uma vez** ao entrar na tela |
| 04 Achados | 3 cards lado a lado | **Abas** (Box · Tomada · Janela); o box tem o diagrama de caimento interativo |
| 05 FAQ | 11 perguntas + "ver mais" | **5 perguntas**, sem "ver mais" |
| 06 Sobre | Título grande + carimbo | **Ficha do engenheiro** (foto, nome, CREA, ficha técnica, bio) |
| 07 Orçamento | 4 campos + "Mais detalhes" (4 opcionais) | **5 campos**: nome, WhatsApp, tipo, metragem (opcional), bairro |
| Movimento | Entradas e efeitos em várias seções | Nada sobe ou desce ao rolar; efeitos acontecem **no lugar e uma vez** |

**Arquivos novos:** `components/ui/InView.tsx` e `components/ui/CaimentoDiagrama.tsx`
**Arquivos removidos:** `components/ui/HeroPlan.tsx`, `components/ui/ShowMore.tsx` e 4 SVGs (ver etapa 13)
**Sem mudança:** `app/orcamento/actions.ts`, `lib/analytics.ts`, `ScrollManager`, `SectionSpy`, `MobileMenu`, `Footer.tsx` (só o CSS do fundo muda), `Testimonials.tsx` (só ganha `data-theme`)

---

## 1. Tokens e ritmo (`app/globals.css`)

**Por quê:** o que incomodava eram as várias camadas de fundo. Os tokens `grafite` e `claro` que já existem dão conta disso. Falta só um nome para o escuro do hero, que hoje está escrito à mão (`#1b1a18`), para orçamento e rodapé usarem o mesmo tom.

No bloco `:root` da escala (`--section-y` etc.), troque e acrescente:

```css
:root {
  /* ...tokens existentes... */
  --section-y: 88px;              /* era 120px: seções mais curtas */
  --surface-prancha: #1b1a18;     /* escuro das pontas: hero, orçamento e rodapé */
}
@media (max-width: 47.5em) {
  :root { --gutter: 20px; --section-y: 56px; --header-height: 64px; } /* era 72px */
}
```

No fim do arquivo, acrescente o divisor entre seções claras. Sem ele, duas seções claras seguidas se fundem.

```css
/* ===== Redesign V2 · ritmo ===== */
.mq-section[data-theme="claro"] + .mq-section[data-theme="claro"],
.mq-section[data-theme="claro"] + section[data-theme="claro"] { border-top: 1px solid var(--line); }
```

**Contraste:** os textos claros usam os tokens `claro` que já existem (`--ink`, `--ink-muted`, `--laranja-texto: #a4500c`). Todos passam 4,5:1 sobre `#f4f3f1`, então não há cor nova para validar.

---

## 2. Header: nav centralizada

**Arquivo:** só `app/globals.css`, porque o `Header.tsx` já tem a estrutura certa (marca, nav, ações).

Substitua a regra `.mq-header-inner` e acrescente as duas abaixo:

```css
.mq-header-inner {
  height: 100%;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--space-6);
}
.mq-nav { justify-content: center; }
.mq-header-actions { justify-self: end; }
@media (max-width: 60em) {
  .mq-header-inner { grid-template-columns: 1fr auto; } /* nav some; menu e botão à direita */
}
```

`1fr auto 1fr` centraliza a nav na página, não no espaço que sobra entre logo e botão. Com `justify-content: space-between` ela ficaria torta, porque o logo e o botão têm larguras diferentes.

O `.mq-header` continua com `background: var(--surface)` (grafite). Se quiser o mesmo tom do hero, troque para `var(--surface-prancha)`; fica uma faixa contínua.

---

## 3. SectionHead: número + rótulo

**Arquivo:** `components/ui/SectionHead.tsx`

O preview mostra "01 · O QUE AVALIAMOS". Hoje só aparece o número.

```tsx
import type { ReactNode } from "react";

/** Índice da seção (número + rótulo + traço) e título. */
export function SectionHead({
  idx, rotulo, title, children, id,
}: {
  idx?: string; rotulo?: string; title: ReactNode; children?: ReactNode; id?: string;
}) {
  return (
    <header className="x-head">
      {idx && (
        <p className="x-idx" aria-hidden="true">
          <b>{idx}</b>
          {rotulo && <span>{rotulo}</span>}
        </p>
      )}
      <h2 className="heading-2 mq-display" id={id}>{title}</h2>
      {children}
    </header>
  );
}
```

```css
.x-idx b { font-weight: 600; color: var(--laranja-texto); }
.x-idx span { font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; }
.x-head { margin-bottom: var(--space-8); }
.x-head .heading-2 { max-width: 22ch; }
@media (max-width: 47.5em) { .x-head { margin-bottom: var(--space-6); } }
```

---

## 4. Efeitos "uma vez" (`components/ui/InView.tsx`, novo)

**Por quê:** as seções 01 e 03 têm um efeito que roda uma vez quando entram na tela. Em vez de um `IntersectionObserver` por componente, um único observador marca qualquer elemento com `data-inview`. O CSS faz o resto.

As regras:
- Sem JS, ou com "reduzir movimento" ligado, o elemento já aparece no **estado final**. Nada fica escondido.
- O que já está visível no carregamento não anima.
- Não há translate em nenhum efeito: nada "sobe ou desce".

```tsx
"use client";

import { useEffect } from "react";

/**
 * Marca como `pending` os [data-inview] abaixo da dobra e libera (`done`) quando entram na tela.
 * O CSS define o estado `pending`; o estado sem atributo é o final.
 */
export function InView() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute("data-inview", "done");
        io.unobserve(e.target);
      }
    }, { threshold: 0.35 });
    document.querySelectorAll<HTMLElement>("[data-inview]").forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * 0.8) return; // já na tela: fica como está
      el.setAttribute("data-inview", "pending");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
```

**Arquivo:** `app/page.tsx`: monte uma vez, ao lado do `WhatsAppFloat`:

```tsx
import { InView } from "@/components/ui/InView";
// ...
      <WhatsAppFloat />
      <InView />
```

---

## 5. Hero (`components/sections/Hero.tsx`)

**Sai:** a régua, o `HeroPlan`, o card de laudo e o botão "Falar no WhatsApp" (o WhatsApp já está no balão, no formulário e no rodapé).
**Entra:** a faixa técnica embaixo, com dados que já existem em `SITE`.

```tsx
import { SITE } from "@/lib/site";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

const FAIXA = [
  { rotulo: "Responsável técnico", valor: SITE.crea ? `Eng. civil · ${SITE.crea}` : "Engenheiro civil · CREA-SP" },
  { rotulo: "Normas", valor: "NBR 16747 · 17170" },
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
```

> A entrada do texto (`x-in`) acontece só no carregamento, não na rolagem, por isso foi mantida. Se quiser o hero 100% estático, remova as classes `x-in`/`style={d(...)}`.

**CSS:**
1. Remova as regras destes seletores e as media queries que só os usam: `.x-ruler*`, `.x-hero-grid`, `.x-hero-media`, `.x-hero-plan`, `.x-reg*`, `.hp*`, `.x-float-*`.
2. Mantenha `.x-hero::before` (grade) e `::after` (brilho), `.x-hero-copy`, `.x-hero-title .x-line`, `.x-actions`.
3. Acrescente:

```css
.x-hero {
  background-color: var(--surface-prancha);
  padding: clamp(56px, 7vw, 104px) 0 0;
}
.x-hero-title { max-width: 12ch; }
.x-hero-lead { max-width: 52ch; }
.x-stamp {
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: clamp(48px, 6vw, 88px); border-top: 1px solid var(--line);
}
.x-stamp > div { padding: var(--space-4) var(--space-4) var(--space-6) 0; min-width: 0; }
.x-stamp dt { font: 500 .6875rem/1.2 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-muted); }
.x-stamp dd { margin-top: 6px; font-size: .9375rem; font-weight: 600; }
@media (max-width: 47.5em) {
  .x-hero { padding-top: var(--space-12); }
  .x-stamp { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 30em) { .x-actions .mq-btn { width: 100%; } }
```

> **Crítica:** sem a planta, a metade direita do hero no desktop fica vazia, e a grade do fundo vira o único sinal de "engenharia". A melhor saída é uma **foto real do engenheiro em vistoria** (4:5, à direita), não voltar com o desenho. Quando a foto existir (`SITE.fotoEngenheiro`), é só envolver em `x-hero-grid` de novo, com a foto na segunda coluna.

---

## 6. 01 · Sistemas (`lib/content.ts` + `InspectionChecklist.tsx`)

**`lib/content.ts`:** tire `comum` e acrescente `instrumento` (o rótulo pequeno do card):

```ts
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
```

**`components/sections/InspectionChecklist.tsx`:**

```tsx
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
```

**CSS:** remova `.x-why`, `.x-compare*` e acrescente:

```css
.x-sistemas { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 var(--space-8); }
.x-sistemas li { position: relative; padding: var(--space-6) 0; border-top: 1px solid var(--ink); }
.x-sistemas li::before {
  content: ""; position: absolute; left: 0; top: -1px; width: 40px; height: 2px; background: var(--laranja);
  transform-origin: left; transition: transform .6s var(--ease-out) calc(var(--i) * 80ms);
}
.x-sistemas[data-inview="pending"] li::before { transform: scaleX(0); }
.x-sistemas-instr {
  display: block; margin-bottom: var(--space-3);
  font: 500 .6875rem/1 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--laranja-texto);
}
.x-sistemas .heading-3 { font-size: 1.125rem; }
.x-sistemas-detalhe { margin-top: 2px; font-size: .875rem; color: var(--ink-muted); }
.x-sistemas-vistoria { margin-top: var(--space-2); font-size: .9375rem; line-height: 1.5; color: var(--ink-muted); }
@media (max-width: 60em) { .x-sistemas { grid-template-columns: 1fr 1fr; gap: 0 var(--space-6); } }
@media (max-width: 35em) {
  .x-sistemas { gap: 0 var(--space-4); }
  .x-sistemas li { padding: var(--space-4) 0; }
  .x-sistemas .heading-3 { font-size: 1rem; }
  .x-sistemas-detalhe, .x-sistemas-vistoria { display: none; } /* celular: só instrumento + sistema */
}
@media (prefers-reduced-motion: reduce) { .x-sistemas li::before { transition: none; } }
```

O efeito é só o traço crescer no lugar (`scaleX`), sem deslocamento vertical.

---

## 7. 02 · Laudo (`lib/content.ts` + `ReportSection.tsx`)

**`lib/content.ts`:** troque `LAUDO_ITENS` e `LAUDO_EXEMPLO` (este agora alimenta a página de laudo, não o hero):

```ts
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
```

**`components/sections/ReportSection.tsx`:**

```tsx
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
```

**CSS:** remova `.x-report*`, `.x-pins-list*` e `.x-report-logo-block*`, e acrescente:

```css
.x-laudo { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: var(--space-12); align-items: center; }
.x-laudo-page {
  padding: var(--space-6); background: var(--surface-raised); border: 1px solid var(--line);
  box-shadow: 0 20px 40px -28px oklch(0.256 0.008 56 / .45);
}
.x-laudo-ph { display: flex; justify-content: space-between; gap: var(--space-4); padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--laranja); color: var(--ink-muted); text-transform: uppercase; }
.x-laudo-page .heading-3 { margin: var(--space-4) 0 var(--space-2); font-size: 1.25rem; }
.x-laudo-row {
  display: grid; grid-template-columns: 26px minmax(0, 1fr) auto; gap: var(--space-3); align-items: center;
  padding: var(--space-3) var(--space-2); margin: 0 calc(var(--space-2) * -1);
  border-top: 1px solid var(--line); font-size: .9375rem; transition: background .2s var(--ease-out);
}
.x-laudo-foot { display: flex; justify-content: space-between; gap: var(--space-4); margin-top: var(--space-4);
  padding-top: var(--space-3); border-top: 1px solid var(--line); color: var(--ink-muted); }
.x-laudo-points li { display: grid; grid-template-columns: 26px minmax(0, 1fr); gap: var(--space-4);
  padding: var(--space-4) 0; border-top: 1px solid var(--line); }
.x-laudo-points li:first-child { border-top-color: var(--ink); }
.x-laudo-points .heading-3 { font-size: 1.125rem; margin-bottom: 2px; }

/* Destaque sem JS: o item sob o cursor acende a linha de mesmo número; em repouso, a 1ª fica acesa */
.x-laudo-row[data-p="1"] { background: var(--laranja-soft); }
.x-laudo:has(.x-laudo-points li:hover) .x-laudo-row { background: none; }
.x-laudo:has([data-point="1"]:hover) [data-p="1"],
.x-laudo:has([data-point="2"]:hover) [data-p="2"],
.x-laudo:has([data-point="3"]:hover) [data-p="3"] { background: var(--laranja-soft); }

@media (max-width: 60em) { .x-laudo { grid-template-columns: minmax(0, 1fr); gap: var(--space-8); } }
@media (max-width: 26.25em) { .x-laudo-page { padding: var(--space-4); } .x-laudo-row .mq-tag { font-size: .6875rem; } }
```

**⚠ Diferença do preview:** no preview, um clique também acendia a linha, via JS. Aqui é `:has()` puro, que dispensa um Client Component a mais. No celular não existe hover, então a linha 1 fica acesa, o que basta como exemplo. `:has()` funciona em todos os navegadores atuais.

Quando existir um laudo real anonimizado, troque esta página HTML por fotos dele. Prova real vale mais que maquete.

---

## 8. 03 · Processo (`ProcessSteps.tsx` + CSS)

**`components/sections/ProcessSteps.tsx`:** só três mudanças: o `data-inview` na lista, o `--i` em cada passo e o fim do `is-now`.

```tsx
<section id="como-funciona" data-theme="claro" className="mq-section x-process" aria-labelledby="como-title">
  <div className="mq-container">
    <SectionHead idx="03" rotulo="Como funciona" id="como-title"
                 title={<>Do orçamento <span className="mq-hl">às chaves.</span></>} />
    <ol className="x-timeline" data-inview="">
      {PASSOS.map((p, i) => (
        <li key={p.titulo} className={i === 3 ? "has-keys" : undefined} style={{ "--i": i } as React.CSSProperties}>
          {/* ...conteúdo igual ao atual... */}
        </li>
      ))}
    </ol>
    {/* x-process-cta igual */}
```

**CSS:** acrescente depois das regras atuais de `.x-timeline`:

```css
.x-process .x-head { margin-bottom: var(--space-12); } /* era space-16 */
.x-timeline li { z-index: 1; }
/* Linha laranja por cima da cinza: cresce uma vez quando a seção entra */
.x-timeline::after {
  content: ""; position: absolute; left: 0; right: 0; top: 7px; height: 1px; background: var(--laranja);
  transform-origin: left; transition: transform 1.6s var(--ease-out);
}
.x-timeline[data-inview="pending"]::after { transform: scaleX(0); }
/* Nós acendem em sequência, acompanhando a linha */
.x-timeline li::before {
  background: var(--laranja); border-color: var(--laranja);
  transition: background .3s, border-color .3s; transition-delay: calc(var(--i) * .4s + .15s);
}
.x-timeline[data-inview="pending"] li::before { background: var(--surface); border-color: var(--line-strong); }
@media (max-width: 60em) {
  .x-timeline::after { left: 7px; right: auto; top: 8px; bottom: 8px; width: 1px; height: auto; transform-origin: top; }
  .x-timeline[data-inview="pending"]::after { transform: scaleY(0); }
  .x-timeline li { padding-bottom: var(--space-8); } /* era space-12: coluna mais curta no celular */
}
@media (prefers-reduced-motion: reduce) { .x-timeline::after, .x-timeline li::before { transition: none; } }
```

Remova a regra `.x-timeline li.is-now::before`: em repouso, todos os nós ficam acesos.

---

## 9. 04 · Achados em abas (`content.ts` + `Findings.tsx` + `CaimentoDiagrama.tsx`)

**`lib/content.ts`:** acrescente `id` e `aba` em cada achado (o resto fica igual):

```ts
export const ACHADOS: {
  id: "caimento" | "tomada" | "janela"; aba: string;
  imagem: string; alt: string; status: Status; ambiente: string; titulo: string; ocorrencias: string[];
}[] = [
  { id: "caimento", aba: "Box", /* ...campos atuais... */ },
  { id: "tomada", aba: "Tomada", /* ... */ },
  { id: "janela", aba: "Janela", /* ... */ },
];
```

**`components/ui/CaimentoDiagrama.tsx` (novo):** o desenho do box precisa ser SVG inline para inclinar. É o único efeito "de engenheiro" que ficou, e ele fica.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Corte do piso do box. Ao entrar na tela, o piso inclina uma vez e a gota escorre.
 * `corrigido` inverte: a água vai para o ralo. Cores no mesmo padrão das ilustrações (fundo grafite).
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

  const ang = !visto ? 0 : corrigido ? 1.6 : -1.4;
  const bolha = !visto ? 0 : corrigido ? -14 : 14;
  const gota = !visto ? 0 : corrigido ? 72 : -370;

  return (
    <svg ref={ref} className="x-dg" viewBox="0 0 580 300" role="img"
         aria-label={corrigido
           ? "Corte do piso do box corrigido: caimento de 1% leva a água para o ralo"
           : "Corte do piso do box: inclinação leva a água para a parede, longe do ralo"}>
      <rect width="580" height="300" fill="#312d2a" />
      <text className="x-dg-lb" x="20" y="34">CORTE A-A · BOX</text>
      <line x1="60" y1="70" x2="60" y2="240" stroke="#d7d3d0" strokeWidth="3" />
      <line x1="60" y1="240" x2="560" y2="240" stroke="#8d8987" strokeDasharray="5 5" />
      <g className="x-dg-slab" style={{ transform: `rotate(${ang}deg)` }}>
        <rect x="60" y="240" width="490" height="16" fill="#221e1b" stroke="#d7d3d0" strokeWidth="2" />
        <rect x="470" y="236" width="50" height="6" fill="#312d2a" stroke="#d7d3d0" strokeWidth="1.5" />
        <g transform="translate(170 212)">
          <rect width="220" height="28" rx="2" fill="#d6751b" />
          <rect x="80" y="7" width="60" height="14" rx="7" fill="#f4f3f1" />
          <line x1="104" y1="7" x2="104" y2="21" stroke="#312d2a" />
          <line x1="116" y1="7" x2="116" y2="21" stroke="#312d2a" />
          <ellipse className="x-dg-move" cx="110" cy="14" rx="8" ry="4.5" fill="#5cc8d6"
                   style={{ transform: `translateX(${bolha}px)` }} />
        </g>
        <circle className="x-dg-move x-dg-gota" cx="430" cy="234" r="5" fill="#5cc8d6"
                style={{ transform: `translateX(${gota}px)` }} />
      </g>
      <text className="x-dg-lb" x="478" y="284">RALO</text>
      <text className="x-dg-lo" x="20" y="284" fill={corrigido ? "#5cc8d6" : "#ff6b5e"}>
        {corrigido ? "1,0 % PARA O RALO →" : "← 0,4 % PARA A PAREDE"}
      </text>
    </svg>
  );
}
```

**`components/sections/Findings.tsx`** (vira Client Component por causa das abas):

```tsx
"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { CaimentoDiagrama } from "@/components/ui/CaimentoDiagrama";
import { Ilustracao } from "@/components/ui/Ilustracao";
import { Pin } from "@/components/ui/Pin";
import { SectionHead } from "@/components/ui/SectionHead";
import { StatusTag } from "@/components/ui/StatusTag";
import { ACHADOS } from "@/lib/content";

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
```

**CSS:** remova `.x-findings` e as media queries dela. Mantenha `.mq-project-meta` e `.mq-project-list`, que continuam em uso. Acrescente:

```css
.x-tabs { display: flex; gap: var(--space-1); margin-bottom: var(--space-8); border-bottom: 1px solid var(--line); }
.x-tabs button {
  min-height: 48px; padding: var(--space-3) var(--space-4) var(--space-4); margin-bottom: -1px;
  background: none; border: 0; border-bottom: 2px solid transparent; cursor: pointer;
  font-weight: 600; font-size: .9375rem; color: var(--ink-muted);
}
.x-tabs button[aria-selected="true"] { color: var(--ink); border-bottom-color: var(--laranja); }
.x-tabs button:hover { color: var(--ink); }
.x-case { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: var(--space-12); align-items: center; }
.x-case[hidden] { display: none; }
.x-case-fig { display: flex; flex-direction: column; gap: var(--space-2); }
.x-case-fig img, .x-dg { display: block; width: 100%; height: auto; border: 1px solid var(--line); }
.x-case-fig figcaption { color: var(--ink-muted); }
.x-case-body { display: flex; flex-direction: column; gap: var(--space-3); }
.x-case-body .heading-3 { font-size: 1.5rem; }
.x-dg-lb { font: 500 15px var(--font-mono); fill: #bbb7b5; }
.x-dg-lo { font: 600 16px var(--font-mono); }
.x-dg-slab { transform-box: view-box; transform-origin: 300px 248px; transition: transform 1.4s var(--ease-out); }
.x-dg-move { transition: transform 1.4s var(--ease-out); }
.x-dg-gota { transition-duration: 1.8s; transition-delay: .3s; }
.x-switch {
  align-self: flex-start; margin-top: var(--space-2); min-height: 44px; padding: 0 var(--space-4);
  display: inline-flex; align-items: center; gap: var(--space-3);
  background: none; border: 1px solid var(--line-strong); border-radius: var(--radius-sm); cursor: pointer; font-weight: 600;
}
.x-switch::before {
  content: ""; width: 30px; height: 16px; border-radius: 9px; background: var(--surface-raised);
  box-shadow: inset -14px 0 0 2px var(--line-strong), inset 0 0 0 2px var(--line-strong); transition: box-shadow .25s;
}
.x-switch[aria-pressed="true"]::before { box-shadow: inset 14px 0 0 2px var(--conforme), inset 0 0 0 2px var(--conforme); }
@media (max-width: 60em) { .x-case { grid-template-columns: minmax(0, 1fr); gap: var(--space-6); } }
@media (prefers-reduced-motion: reduce) { .x-dg-slab, .x-dg-move, .x-switch::before { transition: none; } }
```

**⚠ Diferença do preview:** no preview os desenhos eram traço escuro sobre papel claro. Os SVGs de tomada e janela que você já tem (`tomada-aterramento.svg`, `esquadria-vedacao.svg`) têm **fundo grafite embutido**. Por isso o diagrama de caimento usa a mesma paleta, para os três ficarem iguais. Fica como uma "prancha" escura dentro da seção clara, o que funciona bem. Se preferir igual ao preview, é preciso redesenhar os dois SVGs em traço escuro; nesse caso, me avise.

O `medicao-caimento.svg` deixa de ser usado. As versões `-m` de tomada e janela continuam valendo pelo `<Ilustracao>`.

---

## 10. 05 · FAQ com 5 perguntas (`content.ts` + `Faq.tsx`)

**`lib/content.ts`:** deixe só estas 5, nesta ordem:

1. Quanto custa a vistoria?
2. Quando devo agendar a vistoria?
3. Já recebi as chaves. Ainda vale fazer a vistoria?
4. Quanto tempo leva a vistoria?
5. E se a construtora não corrigir os problemas?

Saíram "Atendem a minha região?" (a área aparece no hero, no sobre e no rodapé), "O que vem no laudo?" (a seção 02 responde), "O que é a ART…", "Em quanto tempo recebo…", "Precisa autorizar…" e "Revistoria". Guarde os textos se quiser; o ideal é eles irem para o atendimento no WhatsApp.

O JSON-LD `FAQPage` no `page.tsx` já usa `FAQ`, então fica com 5 automaticamente. Está certo: o Google exige que as perguntas do schema estejam **visíveis** na página.

**`components/sections/Faq.tsx`:**

```tsx
import { SectionHead } from "@/components/ui/SectionHead";
import { FAQ } from "@/lib/content";

export function Faq() {
  return (
    <section id="duvidas" data-theme="claro" className="mq-section" aria-labelledby="duvidas-title">
      <div className="mq-container">
        <SectionHead idx="05" rotulo="Dúvidas" id="duvidas-title" title="Perguntas frequentes">
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
```

```css
.x-faq { max-width: 820px; }
.x-faq details:first-child { border-top-color: var(--ink); }
```

---

## 11. 06 · Ficha do engenheiro (`site.ts` + `About.tsx`)

**`lib/site.ts`:** acrescente um campo pendente para a bio:

```ts
  // PENDENTE: 1–2 frases: formação, anos de experiência, nº de vistorias
  bioEngenheiro: PENDENTE,
```

**`components/sections/About.tsx`:**

```tsx
import { SectionHead } from "@/components/ui/SectionHead";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { CREA_CONSULTA_URL, SITE } from "@/lib/site";
import { MENSAGENS } from "@/lib/whatsapp";

const FICHA = [
  { rotulo: "Responsabilidade", valor: "ART emitida em todo laudo" },
  { rotulo: "Normas de referência", valor: "NBR 16747 · NBR 17170" },
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
                <dd><WhatsAppLink origem="footer" mensagem={MENSAGENS.footer} className="mono x-nowrap">{SITE.whatsapp}</WhatsAppLink></dd>
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
```

> O WhatsApp da ficha usa a `origem="footer"` para não criar um tipo novo. Se quiser medir separado, acrescente `"sobre"` em `OrigemWhatsApp`.

**CSS:** remova `.x-about*` e `.x-carimbo*` e acrescente:

```css
.x-eng { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: var(--space-8) var(--space-12);
  align-items: start; padding-top: var(--space-8); border-top: 1px solid var(--ink); }
.x-eng-sem-foto { grid-template-columns: minmax(0, 1fr); }
.x-eng-foto { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-bottom: 3px solid var(--laranja); }
.x-eng-nome { font-size: clamp(1.5rem, 1.1rem + 1vw, 2rem); line-height: 1.1; font-weight: 700; }
.x-eng-cargo { margin-top: var(--space-2); color: var(--ink-muted); }
.x-eng-cargo a { color: inherit; text-decoration-color: var(--laranja); }
.x-ficha { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0 var(--space-6); margin-top: var(--space-6); }
.x-ficha > div { padding: var(--space-4) 0; border-top: 1px solid var(--line); min-width: 0; }
.x-ficha dt { font: 500 .6875rem/1.2 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-muted); }
.x-ficha dd { margin-top: 6px; font-weight: 600; font-size: .9375rem; }
.x-ficha dd a { color: inherit; display: inline-flex; min-height: 44px; align-items: center; margin-block: -12px; }
.x-eng-bio { margin-top: var(--space-6); color: var(--ink-muted); }
@media (max-width: 60em) { .x-ficha { grid-template-columns: 1fr 1fr; } }
@media (max-width: 47.5em) { .x-eng { grid-template-columns: minmax(0, 1fr); gap: var(--space-6); } .x-eng-foto { width: 120px; } }
```

**⚠ Diferença do preview:** os campos tracejados do preview eram só para você ver onde preencher. Em produção, campo `null` **não aparece**, no mesmo padrão `PENDENTE` que o projeto já usa. Sem foto, a ficha ocupa a largura toda.

---

## 12. 07 · Formulário com 5 campos (`QuoteForm.tsx` + `whatsapp.ts`)

**`lib/whatsapp.ts`:**
- `Lead`: **mantenha** `data`, `emp` e `obs` como opcionais. A server action e a API FastAPI continuam aceitando os campos, então não há migração. Só o formulário deixa de enviar.
- Remova `MENSAGENS.hero` e o `"hero"` de `OrigemWhatsApp`; o hero não tem mais WhatsApp.

**`components/sections/QuoteForm.tsx`:** as mudanças, em ordem:

1. `VAZIO` vira `{ nome: "", tel: "", tipo: "", m2: "", local: "" }`.
2. Remova os estados `maisAberto` e `hoje` e o `useEffect` que os inicializa. Tire `useEffect` do import se nada mais o usar.
3. A seção perde `mq-section-deep mq-dots` e ganha `x-orc`:
   ```tsx
   <section id="orcamento" className="mq-section x-orc" aria-labelledby="orcamento-title">
   ```
4. `SectionHead` ganha número, rótulo e a lista de garantias:
   ```tsx
   <SectionHead idx="07" rotulo="Orçamento" id="orcamento-title"
                title={<>Peça seu <span className="mq-hl">orçamento.</span></>}>
     <p className="body x-head-text">
       Conte sobre o imóvel e respondemos pelo WhatsApp com valor e disponibilidade. O formulário abre a
       conversa já preenchida; é só tocar em enviar.
     </p>
     <ul className="x-orc-facts">
       <li>Laudo com ART em toda vistoria</li>
       <li>{SITE.area}</li>
     </ul>
   </SectionHead>
   ```
   (`import { SITE } from "@/lib/site";`)
5. Troque o `mq-form-grid` inteiro e **apague** o `<details className="x-more">`:
   ```tsx
   <div className="mq-form-grid">
     {/* nome: igual */}
     {/* tel: igual */}
     {/* tipo: igual */}
     <div className="mq-field">
       <label htmlFor="f-m2">Metragem <span className="x-opt">opcional</span></label>
       <div className="x-unit">
         <input id="f-m2" name="m2" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4}
                enterKeyHint="next" placeholder="Ex.: 68" value={lead.m2} onChange={set("m2")} />
         <span aria-hidden="true">m²</span>
       </div>
     </div>
     <div className="mq-field mq-field-full">
       {/* local: igual, mas com enterKeyHint="send" fixo */}
     </div>
   </div>
   ```
   Fica a ordem nome · WhatsApp / tipo · metragem / bairro (largura toda), igual ao preview.

**CSS:** remova `.x-more*`, `.mq-form-grid:has(+ .x-more)` e a regra `.mq-field input[type="date"]`. Troque `.x-split-form { align-items: center; }` por `start` (título alinhado ao topo do formulário, que era o problema da rodada 3). Acrescente:

```css
.x-orc { background-color: var(--surface-prancha); }
.x-orc .mq-form { background: none; padding: 0; border-top: 0; } /* sem caixa, como o resto da página */
.x-orc-facts { display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-4); color: var(--ink-muted); }
.x-orc-facts li { display: flex; gap: var(--space-3); }
.x-orc-facts li::before { content: ""; flex: none; width: 8px; height: 1px; margin-top: .8em; background: var(--laranja-texto); }
.mq-field label .x-opt { margin-left: auto; font: 500 .75rem/1 var(--font-mono); color: var(--ink-muted); }
.mq-field label:has(.x-opt) { display: flex; align-items: baseline; }
.x-unit { position: relative; }
.x-unit input { padding-right: 48px; }
.x-unit span { position: absolute; right: var(--space-4); top: 50%; transform: translateY(-50%);
  font-family: var(--font-mono); font-size: .875rem; color: var(--ink-muted); pointer-events: none; }
```

**⚠ Diferença do preview:** o preview usava inputs só com linha embaixo. Recomendo **manter os inputs com borda** que você já tem: campo com caixa deixa mais claro onde tocar e é mais fácil de usar no celular. Tirei só a caixa *em volta* do formulário. Se quiser igual ao preview mesmo assim:

```css
.x-orc .mq-field input, .x-orc .mq-field select {
  background: transparent; border: 0; border-bottom: 1.5px solid var(--line-strong); border-radius: 0; padding-inline: 0;
}
.x-orc .mq-field select { background-position: right 0 center; }
```

**Sobre o campo WhatsApp:** fica. Como a server action salva o lead no FastAPI **antes** de abrir o wa.me, esse número é o único jeito de recuperar quem preencheu e não tocou em "enviar".

---

## 13. Rodapé, balão e limpeza

**Rodapé (`globals.css`):** `.mq-footer { background: var(--surface-prancha); }`. Assim orçamento e rodapé formam um bloco escuro só, sem a emenda de dois tons.

**`components/sections/WhatsAppFloat.tsx`:** tire `"#topo"` de `COM_WHATSAPP`. O hero não tem mais WhatsApp nem card para o balão cobrir, então o balão pode aparecer ali.

```ts
const COM_WHATSAPP = ["#orcamento", "footer.mq-footer"];
```

**`components/sections/Testimonials.tsx`:** acrescente `data-theme="claro"` na `<section>`. Ela continua escondida até `DEPOIMENTOS` ter itens reais.

**Apagar:**

| Arquivo | Motivo |
|---|---|
| `components/ui/HeroPlan.tsx` | Planta saiu do hero |
| `components/ui/ShowMore.tsx` | 01 e FAQ não recolhem mais. Apague também `.x-show-more` e `[data-collapsible]` no CSS |
| `public/assets/ilustracoes/vistoria-planta.svg` e `-m.svg` | Planta |
| `public/assets/ilustracoes/laudo-tecnico.svg` | Virou HTML |
| `public/assets/ilustracoes/medicao-caimento.svg` e `-m.svg` | Virou `CaimentoDiagrama` |

Antes de apagar, confira:

```bash
grep -rn "HeroPlan\|ShowMore\|vistoria-planta\|laudo-tecnico\|medicao-caimento\|x-extra\|is-now\|MENSAGENS.hero" app components lib
```

O resultado tem que vir vazio, a não ser pelo `imagem` do achado `caimento` em `content.ts`. Esse campo pode virar `""` ou sair do tipo.

---

## 14. Ordem sugerida e verificação

1. Tokens e header (1, 2)
2. `SectionHead` + `InView` (3, 4)
3. Seção por seção, de cima para baixo (5 → 12)
4. Limpeza (13)
5. `npm run lint` (é o `tsc --noEmit` do projeto) e `npm run build`

**Checklist de QA (desktop 1366 e celular 390):**

- [ ] Nenhum elemento sobe ou desce ao rolar. Os únicos efeitos são o traço do 01, a linha do 03 e o caimento do 04.
- [ ] Com "Reduzir movimento" ligado no sistema, tudo aparece no estado final, sem animação.
- [ ] F5 no meio da página volta ao topo (`ScrollManager` continua montado).
- [ ] Nav centralizada no desktop; abaixo de 960px aparecem o menu e o botão "Orçamento".
- [ ] Abas do 04: clique e setas ←/→ funcionam, e o leitor de tela anuncia "aba, 1 de 3".
- [ ] "Ver depois do reparo" troca o status para Conforme, e a água vai para o ralo.
- [ ] O formulário barra o envio sem nome, tipo ou bairro e foca o primeiro campo faltante.
- [ ] A mensagem do WhatsApp sai com a metragem quando preenchida, e sem a linha quando vazia.
- [ ] O lead chega ao FastAPI (`API_URL` configurada) com `data`, `emp` e `obs` nulos.
- [ ] `FAQPage` no JSON-LD com 5 perguntas (teste no Rich Results Test).
- [ ] Nada vaza para os lados em 320px.
- [ ] O balão do WhatsApp aparece no hero e some no orçamento e no rodapé.

---

## 15. Pendências de conteúdo (bloqueiam a publicação, não a implementação)

Em `lib/site.ts`, enquanto estiverem `null` o site esconde o campo, mas a página perde força:

| Campo | Onde aparece | Impacto |
|---|---|---|
| `engenheiro`, `crea` | Hero (faixa), 06, rodapé | **Alto.** É a prova de "quem vistoria é quem assina". Pela Lei 5.194/66, a divulgação de serviço de engenharia deve trazer nome e registro do profissional; vale confirmar com o CREA-SP |
| `fotoEngenheiro` | 06 (e, se quiser, o hero) | **Alto.** Resolve o espaço vazio do hero |
| `bioEngenheiro` | 06 | Médio |
| `laudoExemploPdf` | 02 | Médio. Um laudo real anonimizado vale mais que a página de exemplo |
| `DEPOIMENTOS` | Entre 04 e 05 | Alto, quando houver autorização dos clientes |
| `NEXT_PUBLIC_GTM_ID` | `.env` | Sem ele não há como medir os cliques em `cta_whatsapp` |
