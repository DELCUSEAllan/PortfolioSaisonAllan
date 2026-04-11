// Ce composant s'exécute côté navigateur car il utilise useSaison()
"use client";

import BarreNavigation from "../components/BarreNavigation";
import CarteProjet from "../components/CarteProjet";
import { SAISONS } from "../config/couleursSaisons";
import { PROJETS } from "../config/projets";
import { useSaison } from "../context/SaisonContext";
import "../styles/projets/projets.css";

// Calcule dégradé de fond selon saison active, nuit = dégradé fixe, autres = couleurs dynamiques
function calculerBackground(saisonActuelle, saison) {
  if (saisonActuelle === "nuit") {
    return "linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%)";
  }
  return `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`;
}

export default function Projets() {
  // Récupère la saison actuelle
  const { saisonActuelle } = useSaison();
  // Récupère l'objet complet des couleurs pour la saison active
  const saison = SAISONS[saisonActuelle];
  // Calcule le dégradé de fond
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
          {/* Titre caché sur desktop via CSS media query */}
          <h1 className="projets-titre">Mes Projets</h1>
          <p className="projets-intro">
            Voici les projets sur lesquels je travaille ou ai travaillé au fil de ma formation.
          </p>

          {/* Grille de cartes projets */}
          {/* On parcourt le tableau PROJETS et on crée une CarteProjet pour chacun */}
          {/* key -> identifiant unique obligatoire en React pour les listes */}
          {/* index -> utilisé pour décaler l'animation d'apparition de chaque carte */}
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

      {/* Barre de navigation avec couleurs dynamiques selon la saison */}
      <BarreNavigation
        couleurActive={saison.boutonPrincipalFond}
        couleurTexte={saison.texteSecondaire}
        saisonActuelle={saisonActuelle}
      />
    </>
  );
}
