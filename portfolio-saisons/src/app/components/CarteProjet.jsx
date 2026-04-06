"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaGithub } from "react-icons/fa";

const STYLES_SAISON = {
  printemps: { filtreCoin: "none",                                                    vignetteFond: "#F5D7E3", vignetteTexte: "#111827", carteFond: "rgba(255, 255, 255, 0.65)" },
  ete:       { filtreCoin: "sepia(1) saturate(3) hue-rotate(180deg)",                 vignetteFond: "#F2C46D", vignetteTexte: "#2C2420", carteFond: "rgba(255, 255, 255, 0.65)" },
  automne:   { filtreCoin: "sepia(1) saturate(3) hue-rotate(20deg)",                  vignetteFond: "#D4A843", vignetteTexte: "#2A1F14", carteFond: "rgba(255, 255, 255, 0.65)" },
  hiver:     { filtreCoin: "sepia(1) saturate(2) hue-rotate(190deg) brightness(1.4)", vignetteFond: "#E8F0F8", vignetteTexte: "#1E2A3A", carteFond: "rgba(255, 255, 255, 0.65)" },
  nuit:      { filtreCoin: "sepia(1) saturate(2) hue-rotate(200deg) brightness(0.6)", vignetteFond: "#1F2937", vignetteTexte: "#E6EDF3", carteFond: "rgba(30, 41, 59, 0.85)" },
};

export default function CarteProjet({ projet, index, couleurPrincipal, couleurTexte, saisonActuelle }) {
  const styles = STYLES_SAISON[saisonActuelle] ?? STYLES_SAISON.printemps;

  return (
    <motion.div
      className="carte-projet"
      style={{ backgroundColor: styles.carteFond, color: saisonActuelle === "nuit" ? "#E6EDF3" : undefined }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <div className="carte-coin carte-coin-haut-droit" style={{ filter: styles.filtreCoin }} />
      <div className="carte-coin carte-coin-bas-gauche" style={{ filter: styles.filtreCoin }} />
      <div className="carte-coin carte-coin-haut-gauche" style={{ filter: styles.filtreCoin }} />
      <div className="carte-coin carte-coin-bas-droit" style={{ filter: styles.filtreCoin }} />

      <div className="carte-projet-entete">
        <h2 className="carte-projet-nom">{projet.nom}</h2>
        {projet.github && (
          <a
            href={projet.github}
            target="_blank"
            rel="noopener noreferrer"
            className="carte-projet-github"
            style={{ color: couleurPrincipal }}
          >
            <FaGithub size={20} />
          </a>
        )}
      </div>

      <p className="carte-projet-description">{projet.description}</p>

      <div className="carte-projet-section">
        <span className="carte-projet-label">📚 Ce que j&apos;ai appris</span>
        <p className="carte-projet-texte">{projet.appris}</p>
      </div>

      <div className="carte-projet-section">
        <span className="carte-projet-label">🚀 Où j&apos;en suis</span>
        <p className="carte-projet-texte">{projet.statut}</p>
      </div>

      <div className="carte-projet-technos">
        {projet.technos.map((techno) => (
          <span
            key={techno}
            className="carte-projet-techno"
            style={{
              backgroundColor: styles.vignetteFond,
              color: styles.vignetteTexte,
              border: `1px solid ${couleurPrincipal}`,
            }}
          >
            {techno}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

CarteProjet.propTypes = {
  projet: PropTypes.shape({
    id: PropTypes.string,
    nom: PropTypes.string,
    description: PropTypes.string,
    appris: PropTypes.string,
    statut: PropTypes.string,
    technos: PropTypes.arrayOf(PropTypes.string),
    github: PropTypes.string,
  }),
  index: PropTypes.number,
  couleurPrincipal: PropTypes.string,
  couleurTexte: PropTypes.string,
  saisonActuelle: PropTypes.string,
};
