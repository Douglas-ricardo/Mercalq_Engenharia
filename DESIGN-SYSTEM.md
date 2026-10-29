# Mercalq Engenharia — Design System

> Fonte única de verdade para o site da Mercalq Engenharia (Next.js) e peças do Instagram @mercalq.eng.
> Versão 1.1 · outubro/2026 (revisão anti-template)

---

## 1. Visão geral

**O negócio:** vistoria técnica de recebimento de imóvel novo. O engenheiro vai ao apartamento antes da entrega das chaves, verifica acabamentos, instalações e conformidade com projeto/memorial descritivo e entrega um **laudo com registro fotográfico e ART** que serve de respaldo junto à construtora.

**Assinatura:** *Precisão que constrói confiança.*

**Objetivo único do site:** levar o visitante a pedir orçamento — pelo **formulário** (que abre o WhatsApp já preenchido) ou direto pelo **WhatsApp (11) 99188-4544**. Toda seção mostra prova técnica e termina num CTA.

**Princípios**
1. **Prova antes de promessa** — mostrar o que é verificado, como é o laudo, o que se encontra.
2. **Linguagem de engenheiro** — cotas, plantas, medições, marcadores numerados.
3. **Grafite + laranja + prata** — tudo derivado do logo.
4. **Cantos retos, sem enfeite** — nada de gradiente, sombra decorativa ou emoji.

---

## 2. Logo

| Arquivo | Uso |
|---|---|
| `public/assets/logos/mercalq-logo-completo.png` (480×458, fundo transparente) | Rodapé, "Sobre", capa de laudo, post de apresentação. Mín. 160px de largura. |
| `public/assets/logos/mercalq-simbolo.png` (146×176, fundo transparente) | Header (44px de altura), avatar. |
| `app/icon.png` · `app/apple-icon.png` | Favicon e ícone iOS (símbolo sobre grafite). |
| `design/logo/` | Arquivo original do cliente + recortes em alta resolução. |

- O logo só existe **sobre grafite** (o recorte transparente mantém o relevo do mockup e escurece em fundo claro). Em seção clara, coloque-o dentro de um bloco `surface-deep` do tema grafite.
- Respiro mínimo: altura do "M" do letreiro.
- **Nunca** redesenhe símbolo (barras prata + engrenagem + traço laranja) ou letreiro.
- Header usa símbolo + nome em texto (`.mq-brand`): "MERCALQ" em Archivo largo + "ENGENHARIA" em Michroma laranja.
- **Pendente:** SVG vetorial e versão horizontal com o designer (os PNGs atuais foram recortados do mockup 3D).

---

## 3. Voz e conteúdo

- Fale com **você**; a Mercalq fala em **nós** ("avaliamos", "entregamos").
- Frases curtas, verbo no começo, benefício antes do processo.
- Nomeie o que é verificado — nunca "verificamos tudo".
- Cite **NBR 16747, NBR 17170 e ART** quando reforçar confiança, em fonte mono. **Todo laudo sai com ART emitida pelo engenheiro.**
- Sem medo como argumento ("pesadelo", "prejuízo garantido"). "Problemas invisíveis aos olhos" pode.
- Sem emoji no site. CAIXA ALTA só em eyebrow e status de laudo.
- CTA = verbo + canal: "Solicitar orçamento", "Falar no WhatsApp", "Enviar pelo WhatsApp". Nunca "Saiba mais".

**Frases da marca (reutilizar):**
- "Receba seu apartamento sem surpresas."
- "Mais do que identificar problemas: entregamos um registro técnico completo do seu imóvel."
- "Receba seu imóvel com a tranquilidade de quem sabe exatamente o que está sendo entregue."
- "Agende sua vistoria e proteja seu investimento."

---

## 4. Tokens

### 4.1 Cores

Dois temas: **Grafite** (padrão) e **Claro** (seções de leitura longa: laudo, FAQ). Contrastes WCAG medidos.

No CSS os neutros são escritos em OKLCH: a mesma luminosidade dos cinzas do logo, com croma 0,004–0,008 no matiz do laranja (56). A tabela mostra o hex equivalente, usado também nos SVGs das ilustrações. Nada de `#000` nem `#fff` puros.

