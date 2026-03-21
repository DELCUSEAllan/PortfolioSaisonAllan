import { PRESENTATION } from "../config/contenuAccueil";
import CanvasSakura from "./CanvasSakura";

export default function SectionPresentation({ saisonActuelle }) {
  return (
    <section className="section-presentation">
      {saisonActuelle === "printemps" && <CanvasSakura />}

      {PRESENTATION.paragraphes.map((paragraphe, index) => (
        <p key={index} className="section-texte">
          {paragraphe}
        </p>
      ))}
    </section>
  );
}
