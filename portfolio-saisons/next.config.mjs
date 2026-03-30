/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
  images: {
    formats: ["image/webp"],
    qualities: [70, 75, 80],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
};

export default nextConfig;
