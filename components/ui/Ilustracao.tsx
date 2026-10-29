import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  /** Versão com rótulos maiores para telas estreitas (por padrão, `<nome>-m.svg`). */
  mobile?: { src: string; width: number; height: number };
};

/**
 * Ilustração técnica: onde ela aparece estreita (celular e desktop em 2 colunas até 1279px)
 * troca pela versão `-m`, com cotas legíveis.
 */
export function Ilustracao({ src, mobile, ...img }: Props) {
  const m = mobile ?? { src: src.replace(/\.svg$/, "-m.svg"), width: 1200, height: 800 };
  return (
    <picture>
      <source media="(max-width: 40em), (min-width: 60.0625em) and (max-width: 79.9375em)" srcSet={m.src} width={m.width} height={m.height} />
      <img src={src} width={1200} height={800} {...img} />
    </picture>
  );
}
