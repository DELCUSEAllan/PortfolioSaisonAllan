"use client";

import { SAISONS } from "../config/couleursSaisons";
import { COMPETENCES, INTRO_COMPETENCES } from "../config/competences";
import { useSaison } from "../context/SaisonContext";
import "../styles/competences/competences.css";
import dynamic from "next/dynamic";

const BarreNavigation = dynamic(() => import("../components/BarreNavigation"), { ssr: false });
const VignetteCompetence = dynamic(() => import("../components/VignetteCompetence"), { ssr: false });
const TexteFormate = dynamic(() => import("../components/TexteFormat"), { ssr: false });

// Calcule le dégradé de fond selon la saison active
// Le mode nuit a un dégradé fixe, les autres saisons utilisent leurs couleurs dynamiques
function calculerBackground(saisonActuelle, saison) {
  if (saisonActuelle === "nuit") {
    return "linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%)";
  }
  return `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`;
}

export default function Competences() {
    // Récupère la saison actuelle
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
          {/* Titre de la page - caché sur desktop via CSS */}
          <h1 className="competences-titre">Mes Compétences</h1>

          {/* Texte d'introduction avec mise en forme (gras, italique, etc.) */}
          <p className="competences-intro">
            <TexteFormate texte={INTRO_COMPETENCES} />
          </p>

            {/* Liste des vignettes de compétences */}
          <div className="competences-liste">
            {/* 1 compétence -> 1 vignette
             key : identifiant unique obligatoire en React pour les listes
             index : utilisé pour décaler l'animation d'apparition de chaque vignette */}
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

    {/* Barre de navigation avec couleurs dynamiques selon la saison */}
     <BarreNavigation
        couleurActive={saison.boutonPrincipalFond}
        couleurTexte={saison.texteSecondaire}
        saisonActuelle={saisonActuelle}
        />
    </>
  );
}
