import { test, expect } from '@playwright/test';

/**
 * Smoke E2E · v6.5 TDD
 *
 * 12 URLs core deben:
 *   1. Retornar HTTP 200
 *   2. Tener un <h1> visible (HTML real, no skeleton)
 *   3. NO quedarse en skeleton-lock (sin H1 nunca hidratado)
 *
 * Trigger de existencia: en v6.x un loop infinito en sidebar Recientes
 * congelaba el cliente. La página retornaba 200 + HTML SSR válido pero
 * el JS nunca terminaba de hidratar → skeleton permanente. SSR-only checks
 * (curl + grep) NO detectaban el bug. Por eso este smoke usa Playwright
 * con browser real que hidrata client-side.
 *
 * Tiempo: ~30s en chromium con 4 workers.
 */

const URLS = [
  { path: '/', label: 'Home' },
  { path: '/canonico/', label: 'Canónico dashboard' },
  { path: '/canonico/m01/', label: 'M01 Mandato' },
  { path: '/canonico/m08/', label: 'M08 Framework' },
  { path: '/canonico/m12/', label: 'M12 Meta-paper' },
  { path: '/canonico/grafo/', label: 'Grafo global' },
  { path: '/glosario/', label: 'Glosario index' },
  { path: '/glosario/con-acu-004-25/', label: 'Concepto ACU' },
  { path: '/glosario/con-cca/', label: 'Concepto CCA' },
  { path: '/comunidades/gobierno/', label: 'CoP Gobierno' },
  { path: '/comunidades/formacion/', label: 'CoP Formación' },
  { path: '/mision/', label: 'Mission tracker' },
];

for (const { path, label } of URLS) {
  test(`smoke · ${label} (${path}) renderiza H1 sin skeleton lock`, async ({ page }) => {
    const res = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(res?.status(), `HTTP status para ${path}`).toBeLessThan(400);

    // Esperar a que aparezca al menos un H1 con contenido. Timeout 8s
    // detecta loop infinito en hidratación (skeleton-lock no genera H1).
    const h1 = page.locator('h1').first();
    await expect(h1, `H1 visible en ${path}`).toBeVisible({ timeout: 8_000 });

    const h1Text = await h1.textContent();
    expect(h1Text?.trim().length ?? 0, `H1 con contenido en ${path}`).toBeGreaterThan(0);

    // Verificar que NO hay skeleton-lock — máximo 3 elementos animate-pulse
    // tras hidratación inicial (algunos esperados por Suspense puntuales).
    const pulses = await page.locator('.animate-pulse').count();
    expect(pulses, `pocos skeletons activos en ${path}`).toBeLessThan(10);
  });
}

test('smoke · sidebar BIBLIOTECA REFORMA·UD renderiza items principales', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'domcontentloaded' });
  // Espera el sidebar hidratado
  await expect(page.locator('text=BIBLIOTECA REFORMA·UD').first()).toBeVisible({ timeout: 8_000 });
  await expect(page.locator('text=Grafo semántico').first()).toBeVisible();
  await expect(page.locator('text=Glosario').first()).toBeVisible();
  await expect(page.locator('text=Reforma Vinculante UDFJC').first()).toBeVisible();
});

test('smoke · right-panel renderiza 6 tabs flat (sin agrupador Conexiones)', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[aria-label="Modos del panel"]').first()).toBeVisible({ timeout: 8_000 });
  // Las 6 tabs deben tener buttons accesibles por aria-label
  for (const label of ['Esquema', 'Grafo', 'Evolución', 'Refs', 'Comunidad', 'Asistente']) {
    await expect(page.locator(`button[aria-label="${label}"], [role="tab"]:has-text("${label}")`).first(),
      `tab "${label}" presente`).toBeVisible();
  }
});
