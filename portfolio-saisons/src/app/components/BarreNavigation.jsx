// src/app/components/BarreNavigation.jsx

import Link from "next/link";
import { FaHome, FaBolt, FaBriefcase, FaEnvelope } from "react-icons/fa";
import PropTypes from "prop-types";

BarreNavigation.propTypes = {
  couleurActive: PropTypes.string,
  couleurTexte: PropTypes.string,
};

export default function BarreNavigation({ couleurActive, couleurTexte }) {
  const liens = [
    { href: "/", label: "Accueil", icone: FaHome },
    { href: "/competences", label: "Compétences", icone: FaBolt },
    { href: "/projets", label: "Projets", icone: FaBriefcase },
    { href: "/contact", label: "Contact", icone: FaEnvelope },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "64px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      {liens.map((lien) => {
        const Icone = lien.icone;
        return (
          <Link
            key={lien.href}
            href={lien.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              color: couleurTexte || "#6B7280",
              fontSize: "10px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            <Icone size={20} color={couleurActive || "#A2D39C"} />
            {lien.label}
          </Link>
        );
      })}
    </nav>
  );
}
