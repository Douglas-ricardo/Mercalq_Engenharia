# Relatório de UX/UI — Site Mercalq (foco mobile)

28/10/2026 · Douglas

## Resumo

O site evoluiu bem: **13 dos 16 problemas do QA anterior foram resolvidos** e o formulário agora valida, foca o campo com erro e abre o WhatsApp em nova aba. A nova rodada encontrou **19 pontos (2 altos, 7 médios, 10 baixos)**, a maioria no mobile.

Corrigir primeiro:

1. **Título quebrando no meio da palavra em 320 px** — "apartament / o" no H1 do hero (UX-M01).
2. **Sem botão na primeira tela do iPhone SE (320×568)** — o primeiro CTA começa em 603 px (UX-M02).
3. **`og:image` apontando para `localhost`** — em produção, o link compartilhado no WhatsApp pode sair sem prévia (UX-S01).
4. **Página longa demais no mobile** — 11.623 px em 375 px (~16 telas); o formulário fica a 13 telas do topo (UX-M04).

## Escopo e método

Revisão de UX/UI no Google Chrome em `http://localhost:3000/` (build de desenvolvimento), página única.

| Largura | Referência | O que foi feito |
| --- | --- | --- |
| 320 × 568 | iPhone SE | Primeira dobra, quebras de palavra, header |
| 360 · 390 · 430 | Android médio, iPhone 14/15, Pro Max | Overflow, header, quebras de palavra |
| 375 × 740 | iPhone padrão | Rolagem completa com screenshots, menu, formulário ponta a ponta |
| 768 | Tablet | Header, menu, hero |
| 1100 | Desktop | Rolagem completa (o monitor limitou a janela a 1100 px) |

Em cada largura: rolagem horizontal, palavras quebradas no meio, sobreposições, alvos de toque, tamanho de fonte, primeira dobra e altura da página. Testes funcionais: menu (abrir, Esc, navegar por âncora), validação do formulário, envio com dados de teste e mensagem gerada no WhatsApp, console.

Limites: mobile simulado por iframe na mesma origem (sem toque nem user agent de celular). Safari/iOS real e performance (Lighthouse) não foram testados.

## Mobile

12 pontos. Não há rolagem horizontal em nenhuma largura de 320 a 768 px, todos os alvos de toque têm pelo menos 44 px e o menu funciona (abre, fecha com Esc, fecha ao navegar).

| ID | Severidade | Largura | Seção | Problema | Correção |
| --- | --- | --- | --- | --- | --- |
| UX-M01 | Alta | 320 px | Hero | O H1 quebra "apartamento" no meio: "apartament" / "o". Causa: `overflow-wrap: anywhere` com fonte fixa de 41,6 px e `font-stretch: 118%` numa coluna de 288 px. O título fica com 5 linhas. | Fonte fluida (`clamp(32px, 10.5vw, 64px)`) e `overflow-wrap: normal` nos títulos. |
| UX-M02 | Alta | 320 × 568 | Hero | Nenhum botão aparece na primeira tela: "Solicitar orçamento" começa em 603 px. | Junto com a M01: reduzir o espaço acima do eyebrow, encurtar o lead no mobile (~2 linhas). Meta: primeiro CTA acima de 540 px. |
| UX-M03 | Média | 320 px | Sobre | O telefone quebra no hífen: "(11) 99188-" / "4544" no cartão. | `white-space: nowrap` no número. |
| UX-M04 | Média | 375 px | Página toda | 11.623 px de altura (~16 telas). O formulário começa em 9.407 px. Maiores blocos: comparação "Seis sistemas" (1.470 px), Achados (1.688 px), FAQ (1.537 px), rodapé (1.067 px). | Comparação: mostrar 3 sistemas e "Ver os 6". FAQ: 6 perguntas no mobile. Rodapé compacto (M05). Meta: ≤ 9.000 px. |
| UX-M05 | Média | 375 px | Rodapé | O rodapé ocupa 1.067 px: logo grande e uma segunda lista de navegação que repete o menu. | Logo em 96 px, contato em uma coluna, tirar a navegação no mobile. Meta: ~450 px. |
| UX-M06 | Média | Mobile | Formulário | Na nota "Seus dados são usados… Política de privacidade", o link tem `display: inline-flex` e `min-height: 44px` e abre um vão grande entre as duas linhas. | Link `display: inline` e área de toque com `padding-block: 12px` mais margem negativa igual. |
| UX-M07 | Baixa | 320–390 px | Hero | A linha de credenciais (mono 13 px) quebra no meio da frase: "Laudo com ART" / "registrada no CREA…". | Três itens empilhados ou em chips com `white-space: nowrap`. |
| UX-M08 | Baixa | Mobile | Menu | O painel abre sem fundo escurecido e sem travar a rolagem, e o foco continua no `body`. | Overlay com `rgba(0,0,0,.5)`, `overflow: hidden` no body enquanto aberto, foco no primeiro link. |
| UX-M09 | Baixa | Mobile | Laudo, Achados | O botão flutuante do WhatsApp cobre o fim de linhas de texto (ex.: "o mesmo usado na lista do laudo"). | `bottom: max(16px, env(safe-area-inset-bottom))` e `padding-inline-end: 72px` nas listas que encostam no canto. |
| UX-M10 | Baixa | Mobile | Formulário | São 8 campos empilhados (~1.000 px). Data aceita datas passadas. | Agrupar metragem, data, empreendimento e observações em "Mais detalhes (opcional)". `min` = hoje no campo de data. |
| UX-M11 | Baixa | Mobile | Formulário | Sem `enterkeyhint`: o teclado mostra "Enter" em vez de "Próximo"/"Enviar". | `enterKeyHint="next"` nos campos e `"send"` no último. |
| UX-M12 | Baixa | Mobile | Laudo | A nota de rodapé dentro do SVG do laudo ("1. Desnível de 4 mm em 1 m…") renderiza com ~8 px. | Aumentar no SVG para ≥ 14 px no viewBox ou tirar da imagem e passar para a legenda HTML. |

