import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Michroma } from "next/font/google";
import Script from "next/script";
import { ScrollManager } from "@/components/ui/ScrollManager";
import { SITE } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const michroma = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-michroma", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/** Durante a validação com o cliente: NEXT_PUBLIC_NOINDEX=1 impede a indexação (meta e robots.txt). */
const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.titulo,
  description: SITE.descricao,
  alternates: { canonical: "/" },
  robots: NOINDEX
    ? { index: false, follow: false }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Código do Search Console (método "tag HTML"); só entra quando a variável existe
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE.nome,
    title: SITE.titulo,
    description: SITE.descricao,
  },
  // A imagem vem de app/opengraph-image.png e app/twitter-image.png (convenção de arquivos do Next).
  twitter: { card: "summary_large_image", title: SITE.titulo, description: SITE.descricao },
};

export const viewport: Viewport = {
  themeColor: "#312d2a",
  width: "device-width",
  initialScale: 1,
};

/** GTM só com ID válido: o valor vai para dentro de um script inline. */
const GTM_ID = /^GTM-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GTM_ID ?? "") ? process.env.NEXT_PUBLIC_GTM_ID : null;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="grafite" className={`${archivo.variable} ${michroma.variable} ${plexMono.variable}`}>
      <body>
        <ScrollManager />
        {children}
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </body>
    </html>
  );
}
