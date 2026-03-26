"use client";

import { useEffect, useRef } from "react";

function dessinerSoleil(ctx, x, y, rayon, temps) {
  const pulse = 1 + Math.sin(temps * 2) * 0.15;

  // ✅ Brillance très étalée et très transparente aux bords
  const brillance = ctx.createRadialGradient(x, y, 0, x, y, rayon * 4 * pulse);
  brillance.addColorStop(0, "rgba(255, 240, 120, 0.7)");
  brillance.addColorStop(0.3, "rgba(255, 220, 80, 0.3)");
  brillance.addColorStop(0.6, "rgba(242, 196, 109, 0.1)");
  brillance.addColorStop(1, "rgba(242, 196, 109, 0)"); // ← totalement transparent
  ctx.beginPath();
  ctx.arc(x, y, rayon * 4 * pulse, 0, Math.PI * 2);
  ctx.fillStyle = brillance;
  ctx.fill();

  // Corps du soleil
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, rayon, 0, Math.PI * 2);
  ctx.fillStyle = "#F2C46D";
  ctx.shadowColor = "rgba(255, 220, 80, 0.8)";
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.restore();

  // Rayons
  const nombreRayons = 8;
  for (let i = 0; i < nombreRayons; i++) {
    const angle = (i / nombreRayons) * Math.PI * 2 + temps * 0.3;
    const xDebut = x + Math.cos(angle) * (rayon + 5);
    const yDebut = y + Math.sin(angle) * (rayon + 5);
    const xFin = x + Math.cos(angle) * (rayon + 18);
    const yFin = y + Math.sin(angle) * (rayon + 18);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(xDebut, yDebut);
    ctx.lineTo(xFin, yFin);
    ctx.strokeStyle = "#F2C46D";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(255, 220, 80, 0.5)";
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.restore();
  }
}

export default function CanvasEte() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let temps = 0;
    let animationId;

    function animer() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        temps += 0.02;
        dessinerSoleil(ctx, 80, 80, 35, temps);
        animationId = requestAnimationFrame(animer);
        }

    animer();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="canvas-ete" />;
}
