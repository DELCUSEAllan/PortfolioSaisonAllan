"use client";

import { useEffect, useRef } from "react";

// Nombre de flocons et de nuages affichés simultanément
const NOMBRE_FLOCONS = 10;
const NOMBRE_NUAGES = 3;

// Palette de couleurs possibles pour les flocons (blanc et bleus clairs)
const COULEURS_FLOCONS = ["#FFFFFF", "#E8F4F8", "#D6EAF8"];

// Crée un flocon avec des propriétés aléatoires
// Chaque flocon démarre au-dessus de l'écran (y négatif) à une position x aléatoire
function creerFlocon(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height, // démarre au-dessus de l'écran
    taille: 6 + Math.random() * 6,
    vitesseX: 0.2 + Math.random() * 0.5, // légère dérive horizontale
    vitesseY: 0.5 + Math.random() * 0.8, // vitesse de chute
    rotation: Math.random() * Math.PI * 2, // angle de départ aléatoire
    vitesseRotation: (Math.random() - 0.5) * 0.03, // rotation lente dans un sens ou l'autre
    opacite: 0.6 + Math.random() * 0.4,
    oscillation: Math.random() * Math.PI * 2, // phase de départ pour l'effet de balancement
    vitesseOscillation: 0.02 + Math.random() * 0.02, // vitesse du balancement gauche/droite
    couleur: COULEURS_FLOCONS[Math.floor(Math.random() * COULEURS_FLOCONS.length)],
  };
}

// Crée un nuage avec une largeur aléatoire
// La hauteur est calculée automatiquement pour respecter le ratio de l'image
function creerNuage(canvas, index, imgRatio) {
  const largeur = 250 + Math.random() * 100;
  return {
    x: (canvas.width / NOMBRE_NUAGES) * index, // répartis uniformément sur la largeur
    y: 20 + Math.random() * 50,
    largeur,
    hauteur: largeur / imgRatio, // hauteur calculée selon le ratio réel de l'image
    vitesse: 0.5 + Math.random() * 0.2,
    opacite: 0.8 + Math.random() * 0.3,
  };
}

// Dessine un flocon en forme d'étoile à 6 branches avec des petites branches perpendiculaires
function dessinerFlocon(ctx, flocon) {
  ctx.save();
  ctx.translate(flocon.x, flocon.y); // on se déplace au centre du flocon
  ctx.rotate(flocon.rotation); // on applique la rotation
  ctx.globalAlpha = flocon.opacite; // transparence du flocon (0 = invisible, 1 = opaque)
  ctx.strokeStyle = flocon.couleur; // couleur des traits du flocon
  ctx.lineWidth = 1.2;
  ctx.lineCap = "round";

  const t = flocon.taille;

  // On dessine 6 branches principales + 2 petites branches sur chaque grande branche
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2; // angle de chaque branche (360° / 6)
    const perpAngle1 = angle + Math.PI / 3; // petite branche à +60°
    const perpAngle2 = angle - Math.PI / 3; // petite branche à -60°
    const mx = Math.cos(angle) * t * 0.5; // point milieu de la branche principale (x)
    const my = Math.sin(angle) * t * 0.5; // point milieu de la branche principale (y)
    const brancheLen = t * 0.35;  // longueur des petites branches

    // Branche principale du centre vers l'extérieur
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * t, Math.sin(angle) * t);
    ctx.stroke();

    // Petite branche perpendiculaire gauche au milieu de la branche principale
    ctx.beginPath();
    ctx.moveTo(mx, my);
    ctx.lineTo(mx + Math.cos(perpAngle1) * brancheLen, my + Math.sin(perpAngle1) * brancheLen);
    ctx.stroke();

    // Petite branche perpendiculaire droite au milieu de la branche principale
    ctx.beginPath();
    ctx.moveTo(mx, my);
    ctx.lineTo(mx + Math.cos(perpAngle2) * brancheLen, my + Math.sin(perpAngle2) * brancheLen);
    ctx.stroke();
  }

  // Petit cercle au centre du flocon
  ctx.beginPath();
  ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
  ctx.fillStyle = flocon.couleur;
  ctx.fill();
  ctx.restore();
}

