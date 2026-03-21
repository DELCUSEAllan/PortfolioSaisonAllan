"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { determinerSaisonParDate } from "../utils/saisons";
import PropTypes from "prop-types";

const saisonAutoParDate = determinerSaisonParDate(new Date());
const SaisonContext = createContext(null);

export function SaisonProvider({ children }) {
  const [saisonSelectionnee, setSaisonSelectionnee] = useState("auto");
  const saisonActuelle = saisonSelectionnee === "auto" ? saisonAutoParDate : saisonSelectionnee;

  const valeur = useMemo(() => ({
    saisonSelectionnee,
    setSaisonSelectionnee,
    saisonActuelle,
  }), [saisonSelectionnee, saisonActuelle]);

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
