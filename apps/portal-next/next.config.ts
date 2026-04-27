import type { NextConfig } from 'next';

/**
 * Next default mode (sin output: 'export') para soportar Route Handlers
 * de la API del Asistente AI. Las paginas de contenido siguen siendo
 * static via generateStaticParams. Vercel produce .next/ con SSG + SSR híbrido.
 *
 * Velite + build-graph + pagefind corren en `pnpm build` antes de `next build`.
 *
 * v5.0d fix · removido el bloque `turbopack` que en Next 16 actuaba como
 * trigger para usar Turbopack (incluso sin --turbo flag), lo cual rompía
 * el build en CI por inferencia incorrecta del workspace root con pnpm
 * monorepo. Webpack default funciona OK.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
