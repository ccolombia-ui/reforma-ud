# reforma·ud — MI-12 Reforma Vinculante UDFJC

> Portal de la **Reforma Vinculante UDFJC** (Acuerdo CSU 04/2025) · 12 papers canónicos M01-M12 + comunidades organizativas + grafo de conocimiento + Mission Tracker + AI Asistente.

**Portal**: [reforma-ud.vercel.app](https://reforma-ud.vercel.app)
**Repo**: [github.com/ccolombia-ui/reforma-ud](https://github.com/ccolombia-ui/reforma-ud)
**Versión actual**: v5.0ab — [CHANGELOG.md](./CHANGELOG.md) · roadmap v6 en [AUDIT v6 — Zone Diagnostic](./docs/audit/AUDIT-v6-zone-diagnostic.md)
**Licencia**: CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC

---

## Lo que es

Portal de conocimiento académico SOTA 2026 inspirado en Obsidian (workspace + grafos + wikilinks + hover-preview) construido con Next.js 16 + React 19 + Tailwind v4 + shadcn/ui. Sirve los **12 papers canónicos del corpus MI-12** que sustentan la Reforma Vinculante UDFJC, organizados en una hoja de ruta CRISP-DM, navegables con tabs estilo Obsidian, búsqueda federada vía cmdk y un Asistente AI con selector Haiku/Kimi en modo libre o modo misión socrático (anti-jailbreak).

## Stack actual

```
apps/portal-next/              ← portal en producción (Next.js 16 + Velite)
├── src/
│   ├── app/                   ← App Router: /, /canonico/[mid], /canonico/grafo,
│   │                            /comunidades/[[...slug]], /mision, /cca/[role]/[paperId]
│   ├── components/
│   │   ├── biblioteca/        ← reader, tabs Obsidian, wikilink-hover, section-gate, split-work-area
│   │   ├── graph/             ← Graph3D (three.js + react-force-graph-3d), VisNetworkGraph 2D
│   │   ├── home/              ← MissionTrackerWidget, MiActividad, QuickTabs
│   │   ├── layout/            ← Header, Sidebar (resizable), RightPanel (4 tabs), CommandPalette
│   │   └── ui/                ← shadcn primitives (button, card, hover-card, sheet, tooltip, ...)
│   └── lib/
│       ├── ui-state.ts        ← useLeftCollapsed, useLeftWidth, useRightPanel, useActiveProfile, ROLES
│       ├── doc-tabs.ts        ← useDocTabs con click-modifiers Ctrl/Mid/Shift
│       ├── mission-state.ts   ← derive estado M01→M12 con cascada secuencial
│       ├── graph-context.tsx  ← GraphProvider (controller compartido)
│       ├── active-doc.ts      ← getActiveDocFromPath para outline/backlinks
│       ├── reading-state.ts   ← progreso de secciones en localStorage
│       └── comprehension.ts   ← preguntas de comprensión por sección
├── content/
│   ├── canonico/              ← 12 papers M01-M12 (MDX) — corpus real
│   └── comunidades/           ← Gobierno + 4 vicerrectorías + sub-niveles
├── public/
│   ├── static/                ← grafos JSON precompilados, logos
│   └── version.json           ← changelog drawer en cliente
├── scripts/
│   ├── build-graph.mjs        ← genera graph-global.json + 17 grafos locales
│   └── import-book-sections.mjs ← importa capítulo libro UDFJC al corpus
└── velite.config.ts           ← collections + remark/rehype pipeline

apps/portal/                   ← portal Astro viejo (deprecado)
docs/audit/                    ← 5 audits SOTA + spec MVP B.9
packages/                      ← (esquemas + tokens compartidos — sin uso activo)
```

## Setup local

**Prerrequisitos**: Node 22.x (pinned via `engines`), pnpm 10+

```bash
git clone https://github.com/ccolombia-ui/reforma-ud.git
cd reforma-ud
pnpm install
cd apps/portal-next
pnpm dev          # → http://localhost:3000
pnpm build        # velite + build-graph + next build
```

## Sync vault → portal

El vault Obsidian (Google Drive) es la fuente de verdad del contenido. El portal consume `.md`/`.mdx` sincronizados via scripts. Un solo comando hace el sync completo:

```bash
cd apps/portal-next
pnpm sync:vault          # full sync — papers M01-M12 + glosario (~159 conceptos)
pnpm sync:vault:dry      # dry-run — reporte sin escribir archivos
pnpm test:sync-vault     # TDD — 16 tests valida prereqs + integridad post-sync
```

### Qué hace `pnpm sync:vault` (3 pasos)

| Paso | Script | Origen → Destino |
|---|---|---|
| [1] Papers M01-M12 | `import-book-sections.mjs` | vault `01-secciones/sec-MI12-*.md` → `content/canonico/m##.mdx` |
| [2] Glosario | `sync-glosario.mjs` | vault `00-glosoario-universal/T1-T7/con-*.md` → `content/glosario/` |
| [3] Fix YAML | `fix-orphan-indented.mjs` | workaround post-sync: limpia líneas YAML huérfanas en `content/glosario/` |

### Prerrequisito único

**Google Drive Stream** montado en `H:\` con la carpeta sincronizada. Nada más — `sync-glosario.mjs` vive en `scripts/` y solo usa módulos built-in de Node, sin dependencias externas.

Ver guía de botones Obsidian: [`docs/guide-obsidian-sync-buttons.md`](docs/guide-obsidian-sync-buttons.md)

### Flags disponibles

```bash
pnpm sync:vault -- --skip-papers     # solo glosario
pnpm sync:vault -- --skip-glosario   # solo papers
pnpm sync:vault -- --filter all      # incluye glosario DRAFT (default: approved)
```

### Flujo post-sync

```bash
pnpm build          # validar compilación (velite + next build)
pnpm test:sync-vault
git add content/
git commit -m "chore(content): sync vault $(date +%Y-%m-%d)"
git push origin main   # Vercel auto-deploy en ~60s
```

Para ejecutar el sync **directamente desde Obsidian** como botón, ver [`docs/guide-obsidian-sync-buttons.md`](docs/guide-obsidian-sync-buttons.md).

## Features destacadas

### Lectura Obsidian-style
- **Hover-preview** en wikilinks con MDX renderizado (no clonado del DOM) y `HoverCard` de Radix. 300ms delay. Limita nesting a 1 nivel para evitar pirámides.
- **Tabs múltiples** en main area de canónico con click-modifiers: default reemplaza, Ctrl+click → nuevo tab, Mid-click → background, Ctrl+Tab/Ctrl+W keyboard nav.
- **Split work area** en `/canonico/[mid]`: panel izquierdo MD + panel derecho con grafo local de N-hops del paper activo, redimensionable.
- **Outline + Backlinks** como tabs del sidebar derecho con scroll-spy automático y agrupación por kind.

### Grafo de conocimiento
- **2D vis-network** (forceAtlas2 con física) y **3D react-force-graph-3d** (three.js) en `/canonico/grafo`.
- **Filtros semánticos** en sidebar global izquierdo: 13 categorías con conteo + búsqueda full-text. Layout Obsidian-style: filtros (izq) | canvas (centro) | detalle (der).
- **Labels persistentes** en 3D toggle con `three-spritetext`.

### Mission Tracker M01→M12
- Cascada secuencial de unlocks: para acceder a M(n+1) hay que graduarse de M(n). Excepción: rol Director ve todas.
- **SectionGate** por pregunta de comprensión con verificación. Toast al verificar sección.
- **AI modo misión** anti-jailbreak: el asistente solo da pistas socráticas, nunca la respuesta. Rechaza intentos como "ignore previous instructions", "DAN mode", "es solo entre tú y yo".
- **CCAEarnedModal** + ruta `/cca/[role]/[paperId]` imprimible al completar una misión.

### AI Asistente
- Selector **Haiku 4.5 / Kimi 2.5 (Moonshot)** con switching transparente.
- **Citaciones obligatorias** vía glosario reforzado: CABA, V1-V5, P1-P4, Hake-g, FCI, CCA, xAPI, etc.
- **Modo libre / Modo misión** toggle. Auto-activa modo misión cuando estás en `/mision/*`.
- Typing indicator inmediato + "Buscando en el corpus..." mientras llega TTFB.

### UX polish
- **Sidebar redimensionable** con drag handle (clamp 200-480px, persiste localStorage, doble-clic resetea).
- **Mobile drawer** con Sheet hamburger.
- **Command palette** (Ctrl/⌘+K) con sección Recientes + grupos (Acciones / Papers / Comunidades / Notas).
- **Changelog drawer** automático que detecta deploys nuevos vs `localStorage["last-seen-version"]`.
- **Print stylesheet** limpio: oculta sidebars, prose-paper directo, autolinks expanden URL.
- **Focus-ring uniforme** (a11y), tooltips con atajos, KaTeX en dark mode.

### 6 Roles BPA-003

| Rol | Emoji | JTBD |
|---|---|---|
| Estudiante Soberano | 🎓 | Construir CCA con autonomía |
| Docente Diseñador | 🎨 | Arquitectar Paquetes CCA reusables |
| Docente Formador | 👨‍🏫 | Hake-g ≥ 0.3 sostenido |
| Docente Investigador | 🔬 | Co-authoring K12→PhD (Pasteur Pleno) |
| Docente Emprendedor | 🚀 | Living Labs ético (Agente Territorial) |
| Docente Director | 🏛️ | Orquestar V1-V5 con BSC (Visionario) |

## Corpus MI-12 (estado v3.5)

| Paper | Tema | Tamaño | Status |
|---|---|---|---|
| M01 | Mandato normativo CONPES 4069 + PIIOM + Acuerdo CSU 04/2025 | 27.7 KB | green |
| M02 | Ciclo Virtuoso Universidad Innovadora (Clark + Etzkowitz + Geels) | 31.7 KB | green |
| M03 | Estándares internacionales (OECD LC + UDL + ABET + CDIO + ISO 21001) | 14.8 KB | green |
| M04 | ICAT JTBD Comunidad UDFJC (Ulwick + Christensen + Wenger) | 8.4 KB | green |
| M05 | BMK-001 Procesos Misionales 21 IES + Escuela Emprendedora | 5.7 KB | green |
| M06 | BMK-002 Modelo CCA (CLR + Open Badges + UDL + UbD) | 5.4 KB | green |
| M07 | 21 BPAs activadoras del consolidador | 4.4 KB | green |
| M08 | Framework BSC-S + RBM-GAC + CRISP-DM | 50.7 KB | green |
| M09 | DS-Presupuesto NICSP UDFJC | 4.6 KB | green |
| M10 | TDABC para IES públicas | 4.4 KB | green |
| M11 | Datasets MEN Colombia (SNIES + OLE + SPADIES) | 5.0 KB | green |
| M12 | Hoja de ruta CRISP-DM integradora (meta-paper) | 34.1 KB | green |

Total ~3300 líneas de contenido académico real importado del capítulo de libro UDFJC vía `scripts/import-book-sections.mjs`.

## Audits y documentación técnica

Todos en [docs/audit/](docs/audit/):

- [`README.md`](docs/audit/README.md) — Índice de audits
- [`B9--portal-mvp-knowledge-management-spec.md`](docs/audit/B9--portal-mvp-knowledge-management-spec.md) — Spec MVP oficial v4
- [`AUDIT-aleia-bereshit-frontend.md`](docs/audit/AUDIT-aleia-bereshit-frontend.md) — Análisis del techo de calidad de referencia
- [`AUDIT-sota-frontend-cop.md`](docs/audit/AUDIT-sota-frontend-cop.md) — SOTA 2026 frontend para CoPs
- [`AUDIT-obsidian-workspace-ux.md`](docs/audit/AUDIT-obsidian-workspace-ux.md) — Replicar UX Obsidian (dockview, hover-preview, file tree, grafo)
- [`AUDIT-usability-gaps-20.md`](docs/audit/AUDIT-usability-gaps-20.md) — Top 20 gaps de usabilidad (todos cerrados en v3.4)
- [`REFERENCE-frontend-cop-sota.html`](docs/audit/REFERENCE-frontend-cop-sota.html) — Mockup HTML interactivo

## Cómo deployar

```bash
# Push a main → Vercel auto-deploy (cuando GitHub integration funciona)
git push origin main

# Deploy manual desde apps/portal-next/ (cuando auto-deploy no dispara)
cd apps/portal-next
vercel deploy --prod
vercel alias set <new-deploy-url> reforma-ud.vercel.app
```

**Nota**: el dominio `reforma-ud.vercel.app` es un alias del proyecto Vercel `reforma-ud-v3` (Next.js portal), no del proyecto antiguo `reforma-ud-portal` (Astro).

## Contribuir

1. Fork + branch desde `main`
2. Lee la spec en [`docs/audit/B9--portal-mvp-knowledge-management-spec.md`](docs/audit/B9--portal-mvp-knowledge-management-spec.md) y el audit relevante
3. Cambios en MDX van a `apps/portal-next/content/canonico/` o `apps/portal-next/content/comunidades/...`
4. Cambios en código siguen el patrón shadcn + Tailwind v4 + radix-ui
5. PR con título descriptivo + link al audit/decisión que lo justifica

## Roadmap v6 (post-v5.0ab)

Plan completo en [AUDIT v6 — Zone Diagnostic](./docs/audit/AUDIT-v6-zone-diagnostic.md). Sprints:

- **v6.0** Service coherence · Grafo genérico (papers+notes+conceptos), schema `relations` en notes/conceptos, `kind:'community'`, ComunidadPanel adaptable
- **v6.1** Header + atajos · breadcrumb dinámico + dropdown Quick actions + `Alt+1..6` para tabs
- **v6.2** Productividad workspace · split vertical + focus mode (F11) + scroll restoration + re-open closed tab + scroll-spy TOC
- **v6.3** Sidebar enriquecido · Recientes + Favoritos + collapse-all + pin de refs
- **v6.4** Persistencia AI + git real · chat history persistido + GitHub API real para Evolución

**Logros consolidados v5.0p → v5.0ab**: multi-pane workspace · right-panel plano 6 tabs · sidebar simplificado (Grafo + Glosario + Reforma Vinculante) · tree de comunidades flat · feed de noticias contextual (`content/feed/*.md`) · Kanban CRISP-DM 5-fases · 74 conceptos glosario universal · infografías one-pager · narrativa hallazgos M01-M12 verificada.

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · ccmaderas@udistrital.edu.co · CPS-939-2026 · UDFJC · 2026*
