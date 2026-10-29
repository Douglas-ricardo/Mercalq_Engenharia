import { Brand } from "@/components/ui/Brand";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { SectionSpy } from "@/components/ui/SectionSpy";
import { NAV } from "@/lib/site";

export function Header() {
  return (
    <header className="mq-header">
      <div className="mq-container mq-header-inner">
        <Brand />
        <nav aria-label="Seções" className="mq-nav">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="mq-header-actions">
          <a href="#orcamento" className="mq-btn mq-btn-primary mq-btn-sm">
            <span className="mq-btn-long">Solicitar orçamento</span>
            <span className="mq-btn-short">Orçamento</span>
          </a>
          <MobileMenu />
        </div>
      </div>
      <SectionSpy />
    </header>
  );
}
