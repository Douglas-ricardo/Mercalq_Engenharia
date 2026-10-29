# Relatório de QA 3: análise de UX/UI, Site Mercalq (localhost:3000)

27/10/2026 · Revisão de design e experiência, depois dos relatórios `RELATORIO-QA.md` e `RELATORIO-QA-2.md`

## Atualização: correções de código aplicadas

Conferidas no Chrome real (1100 × 750) depois da mudança, com `tsc --noEmit` sem erros:

| Item | Correção | Medição depois |
| --- | --- | --- |
| U-07 | `QuoteForm.tsx` abre a aba vazia no clique e só depois aponta para o WhatsApp; confirmação com `role="status"` e link "Não abriu? Abrir de novo" | `window.open` chamado 2 ms após o clique (antes: 53 ms, depois do servidor); mensagem visível após o envio |
| U-09 | Rodapé usa `WhatsAppLink` com `origem: "footer"` e mensagem própria | Os 5 links registram `cta_whatsapp`: hero, faq, direto, footer, float |
| U-10 | FAQ movido para antes do Sobre e do formulário | Ordem: … achados > dúvidas > sobre > orçamento |
| U-11 | "Prefere conversar direto?" abre o WhatsApp (`origem: "direto"`) em vez de `tel:` | Rastreado como `direto` |
| U-12 | Linha do hero: "Laudo com ART registrada no CREA · NBR 16747 e 17170"; nova pergunta no FAQ explicando ART e normas | Revisar o texto com o engenheiro |
| U-13 | Cartão do hero divide a borda com a planta (`margin-top: -1px`) | Sobreposição de 1 px; legenda "ESC. 1:50" visível |
| U-17 | Metragem em `type="text"` com `inputMode="numeric"`, só dígitos, até 4 | "68abc" vira "68" |
| U-18 | Linha do rodapé desenhada dentro do gutter | Alinhada ao conteúdo (32 px de cada lado) |
| U-19 | Menu mobile fecha com toque fora | |
| U-20 | Cartão do hero com `role="group"` | |
| U-23 | Token `--ease-out` (ease-out-quint) nas transições | |
| U-25 | Hero mais compacto em telas de até 820 px de altura; flutuante escondido enquanto o hero está na tela | Botão principal termina em 670 px numa tela de 750 px |

## Atualização: reestruturação da página (U-05)

| Mudança | Resultado |
| --- | --- |
| Seções 01 (comparativo) e 02 (seis sistemas) viraram uma tabela só: sistema e o que é verificado, o que a visita comum vê e o que a vistoria mede | Desenho do caimento repetido saiu da página (U-04 parcial); a linha "Resultado" saiu, porque é o assunto da seção do laudo |
| Seção do laudo: saiu o item "Vistoria completa" (já dito na tabela) e o botão; introdução nova sem repetir o hero (U-22 parcial) | |
| Linha do tempo termina com "O primeiro passo é o orçamento" e o único botão de orçamento do meio da página | O passo 1 da linha do tempo leva direto à ação |
| Achados no celular: só o principal mantém o desenho; os outros dois viram lista | Seção de 1.776 para 1.279 px em 390 px; a planta repetida do hero some no celular |
| Índices: 01 a 04 só nas seções de conteúdo; Sobre e Orçamento sem número (U-16) | |

Medido em 390 px: página de **12.601 para 10.981 px (-13%)**; no desktop (1440 px), de 8.560 para 8.118 px. O formulário começa em 8.461 px (antes 8.874), com o FAQ agora antes dele. Sem rolagem horizontal nem alvos de toque menores que 44 px em 320, 390 e 1440 px.

Continuam abertos: U-01 a U-03, U-04 no desktop (achado "Tomada sem aterramento" usa a planta do hero), U-06 e U-08 (conteúdo e configuração), U-14, U-15, U-21 e U-24.

## Atualização: typeset e polish

**Typeset**

| Mudança | Por quê |
| --- | --- |
| Todos os tamanhos de fonte em `rem` e alturas de linha sem unidade (valores do design system mantidos) | Antes tudo em `px`: o texto não acompanhava a fonte escolhida no navegador (WCAG 1.4.4) |
| Breakpoints de `@media` e das ilustrações em `em` | Com fonte maior, o layout troca para menu e uma coluna antes de estourar; com 16px nada muda |
| Eyebrow do hero de 11px/.18em para 12px/.14em (U-14) | Michroma larga em 11px ficava ilegível |
| Títulos do rodapé em Archivo 13px 600 em vez de Michroma | O design system reserva a Michroma ao hero; o rodapé fugia da regra |
| `tabular-nums` no mono; `text-wrap: pretty` em `body`, `lead` e `body-sm`; `balance` no `heading-3` | Números técnicos alinhados; sem palavra sozinha na última linha |
| Grids com `minmax(0, …fr)`, botões podem quebrar linha, títulos quebram palavra só se não couber | Com fonte ampliada nada empurra a página para os lados |