| Token | Grafite | Claro | Uso |
|---|---|---|---|
| `surface` | `#312d2a` | `#f4f3f1` | Fundo da página |
| `surface-raised` | `#413c39` | `#fffefd` | Cards, header, formulário |
| `surface-deep` | `#221e1b` | `#e9e7e3` | Faixas alternadas, rodapé |
| `surface-post` | `#585350` | `#585350` | Fundo fixo dos posts do Instagram |
| `ink` | `#f5f1ee` | `#26221f` | Texto principal (12.1:1 / 14.2:1) |
| `ink-muted` | `#bbb7b5` | `#605b58` | Texto de apoio (6.9:1 / 6.0:1) |
| `prata` | `#d7d3d0` | `#8c8984` | Traço de ilustração, cotas |
| `line` | `#4e4946` | `#dedbd6` | Divisores decorativos |
| `line-strong` | `#8d8987` | `#8c8984` | Borda de input e botão secundário (≥3:1) |
| `laranja` | `#d6751b` | `#d6751b` | **Laranja do logo.** Botão primário, ícones, barra de acento |
| `laranja-vivo` | `#fc7824` | `#fc7824` | Marca-texto (`.mq-hl`) e marcadores numerados |
| `laranja-texto` | `#fc8a3d` | `#a4500c` | Laranja em **texto e links** |
| `laranja-soft` | `#4a3424` | `#fbe6d4` | Fundo de ícone em card, tag neutra |
| `on-laranja` | `#221e1b` | `#221e1b` | Texto sobre laranja (5.0:1 / 6.2:1) |
| `conforme` / `-soft` | `#5cc8d6` / `#21434a` | `#0f6e7a` / `#d9f0f3` | Status CONFORME (azul-petróleo, não verde) |
| `nao-conforme` / `-soft` | `#ff6b5e` / `#4f2a27` | `#b42318` / `#fde3e0` | Status NÃO CONFORME |
| `atencao` / `-soft` | `#f2c94c` / `#4a3f1c` | `#8a6100` / `#fbf0cf` | Status ATENÇÃO |
| `whatsapp` | `#009d38` | `#009d38` | **Só** no botão flutuante. Verde da marca escurecido (era `#25d366`) para o ícone branco passar 3:1 |
| `on-whatsapp` | `#fbfdfa` | `#fbfdfa` | Logo do WhatsApp sobre o verde (3,5:1, WCAG 1.4.11) |
| `focus` | `#fc7824` | `#a4500c` | Anel de foco |

**Regras de cor**
- Botão primário = `laranja` + texto `on-laranja` (escuro). **Nunca branco sobre laranja** (3,3:1, reprova).
- Laranja em texto só com `laranja-texto`.
- Status sempre com **palavra + ícone**, nunca só cor.
- Proporção por tela: ~70% grafite, 20% prata/texto, 10% laranja.
- Neutros novos: tirar a luminosidade do cinza desejado e aplicar `oklch(L 0.006–0.008 56)`.

