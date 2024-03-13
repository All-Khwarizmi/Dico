import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dico",
  description:
    "Dictionnaire Espagnol - Français limitant les requêtes à un mot à la fois afin d'éduquer les utilisateurs à l'utilisation d'un dictionnaire en ligne.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

      <body>{children}</body>
    </html>
  );
}