**Polish**

| Item | Correção |
| --- | --- |
| U-24 | `SectionSpy`: a âncora da seção no meio da tela recebe `aria-current` e sublinhado laranja (também no menu mobile); o botão "Solicitar orçamento" do header some enquanto o formulário está na tela |
| Estados | `:active` nos botões primário e secundário |
| Movimento | `prefers-reduced-motion` cobre também o flutuante e o botão do header |
| Código | Regra duplicada do cartão do hero removida; comentário desatualizado em `actions.ts` corrigido |
| Design system | `DESIGN-SYSTEM.md` atualizado: tipografia (rem, eyebrow 12px), índice 01 a 04, seção de sistemas unificada, laudo sem botão, CTA da linha do tempo, flutuante, rodapé, formulário |

**Medição depois** (Chrome headless + Chrome real):

- 320, 390, 1100 e 1440 px na fonte padrão: sem rolagem horizontal, sem alvo de toque < 44 px, `tsc` sem erros, console sem erros nem avisos.
- Fonte do navegador em 32px (200%): sem rolagem lateral em 320, 390 e 1100 px. A rolagem que restava no celular vinha de "Acompanhamento" (linha do tempo) e "Responsabilidade" (carimbo) vazando da caixa; agora palavras longas quebram (`overflow-wrap: break-word` no `body`). No header, abaixo de 18.5em de largura (fonte a partir de ~130% num celular de 390 px) fica só o símbolo da marca, com o nome no `aria-label`; o carimbo passa para uma coluna. Testado também com fonte em 125% e 150%; com a fonte padrão o header não muda em 320 e 390 px.
- Navegação: "O que avaliamos", "O laudo", "Como funciona" e "Dúvidas" acendem na seção certa; nenhuma acende no hero, nos achados, no Sobre e no formulário.

## Atualização: cores (U-21)

| Mudança | Medição |
| --- | --- |
| Neutros do tema grafite e `ink`/`ink-muted`/`surface-raised` do claro em OKLCH, com a mesma luminosidade dos cinzas anteriores e croma 0,004–0,008 no matiz do laranja (56); sombras sem preto puro | Contrastes mudam no máximo 0,06 (ex.: `ink-muted` sobre `surface` 6,85 → 6,86:1) |
| Os mesmos tons aplicados nos 8 SVGs das ilustrações e no `theme-color` | Ilustrações sem emenda com o fundo |
| `--on-laranja` fixo (não depende do tema) | 5,05:1 |
| Botão flutuante: verde `#25d366` → `oklch(0.60 0.191 150)` (`#009d38`), ícone continua branco | Ícone 3,48:1 (era 1,98:1); botão contra o fundo 3,83:1 |

Varredura de contraste na página renderizada: 155 textos em 1440 px e 148 em 390 px, nenhuma falha AA. `DESIGN-SYSTEM.md` §4.1 e §4.5 atualizados.

Não alterados: `app/opengraph-image.png` e `design/og-image.html` ainda usam os cinzas antigos (imagem de compartilhamento, sem impacto na página).

## Atualização: pendências restantes

| Item | O que foi feito | O que ainda depende do cliente |
| --- | --- | --- |
| U-01 | Carimbo com link de consulta no CREA-SP; foto 4:5 do engenheiro com legenda (nome · CREA) na seção Sobre, que aparece sozinha quando preenchida | `engenheiro`, `crea`, `cnpj` e `fotoEngenheiro` em `lib/site.ts` |
| U-02 | FAQ abre com "Quanto custa a vistoria?" (o que define o valor, sem número inventado) | Se houver valor público, acrescentar "a partir de R$ …" na resposta |
| U-03 | Laudo de exemplo: ícones de montanha trocados por desenhos técnicos (caimento do box, rejunte) e barras cinzas por uma observação real; link "Ver um laudo completo (PDF)" pronto | Fotos reais anonimizadas e `laudoExemploPdf` em `lib/site.ts` |
| U-04 | Desenho novo `tomada-aterramento.svg` (e versão `-m`): tomada com furo terra destacado, testador com LED do terra apagado, posição prevista no projeto tracejada. A planta do hero não se repete mais | |
| U-06 | Seção de depoimentos (`Testimonials`) entre achados e FAQ; não aparece enquanto `DEPOIMENTOS` estiver vazio | Depoimentos reais autorizados em `lib/content.ts` |
| U-08 | GTM carregado pelo `next/script` (`afterInteractive`) só quando `NEXT_PUBLIC_GTM_ID` tem formato válido | ID do contêiner GTM no `.env` |
| U-10 | FAQ com "Já recebi as chaves", "Atendem a minha região?" (usa `SITE.area`) e resposta mais concreta sobre a construtora não corrigir | Revisar os textos com o engenheiro |
| U-15 | Página `/privacidade` (LGPD: responsável, dados, finalidade, base legal, compartilhamento, prazo, direitos), ligada no formulário e no rodapé | Revisão jurídica e CNPJ |
| Imagem de compartilhamento | `app/opengraph-image.png` e `twitter-image.png` regeneradas com as cores novas a partir de `design/og-image.html` | |

