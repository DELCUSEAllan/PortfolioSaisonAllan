import PropTypes from "prop-types";

export default function TexteFormate({ texte }) {
  const parties = texte.split(/(\*\*.*?\*\*)/g);

  return (
    <>
      {parties.map((partie, index) => {
        if (partie.startsWith("**") && partie.endsWith("**")) {
          const motEnGras = partie.slice(2, -2);
          return <strong key={`${motEnGras}-${index}`}>{motEnGras}</strong>;
        }
        return <span key={`${partie.substring(0, 10)}-${index}`}>{partie}</span>;
      })}
    </>
  );
}

TexteFormate.propTypes = {
  texte: PropTypes.string,
};
