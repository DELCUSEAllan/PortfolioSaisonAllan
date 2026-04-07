import { TECHNOS } from "../config/contenuAccueil";
import PropTypes from "prop-types";

// Couleurs des étiquettes selon la saison
const COULEURS_ETIQUETTES = {
  printemps: { fond: "#FFFA9C", bordure: "#F5D7E3", texte: "#111827" },
  ete:       { fond: "#F2C46D", bordure: "#3A9BD5", texte: "#2C2420" },
  automne:   { fond: "#D4A843", bordure: "#C0622A", texte: "#2A1F14" },
  hiver:     { fond: "#E8F0F8", bordure: "#5BA4CF", texte: "#1E2A3A" },
  nuit:      { fond: "#1F2937", bordure: "#58A6FF", texte: "#E6EDF3" },
};

// Type attendu pour la prop du composant
EtiquettesTechnos.propTypes = {
  saisonActuelle: PropTypes.string,
};

// Composant qui affiche les étiquettes des technologies
export default function EtiquettesTechnos({ saisonActuelle }) {
  // Récupère les couleurs de la saison actuelle
  // Si la saison n'existe pas, on prend celles du printemps par défaut
  const couleurs = COULEURS_ETIQUETTES[saisonActuelle] ?? COULEURS_ETIQUETTES.printemps;

  return (
    <div className="etiquettes-technos">
      {/* On parcourt le tableau TECHNOS pour afficher une étiquette par technologie */}
      {TECHNOS.map((techno) => (
        <span
          key={techno}
          className="etiquette-techno"
          style={{
            backgroundColor: couleurs.fond,
            borderColor: couleurs.bordure,
            color: couleurs.texte,
          }}
        >
          {/* Nom de la technologie */}
          {techno}
        </span>
      ))}
    </div>
  );
}
