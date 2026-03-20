"use client";

import BarreNavigation from "../components/BarreNavigation";
import { SAISONS } from "../config/couleursSaisons";
import { determinerSaisonParDate } from "../utils/saisons";

const saisonAutoParDate = determinerSaisonParDate(new Date());

export default function Accueil() {
  // pour l’instant, on reste 100 % en mode automatique
  const saisonActuelle = saisonAutoParDate;
  const saison = SAISONS[saisonActuelle];

  return (
    <>
      <main
        style={{
          paddingBottom: "60px",
          minHeight: "100vh",
          backgroundColor: saison.fondPage,
          color: saison.textePrincipal,
        }}
      >
        <h1>Accueil</h1>
        <p>Saison actuelle (auto) : {saison.nom}</p>
      </main>

      <BarreNavigation />
    </>
  );
}
