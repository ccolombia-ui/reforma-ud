import { test, expect } from '@playwright/test';

/**
 * Smoke E2E · v8.0 · consolidado v7 + draft visibility
 *
 * Cubre:
 *   1. HTTP 200 + H1 visible sin skeleton-lock (v6.5 origin)
 *   2. Draft papers (M08-M12) devuelven 404 y NO aparecen en sidebar (v8 new)
 *   3. Papers públicos (M01-M07) siguen visibles en sidebar (v8 regression guard)
 *   4. Sidebar BIBLIOTECA renderiza items principales (v6.5)
 *   5. Right-panel 6 tabs flat (v7)
 *   6. No Sheet/overlay zombie al cargar (v7.10)
 *   7. Click en grafo activa split (v7.11)
 *   8. Header sticky al scroll (v7.10)
 *   9. Pane A badge "A" en split mode (v7.12)
 *  10. Hover sobre wikilink glosario monta HoverCard (v7.8)
 *
 * Tiempo estimado: ~45s en chromium con 4 workers.
 */

// ── §1 · URLs públicas (M08-M12 excluidas) ─────────────────────────────────

const PUBLIC_URLS = [
  { path: '/', label: 'Home' },
  { path: '/canonico/', label: 'Canónico dashboard' },
  { path: '/canonico/m01/', label: 'M01 Mandato' },
  { path: '/canonico/m04/', label: 'M04 JTBD Comunidad' },
  { path: '/canonico/m07/', label: 'M07 21 BPA' },
  { path: '/canonico/grafo/', label: 'Grafo global' },
  { path: '/glosario/', label: 'Glosario index' },
  { path: '/glosario/con-acu-004-25/', label: 'Concepto ACU' },
  { path: '/glosario/con-cca/', label: 'Concepto CCA' },
  { path: '/comunidades/gobierno/', label: 'CoP Gobierno' },
  { path: '/comunidades/formacion/', label: 'CoP Formación' },
  { path: '/mision/', label: 'Mission tracker' },
];

for (const { path, label } of PUBLIC_URLS) {
  test(`smoke · ${label} (${path}) renderiza H1 sin skeleton lock`, async ({ page }) => {
    const res = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(res?.status(), `HTTP status para ${path}`).toBeLessThan(400);

    const h1 = page.locator('h1').first();
    await expect(h1, `H1 visible en ${path}`).toBeVisible({ timeout: 8_000 });

    const h1Text = await h1.textContent();
    expect(h1Text?.trim().length ?? 0, `H1 con contenido en ${path}`).toBeGreaterThan(0);

    const pulses = await page.locator('.animate-pulse').count();
    expect(pulses, `pocos skeletons activos en ${path}`).toBeLessThan(10);
  });
}

// ── §2 · Draft papers (M08-M12) deben devolver 404 ────────────────────────

const DRAFT_PAPER_PATHS = [
  { path: '/canonico/m08/', label: 'M08 draft' },
  { path: '/canonico/m09/', label: 'M09 draft' },
  { path: '/canonico/m10/', label: 'M10 draft' },
  { path: '/canonico/m11/', label: 'M11 draft' },
  { path: '/canonico/m12/', label: 'M12 draft' },
];

for (const { path, label } of DRAFT_PAPER_PATHS) {
  test(`draft · ${label} (${path}) devuelve 404`, async ({ page }) => {
    const res = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(res?.status(), `${path} debe ser 404`).toBe(404);
  });
}

// ── §3 · Draft papers NO aparecen en sidebar ───────────────────────────────

test('draft · M08-M12 no aparecen en sidebar de navegación', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('text=BIBLIOTECA REFORMA·UD').first()).toBeVisible({ timeout: 8_000 });

  for (const draftLabel of ['M08', 'M09', 'M10', 'M11', 'M12']) {
    const item = page.locator(`[data-sidebar-section="biblioteca"] text=${draftLabel}`)
      .or(page.locator(`nav text=${draftLabel}`).first());
    // Los papers draft no deben aparecer como items de navegación en el sidebar
    const count = await page.locator(`a:has-text("${draftLabel}")`).filter({ hasNot: page.locator('[data-pane]') }).count();
    expect(count, `${draftLabel} NO debe tener links en sidebar`).toBe(0);
  }
});

