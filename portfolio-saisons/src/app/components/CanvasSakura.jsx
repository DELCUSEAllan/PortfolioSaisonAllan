// src/app/components/CanvasSakura.jsx

"use client";

import { useEffect, useRef } from "react";

// Nombre de pétales affichés
const NOMBRE_PETALES = 5;

// Couleurs possibles des pétales
const COULEURS_PETALES = ["#FFD6E0", "#FFB7C5", "#FF8FA3"];

// Crée un pétale avec des valeurs aléatoires
function creerPetale(canvas) {
  return {
    // Position de départ
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,

    // Taille du pétale
    taille: 5 + Math.random() * 7,

    // Vitesse de déplacement
    vitesseX: 0.5 + Math.random() * 1,
    vitesseY: 0.8 + Math.random() * 1,

    // Rotation du pétale
    rotation: Math.random() * Math.PI * 2,
    vitesseRotation: (Math.random() - 0.5) * 0.05,

    // Transparence
    opacite: 0.6 + Math.random() * 0.4,

    // Sert à faire bouger le pétale doucement de gauche à droite
    oscillation: Math.random() * Math.PI * 2,
    vitesseOscillation: 0.02 + Math.random() * 0.02,

    // Couleur choisie au hasard
    couleur: COULEURS_PETALES[Math.floor(Math.random() * COULEURS_PETALES.length)],
  };
}

// Dessine un pétale
function dessinerPetale(ctx, petale) {
  ctx.save();

  // Déplace le repère à la position du pétale
  ctx.translate(petale.x, petale.y);

  // Fait tourner le pétale
  ctx.rotate(petale.rotation);

  // Applique la transparence
  ctx.globalAlpha = petale.opacite;

  // Forme du pétale
  ctx.beginPath();
  ctx.ellipse(0, 0, petale.taille, petale.taille * 0.6, 0, 0, Math.PI * 2);
  ctx.fillStyle = petale.couleur;
  ctx.fill();

  // Trait léger au milieu du pétale
  ctx.beginPath();
  ctx.moveTo(-petale.taille * 0.8, 0);
  ctx.lineTo(petale.taille * 0.8, 0);
  ctx.strokeStyle = "rgba(255, 100, 130, 0.3)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

export default function CanvasSakura() {
  // Référence vers le canvas
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Donne au canvas la taille de son bloc
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Crée tous les pétales au départ
    const petales = Array.from(
      { length: NOMBRE_PETALES },
      () => creerPetale(canvas)
    );

    let animationId;

    // Fonction principale d'animation
    function animer() {
      // Efface le canvas avant de redessiner
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petales.forEach((petale) => {
        // Fait bouger doucement le pétale sur le côté
        petale.oscillation += petale.vitesseOscillation;
        petale.x += petale.vitesseX + Math.sin(petale.oscillation) * 0.8;

        // Fait descendre le pétale
        petale.y += petale.vitesseY;

        // Fait tourner le pétale
        petale.rotation += petale.vitesseRotation;

        // Si le pétale sort de l'écran, on le remet en haut
        if (petale.y > canvas.height || petale.x > canvas.width + 20) {
          const nouveau = creerPetale(canvas);
          nouveau.x = Math.random() * canvas.width * 0.3;
          nouveau.y = -20;
          Object.assign(petale, nouveau);
        }

        // Dessine le pétale mis à jour
        dessinerPetale(ctx, petale);
      });

      // Relance l'animation
      animationId = requestAnimationFrame(animer);
    }

    animer();

    // Stoppe l'animation quand le composant disparaît
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="canvas-sakura" />;
}
