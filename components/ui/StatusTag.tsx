import { IconAlerta, IconCheck, IconX } from "@/components/icons";
import { STATUS_LABEL, type Status } from "@/lib/content";

const ICON = { ok: IconCheck, nc: IconX, at: IconAlerta } as const;

/** Status sempre com palavra + ícone, nunca só cor. */
export function StatusTag({ status, className = "", style }: { status: Status; className?: string; style?: React.CSSProperties }) {
  const I = ICON[status];
  return (
    <span className={`mq-tag mq-tag-${status} ${className}`} style={style}>
      <I width={14} height={14} strokeWidth={2.25} />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function NeutralTag({ children }: { children: React.ReactNode }) {
  return <span className="mq-tag mq-tag-neutral">{children}</span>;
}
