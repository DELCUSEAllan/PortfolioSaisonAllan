// src/app/competences/page.jsx

"use client";

import BarreNavigation from "../components/BarreNavigation";
import BarreCompetence from "../components/BarreCompetence";
import { SAISONS } from "../config/couleursSaisons";
import { COMPETENCES, INTRO_COMPETENCES } from "../config/competences";
import { useSaison } from "../context/SaisonContext";
import "../styles/competences/competences.css";
import TexteFormate from "../components/TexteFormat";


export default function Competences() {
  const { saisonActuelle } = useSaison();
  const saison = SAISONS[saisonActuelle];

  return (
    <>
      <main
        className="competences-page"
        style={{
          background: `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`,
          color: saison.textePrincipal,
        }}
      >
        <div className="competences-contenu">

          <h1 className="competences-titre">Mes Compétences</h1>

          <p className="competences-intro">
            <TexteFormate texte={INTRO_COMPETENCES} />
            </p>

          <div className="competences-liste">
            {COMPETENCES.map((competence) => (
              <BarreCompetence
                key={competence.id}
                nom={competence.nom}
                niveau={competence.niveau}
                contexte={competence.contexte}
                ressenti={competence.ressenti}
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
