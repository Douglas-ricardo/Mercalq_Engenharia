# Relatório de QA 2: reteste após correções, Site Mercalq (localhost:3000)

24/10/2026 · Reteste do `RELATORIO-QA.md`

## Atualização: correções aplicadas

Depois deste reteste, todos os itens de código foram corrigidos e medidos de novo (Chrome via CDP, em tempo real):

| Item | Correção | Medição depois |
| --- | --- | --- |
| N-01 / QA-07 | Versões `-m` das ilustrações (rótulos curtos e maiores), usadas até 640 px e entre 961 e 1279 px; laudo recortado só na página | Menor texto de ilustração: 9,9 px em 320, 11,5 px em 375, ≥ 11,4 px em todas as larguras de desktop (antes: 6,2 px) |
| N-02 | `.x-idx` usa `--ink-muted` no tema claro | 0 falhas de contraste AA em 7 larguras |
| N-03 | `.mq-brand` com `min-height: 44px` | 0 alvos de toque < 44 px em 7 larguras |
| QA-06 | O flutuante some (fade, `aria-hidden`, fora do Tab) enquanto formulário, FAQ ou rodapé estão na tela | Visível no topo, nos achados e no Sobre; oculto no formulário, no FAQ e no rodapé |

Continuam fora do código: N-04 (`API_URL`) e os dados do responsável técnico.

## Resumo

Dos 16 problemas do primeiro relatório, **13 estão resolvidos e 3 parcialmente** (QA-06, QA-07, QA-11). Os 3 itens de severidade alta foram resolvidos. O reteste encontrou **4 problemas novos ou remanescentes (2 médios, 2 baixos)** e nenhum de severidade alta.

Do ponto de vista de código, nada mais impede a publicação. O que ainda falta é conteúdo e configuração:

1. **Dados do responsável técnico.** O nome do engenheiro, o CREA e o CNPJ agora ficam ocultos em vez de mostrar "a confirmar". O site está correto, mas sem eles o carimbo da seção Sobre fica com 4 campos e não diz quem assina o laudo.
2. **`API_URL` vazio no `.env`.** O formulário abre o WhatsApp corretamente, mas nenhum lead é gravado em servidor (N-04).
3. **Textos das ilustrações no celular** continuam pequenos, com 6 a 8 px (N-01).

## Escopo e método

Chrome headless sobre `http://localhost:3000/` (build de desenvolvimento), mais o build de produção para conferir os metadados.

| Viewport | Como | O que foi feito |
| --- | --- | --- |
| 320 · 375 · 414 | Iframe na mesma origem | Auditoria automática por script, página inteira em 375 com revisão visual, menu |
| 768 · 1024 · 1280 | Iframe na mesma origem | Auditoria automática por script |
| 1440 | Iframe e janela | Auditoria automática, formulário ponta a ponta, SEO, links, revisão visual |

Em cada largura, um script mediu:

- rolagem horizontal e elementos fora da tela;
- alvos de toque menores que 44 px;
- menor fonte visível;
- contraste de cada nó de texto contra o fundo real (WCAG AA);
- distância entre a marca e os botões do header;
- quanto o cartão do laudo cobre a planta;
- tamanho em pixels dos textos dentro dos SVGs;
- imagens quebradas;
- estado do rótulo do botão flutuante depois de 4 s.

Limites: sem celular real nem toque, então o caminho mobile do WhatsApp (mesma aba) não foi exercitado. Também não foram testados Safari/iOS, performance (Lighthouse) nem a gravação do lead (`API_URL` vazio).

## Situação dos 16 problemas anteriores