## Desktop

5 pontos, todos de layout. O hero está resolvido: o cartão do laudo não cobre mais a planta e o rótulo do botão flutuante saiu.

| ID | Severidade | Seção | Problema | Correção |
| --- | --- | --- | --- | --- |
| UX-D01 | Média | Orçamento | O título "Peça seu orçamento." fica centralizado na vertical ao lado do formulário (`align-items: center`): começa 315 px abaixo do topo do formulário, e o topo da seção fica vazio. | `align-items: start` no `.x-split` e `position: sticky; top: 112px` na coluna do título. |
| UX-D02 | Baixa | FAQ | A coluna da esquerda (título) acaba logo e deixa ~900 px vazios ao lado das perguntas. | Mesma regra sticky da D01 na coluna do título. |
| UX-D03 | Baixa | Laudo, Como funciona | Descrições em 13–14 px: pequenas para o padrão premium e para o público (compradores, muitos acima de 40 anos). | Mínimo de 15 px nas descrições, 16 px no texto corrido. |
| UX-D04 | Baixa | Página toda | A numeração de seção vai de 01 a 04 e para; FAQ, Sobre e Orçamento ficam sem número. | Numerar todas (05–07) ou tirar a numeração das seções de apoio de propósito e documentar no design system. |
| UX-D05 | Baixa | Achados | No 3º cartão a tag "Não conforme" e "Dormitório · esquadria" quebram em duas linhas, e o título fica mais baixo que nos outros dois. | Tag e metadado em linhas separadas nos três cartões, ou `flex-wrap: nowrap` com metadado truncado. |

## Conteúdo e SEO

Dois pontos médios. O resto da base de SEO está completo: Open Graph e Twitter card com imagem 1200×630, meta description com 141 caracteres e nenhum erro no console.

| ID | Severidade | Problema | Correção |
| --- | --- | --- | --- |
| UX-S01 | Média | `og:image` e `twitter:image` saem como `http://localhost:3000/opengraph-image.png`, enquanto `og:url` é `https://www.mercalq.com.br`. Sem `metadataBase`, o Next.js usa `localhost` no build de produção fora da Vercel, e o WhatsApp não consegue baixar a prévia. | `metadataBase: new URL("https://www.mercalq.com.br")` no `layout.tsx`. Depois do deploy, validar no depurador de compartilhamento do Facebook. |
| UX-C01 | Média | O achado "Tomada sem aterramento" (pino terra sem continuidade) está marcado como **Atenção**. Falta de aterramento é requisito de segurança (NBR 5410) e um engenheiro classificaria como **Não conforme**. Para quem entende, a classificação branda tira credibilidade. | Mudar para Não conforme, ou trocar o exemplo de Atenção por algo estético (ex.: espelho de tomada desalinhado). Confirmar com o engenheiro. |

