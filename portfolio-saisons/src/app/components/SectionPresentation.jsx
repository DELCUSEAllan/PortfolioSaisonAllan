"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PropTypes from "prop-types";
import { PRESENTATION } from "../config/contenuAccueil";
import CanvasSakura from "./CanvasSakura";
import TexteMachineAEcrire from "./TexteMachineAEcrire";

const COULEURS_LIEN = {
  printemps: "#A2D39C",
  ete:       "#3A9BD5",
  automne:   "#C0622A",
  hiver:     "#5BA4CF",
};

export default function SectionPresentation({ saisonActuelle }) {
  const dernierIndex = PRESENTATION.paragraphes.length - 1;
  const couleurLien = COULEURS_LIEN[saisonActuelle] ?? "#A2D39C";

  return (
    <section className="section-presentation">
      {saisonActuelle === "printemps" && <CanvasSakura />}

      {PRESENTATION.paragraphes.map((paragraphe, index) => {
        const estDernier = index === dernierIndex;
        const delai = PRESENTATION.paragraphes
          .slice(0, index)
          .reduce((total, p) => total + p.length * 0.03 + 1, 0);
        const dureeParagraphe = paragraphe.length * 0.03;
        const delaiLien = delai + dureeParagraphe;

        return (
          <p key={paragraphe.substring(0, 20)} className="section-texte">
            <TexteMachineAEcrire
              texte={paragraphe}
              vitesse={0.03}
              delaiDepart={delai}
            />
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

SectionPresentation.propTypes = {
  saisonActuelle: PropTypes.string,
};
