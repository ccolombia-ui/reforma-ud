# Auditoría: ¿Saltar a portal `reforma-ud` v4.0 con Flowershow?

> Repo inspeccionado: `https://github.com/flowershow/flowershow` (rama `main`, commit visitado 2026-04-25). Versiones canónicas: `apps/flowershow` Next.js 15.5.15 + React 19.2.1; `@flowershow/remark-wiki-link` 3.4.0. Última release pública del paquete OSS `@portaljs/remark-wiki-link` 1.2 (que ya consumimos). `[verificar]` cuando una afirmación dependa de cambios posteriores al snapshot.

---

## 1. Inventario detallado Flowershow

Flowershow ha pivotado a **producto SaaS** (cloud Datopian). Lo OSS sigue siendo MIT, pero el monorepo ya no es un “Next.js + Tailwind + MDX template” de copiar/pegar: es una app con Postgres, Prisma, Inngest, Stripe, Cloudflare Worker, Typesense y multi-tenant. La parte de *rendering Markdown* sigue siendo aprovechable, pero está acoplada al `site-context` y al pipeline `next-mdx-remote-client`.

| Path | Propósito | Madurez | Acoplamiento |
|---|---|---|---|
| `packages/remark-wiki-link/` (`@flowershow/remark-wiki-link@3.4.0`) | Parser micromark de `[[...]]`, alias, anchors. Sustituye al viejo `@portaljs/remark-wiki-link@1.2`. | **Stable** | Genérico (sólo `mdast-util-*`, `micromark-util-*`). Drop-in. |
| `packages/api-contract/` | Zod + OpenAPI 3.1 del SaaS. | Stable | Acoplado a backend Flowershow. **No reusar.** |
| `packages/cloudflare-worker/` | Worker de procesamiento Markdown remoto. | Stable | Sólo útil si publicamos al cloud. **No reusar.** |
| `apps/flowershow-mcp/` | MCP server para asistentes IA sobre la API. | Beta | SaaS-only. |
| `apps/flowershow/lib/remark-obsidian-bases.ts` + `lib/bases-parse.ts` + `lib/bases-expr.ts` | Parser de archivos `.base` (Obsidian Bases) → AST → `viewData`. | **Beta** (anuncio Sept 2025, “BETA” en blog `announcing-obsidian-bases-beta.md`). | Genérico-ish: parsing puro Markdown/YAML. Reusable con port. |
| `apps/flowershow/components/public/mdx/obsidian-bases-views.tsx` | Selector de vistas (cards/list/table). | Beta | Importa `@mui/material` (FormControl/Select). **Heavyweight.** |
| `apps/flowershow/components/public/mdx/obsidian-base-cards.tsx` | Render cards. | Beta | MUI + `@mui/x-data-grid`. |
| `apps/flowershow/components/public/mdx/obsidian-base-list.tsx` | Render list. | Beta | MUI. |
| `apps/flowershow/components/public/mdx/obsidian-base-table.tsx` | Render table. | Beta | `ag-grid-react@34` + `ag-grid-community`. |
| `apps/flowershow/components/public/table-of-contents.tsx` | TOC sticky reactiva con IntersectionObserver. | Stable | Sólo `next/link` + `usePathname`. **Portable.** |
| `apps/flowershow/components/public/search-modal.tsx` | Modal de búsqueda. | Stable | Acoplado a **Typesense** (`react-instantsearch`, `typesense-instantsearch-adapter`). |
| `apps/flowershow/components/public/sidebar.tsx` + `site-tree.tsx` + `site-context.tsx` | Tree de navegación derivado de `site_tree`. | Stable | Acoplado a `lib/build-site-tree.ts` y BD. |
| `apps/flowershow/components/public/mdx/mdx-components-factory.tsx` + `mdx-client.tsx` + `mdx-client-renderer.tsx` | Factoría que enlaza componentes MDX con el `next-mdx-remote-client`. | Stable | Acoplado al pipeline propio (no MDX-bundler, no Velite). |
| `apps/flowershow/components/public/mdx/{plotly,vega,map,pdf-viewer,excel,line-chart,frictionless-view,flatui-table,list,fs-image,custom-html}.tsx` | Componentes MDX inyectables (data-viz, multimedia). | Stable | Cada uno arrastra su lib (Plotly/Vega/Leaflet/react-pdf). |
| `apps/flowershow/components/public/comments.tsx` | Wrapper sobre `@giscus/react`. | Stable | Genérico. |
| `apps/flowershow/components/public/theme-switch.tsx` | Toggle dark/light. | Stable | Sin `next-themes`; lógica propia. |
| `apps/flowershow/lib/markdown.ts` + `preprocess-mdx.ts` + `rehype-html-enhancements.ts` + `rehype-inject-image-dimensions.ts` + `rehype-json-canvas.ts` + `rehype-unwrap-paragraph-around-media.ts` | Pipeline de procesado. | Stable | Asume `next-mdx-remote-client`. **No combina con Velite sin wrap.** |
| `apps/flowershow/lib/remark-youtube-auto-embed.ts` | Embed YouTube auto. | Stable | Genérico. |
| `apps/flowershow/lib/process-canvas.ts` + `canvas-renderer.ts` | Render de Obsidian Canvas (`.canvas`). | Stable | Reusable con port. |
| Excalidraw | **No** existe componente React; sólo se sirven `.excalidraw.svg` pre-renderizados (ver `content/flowershow-app/excalidraw/*.svg`). | n/a | No hay nada que adoptar. |
| **Graph view** (2D/3D) | **NO EXISTE en `main`**. Repo grep `graph` → sólo `paragraph`/`telemetry`. Flowershow.app actual no muestra grafo de red. | – | – |
| **Backlinks panel** | **NO EXISTE como componente público dedicado**. Lo que sí existe es resolución de wikilinks bidireccional vía `lib/build-site-tree.ts`. | – | – |
| **HoverCard / link preview** | **NO EXISTE en `main`** (`grep -i hover` → 0 hits relevantes). | – | – |
| **MDX layer** | `next-mdx-remote-client@2.1.7` (server-compile + RSC streaming). | Stable | Diferente a nuestro `s.markdown()` HTML pre-compilado por Velite. |
| **Styling** | Tailwind 3 + `tailwind.config.js` clásico + `@emotion/react` + `@mui/material` + `@unocss/core`. **NO Tailwind v4 ni shadcn.** | – | Migración no trivial al pasar a nuestro Tailwind v4 / shadcn. |

