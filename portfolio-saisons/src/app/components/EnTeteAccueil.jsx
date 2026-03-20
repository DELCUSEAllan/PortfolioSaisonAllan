import SelectionSaison from "./SelectionSaison";

export default function EnTeteAccueil({ valeurSaison, onChangeSaison }) {
  return (
    <header className="en-tete-accueil">
      <div className="en-tete-ligne-superieure">
        <div className="en-tete-placeholder-saison" style={{ background: "none" }}>
          <SelectionSaison valeur={valeurSaison} onChange={onChangeSaison} compact />
        </div>
      </div>

      <div className="en-tete-contenu">
        <div className="en-tete-avatar">
          <span className="en-tete-avatar-lettre">A</span>
        </div>

        <div className="en-tete-textes">
          <h1 className="en-tete-nom">DELCUSE Allan</h1>
          <p className="en-tete-sous-titre">
            Bachelor Développement Informatique · Arras
          </p>
        </div>
      </div>
    </header>
  );
}
