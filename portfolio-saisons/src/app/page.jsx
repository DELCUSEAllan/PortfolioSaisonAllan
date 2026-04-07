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

const CanvasSakura = dynamic(() => import("./components/CanvasSakura"), { ssr: false });
const CanvasAutomne = dynamic(() => import("./components/CanvasAutomne"), { ssr: false });
const CanvasEte = dynamic(() => import("./components/CanvasEte"), { ssr: false });
const BarreNavigation = dynamic(() => import("./components/BarreNavigation"), { ssr: false });
const BoutonAction = dynamic(() => import("./components/BoutonAction"), { ssr: false });
const CanvasNuit = dynamic(() => import("./components/CanvasNuit"), {
  ssr: false,
  loading: () => null,
});

const SectionPresentation = dynamic(
  () => import("./components/SectionPresentation"),
  { ssr: false }
);

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
  const { saisonSelectionnee, setSaisonSelectionnee, saisonActuelle } = useSaison();
  const saison = SAISONS[saisonActuelle];
  const background = calculerBackground(saisonActuelle, saison);

  return (
    <>
      <main
        className={styles.accueil}
        style={{
          background,
          color: saison.textePrincipal,
          position: "relative",
        }}
      >
        {saisonActuelle === "printemps" && (
          <>
            <Image
              src="/arbre-sakura.png"
              alt=""
              width={280}
              height={400}
              className="sakura-arbre"
              priority
            />
            <CanvasSakura />
          </>
        )}

        {saisonActuelle === "ete" && <CanvasEte />}

        {saisonActuelle === "automne" && (
          <>
            <Image
              src="/arbre-automne.webp"
              alt=""
              width={200}
              height={200}
              style={{ width: "auto" }}
              className="sakura-arbre"
              priority
              quality={75}
            />
            <CanvasAutomne />
          </>
        )}

        {saisonActuelle === "hiver" && <CanvasHiver />}

        {saisonActuelle === "nuit" && <CanvasNuit />}

        <div className={styles.contenu}>
          <EnTeteAccueil
            valeurSaison={saisonSelectionnee}
            onChangeSaison={setSaisonSelectionnee}
            saisonActuelle={saisonActuelle}
          />

          <SectionPresentation saisonActuelle={saisonActuelle} />

          <EtiquettesTechnos saisonActuelle={saisonActuelle} />

          <BoutonPrincipal
            texte="Voir mes projets"
            couleurFond={saison.boutonPrincipalFond}
            couleurTexte={saison.boutonPrincipalTexte}
          />
        </div>
      </main>

      <BoutonAction
        couleurFond={saison.boutonPrincipalFond}
        couleurTexte={saison.boutonPrincipalTexte}
      />

      <BarreNavigation
        couleurActive={saison.boutonPrincipalFond}
        couleurTexte={saison.texteSecondaire}
        saisonActuelle={saisonActuelle}
        />
    </>
  );
}
