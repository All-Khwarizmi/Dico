import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { ReactQueryClientProvider } from "@/components/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Dico | Dictionnaire Espagnol - Français en ligne",
  description:
    "Dico limite les requêtes à un mot à la fois afin d'éduquer les utilisateurs à l'utilisation d'un dictionnaire en ligne.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="fr">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

        <body>{children}</body>
        <Analytics />
      </html>
    </ReactQueryClientProvider>
  );
}
