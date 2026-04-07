import Image from "next/image";
import { IDENTITE } from "../config/contenuAccueil";
import SelectionSaison from "./SelectionSaison";
import PropTypes from "prop-types";

// Définition et validation des types de données reçues en props
EnTeteAccueil.propTypes = {
  valeurSaison: PropTypes.string,   // La saison sélectionnée dans le menu
  onChangeSaison: PropTypes.func,   // La fonction appelée quand on change de saison
  saisonActuelle: PropTypes.string, // La saison actuellement active
};

export default function EnTeteAccueil({ valeurSaison, onChangeSaison, saisonActuelle }) {
  return (
    <header className="en-tete-accueil">

      {/* Ligne du haut qui contient le sélecteur de saison aligné à droite */}
      <div className="en-tete-ligne-superieure">
        <div style={{ background: "none" }}>
          {/* Composant de sélection de saison */}
          {/* valeur        → la saison actuellement choisie dans le menu */}
          {/* onChange       → fonction déclenchée quand l'utilisateur change de saison */}
          {/* saisonActuelle → utilisé pour colorer le bouton selon la saison */}
          <SelectionSaison
            valeur={valeurSaison}
            onChange={onChangeSaison}
            saisonActuelle={saisonActuelle}
          />
        </div>
      </div>

      {/* Bloc central avec l'avatar et les informations personnelles */}
      <div className="en-tete-contenu">

        {/* Photo de profil optimisée par Next.js */}
        {/* priority → l'image est chargée en priorité car elle est visible immédiatement */}
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

        {/* Nom et sous-titre récupérés depuis le fichier de config contenuAccueil.js */}
        <div className="en-tete-textes">
          <h1 className="en-tete-nom">{IDENTITE.prenom}</h1>
          <p className="en-tete-sous-titre">{IDENTITE.sousTitre}</p>
        </div>
      </div>
    </header>
  );
}