### 4.2 Tipografia

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=IBM+Plex+Mono:wght@400;500&family=Michroma&display=swap" rel="stylesheet">
```

| Família | Token | Uso |
|---|---|---|
| **Archivo** | `--font-display`, `--font-sans` | Tudo. Títulos com `font-stretch: 118%` (`.mq-display`) para ecoar o letreiro largo do logo |
| **Michroma** | `--font-tecnica` | Só eyebrow do hero e "ENGENHARIA" da marca: 12px, CAIXA ALTA, `letter-spacing: .14em` |
| **IBM Plex Mono** | `--font-mono` | Dados técnicos: medições, nº de laudo, normas, ART, telefone, índice de seção |

| Estilo | Tamanho / altura | Peso | Uso |
|---|---|---|---|
| `x-hero-title` | 72/74 (mobile 40/44) | 700 | H1 do hero |
| `display-xl` | 56/60 | 700 | H1 de páginas internas |
| `display-l` | 40/46 | 700 | H1 mobile, chamadas grandes |
| `heading-2` | 30/36 (mobile 28/34) | 700 | Título de seção |
| `heading-3` | 21/28 | 650 | Card, passo, formulário |
| `lead` | 19/30 | 400 | Subtítulo |
| `body` | 16/26 | 400 | Texto corrido (máx. 68ch) |
| `body-sm` | 14/22 | 400 | Legenda, nota |
| `label` | 15/20 | 600 | Botões, navegação |
| `eyebrow` | 12/18 | Michroma | Sobretítulo (só no hero) |
| `mono` | 13/20 | 500 | Dados técnicos |
| `metric` | 32/36 | 500 mono | Números de destaque |

No CSS os tamanhos ficam em `rem` (base 16px) e a altura de linha sem unidade (ex.: 16/26 → `1rem` / `1.625`), para o texto acompanhar o zoom de fonte do navegador. Mono usa `tabular-nums`; `body`, `lead` e `body-sm` usam `text-wrap: pretty`.

### 4.3 Espaçamento (base 4px)

`space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-6` 24 · `space-8` 32 · `space-12` 48 · `space-16` 64 · `space-24` 96

- Seção: 120px desktop / 72px mobile (vertical).
- Container: máx. **1240px**, gutter 32px (20px mobile).
- Layout editorial: grid **4/8 colunas**, gap 64px.

### 4.4 Raio, sombra, layout

| Token | Valor | Uso |
|---|---|---|
| `radius-0` | 0 | Padrão: cards, seções, imagens |
| `radius-sm` | 2px | Botões, inputs, tags |
| `radius-pill` | 999px | Botão flutuante, marcadores numerados |
| `shadow-float` | `0 8px 24px rgba(0,0,0,.45)` | Só elementos flutuantes |
| `accent-bar` | 4px | Barra laranja de acento |
| `header-height` | 72px (64 mobile) | Header fixo |
| `measure` | 68ch | Largura de parágrafo |

### 4.5 CSS variables (base para `globals.css`)

```css
:root, [data-theme="grafite"] {
  --surface:oklch(0.301 0.008 56); --surface-raised:oklch(0.360 0.008 56); --surface-deep:oklch(0.239 0.008 56); --surface-post:oklch(0.446 0.008 56);
  --ink:oklch(0.961 0.006 56); --ink-muted:oklch(0.783 0.006 56); --prata:oklch(0.870 0.006 56); --line:oklch(0.409 0.008 56); --line-strong:oklch(0.633 0.006 56);
  --laranja:#d6751b; --laranja-vivo:#fc7824; --laranja-texto:#fc8a3d; --laranja-soft:#4a3424; --on-laranja:oklch(0.239 0.008 56);
  --conforme:#5cc8d6; --conforme-soft:#21434a; --nao-conforme:#ff6b5e; --nao-conforme-soft:#4f2a27;
  --atencao:#f2c94c; --atencao-soft:#4a3f1c; --whatsapp:oklch(0.60 0.191 150); --on-whatsapp:oklch(0.99 0.004 150); --focus:#fc7824;
  --shadow-float:0 8px 24px rgba(0,0,0,.45);
}
[data-theme="claro"] {
  --surface:#f4f3f1; --surface-raised:oklch(1 0.004 56); --surface-deep:#e9e7e3;
  --ink:oklch(0.256 0.008 56); --ink-muted:oklch(0.475 0.008 56); --prata:#8c8984; --line:#dedbd6; --line-strong:#8c8984;
  --laranja-texto:#a4500c; --laranja-soft:#fbe6d4;
  --conforme:#0f6e7a; --conforme-soft:#d9f0f3; --nao-conforme:#b42318; --nao-conforme-soft:#fde3e0;
  --atencao:#8a6100; --atencao-soft:#fbf0cf; --focus:#a4500c;
  --shadow-float:0 8px 24px rgba(35,35,35,.18);
}
:root {
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-6:24px;
  --space-8:32px; --space-12:48px; --space-16:64px; --space-24:96px;
  --radius-0:0; --radius-sm:2px; --radius-pill:999px;
  --container:1240px; --measure:68ch; --header-height:72px; --accent-bar:4px;
  --font-display:Archivo,"Helvetica Neue",Arial,sans-serif;
  --font-sans:Archivo,"Helvetica Neue",Arial,sans-serif;
  --font-tecnica:Michroma,"Arial Black",sans-serif;
  --font-mono:"IBM Plex Mono","Courier New",monospace;
}
```

### 4.6 Tailwind (opcional)

```ts
// tailwind.config.ts — mapeia para as CSS variables acima
export default {
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: "var(--surface)", raised: "var(--surface-raised)", deep: "var(--surface-deep)" },
        ink: { DEFAULT: "var(--ink)", muted: "var(--ink-muted)" },
        line: { DEFAULT: "var(--line)", strong: "var(--line-strong)" },
        laranja: { DEFAULT: "var(--laranja)", vivo: "var(--laranja-vivo)", texto: "var(--laranja-texto)", soft: "var(--laranja-soft)", on: "var(--on-laranja)" },
        prata: "var(--prata)",
        status: { ok: "var(--conforme)", nc: "var(--nao-conforme)", at: "var(--atencao)" },
      },
      fontFamily: {
        display: ["var(--font-display)"], sans: ["var(--font-sans)"],
        tecnica: ["var(--font-tecnica)"], mono: ["var(--font-mono)"],
      },
      borderRadius: { none: "0", sm: "2px", pill: "999px" },
      maxWidth: { container: "1240px", measure: "68ch" },
    },
  },
};
```

---

## 5. Assinatura visual

Use pelo menos dois por seção, nunca os quatro juntos.

1. **Marca-texto laranja** — `.mq-hl`: fundo `laranja-vivo` atrás de 1–3 palavras do título, texto `on-laranja`. Uma vez por título.
2. **Barra de acento** — 4px `laranja` no topo de painéis/formulário ou lateral de métricas.
3. **Desenho técnico** — grade de pontos (`.mq-dots`, 24px), plantas, cotas.
4. **Marcadores numerados** — `.mq-pin`, círculo `laranja-vivo` com número escuro, ligando imagem e lista.

**Índice de seção:** as seções de conteúdo (`01` sistemas, `02` laudo, `03` como funciona, `04` achados) abrem com número mono + traço e um título que é uma afirmação ("Imóvel novo também sai da obra com defeito."), não um rótulo ("O que avaliamos"). FAQ, Sobre e Orçamento não levam número.

```html
<p class="x-idx">01</p>
<h2 class="heading-2 mq-display">Imóvel novo também sai da obra com defeito.</h2>
```

**Movimento:** só na abertura. A planta do hero (`HeroPlan`, SVG inline) desenha as paredes (`stroke-dashoffset`), depois detalhes, cotas e marcadores; o título entra em três linhas e o cartão do laudo chega com os status um a um. Só CSS, desligado em `prefers-reduced-motion`.

**Regras anti-template (v1.1)**
- Eyebrow Michroma **só no hero**. Não repetir rótulo em caixa alta acima de cada seção.
- Marca-texto `.mq-hl` no máximo **2 vezes na página** (hero e orçamento).
- Proibido: grade de cards ícone + título + texto, números grandes de "métricas", faixa lateral colorida (`border-left` de acento), vidro fosco, travessão (—) no texto.
- Botão primário só em header, hero, fim da linha do tempo e formulário. O do header some enquanto o formulário está na tela.

---

## 6. Imagens e ícones

**Fotografia (prioridade máxima — substitui as ilustrações):**
- Detalhe com instrumento (nível, trena, multímetro).
- Ocorrência com marcador numerado sobreposto — mesmo número do laudo.
- Ambiente inteiro, luz natural, verticais retas, levemente dessaturado.
- Sempre com autorização; sem rosto, número da unidade ou logo de construtora.
- Nunca: stock de capacete sorrindo, prédio genérico.

**Ilustrações** (`assets/ilustracoes/`, 1200×800, fundo `#2e2e2e`): `vistoria-planta.svg`, `medicao-caimento.svg`, `esquadria-vedacao.svg`, `entrega-chaves.svg`, cada uma com versão `-m` (rótulos curtos, 46–50 no viewBox) que o componente `Ilustracao` usa onde o desenho aparece estreito: até 640px e entre 961 e 1279px. `laudo-tecnico.svg` é só a página (640×720), sobre bloco grafite. Regra: nenhum texto de ilustração abaixo de ~10px renderizado.