| ID | Problema original | Situação | Evidência do reteste |
| --- | --- | --- | --- |
| QA-01 | Marca encosta no botão em 320 px | Resolvido | Distância marca → botões: 14 px em 320, 33 px em 375. O botão vira "Orçamento" abaixo de 420 px |
| QA-02 | Placeholders "a confirmar" públicos | Resolvido | Nenhuma ocorrência de "a confirmar" no texto da página. Os campos ficam ocultos até haver dado real |
| QA-03 | Formulário sem feedback de erro | Resolvido | Envio vazio: foco em Nome; `aria-invalid` em Nome, Tipo e Bairro; 3 mensagens com `role="alert"` ligadas por `aria-describedby`. Ao preencher Nome, o erro dele some |
| QA-04 | Cartão do laudo cobre a planta | Resolvido | Sobreposição de 24 px (só a borda inferior) em todas as larguras. Os 4 marcadores ficam visíveis |
| QA-05 | Rótulo do flutuante cobre conteúdo | Resolvido | A partir de 1024 px: visível ao carregar, `opacity 0 / hidden` depois de 4 s. No mobile ele não existe |
| QA-06 | Flutuante cobre texto / rodapé sem respiro | Parcial | Rodapé com 88 px de respiro no mobile. No meio da página o botão ainda passa sobre conteúdo (em 375 px cobre o "+" de uma pergunta do FAQ) |
| QA-07 | Textos dos SVGs ilegíveis | Parcial | Fontes subiram de 12–18 para 26–38 no viewBox. No desktop ficam entre 12 e 15 px, mas no mobile ainda medem 6 a 8 px (ver N-01) |
| QA-08 | Tag sobre o rótulo do desenho | Resolvido | A tag saiu da imagem e fica ao lado do ambiente, acima do título |
| QA-09 | WhatsApp troca a aba do site | Resolvido (desktop) | `window.open(url, "_blank")`; a página continua em `/`. Mobile (mesma aba) não testado sem toque |
| QA-10 | Sem `og:image` | Resolvido | `og:image` 1200×630 com alt e `twitter:card=summary_large_image`. No build de produção a URL aponta para `https://www.mercalq.com.br/opengraph-image.png` |
| QA-11 | Alvos de toque < 44 px | Parcial | Botão do header, links do rodapé e telefone com ≥ 44 px. Resta o link da marca no header (N-03) |
| QA-12 | Tablet sem navegação | Resolvido | Menu abaixo de 960 px: `aria-expanded`, 4 links, fecha ao tocar num link e com Esc, e o foco volta ao botão |
| QA-13 | Ponto final fora do marca-texto | Resolvido | "sem surpresas." e "orçamento." inteiros dentro do `.mq-hl` |
| QA-14 | Chip "Chaves" solto na linha do tempo | Resolvido | "Entrega das chaves" ocupa o nó do 4º passo (desktop) e abre o passo no mobile |
| QA-15 | "ENGENHARIA" com 8,5 px | Resolvido | 10 px (oculto abaixo de 360 px) |
| QA-16 | Mensagem sem linha em branco | Resolvido | A mensagem gerada tem `\n\n` depois da saudação |

## Problemas encontrados no reteste

| ID | Severidade | Viewport | Seção | Problema | Correção sugerida |
| --- | --- | --- | --- | --- | --- |
| N-01 | Média | 320–414 px, e desktop na seção 02 | Hero, 02, 03, 05 | Os textos dentro dos SVGs (cotas, "BOX · BANHEIRO SOCIAL", tabela do laudo) renderizam com 6,2 px em 320, 7,2 px em 375 e 8,1 px em 414. No desktop, a imagem fixa da seção 02 (coluna estreita) fica com 8,4 px. Aumentar mais a fonte no viewBox não resolve, porque a imagem inteira encolhe junto. | No mobile, usar um recorte (zoom) da ilustração com `<picture>`/`media` ou uma versão sem rótulos, com a legenda essencial em HTML embaixo. Na seção 02, ampliar a coluna da imagem ou trocar por versão sem cotas. |
| N-02 | Média | Todos | 03 O laudo (tema claro) | O índice "03" (cinza `prata` sobre fundo claro) tem contraste de 3,14:1 com 13 px. WCAG AA exige 4,5:1. Os índices das seções escuras passam. | No tema claro, usar `--ink-muted` (ou um prata mais escuro) em `.x-idx`. |
| N-03 | Baixa | 320–414 px | Header | O link da marca (volta ao topo) tem 34 px de altura, abaixo dos 44 px do guia do projeto. Passa no mínimo WCAG 2.2 AA (24 px). | `min-height: 44px` em `.mq-brand`. |
| N-04 | Baixa | — | Formulário / servidor | `API_URL` está vazio no `.env`, então a Server Action não grava o lead: o contato só existe na conversa do WhatsApp. O fluxo não quebra, porque o fallback abre o WhatsApp mesmo assim. | Definir `API_URL` com o endpoint de leads antes de publicar e repetir o teste de gravação. |

Observações que não contam como problema:

- **Fontes de 11 px nos eyebrows.** "Vistoria de recebimento…" no hero e "Contato"/"Navegação" no rodapé usam Michroma em caixa alta com 11 px. É legível e segue o design system, mas é o menor texto do site depois de "ENGENHARIA".
- **Carimbo da seção Sobre com 4 campos.** O layout continua correto (grade 2×2). Os campos de engenheiro e CREA voltam sozinhos quando forem preenchidos em `lib/site.ts`.

