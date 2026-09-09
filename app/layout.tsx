import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://debora-lima-santos.deblslima3.chatgpt.site"),
  title: "Débora Lima Santos | Biodiversidade no Antropoceno",
  description:
    "Site profissional da Dra. Débora Lima Santos, bióloga e ecóloga que conecta pesquisa sobre biodiversidade no Antropoceno a soluções em conservação, restauração e comunicação científica.",
  authors: [{ name: "Débora Lima Santos" }],
  creator: "Débora Lima Santos",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    title: "Débora Lima Santos | Biodiversidade no Antropoceno",
    description:
      "Uma trajetória multidisciplinar que transforma evidências sobre biodiversidade no Antropoceno em conservação, restauração e comunicação científica.",
    siteName: "Débora Lima Santos",
    images: [
      {
        url: "/debora-lima-santos.jpg",
        alt: "Dra. Débora Lima Santos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Débora Lima Santos | Biodiversidade no Antropoceno",
    description:
      "Uma trajetória multidisciplinar que transforma evidências sobre biodiversidade no Antropoceno em conservação, restauração e comunicação científica.",
    images: ["/debora-lima-santos.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Débora Lima Santos",
    "bióloga",
    "ecologia",
    "conservação",
    "biodiversidade",
    "restauração ambiental",
    "sensoriamento remoto",
    "compensação ambiental",
    "bioindicadores",
    "Scarabaeinae",
    "modelagem de distribuição de espécies",
    "mudanças globais",
    "Biodiversidade no Antropoceno",
    "entomologia",
    "ecologia de comunidades",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
