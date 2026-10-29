"use client";

import { useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { enviarOrcamento } from "@/app/orcamento/actions";
import { IconWhatsApp } from "@/components/icons";
import { SectionHead } from "@/components/ui/SectionHead";
import { trackWhatsApp } from "@/lib/analytics";
import { TIPOS_IMOVEL } from "@/lib/content";
import { SITE } from "@/lib/site";
import { mensagemOrcamento, waLink, type Lead } from "@/lib/whatsapp";

/** Até 4 dígitos e uma casa decimal; corta no primeiro caractere inválido. */
const mascaraM2 = (v: string) => v.replace(".", ",").match(/^\d{0,4}(,\d?)?/)?.[0] ?? "";

const VAZIO: Lead = { nome: "", tel: "", tipo: "", m2: "", local: "" };

/** Campos obrigatórios, na ordem do formulário (o primeiro faltante recebe o foco). */
const OBRIGATORIOS = [
  { k: "nome", id: "f-nome", erro: "Informe seu nome." },
  { k: "tipo", id: "f-tipo", erro: "Selecione o tipo de imóvel." },
  { k: "local", id: "f-local", erro: "Informe o bairro e a cidade." },
] as const;

type Erros = Partial<Record<keyof Lead, string>>;

/**
 * Desktop: abre a aba ainda dentro do clique, porque depois do `await` da Server Action o navegador
 * bloqueia o pop-up (Safari sempre). No celular devolve null e a mesma aba abre o app.
 */
function reservarAba(): Window | null {
  if (window.matchMedia("(pointer: coarse)").matches) return null;
  return window.open("", "_blank");
}

function abrirWhatsApp(aba: Window | null, url: string) {
  if (aba && !aba.closed) {
    aba.opener = null;
    aba.location.href = url;
  } else {
    window.location.href = url;
  }
}

/** Máscara (11) 90000-0000 */
function mascaraTel(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function QuoteForm() {
  const [lead, setLead] = useState<Lead>(VAZIO);
  const [erros, setErros] = useState<Erros>({});
  /** Link da conversa aberta, para o caso de o WhatsApp não abrir ou o visitante fechar a aba. */
  const [enviado, setEnviado] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const set = (k: keyof Lead) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setLead((l) => ({ ...l, [k]: k === "tel" ? mascaraTel(v) : k === "m2" ? mascaraM2(v) : v }));
    if (erros[k] && e.target.value.trim()) setErros(({ [k]: _, ...resto }) => resto);
  };

  /** Props de acessibilidade e mensagem de erro de um campo obrigatório. */
  const erroDe = (k: keyof Lead, id: string) => ({
    input: { "aria-invalid": erros[k] ? true : undefined, "aria-describedby": erros[k] ? `${id}-erro` : undefined },
    msg: erros[k] && <p id={`${id}-erro`} className="mq-field-error" role="alert">{erros[k]}</p>,
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (pending) return;
    const faltando = OBRIGATORIOS.filter((c) => !String(lead[c.k] ?? "").trim());
    if (faltando.length) {
      setErros(Object.fromEntries(faltando.map((c) => [c.k, c.erro])));
      document.getElementById(faltando[0].id)?.focus();
      return;
    }
    setErros({});
    trackWhatsApp("form");
    const aba = reservarAba();
    startTransition(async () => {
      let url: string;
      try {
        url = await enviarOrcamento(lead);
      } catch {
        url = waLink(mensagemOrcamento(lead));
      }
      abrirWhatsApp(aba, url);
      setEnviado(url);
    });
  }

  return (
    <section id="orcamento" className="mq-section x-orc" aria-labelledby="orcamento-title">
      <div className="mq-container x-split x-split-form">
        <div className="x-split-aside">
          <SectionHead idx="07" rotulo="Orçamento" id="orcamento-title"
                       title={<>Peça seu <span className="mq-hl">orçamento.</span></>}>
            <p className="body x-head-text">
              Conte sobre o imóvel e respondemos pelo WhatsApp com valor e disponibilidade. O formulário abre a
              conversa já preenchida; é só tocar em enviar.
            </p>
            <ul className="x-orc-facts">
              <li>Laudo com ART em toda vistoria</li>
              <li>{SITE.area}</li>
            </ul>
          </SectionHead>
        </div>

        <form className="mq-form" onSubmit={onSubmit} noValidate>
          <p className="body-sm mq-form-req">Campos com * são obrigatórios.</p>
          <div className="mq-form-grid">
            <div className="mq-field">
              <label htmlFor="f-nome">Nome <span aria-hidden="true">*</span></label>
              <input id="f-nome" name="nome" type="text" autoComplete="name" required enterKeyHint="next"
                     value={lead.nome} onChange={set("nome")} {...erroDe("nome", "f-nome").input} />
              {erroDe("nome", "f-nome").msg}
            </div>
            <div className="mq-field">
              <label htmlFor="f-tel">WhatsApp</label>
              <input id="f-tel" name="tel" type="tel" inputMode="numeric" autoComplete="tel-national" enterKeyHint="next"
                     placeholder="(11) 90000-0000" value={lead.tel} onChange={set("tel")} />
            </div>
            <div className="mq-field">
              <label htmlFor="f-tipo">Tipo de imóvel <span aria-hidden="true">*</span></label>
              <select id="f-tipo" name="tipo" required value={lead.tipo} onChange={set("tipo")}
                      {...erroDe("tipo", "f-tipo").input}>
                <option value="" disabled>Selecione</option>
                {TIPOS_IMOVEL.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {erroDe("tipo", "f-tipo").msg}
            </div>
            <div className="mq-field">
              <label htmlFor="f-m2">Metragem <span className="x-opt">opcional</span></label>
              <div className="x-unit">
                <input id="f-m2" name="m2" type="text" inputMode="decimal" maxLength={6}
                       enterKeyHint="next" placeholder="Ex.: 68" value={lead.m2} onChange={set("m2")} />
                <span aria-hidden="true">m²</span>
              </div>
            </div>
            <div className="mq-field mq-field-full">
              <label htmlFor="f-local">Bairro e cidade <span aria-hidden="true">*</span></label>
              <input id="f-local" name="local" type="text" autoComplete="address-level2" required
                     enterKeyHint="send"
                     placeholder="Ex.: Vila Mariana, São Paulo" value={lead.local} onChange={set("local")}
                     {...erroDe("local", "f-local").input} />
              {erroDe("local", "f-local").msg}
            </div>
          </div>

          <button
            type="submit"
            className="mq-btn mq-btn-primary mq-btn-lg mq-btn-block"
            aria-disabled={pending || undefined}
          >
            <IconWhatsApp width={20} height={20} />
            {pending ? "Abrindo o WhatsApp…" : "Enviar pelo WhatsApp"}
          </button>
          <p className="body-sm mq-form-sent" role="status">
            {enviado && !pending && (
              <>
                Abrimos a conversa no WhatsApp com os seus dados; é só tocar em enviar.{" "}
                <a href={enviado} target="_blank" rel="noopener noreferrer">Não abriu? Abrir de novo</a>
              </>
            )}
          </p>
          <p className="body-sm mq-form-note">
            Seus dados são usados apenas para responder esta solicitação. <a href="/privacidade">Política de privacidade</a>
          </p>
        </form>
      </div>
    </section>
  );
}
