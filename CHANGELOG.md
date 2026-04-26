# Changelog · reforma·ud

> Historia de cambios del portal `reforma-ud.vercel.app` (apps/portal-next).
> Formato: [Keep a Changelog](https://keepachangelog.com/) · Versión: SemVer minor por sprint mayor.
> Cada release vive en `apps/portal-next/public/version.json` y dispara el drawer "Novedades" en cliente.

---

## [v3.5] — 2026-04-26 · Sprint S+5 · Corpus real

### Added
- **Importación del capítulo de libro UDFJC** completo: 12 secciones MI-12 reemplazan los stubs M01-M12.
  - M01 Mandato normativo (27.7 KB) · M02 Ciclo Virtuoso (31.7 KB) · M03 Estándares internacionales (14.8 KB)
  - M04 JTBD Comunidad UDFJC · M05 BMK Procesos Misionales · M06 BMK CCA · M07 21 BPAs
  - M08 Framework BSC-RBM-CRISP (50.7 KB · más extenso) · M09 NICSP · M10 TDABC
  - M11 Datasets MEN · M12 Meta-paper integrador (34 KB)
  - Total: ~3300 líneas de contenido académico real
- `scripts/import-book-sections.mjs` — importador idempotente desde Drive sync
- `rehype-raw` en pipeline velite (callouts → MDX-compatible)
- Status `red → green` para todos los M01-M12 (ya están FINAL)

### Fixed
- Comparaciones numéricas (`<5%`, `<10K`) escapadas para no confundir con JSX
- Autolinks markdown `<https://url>` expandidos a `[url](url)` (MDX strict mode)
- Frontmatter velite preservado raw (sin re-serializar)

### Pendiente
- Importar glosario `60-glosario/glo-*.md` para resolver wikilinks `[[glo-*]]` (Phase 2)

---

## [v3.4] — 2026-04-26 · Sprint A+B+C+D · 20/20 gaps usabilidad cerrados

### Added
- **Audit `AUDIT-usability-gaps-20.md`** con 20 gaps identificados por agente SOTA + plan en 4 sprints.
- **G03 Changelog drawer**: lee `version.json`, compara contra localStorage, auto-pop primera vez por sesión + pill flotante "Novedades · vN" bottom-left.
- **G04 Badges con count** en tabs del right-panel: Outline (headings count) + Refs (backlinks count).
- **G05 Loading skeletons** en `/canonico/[mid]` y `/canonico/grafo` (MDX skeleton + canvas placeholder).
- **G06 Mobile drawer**: hamburger md:hidden → Sheet con MobileSidebarContent.
- **G07 Wikilinks rotos visibles**: clase `.wikilink-broken` con `⚠` prefix dashed underline.
- **G08 Keyboard nav tabs**: Ctrl+Tab next, Ctrl+Shift+Tab prev, Ctrl+W cerrar activa.
- **G09 Atajos visibles**: kbd `⌘K` / `Ctrl+K` detectado por platform; tooltips uniformes en header.
- **G10 EmptyState** component reutilizable en 3 sizes (sm/md/lg).
- **G11 KaTeX dark contraste**: `.dark .katex { color: var(--foreground) }`.
- **G12 Mission feedback**: `toast.success` al verificar sección + Toaster sonner en layout.
- **G13 AI typing indicator inmediato**: 3 dots animation + "Buscando en el corpus..." antes de TTFB.
- **G14 Tooltips uniformes**: shadcn Tooltip en todos los iconos del header + drag-handle con doble-clic reset a 288px.
- **G16 Print stylesheet**: `@media print` oculta sidebars, prose-paper limpio, anchors expanden URL.
- **G17 cmdk con Recientes**: localStorage history (5 max), grupo "Recientes" al tope cuando query vacío.
- **G18 Hover-preview nesting limit**: `HoverDepthCtx` máx 1 nivel para evitar pirámides infinitas.
- **G19 focus-ring uniforme** (a11y): `@utility focus-ring` + reset global a interactivos.
- **G20 Home hierarchy 3 niveles**: L1 hero+tracker / L2 banda muted con actividad+KPIs / L3 cards.

### Fixed
- **G01** Sidebar izquierdo no scrolleaba: `min-h-0 overscroll-contain` en flex child.
- **G02** Filtros del grafo 3D ahora viven en sidebar global (`GraphProvider` context). El canvas ocupa el área completa.

### Deferred
- **G15** Persistencia unificada (refactor interno sin UX visible) — backlog.

---

## [v3.3] — 2026-04-25 · S+2 · Outline + Backlinks + Labels 3D

### Added
- **Outline panel** en sidebar derecho: TOC del doc activo con scroll-spy via IntersectionObserver, highlight del heading visible, indent jerárquico H2/H3/H4.
- **Backlinks panel** en sidebar derecho: edges del grafo global filtrados a `target === activeDoc.id`, agrupados por kind (Papers / Notas / Comunidades).
- **Right Panel ampliado a 4 tabs**: Outline / Refs / Preg / Chat (Outline+Refs deshabilitados sin doc activo).
- **`useRightPanel` con RightTab union** de 4 valores + isRightTab guard.
- **Labels persistentes en grafo 3D** según zoom: toggle Tag en controles flotantes, lazy-load `three-spritetext`, sprite con texto + color del nodo.
- **`getActiveDocFromPath`** helper para detectar el doc activo desde pathname (paper M## o note).

---

## [v3.2] — 2026-04-25 · S+1.5 · Sidebar redimensionable + Misiones widget

### Added
- **Sidebar izquierdo redimensionable**: drag handle 4px en borde derecho con hot-zone 12px y halo en hover, ancho persistido en localStorage (clamp [200, 480]px), indicador en vivo durante drag, doble-clic resetea a 288px.
- **`SidebarMissionsWidget`** al tope del sidebar: misión activa con barra de progreso + 3 stats (Hechas/Avance/CCAs), pertenencia + resultados.
- **`useLeftWidth`** hook con event-bus para sincronización.
- **Logo UDFJC placeholder** en header: SVG círculo rojo + texto blanco.

### Changed
- Títulos de SectionToggle más compactos: `text-[9px]` con menos padding y emoji semi-transparente.
- Header del sidebar removido (brand ya está en header global).

---

## [v3.1] — 2026-04-25 · S+1 · Hover-preview + Tabs Obsidian

### Added
- **Hover-preview en wikilinks** Obsidian-style: Radix HoverCard con 300ms delay, lazy MDX render del doc destino, resuelve papers/notas/comunidades desde Velite, kind=broken para enlaces rotos.
- **Tabs simples Obsidian-style** en `/canonico`: `useDocTabs` hook con estado en `?tabs=...&active=...`, click-modifiers (Ctrl+click → nuevo tab, Mid-click → background, default → reemplaza activo), close button + mid-click cierra, sticky bajo header.
- **MDX click handler** con modificadores en WikiLinkPreview.

---

## [v3.0] — 2026-04-24 · S0 · Migración Astro → Next.js 16

### Added
- **Migración completa** de `apps/portal` (Astro + Starlight) a `apps/portal-next` (Next.js 16 + React 19 + Tailwind v4 + shadcn).
- **Mission Tracker M01→M12**: cascada secuencial de unlocks, SectionGate por pregunta, MissionTip heurístico, AI modo misión anti-jailbreak.
- **CCAEarnedModal** global: detecta transiciones a 'completed', celebración con sessionStorage anti-spam.
- **`/cca/[role]/[paperId]`** imprimible: sello + métricas + código de verificación.
- **Split work area Obsidian-style** en `/canonico/[mid]`: react-resizable-panels Group/Panel, md+local graph paneles redimensionables.
- **Grafo 3D** con `react-force-graph-3d` + `three.js`: filtros semánticos (13 categorías), búsqueda full-text, layout Obsidian-style 3-paneles.
- **AI Asistente** con selector Haiku 4.5 / Kimi 2.5 (Moonshot AI), citaciones obligatorias, glosario reforzado, modo misión socrático.
- **6 roles BPA-003**: Estudiante / Diseñador / Formador / Investigador / Emprendedor / Director con perspectivas personalizadas.
- **`cmdk` command palette** con grupos (Acciones / Papers / Comunidades / Notas / Tema).
- **Velite content collections**: canonicPaper, community, note con KaTeX + callouts + Mermaid + remark-obsidian-embed (wikilinks `[[ref]]` y embeds `![[ref]]`).
- **Reading state + comprehension state** en localStorage con event-bus.

---

## Roadmap pendiente

- **S+2.E.1** File tree con `react-arborist` (cuando corpus crezca >50 docs)
- **S+3** Migración a `dockview` para drag-tabs entre paneles + Quick switcher con headings + filtros DSL en grafo
- **S+4** Frontmatter editor inline + stacked tabs + hover-to-reveal + sync workspace state a server
- **S+5 Phase 2** Importar glosario `60-glosario/glo-*.md` como notes para resolver wikilinks `[[glo-*]]`
- **S+6** ETL Drive → mirror diario, RAG client-side sobre velite output, Open Badge 3.0 + xAPI integration

## Métricas de éxito (post-v3.4)

| Métrica | Baseline v3.0 | Target v3.4 | Estado |
|---|---|---|---|
| LCP móvil `/canonico/[mid]` | ~3.8s | < 2.5s | ✓ con loading.tsx |
| CLS home | ~0.18 | < 0.05 | ✓ con jerarquía L1/L2/L3 |
| Tab-walk sin perder foco | 4-6 botones ciegos | 0 | ✓ con G19 focus-ring |
| Sidebar scrollable | roto | 30+ items | ✓ con G01 fix |
| AI TTFB perceived | ~2s | < 300ms | ✓ con G13 typing indicator |
| Doc-density / sesión | 1.4 | ≥ 5 | medirá con telemetría |

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026*
