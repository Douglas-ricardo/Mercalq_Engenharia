import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Brand } from "@/components/ui/Brand";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Política de privacidade | ${SITE.nome}`,
  description: "Como a Mercalq Engenharia usa os dados enviados pelo formulário de orçamento.",
  alternates: { canonical: "/privacidade" },
};

// PENDENTE: revisão jurídica antes de publicar; preencher CNPJ em lib/site.ts
export default function Privacidade() {
  const controlador = SITE.cnpj ? `${SITE.nome}, CNPJ ${SITE.cnpj}` : SITE.nome;
  return (
    <>
      <header className="mq-header">
        <div className="mq-container mq-header-inner x-legal-bar">
          <Brand href="/" />
          <div className="mq-header-actions">
            <a href="/" className="mq-btn mq-btn-secondary mq-btn-sm">
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              <span className="mq-btn-long">Voltar ao site</span>
              <span className="mq-btn-short">Voltar</span>
            </a>
          </div>
        </div>
      </header>
      <main id="conteudo" data-theme="claro" className="mq-section x-legal-page">
        <div className="mq-container">
          <header className="x-head">
            <p className="x-idx" aria-hidden="true"><b>LGPD</b><span>Seus dados</span></p>
            <h1 className="heading-2 mq-display">Política de <span className="mq-hl">privacidade</span></h1>
            <p className="body x-head-text">
              Esta página explica quais dados o formulário de orçamento recebe, para que eles servem e como pedir
              acesso ou exclusão, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
          </header>
          <div className="x-legal">
            <div className="x-legal-item">
              <h2 className="heading-3">Quem é o responsável</h2>
              <p className="body">{controlador}, que presta o serviço de vistoria técnica de recebimento de imóvel novo.</p>
            </div>
            <div className="x-legal-item">
              <h2 className="heading-3">Quais dados recebemos</h2>
              <p className="body">Os que você preenche no formulário: nome, WhatsApp, tipo de imóvel, metragem e bairro e cidade.
            Só nome, tipo de imóvel e bairro são obrigatórios.</p>
            </div>
            <div className="x-legal-item">
              <h2 className="heading-3">Para que usamos</h2>
              <p className="body">Para preparar e enviar o orçamento da vistoria e combinar a data. Não vendemos nem cedemos seus dados, e
            não os usamos para outra finalidade sem pedir antes. A base legal é a execução de procedimentos
            preliminares a um contrato, a seu pedido (art. 7º, V, da LGPD).</p>
            </div>
            <div className="x-legal-item">
              <h2 className="heading-3">Com quem eles circulam</h2>
              <p className="body">Ao enviar, o formulário abre uma conversa no WhatsApp com a mensagem preenchida; a partir daí a conversa
            também segue a política do WhatsApp. Os dados podem ser registrados no nosso sistema de atendimento para
            acompanhar o orçamento. Se o site usar ferramentas de medição de acesso, elas registram apenas dados de
            navegação, como páginas visitadas e cliques nos botões de contato.</p>
            </div>
            <div className="x-legal-item">
              <h2 className="heading-3">Por quanto tempo</h2>
              <p className="body">Pelo tempo necessário para responder ao orçamento e, se a vistoria for contratada, pelo prazo exigido para
            os registros do serviço e da ART.</p>
            </div>
            <div className="x-legal-item">
              <h2 className="heading-3">Seus direitos</h2>
              <p className="body">Você pode pedir a qualquer momento para ver, corrigir ou apagar seus dados, ou saber com quem foram
            compartilhados. É só escrever para o WhatsApp {SITE.whatsapp}.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer semOrcamento />
    </>
  );
}
