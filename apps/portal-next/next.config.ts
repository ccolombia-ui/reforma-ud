import type { NextConfig } from 'next';

/**
 * Velite corre en el hook `prebuild` del package.json — no se acopla aquí
 * para evitar conflicto con Turbopack (default en Next 16).
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
