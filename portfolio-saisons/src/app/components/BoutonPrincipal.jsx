import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

// Composant du bouton principal
export default function BoutonPrincipal({ texte, couleurFond, couleurTexte }) {
  // Permet de changer de page par code
  const router = useRouter();

  return (
    <button
      className="bouton-principal"
      style={{
        // Couleur de fond du bouton
        backgroundColor: couleurFond,

        // Couleur du texte du bouton
        color: couleurTexte,

        // Ombre du bouton avec une légère transparence, 4D code héxa représentant 30% opacité
        boxShadow: `0 10px 20px ${couleurFond}4D`, // horizontal, vertical, flou de l'ombre, opacité
      }}
      onClick={() => router.push("/projets")}
    >
      {/* Texte affiché dans le bouton */}
      {texte}
    </button>
  );
}

// Types attendus pour les props
BoutonPrincipal.propTypes = {
  texte: PropTypes.string,
  couleurFond: PropTypes.string,
  couleurTexte: PropTypes.string,
};