Links do rodapé passaram a `/#seção` para funcionar também em `/privacidade`.

Verificação final (Chrome headless): 320, 390 e 1440 px sem rolagem horizontal e sem alvo de toque < 44 px; contraste AA sem falhas (155, 156 e 163 textos); fonte em 200% sem rolagem horizontal em 390 e 1100 px; `/privacidade` sem problemas em 390 px; `tsc` sem erros. A página em 390 px tem 11.236 px (as 3 perguntas novas do FAQ somam ~260 px).

Todos os itens de código do relatório estão resolvidos. O que falta é conteúdo e configuração do cliente, listado na coluna da direita.

## Atualização: abertura animada (28/10/2026)

Do redesenho testado, ficou só a abertura: a planta do hero se desenha (paredes, cotas, marcadores), o título entra em três linhas maiores e o cartão do laudo chega com os status um a um. O restante (faixa 4 mm, visualizador de achados, revelação ao rolar, cabeçalhos em linha, remoção dos WhatsApps e dos índices) foi desfeito a pedido do cliente e a página voltou ao estado anterior.

Mantida também uma correção sem efeito visual: o JSON-LD saiu em duas tags, uma por objeto, porque um leitor injetado no Safari quebrava com a lista e gerava o aviso "1 Issue".

## Resumo

Os dois primeiros relatórios resolveram a parte técnica: não há rolagem horizontal, os alvos de toque estão certos, o contraste passa e o formulário tem erros acessíveis. Esta rodada olha para outra pergunta: **o site convence o comprador ansioso a pedir orçamento?**

A resposta hoje é "quase". A identidade visual é forte e própria (Archivo largo, marca-texto laranja, desenhos técnicos com marcadores numerados). O que falta é **prova**: o site promete precisão, mas não mostra quem é o engenheiro, não dá ideia de preço, não tem nenhuma voz de cliente, e o laudo de exemplo tem ícones de "imagem aqui" no lugar das fotos. Além disso, a página é longa demais para quem pesquisa no celular: no iPhone, o formulário começa só depois de 70% da rolagem.

**25 achados: 1 P0, 7 P1, 8 P2, 9 P3.**

Os 5 que mais importam:

1. **U-01 (P0)** Nenhum dado do engenheiro responsável. A seção Sobre diz "quem vistoria é quem assina", mas não diz quem assina.
2. **U-02 (P1)** Nada sobre preço. A primeira dúvida de quem pede orçamento não aparece nem no FAQ.
3. **U-03 (P1)** O laudo de exemplo parece um wireframe: as "fotos" são ícones de montanha.
4. **U-05 (P1)** A página tem 12.600 px no celular, e as seções 01, 02 e 03 repetem a mesma mensagem.
5. **U-08 (P1)** O evento `cta_whatsapp` vai para um `dataLayer` que nenhuma ferramenta lê. O indicador de sucesso definido no PRODUCT.md ainda não é medido.

## Notas

| Avaliação | Nota | Faixa |
| --- | --- | --- |
| Heurísticas de Nielsen (design) | **27/40** | Bom, com lacunas de confiança e de conteúdo |
| Auditoria técnica | **15/20** | Bom |

### Heurísticas de Nielsen

| # | Heurística | Nota | Principal problema |
| --- | --- | --- | --- |
| 1 | Visibilidade do estado do sistema | 2 | Depois de enviar o formulário a página não muda: não há confirmação nem link de reserva se o WhatsApp não abrir (U-07) |
| 2 | Correspondência com o mundo real | 3 | "NBR 16747 · NBR 17170" no hero sem tradução para leigo (U-12) |
| 3 | Controle e liberdade | 3 | Menu mobile não fecha ao tocar fora (U-19) |
| 4 | Consistência e padrões | 3 | O número rotulado "WhatsApp" no formulário abre uma ligação (`tel:`) (U-11); o link do rodapé não segue o padrão dos outros CTAs (U-09) |
| 5 | Prevenção de erros | 3 | Metragem `type="number"` muda com a roda do mouse (U-17) |
| 6 | Reconhecer em vez de lembrar | 3 | Navegação sem indicação da seção atual (U-24) |
| 7 | Flexibilidade e eficiência | 3 | Dois caminhos (formulário e WhatsApp direto) bem resolvidos |
| 8 | Estética e design minimalista | 2 | Página longa, mensagens repetidas, ilustrações reaproveitadas (U-04, U-05) |
| 9 | Recuperação de erros | 3 | Erros do formulário claros; falta recuperação quando o pop-up é bloqueado (U-07) |
| 10 | Ajuda e documentação | 2 | FAQ sem preço, sem "já recebi as chaves" e posicionado depois do formulário (U-10) |

