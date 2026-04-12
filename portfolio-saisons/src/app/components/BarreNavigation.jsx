"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBolt, FaBriefcase, FaEnvelope } from "react-icons/fa";
import PropTypes from "prop-types";

// Liste des liens de navigation avec leur route, label et icône
const LIENS = [
  { href: "/",            label: "Accueil",     icone: FaHome },
  { href: "/competences", label: "Compétences", icone: FaBolt },
  { href: "/projets",     label: "Projets",     icone: FaBriefcase },
  { href: "/contact",     label: "Contact",     icone: FaEnvelope },
];

export default function BarreNavigation({ couleurActive, couleurTexte, saisonActuelle }) {
  // Récupère l'URL de la page actuellement affichée
  const pathname = usePathname();

  // Calcule la couleur de fond de la nav selon la saison
  let fondNav;
  if (saisonActuelle === "nuit") {
    fondNav = "#161B22";
  } else {
    fondNav = "#FFFFFF";
  }

  // Calcule la couleur de la bordure selon la saison
  let bordureNav;
  if (saisonActuelle === "nuit") {
    bordureNav = "rgba(88, 166, 255, 0.3)";
  } else {
    bordureNav = "rgba(0, 0, 0, 0.08)";
  }

  return (
    <nav
      className="barre-navigation"
      style={{
        backgroundColor: fondNav,
        borderTop: `1px solid ${bordureNav}`,
      }}
    >
      {/* On parcourt chaque lien du tableau LIENS pour créer les boutons de navigation */}
      {LIENS.map((lien) => {
        // Récupère le composant icône du lien (ex: FaHome)
        const Icone = lien.icone;

        // Vérifie si ce lien correspond à la page actuellement affichée
        const estActif = pathname === lien.href;

        let couleurLien;
        if (estActif) {
            couleurLien = couleurActive;
        } else {
            couleurLien = couleurTexte;
        }

        return (
          <Link
            key={lien.href}
            href={lien.href}
            className="barre-navigation-lien"
            // Couleur différente si le lien est actif ou non
            style={{ color: couleurLien }}
          >
            <Icone size={20} />
            <span>{lien.label}</span>

            {/* Affiche l'indicateur uniquement sous le lien actif */}
            {estActif && (
              <span
                className="barre-navigation-indicateur"
                style={{ backgroundColor: couleurActive }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

// Définition des types de props attendus par le composant
BarreNavigation.propTypes = {
  couleurActive: PropTypes.string,
  couleurTexte: PropTypes.string,
  saisonActuelle: PropTypes.string,
};
