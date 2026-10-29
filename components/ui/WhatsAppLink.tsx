"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackWhatsApp } from "@/lib/analytics";
import { waLink, type OrigemWhatsApp } from "@/lib/whatsapp";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  origem: OrigemWhatsApp;
  mensagem: string;
  children: ReactNode;
};

/** Link para o WhatsApp com mensagem pré-preenchida e evento `cta_whatsapp`. */
export function WhatsAppLink({ origem, mensagem, children, onClick, ...rest }: Props) {
  return (
    <a
      href={waLink(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => { trackWhatsApp(origem); onClick?.(e); }}
      {...rest}
    >
      {children}
    </a>
  );
}
