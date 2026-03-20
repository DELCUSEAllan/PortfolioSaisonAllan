import Link from "next/link";

export default function BarreNavigation() {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
        fontSize: "12px",
        color: "#6B7280", // couleur de texte cohérente avec ta palette
      }}
    >
      <Link href="/">Accueil</Link>
      <Link href="/competences">Compétences</Link>
      <Link href="/projets">Projets</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
