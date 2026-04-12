// Ce composant s'exécute côté navigateur car il utilise des hooks React (useState, useEffect)
"use client";

import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SAISONS, COULEURS_ICONES } from "../config/couleursSaisons";
import { CONTACT } from "../config/contenuAccueil";
import { useSaison } from "../context/SaisonContext";
import "../styles/contact/contact.css";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import TexteFormat from "../components/TexteFormat";

// Chargement côté navigateur pour optimiser les performances
const BarreNavigation = dynamic(() => import("../components/BarreNavigation"), { ssr: false });

// Génère un calcul mathématique aléatoire pour le captcha et return la bonne réponse
function genererCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, reponse: a + b };
}

// Calcule le dégradé de fond selon la saison active
// nuit = dégradé fixe, autres = couleurs dynamiques
function calculerBackground(saisonActuelle, saison) {
  if (saisonActuelle === "nuit") {
    return "linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%)";
  }
  return `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`;
}

// Styles des champs de formulaire selon la saison
// nuit = champs sombres
const STYLES_CHAMP = {
  nuit: {
    backgroundColor: "rgba(31, 41, 55, 0.9)",
    color: "#E6EDF3",
    borderColor: "rgba(88, 166, 255, 0.3)",
  },
  defaut: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    color: "inherit",
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
};

