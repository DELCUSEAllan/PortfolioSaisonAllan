import { TECHNOS } from "../config/contenuAccueil";

export default function EtiquettesTechnos() {
  return (
    <div className="etiquettes-technos">
      {TECHNOS.map((techno) => (
        <span key={techno} className="etiquette-techno">
          {techno}
        </span>
      ))}
    </div>
  );
}
