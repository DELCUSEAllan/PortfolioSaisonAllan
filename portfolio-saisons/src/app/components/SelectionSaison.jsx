"use client";

import { useState } from "react";
import PropTypes from "prop-types";

const OPTIONS_SAISON = [
  { valeur: "auto",      label: "Automatique", emoji: "🔄" },
  { valeur: "printemps", label: "Printemps",   emoji: "🌸" },
  { valeur: "ete",       label: "Été",         emoji: "☀️" },
  { valeur: "automne",   label: "Automne",     emoji: "🍂" },
  { valeur: "hiver",     label: "Hiver",       emoji: "❄️" },
];

const COULEURS_BOUTON = {
  printemps: { fond: "#F5D7E3", texte: "#111827" },
  ete:       { fond: "#F4845F", texte: "#FFFFFF" },
  automne:   { fond: "#C0622A", texte: "#FFFFFF" },
  hiver:     { fond: "#5BA4CF", texte: "#FFFFFF" },
};

const COULEURS_DROPDOWN = {
  printemps: "#F5D7E3",
  ete:       "#F4845F", // ← même orange que le bouton
  automne:   "#FAF3E8",
  hiver:     "#F0F4F8",
};

export default function SelectionSaison({ valeur, onChange, compact, saisonActuelle }) {
  console.log("saisonActuelle reçue :", saisonActuelle);
  const [ouvert, setOuvert] = useState(false);

  const optionActive = OPTIONS_SAISON.find((o) => o.valeur === valeur);
  const couleurs = COULEURS_BOUTON[saisonActuelle] ?? COULEURS_BOUTON.printemps;

  function handleChoix(nouvelleValeur) {
    onChange(nouvelleValeur);
    setOuvert(false);
  }

  function renderOptions() {
    return OPTIONS_SAISON.map((option) => {
      const estActif = option.valeur === valeur;
      return (
        <li key={option.valeur}>
          <button
            className={estActif ? "select-saison-option select-saison-option-active" : "select-saison-option"}
            onClick={() => handleChoix(option.valeur)}
          >
            <span>{option.emoji}</span>
            <span>{option.label}</span>
          </button>
        </li>
      );
    });
  }

  return (
    <div className="select-saison-wrapper">
      <button
        className="select-saison-bouton"
        onClick={() => setOuvert(!ouvert)}
        aria-haspopup="listbox"
        aria-expanded={ouvert}
        style={{
          backgroundColor: couleurs.fond,
          color: couleurs.texte,
        }}
      >
        <span className="select-saison-emoji">{optionActive.emoji}</span>
        <span className="select-saison-label">{optionActive.label}</span>
        <span className="select-saison-fleche">{ouvert ? "▲" : "▼"}</span>
      </button>

      {ouvert && (
        <ul
            className="select-saison-dropdown"
            style={{ backgroundColor: COULEURS_DROPDOWN[saisonActuelle] ?? "#F5D7E3" }}
            >
            {renderOptions()}
            </ul>
      )}
    </div>
  );
}

SelectionSaison.propTypes = {
  valeur: PropTypes.string,
  onChange: PropTypes.func,
  compact: PropTypes.bool,
  saisonActuelle: PropTypes.string,
};
