"use client";

import { useState } from "react";

const ACTIONS = [
  { label: "Blog", emoji: "📝", href: "/blog" },
  { label: "Charte", emoji: "🎨", href: "/charte" },
];

export default function BoutonAction({ couleurFond, couleurTexte }) {
  const [ouvert, setOuvert] = useState(false);

  return (
    <div className="bouton-action-wrapper">

      {ouvert && (
        <div className="bouton-action-menu">
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
              <span>{action.emoji}</span>
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      )}

      <button
        className="bouton-action-principal"
        style={{ backgroundColor: couleurFond, color: couleurTexte }}
        onClick={() => setOuvert(!ouvert)}
      >
        <span
          className="bouton-action-icone"
          style={{
            transform: ouvert ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

    </div>
  );
}
