"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaGithub } from "react-icons/fa";

// Styles visuels pour chaque saison
// filtreCoin -> filtre CSS appliqué sur les coins décoratifs pour les colorier selon la saison
/* sepia(1) → transforme en tons dorés comme une vieille photo */
/* saturate(3) → intensifie les couleurs x3 */
/* hue-rotate(180deg) → pivote la teinte de 180° sur le cercle chromatique */
const STYLES_SAISON = {
  printemps: { filtreCoin: "none",                                                    vignetteFond: "#F5D7E3", vignetteTexte: "#111827", carteFond: "rgba(255, 255, 255, 0.65)" },
  ete:       { filtreCoin: "sepia(1) saturate(3) hue-rotate(180deg)",                 vignetteFond: "#F2C46D", vignetteTexte: "#2C2420", carteFond: "rgba(255, 255, 255, 0.65)" },
  automne:   { filtreCoin: "sepia(1) saturate(3) hue-rotate(20deg)",                  vignetteFond: "#D4A843", vignetteTexte: "#2A1F14", carteFond: "rgba(255, 255, 255, 0.65)" },
  hiver:     { filtreCoin: "sepia(1) saturate(2) hue-rotate(190deg) brightness(1.4)", vignetteFond: "#E8F0F8", vignetteTexte: "#1E2A3A", carteFond: "rgba(255, 255, 255, 0.65)" },
  nuit:      { filtreCoin: "sepia(1) saturate(2) hue-rotate(200deg) brightness(0.6)", vignetteFond: "#1F2937", vignetteTexte: "#E6EDF3", carteFond: "rgba(30, 41, 59, 0.85)" },
};

export default function CarteProjet({ projet, index, couleurPrincipal, couleurTexte, saisonActuelle }) {
  // Récupère les styles de la saison active
  // Si la saison n'existe pas dans le tableau = printemps par défaut
  const styles = STYLES_SAISON[saisonActuelle] ?? STYLES_SAISON.printemps;

  // Couleur du texte de la carte selon la saison
  let couleurTexteCarte;
  if (saisonActuelle === "nuit") {
    couleurTexteCarte = "#E6EDF3";
  } else {
    couleurTexteCarte = undefined; // undefined = on laisse le CSS gérer
  }

  // Si le projet a un GitHub, toute la carte devient un lien cliquable, sinon div normale non cliquable
  const CarteContenu = projet.github ? motion.a : motion.div;

  return (
    // initial -> état de départ (invisible, réduit, décalé vers le bas)
    // animate -> état final (visible, taille normale, à la bonne position)
    // whileHover -> légère augmentation de taille au survol de la souris
    <CarteContenu
      className="carte-projet"
      href={projet.github || undefined}
      /* Ouvre le lien GitHub dans un nouvel onglet de façon sécurisée */
      /* Si pas de GitHub, ces attributs n'existent pas */
      target={projet.github ? "_blank" : undefined}
      rel={projet.github ? "noopener noreferrer" : undefined}
      style={{ backgroundColor: styles.carteFond, color: couleurTexteCarte }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      {/* Coins décoratifs aux 4 coins de la carte, colorés selon la saison */}
      <div className="carte-coin carte-coin-haut-droit" style={{ filter: styles.filtreCoin }} />
      <div className="carte-coin carte-coin-bas-gauche" style={{ filter: styles.filtreCoin }} />
      <div className="carte-coin carte-coin-haut-gauche" style={{ filter: styles.filtreCoin }} />
      <div className="carte-coin carte-coin-bas-droit" style={{ filter: styles.filtreCoin }} />

      {/* En-tête avec le nom du projet et l'icône GitHub */}
      <div className="carte-projet-entete">
        <h2 className="carte-projet-nom">{projet.nom}</h2>

        {/* L'icône GitHub n'est affichée que si le projet en a un, && = if sans else */}
        {projet.github && (
          <FaGithub size={20} style={{ color: couleurPrincipal }} />
        )}
      </div>

      {/* Description courte du projet */}
      <p className="carte-projet-description">{projet.description}</p>

      {/* Section "Ce que j'ai appris" */}
      {/* &apos; est le code HTML pour l'apostrophe ' */}
      <div className="carte-projet-section">
        <span className="carte-projet-label">📚 Ce que j&apos;ai appris</span>
        <p className="carte-projet-texte">{projet.appris}</p>
      </div>

      {/* Section "Où j'en suis" */}
      <div className="carte-projet-section">
        <span className="carte-projet-label">🚀 Où j&apos;en suis</span>
        <p className="carte-projet-texte">{projet.statut}</p>
      </div>

      {/* Liste des technologies utilisées sous forme de badges */}
      {/* On parcourt le tableau technos et on crée un badge pour chacune */}
      <div className="carte-projet-technos">
        {projet.technos.map((techno) => (
          <span
            key={techno}
            className="carte-projet-techno"
            style={{
              backgroundColor: styles.vignetteFond,
              color: styles.vignetteTexte,
              border: `1px solid ${couleurPrincipal}`,
            }}
          >
            {techno}
          </span>
        ))}
      </div>
    </CarteContenu>
  );
}

// Définition et validation des types de données reçues en props
// PropTypes.shape → vérifie que l'objet a bien les bonnes propriétés avec les bons types
// PropTypes.arrayOf → vérifie que c'est bien un tableau de strings
CarteProjet.propTypes = {
  projet: PropTypes.shape({
    id: PropTypes.string,
    nom: PropTypes.string,
    description: PropTypes.string,
    appris: PropTypes.string,
    statut: PropTypes.string,
    technos: PropTypes.arrayOf(PropTypes.string),
    github: PropTypes.string,
  }),
  index: PropTypes.number,
  couleurPrincipal: PropTypes.string,
  couleurTexte: PropTypes.string,
  saisonActuelle: PropTypes.string,
};
