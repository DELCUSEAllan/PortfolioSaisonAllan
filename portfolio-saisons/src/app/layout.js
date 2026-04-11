import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PropTypes from "prop-types";
import { SaisonProvider } from "./context/SaisonContext";

// Validation des props : children doit être un nœud React
RootLayout.propTypes = {
  children: PropTypes.node,
};

// Chargement des polices Google Fonts avec Next.js
// variable → crée une variable CSS utilisable dans tout le projet
// subsets → on ne charge que les caractères latins pour réduire le poids
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Métadonnées de la page affichées dans l'onglet du navigateur et sur Google
export const metadata = {
  title: "Allan Delcuse · Portfolio",
  description: "Portfolio de Allan Delcuse, étudiant en Bachelor Développement Informatique au CESI Arras. Spécialisé en développement web.",
  keywords: ["portfolio", "développeur web", "CESI Arras", "React", "Next.js"],
};

// Composant racine qui enveloppe toutes les pages de l'application
// children → le contenu de la page actuellement affichée
export default function RootLayout({ children }) {
  return (
     <html lang="fr" suppressHydrationWarning>
     <head>
        <link rel="preload" as="image" href="/arbre-sakura.png"/>
        <link rel="preload" as="image" href="/arbre-automne.webp"/>
        <link rel="preload" as="image" href="/nuages.webp"/>
    </head>
    <body suppressHydrationWarning>
    <SaisonProvider>
        {children}
        </SaisonProvider>
    </body>
    </html>
);
}
