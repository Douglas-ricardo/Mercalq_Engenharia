# Auditoria final · Mercalq (pós-redesign V2)

**Data:** 28/10/2026
**Ambiente:** `localhost:3000` (Next 16.4 dev) e código em `Felipe/`
**Larguras testadas:** 1440 · 1280 · 1024 · 768 · 390 · 375 · 360 px

## Resumo

O redesign foi aplicado bem. A estrutura, os tokens, o ritmo entre seções e a acessibilidade estão no padrão, e não achei nenhum erro de layout grave.

Encontrei **15 pontos: 3 altos, 5 médios e 7 baixos**. Os 3 altos são de texto e dados, não de visual:

- a política de privacidade ainda cita campos que o formulário não coleta mais;
- o campo metragem corrompe números com vírgula;
- o passo 1 do processo promete algo que o formulário não pede.

Todos se resolvem em poucas linhas.

| | Qtde | Bloqueia publicar? |
|---|---|---|
| Alta | 3 | Sim |
| Média | 5 | Recomendado antes |
| Baixa | 7 | Não |

---

## O que passou

| Verificação | Resultado |
|---|---|
| `tsc --noEmit` | ✅ sem erros |
| Rolagem horizontal (360–1440 px) | ✅ nenhuma |
| Contraste AA de todo texto visível (tokens grafite e claro) | ✅ 100% passa |
| Áreas de toque < 44 px | ✅ nenhuma |
| Hierarquia de títulos (H1 → H2 → H3), IDs duplicados | ✅ |
| JSON-LD `ProfessionalService` + `FAQPage` com 5 perguntas | ✅ |
| F5 no meio da página volta ao topo | ✅ |
| Menu do celular: abre, foca o 1º link, trava a rolagem, fecha ao navegar, âncora com 16 px abaixo do header | ✅ |
| Abas do 04: clique e setas ←/→, `aria-selected`, imagens `-m` carregam | ✅ |
| "Ver depois do reparo": piso inverte, status vira Conforme, `aria-label` do SVG muda | ✅ |
| `InView`: abaixo da dobra fica `pending` e vira `done` ao entrar | ✅ |
| Balão WhatsApp: aparece no hero e no meio, some no orçamento e no rodapé | ✅ |
| Botão do header some com o formulário na tela | ✅ |
| Formulário: barra os 3 obrigatórios, foca o 1º, `aria-invalid`, limpa o erro ao digitar, máscara do telefone | ✅ |
| Nenhum resto do layout antigo (`HeroPlan`, `ShowMore`, SVGs removidos, `x-more`, `is-now`) | ✅ |

**Não testado:** o envio completo do formulário (criaria um lead real no FastAPI e abriria o WhatsApp), o `next build` de produção e Safari/iOS em aparelho real. Recomendo os três antes de publicar.

---

## Alta

### A1 · A política de privacidade lista dados que não são mais coletados
**Onde:** `app/privacidade/page.tsx`, bloco "Quais dados recebemos"
**Problema:** o texto diz que o formulário recebe "data prevista da entrega, empreendimento ou construtora e observações". Esses três campos saíram. Pela LGPD, a política precisa descrever o que é coletado de fato.
**Correção:**
```tsx
<p className="body">Os que você preenche no formulário: nome, WhatsApp, tipo de imóvel, metragem e bairro e cidade.
Só nome, tipo de imóvel e bairro são obrigatórios.</p>
```
Revise o resto da página atrás de menções aos campos antigos. O `// PENDENTE: revisão jurídica` continua valendo.

### A2 · O campo metragem corrompe números com vírgula
**Onde:** `QuoteForm.tsx`, função `set`: `v.replace(/\D/g, "").slice(0, 4)`
**Problema:** testado no navegador, quem digita `68,5` grava `685` m². Quem digita `68,5m2` grava `6852` m². O orçamento chega com uma metragem 10× maior, justamente a informação que define o preço.
**Correção:** aceitar no máximo uma casa decimal e cortar no primeiro caractere inválido:
```ts
const m2 = (v: string) => {
  const m = v.replace(".", ",").match(/^\d{0,4}(,\d?)?/);
  return m ? m[0] : "";
};
// no set(): k === "m2" ? m2(v) : v
```
No input, troque `inputMode="numeric"` por `"decimal"`, remova `pattern="[0-9]*"` e use `maxLength={6}`. Do lado do servidor (`actions.ts`), `limpa(input.m2, 6)` já comporta.

### A3 · O passo 1 promete uma pergunta que o formulário não faz mais
**Onde:** `lib/content.ts`, `PASSOS[0].texto`
**Problema:** "Você conta o tipo, a metragem e a data de entrega." O formulário pede tipo, metragem e **bairro**, e a data saiu. O cliente lê uma coisa e encontra outra.
**Correção:**
```ts
texto: "Você conta o tipo, a metragem e o bairro. Respondemos com valor e disponibilidade.",
```
Se a data importar para a agenda, a pergunta acontece no WhatsApp. A FAQ "Quanto custa?" já fala em metragem, tipo e bairro, então fica coerente.

---

## Média