---

## 2. Análisis comparativo v3.5 vs Flowershow

| Feature | Nuestra v3.5 (path + LOC) | Flowershow equivalent | Veredicto | Justificación |
|---|---|---|---|---|
| Wikilinks render | `src/lib/remark-wikilinks.ts` (83 LOC) + `@portaljs/remark-wiki-link@1.2` | `@flowershow/remark-wiki-link@3.4.0` | **MERGE** | Bump a 3.4.0 mantiene API compatible y gana fixes de anchors/aliases [verificar breaking]. |
| Transclusiones `![[...]]` | `src/lib/remark-obsidian-embed.ts` (103 LOC) | Resuelto por `markdown.ts` + `preprocess-mdx.ts` (interno, no exportado) | **KEEP** | El nuestro funciona con Velite + HTML output; el suyo asume MDX runtime. |
| Backlinks panel | `right-panel.tsx` con tab Backlinks (cliente) | No existe | **KEEP** | Único en el ecosistema. |
| Hover-preview wikilinks | `src/components/mdx-with-hover-preview.tsx` | No existe | **KEEP** | Único; ventaja real frente a Flowershow. |
| Graph view 2D | `src/components/graph` + `vis-network@10` | No existe | **KEEP** | Diferenciador; Flowershow lo perdió. |
| Graph view 3D | `react-force-graph-3d@1.29` + `three@0.184` | No existe | **KEEP** | Diferenciador absoluto. |
| Search | `cmdk@1.1` palette + `command-palette.tsx` | `search-modal.tsx` (Typesense, hospedado) | **KEEP** | Typesense añade un servicio externo; cmdk + index local nos basta. |
| TOC / Outline | `right-panel.tsx` tab outline (cliente) | `table-of-contents.tsx` (sticky + IntersectionObserver, ~80 LOC) | **MERGE** | Adoptar el patrón IntersectionObserver para “active section”. |
| Bases (`.base`) | No existe | `remark-obsidian-bases.ts` + `obsidian-base-{cards,list,table}.tsx` (BETA) | **ADOPT (parser) + REWRITE (views)** | Parser es valioso; views están atadas a MUI/ag-grid (200kB+). Reescribir vistas con shadcn `<Table>` + `<Card>`. |
| Callouts | `rehype-callouts` (theme obsidian) | `@r4ai/remark-callout` + `remark-obsidian-callout` | **KEEP** | El nuestro ya cubre el set; no migrar. |
| LaTeX | `rehype-katex` | `rehype-katex` (idéntico) | **KEEP** | Empate. |
| Mermaid | `rehype-mermaid` | `mdx-mermaid@2` | **KEEP** | El nuestro es server-side renderable; el suyo cliente. |
| Excalidraw | No tenemos | Tampoco; sólo `.svg` estáticos | **DROP** | Si lo queremos, embed `.svg` directo. |
| MDX components inyectables | `mdx-content.tsx` (mapping shadcn) | `mdx-components-factory.tsx` (35+ comps con MUI) | **KEEP** | Adoptar todo arrastra MUI/Plotly/ag-grid (~700kB gzip). |
| Theming dark/light | `theme-provider.tsx` (next-themes) + tokens shadcn | `theme-switch.tsx` (lógica propia) | **KEEP** | Nuestro stack (next-themes + Tailwind v4 tokens) es más limpio. |

