"use client";

import { useEffect, useRef } from "react";

// Nombre d'étoiles affichées
const NOMBRE_ETOILES = 80;

// Crée une étoile avec des valeurs aléatoires
function creerEtoile(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    rayon: 0.5 + Math.random() * 1.5,
    opaciteBase: 0.3 + Math.random() * 0.7,
    vitessePulse: 0.01 + Math.random() * 0.02,
    phase: Math.random() * Math.PI * 2,
  };
}

// Dessine une étoile
function dessinerEtoile(ctx, etoile, temps) {
  // Fait varier l'opacité pour donner un effet de brillance
  const opacite =
    etoile.opaciteBase *
    (0.5 + 0.5 * Math.sin(temps * etoile.vitessePulse * 60 + etoile.phase));

  ctx.save();
  ctx.beginPath();
  ctx.arc(etoile.x, etoile.y, etoile.rayon, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(230, 237, 243, ${opacite})`;
  ctx.shadowColor = "rgba(88, 166, 255, 0.8)";
  ctx.shadowBlur = 4;
  ctx.fill();
  ctx.restore();
}

export default function CanvasNuit() {
  // Référence vers le canvas
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let etoiles = [];
    let animationId;

    // Donne la bonne taille au canvas
    function redimensionner() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Recrée les étoiles après redimensionnement
      etoiles = Array.from({ length: NOMBRE_ETOILES }, () => creerEtoile(canvas));
    }

    // Fonction principale d'animation
    function animer(temps) {
      // Efface le canvas avant de redessiner
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessine toutes les étoiles
      etoiles.forEach((etoile) => {
        dessinerEtoile(ctx, etoile, temps);
      });

      // Relance l'animation
      animationId = requestAnimationFrame(animer);
    }

    // Prépare le canvas et les étoiles
    redimensionner();

    // Lance l'animation
    animationId = requestAnimationFrame(animer);

    // Recalcule si la fenêtre change de taille
    window.addEventListener("resize", redimensionner);

    // Nettoyage quand le composant disparaît
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", redimensionner);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-nuit" />;
}
