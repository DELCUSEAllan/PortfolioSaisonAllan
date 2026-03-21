"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBolt, FaBriefcase, FaEnvelope } from "react-icons/fa";
import PropTypes from "prop-types";

const LIENS = [
  { href: "/", label: "Accueil", icone: FaHome },
  { href: "/competences", label: "Compétences", icone: FaBolt },
  { href: "/projets", label: "Projets", icone: FaBriefcase },
  { href: "/contact", label: "Contact", icone: FaEnvelope },
];

export default function BarreNavigation({ couleurActive, couleurTexte }) {
  const pathname = usePathname();

  return (
    <nav className="barre-navigation">
      {LIENS.map((lien) => {
        const Icone = lien.icone;
        const estActif = pathname === lien.href;

        return (
          <Link
            key={lien.href}
            href={lien.href}
            className="barre-navigation-lien"
            style={{ color: estActif ? couleurActive : couleurTexte }}
          >
            <Icone size={20} />
            <span>{lien.label}</span>
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

BarreNavigation.propTypes = {
  couleurActive: PropTypes.string,
  couleurTexte: PropTypes.string,
};
