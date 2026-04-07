"use client";

// Sert à vérifier le type des props
import PropTypes from "prop-types";

// Hook React pour gérer l'état du menu (ouvert / fermé)
import { useState } from "react";

// Liste des actions affichées dans le menu
const ACTIONS = [
  { label: "Blog", emoji: "📝", href: "/blog" },
  { label: "Charte", emoji: "🎨", href: "/charte" },
];

// Composant du bouton d'action
export default function BoutonAction({ couleurFond, couleurTexte }) {
  // État du menu +
  const [ouvert, setOuvert] = useState(false);

  return (
    <div className="bouton-action-wrapper">
      {/* Si le menu est ouvert, on affiche les actions */}
      {ouvert && (
        <div className="bouton-action-menu">
          {/* On parcourt le tableau ACTIONS pour créer les liens */}
          {ACTIONS.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="bouton-action-item"
              style={{
                backgroundColor: couleurFond,
                color: couleurTexte,
              }}
            >
              {/* Emoji de l'action */}
              <span>{action.emoji}</span>

              {/* Nom de l'action */}
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Bouton principal qui ouvre ou ferme le menu */}
      <button
        className="bouton-action-principal"
        style={{ backgroundColor: couleurFond, color: couleurTexte }}
        onClick={() => setOuvert(!ouvert)}
      >
        <span
          className="bouton-action-icone"
          style={{
            // Le + tourne quand le menu est ouvert
            transform: ouvert ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
    </div>
  );
}

// Types attendus pour les props du composant
BoutonAction.propTypes = {
  couleurFond: PropTypes.string,
  couleurTexte: PropTypes.string,
};
