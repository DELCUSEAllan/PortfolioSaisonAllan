import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PropTypes from "prop-types";
import { SaisonProvider } from "./context/SaisonContext";

RootLayout.propTypes = {
  children: PropTypes.node,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Allan Delcuse · Portfolio",
  description: "Portfolio de Allan Delcuse, étudiant en Bachelor Développement Informatique au CESI Arras. Spécialisé en développement web.",
  keywords: ["portfolio", "développeur web", "CESI Arras", "React", "Next.js"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/arbre-sakura.png"/>
      </head>
      <body suppressHydrationWarning>
        <SaisonProvider>
          {children}
        </SaisonProvider>
      </body>
    </html>
  );
}
