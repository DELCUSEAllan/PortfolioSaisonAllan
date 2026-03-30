"use client";

import React from "react";
import Image from "next/image";
import BarreNavigation from "./components/BarreNavigation";
import EnTeteAccueil from "./components/EnTeteAccueil";
import { SAISONS } from "./config/couleursSaisons";
import { determinerSaisonParDate } from "./utils/saisons";
import styles from "./page.module.css";
import EtiquettesTechnos from "./components/EtiquettesTechnos";
import BoutonPrincipal from "./components/BoutonPrincipal";
import BoutonAction from "./components/BoutonAction";
import CanvasSakura from "./components/CanvasSakura";
import CanvasEte from "./components/CanvasEte";
import { useSaison } from "./context/SaisonContext";
import dynamic from "next/dynamic";
import CanvasAutomne from "./components/CanvasAutomne";
import Head from "next/head";

const saisonAutoParDate = determinerSaisonParDate(new Date());

const SectionPresentation = dynamic(
  () => import("./components/SectionPresentation"),
  { ssr: false }
);

export default function Accueil() {
  const { saisonSelectionnee, setSaisonSelectionnee, saisonActuelle } = useSaison();
  const saison = SAISONS[saisonActuelle];

  const background = saisonActuelle === "ete"
    ? "linear-gradient(180deg, #3A9BD5 0%, #F2C46D 30%, #FDF6EC 65%, #F4845F 100%)"
    : `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`;

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
      />
    </>
  );
}
