"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";

function extraireParties(texte) {
  if (!texte) return [];
  return texte.split(/(\*\*.*?\*\*)/g).map((partie) => ({
    texte: partie.startsWith("**") ? partie.slice(2, -2) : partie,
    gras: partie.startsWith("**"),
  }));
}

export default function TexteMachineAEcrire({ texte, vitesse = 0.03, delaiDepart = 0 }) {
  const parties = extraireParties(texte);
  let compteur = 0;

  return (
    <span>
      {parties.map((partie) => {
        const Balise = partie.gras ? "strong" : "span";
        return (
          <Balise key={partie.texte.substring(0, 15)}>
            {partie.texte.split("").map((caractere, charIndex) => {
              const delaiCaractere = delaiDepart + compteur++ * vitesse;
              return (
                <motion.span
                  key={`${partie.texte.substring(0, 5)}-${charIndex}-${caractere}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.01,
                    delay: delaiCaractere,
                  }}
                >
                  {caractere}
                </motion.span>
              );
            })}
          </Balise>
        );
      })}
    </span>
  );
}

TexteMachineAEcrire.propTypes = {
  texte: PropTypes.string,
  vitesse: PropTypes.number,
  delaiDepart: PropTypes.number,
};
