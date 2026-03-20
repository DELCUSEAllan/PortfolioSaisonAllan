export function determinerSaisonParDate(date = new Date()) {
  const annee = date.getFullYear();

  const printemps = new Date(annee, 2, 20); // 20 mars (mois 2 = mars)
  const ete = new Date(annee, 5, 21);       // 21 juin
  const automne = new Date(annee, 8, 23);   // 23 septembre
  const hiver = new Date(annee, 11, 21);    // 21 décembre

  if (date >= hiver || date < printemps) {
    return "hiver";
  } else if (date >= printemps && date < ete) {
    return "printemps";
  } else if (date >= ete && date < automne) {
    return "ete";
  } else {
    return "automne";
  }
}
