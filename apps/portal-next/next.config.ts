import type { NextConfig } from 'next';

/**
 * Next default mode (sin output: 'export') para soportar Route Handlers
 * de la API del Asistente AI. Las paginas de contenido siguen siendo
 * static via generateStaticParams. Vercel produce .next/ con SSG + SSR híbrido.
 *
 * Velite + build-graph + pagefind corren en `pnpm build` antes de `next build`.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
