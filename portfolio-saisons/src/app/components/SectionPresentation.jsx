import Link from "next/link";
import { PRESENTATION } from "../config/contenuAccueil";
import CanvasSakura from "./CanvasSakura";
import TexteMachineAEcrire from "./TexteMachineAEcrire";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function SectionPresentation({ saisonActuelle }) {
  const dernierIndex = PRESENTATION.paragraphes.length - 1;

  return (
    <section className="section-presentation">
      {saisonActuelle === "printemps" && <CanvasSakura />}

      {PRESENTATION.paragraphes.map((paragraphe, index) => {
        const delai = PRESENTATION.paragraphes
          .slice(0, index)
          .reduce((total, p) => total + p.length * 0.03 + 1, 0);

        const estDernier = index === dernierIndex;
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
                <Link href={PRESENTATION.lienContact.href} className="lien-contact">
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
