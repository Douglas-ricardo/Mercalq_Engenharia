# Relatório de UX/UI — Rodada 3 · Site Mercalq

28/10/2026 · Douglas

## Resumo

O site está **funcionalmente pronto**: formulário, menu, "Ver os 6 sistemas", "Ver todas as perguntas" e envio ao WhatsApp passaram em todos os testes, e não há rolagem horizontal nem palavra quebrada de 320 a 1280 px. Sobram **13 pontos (2 altos, 4 médios, 7 baixos)**, incluindo os seus dois pedidos:

1. **F5 mandando para o final** — causa encontrada: os links internos gravam `#orcamento` na URL, e o recarregamento volta para essa seção. A correção é um componente de ~30 linhas.
2. **Hero igual à seção 01** — os dois usam exatamente o mesmo fundo (`--surface`), então não há corte visual. Prototipei na sua página uma proposta, a "folha técnica": grade de prancheta, régua métrica, marcas de registro e um carimbo de desenho técnico como borda inferior. Prints e código estão logo abaixo.

Também continua aberto da rodada anterior: o título do formulário no desktop ainda fica centralizado na vertical, 314 px abaixo do topo do formulário.

## Bug do F5

Reproduzido: depois de clicar em "Solicitar orçamento", a URL vira `localhost:3000/#orcamento` e o F5 recarrega direto na seção de orçamento (8.606 px de 9.756 possíveis), que parece "o final da página".

| Cenário | Resultado no F5 |
| --- | --- |
| Página aberta no topo | Fica no topo (ok) |
| Rolou até o meio, sem clicar em links | Volta para o mesmo ponto (`history.scrollRestoration = "auto"`, comportamento padrão) |
| Clicou em qualquer link interno (header, menu, rodapé, hero) | Vai para a seção do `#hash` gravado na URL; com `#orcamento`, quase o fim |

**Causa:** os links usam `href="#orcamento"` e, no rodapé, `href="/#orcamento"`. Cada clique grava o hash na URL, e o navegador sempre rola até o hash quando a página carrega.

**Correção** (em duas partes):

1. No F5, sempre voltar ao topo e limpar o hash. Um link compartilhado com `#orcamento` (ex.: na bio do Instagram) continua funcionando na primeira visita.
2. Os links internos rolam sem gravar hash na URL.

```tsx
// components/ScrollManager.tsx — incluir uma vez no layout
"use client";
import { useEffect } from "react";

export function ScrollManager() {
  useEffect(() => {
    history.scrollRestoration = "manual";
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload") {
      history.replaceState(null, "", location.pathname + location.search);
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
      if (!a || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href")!.split("#")[1];
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      // espera o menu fechar e liberar o overflow do body antes de rolar
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
```

O menu mobile continua fechando ao clicar: o handler dele roda antes deste, e o `requestAnimationFrame` espera o `overflow: hidden` do body sair antes de rolar. O `scroll-margin-top` das seções, que compensa o header fixo, não muda.

## Hero com impacto: "folha técnica"

Hoje o hero e a seção 01 usam o mesmo fundo (`--surface`), e o visitante não percebe onde termina a abertura. A proposta transforma o hero numa **folha de desenho técnico**, a linguagem que só quem é de engenharia usa:

- **Fundo próprio:** grafite mais escuro (`#1b1a18`) com grade de prancheta (linhas a cada 24 e 120 px, que somem nas bordas) e um brilho laranja sutil atrás da planta. A seção 01 fica mais clara, e o corte é imediato.
- **Régua métrica** no topo (0, 1 m, 2 m…) com a etiqueta "FOLHA 01 · VISTORIA DE RECEBIMENTO".
- **Marcas de registro** laranja (+) nos quatro cantos da planta, como numa prancha impressa.
- **Carimbo técnico** (a legenda do desenho de engenharia) como borda inferior do hero: Emitente · Responsável técnico · Normas · Entrega · Folha. Substitui a linha mono de credenciais e resolve também os pontos soltos no fim das linhas.
- **Título maior no desktop** (até 88 px).

Print do protótipo aplicado na sua página, desktop a 1280 px:

![Hero folha técnica — desktop](hero-folha-tecnica-desktop.png)

Mobile a 375 px (primeira tela e o carimbo encostando na seção 01):

![Hero folha técnica — mobile](hero-folha-tecnica-mobile.png)

Com isso, o hero cresce ~150 px no mobile e os dois botões continuam na primeira tela. Se o engenheiro tiver uma **foto real em campo** (com instrumento, sem rosto), ela pode entrar atrás da grade com 20% de opacidade: é a prova mais forte de "profissional de verdade".

