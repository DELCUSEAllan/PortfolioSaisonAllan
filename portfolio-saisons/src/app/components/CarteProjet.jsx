// src/app/components/CarteProjet.jsx

"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaGithub } from "react-icons/fa";

export default function CarteProjet({ projet, index, couleurPrincipal, couleurTexte }) {
  return (
    <motion.div
      className="carte-projet"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <div className="carte-coin carte-coin-haut-droit" />
      <div className="carte-coin carte-coin-bas-gauche" />

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
};
