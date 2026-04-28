import { defineConfig } from '@playwright/test';

/**
 * Playwright config · v6.5 TDD
 *
 * Smoke tests contra el deploy de producción (default) o local (BASE_URL).
 * El smoke test es defensivo: 12 URLs core deben retornar HTML con `<h1>`
 * y NO quedarse en skeleton-lock — categoría de regresión que vimos en
 * v6.x (loop infinito en sidebar Recientes congelaba el cliente).
 *
 * Uso:
 *   pnpm test:smoke                          # contra prod (reforma-ud.vercel.app)
 *   BASE_URL=http://localhost:3000 pnpm test:smoke  # contra dev local
 */

const BASE_URL = process.env.BASE_URL ?? 'https://reforma-ud.vercel.app';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: 1,
  workers: 4,
  reporter: 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