---

## 3. Lo que rompe si saltamos a v4.0 con Flowershow (Opción C)

1. **Velite content collections** — Flowershow NO usa Velite; usa `lib/markdown.ts` con `next-mdx-remote-client`. Compila MDX en runtime/RSC, no a HTML estático. Nuestro `velite.config.ts` (146 LOC, `s.markdown()`) y todo el pipeline `s.object()` se reemplaza. Pérdida: type-safety en frontmatter, build-time validation.
2. **Custom remark plugins propios** — `remark-wikilinks.ts` y `remark-obsidian-embed.ts` se sustituyen por `@flowershow/remark-wiki-link@3.4.0` + `lib/preprocess-mdx.ts`. El segundo no es un plugin remark publicado; hay que portarlo o reescribir.
3. **Mission Tracker M01–M12, AI Asistente, 6 roles BPA-003, ChangelogDrawer, sidebar resizable, mobile drawer Sheet, doc tabs Ctrl+Tab/W** — **Flowershow no tiene NADA de esto**. Reescritura completa: ~1500–2000 LOC de UI propia + estado (`mission-state.ts`, `doc-tabs.ts`, `ui-state.ts`, `active-doc.ts`, `reading-state.ts`).
4. **Velite HTML vs CompiledMDX** — Hoy servimos `doc.html` ya pre-renderizado (rapidísimo, edge-friendly). Flowershow streamea MDX por RSC (LCP cambia, hidratación distinta).
5. **App Router** — Se preserva (Flowershow también usa `app/`), pero el shell `(public)` y `(cloud)` está pensado para multi-tenant; nuestras rutas `comunidades/[...slug]` no encajan sin gut-job.
6. **Stack de estilos** — Flowershow está en Tailwind 3 + MUI + Emotion + UnoCSS. Nosotros Tailwind v4 + shadcn 4.4. Adoptar sus componentes MDX trae 3 motores CSS conviviendo.
7. **Servicios externos** — Search → Typesense (Docker), Cloud → Inngest + Postgres + S3/MinIO. Nada de eso lo necesitamos.