### M1 · O rótulo do caimento perdeu a cor (vermelho/verde)
**Onde:** `CaimentoDiagrama.tsx` + `globals.css` (`.x-dg-lb { fill: #4f4b47 }`)
**Problema:** o `<text>` tem `fill="#b42318"` como atributo, mas a classe `.x-dg-lb` aplica `fill` por CSS, e CSS vence atributo de apresentação. Resultado medido: `rgb(79,75,71)` nos dois estados. "← 0,4 % PARA A PAREDE" e "1,0 % PARA O RALO →" saem cinza, e o desenho perde o sinal de errado/certo.
**Correção:**
```css
.x-dg-lo { font-weight: 600; fill: var(--nao-conforme); }
.x-dg-lo.is-ok { fill: var(--conforme); }
```
```tsx
<text className={`x-dg-lb x-dg-lo${corrigido ? " is-ok" : ""}`} ...>
```
(e remova o atributo `fill` do `<text>`)

### M2 · A faixa técnica do hero quebra mal no celular e no tablet
**Onde:** `Hero.tsx` (`FAIXA`) e `.x-stamp`
**Problema:**
- em 390 e 768 px aparecem quebras como "Engenheiro civil · / CREA-SP" e "São Paulo e Grande / SP";
- em 360 px o rótulo "RESPONSÁVEL / TÉCNICO" ocupa 2 linhas, e o valor fica desalinhado do "NORMAS" ao lado.

**Correção:**
```ts
{ rotulo: "Responsável", valor: SITE.crea ? `Eng. civil · ${SITE.crea}` : "Eng. civil · CREA‑SP" },
{ rotulo: "Atendimento", valor: "São Paulo e Grande SP" }, // ou ajuste SITE.area
```
```css
.x-stamp dd { text-wrap: balance; }
@media (max-width: 47.5em) { .x-stamp { align-items: start; } .x-stamp dt { min-height: 2.4em; } }
```

### M3 · "NBR 16747 · NBR 17170" quebra no meio da norma (seção 06)
**Onde:** `About.tsx`, `FICHA`
**Problema:** no celular a quebra cai em "NBR 16747 · NBR / 17170". O ` ` do guia virou espaço comum.
**Correção:** `valor: "NBR 16747 · NBR 17170"`. No hero, faça o mesmo (`"NBR 16747 · 17170"`).

### M4 · Os títulos do processo ficam desalinhados entre colunas em ~1000–1100 px
**Onde:** `.x-timeline-when`
**Problema:** em 1024 px, "Assim que a construtora agendar" e "No dia da vistoria de entrega" ocupam 2 linhas e os outros dois passos 1. Com isso, "Orçamento" e "Vistoria no imóvel" ficam uma linha abaixo de "Laudo técnico" e "Acompanhamento".
**Correção** (só no layout de 4 colunas):
```css
@media (min-width: 60.0625em) { .x-timeline-when { min-height: calc(2 * 1.538em); } }
```

### M5 · A seção 06 promete uma pessoa e mostra a empresa
**Onde:** `lib/site.ts` (`engenheiro`, `crea`, `fotoEngenheiro`, `bioEngenheiro`)
**Problema:** com os campos em `null`, abaixo de "Quem vistoria é quem assina." aparece "Mercalq Engenharia". No hero, "Engenheiro civil · CREA-SP" sem número parece um campo não preenchido. O código está certo; falta o conteúdo. É o maior ponto de credibilidade do site.
**Correção:** preencher nome, número do CREA e foto antes de publicar.

---

## Baixa

| # | Onde | Problema | Correção |
|---|---|---|---|
| B1 | Hero vs 02/06 | Normas em dois formatos: "NBR 16747 · 17170" e "NBR 16747 · NBR 17170" | Padronizar. Se o curto for para caber, ok, mas com ` ` (ver M3) |
| B2 | 05 | Todos os H2 terminam com ponto, menos "Perguntas frequentes" | `"Perguntas frequentes."`, ou tirar o ponto de todos. Hoje está misturado |
| B3 | 03 no celular | O nó do passo 4 fica vazado (regra `.has-keys::before`), enquanto os outros estão preenchidos. Parece "não feito" | Apagar a linha 389 do `globals.css`: `.x-timeline li.has-keys::before { … }` |
| B4 | 06 ficha | O WhatsApp sai em mono, menor e sublinhado; os outros valores, em Archivo 600 | `.x-ficha dd a { font: inherit; text-decoration-color: var(--laranja); }` e tirar `mono` do link |
| B5 | 07 → rodapé | Mesmo fundo e nenhuma divisão: ~190 px de escuro vazio entre o formulário e o logo no desktop | `.mq-footer { border-top: 1px solid var(--line); padding-top: var(--space-16); }` |
| B6 | 07 | O "Selecione" vazio tem a mesma cor de um valor escolhido | `.mq-field select:has(option[value=""]:checked) { color: var(--ink-muted); }` |
| B7 | 02 desktop | `align-items: center` deixa o filete do topo da lista ~40 px abaixo do topo da página do laudo | `.x-laudo { align-items: start; }` |

**Observação de texto (sem correção obrigatória):** "São Paulo e Grande SP" aparece 4 vezes (hero, ficha, lista do orçamento, rodapé). Eu tiraria da lista do orçamento e deixaria "Resposta pelo WhatsApp" no lugar, mas só se for verdade.

---

## Ordem sugerida

1. A1, A2, A3 (≈15 min)
2. M1, M3, M2, M4 (≈20 min, só CSS e strings)
3. B1–B7 (≈15 min)
4. M5: conteúdo do cliente
5. `npm run build`, um envio de teste com `API_URL` apontando para homologação e teste no iPhone (Safari)
