"use client";


import BarreNavigation from "./components/BarreNavigation";
import EnTeteAccueil from "./components/EnTeteAccueil";
import { SAISONS } from "./config/couleursSaisons";
import { determinerSaisonParDate } from "./utils/saisons";
import styles from "./page.module.css";
import CarteSaison from "./components/CarteSaison";
import EtiquettesTechnos from "./components/EtiquettesTechnos";
import BoutonPrincipal from "./components/BoutonPrincipal";


const saisonAutoParDate = determinerSaisonParDate(new Date());

export default function Accueil() {
  const saisonActuelle = saisonAutoParDate;
  const saison = SAISONS[saisonActuelle];

  return (
    <>
            <main
        className={styles.accueil}
        style={{
          backgroundColor: saison.fondPage,
          color: saison.textePrincipal,
        }}
      >
        <div className={styles.contenu}>
          <EnTeteAccueil />

          <CarteSaison nomSaison={saison.nom} />

        <EtiquettesTechnos />

        <BoutonPrincipal texte="Voir mes projets" />

        <p>Saison actuelle (auto) : {saison.nom}</p>

        </div>
      </main>

      <BarreNavigation />
    </>
  );
}
