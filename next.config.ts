import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emet .next/standalone (server.js + node_modules traces) utilise par
  // l'image de production du Dockerfile.
  // Note: standalone recopie aussi .env ; le secret est ecarte a la fois par
  // .dockerignore (absent du contexte de build) et par un `rm` dans le runner.
  output: "standalone",
};

export default nextConfig;