### Auditoria técnica

| Dimensão | Nota | Principal achado |
| --- | --- | --- |
| Acessibilidade | 3 | `aria-label` em `div` sem papel (U-20); ícone branco do WhatsApp sobre verde com 1,98:1 (U-21) |
| Performance | 3 | Página estática e leve; Michroma carregada para 3 rótulos (U-14) |
| Responsivo | 3 | Sem overflow de 320 a 1440 px; legenda "ESC. 1:50" fica atrás do cartão no hero mobile (U-13) |
| Tema e tokens | 3 | Tokens consistentes; neutros em cinza puro hex em vez de OKLCH levemente tingido (U-21) |
| Anti-padrões | 3 | Ver veredito abaixo |

## Parece feito por IA?

**Não, na maior parte.** O site tem voz própria: o título com Archivo largo e o marca-texto laranja, as plantas com cotas e marcadores, o carimbo de prancha na seção Sobre e as etiquetas de status com palavra e ícone vêm do trabalho real do engenheiro, como pede o princípio 2 do PRODUCT.md. Nenhuma das proibições absolutas aparece (sem gradiente em texto, sem vidro fosco, sem grade de cards iguais, sem métricas gigantes).

Sinais que puxam para o genérico e merecem atenção:

- **Gramática de seção repetida.** Índice "01" a "07" com traço, título grande e parágrafo cinza, igual em toda seção. Funciona como prancha numerada, mas sete vezes seguidas vira molde.
- **Barra laranja no topo como enfeite recorrente.** Cartão do laudo no hero, formulário e carimbo usam a mesma faixa de 4 px. Não é a borda lateral proibida, mas é o mesmo gesto repetido.
- **Hero dividido ao meio** (texto à esquerda, imagem à direita, fundo pontilhado). É o layout mais comum de landing page; o que salva é o conteúdo do desenho.
- **Mono em tudo que é "técnico".** IBM Plex Mono aparece em índices, métodos, datas da linha do tempo, rodapé e cartão. Aqui tem motivo (é engenharia), mas o volume dilui o efeito.

Verificação automática: o detector do Impeccable não está instalado nesta máquina (`bundled detector not found`). A verificação foi manual: código-fonte inteiro mais capturas da página em 1440, 390 e 320 px via Chrome DevTools Protocol.

## O que está funcionando

- **Assinatura visual coerente.** O marca-texto em "sem surpresas." e "orçamento." amarra o começo e o fim da página. As plantas com marcadores numerados reaparecem no laudo e nos achados com a mesma lógica (número no desenho igual ao número na lista).
- **Tabela "Visita comum × Vistoria Mercalq".** É a peça de convencimento mais eficaz do site: concreta, curta, e no celular vira lista legível com "Visita comum:" de prefixo.
- **Formulário bem construído.** Rótulos humanos ("Algo que já te preocupa?"), só 3 campos obrigatórios, erros com palavra e ícone ligados ao campo, máscara de telefone e mensagem do WhatsApp já formatada.
- **Ritmo claro/escuro.** As seções do laudo e do FAQ em tema claro quebram a sequência escura no lugar certo.

## Achados

Severidade: **P0** bloqueia publicação · **P1** afeta conversão ou viola WCAG AA, corrigir antes de publicar · **P2** incômodo com contorno, próxima rodada · **P3** polimento.

### P0

#### U-01 · Ninguém assina o site

- **Onde:** `components/sections/About.tsx`, `lib/site.ts:23-25`, rodapé.
- **Problema:** `engenheiro`, `crea` e `cnpj` estão `null`. O carimbo mostra 4 campos genéricos (ART, normas, área, WhatsApp). O texto ao lado diz "Quem vistoria é quem assina: o engenheiro responsável acompanha cada vistoria", mas não há nome, registro nem rosto. Não há CNPJ no rodapé.
- **Por que importa:** o comprador está entregando a chave do imóvel mais caro da vida a um desconhecido. Sem nome e CREA, ele não consegue conferir a habilitação no site do CREA-SP, e a promessa de precisão fica sem dono. Para um serviço de engenharia isso é o primeiro critério de confiança.
- **Correção:** preencher os três campos. Adicionar a foto do engenheiro em campo (4:5, já prevista no README) na seção Sobre, com nome e CREA em legenda. Linkar o CREA para a consulta pública. Repetir "Eng. Nome · CREA-SP nº" na linha de normas do hero.
- **Comando sugerido:** conteúdo; depois `/impeccable polish` na seção Sobre.

### P1

#### U-02 · Nenhuma referência de preço

