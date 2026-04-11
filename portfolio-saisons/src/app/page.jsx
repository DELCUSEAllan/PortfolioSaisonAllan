// Ce composant s'exécute côté navigateur car il utilise useSaison()
"use client";

import React from "react";
import Image from "next/image";
import CanvasHiver from "./components/CanvasHiver";
import EnTeteAccueil from "./components/EnTeteAccueil";
import { SAISONS } from "./config/couleursSaisons";
import styles from "./page.module.css";
import EtiquettesTechnos from "./components/EtiquettesTechnos";
import BoutonPrincipal from "./components/BoutonPrincipal";
import { useSaison } from "./context/SaisonContext";
import dynamic from "next/dynamic";

// Chargements côté navigateur pour optimiser les performances, canvas et composants lourds ne bloquent pas le chargement initial de la page
const CanvasSakura = dynamic(() => import("./components/CanvasSakura"), { ssr: false });
const CanvasAutomne = dynamic(() => import("./components/CanvasAutomne"), { ssr: false });
const CanvasEte = dynamic(() => import("./components/CanvasEte"), { ssr: false });
const BarreNavigation = dynamic(() => import("./components/BarreNavigation"), { ssr: false });
const BoutonAction = dynamic(() => import("./components/BoutonAction"), { ssr: false });

// loading: () => null évite un flash visuel pendant le chargement du canvas nuit
const CanvasNuit = dynamic(() => import("./components/CanvasNuit"), {
  ssr: false,
  loading: () => null,
});

// SectionPresentation est en dynamic car contient une animation de machine à écrire
const SectionPresentation = dynamic(() => import("./components/SectionPresentation"),
  { ssr: false }
);

// Calcule le dégradé de fond selon la saison active, été et nuit = dégradés fixes, les autres saisons = couleurs dynamiques
function calculerBackground(saisonActuelle, saison) {
  if (saisonActuelle === "ete") {
    return "linear-gradient(180deg, #3A9BD5 0%, #F2C46D 30%, #FDF6EC 65%, #F4845F 100%)";
  }
  if (saisonActuelle === "nuit") {
    return "linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%)";
  }
  return `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`;
}

export default function Accueil() {
  // Récupère saison sélectionnée, la fonction pour la changer, et la saison affichée
  const { saisonSelectionnee, setSaisonSelectionnee, saisonActuelle } = useSaison();
  // Récupère l'objet complet des couleurs pour la saison active
  const saison = SAISONS[saisonActuelle];
  // Calcule le dégradé de fond
  const background = calculerBackground(saisonActuelle, saison);

  return (
    <>
      <main
        className={styles.accueil}
        style={{
          background,
          color: saison.textePrincipal,
          position: "relative", // nécessaire pour que les canvas en position absolute se positionnent correctement
        }}
      >
        {/* Animation printemps : arbre sakura en fond + pétales tombant */}
        {saisonActuelle === "printemps" && (
          <>
            <Image
              src="/arbre-sakura.png"
              alt=""
              width={280}
              height={400}
              className="sakura-arbre"
              priority // chargée en priorité car visible immédiatement
            />
            <CanvasSakura />
          </>
        )}

        {/* Animation été : soleil animé avec rayons */}
        {saisonActuelle === "ete" && <CanvasEte />}

        {/* Animation automne : branche en fond + feuilles qui tombent */}
        {saisonActuelle === "automne" && (
          <>
            <Image
              src="/arbre-automne.webp"
              alt=""
              width={200}
              height={200}
              style={{ width: "auto" }} // conserve le ratio de l'image
              className="sakura-arbre"
              priority
              quality={75}
            />
            <CanvasAutomne />
          </>
        )}

        {/* Animation hiver : nuages qui dérivent + flocons tombants */}
        {saisonActuelle === "hiver" && <CanvasHiver />}

        {/* Animation nuit : étoiles scintillantes */}
        {saisonActuelle === "nuit" && <CanvasNuit />}

        {/* Contenu principal de la page */}
        <div className={styles.contenu}>
          {/* En-tête avec avatar, nom et sélecteur de saison */}
          <EnTeteAccueil
            valeurSaison={saisonSelectionnee}
            onChangeSaison={setSaisonSelectionnee}
            saisonActuelle={saisonActuelle}
          />

          {/* Texte de présentation avec effet machine à écrire */}
          <SectionPresentation saisonActuelle={saisonActuelle} />

          {/* Badges des technologies maîtrisées */}
          <EtiquettesTechnos saisonActuelle={saisonActuelle} />

          {/* Bouton qui redirige vers la page projets */}
          <BoutonPrincipal
            texte="Voir mes projets"
            couleurFond={saison.boutonPrincipalFond}
            couleurTexte={saison.boutonPrincipalTexte}
          />
        </div>
      </main>

      {/* Bouton flottant d'action rapide en bas à droite */}
      <BoutonAction
        couleurFond={saison.boutonPrincipalFond}
        couleurTexte={saison.boutonPrincipalTexte}
      />

      {/* Barre de navigation avec couleurs dynamiques selon la saison */}
      <BarreNavigation
        couleurActive={saison.boutonPrincipalFond}
        couleurTexte={saison.texteSecondaire}
        saisonActuelle={saisonActuelle}
      />
    </>
  );
}
