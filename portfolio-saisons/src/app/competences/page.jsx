"use client";

import BarreNavigation from "../components/BarreNavigation";
import VignetteCompetence from "../components/VignetteCompetence";
import TexteFormate from "../components/TexteFormat";
import { SAISONS } from "../config/couleursSaisons";
import { COMPETENCES, INTRO_COMPETENCES } from "../config/competences";
import { useSaison } from "../context/SaisonContext";
import "../styles/competences/competences.css";

function calculerBackground(saisonActuelle, saison) {
  if (saisonActuelle === "nuit") {
    return "linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%)";
  }
  return `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`;
}

export default function Competences() {
  const { saisonActuelle } = useSaison();
  const saison = SAISONS[saisonActuelle];
  const background = calculerBackground(saisonActuelle, saison);

  return (
    <>
      <main
        className="competences-page"
        style={{
          background,
          color: saison.textePrincipal,
        }}
      >
        <div className="competences-contenu">
          <h1 className="competences-titre">Mes Compétences</h1>

          <p className="competences-intro">
            <TexteFormate texte={INTRO_COMPETENCES} />
          </p>

          <div className="competences-liste">
            {COMPETENCES.map((competence, index) => (
              <VignetteCompetence
                key={competence.id}
                competence={competence}
                index={index}
                saisonActuelle={saisonActuelle}
              />
            ))}
          </div>
        </div>
      </main>

      <BarreNavigation
        couleurActive={saison.boutonPrincipalFond}
        couleurTexte={saison.texteSecondaire}
      />
    </>
  );
}
