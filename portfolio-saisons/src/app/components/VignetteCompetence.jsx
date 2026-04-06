"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";
import { FaJava, FaGitAlt, FaReact, FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { SiGo, SiNextdotjs, SiMysql, SiDotnet } from "react-icons/si";
import { NIVEAUX } from "../config/competences";

const ICONES = {
  java: <FaJava size={24} />,
  go: <SiGo size={24} />,
  csharp: <SiDotnet size={24} />,
  sql: <SiMysql size={24} />,
  git: <FaGitAlt size={24} />,
  react: <FaReact size={24} />,
  nextjs: <SiNextdotjs size={24} />,
  html: <FaHtml5 size={24} />,
  css: <FaCss3Alt size={24} />,
};

const DECORATIONS = {
  printemps: { emoji: "🌱", bordure: "#A2D39C" },
  ete:       { emoji: "🛟", bordure: "#3A9BD5" },
  automne:   { emoji: "🍂", bordure: "#C0622A" },
  hiver:     { emoji: "❄️", bordure: "#5BA4CF" },
  nuit:      { emoji: "🪐", bordure: "#58A6FF" },
};

export default function VignetteCompetence({ competence, index, saisonActuelle }) {
  const ref = useRef(null);
  const estVisible = useInView(ref, { once: true, margin: "-30px" });
  const niveau = NIVEAUX[competence.niveau];
  const deco = DECORATIONS[saisonActuelle] ?? DECORATIONS.printemps;

  return (
    <motion.div
      ref={ref}
      className="vignette-competence"
      style={{
        border: `2px dashed ${deco.bordure}`,
        borderLeft: `4px solid ${deco.bordure}`,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={estVisible
        ? { opacity: 1, scale: 1, y: 0 }
        : { opacity: 0, scale: 0.8, y: 20 }
      }
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
        type: "spring",
        bounce: 0.3,
      }}
    >
      <div className="vignette-competence-entete">
        <span className="vignette-competence-icone">
          {ICONES[competence.id]}
        </span>
        <span className="vignette-competence-nom">{competence.nom}</span>
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
