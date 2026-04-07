import PropTypes from "prop-types";

// Composant qui affiche un texte avec des mots en gras
export default function TexteFormat({ texte }) {
  // Coupe le texte en morceaux en gardant les parties entre **
  const morceaux = texte.split(/(\*\*.*?\*\*)/g);

  return (
    <>
      {morceaux.map((morceau, index) => {
        // Si le morceau commence et finit par **, on le met en gras
        if (morceau.startsWith("**") && morceau.endsWith("**")) {
          const texteGras = morceau.slice(2, -2);
          return <strong key={`${texteGras}-${index}`}>{texteGras}</strong>;
        }

        // Sinon, on affiche le texte normal
        return <span key={`${morceau.substring(0, 10)}-${index}`}>{morceau}</span>;
      })}
    </>
  );
}

// Type attendu pour la prop
TexteFormat.propTypes = {
  texte: PropTypes.string,
};
