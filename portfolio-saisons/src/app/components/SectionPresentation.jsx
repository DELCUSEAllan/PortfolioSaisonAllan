import { PRESENTATION } from "../config/contenuAccueil";
import CanvasSakura from "./CanvasSakura";


import PropTypes from "prop-types";

SectionPresentation.propTypes = {
  saisonActuelle: PropTypes.string,
};

export default function SectionPresentation({ saisonActuelle }) {
  return (
    <section className="section-presentation">
      {saisonActuelle === "printemps" && <CanvasSakura />}

     {PRESENTATION.paragraphes.map((paragraphe) => (
        <p key={paragraphe.substring(0, 20)} className="section-texte">
          {paragraphe}
        </p>
      ))}
    </section>
  );
}
