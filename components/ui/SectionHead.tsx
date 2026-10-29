import type { ReactNode } from "react";

/** Índice da seção (número + rótulo + traço) e título. */
export function SectionHead({
  idx, rotulo, title, children, id,
}: {
  idx?: string; rotulo?: string; title: ReactNode; children?: ReactNode; id?: string;
}) {
  return (
    <header className="x-head">
      {idx && (
        <p className="x-idx" aria-hidden="true">
          <b>{idx}</b>
          {rotulo && <span>{rotulo}</span>}
        </p>
      )}
      <h2 className="heading-2 mq-display" id={id}>{title}</h2>
      {children}
    </header>
  );
}