**Ícones** (`assets/icones/`, 24×24, traço 1.75, tinta `#d6751b`): vistoria, laudo, registro-fotografico, eletrica, hidraulica, esquadria, piso, parede, conformidade, medicao, chaves, agenda, conversa, alerta. Inline no React: troque o stroke por `currentColor`.

**WhatsApp:** todos os CTAs e o botão flutuante usam o **logo oficial do WhatsApp** (`IconWhatsApp`, preenchido, `currentColor`). O balão `conversa` fica para usos genéricos de mensagem.

```tsx
export const IconConversa = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M4 18.5V5h16v11H8z" /><path d="M8 9.5h8M8 12.5h5" />
  </svg>
);
```

---

## 7. Componentes

Classes com prefixo `mq-` (bundle do design system) e `x-` (extensões da landing).

### Button
| Variante | Classe | Uso |
|---|---|---|
| Primário | `mq-btn mq-btn-primary` | 1 por seção. `laranja` + `on-laranja`, hover `laranja-vivo` |
| Secundário | `mq-btn mq-btn-secondary` | Ação alternativa, borda `line-strong` |
| Link | `mq-btn mq-btn-ghost` | "Pergunte no WhatsApp →" |
| Pequeno | `+ mq-btn-sm` | Header (40px) |

Altura mín. 48px (hero: 56px). `white-space: nowrap`. Desabilitado: `aria-disabled="true"`.

