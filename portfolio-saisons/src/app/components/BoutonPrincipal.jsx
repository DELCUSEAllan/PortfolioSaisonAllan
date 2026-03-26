import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

BoutonPrincipal.propTypes = {
  texte: PropTypes.string,
  couleurFond: PropTypes.string,
  couleurTexte: PropTypes.string,
};

export default function BoutonPrincipal({ texte, couleurFond, couleurTexte }) {
  const router = useRouter();

  return (
    <button
      className="bouton-principal"
      style={{
        backgroundColor: couleurFond,
        color: couleurTexte,
      }}
      onClick={() => router.push("/projets")}
    >
      {texte}
    </button>
  );
}
