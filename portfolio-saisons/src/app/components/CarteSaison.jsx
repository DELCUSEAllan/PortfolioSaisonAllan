import PropTypes from "prop-types";

CarteSaison.propTypes = {
  nomSaison: PropTypes.string,
};

export default function CarteSaison({ nomSaison }) {
  return (
    <section className="carte-saison">
      <div className="carte-saison-fond">
        <div className="carte-saison-icone">
          <span className="carte-saison-emoji">
            {nomSaison === "Printemps" && "🌸"}
            {nomSaison === "Été" && "☀️"}
            {nomSaison === "Automne" && "🍂"}
            {nomSaison === "Hiver" && "❄️"}
          </span>
        </div>
      </div>
    </section>
  );
}
