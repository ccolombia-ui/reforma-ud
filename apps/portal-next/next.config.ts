import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

/**
 * Next default mode (sin output: 'export') para soportar Route Handlers
 * de la API del Asistente AI. Las paginas de contenido siguen siendo
 * static via generateStaticParams. Vercel produce .next/ con SSG + SSR híbrido.
 *
 * Velite + build-graph + pagefind corren en `pnpm build` antes de `next build`.
 *
 * v5.0d fix · turbopack.root apunta al workspace root del monorepo
 * (pnpm-workspace.yaml live ahí), no al directorio de portal-next. Esto
 * evita el error "Next.js inferred your workspace root, but it may not be
 * correct" que rompía CI/CD desde v4.5a.
 */

// ESM-safe __dirname resolution (next.config.ts compila a ESM en Next 16).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..', '..');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;