- **Onde:** FAQ (`lib/content.ts`, `FAQ`), formulário, hero.
- **Problema:** o site inteiro conduz ao orçamento, mas não há faixa de preço, valor inicial, fatores que alteram o preço nem prazo de resposta. "Quanto custa?" não está entre as 7 perguntas.
- **Por que importa:** é a pergunta número um de quem chega a uma página de serviço. Sem âncora, o visitante ansioso imagina um valor alto e adia, ou sai para comparar com concorrentes que mostram preço.
- **Correção:** pergunta "Quanto custa a vistoria?" como primeira do FAQ, com "a partir de R$ X para apartamentos até Y m²" ou, se não houver preço público, os 3 fatores do valor (metragem, tipo, distância). Abaixo do botão do formulário: "Respondemos em até N horas úteis".
- **Comando sugerido:** `/impeccable clarify`.

#### U-03 · O laudo de exemplo parece um wireframe

- **Onde:** seção 03, `public/assets/ilustracoes/laudo-tecnico.svg`.
- **Problema:** as duas "fotos" da página do laudo são retângulos com o ícone genérico de montanha (o símbolo de "imagem aqui" dos wireframes). As linhas de texto são barras cinzas e o número da ART é "······".
- **Por que importa:** a seção existe para mostrar o produto que o cliente compra. O princípio 1 do PRODUCT.md é "prova antes de promessa", e esta é a prova mais direta disponível. Um wireframe comunica "ainda não temos isso".
- **Correção:** curto prazo: trocar os ícones por fotos reais anonimizadas (piso do box com nível, bancada com rejunte) ou por desenhos no mesmo estilo dos achados. Médio prazo: link "Ver um laudo completo de exemplo (PDF, 18 páginas)" logo abaixo da figura; é a peça que mais converte nesse tipo de serviço.
- **Comando sugerido:** conteúdo; depois `/impeccable polish`.

#### U-04 · Ilustrações reaproveitadas

- **Onde:** hero, seção 02 (aside), seção 05 (achados 1 e 2).
- **Problema:** a planta do hero (`vistoria-planta`) reaparece idêntica como achado "Tomada sem aterramento", com os mesmos 4 marcadores. O desenho do caimento do box (`medicao-caimento`) aparece na seção 02 e de novo como achado principal na 05. Das 6 imagens da página, só 4 são diferentes.
- **Por que importa:** repetir a imagem enfraquece a sensação de experiência real ("só têm esses três desenhos"). E a planta do hero usada como "tomada sem aterramento" não mostra tomada nenhuma: o desenho não ilustra o achado.
- **Correção:** cada achado com seu desenho próprio (para a tomada: detalhe do testador na tomada com o LED de falha). Na seção 02, trocar o caimento por um desenho dos instrumentos (nível, trena, testador, multímetro), que é o assunto da seção ("um critério para cada"). Melhor ainda: fotos reais de vistoria, já previstas no README.
- **Comando sugerido:** `/impeccable bolder` nas ilustrações dos achados.

#### U-05 · Página longa e repetitiva

- **Onde:** página inteira.
- **Medido:** em 390 px a página tem 12.601 px (cerca de 15 telas). O formulário começa em 8.874 px, depois de 70% da rolagem. Seções mais altas: achados (1.776 px), 02 (1.659 px), laudo (1.256 px).
- **Problema:** as seções 01, 02 e 03 dizem a mesma coisa três vezes ("medimos o que não aparece"). "Caimento do box" aparece na tabela da 01, no item 02 da checklist, no desenho da 02, no cartão do hero, no laudo da 03 e no achado principal da 05. As seções 01, 02, 04 e 05 não têm nenhuma ação: entre o botão do laudo (seção 03) e o formulário, o único caminho é o flutuante.
- **Por que importa:** o usuário do PRODUCT.md pesquisa no celular à noite, cansado. Cada tela sem ação é uma chance de fechar a aba antes de chegar ao formulário.
- **Correção:**
  1. Fundir 01 e 02: a tabela comparativa ganha a coluna "Como medimos" e substitui a checklist, ou a checklist ganha a coluna "Numa visita comum". Economiza cerca de 1.100 px no celular.
  2. Achados no celular: mostrar o principal e os outros dois como lista compacta (título + status), sem desenho.
  3. Fechar a linha do tempo (04) com a ação natural: "O primeiro passo leva 2 minutos" + botão para o formulário.
  4. Ver U-10 sobre a posição do FAQ.
- **Comando sugerido:** `/impeccable distill`.

#### U-06 · Nenhuma voz de cliente

