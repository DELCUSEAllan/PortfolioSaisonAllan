"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";
import { FaJava, FaGitAlt, FaReact, FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { SiGo, SiNextdotjs, SiMysql, SiDotnet } from "react-icons/si";
import { NIVEAUX } from "../config/competences";

// Icône associée à chaque compétence
const ICONES = {
  java: <FaJava />,
  go: <SiGo />,
  csharp: <SiDotnet />,
  sql: <SiMysql />,
  git: <FaGitAlt />,
  react: <FaReact />,
  nextjs: <SiNextdotjs />,
  html: <FaHtml5 />,
  css: <FaCss3Alt />,
};

// Petite déco selon la saison
const DECORATIONS = {
  printemps: { emoji: "🌱", bordure: "#A2D39C" },
  ete: { emoji: "🛟", bordure: "#3A9BD5" },
  automne: { emoji: "🍂", bordure: "#C0622A" },
  hiver: { emoji: "❄️", bordure: "#5BA4CF" },
  nuit: { emoji: "🪐", bordure: "#58A6FF" },
};

// Vignette d'une compétence
export default function VignetteCompetence({ competence, index, saisonActuelle }) {
  // Sert à détecter quand la vignette entre dans l'écran
  const ref = useRef(null);
  const estVisible = useInView(ref, { once: true, margin: "-30px" });

  // Infos du niveau de compétence
  const niveau = NIVEAUX[competence.niveau];

  // Déco selon la saison actuelle
  const deco = DECORATIONS[saisonActuelle] ?? DECORATIONS.printemps;

  return (
    <motion.div
      ref={ref}
      className="vignette-competence"
      style={{
        border: `2px dashed ${deco.bordure}`,
        borderLeft: `4px solid ${deco.bordure}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={estVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
      }}
    >
      <div className="vignette-competence-entete">
        {/* Icône de la compétence */}
        <span className="vignette-competence-icone">
          {ICONES[competence.id]}
        </span>

        {/* Nom de la compétence */}
        <span className="vignette-competence-nom">
          {competence.nom}
        </span>

        {/* Niveau affiché avec ses couleurs */}
        <span
          className="vignette-competence-niveau"
          style={{
            backgroundColor: niveau.couleur,
            color: niveau.texte,
          }}
        >
          {niveau.label}
        </span>
      </div>

      <ul className="vignette-competence-liste">
        {/* Liste de ce que tu as appris */}
        {competence.appris.map((item) => (
          <li key={item} className="vignette-competence-item">
            {deco.emoji} {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

VignetteCompetence.propTypes = {
  competence: PropTypes.shape({
    id: PropTypes.string,
    nom: PropTypes.string,
    niveau: PropTypes.string,
    appris: PropTypes.arrayOf(PropTypes.string),
  }),
  index: PropTypes.number,
  saisonActuelle: PropTypes.string,
};