```tsx
{/* Hero.tsx — dentro de <section id="topo" className="x-hero"> */}
<div className="x-ruler mq-container" aria-hidden="true">
  {[0, 1, 2, 3, 4, 5].map((m) => (
    <span key={m} style={{ left: m * 120 }}>{m ? `${m} m` : "0"}</span>
  ))}
  <b>FOLHA 01 · VISTORIA DE RECEBIMENTO</b>
</div>

{/* …x-hero-grid como está; dentro de .x-hero-plan: */}
{["tl", "tr", "bl", "br"].map((p) => <i key={p} className={`x-reg x-reg-${p}`} aria-hidden="true" />)}

{/* no fim do .x-hero-grid, no lugar de <p className="x-hero-norms"> */}
<dl className="x-stamp">
  <div className="x-stamp-brand"><dt>Emitente</dt><dd>Mercalq Engenharia</dd></div>
  <div><dt>Responsável técnico</dt><dd><span className="x-long">Engenheiro civil</span><span className="x-short">Eng. civil</span> · CREA-SP</dd></div>
  <div><dt>Normas</dt><dd>NBR 16747 · 17170</dd></div>
  <div><dt>Entrega</dt><dd>Laudo + ART</dd></div>
  <div className="x-stamp-sheet"><dt>Folha</dt><dd>01/07</dd></div>
</dl>
```

```css
.x-hero { position: relative; isolation: isolate; overflow: hidden; background: #1b1a18; padding-bottom: 0; }
.x-hero::before { content: ""; position: absolute; inset: 0; z-index: -2;
  background-image:
    linear-gradient(rgb(212 212 212 / .085) 1px, transparent 1px),
    linear-gradient(90deg, rgb(212 212 212 / .085) 1px, transparent 1px),
    linear-gradient(rgb(212 212 212 / .035) 1px, transparent 1px),
    linear-gradient(90deg, rgb(212 212 212 / .035) 1px, transparent 1px);
  background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
  mask-image: radial-gradient(120% 90% at 75% 35%, #000 35%, transparent 100%); }
.x-hero::after { content: ""; position: absolute; z-index: -1; right: -10%; top: -20%; width: 70%; height: 120%;
  background: radial-gradient(closest-side, rgb(214 117 27 / .10), transparent); pointer-events: none; }

.x-ruler { position: relative; height: 28px; margin-bottom: 40px; border-bottom: 1px solid rgb(212 212 212 / .28);
  background-image: repeating-linear-gradient(90deg, rgb(212 212 212 / .55) 0 1px, transparent 1px 120px),
                    repeating-linear-gradient(90deg, rgb(212 212 212 / .30) 0 1px, transparent 1px 24px);
  background-size: 100% 12px, 100% 6px; background-repeat: no-repeat; background-position: bottom left;
  font: 500 11px/1 var(--font-mono); letter-spacing: .06em; color: #8a8a8a; }
.x-ruler span { position: absolute; top: 2px; transform: translateX(4px); }
.x-ruler b { position: absolute; right: 0; top: 2px; font-weight: 500; color: var(--laranja-texto); }

.x-hero-plan { position: relative; }
.x-reg { position: absolute; width: 18px; height: 18px; }
.x-reg::before, .x-reg::after { content: ""; position: absolute; background: var(--laranja); }
.x-reg::before { left: 8px; width: 2px; height: 18px; } .x-reg::after { top: 8px; height: 2px; width: 18px; }
.x-reg-tl { top: -9px; left: -9px; } .x-reg-tr { top: -9px; right: -9px; }
.x-reg-bl { bottom: -9px; left: -9px; } .x-reg-br { bottom: -9px; right: -9px; }

.x-hero-title { font-size: clamp(34px, 6.4vw, 88px); line-height: .98; letter-spacing: -.025em; }

.x-stamp { grid-column: 1 / -1; margin: 56px 0 0; display: grid; grid-template-columns: 1.4fr 1.2fr 1fr 1fr .7fr;
  border: 1px solid rgb(212 212 212 / .32); border-bottom: 0; background: rgb(27 26 24 / .85); }
.x-stamp > div { padding: 14px 18px; border-right: 1px solid rgb(212 212 212 / .2); display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.x-stamp > div:last-child { border-right: 0; }
.x-stamp dt { font: 500 10.5px/1.2 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: #9a9a9a; }
.x-stamp dd { margin: 0; font: 600 15px/1.3 var(--font-sans); color: var(--ink); white-space: nowrap; }
/* símbolo como fundo: dentro de <dl> só pode haver <div> com <dt>/<dd> */
.x-stamp-brand { padding-left: 60px !important; background: url("/assets/logos/mercalq-simbolo.png") 18px center / 30px auto no-repeat; }
.x-stamp-sheet dd { font-family: var(--font-mono); font-weight: 500; color: var(--laranja-texto); }
.x-short { display: none; }

@media (max-width: 1023px) {
  .x-ruler { height: 22px; margin-bottom: 24px; }
  .x-ruler b, .x-ruler span:nth-child(n+4) { display: none; }
  .x-stamp { grid-template-columns: 1fr 1fr; margin-top: 40px; }
  .x-stamp-brand { display: none !important; }
  .x-stamp > div { padding: 12px 14px; border-bottom: 1px solid rgb(212 212 212 / .2); }
  .x-stamp > div:nth-child(odd) { border-right: 0; }
  .x-stamp > div:nth-last-child(-n+2) { border-bottom: 0; }
  .x-stamp dd { font-size: 14px; }
  .x-long { display: none; } .x-short { display: inline; }
}
@media (prefers-reduced-motion: no-preference) {
  .x-reg { animation: x-reg-in .5s 1.8s both; }
  @keyframes x-reg-in { from { opacity: 0; transform: scale(.4); } }
}
```

