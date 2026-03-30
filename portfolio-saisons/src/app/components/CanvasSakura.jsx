// src/app/components/CanvasSakura.jsx

"use client";

import { useEffect, useRef } from "react";

const NOMBRE_PETALES = 5;
const COULEURS_PETALES = ["#FFD6E0", "#FFB7C5", "#FF8FA3"];

function creerPetale(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    taille: 5 + Math.random() * 7,
    vitesseX: 0.5 + Math.random() * 1,
    vitesseY: 0.8 + Math.random() * 1,
    rotation: Math.random() * Math.PI * 2,
    vitesseRotation: (Math.random() - 0.5) * 0.05,
    opacite: 0.6 + Math.random() * 0.4,
    oscillation: Math.random() * Math.PI * 2,
    vitesseOscillation: 0.02 + Math.random() * 0.02,
    couleur: COULEURS_PETALES[Math.floor(Math.random() * COULEURS_PETALES.length)],
  };
}

function dessinerPetale(ctx, petale) {
  ctx.save();
  ctx.translate(petale.x, petale.y);
  ctx.rotate(petale.rotation);
  ctx.globalAlpha = petale.opacite;

  // Forme du pétale
  ctx.beginPath();
  ctx.ellipse(0, 0, petale.taille, petale.taille * 0.6, 0, 0, Math.PI * 2);
  ctx.fillStyle = petale.couleur;
  ctx.fill();

  // Nervure centrale
  ctx.beginPath();
  ctx.moveTo(-petale.taille * 0.8, 0);
  ctx.lineTo(petale.taille * 0.8, 0);
  ctx.strokeStyle = "rgba(255, 100, 130, 0.3)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

export default function CanvasSakura() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const petales = Array.from(
      { length: NOMBRE_PETALES },
      () => creerPetale(canvas)
    );

    let animationId;

    function animer() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petales.forEach((petale) => {
        // Oscillation horizontale douce
        petale.oscillation += petale.vitesseOscillation;
        petale.x += petale.vitesseX + Math.sin(petale.oscillation) * 0.8;
        petale.y += petale.vitesseY;
        petale.rotation += petale.vitesseRotation;

        // Si le pétale sort de l'écran, on le recrée en haut
        if (petale.y > canvas.height || petale.x > canvas.width + 20) {
          const nouveau = creerPetale(canvas);
          nouveau.x = Math.random() * canvas.width * 0.3;
          nouveau.y = -20;
          Object.assign(petale, nouveau);
        }

        dessinerPetale(ctx, petale);
      });

      animationId = requestAnimationFrame(animer);
    }

    animer();

    // Nettoyage quand le composant est démonté
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="canvas-sakura" />;
}
