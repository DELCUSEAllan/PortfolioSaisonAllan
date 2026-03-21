import PropTypes from "prop-types";

BoutonPrincipal.propTypes = {
  texte: PropTypes.string,
};

export default function BoutonPrincipal({ texte }) {
  return (
    <button className="bouton-principal">
      {texte}
    </button>
  );
}
