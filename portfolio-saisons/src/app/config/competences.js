// src/app/config/competences.js

// Petit texte d'introduction affiché sur la page compétences
export const INTRO_COMPETENCES =
  "Voici les **technologies** que j'ai pu **apprendre** et **pratiquer** au fil de mes **projets** et de ma **formation**.";

// Liste des compétences affichées sur la page
export const COMPETENCES = [
  {
    id: "java", // identifiant utilisé dans le code
    nom: "Java",
    niveau: "apprentissage",
    appris: [
      "Programmation orientée objet",
      "Utilisation de Docker",
      "Création et consommation d'API REST",
    ],
  },
  {
    id: "go",
    nom: "Go",
    niveau: "alaise",
    appris: [
      "Langage que j'utilise le mieux",
      "Développement de projets complets",
      "Liaison avec bases de données",
      "Création d'interfaces graphiques avec Fyne",
    ],
  },
  {
    id: "csharp",
    nom: "C#",
    niveau: "notions",
    appris: [
      "Programmation orientée objet",
      "Interfaces graphiques WinForm",
    ],
  },
  {
    id: "sql",
    nom: "SQL",
    niveau: "alaise",
    appris: [
      "Conception de bases de données",
      "Requêtes complexes",
      "Utilisé dans plusieurs projets",
    ],
  },
  {
    id: "git",
    nom: "Git",
    niveau: "alaise",
    appris: [
      "Gestion de versions",
      "Maintien de repos propres",
      "Utilisé quotidiennement",
    ],
  },
  {
    id: "react",
    nom: "React",
    niveau: "notions",
    appris: [
      "Composants et props",
      "Hooks (useState, useEffect)",
      "Autoapprentissage",
    ],
  },
  {
    id: "nextjs",
    nom: "Next.js",
    niveau: "notions",
    appris: [
      "App Router",
      "SEO avec métadonnées",
      "Découvert via ce portfolio",
    ],
  },
  {
    id: "html",
    nom: "HTML",
    niveau: "apprentissage",
    appris: [
      "Balises sémantiques",
      "Structure de pages web",
      "Accessible et propre",
    ],
  },
  {
    id: "css",
    nom: "CSS",
    niveau: "apprentissage",
    appris: [
      "Flexbox et Grid",
      "CSS Modules",
      "Animations et transitions",
    ],
  },
];

// Informations liées à chaque niveau
// Ça permet d'afficher un texte et des couleurs selon le niveau choisi
export const NIVEAUX = {
  alaise: {
    label: "À l'aise",
    couleur: "#A2D39C",
    texte: "#000000",
  },
  apprentissage: {
    label: "En apprentissage",
    couleur: "#F2C46D",
    texte: "#000000",
  },
  notions: {
    label: "Notions",
    couleur: "#F5D7E3",
    texte: "#000000",
  },
};
