# Relatório de QA — Site Mercalq (localhost:3000)

24/10/2026 · Douglas

## Resumo

O site está estruturalmente sólido — sem rolagem horizontal de 320 a 1440 px, todas as imagens carregam e o formulário gera a mensagem de WhatsApp correta — mas **não está pronto para publicar**: foram encontrados **16 problemas (3 altos, 7 médios, 6 baixos)**.

Corrigir antes de ir ao ar:

1. **Placeholders públicos** — "Eng. responsável a confirmar", "CREA-SP a confirmar" e "CNPJ a confirmar" aparecem na seção Sobre e no rodapé (QA-02).
2. **Formulário mudo** — com campos vazios, o botão é clicável mas não mostra erro nem leva ao campo faltante (QA-03).
3. **Header em 320 px** — a marca colide com o botão "Solicitar orçamento" (QA-01).

Também importante para um site que vive de WhatsApp: falta `og:image`, então o link compartilhado no WhatsApp sai sem imagem de prévia (QA-10).

## Escopo e método

Teste feito no Google Chrome em `http://localhost:3000/` (build de desenvolvimento), página única da landing.

| Viewport | Como | O que foi feito |
| --- | --- | --- |
| 1440 × 900 | Janela do Chrome | Rolagem completa com screenshots, auditoria de DOM, formulário ponta a ponta até o WhatsApp |
| 1024 | Iframe na mesma origem | Overflow, header, hero |
| 768 | Iframe na mesma origem | Overflow, header, navegação |
| 414 · 375 · 320 | Iframe na mesma origem | Rolagem completa em 375, overflow e header em 320/414, formulário |

Checado em cada largura: rolagem horizontal, elementos fora da tela, texto cortado, imagens quebradas ou vazando, sobreposições, alvos de toque, tamanho de fonte, âncoras, links de WhatsApp, validação e mensagem do formulário, console, metadados de SEO e acessibilidade básica.

Limites: o Chrome não reduz a janela abaixo de 500 px, então o mobile foi simulado por iframe — sem user agent de celular nem toque. Safari/iOS, performance (Lighthouse) e a gravação do lead no servidor não foram testados.

## Problemas encontrados

16 problemas, ordenados por severidade. Alta = bloqueia publicação; Média = afeta conversão ou leitura; Baixa = polimento.

| ID | Severidade | Viewport | Seção | Problema | Correção sugerida |
| --- | --- | --- | --- | --- | --- |
| QA-01 | Alta | 320 px | Header | "MERCALQ ENGENHARIA" encosta e fica por baixo do botão "Solicitar orçamento" — o "Q" some atrás do botão. | Abaixo de 360 px: esconder o "ENGENHARIA" do header ou trocar o rótulo do botão por "Orçamento"; `gap` mínimo de 12 px. |
| QA-02 | Alta | Todos | Sobre, Rodapé | Placeholders visíveis ao público: "Eng. responsável a confirmar", "CREA-SP a confirmar", "CNPJ a confirmar". Para um serviço de engenharia, isso derruba a credibilidade. | Preencher com os dados reais ou ocultar o campo até ter o dado. |
| QA-03 | Alta | Todos | Formulário | Com campos obrigatórios vazios, o botão (`aria-disabled="true"`) continua clicável e o submit dispara, mas nada acontece: sem mensagem de erro, sem `aria-invalid`, sem foco no primeiro campo faltante. | No submit inválido: focar o 1º campo vazio, marcar `aria-invalid`, mostrar erro abaixo de cada campo (`role="alert"`). |
| QA-04 | Média | 1024–1440 px | Hero | O cartão "Laudo nº 2026-0147" cobre ~70% da planta em 1024 px e metade em 1440 px (marcadores 2 e 4 escondidos). A ilustração perde a função. | Reduzir o cartão (≈280 px) e ancorá-lo na base, saindo para fora da planta; abaixo de 1280 px empilhar abaixo da imagem, como já é no mobile. |
| QA-05 | Média | Desktop | Seções 02 e 04 | O rótulo fixo "Fale no WhatsApp" passa por cima do conteúdo da direita (ex.: "Teste de escoamento · inspeção de registros", título "Acompanhamento"). | Mostrar o rótulo só nos primeiros 4 s ou no hover; manter só o círculo. |
| QA-06 | Média | Mobile | Toda a página | O botão flutuante cobre o fim de linhas de texto (ex.: "longe do ralo" em Achados) e o rodapé não tem espaço extra embaixo. | `padding-bottom: 88px` no rodapé no mobile; evitar textos alinhados no canto inferior direito. |
| QA-07 | Média | Todos (pior no mobile) | Hero, 02, 03, 05 | Textos internos das ilustrações SVG (cotas, "BOX · BANHEIRO SOCIAL", legendas do laudo) renderizam com 5–8 px — ilegíveis. | Aumentar `font-size` dos textos nos SVGs para ≥ 14 px no viewBox ou remover rótulos pequenos e usar legenda em HTML. |
| QA-08 | Média | Mobile | 05 Achados | A tag "Não conforme" fica sobre o rótulo "BOX · BANHEIRO SOCIAL" do desenho. | Tirar a tag de cima da imagem (acima do título) ou dar respiro no topo do SVG. |
| QA-09 | Média | Todos | Formulário | O envio troca a própria aba para `api.whatsapp.com`: no desktop o visitante sai do site e, ao voltar, o formulário volta vazio. | Desktop: abrir em nova aba (`window.open(url, "_blank")`) com fallback; mobile: manter mesma aba (abre o app). |
| QA-10 | Média | — | SEO / compartilhamento | Sem `og:image` (e sem Twitter card): link compartilhado no WhatsApp/Instagram sai sem prévia. | Adicionar `openGraph.images` 1200×630 no `metadata` do Next.js. |
| QA-11 | Baixa | Mobile | Header, Rodapé | Alvos de toque abaixo de 44 px: botão do header (40 px), links do rodapé (34 px), telefone (17 px de altura). | `min-height: 44px` e `display: inline-flex` nesses links. |
| QA-12 | Baixa | 768–1023 px | Header | No tablet a navegação some e não há menu — só o botão de orçamento. | Mostrar a nav a partir de 768 px ou adicionar menu simples. |
| QA-13 | Baixa | Todos | Hero | O ponto final do H1 fica fora do marca-texto e solto visualmente ("surpresas" + "."). | Remover o ponto do H1 ou incluí-lo dentro do `.mq-hl`. |
| QA-14 | Baixa | Desktop | 04 Como funciona | O chip "Chaves" flutua sobre a linha do tempo entre os passos 3 e 4, sem rótulo explicando o marco. | Renomear para "Entrega das chaves" e alinhá-lo a um nó da linha. |
| QA-15 | Baixa | Todos | Header | "ENGENHARIA" da marca em 8,5 px. | Mínimo de 10 px. |
| QA-16 | Baixa | Todos | Formulário | A mensagem gerada não tem linha em branco depois da saudação — fica um bloco só. | Usar `\n\n` após a primeira linha. |

