# Mercalq Engenharia — Site

Landing page de vistoria técnica de recebimento de imóvel novo.
Next.js 16 (App Router) + TypeScript, CSS puro com os tokens do [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).

## Rodando

```bash
npm install
cp .env.example .env.local   # opcional: API_URL da FastAPI de leads
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

## Estrutura

```
app/
  layout.tsx            fontes (Archivo largo, Michroma, IBM Plex Mono), metadata/SEO
  page.tsx              montagem da landing + JSON-LD ProfessionalService e FAQPage
  globals.css           tokens (temas grafite/claro) + todos os componentes mq-/x-
  orcamento/actions.ts  server action: salva o lead (API_URL) e devolve o link wa.me
  privacidade/page.tsx  política de privacidade (LGPD), ligada no formulário e no rodapé
components/
  icons.tsx             14 ícones da marca (24×24, traço 1.75, currentColor)
  ui/                   StatusTag, Pin, SectionHead, WhatsAppLink, Brand
  sections/             Header, Hero, InspectionChecklist (01), ReportSection (02),
                        ProcessSteps (03), Findings (04), Testimonials, Faq, About,
                        QuoteForm, Footer, WhatsAppFloat
lib/
  whatsapp.ts           número, waLink, mensagemOrcamento, mensagens por contexto
  analytics.ts          evento `cta_whatsapp` { origem } → dataLayer / gtag
  content.ts            todos os textos da página (FAQ, sistemas, passos, achados…)
  site.ts               dados institucionais, caminhos dos logos, navegação
public/assets/
  ilustracoes/          SVGs técnicos 1200×800 sobre #2e2e2e
  logos/                logo do cliente recortado (PNG transparente)
design/logo/            arquivo original do cliente + recortes em alta
```

## Conversão

Todo clique de WhatsApp dispara `cta_whatsapp` com `origem: hero | form | faq | float`.
Instale o GTM/GA4 no `layout.tsx` para coletar. O formulário salva o lead em
`POST ${API_URL}/leads` antes de abrir o WhatsApp; se a API falhar ou não estiver
configurada, o cliente segue para o WhatsApp mesmo assim.

## Antes de publicar (pendências do design system §12)

- [ ] Logo vetorial (SVG) do designer — os PNGs atuais vêm do mockup 3D
- [ ] Engenheiro responsável, CREA-SP, CNPJ, área de atendimento e foto (`fotoEngenheiro`) em `lib/site.ts` (enquanto forem `null`, o site oculta esses campos)
- [ ] Confirmar com o engenheiro: duração "2 a 3 horas" (FAQ), métodos por sistema e prazos da linha do tempo (`lib/content.ts`)
- [x] Imagem de compartilhamento: `app/opengraph-image.png` (fonte em `design/og-image.html`)
- [ ] Fotos reais de vistoria nos achados (`ACHADOS` em `lib/content.ts`)
- [ ] Laudo real anonimizado: fotos no lugar dos desenhos de `laudo-tecnico.svg` e PDF em `laudoExemploPdf` (`lib/site.ts`)
- [ ] Depoimentos reais em `DEPOIMENTOS` (`lib/content.ts`); a seção só aparece com itens
- [ ] `NEXT_PUBLIC_GTM_ID` no `.env` (sem ele nenhum script de análise carrega)
- [ ] Revisão jurídica de `/privacidade` e dos textos novos do FAQ
- [ ] Política de revistoria na última pergunta do FAQ
- [ ] `NEXT_PUBLIC_SITE_URL` com o domínio final
- [ ] Testar num iPhone (Safari) e num Android (Chrome) reais
