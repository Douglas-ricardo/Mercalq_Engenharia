import { LOGOS } from "@/lib/site";

/** Símbolo + nome em texto (header). O logo só existe sobre grafite. */
export function Brand({ href = "#topo" }: { href?: string }) {
  return (
    <a href={href} className="mq-brand" aria-label="Mercalq Engenharia, início">
      <img src={LOGOS.simbolo} alt="" width={37} height={44} className="mq-brand-symbol" />
      <span className="mq-brand-text">
        <span className="mq-brand-name">MERCALQ</span>
        <span className="mq-brand-sub">ENGENHARIA</span>
      </span>
    </a>
  );
}
