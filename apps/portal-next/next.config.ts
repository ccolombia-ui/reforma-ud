import type { NextConfig } from 'next';

/**
 * Static export: todas las rutas son SSG/static, usamos `output: 'export'`
 * para producir HTML plano en `out/` (compatible con pagefind y CDN simple).
 * Velite + grafo corren via `pnpm build` antes de `next build` (ver package.json).
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
