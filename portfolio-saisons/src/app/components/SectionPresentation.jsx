import { PRESENTATION } from "../config/contenuAccueil";

export default function SectionPresentation() {
  return (
    <section className="section-presentation">
      {PRESENTATION.paragraphes.map((paragraphe, index) => (
        <p key={index} className="section-texte">
          {paragraphe}
        </p>
      ))}
    </section>
  );
}
