import { PRESENTATION } from "../config/contenuAccueil";
import CanvasSakura from "./CanvasSakura";
import TexteMachineAEcrire from "./TexteMachineAEcrire";
import PropTypes from "prop-types";

export default function SectionPresentation({ saisonActuelle }) {
  return (
    <section className="section-presentation">
      {saisonActuelle === "printemps" && <CanvasSakura />}

      {PRESENTATION.paragraphes.map((paragraphe, index) => {
  const delai = PRESENTATION.paragraphes
    .slice(0, index)
    .reduce((total, p) => total + p.length * 0.03 + 1, 0);

  return (
    <p key={paragraphe.substring(0, 20)} className="section-texte">
      <TexteMachineAEcrire
        texte={paragraphe}
        vitesse={0.03}
        delaiDepart={delai}
      />
    </p>
  );
})}
    </section>
  );
}

SectionPresentation.propTypes = {
  saisonActuelle: PropTypes.string,
};
