export default function EnTeteAccueil() {
  return (
    <header className="en-tete-accueil">
      <div className="en-tete-ligne-superieure">
        <div className="en-tete-placeholder-saison">
          {/* Ici on mettra plus tard le select de saison */}
        </div>
      </div>

      <div className="en-tete-contenu">
        <div className="en-tete-avatar">
          <span className="en-tete-avatar-lettre">A</span>
        </div>

        <div className="en-tete-textes">
          <h1 className="en-tete-nom">Ton Prénom</h1>
          <p className="en-tete-sous-titre">
            Développeur Web &amp; Java · Arras
          </p>
        </div>
      </div>
    </header>
  );
}
