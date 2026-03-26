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

const saisonAutoParDate = determinerSaisonParDate(new Date());
const SaisonContext = createContext(null);

function subscribe(callback) {
  globalThis.addEventListener("storage", callback);
  return () => globalThis.removeEventListener("storage", callback);
}

function getSnapshot() {
  return globalThis.localStorage?.getItem("saisonChoisie") || "auto";
}

function getServerSnapshot() {
  return "auto";
}

export function SaisonProvider({ children }) {
  const saisonStockee = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const [override, setOverride] = useState(null);
  const saisonSelectionnee = override ?? saisonStockee;

  function changerSaison(nouvelleSaison) {
    setOverride(nouvelleSaison);
    localStorage.setItem("saisonChoisie", nouvelleSaison);
  }

  const saisonActuelle =
    saisonSelectionnee === "auto" ? saisonAutoParDate : saisonSelectionnee;

  const valeur = useMemo(
    () => ({
      saisonSelectionnee,
      setSaisonSelectionnee: changerSaison,
      saisonActuelle,
    }),
    [saisonSelectionnee, saisonActuelle]
  );

  return (
    <SaisonContext.Provider value={valeur}>
      {children}
    </SaisonContext.Provider>
  );
}

SaisonProvider.propTypes = {
  children: PropTypes.node,
};

export function useSaison() {
  return useContext(SaisonContext);
}
