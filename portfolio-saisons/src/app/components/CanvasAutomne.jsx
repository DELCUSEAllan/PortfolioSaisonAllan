"use client";

import { useEffect, useRef } from "react";

const NOMBRE_FEUILLES = 8;

// Couleurs des feuilles
const COULEURS = ["#D4A843", "#C0622A", "#8B3A1A", "#B85C2A", "#E8B84B"];

// Crée une feuille avec des valeurs aléatoires
function creerFeuille(canvas) {
  return {
    // Position de départ
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,

    // Taille de la feuille
    taille: 6 + Math.random() * 8,

    // Vitesse de déplacement
    vitesseX: 0.4 + Math.random() * 0.8,
    vitesseY: 0.7 + Math.random() * 1,

    // Rotation de la feuille
    rotation: Math.random() * Math.PI * 2,
    vitesseRotation: (Math.random() - 0.5) * 0.04,

    // Transparence
    opacite: 0.7 + Math.random() * 0.3,

    // Sert à faire bouger la feuille un peu sur le côté
    oscillation: Math.random() * Math.PI * 2,
    vitesseOscillation: 0.02 + Math.random() * 0.02,

    // Couleur choisie au hasard
    couleur: COULEURS[Math.floor(Math.random() * COULEURS.length)],
  };
}

// Dessine une feuille sur le canvas
function dessinerFeuille(ctx, feuille) {
  ctx.save();

  // Déplace le repère au niveau de la feuille
  ctx.translate(feuille.x, feuille.y);

  // Fait tourner la feuille
  ctx.rotate(feuille.rotation);

  // Applique sa transparence
  ctx.globalAlpha = feuille.opacite;

  const t = feuille.taille;

  // Forme principale de la feuille
  ctx.beginPath();
  ctx.moveTo(0, -t);
  ctx.bezierCurveTo(t * 0.8, -t * 0.5, t * 0.8, t * 0.5, 0, t);
  ctx.bezierCurveTo(-t * 0.8, t * 0.5, -t * 0.8, -t * 0.5, 0, -t);
  ctx.fillStyle = feuille.couleur;
  ctx.fill();

  // Trait au milieu de la feuille
  ctx.beginPath();
  ctx.moveTo(0, -t * 0.8);
  ctx.lineTo(0, t * 0.8);
  ctx.strokeStyle = "rgba(100, 40, 10, 0.4)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

export default function CanvasAutomne() {
  // Référence vers le canvas
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Donne au canvas la taille de son bloc HTML
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Crée toutes les feuilles au départ
    const feuilles = Array.from(
      { length: NOMBRE_FEUILLES },
      () => creerFeuille(canvas)
    );

    let animationId;

    // Fonction principale d'animation
    function animer() {
      // Efface tout le canvas avant de redessiner
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      feuilles.forEach((feuille) => {
        // Fait bouger la feuille
        feuille.oscillation += feuille.vitesseOscillation;
        feuille.x += feuille.vitesseX + Math.sin(feuille.oscillation) * 0.8;
        feuille.y += feuille.vitesseY;
        feuille.rotation += feuille.vitesseRotation;

        // Si la feuille sort de l'écran, on la recrée en haut
        if (feuille.y > canvas.height + 20 || feuille.x > canvas.width + 20) {
          const nouvelle = creerFeuille(canvas);
          nouvelle.x = Math.random() * canvas.width * 0.3;
          nouvelle.y = -20;
          Object.assign(feuille, nouvelle);
        }

        // Dessine la feuille mise à jour
        dessinerFeuille(ctx, feuille);
      });

      // Relance l'animation à l'image suivante
      animationId = requestAnimationFrame(animer);
    }

    animer();

    // Nettoie l'animation quand le composant disparaît
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="canvas-automne" />;
}
