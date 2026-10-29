import { IconWhatsApp, IconInstagram, IconLocal } from "@/components/icons";
import { LOGOS, NAV, SITE } from "@/lib/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { MENSAGENS } from "@/lib/whatsapp";

/** `semOrcamento`: páginas internas (privacidade) não oferecem o link de orçamento. */
export function Footer({ semOrcamento = false }: { semOrcamento?: boolean }) {
  const ano = new Date().getFullYear();
  return (
    <footer className="mq-footer">
      <div className="mq-container mq-footer-grid">
        <div>
          <img src={LOGOS.completo} alt="Mercalq Engenharia" width={160} height={153} className="mq-footer-logo" />
          <p className="body-sm mq-footer-tag">{SITE.assinatura}</p>
        </div>
        <div>
          <h2 className="mq-footer-title">Contato</h2>
          <ul className="mq-footer-list">
            <li>
              <IconWhatsApp width={18} height={18} />
              <WhatsAppLink origem="footer" mensagem={MENSAGENS.footer} className="mono mq-footer-link x-nowrap">{SITE.whatsapp}</WhatsAppLink>
            </li>
            <li>
              <IconInstagram width={18} height={18} />
              <a className="mq-footer-link" href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">{SITE.instagram}</a>
            </li>
            <li>
              <IconLocal width={18} height={18} />
              <span>{SITE.area}</span>
            </li>
          </ul>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="mq-footer-title">Navegação</h2>
          <ul className="mq-footer-list">
            {/* Caminho absoluto: o rodapé também aparece em /privacidade */}
            {NAV.map((n) => <li key={n.href}><a href={`/${n.href}`}>{n.label}</a></li>)}
            {!semOrcamento && <li><a href="/#orcamento">Solicitar orçamento</a></li>}
          </ul>
        </nav>
      </div>
      <div className="mq-container mq-footer-base mono">
        <span>© {ano} {SITE.nome}{SITE.cnpj && ` · CNPJ ${SITE.cnpj}`} · <a className="mq-footer-base-link" href="/privacidade">Privacidade</a></span>
        {(SITE.engenheiro || SITE.crea) && (
          <span>{[SITE.engenheiro, SITE.crea].filter(Boolean).join(" · ")}</span>
        )}
        <span>Desenvolvido por <a className="mq-footer-base-link" href="https://axiondatta.com.br" target="_blank" rel="noopener noreferrer">Axiondatta</a></span>
      </div>
    </footer>
  );
}