## Status do QA anterior

13 resolvidos, 3 parciais, nenhum pendente.

| ID | Problema anterior | Status |
| --- | --- | --- |
| QA-01 | Marca colidindo com o botão no header em 320 px | Resolvido — "ENGENHARIA" some e o botão vira "Orçamento" |
| QA-02 | Placeholders "a confirmar" visíveis | Resolvido |
| QA-03 | Formulário sem feedback de erro | Resolvido — mensagens, `aria-invalid`, `aria-describedby` e foco no 1º campo |
| QA-04 | Cartão do hero cobrindo a planta | Resolvido |
| QA-05 | Rótulo "Fale no WhatsApp" sobre o conteúdo | Resolvido — só o círculo, oculto no hero e no formulário |
| QA-06 | Botão flutuante cobrindo texto | Parcial — ver UX-M09 |
| QA-07 | Textos dos SVGs ilegíveis | Parcial — versões mobile legíveis; nota do laudo ainda pequena (UX-M12) |
| QA-08 | Tag sobre o desenho em Achados | Resolvido — tag abaixo da imagem |
| QA-09 | WhatsApp abrindo na mesma aba | Resolvido — nova aba aberta no clique, com aviso e "Abrir de novo" |
| QA-10 | Sem `og:image` | Parcial — imagem criada, mas URL em `localhost` (UX-S01) |
| QA-11 | Alvos de toque abaixo de 44 px | Resolvido |
| QA-12 | Tablet sem navegação | Resolvido — menu hambúrguer até 1023 px |
| QA-13 | Ponto do H1 fora do marca-texto | Resolvido |
| QA-14 | Chip "Chaves" sem contexto | Resolvido — "Entrega das chaves" |
| QA-15 | "ENGENHARIA" em 8,5 px | Resolvido — 10 px |
| QA-16 | Mensagem sem linha em branco | Resolvido |

## Plano de correção

Três blocos. O primeiro é só CSS e configuração e cabe em uma hora.

**1. Antes de publicar**

- [ ] UX-M01 e UX-M02 — tipografia fluida no hero e CTA na primeira dobra
- [ ] UX-S01 — `metadataBase`
- [ ] UX-M03 — telefone sem quebra
- [ ] UX-C01 — status do achado de aterramento

```css
/* UX-M01/M02: títulos sem quebra no meio da palavra */
h1, h2, h3 { overflow-wrap: normal; word-break: normal; hyphens: manual; }
#topo h1 { font-size: clamp(32px, 10.5vw, 64px); line-height: 1.04; }
@media (max-width: 400px) {
  #topo { padding-top: 20px; }
  #topo .mq-eyebrow { margin-bottom: 8px; }
  #topo .lead { font-size: 17px; line-height: 26px; }
}

/* UX-M03: telefone não quebra (envolver o número em <span class="x-phone">) */
a[href^="tel:"], .x-phone { white-space: nowrap; }
```

```ts
// UX-S01: app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://www.mercalq.com.br"),
  // ...resto igual
};
```

**2. Encurtar a página no mobile**

- [ ] UX-M04 — comparação com "Ver os 6" e FAQ com 6 perguntas no mobile
- [ ] UX-M05 — rodapé compacto
- [ ] UX-M10 — campos opcionais recolhidos
- [ ] UX-M06 — link da política de privacidade
- [ ] UX-D01 e UX-D02 — colunas de título sticky no desktop

```tsx
// UX-M10: opcionais recolhidos, sem perder dados no envio
<details className="x-more">
  <summary>Mais detalhes <small>(opcional)</small></summary>
  {/* metragem, data, empreendimento, observações */}
</details>

// data a partir de hoje
<input id="f-data" type="date" min={new Date().toISOString().slice(0, 10)} />
```

