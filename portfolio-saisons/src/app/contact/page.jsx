"use client";

import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SAISONS, COULEURS_ICONES } from "../config/couleursSaisons";
import { CONTACT } from "../config/contenuAccueil";
import { useSaison } from "../context/SaisonContext";
import "../styles/contact/contact.css";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const BarreNavigation = dynamic(() => import("../components/BarreNavigation"), { ssr: false });

function genererCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, reponse: a + b };
}

function calculerBackground(saisonActuelle, saison) {
  if (saisonActuelle === "nuit") {
    return "linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%)";
  }
  return `linear-gradient(180deg, ${saison.badgeFond} 0%, ${saison.fondPage} 40%, ${saison.boutonSecondaireFond} 100%)`;
}

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
  const { saisonActuelle } = useSaison();
  const saison = SAISONS[saisonActuelle];
  const icones = COULEURS_ICONES[saisonActuelle] ?? COULEURS_ICONES.printemps;
  const formulaireRef = useRef(null);
  const styleChamp = saisonActuelle === "nuit" ? STYLES_CHAMP.nuit : STYLES_CHAMP.defaut;

  const [captcha, setCaptcha] = useState({ a: 0, b: 0, reponse: 0 });

  useEffect(() => {
    setCaptcha(genererCaptcha());
  }, []);

  const [reponseCaptcha, setReponseCaptcha] = useState("");
  const [statut, setStatut] = useState(null);
  const [envoi, setEnvoi] = useState(false);

  const [champs, setChamps] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  function handleChange(e) {
    setChamps({ ...champs, [e.target.name]: e.target.value });
  }

  async function handleEnvoyer(e) {
    e.preventDefault();

    if (Number.parseInt(reponseCaptcha) !== captcha.reponse) {
      setStatut("captcha");
      return;
    }

    setEnvoi(true);
    setStatut(null);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formulaireRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatut("succes");
      setChamps({ nom: "", email: "", sujet: "", message: "" });
      setReponseCaptcha("");
      setCaptcha(genererCaptcha());
    } catch {
      setStatut("erreur");
    } finally {
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
          <h1 className="contact-titre">Contact</h1>
          <p className="contact-intro">
            Une question, une opportunité de stage ou juste envie de discuter ?
          </p>

          <div className="contact-icones">
            <a
              href={`mailto:${CONTACT.email}`}
              className="contact-icone"
              style={{ backgroundColor: icones[0].fond, color: icones[0].texte }}
              aria-label="Envoyer un email"
            >
              <FaEnvelope size={22} />
            </a>
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

          <form
            ref={formulaireRef}
            className="contact-formulaire"
            onSubmit={handleEnvoyer}
          >
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

      <BarreNavigation
        couleurActive={saison.boutonPrincipalFond}
        couleurTexte={saison.texteSecondaire}
        saisonActuelle={saisonActuelle}
        />
    </>
  );
}
