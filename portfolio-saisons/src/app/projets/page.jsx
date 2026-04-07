"use client";

import BarreNavigation from "../components/BarreNavigation";
import CarteProjet from "../components/CarteProjet";
import { SAISONS } from "../config/couleursSaisons";
import { PROJETS } from "../config/projets";
import { useSaison } from "../context/SaisonContext";
import "../styles/projets/projets.css";

function calculerBackground(saisonActuelle, saison) {
  if (saisonActuelle === "nuit") {
    return "linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%)";
  }
  return `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`;
}

export default function Projets() {
  const { saisonActuelle } = useSaison();
  const saison = SAISONS[saisonActuelle];
  const background = calculerBackground(saisonActuelle, saison);

  return (
    <>
      <main
        className="projets-page"
        style={{
          background,
          color: saison.textePrincipal,
        }}
      >
        <div className="projets-contenu">
          <h1 className="projets-titre">Mes Projets</h1>
          <p className="projets-intro">
            Voici les projets sur lesquels je travaille ou ai travaillé au fil de ma formation.
          </p>

          <div className="projets-grille">
            {PROJETS.map((projet, index) => (
              <CarteProjet
                key={projet.id}
                projet={projet}
                index={index}
                couleurPrincipal={saison.boutonPrincipalFond}
                couleurTexte={saison.boutonPrincipalTexte}
                saisonActuelle={saisonActuelle}
              />
            ))}
          </div>
        </div>
      </main>

      <BarreNavigation
        couleurActive={saison.boutonPrincipalFond}
        couleurTexte={saison.texteSecondaire}
        saisonActuelle={saisonActuelle}
        />
    </>
  );
}
