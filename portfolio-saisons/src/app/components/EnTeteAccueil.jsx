import Image from "next/image";
import { IDENTITE } from "../config/contenuAccueil";
import SelectionSaison from "./SelectionSaison";
import PropTypes from "prop-types";

EnTeteAccueil.propTypes = {
  valeurSaison: PropTypes.string,
  onChangeSaison: PropTypes.func,
  saisonActuelle: PropTypes.string,
};

export default function EnTeteAccueil({ valeurSaison, onChangeSaison, saisonActuelle }) {
  return (
    <header className="en-tete-accueil">
      <div className="en-tete-ligne-superieure">
        <div style={{ background: "none" }}>
          <SelectionSaison
            valeur={valeurSaison}
            onChange={onChangeSaison}
            saisonActuelle={saisonActuelle}
          />
        </div>
      </div>

      <div className="en-tete-contenu">
        <div className="en-tete-avatar">
          <Image
            src="/avatar.webp"
            alt={`Photo de profil de ${IDENTITE.prenom}`}
            width={120}
            height={120}
            className="en-tete-avatar-image"
            priority
          />
        </div>

        <div className="en-tete-textes">
          <h1 className="en-tete-nom">{IDENTITE.prenom}</h1>
          <p className="en-tete-sous-titre">{IDENTITE.sousTitre}</p>
        </div>
      </div>
    </header>
  );
}