## Formulário e WhatsApp

| Teste | Resultado |
| --- | --- |
| Botão no estado inicial | OK: ativo, "Enviar pelo WhatsApp", sem `aria-disabled` |
| Envio com campos vazios | OK: foco em Nome, 3 campos com `aria-invalid`, 3 mensagens (`role="alert"`, ligadas ao campo) |
| Erro some ao corrigir | OK: depois de preencher Nome, restam só Tipo e Bairro |
| Máscara do telefone | OK: "11987654321" virou "(11) 98765-4321" |
| Abertura do WhatsApp (desktop) | OK: nova aba (`_blank`), número 5511991884544, site continua aberto |
| Mensagem gerada | OK: saudação, linha em branco, nome, WhatsApp, "Apartamento · 68 m²", local, "15/12/2026", empreendimento, observações |
| Caracteres especiais (& # % ? ç) | OK: preservados na mensagem decodificada |
| Evento de conversão | OK: `dataLayer` recebeu `{event: "cta_whatsapp", origem: "form"}` |
| Gravação do lead | Não testável: `API_URL` vazio (N-04) |
| Links de WhatsApp da página | OK: 4 links (hero, FAQ, rodapé, flutuante), número certo, mensagem por contexto, `target="_blank"` e `rel="noopener noreferrer"` |

## SEO e acessibilidade

| Item | Status |
| --- | --- |
| `<title>` | OK: "Vistoria de Imóvel Novo em São Paulo \| Mercalq Engenharia" |
| Meta description | OK: 141 caracteres (era 186) |
| `og:image` / Twitter card | OK: 1200×630, com alt, `summary_large_image`; URL de produção correta |
| `lang="pt-BR"`, canonical | OK |
| JSON-LD | OK: `ProfessionalService` e `FAQPage` (7 perguntas) |
| Títulos | OK: 1 H1, 8 H2 (um por seção), H3 nos itens |
| Âncoras internas | OK: nenhum destino faltando |
| IDs duplicados | OK: nenhum |
| `alt` nas imagens | OK: todas têm |
| Inputs com `<label for>` | OK: 8 de 8 |
| Contraste AA | Falha em 1 ponto: índice "03" no tema claro (N-02). O resto passa |
| Alvos de toque ≥ 44 px | Parcial: só o link da marca no mobile (N-03) |
| Menu acessível | OK: `aria-expanded`, `aria-controls`, Esc e retorno de foco |
| Travessões (—) no texto | OK: nenhum |
| Console | OK: nenhum erro ou warning (só a mensagem informativa do HMR) |

## O que passou

- **Sem rolagem horizontal** em 320, 375, 414, 768, 1024, 1280 e 1440 px, e nenhum elemento fora da tela.
- **Imagens:** nenhuma quebrada e nenhuma pendente depois do carregamento.
- **Header:** sem colisão em nenhuma largura. Nav completa a partir de 961 px, menu abaixo disso.
- **Hero:** cartão do laudo abaixo da planta, com o rótulo "Exemplo" deixando claro que não é caso real.
- **Linha do tempo, achados, carimbo e formulário** corretos no desktop e no mobile (revisão visual em 375 e 1440).
- **Temas claro/escuro** alternando sem quebra.

## Plano de correção

**Antes de publicar (conteúdo e configuração, não código)**

- [ ] Preencher `engenheiro`, `crea` e `cnpj` em `lib/site.ts`
- [ ] Definir `API_URL` e testar a gravação do lead (N-04)
- [ ] Confirmar com o engenheiro: "2 a 3 horas" e revistoria no FAQ, área de atendimento, métodos e prazos em `lib/content.ts`

**Código (uma passada curta)**

- [ ] N-02: contraste do índice no tema claro

```css
[data-theme="claro"] .x-idx { color: var(--ink-muted); }
```

- [ ] N-03: área de toque da marca

```css
.mq-brand { min-height: 44px; }
```

- [ ] N-01: ilustrações no mobile. Esta é a única correção com trabalho de desenho: um recorte ampliado de cada SVG para telas estreitas, ou rótulos em HTML abaixo da imagem.

**Depois:** testar num iPhone (Safari) e num Android (Chrome) reais, incluindo a abertura do app do WhatsApp na mesma aba, e rodar o Lighthouse no build de produção.