```css
/* UX-M05 */
@media (max-width: 767px) {
  .mq-footer { padding: 56px 0 96px; }
  .mq-footer img[alt="Mercalq Engenharia"] { width: 96px; }
  .mq-footer nav { display: none; }
}

/* UX-M06 */
#orcamento p a { display: inline; min-height: 0; padding-block: 12px; margin-block: -12px; }

/* UX-D01/D02 */
@media (min-width: 1024px) {
  .x-split { align-items: start; }
  .x-split-aside { position: sticky; top: 112px; }
}
```

**3. Polimento** — UX-M07 a M09, M11, M12 e UX-D03 a D05, numa passada de CSS e texto.

```tsx
// UX-M08: menu com fundo, rolagem travada e foco no 1º link
useEffect(() => {
  document.body.style.overflow = open ? "hidden" : "";
  if (open) panelRef.current?.querySelector("a")?.focus();
  return () => { document.body.style.overflow = ""; };
}, [open]);

{open && <div className="mq-menu-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
```

```css
.mq-menu-backdrop { position: fixed; inset: 64px 0 0; background: rgba(0,0,0,.5); z-index: 9; }
.mq-menu-panel { z-index: 10; }

/* UX-M09: safe area do iPhone */
.x-wa-float { bottom: max(16px, env(safe-area-inset-bottom)); right: max(16px, env(safe-area-inset-right)); }
```

Depois das correções: refazer as larguras de 320 e 375 px e testar num iPhone real (Safari), principalmente o hero, o menu e o envio do formulário.

## Execução das correções (28/10/2026)

Medido no Chrome com emulação de dispositivo (320×568 a 1440×900); `tsc` sem erros, console limpo, indicador do Next.js sem avisos, contraste AA sem falhas.

| ID | Status | Resultado |
| --- | --- | --- |
| UX-M01 | Feito | Título com `10.5vw` abaixo de 400 px: nenhuma palavra quebrada de 320 a 1440 px. O desktop não mudou |
| UX-M02 | Feito | 1º botão em 410 px no 320×568 (era 603 px) |
| UX-M03 | Feito | Telefone numa linha no carimbo e no rodapé |
| UX-M04 | Parcial | 3 sistemas + "Ver os 6" e 6 perguntas + "Ver todas" no celular (só recolhem com JS). Página em 375 px: 9.976 px (era 11.623; meta 9.000). Formulário em 8.396 px (era 9.407) |
| UX-M05 | Parcial | Logo em 96 px, sem a navegação repetida, sem o respiro do botão flutuante (que some no rodapé): 518 px (era 1.067; meta ~450) |
| UX-M06 | Feito | Link inline com área de toque de 46 px, sem vão entre as linhas |
| UX-M07 | Feito | Cada credencial inteira numa linha |
| UX-M08 | Feito | Fundo escurecido (toque fecha), rolagem travada, foco no 1º link |
| UX-M09 | Feito | Botão flutuante respeita a área segura do iPhone; listas do laudo e dos achados com 48 px de respiro à direita no celular |
| UX-M10 | Feito | Metragem, data, empreendimento e observações em "Mais detalhes (opcional)" no celular; abertos no desktop. Data mínima = hoje |
| UX-M11 | Feito | `enterKeyHint="next"` nos campos de uma linha (no textarea o Enter continua quebrando linha) |
| UX-M12 | Feito | Nota do laudo com 24 no viewBox (~13 px no celular) e texto mais curto |
| UX-D01, UX-D02 | Mantido | Pedem colunas `sticky`; o cliente decidiu manter como está (título centralizado ao lado do formulário, sem blocos que sobem e descem) |
| UX-D03 | Feito | Descrições do laudo e da linha do tempo em 15 px |
| UX-D04 | Mantido | Numeração só nas seções de conteúdo, já documentada no `DESIGN-SYSTEM.md` |
| UX-D05 | Feito | Etiqueta e ambiente em linhas separadas nos três achados |
| UX-S01 | Falso positivo | `metadataBase` já existe (`app/layout.tsx`); o `localhost` só aparece no `next dev`. O build de produção sai com `https://www.mercalq.com.br` (conferido no QA-2) |
| UX-C01 | Feito | "Tomada sem aterramento" agora é Não conforme. Confirmar com o engenheiro |

Depois desta rodada, para quebrar a repetição das seções do meio (aprovado pelo cliente): no desktop o laudo passou a ter a imagem à esquerda, e o Sobre abre com "Quem vistoria é quem assina." em destaque, com o carimbo à esquerda e o texto à direita.
