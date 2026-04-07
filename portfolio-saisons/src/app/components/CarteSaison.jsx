import PropTypes from "prop-types";

// Définition et validation des types de données reçues en props
CarteSaison.propTypes = {
  nomSaison: PropTypes.string,
};

export default function CarteSaison({ nomSaison }) {
  // Détermine l'emoji à afficher selon le nom de la saison
  let emoji = "";
  if (nomSaison === "Printemps") {
    emoji = "🌸";
  } else if (nomSaison === "Été") {
    emoji = "☀️";
  } else if (nomSaison === "Automne") {
    emoji = "🍂";
  } else if (nomSaison === "Hiver") {
    emoji = "❄️";
  }

  return (
    <section className="carte-saison">
      <div className="carte-saison-fond">
        <div className="carte-saison-icone">
          {/* Affiche l'emoji correspondant à la saison */}
          <span className="carte-saison-emoji">
            {emoji}
          </span>
        </div>
      </div>
    </section>
  );
}
