import type { SVGProps } from "react";

/**
 * Ícones da Mercalq: 24×24, traço 1.75, tinta via currentColor
 * (no design system a cor padrão é `laranja`, aplicada pelo CSS do contexto).
 */
type IconProps = SVGProps<SVGSVGElement>;

const Base = ({ children, ...p }: IconProps) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.75}
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...p}>
    {children}
  </svg>
);

export const IconConversa = (p: IconProps) => (
  <Base {...p}><path d="M4 18.5V5h16v11H8z" /><path d="M8 9.5h8M8 12.5h5" /></Base>
);

/** Logo oficial do WhatsApp (preenchido), usado em todos os CTAs de WhatsApp e no botão flutuante. */
export const IconWhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export const IconVistoria =(p: IconProps) => (
  <Base {...p}><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /><path d="M8 10.5l2 2 3.5-4" /></Base>
);

export const IconLaudo = (p: IconProps) => (
  <Base {...p}><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M9 11h7M9 14.5h7M9 18h4" /></Base>
);

export const IconRegistroFotografico = (p: IconProps) => (
  <Base {...p}><path d="M3 8h4l1.5-2.5h7L17 8h4v11H3z" /><circle cx="12" cy="13.5" r="3.5" /></Base>
);

export const IconEletrica = (p: IconProps) => (
  <Base {...p}><path d="M13 3L6 13.5h5L10 21l7-10.5h-5z" /></Base>
);

export const IconHidraulica = (p: IconProps) => (
  <Base {...p}><path d="M12 3.5c3.5 4.4 5.5 7.6 5.5 10.2a5.5 5.5 0 0 1-11 0c0-2.6 2-5.8 5.5-10.2z" /><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" /></Base>
);

export const IconEsquadria = (p: IconProps) => (
  <Base {...p}><path d="M4 3h16v18H4z" /><path d="M12 3v18M4 12h16" /></Base>
);

export const IconPiso = (p: IconProps) => (
  <Base {...p}><path d="M3 19L7 5h10l4 14z" /><path d="M5 12h14M10 5l-1.2 14M14 5l1.2 14" /></Base>
);

export const IconParede = (p: IconProps) => (
  <Base {...p}><path d="M3 5h18v14H3z" /><path d="M3 9.5h18M3 14h18M9 5v4.5M15 5v4.5M6 9.5V14M12 9.5V14M18 9.5V14M9 14v5M15 14v5" /></Base>
);

export const IconConformidade = (p: IconProps) => (
  <Base {...p}><path d="M12 3l7.5 3v6c0 4.5-3.2 7.8-7.5 9-4.3-1.2-7.5-4.5-7.5-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></Base>
);

export const IconMedicao = (p: IconProps) => (
  <Base {...p}><path d="M2.5 15.5L15.5 2.5l6 6-13 13z" /><path d="M6.5 11.5l2 2M9.5 8.5l2 2M12.5 5.5l2 2" /></Base>
);

export const IconChaves = (p: IconProps) => (
  <Base {...p}><circle cx="8" cy="15" r="4.5" /><path d="M11.2 11.8L20 3M16.5 6.5l2.5 2.5M14 9l2 2" /></Base>
);

export const IconAgenda = (p: IconProps) => (
  <Base {...p}><path d="M4 5h16v15H4z" /><path d="M4 10h16M8.5 3v4M15.5 3v4" /><path d="M8 14h3" /></Base>
);

export const IconAlerta = (p: IconProps) => (
  <Base {...p}><path d="M12 3.5L21.5 20h-19z" /><path d="M12 10v4.5M12 17.25v.01" /></Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Base>
);

export const IconX = (p: IconProps) => (
  <Base {...p}><path d="M6 6l12 12M18 6L6 18" /></Base>
);

export const IconSeta = (p: IconProps) => (
  <Base {...p}><path d="M4 12h15M13 6l6 6-6 6" /></Base>
);

export const IconInstagram = (p: IconProps) => (
  <Base {...p}><path d="M4 4h16v16H4z" /><circle cx="12" cy="12" r="3.75" /><path d="M16.75 7.25v.01" /></Base>
);

export const IconLocal = (p: IconProps) => (
  <Base {...p}><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.25" /></Base>
);

export const ICONS = {
  vistoria: IconVistoria,
  laudo: IconLaudo,
  "registro-fotografico": IconRegistroFotografico,
  eletrica: IconEletrica,
  hidraulica: IconHidraulica,
  esquadria: IconEsquadria,
  piso: IconPiso,
  parede: IconParede,
  conformidade: IconConformidade,
  medicao: IconMedicao,
  chaves: IconChaves,
  agenda: IconAgenda,
  conversa: IconConversa,
  alerta: IconAlerta,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...p }: IconProps & { name: IconName }) {
  const C = ICONS[name];
  return <C {...p} />;
}
