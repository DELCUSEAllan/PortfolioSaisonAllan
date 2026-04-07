"use client";

import { useEffect, useRef } from "react";

const NOMBRE_ETOILES = 80;

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

function reinitialiserEtoile(etoile, canvas) {
  etoile.x = Math.random() * canvas.width;
  etoile.y = Math.random() * canvas.height;
  etoile.rayon = 0.5 + Math.random() * 1.5;
  etoile.opaciteBase = 0.3 + Math.random() * 0.7;
  etoile.vitessePulse = 0.01 + Math.random() * 0.02;
  etoile.phase = Math.random() * Math.PI * 2;
}

function dessinerEtoile(ctx, etoile, temps) {
  const opacite = etoile.opaciteBase * (0.5 + 0.5 * Math.sin(temps * etoile.vitessePulse * 60 + etoile.phase));
  ctx.save();
  ctx.beginPath();
  ctx.arc(etoile.x, etoile.y, etoile.rayon, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(230, 237, 243, ${opacite})`;
  ctx.shadowColor = "rgba(88, 166, 255, 0.8)";
  ctx.shadowBlur = 4;
  ctx.fill();
  ctx.restore();
}

function animer(ctx, canvas, etoiles, animRef, temps) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  etoiles.forEach((etoile) => dessinerEtoile(ctx, etoile, temps));
  animRef.id = requestAnimationFrame((t) => animer(ctx, canvas, etoiles, animRef, t));
}

export default function CanvasNuit() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const redimensionner = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Redistribue les étoiles après redimensionnement
      etoiles.forEach((etoile) => reinitialiserEtoile(etoile, canvas));
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const etoiles = Array.from({ length: NOMBRE_ETOILES }, () => creerEtoile(canvas));
    const animRef = { id: null };

    // Démarre après un court délai pour s'assurer que le DOM est prêt
    const timeout = setTimeout(() => {
      redimensionner();
      animRef.id = requestAnimationFrame((t) => animer(ctx, canvas, etoiles, animRef, t));
    }, 50);

    window.addEventListener("resize", redimensionner);

    return () => {
      cancelAnimationFrame(animRef.id);
      clearTimeout(timeout);
      window.removeEventListener("resize", redimensionner);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-nuit" />;
}