export default function Contact() {
  // Récupère la saison actuelle depuis le contexte global
  const { saisonActuelle } = useSaison();
  // Récupère l'objet complet des couleurs pour la saison active
  const saison = SAISONS[saisonActuelle];
  // Récupère les couleurs des icônes selon la saison
  const icones = COULEURS_ICONES[saisonActuelle] ?? COULEURS_ICONES.printemps;
  // Référence vers le formulaire HTML pour l'envoyer via EmailJS
  const formulaireRef = useRef(null);
  // Sélectionne le bon style de champ selon la saison
  const styleChamp = saisonActuelle === "nuit" ? STYLES_CHAMP.nuit : STYLES_CHAMP.defaut;

  // État du captcha : contient les deux chiffres et la bonne réponse
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, reponse: 0 });

  // Génère un nouveau captcha au chargement de la page
  // Le tableau vide [] signifie que ça s'exécute qu'une seule fois
  useEffect(() => {
    setCaptcha(genererCaptcha());
  }, []);

  // Réponse utilisateur
  const [reponseCaptcha, setReponseCaptcha] = useState("");

  // Statut de l'envoi : null = rien, "captcha" = mauvaise réponse,
  // "succes" = envoyé, "erreur" = problème serveur
  const [statut, setStatut] = useState(null);

  // true pendant l'envoi pour désactiver le bouton et éviter les doubles envois
  const [envoi, setEnvoi] = useState(false);

  // Valeurs des champs du formulaire
  const [champs, setChamps] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  // Met à jour le champ à ce que l'utilisateur tape
  // e.target.name récupère le nom du champ (nom, email, sujet, message)
  // ...champs copie tous les champs existants avant d'en modifier un seul
  function handleChange(e) {
    setChamps({ ...champs, [e.target.name]: e.target.value });
  }

  // Gère l'envoi du formulaire
  // async/await permet d'attendre la réponse du serveur EmailJS avant de continuer
  async function handleEnvoyer(e) {
    // Empêche le rechargement de la page
    e.preventDefault();

    // Vérifie que la réponse au captcha est correcte avant d'envoyer
    if (Number.parseInt(reponseCaptcha) !== captcha.reponse) {
      setStatut("captcha");
      return;
    }

    // Active l'état d'envoi pour désactiver le bouton
    setEnvoi(true);
    setStatut(null);

    try {
      // Envoie le formulaire via EmailJS avec les clés stockées dans les variables d'environnement
      // Les variables NEXT_PUBLIC_ accessibles côté navigateur
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formulaireRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      // Envoi réussi : on vide le formulaire et on génère un nouveau captcha
      setStatut("succes");
      setChamps({ nom: "", email: "", sujet: "", message: "" });
      setReponseCaptcha("");
      setCaptcha(genererCaptcha());
    } catch {
      // Erreur serveur : on affiche un message d'erreur
      setStatut("erreur");
    } finally {
      // Dans tous les cas on réactive le bouton
      setEnvoi(false);
    }
  }

  return (
    <>
      <main
        className="contact-page"
        style={{
          background: calculerBackground(saisonActuelle, saison),
          color: saison.textePrincipal,
        }}
      >
        <div className="contact-contenu">
          {/* Titre caché sur desktop via CSS media query */}
          <h1 className="contact-titre">Contact</h1>
          <p className="contact-intro">
             <TexteFormat texte= "Une **question**, une **opportunité** de **stage** ou juste envie de **discuter** ?" />
          </p>

          {/* Icônes de contact colorées selon la saison */}
          <div className="contact-icones">
            {/* Lien email qui ouvre le client mail par défaut de l'utilisateur */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="contact-icone"
              style={{ backgroundColor: icones[0].fond, color: icones[0].texte }}
              aria-label="Envoyer un email"
            >
              <FaEnvelope size={22} />
            </a>
            {/* target="_blank" ouvre dans un nouvel onglet */}
            {/* rel="noopener noreferrer" est une sécurité pour les liens externes */}
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icone"
              style={{ backgroundColor: icones[1].fond, color: icones[1].texte }}
              aria-label="Voir le profil LinkedIn"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icone"
              style={{ backgroundColor: icones[2].fond, color: icones[2].texte }}
              aria-label="Voir le profil GitHub"
            >
              <FaGithub size={22} />
            </a>
          </div>

          {/* ref={formulaireRef} permet à EmailJS de lire les valeurs des champs */}
          {/* onSubmit déclenche handleEnvoyer à la soumission du formulaire */}
          <form
            ref={formulaireRef}
            className="contact-formulaire"
            onSubmit={handleEnvoyer}
          >
            {/* Chaque champ est contrôlé par React via value et onChange */}
            <input
              type="text"
              name="nom"
              placeholder="Ton nom"
              className="contact-champ"
              style={styleChamp}
              value={champs.nom}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Ton email"
              className="contact-champ"
              style={styleChamp}
              value={champs.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="sujet"
              placeholder="Sujet"
              className="contact-champ"
              style={styleChamp}
              value={champs.sujet}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Ton message..."
              className="contact-champ contact-textarea"
              style={styleChamp}
              value={champs.message}
              onChange={handleChange}
              required
            />

            {/* Captcha : l'utilisateur doit résoudre un calcul simple pour prouver qu'il n'est pas un robot */}
            <div className="contact-captcha">
              <label className="contact-captcha-label">
                Anti-robot : combien font {captcha.a} + {captcha.b} ?
              </label>
              <input
                type="number"
                placeholder="Ex : 14"
                className="contact-champ contact-captcha-input"
                style={styleChamp}
                value={reponseCaptcha}
                onChange={(e) => setReponseCaptcha(e.target.value)}
                required
              />
            </div>

            {/* Affichage conditionnel des messages selon le statut de l'envoi */}
            {statut === "captcha" && (
              <p className="contact-message contact-message-erreur">
                Mauvaise réponse au calcul, réessaie !
              </p>
            )}
            {statut === "succes" && (
              <p className="contact-message contact-message-succes">
                Message envoyé avec succès !
              </p>
            )}
            {statut === "erreur" && (
              <p className="contact-message contact-message-erreur">
                Une erreur est survenue, réessaie plus tard.
              </p>
            )}

            {/* disabled={envoi} désactive le bouton pendant l'envoi pour éviter les doubles soumissions */}
            <button
              type="submit"
              className="contact-bouton-envoyer"
              style={{
                backgroundColor: saison.boutonPrincipalFond,
                color: saison.boutonPrincipalTexte,
              }}
              disabled={envoi}
            >
              {envoi ? "Envoi en cours..." : "Envoyer 📩"}
            </button>
          </form>

          {/* Lien vers le CV PDF qui s'ouvre dans un nouvel onglet */}
          <div className="contact-cv">
            <a
              href="/CV Delcuse Allan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-bouton-cv"
              style={{
                backgroundColor: saison.boutonPrincipalFond,
                color: saison.boutonPrincipalTexte,
              }}
            >
              📄 Télécharger mon CV
            </a>
          </div>
        </div>
      </main>

      {/* Barre de navigation avec couleurs dynamiques selon la saison */}
      <BarreNavigation
        couleurActive={saison.boutonPrincipalFond}
        couleurTexte={saison.texteSecondaire}
        saisonActuelle={saisonActuelle}
      />
    </>
  );
}
