/** @type {import('next').NextConfig} */
// Ce commentaire permet à VSCode d'afficher l'autocomplétion pour la config Next.js

const nextConfig = {
  // Désactive le mode strict de React qui montait les composants deux fois en développement
  // Ce double montage causait des doublons dans les animations canvas
  reactStrictMode: false,

  images: {
    // Next.js convertit automatiquement les images en WebP si le navigateur le supporte
    formats: ["image/webp"],

    // Niveaux de qualité autorisés pour l'optimisation des images
    qualities: [70, 75, 80],
  },

  experimental: {
    // Optimise le chargement de ces bibliothèques en n'important que ce qui est utilisé
    // Réduit la taille du bundle JavaScript envoyé au navigateur
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
};

export default nextConfig;
