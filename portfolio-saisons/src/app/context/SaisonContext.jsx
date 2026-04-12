// Ce composant s'exécute côté navigateur car il lit le localStorage
"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useSyncExternalStore,
} from "react";
import { determinerSaisonParDate } from "../utils/saisons";
import PropTypes from "prop-types";

// Calculé une seule fois au chargement du module, pas à chaque rendu
const saisonAutoParDate = determinerSaisonParDate(new Date());

// Crée le contexte qui va partager la saison entre tous les composants de l'application
// null = valeur par défaut avant que le Provider soit monté
const SaisonContext = createContext(null);

// Fonction appelée par useSyncExternalStore pour s'abonner aux changements du localStorage
// Quand le localStorage change (autre onglet par exemple), callback est appelé pour mettre à jour l'interface
function subscribe(callback) {
  globalThis.addEventListener("storage", callback);
  return () => globalThis.removeEventListener("storage", callback);
}

// Lit la saison sauvegardée dans le localStorage côté navigateur
// Si rien n'est sauvegardé, return "auto"
function getSnapshot() {
  return globalThis.localStorage?.getItem("saisonChoisie") || "auto";
}

// Version serveur de getSnapshot : retourne toujours "auto"
function getServerSnapshot() {
  return "auto";
}

// Composant Provider qui enveloppe toute l'application
// Il rend la saison accessible à tous les composants enfants via useSaison()
export function SaisonProvider({ children }) {
  // useSyncExternalStore synchronise le localStorage avec React
  // Évite les problèmes d'hydratation entre serveur et navigateur
  const saisonStockee = useSyncExternalStore(
    subscribe, // s'abonner aux changements
    getSnapshot, // lire la valeur côté navigateur
    getServerSnapshot // lire la valeur côté serveur
  );

  // override  change la saison immédiatement sans attendre le localStorage
  // null = pas de changement manuel, utilise contenu du localStorage
  const [override, setOverride] = useState(null);

  // Si l'utilisateur vient de changer la saison (override), on l'utilise, sinon -> localStorage
  const saisonSelectionnee = override ?? saisonStockee;

  // Sauvegarde la nouvelle saison dans le localStorage et le met à jour immédiatement
  function changerSaison(nouvelleSaison) {
    setOverride(nouvelleSaison);
    localStorage.setItem("saisonChoisie", nouvelleSaison);
  }

  // Si l'utilisateur -> "auto" = saison calculée par la date, sinon -> saison choisie manuellement
  const saisonActuelle =
    saisonSelectionnee === "auto" ? saisonAutoParDate : saisonSelectionnee;

  // useMemo évite de recréer cet objet à chaque rendu, recrée que si saisonSelectionnee ou saisonActuelle changent
  const valeur = useMemo(
    () => ({
      saisonSelectionnee,
      setSaisonSelectionnee: changerSaison, // fonction pour changer la saison
      saisonActuelle, // saison réellement affichée
    }),
    [saisonSelectionnee, saisonActuelle]
  );

  // Rend la valeur accessible à tous les composants enfants
  return (
    <SaisonContext.Provider value={valeur}>
      {children}
    </SaisonContext.Provider>
  );
}

// Validation des props : children doit être un noeud React (composants, texte, etc.)
SaisonProvider.propTypes = {
  children: PropTypes.node,
};

// Hook personnalisé qui permet à n'importe quel composant de lire la saison
export function useSaison() {
  return useContext(SaisonContext);
}