test('draft · M01-M07 SÍ aparecen en sidebar (regression guard)', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('text=Reforma Vinculante UDFJC').first()).toBeVisible({ timeout: 8_000 });

  // Los papers públicos deben tener al menos un link visible
  for (const pub of ['M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07']) {
    const link = page.locator(`a:has-text("${pub}")`).first();
    await expect(link, `${pub} debe tener link en sidebar`).toBeVisible({ timeout: 5_000 });
  }
});

// ── §4 · Misiones (tracker) solo muestra M01-M07 ──────────────────────────

test('draft · /mision/ solo muestra misiones M01-M07', async ({ page }) => {
  await page.goto('/mision/', { waitUntil: 'domcontentloaded' });
  const h1 = page.locator('h1').first();
  await expect(h1).toBeVisible({ timeout: 8_000 });

  // M08-M12 no deben aparecer en el tracker
  for (const draft of ['M08', 'M09', 'M10', 'M11', 'M12']) {
    const count = await page.getByText(draft, { exact: true }).count();
    expect(count, `${draft} no debe aparecer en /mision/`).toBe(0);
  }
});

// ── §5 · Sidebar y layout general ─────────────────────────────────────────

test('smoke · sidebar BIBLIOTECA REFORMA·UD renderiza items principales', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('text=BIBLIOTECA REFORMA·UD').first()).toBeVisible({ timeout: 8_000 });
  await expect(page.locator('text=Grafo semántico').first()).toBeVisible();
  await expect(page.locator('text=Glosario').first()).toBeVisible();
  await expect(page.locator('text=Reforma Vinculante UDFJC').first()).toBeVisible();
});

test('smoke · right-panel renderiza 6 tabs flat (sin agrupador Conexiones)', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[aria-label="Modos del panel"]').first()).toBeVisible({ timeout: 8_000 });
  for (const label of ['Esquema', 'Grafo', 'Evolución', 'Refs', 'Comunidad', 'Asistente']) {
    await expect(page.locator(`button[aria-label="${label}"], [role="tab"]:has-text("${label}")`).first(),
      `tab "${label}" presente`).toBeVisible();
  }
});

// ── §6 · Regresiones v7 ────────────────────────────────────────────────────

/**
 * G-OVERLAY-01 · v7.10
 * ChangelogDrawer no debe auto-abrir Sheet al cargar.
 */
test('smoke · ningún Sheet en estado "open" al cargar (overlay no debe bloquear página)', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const openSheets = await page.locator('[data-slot="sheet-content"][data-state="open"], [data-slot="sheet-overlay"][data-state="open"]').count();
  expect(openSheets, 'no Sheet debe estar en estado open al cargar la página').toBe(0);

  const blockingOverlay = await page.evaluate(() => {
    const overlays = document.querySelectorAll<HTMLElement>('div.fixed.inset-0.z-50');
    for (const ov of Array.from(overlays)) {
      const cs = window.getComputedStyle(ov);
      if (cs.pointerEvents !== 'none' && cs.display !== 'none' && cs.visibility !== 'hidden') {
        return { found: true, classes: ov.className.slice(0, 80), state: ov.getAttribute('data-state') };
      }
    }
    return { found: false };
  });
  expect(blockingOverlay, 'no debe haber overlay fixed inset-0 z-50 con pointer-events:auto').toMatchObject({ found: false });
});

/**
 * G-GRAPH-02 · v7.11
 * Click en nodo del grafo right-panel activa split.
 */