### Header
Sticky, 72px, `surface` sólido (sem vidro fosco), borda `line`. Marca à esquerda, 4 âncoras ao centro (menu abaixo de 960px), "Solicitar orçamento" à direita → `#orcamento`. A âncora da seção no meio da tela recebe `aria-current` e sublinhado laranja (`SectionSpy`). Com fonte ampliada no celular (largura abaixo de 18.5em) o header mostra só o símbolo da marca.

### Hero
Grid 2 colunas, gap 80px, padding 96/120. Eyebrow → H1 `x-hero-title` com `.mq-hl` → lead (máx. 36ch) → CTA primário "Solicitar orçamento" + secundário "Falar no WhatsApp". À direita, planta com borda `line` e **cartão de laudo** (`x-float-card`: "Exemplo · Laudo nº…" em mono + 3 linhas com StatusTag) logo abaixo da planta, dividindo a borda inferior (−1px); nunca por cima do desenho (escondia os marcadores). O ponto final do H1 fica dentro do `.mq-hl`.

### Linha técnica do hero
A antiga faixa de 4 colunas virou uma linha mono no hero: "Engenheiro civil · Laudo com ART registrada no CREA · NBR 16747 e 17170".

### InspectionChecklist (01 · sistemas, visita comum × vistoria)
Junta o antigo comparativo e a lista de sistemas. À esquerda (sticky) título + texto; à direita `<table class="x-compare">` com 3 colunas: **Sistema** (título 17/24 650 + o que é verificado em `body-sm`) · **Visita comum** (`ink-muted`) · **Vistoria Mercalq** (check laranja + o que é medido). Os 6 sistemas: acabamentos e revestimentos; pisos, paredes e forros; portas, janelas e esquadrias; instalações elétricas; instalações hidráulicas; conformidade com projetos. No mobile cada linha vira um bloco empilhado com o prefixo "Visita comum:".

### ReportSection (02 · o laudo)
Tema **Claro**. Texto + 2 itens numerados com `mq-pin` (registro fotográfico; relatório com normas e ART). Sem botão: a ação fica no fim da linha do tempo. No desktop a imagem do laudo fica à esquerda (7/5), invertendo a composição das seções vizinhas; no celular o texto vem antes. Substituir por páginas reais anonimizadas.

### ProcessSteps (linha do tempo)
Eixo horizontal com 4 marcos (o primeiro preenchido em `laranja`). Cada passo tem "quando" em mono laranja (ex.: "Antes de assinar o termo"), título e texto. Selo "Entrega das chaves" com borda laranja ocupando o nó do 4º passo (Acompanhamento). No mobile o eixo fica vertical à esquerda. Fecha com uma linha "O primeiro passo é o orçamento…" + botão primário (`.x-process-cta`).

### FindingCard ("O que costumamos encontrar")
`mq-project`: imagem 3:2 com StatusTag no canto, linha mono com o ambiente, `heading-3` com o achado, 1–3 ocorrências com `mq-pin`. Quando houver acervo real, adicionar metadados (tipo · m², bairro, mês) e desfecho.

### Depoimentos (`Testimonials`)
Entre os achados e o FAQ, `surface`. Título "Quem já recebeu com laudo." e até 3 citações em `lead`, cada uma com traço `line-strong` acima, nome em 650 e bairro · achados em mono. Sem aspas decorativas, sem foto, sem estrelas. Só aparece com depoimentos reais.

### FindingCard: layout
O primeiro achado ocupa a linha inteira (imagem 7 / texto 5); os outros dois ficam lado a lado embaixo. Até 760px só o primeiro mostra a imagem; os outros viram lista.