Riesgo neto Opción C: **alto y sin retorno claro**.

---

## 4. Beneficios de adopción selectiva

| Componente | Cómo extraer | LOC nuestros eliminados | Bundle añadido | Feature gana |
|---|---|---|---|---|
| `@flowershow/remark-wiki-link@3.4.0` | `pnpm add` directo, drop-in del viejo `@portaljs/remark-wiki-link` | ~30 LOC del wrapper en `remark-wikilinks.ts` | +2 kB gzip (similar) | Anchors `#heading`, alias `\|`, embed flag mejorados. |
| `lib/remark-obsidian-bases.ts` (parser) + `bases-parse.ts` + `bases-expr.ts` | Copiar 3 archivos (~600 LOC), licencia MIT, retirar deps server-only | 0 (feature nueva) | +12 kB gzip (`jsep` + helpers) | Soporte Obsidian Bases BETA. |
| Vistas Bases (cards/list/table) | **NO copiar** Flowershow (MUI + ag-grid). **Reescribir** con shadcn `<Card>` + `<Table>` + `<DataTable>` (TanStack Table que ya tenemos). | 0 | +0 (reusa shadcn) | UI consistente con resto del portal. |
| `table-of-contents.tsx` patrón IntersectionObserver | Copiar lógica (~80 LOC), adaptar a tokens shadcn | 0 | +0 | Active-section highlight más sólido que el nuestro. |
| `remark-youtube-auto-embed.ts` | Copiar 1 archivo | 0 | +1 kB | YouTube `[[]]` auto-embed. |
| `process-canvas.ts` + `canvas-renderer.ts` | Copiar 2 archivos | 0 | +5 kB | Render de `.canvas` Obsidian si lo necesitamos. |

Total LOC extraído: ~700–800 (todo licencia MIT). Bundle delta neto: ≤ +20 kB gzip si reescribimos vistas Bases.

---

## 5. Plan v4.0 ranked

### Opción A — Cherry-pick (RECOMENDADA) — effort **M**, risk **bajo**

Mantener stack actual. Sumar:
- Bump `@portaljs/remark-wiki-link@1.2` → `@flowershow/remark-wiki-link@3.4.0`.
- Portar parser de Bases (3 archivos `.ts`).
- Reescribir 3 vistas Bases con shadcn (cards/list/table).
- Adoptar patrón IntersectionObserver del TOC en nuestro outline.
- Opcional: `remark-youtube-auto-embed`, `process-canvas`.

Efectos:
- **Bundle**: +18–22 kB gzip.
- **LCP**: sin cambio (Velite HTML estático sigue).
- **Mantenimiento**: bajo (deps OSS pinned).
- **Pierde el usuario**: nada.
- **Roadmap**: 1 semana de dev.

### Opción B — Hybrid runtime — effort **L**, risk **medio**

Reemplazar nuestros remark-* propios por todos los plugins del ecosistema Flowershow + adoptar la suite MDX (`mdx-components-factory.tsx` parcial) sin tocar Mission Tracker.

Efectos:
- **Bundle**: +120–180 kB gzip (al traer fragmentos del factory que arrastran Plotly/Vega aunque sea con dynamic import).
- **LCP**: regresión 200–400 ms si activamos `next-mdx-remote-client` para algunas rutas.
- **Mantenimiento**: medio; mezcla Velite + MDX runtime es frágil.
- **Pierde el usuario**: nada visible, gana data-viz inline.
- **Roadmap**: 2.5 semanas.

### Opción C — Full migration al shell Flowershow — effort **XL**, risk **alto**

Migrar a `apps/flowershow/app/(public)` como template y reescribir Mission Tracker / AI / sidebar / 6 roles encima.

