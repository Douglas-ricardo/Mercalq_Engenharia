import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Findings } from "@/components/sections/Findings";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { InspectionChecklist } from "@/components/sections/InspectionChecklist";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { ReportSection } from "@/components/sections/ReportSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import { InView } from "@/components/ui/InView";
import { FAQ } from "@/lib/content";
import { SITE } from "@/lib/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.nome,
    slogan: SITE.assinatura,
    description: SITE.descricao,
    url: SITE.url,
    telephone: SITE.telefoneE164,
    image: `${SITE.url}/assets/logos/mercalq-logo-completo.png`,
    areaServed: { "@type": "City", name: "São Paulo" },
    address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
    sameAs: [SITE.instagramUrl],
    serviceType: "Vistoria técnica de recebimento de imóvel novo",
    logo: `${SITE.url}/assets/logos/mercalq-logo-completo.png`,
    inLanguage: "pt-BR",
    knowsAbout: ["Vistoria de imóvel novo", "Laudo de vistoria", "ART", "NBR 16747", "NBR 17170"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vistoria de recebimento de apartamento novo" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vistoria de casa e imóvel na planta entregue" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laudo técnico com registro fotográfico e ART" } },
      ],
    },
    ...(SITE.engenheiro ? { employee: { "@type": "Person", name: SITE.engenheiro, jobTitle: "Engenheiro civil" } } : {}),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.nome,
    url: SITE.url,
    inLanguage: "pt-BR",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="mq-skip">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <InspectionChecklist />
        <ReportSection />
        <ProcessSteps />
        <Findings />
        <Testimonials />
        {/* O FAQ vem antes do formulário: as dúvidas que travam a decisão precisam ser respondidas antes dele. */}
        <Faq />
        <About />
        <QuoteForm />
      </main>
      <Footer />
      <WhatsAppFloat />
      <InView />
      {/* Um objeto por tag: leitores de JSON-LD (inclusive extensões do Safari) esperam objeto, não lista */}
      {jsonLd.map((obj) => (
        <script
          key={obj["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