O "Folha 01/07" combina com a numeração das seções (01–04). Se adotar o carimbo, vale numerar as sete seções, e cada uma vira uma "folha" do projeto (ver UX3-D02).

## Problemas encontrados

13 pontos, incluindo o F5 (UX3-F01) e o hero (UX3-V01) descritos acima. Nenhum quebra o site; os médios afetam leitura ou layout em larguras específicas.

| ID | Severidade | Largura | Seção | Problema | Correção |
| --- | --- | --- | --- | --- | --- |
| UX3-F01 | Alta | Todas | Página | F5 vai para `#orcamento` depois de clicar em qualquer link interno. | `ScrollManager` (seção Bug do F5). |
| UX3-V01 | Alta | Todas | Hero | O hero tem o mesmo fundo da seção 01, sem corte nem identidade de engenharia. | "Folha técnica" (seção Hero com impacto). |
| UX3-M01 | Média | Mobile | Laudo, Achados | A lista numerada do laudo (`.x-pins-list`) tem `padding-right: 48px`. Sobra uma coluna de 245 px em tela de 375, e "Relatório com normas e ART" e as descrições quebram cedo. Esse padding veio da minha sugestão UX-M09, que não funcionou: o botão flutuante cobrir texto ao rolar é aceitável. | Remover o `padding-right` da `.x-pins-list` e das listas de Achados no mobile. |
| UX3-D01 | Média | ≥ 1024 px | Orçamento | Ainda aberto da rodada anterior: "Peça seu orçamento." fica centralizado na vertical, 314 px abaixo do topo do formulário (`align-items: center`). A coluna da FAQ também não é sticky. | `.x-split { align-items: start }` e `.x-split-aside { position: sticky; top: 112px }`. |
| UX3-T01 | Média | 768–1023 px | Hero | No tablet e em notebook pequeno o hero vira uma coluna e chega a 1.468 px de altura (2 telas): a planta ocupa a largura toda abaixo do texto. | Duas colunas a partir de 900 px, ou planta com `max-width: 560px` centralizada. |
| UX3-T02 | Média | 768–1023 px | Achados | Grade de 2 colunas com 3 cartões: o terceiro fica sozinho, com um buraco ao lado. | Uma coluna com imagem à esquerda e texto à direita, ou 3 colunas a partir de 900 px. |
| UX3-M02 | Baixa | 320–430 px | Sobre | No cartão, "NBR 16747 · NBR 17170" quebra entre "NBR" e "17170". | Uma norma por linha, ou `white-space: nowrap` em cada norma. |
| UX3-M03 | Baixa | Mobile | Hero | A linha de credenciais empilhada deixa "·" solto no fim das linhas ("Engenheiro civil ·"). | Some com o carimbo técnico; sem ele, trocar os pontos por `gap` entre os itens. |
| UX3-M04 | Baixa | Mobile | Achados | É a seção mais longa (1.792 px de 10.060). As três ilustrações estão em 3:2. | `aspect-ratio: 16/9` nas imagens do mobile (− ~150 px). |
| UX3-M05 | Baixa | Mobile | Formulário | Com "Mais detalhes" fechado, o último campo visível (bairro) tem `enterkeyhint="next"`, mas o próximo passo é enviar. | `enterKeyHint={detalhesAberto ? "next" : "send"}`. |
| UX3-C01 | Baixa | Mobile | Hero | O eyebrow "VISTORIA DE RECEBIMENTO DE IMÓVEL NOVO" ocupa 2 linhas, e o lead ocupa 5. | Eyebrow: "VISTORIA DE IMÓVEL NOVO". Lead: "Antes de assinar o termo de recebimento, um engenheiro civil confere acabamentos, instalações e projeto. Você recebe laudo com fotos e ART." (− 1 linha). |
| UX3-D02 | Baixa | Todas | Página | A numeração vai de 01 a 04 e para (FAQ, Sobre e Orçamento sem número). | Numerar 05–07 — combina com "Folha 01/07" do carimbo. |
| UX3-D03 | Baixa | Todas | Sobre | "Quem vistoria é quem assina." usa 56 px, enquanto os outros H2 têm 32 px. | Se for de propósito (frase-manifesto), criar o estilo `display-statement` no design system; senão, voltar para `heading-2`. |