### About + carimbo
Abre com "Quem vistoria é quem assina." em tamanho de destaque na largura toda (`.x-about-title`). Embaixo, no desktop, carimbo à esquerda e texto (lead + apoio) à direita; no celular o texto vem antes. O **carimbo de prancha técnica** (`.x-carimbo`, `<dl>`): símbolo + nome com barra laranja inferior, depois células 2×3 (responsável técnico, registro CREA, ART, normas, atendimento, WhatsApp). Substitui métricas e a foto até existir foto real do engenheiro.

### QuoteForm (formulário → WhatsApp)
Card `surface-raised` com barra de acento, padding 40px, grid 2 colunas (1 no mobile).

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome | text, `autocomplete="name"` | ✔ |
| WhatsApp | tel com máscara `(11) 90000-0000` | — |
| Tipo de imóvel | select: Apartamento, Studio, Cobertura, Casa em condomínio, Sala comercial | ✔ |
| Metragem (m²) | text, `inputMode="numeric"`, só dígitos (máx. 4) | — |
| Bairro e cidade | text | ✔ |
| Data prevista da entrega | date | — |
| Empreendimento / construtora | text | — |
| Algo que já te preocupa? | textarea | — |

Inputs: 50px, fonte 16px (evita zoom no iOS), fundo `surface`, borda `line-strong`, foco `outline 2px var(--focus)`. Botão "Enviar pelo WhatsApp" largura total, 56px, sempre ativo. Envio inválido: foco no 1º campo faltante, `aria-invalid` e mensagem abaixo do campo (`role="alert"`). No desktop a aba é aberta no clique (antes da Server Action, para não ser bloqueada) e depois aponta para o WhatsApp; no celular abre na mesma aba (abre o app). Após o envio, mensagem `role="status"` com link "Não abriu? Abrir de novo". Nota LGPD abaixo: "Seus dados são usados apenas para responder esta solicitação."

### FAQ
Tema **Claro**, layout 4/8, `<details>/<summary>` nativo, primeiro aberto. Fica antes do Sobre e do formulário. Gerar JSON-LD `FAQPage` com o mesmo conteúdo.

### WhatsAppFloat
Círculo 56px `whatsapp` com o logo do WhatsApp em `on-whatsapp` (branco), `shadow-float`, fixo no canto inferior direito. Acompanha a rolagem e some (fade, `aria-hidden`, fora do Tab) onde a página já oferece WhatsApp: hero, FAQ, formulário e rodapé. Rótulo "Fale no WhatsApp" só no desktop.

### Footer
`surface-deep`. Logo completo (160px) · Contato (WhatsApp, Instagram, área) · Navegação, com títulos `mq-footer-title` (Archivo 13px 600, sem Michroma). Base em mono: © + CNPJ · Eng. responsável + CREA-SP.

### StatusTag e Pin
`mq-tag mq-tag-ok | -nc | -at | -neutral`: 26px, 12px 700 caixa alta, fundo `*-soft`, texto `ink`, ícone na cor do status. `mq-pin`: 26px, `laranja-vivo`, número `on-laranja`.

### InstagramPost
1080×1350, fundo `surface-post`, título Archivo largo com `.mq-hl` (texto **escuro** sobre laranja), lista com ▸ laranja, logo no canto inferior direito, margem 72px. Modelos: educativo, achado da vistoria, chamada.

---

## 8. Estrutura da landing

| # | Seção | id | Tema | Fundo |
|---|---|---|---|---|
| — | Header | — | Grafite | `surface-raised` translúcido |
| — | Hero | `topo` | Grafite | `surface` + grade de pontos |
| 01 | Por que vistoriar | — | Grafite | `surface` |
| 02 | O que avaliamos | `avaliamos` | Grafite | `surface-deep` |
| 03 | O laudo | `laudo` | **Claro** | `surface` |
| 04 | Como funciona | `como-funciona` | Grafite | `surface` |
| 05 | O que costumamos encontrar | `achados` | Grafite | `surface-deep` |
| 06 | Sobre | `sobre` | Grafite | `surface` |
| 07 | Orçamento (formulário) | `orcamento` | Grafite | `surface-deep` + grade |
| — | FAQ | `duvidas` | **Claro** | `surface` |
| — | Rodapé | — | Grafite | `surface-deep` |
| — | WhatsAppFloat | — | — | fixo |

