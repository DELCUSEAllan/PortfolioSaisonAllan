"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";


// Elle repère aussi les parties écrites entre ** pour savoir si elles doivent être en gras
function extraireParties(texte) {
  if (!texte) {
    return [];
  }

  // On découpe le texte en gardant aussi les morceaux entre **
  const morceaux = texte.split(/(\*\*.*?\*\*)/g);

  // On transforme chaque morceau en objet
  // - le texte à afficher
  // - un booléen pour savoir si c'est du gras ou non
  return morceaux.map((morceau) => {
    // Si le morceau commence et finit par **, alors on enlève les ** et on dit que c'est du gras
    if (morceau.startsWith("**") && morceau.endsWith("**")) {
      return {
        texte: morceau.slice(2, -2),
        gras: true,
      };
    }

    // Sinon, on garde le texte normal
    return {
      texte: morceau,
      gras: false,
    };
  });
}

// delaiDepart = temps avant de commencer l'animation
export default function TexteMachineAEcrire({ texte, vitesse = 0.03, delaiDepart = 0 }) {
  // On récupère les morceaux du texte
  const parties = extraireParties(texte);

  // Ce compteur sert à décaler chaque lettre dans le temps, + il +, + la lettre apparaît tard
  let compteur = 0;

  return (
    <span>
      {/* On parcourt chaque partie du texte */}
      {parties.map((partie, indexPartie) => (
        <span key={`partie-${partie.gras ? "gras" : "normal"}-${partie.texte}`}>
          {/* On coupe la partie en lettres pour les afficher une par une */}
          {partie.texte.split("").map((caractere, indexCaractere) => {
            // Calcule le délai de la lettre actuelle
            const delai = delaiDepart + compteur * vitesse;

            // On augmente le compteur pour la lettre suivante
            compteur++;

            // Si la partie doit être en gras, on affiche chaque lettre dans une balise strong animée
            if (partie.gras) {
              return (
                <motion.strong
                  key={indexPartie + "-" + indexCaractere}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.01,
                    delay: delai,
                  }}
                >
                  {caractere}
                </motion.strong>
              );
            }

            // Sinon, on affiche la lettre normalement dans un span animé
            return (
              <motion.span
                key={indexPartie + "-" + indexCaractere}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.01,
                  delay: delai,
                }}
              >
                {caractere}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

// Types attendus pour les props
TexteMachineAEcrire.propTypes = {
  texte: PropTypes.string,
  vitesse: PropTypes.number,
  delaiDepart: PropTypes.number,
};