## Funcionalidades e rodada anterior

Tudo o que é interação funcionou. Console sem erros.

| Teste (mobile 375 px) | Resultado |
| --- | --- |
| Menu: abrir, fundo escurecido, travar rolagem, foco no 1º link | OK |
| Menu: Esc fecha e devolve o foco ao botão | OK |
| "Ver os 6 sistemas" / "Ver menos" (3 → 6 linhas, `aria-expanded`) | OK |
| "Ver todas as 11 perguntas" (6 → 11) | OK |
| Formulário vazio: 3 erros, `aria-invalid`, foco em Nome | OK |
| "Mais detalhes (opcional)" recolhe metragem, data, empreendimento e observações | OK |
| Data com mínimo = hoje | OK |
| Envio: nova aba, mensagem certa, aviso "Abrir de novo" | OK |
| Primeira dobra em 320×568 com os dois botões | OK (CTA em 410–534 px) |

**Rodada 2 (UX-xx):** 13 resolvidos, 2 parciais, 3 pendentes e 1 a confirmar no deploy.

| Item | Status |
| --- | --- |
| UX-M01/M02 título e primeira dobra em 320 px | Resolvido |
| UX-M03 telefone quebrando | Resolvido |
| UX-M04 página longa | Parcial — 11.623 → 10.060 px (meta 9.000) |
| UX-M05 rodapé | Resolvido — 1.067 → 518 px |
| UX-M06 link da privacidade | Resolvido |
| UX-M07 linha de credenciais | Parcial — ver UX3-M03 |
| UX-M08 menu | Resolvido |
| UX-M09 botão flutuante | Resolvido, mas gerou o UX3-M01 |
| UX-M10/M11/M12 formulário e laudo | Resolvido |
| UX-D01/D02 colunas sticky | Pendente — UX3-D01 |
| UX-D03 fonte das descrições | Resolvido (15 px) |
| UX-D04 numeração | Pendente — UX3-D02 |
| UX-D05 cartões de Achados | Resolvido |
| UX-S01 `og:image` em localhost | Não verificado no dev; confirmar `metadataBase` depois do deploy |
| UX-C01 status do aterramento | Resolvido — Não conforme |

## Plano de correção

Três blocos, na ordem. Os dois primeiros cabem num dia.

**1. Seus dois pedidos**

- [ ] UX3-F01 — `ScrollManager` no layout (F5 volta ao topo, links sem `#` na URL)
- [ ] UX3-V01 — hero "folha técnica": régua, grade, marcas de registro e carimbo
- [ ] UX3-M03 e UX3-D02 — sair junto com o carimbo: tirar a linha de credenciais e numerar as seções 05–07

**2. Layout**

- [ ] UX3-M01 — tirar o `padding-right` das listas numeradas
- [ ] UX3-D01 — colunas de título sticky (orçamento e FAQ)
- [ ] UX3-T01 e UX3-T02 — hero e Achados no tablet

```css
/* UX3-M01 */
@media (max-width: 767px) { .x-pins-list, #achados .mq-findings { padding-right: 0; } }

/* UX3-D01 */
@media (min-width: 1024px) {
  .x-split { align-items: start; }
  .x-split-aside { position: sticky; top: 112px; }
}

/* UX3-T01: hero em 2 colunas a partir de 900 px */
@media (min-width: 900px) and (max-width: 1023px) {
  .x-hero-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); align-items: center; }
}

/* UX3-T02: Achados em lista horizontal no tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  #achados .x-findings-grid { grid-template-columns: 1fr; }
  #achados .x-findings-grid > article { display: grid; grid-template-columns: 300px 1fr; gap: 24px; align-items: start; }
}

/* UX3-M02 */
.x-norm { white-space: nowrap; }

/* UX3-M04 */
@media (max-width: 767px) { #achados img { aspect-ratio: 16 / 9; object-fit: cover; } }
```

> A classe `.x-findings-grid` é um nome sugerido: use o seletor real da grade de Achados no seu projeto.

**3. Textos** — UX3-C01 (eyebrow e lead mais curtos no mobile), UX3-D03 (decidir o estilo do H2 do Sobre) e UX3-M05 (`enterKeyHint` dinâmico).

Depois: refazer em 375 px e 1280 px, testar o F5 depois de clicar em cada link do menu, e abrir num iPhone real (Safari). A sensação do hero novo depende muito da tela física e do brilho.
