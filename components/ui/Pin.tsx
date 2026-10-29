export function Pin({ n, className = "" }: { n: number; className?: string }) {
  return <span className={`mq-pin ${className}`} aria-hidden="true">{n}</span>;
}