- **Onde:** página inteira.
- **Problema:** não há depoimento, avaliação do Google, número de vistorias feitas, empreendimentos atendidos nem post do Instagram (o DESIGN-SYSTEM.md tem um componente `InstagramPost` que não foi usado).
- **Por que importa:** para um serviço que o comprador contrata uma vez na vida, o que outros compradores dizem pesa mais que qualquer descrição do método. É a peça de prova que falta ao lado do engenheiro (U-01).
- **Correção:** 2 ou 3 depoimentos curtos com nome, bairro e o que foi encontrado ("16 ocorrências, a construtora refez o box"), entre os achados e o Sobre. Sem "métrica gigante": o depoimento com um dado concreto basta. Se ainda não houver clientes, usar o `InstagramPost` com vistorias reais.
- **Comando sugerido:** conteúdo; depois `/impeccable craft depoimentos`.

#### U-07 · Envio sem confirmação e WhatsApp que pode abrir na mesma aba

- **Onde:** `components/sections/QuoteForm.tsx:13-18` e `56-65`.
- **Problema 1:** `window.open` é chamado depois do `await enviarOrcamento(...)`. O Safari (e o Firefox, quando a Server Action passa de 1 s) só permite pop-up durante o gesto do usuário; depois do `await`, o pop-up é bloqueado, `aba` vem `null` e o código troca a própria aba para o WhatsApp. O visitante sai do site, que é justamente o que a correção QA-09 queria evitar. Com `API_URL` configurado (até 4 s de timeout), isso fica mais provável também no Chrome.
- **Problema 2:** quando dá certo, a página não muda: o formulário continua preenchido e o botão volta a "Enviar pelo WhatsApp". Se o WhatsApp Web não carregar ou o usuário fechar a aba, não há caminho de volta.
- **Confirmado no Chrome real:** com o formulário preenchido, `window.open` foi chamado 53 ms depois do clique, já depois da resposta da Server Action. Depois do envio o botão voltou a "Enviar pelo WhatsApp", os campos continuaram preenchidos e não apareceu nenhuma mensagem de estado.
- **Correção:** abrir a aba em branco no clique, antes do `await`, e só depois definir o endereço. Depois do envio, trocar o formulário por um estado de confirmação.

```tsx
function onSubmit(e: FormEvent) {
  // ...validação
  const toque = window.matchMedia("(pointer: coarse)").matches;
  const aba = toque ? null : window.open("", "_blank"); // ainda dentro do gesto
  startTransition(async () => {
    let url: string;
    try { url = await enviarOrcamento(lead); } catch { url = waLink(mensagemOrcamento(lead)); }
    if (aba) { aba.opener = null; aba.location.href = url; } else window.location.href = url;
    setEnviado(url);
  });
}
// Depois do envio, no lugar do botão:
// "Abrimos a conversa no WhatsApp. Não abriu? [Abrir de novo]" (link para `enviado`)
```

- **Comando sugerido:** `/impeccable harden` no formulário.

#### U-08 · O indicador de sucesso não é medido

- **Onde:** `lib/analytics.ts`, `app/layout.tsx`.
- **Problema:** `trackWhatsApp` envia `cta_whatsapp` para `window.dataLayer`/`gtag`, mas nenhum GTM nem GA4 está instalado no layout. O PRODUCT.md define o sucesso do site por esse evento.
- **Correção:** instalar o GTM (ou GA4) no `layout.tsx` com `next/script` e `strategy="afterInteractive"`, e conferir o evento no modo de visualização. Configuração, não design, mas sem isso nenhuma das mudanças deste relatório pode ser avaliada.

### P2

#### U-09 · Link do WhatsApp no rodapé não conta conversão

- **Onde:** `components/sections/Footer.tsx:19`.
- **Problema:** é um `<a>` comum com `waLink(MENSAGENS.float)`, não o `WhatsAppLink`. O clique não dispara `cta_whatsapp` e a mensagem chega como se viesse do botão flutuante. O relatório 2 contou 4 links rastreados, mas conferiu só o endereço, não o evento. **Confirmado no Chrome real:** clicando nos 4 links, hero, FAQ e flutuante registraram `cta_whatsapp`; o do rodapé não registrou nada.
- **Correção:** usar `<WhatsAppLink origem="footer" mensagem={MENSAGENS.footer}>` e acrescentar `"footer"` a `OrigemWhatsApp`.

#### U-10 · FAQ depois do formulário e com lacunas

- **Onde:** `app/page.tsx` (ordem das seções), `lib/content.ts`.
- **Problema:** as perguntas que destravam a decisão (preço, prazo, revistoria) ficam abaixo do formulário: quem tem dúvida passa pelo formulário sem preencher. Faltam perguntas óbvias para esse público: "Quanto custa?", "Já recebi as chaves, ainda dá tempo?", "Preciso estar presente?", "Atendem minha cidade?". A resposta "E se a construtora não corrigir?" é vaga.
- **Correção:** subir o FAQ para antes do Sobre/formulário, com as 4 perguntas acima e a resposta sobre a construtora mais concreta (prazo de garantia, notificação formal com o laudo, uso como prova).
- **Comando sugerido:** `/impeccable clarify`.

