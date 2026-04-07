"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PropTypes from "prop-types";
import { PRESENTATION } from "../config/contenuAccueil";
import CanvasSakura from "./CanvasSakura";
import TexteMachineAEcrire from "./TexteMachineAEcrire";

// Couleurs du lien selon la saison
const COULEURS_LIEN = {
  printemps: "#A2D39C",
  ete:       "#3A9BD5",
  automne:   "#C0622A",
  hiver:     "#5BA4CF",
  nuit:      "#58A6FF",
};

// Composant principal de la section présentation
export default function SectionPresentation({ saisonActuelle }) {
  const dernierIndex = PRESENTATION.paragraphes.length - 1;

  const couleurLien = COULEURS_LIEN[saisonActuelle] ?? "#A2D39C";

  return (
    <section className="section-presentation">
      {/* Affiche les fleurs de sakura seulement au printemps */}
      {saisonActuelle === "printemps" && <CanvasSakura />}

      {/* Parcourt tous les paragraphes de présentation */}
      {PRESENTATION.paragraphes.map((paragraphe, index) => {
        // Vérifie si on est sur le dernier paragraphe
        const estDernier = index === dernierIndex;

        // Calcule le délai de départ de l'animation du paragraphe
        // On additionne la durée estimée des paragraphes précédents
        const delai = PRESENTATION.paragraphes
          .slice(0, index)
          .reduce((total, p) => total + p.length * 0.03 + 1, 0);

        // Durée estimée pour écrire le paragraphe actuel
        const dureeParagraphe = paragraphe.length * 0.03;

        // Délai avant d'afficher le lien à la fin du dernier paragraphe
        const delaiLien = delai + dureeParagraphe;

        return (
          <p key={paragraphe.substring(0, 20)} className="section-texte">
            {/* Texte affiché avec effet machine à écrire */}
            <TexteMachineAEcrire
              texte={paragraphe}
              vitesse={0.03}
              delaiDepart={delai}
            />

            {/* Si c'est le dernier paragraphe, on affiche le lien avec une apparition progressive */}
            {estDernier && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delaiLien }}
              >
                <Link
                  href={PRESENTATION.lienContact.href}
                  className="lien-contact"
                  style={{ color: couleurLien }}
                >
                  {PRESENTATION.lienContact.texte}
                </Link>
              </motion.span>
            )}
          </p>
        );
      })}
    </section>
  );
}

// Type attendu pour la prop du composant
SectionPresentation.propTypes = {
  saisonActuelle: PropTypes.string,
};
