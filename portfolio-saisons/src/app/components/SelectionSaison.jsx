"use client";

import { useState } from "react";
import PropTypes from "prop-types";

// Liste des saisons proposées dans le menu
const OPTIONS_SAISON = [
  { valeur: "auto",      label: "Automatique", emoji: "🔄" },
  { valeur: "printemps", label: "Printemps",   emoji: "🌸" },
  { valeur: "ete",       label: "Été",         emoji: "☀️" },
  { valeur: "automne",   label: "Automne",     emoji: "🍂" },
  { valeur: "hiver",     label: "Hiver",       emoji: "❄️" },
  { valeur: "nuit",      label: "Nuit",        emoji: "🌙" },
];

// Couleurs du bouton principal selon la saison actuelle
const COULEURS_BOUTON = {
  printemps: { fond: "#F5D7E3", texte: "#111827" },
  ete:       { fond: "#F4845F", texte: "#FFFFFF" },
  automne:   { fond: "#C0622A", texte: "#FFFFFF" },
  hiver:     { fond: "#5BA4CF", texte: "#FFFFFF" },
  nuit:      { fond: "#1F2937", texte: "#E6EDF3" },
};

// Couleurs du menu déroulant selon la saison actuelle
const COULEURS_DROPDOWN = {
  printemps: "#F5D7E3",
  ete:       "#F4845F",
  automne:   "#FAF3E8",
  hiver:     "#F0F4F8",
  nuit:      "#161B22",
};

// Composant principal du sélecteur de saison
export default function SelectionSaison({ valeur, onChange, compact, saisonActuelle }) {
  // État du menu : false = fermé, true = ouvert
  const [ouvert, setOuvert] = useState(false);

  // Récupère l'option actuellement sélectionnée
  const optionActive = OPTIONS_SAISON.find((o) => o.valeur === valeur);

  // Récupère les couleurs du bouton selon la saison actuelle
  // Si la saison n'existe pas, on prend celles du printemps
  const couleurs = COULEURS_BOUTON[saisonActuelle] ?? COULEURS_BOUTON.printemps;

  // Fonction appelée quand l'utilisateur choisit une nouvelle saison
  function handleChoix(nouvelleValeur) {
    onChange(nouvelleValeur);
    setOuvert(false);
  }

  // Fonction qui génère toutes les options du menu
  function renderOptions() {
    return OPTIONS_SAISON.map((option) => {
      // Vérifie si cette option est celle actuellement sélectionnée
      const estActif = option.valeur === valeur;

      return (
        <li key={option.valeur}>
          <button
            className={estActif ? "select-saison-option select-saison-option-active" : "select-saison-option"}
            onClick={() => handleChoix(option.valeur)}
            style={{ color: saisonActuelle === "nuit" ? "#E6EDF3" : "#000000" }}
          >
            {/* Emoji de la saison */}
            <span>{option.emoji}</span>

            {/* Nom de la saison */}
            <span>{option.label}</span>
          </button>
        </li>
      );
    });
  }

  return (
    <div className="select-saison-wrapper">
      {/* Bouton principal qui ouvre ou ferme le menu */}
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
        {/* Emoji de l'option actuelle */}
        <span className="select-saison-emoji">{optionActive.emoji}</span>

        {/* Texte de l'option actuelle */}
        <span className="select-saison-label">{optionActive.label}</span>

        {/* Flèche qui indique si le menu est ouvert ou fermé */}
        <span className="select-saison-fleche">{ouvert ? "▲" : "▼"}</span>
      </button>

      {/* Si le menu est ouvert, on affiche la liste des options */}
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

// Types attendus pour les props du composant
SelectionSaison.propTypes = {
  valeur: PropTypes.string,
  onChange: PropTypes.func,
  compact: PropTypes.bool,
  saisonActuelle: PropTypes.string,
};