#### U-11 · Número "WhatsApp" que abre ligação

- **Onde:** `QuoteForm.tsx`, "Prefere direto? (11) 99188-4544".
- **Problema:** o link é `tel:`. No celular, liga em vez de abrir o WhatsApp; no desktop, abre o FaceTime ou nada. No carimbo da seção Sobre o mesmo número aparece rotulado "WhatsApp".
- **Correção:** "Prefere conversar direto? Abrir WhatsApp" com `WhatsAppLink`, ou manter `tel:` e escrever "Ligar: (11) 99188-4544".

#### U-12 · Normas técnicas sem tradução

- **Onde:** hero ("Engenheiro civil · NBR 16747 · NBR 17170 · Laudo com ART"), carimbo, seção 03.
- **Problema:** o PRODUCT.md diz que o comprador "não entende de engenharia". "NBR 16747" e "ART" aparecem sete vezes e só são explicadas indiretamente.
- **Correção:** na primeira menção, dizer o que significam: "Segue a norma brasileira de inspeção predial (NBR 16747)" e "ART: o registro no CREA que torna o engenheiro responsável pelo laudo". Uma pergunta do FAQ para "O que é ART e por que importa?".

#### U-13 · Hero: planta pequena e legenda escondida

- **Onde:** `.x-hero-media`, `.x-float-card`.
- **Problema:** no desktop, a planta ocupa pouco da coluna e sobra cerca de 120 px de fundo pontilhado vazio abaixo dos botões. No celular (390 px), o cartão do laudo sobe 24 px sobre a imagem e cobre a legenda "PLANTA · ESC. 1:50".
- **Confirmado no Chrome real:** em 1100 × 750 a legenda também fica cortada pelo cartão no desktop.
- **Correção:** no celular, `margin-top: 0` no cartão (ou recortar a legenda na versão `-m`). No desktop, reduzir o padding inferior do hero e deixar a planta sangrar um pouco para fora da coluna.

#### U-14 · Michroma para três rótulos

- **Onde:** `.mq-eyebrow`, `.mq-brand-sub`.
- **Problema:** uma família inteira carregada para "Vistoria de recebimento de imóvel novo", "Contato", "Navegação" e "ENGENHARIA", todos com 10-11 px, caixa alta e espaçamento de 0,18 em. Nesse tamanho a fonte larga fica difícil de ler (no celular o eyebrow quebra em duas linhas).
- **Correção:** subir o eyebrow do hero para 13 px ou trocar por Archivo largo em 600; avaliar remover a Michroma.

#### U-15 · Sem aviso de privacidade

- **Onde:** formulário, rodapé.
- **Problema:** o formulário coleta nome, telefone e endereço e grava em servidor (quando `API_URL` estiver ativo), mas não há política de privacidade. A LGPD exige informar finalidade e contato do responsável.
- **Correção:** página `/privacidade` curta e link na nota "Seus dados são usados apenas para responder esta solicitação."

#### U-25 · Notebook de 13": botão principal na dobra e flutuante sobre o cartão

- **Onde:** hero, `.x-hero` e `.x-wa-float`.
- **Medido no Chrome real (janela de 1100 × 750, típica de notebook):** os botões "Solicitar orçamento" e "Falar no WhatsApp" ficam cortados na borda inferior da tela. O botão flutuante do WhatsApp fica em cima da etiqueta "Atenção" do cartão do laudo, e nos primeiros 4 s o rótulo "Fale no WhatsApp" cobre a linha "Rejunte da bancada".
- **Por que importa:** a primeira tela é a única que todo visitante vê, e nela a ação principal aparece pela metade, com o flutuante tapando a prova do lado.
- **Correção:** reduzir o padding superior do hero (96 px para 48 px) e o espaço entre eyebrow e título quando `max-height: 800px`; esconder o flutuante enquanto o hero estiver na tela (já existe o IntersectionObserver em `WhatsAppFloat.tsx`, basta incluir `#topo` em `COM_WHATSAPP`, já que o hero tem o próprio botão de WhatsApp).
- **Comando sugerido:** `/impeccable layout` no hero.

### P3