Efectos:
- **Bundle**: +400–600 kB gzip (MUI + Emotion + ag-grid + Typesense + Plotly).
- **LCP**: regresión 600–900 ms; SSR streaming MDX vs HTML cacheado.
- **Mantenimiento**: alto; Flowershow está optimizado para SaaS multi-tenant, no para nuestro modelo.
- **Pierde el usuario**: temporalmente todo lo custom (3D graph, hover-preview, doc tabs, ChangelogDrawer) hasta reescribirlo.
- **Roadmap**: 3–4 semanas + riesgo de regresiones de paridad.

---

## 6. Recomendación final

**Adoptar Opción A (Cherry-pick)**. Nuestra v3.5 ya iguala o supera a Flowershow en todo salvo Bases (que es BETA en ellos) y un detalle de TOC; el resto de Flowershow main es producto SaaS con dependencias pesadas (MUI, ag-grid, Typesense, Inngest, Postgres) que no nos sirven y degradarían LCP. La v4.0 debe ser “v3.5 + Bases + wiki-link 3.4 + pulido TOC”, no una migración estructural.

---

## 7. Migration checklist (Opción A)

1. Crear branch `feat/v4.0-cherry-pick` desde `main`.
2. `pnpm remove @portaljs/remark-wiki-link` en `apps/portal-next`.
3. `pnpm add @flowershow/remark-wiki-link@^3.4.0`.
4. Actualizar import en `src/lib/remark-wikilinks.ts` y comprobar API (`pageResolver`, `hrefTemplate`, `aliasDivider`); ajustar tests.
5. Ejecutar `pnpm test` + smoke render de 3 docs con wikilinks, alias y anchors `[[doc#sec|alias]]`.
6. Crear `src/lib/bases/` con port de `remark-obsidian-bases.ts`, `bases-parse.ts`, `bases-expr.ts` (copiar bajo MIT, conservar header de copyright Flowershow).
7. Añadir `s.base()` schema en `velite.config.ts` para colectar `*.base` files.
8. Implementar `src/components/bases/bases-view.tsx` que reciba `viewData` y delegue en `bases-cards.tsx`, `bases-list.tsx`, `bases-table.tsx`.
9. `bases-table.tsx` usar TanStack Table (shadcn DataTable existente); `bases-cards.tsx` usar `<Card>` shadcn; `bases-list.tsx` `<ul>` semántico tematizado.
10. Registrar `<BasesView>` en `mdx-content.tsx` como componente MDX inyectable.
11. Crear test fixture `content/_test/sample.base` y snapshot de las 3 vistas.
12. Refactor `right-panel.tsx` outline tab para usar IntersectionObserver con `rootMargin: "-20% 0px -70% 0px"` (patrón de `apps/flowershow/components/public/table-of-contents.tsx`).
13. (Opcional) Portar `remark-youtube-auto-embed.ts` a `src/lib/remark-youtube.ts` y registrar en `velite.config.ts`.
14. (Opcional) Portar `process-canvas.ts` para soportar `.canvas` si hay contenido que lo requiera (verificar antes con `grep ".canvas"` en `content/`).
15. Validar bundle delta con `next build --turbopack` + `pnpm dlx source-map-explorer .next/static/chunks/*.js` (objetivo < +25 kB gzip).
16. Lighthouse en `/comunidades/m04` antes/después: LCP no debe degradarse > 50 ms.
17. Actualizar `CHANGELOG.md` y `AGENTS.md` con: v4.0 release notes (wiki-link 3.4, Bases BETA, TOC mejorado).
18. Commit por feature (4–5 commits), squash-merge a `main`.
19. Tag `v4.0.0-rc.1`, deploy a preview, QA con stakeholders Mission Tracker.
20. Promote a `v4.0.0` cuando QA verde + 48 h sin regresiones en métricas Vercel.
