import { TECHNOS } from "../config/contenuAccueil";
import PropTypes from "prop-types";

const COULEURS_ETIQUETTES = {
  printemps: { fond: "#FFFA9C", bordure: "#F5D7E3", texte: "#111827" },
  ete:       { fond: "#F2C46D", bordure: "#3A9BD5", texte: "#2C2420" },
  automne:   { fond: "#D4A843", bordure: "#C0622A", texte: "#2A1F14" },
  hiver:     { fond: "#E8F0F8", bordure: "#5BA4CF", texte: "#1E2A3A" },
  nuit:      { fond: "#1F2937", bordure: "#58A6FF", texte: "#E6EDF3" },
};

EtiquettesTechnos.propTypes = {
  saisonActuelle: PropTypes.string,
};

export default function EtiquettesTechnos({ saisonActuelle }) {
  const couleurs = COULEURS_ETIQUETTES[saisonActuelle] ?? COULEURS_ETIQUETTES.printemps;

  return (
    <div className="etiquettes-technos">
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
          {techno}
        </span>
      ))}
    </div>
  );
}
