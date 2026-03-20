"use client";

import { useState } from "react";

const OPTIONS_SAISON = [
  { valeur: "auto", label: "Automatique", emoji: "🔄" },
  { valeur: "printemps", label: "Printemps", emoji: "🌸" },
  { valeur: "ete", label: "Été", emoji: "☀️" },
  { valeur: "automne", label: "Automne", emoji: "🍂" },
  { valeur: "hiver", label: "Hiver", emoji: "❄️" },
];

export default function SelectionSaison({ valeur, onChange, compact }) {
  const [ouvert, setOuvert] = useState(false);

  const optionActive = OPTIONS_SAISON.find(
    (option) => option.valeur === valeur
  );

  function handleChoix(nouvelleValeur) {
    onChange(nouvelleValeur);
    setOuvert(false);
  }

  function renderOptions() {
    return OPTIONS_SAISON.map((option) => {
      const estActif = option.valeur === valeur;
      const nomClasse = estActif
        ? "select-saison-option select-saison-option-active"
        : "select-saison-option";
      return (
        <li key={option.valeur}>
          <button className={nomClasse} onClick={() => handleChoix(option.valeur)}>
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
        className={"select-saison-bouton"}
        onClick={() => setOuvert(!ouvert)}
        aria-haspopup="listbox"
        aria-expanded={ouvert}
      >
        <span className="select-saison-emoji">{optionActive.emoji}</span>
        <span className="select-saison-label">{optionActive.label}</span>
        <span className="select-saison-fleche">{ouvert ? "▲" : "▼"}</span>
      </button>

      {ouvert && (
        <ul className="select-saison-dropdown">
          {renderOptions()}
        </ul>
      )}
    </div>
  );
}
