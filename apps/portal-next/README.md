# `apps/portal-next` — Portal técnico reforma·ud

Implementación Next.js 16 + React 19 del portal en producción [reforma-ud.vercel.app](https://reforma-ud.vercel.app).

> Para visión general del proyecto, ver el [README.md raíz](../../README.md). Para historial de cambios, ver [CHANGELOG.md](../../CHANGELOG.md). Para audits y decisiones, ver [docs/audit/](../../docs/audit/).

---

## Stack

| Capa | Tecnología | Versión | Notas |
|---|---|---|---|
| Framework | [Next.js](https://nextjs.org) | 16.2.4 | App Router + Turbopack |
| Runtime | React | 19.2.4 | concurrent features, Suspense, useTransition |
| Build de contenido | [Velite](https://velite.js.org) | 0.3.x | content collections con Zod |
| Styling | [Tailwind v4](https://tailwindcss.com) | 4 | `@theme inline`, `@utility`, `@custom-variant dark` |
| Components | [shadcn](https://ui.shadcn.com) + [radix-ui](https://radix-ui.com) | 4.4 / 1.4 | sheet, hover-card, tooltip, ... |
| Icons | [lucide-react](https://lucide.dev) | 1.11 | árbol minimal `treeshakeable` |
| Markdown | remark + rehype + KaTeX + Mermaid + obsidian-callouts | varios | wikilinks `[[ref]]` + embeds `![[ref]]` |
| Search | [cmdk](https://cmdk.paco.me) + [Pagefind](https://pagefind.app) | 1.1 / 1.5 | command palette + búsqueda full-text |
| Graph | [vis-network](https://github.com/visjs/vis-network) (2D) + [react-force-graph-3d](https://github.com/vasturiano/react-force-graph) + [three.js](https://threejs.org) (3D) + [three-spritetext](https://github.com/vasturiano/three-spritetext) | 10 / 1.29 / 0.184 | 2D forceAtlas2, 3D con sprites |
| AI | [Vercel AI SDK](https://sdk.vercel.ai) v5 + `@ai-sdk/anthropic` + `@ai-sdk/openai-compatible` | 6 / 3 / 2 | Haiku 4.5 + Kimi 2.5 (Moonshot) |
| Layout | [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | 4.10 | Group/Panel/Separator API v4 |
| Tests | [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev) | 4 / 1.59 | unit + e2e |
| Type-check | TypeScript 5 strict | — | `pnpm exec tsc --noEmit` |
| Lint | ESLint 9 + Biome (root) | — | `pnpm lint` |

## Comandos

```bash
pnpm dev          # velite + build-graph + next dev (Turbopack)
pnpm build        # velite + build-graph + next build
pnpm start        # next start sobre el output de pnpm build
pnpm lint         # eslint
pnpm test         # vitest
pnpm test:e2e     # playwright
pnpm velite       # solo content build (sin graph ni next)
pnpm graph        # solo regenerar grafo (debe ejecutarse después de velite)
node scripts/import-book-sections.mjs  # importa el capítulo libro al corpus
```

## Estructura

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # ThemeProvider + GraphProvider + sidebars + portales modales
│   ├── page.tsx                      # Home con jerarquía L1/L2/L3
│   ├── api/chat/route.ts             # Edge runtime, AI SDK streaming, Haiku/Kimi switcher
│   ├── canonico/
│   │   ├── page.tsx                  # Biblioteca M01-M12 agrupada por fase CRISP-DM
│   │   ├── grafo/
│   │   │   ├── page.tsx              # Toggle 2D/3D, layout Obsidian-style 3-paneles
│   │   │   └── loading.tsx           # Skeleton del canvas
│   │   └── [mid]/
│   │       ├── page.tsx              # Paper detail con SplitWorkArea + DocTabsBar + MDX
│   │       └── loading.tsx           # Skeleton MDX + TOC
│   ├── comunidades/[[...slug]]/      # Hub + 4 vicerrectorías + sub-niveles
│   ├── mision/                       # /mision overview + /mision/[paperId] detail
│   └── cca/[role]/[paperId]/         # Constancia imprimible
├── components/
│   ├── biblioteca/
│   │   ├── document-reader.tsx       # MDX + section gates
│   │   ├── doc-tabs-bar.tsx          # Tabs Obsidian con Ctrl+Tab/Ctrl+W
│   │   ├── outline-panel.tsx         # TOC con scroll-spy IntersectionObserver
│   │   ├── backlinks-panel.tsx       # Edges del grafo filtrados
│   │   ├── section-gate.tsx          # Pregunta de comprensión + toast
│   │   ├── split-work-area.tsx       # md + grafo local con react-resizable-panels
│   │   └── wikilink-preview.tsx      # HoverCard con MDX lazy + click-modifiers
│   ├── graph/
│   │   ├── graph-3d.tsx              # useGraph3DController + Canvas + Filters + Detail
│   │   ├── paper-local-graph.tsx     # Subgrafo N-hops del paper activo
│   │   └── vis-network-graph.tsx     # Vista 2D con forceAtlas2
│   ├── home/
│   │   ├── mission-tracker-widget.tsx
│   │   ├── mi-actividad.tsx
│   │   └── quick-tabs.tsx
│   ├── layout/
│   │   ├── header.tsx                # Tooltips + cmdk shortcut + ThemeToggle + Sheet mobile
│   │   ├── sidebar.tsx               # Resizable + SidebarMissionsWidget + filtros grafo contextuales
│   │   ├── sidebar-missions-widget.tsx
│   │   ├── right-panel.tsx           # 4 tabs (Outline/Refs/Preg/Chat) + ChatPane
│   │   ├── command-palette.tsx       # cmdk con Recientes + grupos
│   │   ├── changelog-drawer.tsx      # Detecta deploy nuevo via version.json
│   │   ├── cca-earned-modal.tsx      # Celebración al completar misión
│   │   ├── profile-menu.tsx          # 6 roles BPA-003
│   │   └── footer.tsx
│   ├── ui/                           # shadcn primitives
│   ├── mdx-content.tsx               # `new Function(code)` runtime MDX
│   ├── mdx-with-hover-preview.tsx    # Drop-in que intercepta wikilinks
│   └── theme-toggle.tsx
└── lib/
    ├── ui-state.ts                   # Hooks useLeftCollapsed, useLeftWidth, useRightPanel, useActiveProfile
    ├── doc-tabs.ts                   # useDocTabs con resolución pathname → tab id
    ├── mission-state.ts              # Cascada secuencial M01→M12, calcAllMissions, calcMissionStats
    ├── graph-context.tsx             # GraphProvider compartido entre página y sidebar
    ├── active-doc.ts                 # getActiveDocFromPath
    ├── reading-state.ts              # Progreso de secciones en localStorage
    ├── comprehension.ts              # Preguntas de comprensión por sección (ComprehensionRegistry)
    ├── estantes.ts                   # 5 estantes (Norma/Investigación/Guía/Deliberación/Sección)
    ├── sidebar-tree.ts               # Reconstruye árbol de comunidades
    ├── remark-wikilinks.ts           # `[[ref]]` y `[[ref|alias]]`
    └── remark-obsidian-embed.ts      # `![[ref]]`
```

## Pipeline de contenido

```
content/canonico/m##.mdx                                  velite (build)
content/comunidades/<slug>/index.mdx          ──────►    .velite/canonicPaper.json
content/comunidades/<slug>/<note>.mdx                    .velite/community.json
                                                          .velite/note.json
                                                          public/static/<assets>
                                                                │
                                                                ▼
                                                          scripts/build-graph.mjs
                                                                │
                                                                ▼
                                                          public/static/graph-global.json
                                                          public/static/graphs/<slug>.json (×17)
                                                                │
                                                                ▼
                                                          next build → SSG
```

### Remark plugins
1. `remark-gfm` — tablas, listas, strikethrough
2. `remark-math` — `$inline$` y `$$display$$`
3. `remark-obsidian-embed` — `![[ref]]` → componente embed
4. `remark-wikilinks` — `[[ref|alias]]` → `<a class="wikilink">`

### Rehype plugins
1. `rehype-slug` — IDs en headings
2. `rehype-autolink-headings` — anchors en hover
3. `rehype-callouts` (theme: obsidian) — `> [!abstract]`, `> [!warning]`, etc.
4. `rehype-raw` — convierte HTML embebido a hast (necesario para callouts dentro de MDX)
5. `rehype-katex` — render server-side de KaTeX
6. `rehype-pretty-code` — syntax highlighting con shiki

## State management

| State | Hook | Persistencia | Sincronización |
|---|---|---|---|
| Sidebar izq colapsado | `useLeftCollapsed` | localStorage | event-bus `reforma-ud:ui-state-change` |
| Ancho sidebar izq | `useLeftWidth` | localStorage clamp [200, 480] | event-bus |
| Sidebar derecho colapsado | `useRightPanel.collapsed` | localStorage | event-bus |
| Tab activa right panel | `useRightPanel.tab` | localStorage | event-bus |
| Rol activo + nombre | `useActiveProfile` | localStorage | event-bus |
| Tabs abiertas | `useDocTabs` | URL `?tabs=...` | nuqs-like en cliente |
| Progreso lectura | `getReadingState` | localStorage | event `reading-state-change` |
| Comprehension verified | `markSection` | localStorage | mismo |
| CCA celebrado | `CCAEarnedModal` | sessionStorage | una vez por sesión |
| Última versión vista | `ChangelogDrawer` | localStorage | comparado vs `version.json` |
| cmdk Recientes | `loadHistory` / `pushHistory` | localStorage (max 5) | — |
| Filtros grafo | `useGraph3DController` (en context) | en memoria | provider en layout |

## AI Asistente

Endpoint: `POST /api/chat` (Edge runtime, streaming).

### Body
```ts
{
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  model?: 'haiku' | 'kimi';                  // default: haiku
  activeDocId?: string;                       // para boost de citaciones
  activeCop?: string;                         // CoP context
  activeRole?: string;                        // 1 de 6 roles BPA-003
  missionMode?: boolean;                      // activa MISSION_MODE_PROMPT (anti-jailbreak)
  missionContext?: { paperId: string; sectionAnchor?: string; questionPrompt?: string };
}
```

### Modelos
- **Haiku 4.5** (`claude-haiku-4-5-20251001`) vía `@ai-sdk/anthropic` — default, baja latencia
- **Kimi 2.5** (`moonshot-v1-32k`) vía `@ai-sdk/openai-compatible` con `baseURL: api.moonshot.cn/v1`

### Anti-jailbreak (modo misión)
El `MISSION_MODE_PROMPT` rechaza explícitamente:
- "ignore previous instructions" / "ignora reglas previas"
- "act as" / "developer mode" / "DAN"
- "es solo entre tú y yo" / "el sistema falló"
- "dime solo la letra de la respuesta"
- "responde en código/JSON/idioma raro"

Si detecta bypass: responde *"Sigo en modo misión. No puedo darte la respuesta directa, pero puedo ayudarte con pistas."*

### Variables de entorno (Vercel)
```
ANTHROPIC_API_KEY=sk-ant-...
MOONSHOT_API_KEY=sk-...
```

## Deploy

```bash
# Auto: push a main → Vercel
git push origin main

# Manual desde apps/portal-next/
vercel deploy --prod
vercel alias set <new-deployment-url> reforma-ud.vercel.app
```

`reforma-ud.vercel.app` es alias del proyecto Vercel **`reforma-ud-v3`** (confusión histórica: existen también `reforma-ud-portal` con Astro viejo y `reforma-ud` también con Astro). Solo `reforma-ud-v3` tiene este código.

### Pipeline local-first (SOTA · lecciones de v4.0 deploy)

```
Layer 1 · Hot reload (<1s)        pnpm dev               90% errores
Layer 2 · Sanity (~10s)           velite + tsc --noEmit  Schema/tipos
Layer 3 · Build local (1-2min)    pnpm build             Bundle/SSG
Layer 4 · Vercel preview          git push (auto)        Prod-only edges
Layer 5 · Promote (<10s)          vercel promote <id>    Atomic swap
```

**Regla**: nunca saltar a Layer 5 sin pasar 1-3. La capa 5 NO debe re-buildear.

### Conocidos issues de deploy
- **`ERR_INVALID_THIS` en pnpm install (Vercel CI)**: bug Node 24 + pnpm 10 contra el mirror npm de Vercel. **Fix definitivo en v4.0**: `vercel.json` usa `npm install --legacy-peer-deps` en vez de `pnpm install`. npm no tiene este bug. Trade-off: TS strict requiere `as never` cast en arrays de plugins por mismatch de `unified` en flat tree.
- **TS error con `unified` Plugin types** tras switch a npm: cast los arrays de plugins a `as never` (`velite.config.ts` línea ~155 y ~191). Solo afecta build-time TS check; runtime idéntico.
- **Turbopack local Windows**: bug de resolución `next/package.json` con symlinks pnpm POSIX. Workarounds (en orden de robustez):
  1. WSL2 (Linux nativo, idéntico a Vercel)
  2. Docker `node:22 sh -c "pnpm install && pnpm build"`
  3. `.npmrc` con `node-linker=hoisted` (aplana, evita symlinks)
- **Lockfile drift**: `pnpm add` desde `apps/portal-next/` puede crear un `pnpm-lock.yaml` local en vez de actualizar el root. Eliminarlo y `pnpm install` desde la raíz.
- **Vercel CLI prebuild bug** (`Unable to find lambda for route: /canonico/grafo`): no usar `vercel build --prebuilt` con Next 16. Dejar que Vercel haga el build server-side.

### Rollback path
```bash
git checkout v3.4-stable   # Punto verde confirmado pre-Op-A migration
vercel deploy --prod       # Re-deploy del estado v3.4
vercel alias set <id> reforma-ud.vercel.app
```

## Convenciones de código

- **Server components por defecto**, marcar `'use client'` solo cuando se necesita interactividad/hooks.
- **Imports** vía alias `@/` (apunta a `src/`).
- **Tailwind** sin clases mágicas: usar tokens del `@theme` (`--color-brand-blue`, etc.).
- **shadcn**: copiar primitives a `components/ui/` (no instalar como librería).
- **Suspense** wrap obligatorio para hooks de búsqueda/searchParams en Next 16 App Router.
- **`Readonly<{...}>`** para props (ESLint S6759).
- **No nested `<button>`**: usar `<span>` o `<div role="...">` cuando se necesiten acciones múltiples.
- **MDX strict mode**: escapar `<digit` (ej. `<5%` → `\<5%`) y autolinks `<https://url>` → `[url](url)`.

## Tests

- Unit: `pnpm test` (Vitest)
- E2E: `pnpm test:e2e` (Playwright)
- Type-check pre-commit: `pnpm exec tsc --noEmit`

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026*