// Met à jour la position du nuage et le fait revenir à gauche quand il sort à droite
function mettreAJourNuage(nuage, canvas) {
  nuage.x += nuage.vitesse;
  if (nuage.x - nuage.largeur > canvas.width) {
    nuage.x = -nuage.largeur; // repart depuis la gauche hors écran
  }
}

// Met à jour la position du flocon à chaque frame
// Réinitialise le flocon s'il sort de l'écran par le bas ou la droite
function mettreAJourFlocon(flocon, canvas) {
  flocon.oscillation += flocon.vitesseOscillation;
  flocon.x += flocon.vitesseX + Math.sin(flocon.oscillation) * 0.5; // balancement gauche/droite
  flocon.y += flocon.vitesseY;
  flocon.rotation += flocon.vitesseRotation;

  // Si le flocon sort de l'écran on le réinitialise en haut
  if (flocon.y > canvas.height + 10 || flocon.x > canvas.width + 10) {
    const nouveau = creerFlocon(canvas);
    nouveau.x = Math.random() * canvas.width;
    nouveau.y = -10;
    Object.assign(flocon, nouveau); // on réutilise l'objet existant au lieu d'en créer un nouveau
  }
}

// Lance la boucle d'animation principale
// requestAnimationFrame appelle animer() environ 60 fois par seconde
function demarrerAnimation(ctx, canvas, imgNuage, nuages, flocons, animRef) {
  function animer() {
    // Efface tout le canvas avant de redessiner
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mise à jour et dessin de chaque nuage
    nuages.forEach((nuage) => {
      mettreAJourNuage(nuage, canvas);
      ctx.save();
      ctx.globalAlpha = nuage.opacite;
      ctx.drawImage(
        imgNuage,
        nuage.x - nuage.largeur / 2, // centré horizontalement sur nuage.x
        nuage.y - nuage.hauteur / 2, // centré verticalement sur nuage.y
        nuage.largeur,
        nuage.hauteur
      );
      ctx.restore();
    });

    // Mise à jour et dessin de chaque flocon
    flocons.forEach((flocon) => {
      mettreAJourFlocon(flocon, canvas);
      dessinerFlocon(ctx, flocon);
    });

    // Planifie le prochain appel et stocke l'id pour pouvoir annuler l'animation
    animRef.id = requestAnimationFrame(animer);
  }

  animer();
}

export default function CanvasHiver() {
  // Référence vers l'élément canvas dans le DOM
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d"); // contexte 2D pour dessiner

    // Adapte la résolution du canvas à sa taille affichée
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Crée tous les flocons au démarrage
    const flocons = Array.from({ length: NOMBRE_FLOCONS }, () => creerFlocon(canvas));
    const animRef = { id: null }; // objet pour stocker l'id de l'animation

    // Charge l'image des nuages
    const imgNuage = new Image();

    // Une fois l'image chargée, on crée les nuages et on démarre l'animation
    imgNuage.onload = () => {
      // Calcule le ratio largeur/hauteur réel de l'image pour ne pas la déformer
      const imgRatio = imgNuage.naturalWidth / imgNuage.naturalHeight;
      const nuages = Array.from({ length: NOMBRE_NUAGES }, (_, i) => creerNuage(canvas, i, imgRatio));
      demarrerAnimation(ctx, canvas, imgNuage, nuages, flocons, animRef);
    };

    imgNuage.onerror = () => console.error("Impossible de charger nuages.webp");
    imgNuage.src = "/nuages.webp";

    // Si l'image est déjà en cache navigateur, onload ne se déclenche pas automatiquement
    if (imgNuage.complete) imgNuage.onload();

    // Nettoyage : annule l'animation quand le composant est retiré de la page
    return () => cancelAnimationFrame(animRef.id);
  }, []); // [] = l'effet ne s'exécute qu'une seule fois au montage du composant

  return <canvas ref={canvasRef} className="canvas-hiver" />;
}
