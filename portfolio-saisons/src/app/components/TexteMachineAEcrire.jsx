"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function TexteMachineAEcrire({ texte, vitesse = 0.03, delaiDepart = 0 }) {
  return (
    <span>
      {texte.split("").map((caractere, index) => (
        <motion.span
          key={`${caractere}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.01,
            delay: delaiDepart + index * vitesse,
          }}
        >
          {caractere}
        </motion.span>
      ))}
    </span>
  );
}

TexteMachineAEcrire.propTypes = {
  texte: PropTypes.string,
  vitesse: PropTypes.number,
  delaiDepart: PropTypes.number,
};