---

## 9. WhatsApp e formulário — implementação

```ts
// lib/whatsapp.ts
export const WHATSAPP = "5511991884544";
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export type Lead = {
  nome: string; tel?: string; tipo: string; m2?: string;
  local: string; data?: string; emp?: string; obs?: string;
};

const fmtData = (iso?: string) => (iso ? iso.split("-").reverse().join("/") : "");

export function mensagemOrcamento(l: Lead) {
  return [
    "Olá, Mercalq! Gostaria de um orçamento de vistoria de recebimento.",
    "",
    `*Nome:* ${l.nome}`,
    l.tel && `*WhatsApp:* ${l.tel}`,
    `*Imóvel:* ${l.tipo}${l.m2 ? ` · ${l.m2} m²` : ""}`,
    `*Local:* ${l.local}`,
    l.data && `*Entrega prevista:* ${fmtData(l.data)}`,
    l.emp && `*Empreendimento:* ${l.emp}`,
    l.obs && `*Observações:* ${l.obs}`,
  ].filter(Boolean).join("\n");
}
```

**Mensagens pré-preenchidas por contexto**

| Onde | Mensagem |
|---|---|
| Hero (secundário) | Olá! Vim pelo site e quero um orçamento de vistoria de recebimento. |
| FAQ | Olá! Tenho uma dúvida sobre a vistoria antes de pedir orçamento. |
| Flutuante | Olá! Quero um orçamento de vistoria. |
| Formulário | `mensagemOrcamento(lead)` |

**Importante:** `wa.me` só abre a conversa preenchida — o cliente ainda precisa tocar em enviar. Para não perder lead, salve antes de redirecionar:

```ts
// app/orcamento/actions.ts
"use server";
import { waLink, mensagemOrcamento, type Lead } from "@/lib/whatsapp";

export async function enviarOrcamento(lead: Lead) {
  await fetch(`${process.env.API_URL}/leads`, {          // FastAPI → PostgreSQL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, origem: "form_site" }),
  });
  return waLink(mensagemOrcamento(lead));               // client: window.location.href = url
}
```

Medir cada clique de WhatsApp como evento `cta_whatsapp` com `{ origem: "hero" | "form" | "faq" | "float" }` — é a métrica de conversão do site.

---

## 10. Acessibilidade

- Texto ≥ 4,5:1 (≥ 3:1 a partir de 24px) — pares anotados na tabela de cores.
- Foco visível: `outline: 2px solid var(--focus); outline-offset: 2px`.
- Status nunca só por cor (palavra + ícone).
- Alvos de toque ≥ 44px (inclui botão do header, links do rodapé e telefone); flutuante 56px; inputs 50px.
- Rótulo "Fale no WhatsApp" do flutuante aparece só nos primeiros 4 s e no hover/foco.
- O flutuante some (com `aria-hidden` e fora do Tab) enquanto o formulário, o FAQ ou o rodapé estão na tela, porque essas áreas já têm o próprio WhatsApp.
- Textos dentro das ilustrações SVG: ≥ 26 unidades no viewBox de 1200 (legíveis no mobile).
- Abaixo de 960px o header tem menu (botão 44px); abaixo de 420px o CTA vira "Orçamento".
- Todo input com `<label for>`; `aria-label` no botão flutuante.
- Ilustrações informativas com `alt` descritivo; decorativas `alt=""`.

## 11. SEO local

- `<title>`: "Vistoria de Imóvel Novo em São Paulo | Mercalq Engenharia".
- JSON-LD `ProfessionalService` (telefone, área, `sameAs` Instagram) + `FAQPage`.
- Google Empresa com as mesmas fotos de vistoria.

---

## 12. Pendências

- [ ] Logo vetorial (SVG transparente) + versão horizontal.
- [ ] Foto do engenheiro em campo e fotos reais de vistorias.
- [ ] Páginas de um laudo real anonimizado para a seção 03.
- [ ] Nome do engenheiro, CREA-SP, CNPJ, área de atendimento.
- [ ] Política de revistoria (inclusa ou cobrada) para o FAQ.
- [x] ART emitida em todo laudo — confirmado.
- [x] Ícone do WhatsApp — logo oficial do WhatsApp em todos os CTAs e no flutuante.
- [x] Logo do cliente recortado (PNG transparente) — símbolo, completo e favicon.
