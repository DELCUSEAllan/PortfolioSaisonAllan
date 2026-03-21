"use client";

import React from "react";

import BarreNavigation from "./components/BarreNavigation";
import EnTeteAccueil from "./components/EnTeteAccueil";
import { SAISONS } from "./config/couleursSaisons";
import { determinerSaisonParDate } from "./utils/saisons";
import styles from "./page.module.css";
import EtiquettesTechnos from "./components/EtiquettesTechnos";
import BoutonPrincipal from "./components/BoutonPrincipal";
import SelectionSaison from "./components/SelectionSaison";
import BoutonAction from "./components/BoutonAction";
import SectionPresentation from "./components/SectionPresentation";


const saisonAutoParDate = determinerSaisonParDate(new Date());

export default function Accueil() {
    const [saisonSelectionnee, setSaisonSelectionnee] = React.useState("auto");
    const saisonActuelle = saisonSelectionnee === "auto" ? saisonAutoParDate : saisonSelectionnee;
    const saison = SAISONS[saisonActuelle];

  return (
    <>
        <main
            className={styles.accueil}
            style={{
                background: `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`,
            }}
        >


        <div className={styles.contenu}>
          <EnTeteAccueil valeurSaison={saisonSelectionnee} onChangeSaison={setSaisonSelectionnee} />

          <SectionPresentation />

          <EtiquettesTechnos />

          <BoutonPrincipal texte="Voir mes projets" />

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
