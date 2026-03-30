"use client";

import { useEffect, useRef } from "react";

const NOMBRE_FEUILLES = 8;
const COULEURS = ["#D4A843", "#C0622A", "#8B3A1A", "#B85C2A", "#E8B84B"];

function creerFeuille(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    taille: 6 + Math.random() * 8,
    vitesseX: 0.4 + Math.random() * 0.8,
    vitesseY: 0.7 + Math.random() * 1,
    rotation: Math.random() * Math.PI * 2,
    vitesseRotation: (Math.random() - 0.5) * 0.04,
    opacite: 0.7 + Math.random() * 0.3,
    oscillation: Math.random() * Math.PI * 2,
    vitesseOscillation: 0.02 + Math.random() * 0.02,
    couleur: COULEURS[Math.floor(Math.random() * COULEURS.length)],
  };
}

function dessinerFeuille(ctx, feuille) {
  ctx.save();
  ctx.translate(feuille.x, feuille.y);
  ctx.rotate(feuille.rotation);
  ctx.globalAlpha = feuille.opacite;

  const t = feuille.taille;

  ctx.beginPath();
  ctx.moveTo(0, -t);
  ctx.bezierCurveTo(t * 0.8, -t * 0.5, t * 0.8, t * 0.5, 0, t);
  ctx.bezierCurveTo(-t * 0.8, t * 0.5, -t * 0.8, -t * 0.5, 0, -t);
  ctx.fillStyle = feuille.couleur;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, -t * 0.8);
  ctx.lineTo(0, t * 0.8);
  ctx.strokeStyle = "rgba(100, 40, 10, 0.4)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

export default function CanvasAutomne() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const feuilles = Array.from(
      { length: NOMBRE_FEUILLES },
      () => creerFeuille(canvas)
    );

    let animationId;

    function animer() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      feuilles.forEach((feuille) => {
        feuille.oscillation += feuille.vitesseOscillation;
        feuille.x += feuille.vitesseX + Math.sin(feuille.oscillation) * 0.8;
        feuille.y += feuille.vitesseY;
        feuille.rotation += feuille.vitesseRotation;

        if (feuille.y > canvas.height + 20 || feuille.x > canvas.width + 20) {
          const nouvelle = creerFeuille(canvas);
          nouvelle.x = Math.random() * canvas.width * 0.3;
          nouvelle.y = -20;
          Object.assign(feuille, nouvelle);
        }

        dessinerFeuille(ctx, feuille);
      });

      animationId = requestAnimationFrame(animer);
    }

    animer();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="canvas-automne" />;
}
