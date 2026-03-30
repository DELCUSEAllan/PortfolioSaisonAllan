"use client";

import { useEffect, useRef } from "react";

const NOMBRE_FLOCONS = 10;
const NOMBRE_NUAGES = 3;
const COULEURS_FLOCONS = ["#FFFFFF", "#E8F4F8", "#D6EAF8"];

function creerFlocon(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    taille: 6 + Math.random() * 6,
    vitesseX: 0.2 + Math.random() * 0.5,
    vitesseY: 0.5 + Math.random() * 0.8,
    rotation: Math.random() * Math.PI * 2,
    vitesseRotation: (Math.random() - 0.5) * 0.03,
    opacite: 0.6 + Math.random() * 0.4,
    oscillation: Math.random() * Math.PI * 2,
    vitesseOscillation: 0.02 + Math.random() * 0.02,
    couleur: COULEURS_FLOCONS[Math.floor(Math.random() * COULEURS_FLOCONS.length)],
  };
}

function creerNuage(canvas, index, imgRatio) {
  const largeur = 250 + Math.random() * 100;
  return {
    x: (canvas.width / NOMBRE_NUAGES) * index,
    y: 20 + Math.random() * 50,
    largeur,
    hauteur: largeur / imgRatio,
    vitesse: 0.5 + Math.random() * 0.2,
    opacite: 0.8 + Math.random() * 0.3,
  };
}

function dessinerFlocon(ctx, flocon) {
  ctx.save();
  ctx.translate(flocon.x, flocon.y);
  ctx.rotate(flocon.rotation);
  ctx.globalAlpha = flocon.opacite;
  ctx.strokeStyle = flocon.couleur;
  ctx.lineWidth = 1.2;
  ctx.lineCap = "round";

  const t = flocon.taille;

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const perpAngle1 = angle + Math.PI / 3;
    const perpAngle2 = angle - Math.PI / 3;
    const mx = Math.cos(angle) * t * 0.5;
    const my = Math.sin(angle) * t * 0.5;
    const brancheLen = t * 0.35;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * t, Math.sin(angle) * t);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(mx, my);
    ctx.lineTo(mx + Math.cos(perpAngle1) * brancheLen, my + Math.sin(perpAngle1) * brancheLen);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(mx, my);
    ctx.lineTo(mx + Math.cos(perpAngle2) * brancheLen, my + Math.sin(perpAngle2) * brancheLen);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
  ctx.fillStyle = flocon.couleur;
  ctx.fill();
  ctx.restore();
}

function mettreAJourNuage(nuage, canvas) {
  nuage.x += nuage.vitesse;
  if (nuage.x - nuage.largeur > canvas.width) {
    nuage.x = -nuage.largeur;
  }
}

function mettreAJourFlocon(flocon, canvas) {
  flocon.oscillation += flocon.vitesseOscillation;
  flocon.x += flocon.vitesseX + Math.sin(flocon.oscillation) * 0.5;
  flocon.y += flocon.vitesseY;
  flocon.rotation += flocon.vitesseRotation;

  if (flocon.y > canvas.height + 10 || flocon.x > canvas.width + 10) {
    const nouveau = creerFlocon(canvas);
    nouveau.x = Math.random() * canvas.width;
    nouveau.y = -10;
    Object.assign(flocon, nouveau);
  }
}

function demarrerAnimation(ctx, canvas, imgNuage, nuages, flocons, animRef) {
  function animer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nuages.forEach((nuage) => {
      mettreAJourNuage(nuage, canvas);
      ctx.save();
      ctx.globalAlpha = nuage.opacite;
      ctx.drawImage(
        imgNuage,
        nuage.x - nuage.largeur / 2,
        nuage.y - nuage.hauteur / 2,
        nuage.largeur,
        nuage.hauteur
      );
      ctx.restore();
    });

    flocons.forEach((flocon) => {
      mettreAJourFlocon(flocon, canvas);
      dessinerFlocon(ctx, flocon);
    });

    animRef.id = requestAnimationFrame(animer);
  }

  animer();
}

export default function CanvasHiver() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const flocons = Array.from({ length: NOMBRE_FLOCONS }, () => creerFlocon(canvas));
    const animRef = { id: null };
    const imgNuage = new Image();

    imgNuage.onload = () => {
      const imgRatio = imgNuage.naturalWidth / imgNuage.naturalHeight;
      const nuages = Array.from({ length: NOMBRE_NUAGES }, (_, i) => creerNuage(canvas, i, imgRatio));
      demarrerAnimation(ctx, canvas, imgNuage, nuages, flocons, animRef);
    };

    imgNuage.onerror = () => console.error("Impossible de charger nuages.webp");
    imgNuage.src = "/nuages.webp";
    if (imgNuage.complete) imgNuage.onload();

    return () => cancelAnimationFrame(animRef.id);
  }, []);

  return <canvas ref={canvasRef} className="canvas-hiver" />;
}