| ID | Onde | Problema | Correção |
| --- | --- | --- | --- |
| U-16 | Seções 01 a 07 | Índice numérico + título + parágrafo cinza idênticos em todas as seções (ver veredito) | Tirar o índice de 2 ou 3 seções ou variar a composição (título lateral na 04, título sobre a imagem na 05) |
| U-17 | Formulário, Metragem | `type="number"` muda o valor com a roda do mouse e mostra setas no desktop | `type="text" inputMode="numeric" pattern="[0-9]*"` |
| U-18 | Rodapé | A linha acima do "© 2026" vai além do alinhamento do conteúdo (borda desenhada sobre o padding do contêiner) | Mover a borda para um elemento interno ou usar `background-clip: content-box` |
| U-19 | Menu mobile | Não fecha ao tocar fora nem ao rolar | Fechar no `pointerdown` fora do painel |
| U-20 | Hero, `.x-float-card` | `aria-label` em `div` sem papel é ignorado por leitores de tela | `role="group"` ou `figcaption` |
| U-21 | `globals.css` | Neutros em cinza puro hex (`#2e2e2e`, `#f2f2f2`); ícone branco do WhatsApp sobre `#25d366` tem 1,98:1 (WCAG 1.4.11 pede 3:1) | Neutros em OKLCH com leve tom quente da marca; ícone do flutuante em `--on-laranja` escuro ou fundo verde mais escuro |
| U-22 | Sobre, rodapé, seção 03 | Título do Sobre repete a assinatura do rodapé; a introdução da 03 repete o hero ("Receba seu imóvel…") | Sobre com título próprio ("Um engenheiro, do orçamento à ART"); intro da 03 com fato novo |
| U-23 | Botões | Transições com `ease` | `cubic-bezier(.22,1,.36,1)` (ease-out-quint) |
| U-24 | Header | A navegação não marca a seção atual e o botão "Solicitar orçamento" continua visível dentro do formulário | `aria-current` via IntersectionObserver; esconder o botão do header quando o formulário estiver na tela |

## Personas

**Comprador do PRODUCT.md (celular, à noite, ansioso):** abre o link que recebeu no WhatsApp, lê o hero e gosta. Rola 15 telas para chegar ao formulário, passando três vezes pela mesma explicação sobre caimento. Procura preço e não encontra. Procura quem é o engenheiro e encontra só "Mercalq Engenharia". Risco: salva o link "para ver depois" e não volta.

**Primeira contratação de serviço técnico:** vê "NBR 16747 · NBR 17170" logo abaixo dos botões e não sabe se precisa entender isso. No laudo de exemplo, vê ícones de montanha e conclui que é um modelo, não um laudo real.

**Usuário de Mac com Safari:** preenche o formulário, clica em enviar; o pop-up é bloqueado e a aba do site vira o WhatsApp Web. Se não estiver logado no WhatsApp Web, fica numa tela de QR code sem o site para voltar.

## Plano de ajuste

**1. Antes de publicar (conteúdo, com o cliente)**

- [ ] U-01 · Nome, CREA, CNPJ e foto do engenheiro
- [ ] U-02 · Preço ou fatores de preço e prazo de resposta
- [ ] U-03 · Fotos reais no laudo de exemplo; PDF de laudo anonimizado
- [ ] U-06 · 2 ou 3 depoimentos ou posts reais
- [ ] U-08 · GTM/GA4 instalado e evento conferido

**2. Código, uma rodada (cerca de 1 dia)**

- [ ] U-07 · Aba aberta no gesto + estado de confirmação
- [ ] U-09 · `WhatsAppLink` no rodapé
- [ ] U-10 e U-12 · FAQ antes do formulário, perguntas novas, normas explicadas
- [ ] U-11 · Link "Prefere direto?"
- [ ] U-13 · Cartão do hero cobrindo a legenda
- [ ] U-25 · Hero na dobra do notebook; flutuante escondido no hero
- [ ] U-15 · Página de privacidade

**3. Estrutura e direção visual**

- [ ] U-05 · Fundir 01 e 02, achados compactos no celular, CTA ao fim da 04 (`/impeccable distill`)
- [ ] U-04 · Um desenho por achado; instrumentos na 02 (`/impeccable bolder`)
- [ ] U-14 e U-16 · Eyebrow legível, menos repetição de índice (`/impeccable typeset`)

**4. Polimento:** U-17 a U-24 numa passada (`/impeccable polish`).

Depois: medir o tamanho da página de novo (meta: formulário antes de 55% da rolagem no celular), testar o envio no Safari do Mac e no iPhone, e acompanhar `cta_whatsapp` por origem por duas semanas.

## Método

- Leitura completa de `app/`, `components/`, `lib/` e `globals.css`, com PRODUCT.md e os dois relatórios anteriores como referência.
- Capturas de página inteira e medições automáticas (overflow, texto < 13 px, alvos < 44 px, altura de cada seção, imagem servida) em 1440, 390 e 320 px, com emulação de dispositivo móvel via Chrome DevTools Protocol, sobre `localhost:3000` (build de desenvolvimento).
- Chrome real (janela de 1100 × 750): navegação por teclado (foco laranja visível), rastreamento dos 4 links de WhatsApp pelo `dataLayer`, envio do formulário com dados de teste e `window.open` interceptado (sem abrir o WhatsApp), primeira tela em tamanho de notebook.
- Não testado: Safari e celular real, Lighthouse, leitor de tela real. O momento do `window.open` (U-07) foi medido no Chrome; o bloqueio no Safari é inferido da regra de ativação do navegador, não testado no Safari.