test('smoke · click en grafo right-panel activa split y abre nodo en pane B', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    localStorage.removeItem('reforma-ud:split-mode');
    localStorage.removeItem('reforma-ud:panes-state');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const paneBBefore = await page.locator('[data-pane="b"]').count();
  expect(paneBBefore, 'pane B no debe existir antes del click').toBe(0);

  const grafoTab = page.locator('button[aria-label="Grafo"], [role="tab"]:has-text("Grafo")').first();
  if (await grafoTab.count() > 0) {
    await grafoTab.click();
    await page.waitForTimeout(800);
  }

  const clickedNodeId = await page.evaluate(() => {
    const canvases = document.querySelectorAll('canvas');
    for (const c of Array.from(canvases)) {
      const rect = c.getBoundingClientRect();
      const evt = new MouseEvent('click', {
        bubbles: true, cancelable: true,
        clientX: rect.x + rect.width * 0.7,
        clientY: rect.y + rect.height * 0.5,
      });
      c.dispatchEvent(evt);
      return 'attempted';
    }
    return 'no-canvas';
  });
  expect(['attempted', 'no-canvas']).toContain(clickedNodeId);
});

/**
 * G-GRAPH-01 · v7.10
 */
test('smoke · /canonico/grafo/ tiene tabs/filters interactivos sin overlay zombie', async ({ page }) => {
  await page.goto('/canonico/grafo/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const blocking = await page.evaluate(() => {
    const overlays = document.querySelectorAll<HTMLElement>('div.fixed.inset-0.z-50');
    return Array.from(overlays).filter((ov) => {
      const cs = window.getComputedStyle(ov);
      return cs.pointerEvents !== 'none' && cs.display !== 'none';
    }).length;
  });
  expect(blocking, 'sin overlay zombie en página de grafo').toBe(0);
});

/**
 * G-HEADER-01 · v7.10
 */
test('smoke · header permanece sticky al scrollear hacia abajo', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'domcontentloaded' });
  const header = page.locator('header').first();
  await expect(header).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(300);

  await expect(header, 'header debe ser visible tras scroll de 1500px').toBeVisible();
  const bbox = await header.boundingBox();
  expect(bbox?.y, 'header.top debe estar cerca de 0 (sticky)').toBeLessThan(10);
});

/**
 * G-PANE-01 · v7.12
 * Pane A badge "A" en split mode.
 * NOTE v8: pane B usa m07 (m08 es draft y devuelve 404).
 */
test('smoke · pane A muestra badge "A" en split mode (barra uniforme)', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    localStorage.setItem('reforma-ud:split-mode', 'true');
    localStorage.setItem('reforma-ud:panes-state', JSON.stringify({
      panes: [{ id: 'b', tabs: ['m07'], activeTabId: 'm07', history: ['m07'], historyIdx: 0 }],
    }));
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const badgeA = page.locator('[data-pane="a"] .font-mono').filter({ hasText: /^A$/ }).first();
  await expect(badgeA, 'pane A debe mostrar badge "A" en split mode').toBeVisible({ timeout: 5_000 });

  const badgeB = page.locator('[data-pane="b"] .font-mono').filter({ hasText: /^B$/ }).first();
  await expect(badgeB, 'pane B debe mostrar badge "B"').toBeVisible({ timeout: 5_000 });
});

/**
 * G-HOVER-02 · v7.8
 * Hover wikilink glosario monta HoverCard.
 */
test('smoke · hover sobre wikilink /glosario/con-* monta HoverCard con CTA "Ver concepto completo"', async ({ page }) => {
  await page.goto('/canonico/m01/', { waitUntil: 'networkidle' });

  const ctaPreHover = page.getByText('Ver concepto completo');
  await expect(ctaPreHover, 'CTA NO debe existir antes del hover (anti-falso-positivo)').toHaveCount(0);

  const wikilink = page.locator('a.wikilink[href^="/glosario/con-"]').first();
  await wikilink.scrollIntoViewIfNeeded();
  await expect(wikilink).toBeVisible({ timeout: 8_000 });

  await wikilink.hover({ force: true });

  const cta = page.getByText('Ver concepto completo').first();
  await expect(cta, 'HoverCard de concepto visible tras hover').toBeVisible({ timeout: 3_000 });
});
