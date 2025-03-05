import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { FunctionComponent, PropsWithChildren } from "react";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travaux Sisters !",
  description: "Travaux Sisters WIP!",
};
const HtmlElement: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export { HtmlElement };