## Formulário e WhatsApp

O fluxo principal funciona: com os dados de teste, o formulário abriu a conversa com a Mercalq (5511991884544) já preenchida e com acentos e símbolos corretos.

| Teste | Resultado |
| --- | --- |
| Submit com campos vazios | Falha — dispara sem feedback (QA-03) |
| Campos obrigatórios (nome, tipo, bairro) | OK — marcados com * e `required` |
| Máscara do telefone | OK — "11987654321" virou "(11) 98765-4321" |
| Botão muda de estado ao validar | OK — de "Preencha nome, tipo de imóvel e bairro" para "Enviar pelo WhatsApp" |
| Mensagem gerada | OK — nome, WhatsApp, imóvel · m², local, entrega em dd/mm/aaaa, observações |
| Caracteres especiais (& % # ç ã) | OK — codificados corretamente na URL |
| Captura do lead no servidor | Parcial — o submit faz um POST para `/` (Server Action); não deu para confirmar se grava no banco |
| Abertura do WhatsApp | OK, mas na mesma aba (QA-09) |
| Labels, `autocomplete`, fonte 16 px nos inputs | OK — sem zoom forçado no iOS |
| Links de WhatsApp da página (hero, FAQ, rodapé, flutuante) | OK — número certo, mensagem por contexto, `target="_blank"` e `rel="noopener noreferrer"` |

Verificar no código: se a Server Action falhar, o redirecionamento para o WhatsApp precisa acontecer mesmo assim — senão o visitante perde o contato por causa de um erro de banco.

## Conteúdo e textos

Não há erros de digitação nem lorem ipsum; os problemas de texto são dados faltando e afirmações que o engenheiro precisa validar.

Placeholders visíveis (QA-02):

- [ ] Sobre → "Responsável técnico: Eng. responsável a confirmar"
- [ ] Sobre → "Registro: CREA-SP a confirmar"
- [ ] Rodapé → "CNPJ a confirmar"
- [ ] Rodapé → "Eng. responsável a confirmar · CREA-SP a confirmar"

Afirmações que precisam de confirmação antes de publicar:

- [ ] FAQ: "um apartamento de 2 dormitórios costuma levar de 2 a 3 horas no local"
- [ ] FAQ: revistoria "Sim" — confirmar se é oferecida e como é cobrada
- [ ] Área de atendimento "São Paulo e Grande SP" (Sobre, rodapé e JSON-LD)
- [ ] Exemplos "Laudo nº 2026-0147" e "Desnível medido de 4 mm em 1 m" — ok como ilustração, mas não podem parecer caso real de cliente

Ícone do WhatsApp: o site usa o ícone oficial no botão flutuante e nos CTAs, de acordo com o que foi pedido. O DESIGN-SYSTEM.md e o design system publicado dizem o contrário (balão genérico) e precisam ser atualizados.

## SEO e acessibilidade

A base de SEO local está bem feita; falta só a imagem de compartilhamento.

| Item | Status |
| --- | --- |
| `<title>` "Vistoria de Imóvel Novo em São Paulo \| Mercalq Engenharia" | OK |
| Meta description (186 caracteres) | OK — um pouco longa; o Google corta perto de 155–160 |
| `lang="pt-BR"`, viewport, canonical `https://www.mercalq.com.br/` | OK |
| Favicon e apple-icon | OK |
| JSON-LD `ProfessionalService` + `FAQPage` (7 perguntas) | OK |
| `og:image` / Twitter card | Falta (QA-10) |
| Um H1, H2 por seção, H3 nos itens | OK |
| Link "Pular para o conteúdo" e todas as âncoras | OK — todos os destinos existem |
| `alt` nas imagens | OK — descritivos; logos decorativos com `alt=""` |
| Inputs com `<label for>` | OK — 8 de 8 |
| Alvos de toque ≥ 44 px | Parcial (QA-11) |
| Feedback de erro acessível no formulário | Falta (QA-03) |

## O que passou

- **Sem rolagem horizontal** em 320, 375, 414, 768, 1024 e 1440 px — nenhum elemento fora da tela.
- **Imagens:** as 9 imagens carregam (logo, símbolo, 6 ilustrações); o lazy loading funciona; nenhuma vazando do contêiner.
- **Hero mobile:** o cartão do laudo empilha abaixo da planta corretamente; botões em largura total.
- **Tabela "Visita comum × Vistoria Mercalq"** vira lista legível no mobile.
- **Linha do tempo** vira vertical no mobile.
- **Formulário** em uma coluna no mobile, inputs de 50 px, sem zoom no iOS.
- **Temas:** as seções claras (laudo, FAQ) e escuras alternam sem quebra.
- **Console:** nenhum erro ou warning após recarregar a página.
- **Header fixo** sem sobreposição de links de 414 a 1440 px.

## Plano de correção

Três blocos, em ordem; os dois primeiros cabem num dia.

**1. Antes de publicar (Alta)**

- [ ] QA-02 — preencher dados reais ou ocultar campos vazios
- [ ] QA-03 — feedback de erro no formulário
- [ ] QA-01 — header em 320 px

```tsx
// QA-03: submit inválido foca o 1º campo e mostra erro
function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const faltando = [...form.querySelectorAll<HTMLInputElement>(":invalid")];
  faltando.forEach((el) => el.setAttribute("aria-invalid", "true"));
  if (faltando.length) {
    setErros(Object.fromEntries(faltando.map((el) => [el.name, "Campo obrigatório"])));
    faltando[0].focus();
    return;
  }
  enviar();
}
```

```css
/* QA-01: header em telas muito estreitas */
@media (max-width: 359px) {
  .mq-brand-sub { display: none; }
  .mq-header-inner { gap: 12px; }
}
```

**2. Conversão e leitura (Média)**

- [ ] QA-10 — `og:image`
- [ ] QA-09 — WhatsApp em nova aba no desktop
- [ ] QA-04 — cartão do hero menor e empilhado abaixo de 1280 px
- [ ] QA-05 e QA-06 — rótulo flutuante temporário e respiro no rodapé
- [ ] QA-07 e QA-08 — textos dos SVGs legíveis; tag fora da imagem

```ts
// QA-10: app/layout.tsx
export const metadata: Metadata = {
  openGraph: {
    title: "Vistoria de imóvel novo | Mercalq Engenharia",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

// QA-09: desktop em nova aba, mobile na mesma (abre o app)
const url = waLink(mensagemOrcamento(lead));
const mobile = matchMedia("(pointer: coarse)").matches;
const aba = mobile ? null : window.open(url, "_blank");
if (aba) aba.opener = null;            // "noopener" no 3º argumento faz o open() retornar null
else window.location.href = url;       // mobile ou popup bloqueado
```

```css
/* QA-04 */
@media (max-width: 1279px) { .x-float-card { position: static; width: auto; margin-top: 16px; } }
/* QA-06 */
@media (max-width: 767px) { .mq-footer { padding-bottom: 88px; } }
```

**3. Polimento (Baixa)** — QA-11 a QA-16, numa passada única de CSS e texto.

Depois das correções: refazer este roteiro e testar num iPhone e num Android reais (Safari e Chrome), que a emulação por iframe não cobre.
