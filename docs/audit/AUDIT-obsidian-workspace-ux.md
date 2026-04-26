---
kd_id: audit/obsidian-workspace-ux
kd_version: 1.0.0
kd_status: DRAFT
kd_doc_type: AUDIT
kd_title: SOTA Obsidian Workspace UX para reforma-ud Biblioteca
kd_created: 2026-04-25
kd_modified: 2026-04-25
kd_responsible: Carlos C. Madera
kd_classification: PUBLIC
---

# AUDIT — SOTA Obsidian-Workspace UX para reforma-ud · Biblioteca

> **Pregunta trazadora**: ¿Cómo replicamos la ergonomía de Obsidian (paneles dockables, tabs draggables, hover-preview de enlaces, grafo interactivo, file tree) dentro de un Next.js 16 App Router + Tailwind v4 + shadcn, manteniendo nuestro stack actual y sin reinventar la rueda?

**Autor**: Carlos C. Madera Sepúlveda
**Fecha**: 2026-04-25 · **Stack base** (verificado): `next@16.2.4`, `react@19.2.4`, `tailwindcss@4`, `shadcn@4.4`, `radix-ui@1.4`, `react-resizable-panels@4.10`, `react-force-graph-3d@1.29` + `three@0.184`, `vis-network@10`, `cmdk@1.1`, `velite@0.3`, `ai@6` + `@ai-sdk/anthropic@3`.

---

## 0. TL;DR — decisión consolidada

La identidad de Obsidian se reduce a **siete capacidades** que el usuario percibe como "puedo trabajar como yo trabajo":

1. **Tabs múltiples por panel** + **paneles split** + **drag de tabs entre paneles**.
2. **Hover-preview** del documento destino al pasar sobre un wikilink.
3. **File tree** lateral (no listado plano) con expand/collapse.
4. **Vista de grafo** local + global con filtros, grupos cromáticos y panel de fuerzas.
5. **Quick switcher** (Ctrl+O) y **command palette** (Ctrl+P) federados.
6. **Sidebars colapsables** con drag-handle y persistencia de layout.
7. **Outline + Backlinks + Properties** como leaves intercambiables del sidebar derecho.

De estas siete, **ya tenemos parcialmente 4, 5, 6**. Las brechas críticas son **1 (tabs/dock), 2 (hover-preview), 3 (file tree), 7 (outline/backlinks como leaves)**.

**Recomendación macro**: NO migrar todo el portal a un dock — adoptar un patrón híbrido **shadcn sidebars + dockview en el main area de la biblioteca**. Implementar primero hover-preview (S) y tabs simples (M) antes de comprometernos con dockview. Roadmap detallado en §7.

---

## 1. Anatomía del Workspace de Obsidian

Obsidian organiza la pantalla en un árbol recursivo:

```
Workspace
├── Left Sidebar (split vertical de leaves)
│   ├── leaf: File Explorer (tree)
│   ├── leaf: Search
│   ├── leaf: Bookmarks
│   ├── leaf: Tag pane
│   └── leaf: Graph view (cuando se "stowea")
├── Root Split (recursivo: Tab Group | Split | Tab Group)
│   ├── Tab Group A
│   │   ├── tab: nota1.md (pinned)
│   │   ├── tab: nota2.md
│   │   └── tab: graph view local
│   └── Tab Group B (split vertical)
│       └── tab: nota3.md
└── Right Sidebar
    ├── leaf: Outline
    ├── leaf: Backlinks
    ├── leaf: Tag pane
    └── leaf: Properties (frontmatter editor)
```

**Conceptos clave**:

- **Leaf**: vista atómica (editor MD, grafo, búsqueda, outline). Es la unidad reemplazable.
- **Tab Group**: contenedor horizontal de tabs (cada tab = una leaf).
- **Split**: divisor horizontal o vertical entre dos Tab Groups o entre dos Splits.
- **Pin**: previene que la leaf activa sea reemplazada al hacer click en un wikilink (default behavior de Obsidian = "abrir en mismo tab").

**Interacciones canónicas**:

| Atajo | Acción |
|---|---|
| `Ctrl+P` | Command palette |
| `Ctrl+O` | Quick switcher (file by basename + headings + aliases) |
| `Ctrl+Shift+-` | Split horizontal |
| `Ctrl+Shift+\` | Split vertical |
| `Ctrl+W` | Cerrar tab |
| `Ctrl+click` wikilink | Abrir en nuevo tab del mismo grupo |
| `Ctrl+Alt+click` wikilink | Abrir en nuevo split a la derecha |
| `Mid-click` wikilink | Abrir en background tab |
| `Ctrl+hover` wikilink | Page Preview (300 ms delay) |
| `Drag tab → gutter` | Spawn nuevo split |
| `Alt+drag node` (graph) | Pin posición permanente |

**Detalles de polish que crean la sensación "Obsidian"**:

- Drag-handle del split: 1 px en reposo → 4 px hot-zone → 8 px halo en hover → fill con accent color al arrastrar.
- Tabs que exceden el ancho del grupo se rotan 90° y se apilan verticalmente (stacked tabs).
- Etiquetas de nodo en el grafo: `opacity` interpola con el zoom (`fadeThreshold` configurable).
- Hover-preview: card flotante posicionada con collision-detection, renderiza el MD completo con KaTeX/embeds activos.
- Sidebars colapsan a 0 px con animación 150 ms; el botón flotante reaparece como "pill" en el borde.

---

## 2. Stack web SOTA 2026 — librerías por capacidad

### 2.1 Workspace dockable (tabs + splits + drag-between-groups)

| Librería | Tabs nativos | Drag entre grupos | Resize | React 19 | Licencia | Veredicto |
|---|---|---|---|---|---|---|
| **`dockview`** (`dockview-react`) | ✓ first-class | ✓ nativo | ✓ | ✓ peer-flexible | MIT | **Ganador**. Inspirado en VS Code. https://dockview.dev |
| `react-mosaic` | Sólo a través de addon | ✓ | ✓ | ✓ vía wrapper | BSD-2 | Maduro pero cadencia lenta. Tabs no son ciudadanos primarios. |
| `golden-layout` | ✓ | ✓ | ✓ | Vía adapter | MIT | Framework-agnostic. Adapter React menos pulido. |
| `react-grid-layout` | ✗ | N/A | ✓ | ✓ | MIT | Es para *dashboards*, no para editores. |
| `react-resizable-panels` (actual) | ✗ | N/A | ✓ | ✓ | MIT | Splitter primitivo excelente, sin tabs. **Lo usamos hoy**. |

**Recomendación**: **`dockview-react`** para el área principal de la biblioteca. Mantener `react-resizable-panels` para el shell global (entre sidebars). Esto evita un rewrite total y aísla la complejidad al área donde aporta valor.

### 2.2 File tree

| Librería | Virtualizado | DnD | A11y | Tamaño | Veredicto |
|---|---|---|---|---|---|
| **`react-arborist`** | ✓ | ✓ | ✓ keyboard | ~30 KB | **Ganador**. https://github.com/brimdata/react-arborist |
| `@minoru/react-dnd-treeview` | Parcial | ✓ vía react-dnd | Manual | ~50 KB con react-dnd | Funciona pero arrastra react-dnd. `[verificar React 19]` |
| Recipe shadcn `Tree` | ✗ | ✗ | Manual | <5 KB | Bien para <500 nodos. Ideal para sidebar de Estantes que ya tenemos. |

**Recomendación**: `react-arborist` para el árbol de notas/papers cuando crezca el corpus; **shadcn Tree** mientras tengamos <500 entradas (que es nuestro caso 2026).

### 2.3 Hover-preview cards

- **Radix `HoverCard`** (ya disponible vía `radix-ui@1.4`) cubre el 80% del caso. Soporta delay, dismiss, accesibilidad.
- **`@floating-ui/react`** directamente cuando: (a) necesitas anchors virtuales (hover sobre HTML inyectado por MDX), (b) collision detection compleja, (c) arrow positioning. Radix HoverCard ya envuelve floating-ui internamente — solo upgradear cuando se choque con sus límites.

**Pattern para preview de wikilinks** (usado por AnyType, Logseq web, Notion):

```tsx
// 1. Velite indexa cada doc → genera `notes-index.json` con { slug, excerpt, body }.
// 2. WikiLink renderiza <HoverCard>; al abrir, lazy-fetch al index + render MDX.
// 3. Memoizar por slug en sessionStorage para no re-render en hovers repetidos.
// 4. Reusar el MISMO MDXComponents map que el reader principal (KaTeX, Callout, Mermaid).
```

**No hacer**: clonar el DOM del documento destino. Causa colisiones de IDs (KaTeX y Mermaid generan `id=` únicos), event handlers rotos, layout thrash.

### 2.4 Grafo de conocimiento

| Librería | 2D | 3D | Filtros | Lock posición | Highlight neighbours | Veredicto |
|---|---|---|---|---|---|---|
| **`cytoscape.js`** | ✓ | ✗ | ✓ selectors `node[type="x"]` | ✓ `lock()` | ✓ BFS API nativa | **Ganador 2D rich**. https://js.cytoscape.org |
| `vis-network` (actual) | ✓ | ✗ | Manual | Parcial | Manual | Nuestra base 2D. Suficiente para MVP. |
| `sigma.js v3` | ✓ | ✗ | Manual reducers | ✓ | Manual | https://www.sigmajs.org. Performance top, API más áspera. |
| **`react-force-graph-3d`** (actual) | ✗ | ✓ | Manual | `fx/fy/fz` | Custom | **Único maduro 3D web**. https://github.com/vasturiano/react-force-graph |
| `r3f` + `three.js` directo | ✗ | ✓ | DIY | DIY | DIY | Solo si necesitas WebGL custom. |

**Recomendación**: mantener `react-force-graph-3d` (ya integrado). Para 2D: considerar migración a `cytoscape.js` cuando los filtros semánticos crezcan (ahora `vis-network` alcanza). **No** mezclar 3 librerías de grafo — añade peso de bundle innecesario.

### 2.5 Command palette / Quick switcher

`cmdk` (https://cmdk.paco.me) ya instalado. Patterns SOTA:

- Grupos: `Files`, `Headings`, `Actions`, `Recent`.
- Fuzzy ranker: `match-sorter` (https://github.com/kentcdodds/match-sorter) o `fuse.js` para tolerancia tipográfica.
- Recency weighting: localStorage + decay exponencial (Obsidian usa half-life ~14 días).
- Headings nested: render anidado bajo el archivo padre, con `cmd+enter` para abrir en nuevo tab.

### 2.6 Outline / Backlinks / Properties

- **Outline**: derivar del MDX en build-time. `velite` ya extrae headings; basta exponerlo como `paper.toc`. Componente: lista colapsable con scroll-spy via `react-intersection-observer` o `IntersectionObserver` nativo.
- **Backlinks**: nuestro `build-graph.mjs` ya genera aristas. Filtrar al subset `target == active_doc` y renderizar lista con preview de párrafo conteniendo el wikilink.
- **Properties** (frontmatter editor): `react-hook-form` + `zod` para tipar; campos según schema KDMO.

---

## 3. Landscape competitivo 2026 — apps que ya replican Obsidian

| App | Diferenciador | Stack hint |
|---|---|---|
| **Logseq** (web demo) | Outliner + bidireccional | ClojureScript + React + DataScript `[verificar]` |
| **AnyType** | Local-first, encrypted, objetos tipados | Electron + React + Go middleware |
| **Heptabase** | Whiteboard espacial de notas | React + canvas tldraw-like `[verificar]` |
| **Reflect** | CRDT sync + AI nativo + voice notes | React + custom CRDT |
| **Capacities** | Object-oriented PKM con templates | React + tiptap `[verificar]` |
| **Tana** | Supertags + queries en vivo | ClojureScript `[verificar]` |
| **AppFlowy** | Open-source Notion clone | Flutter web + Rust |
| **Roam Research** | Block-graph original `((refs))` | ClojureScript + Datomic |
| **Notion** | Hover-preview con peek modal | Next.js + custom MDX |

**Lección agregada**: el patrón ganador 2026 es **"Obsidian en el centro + Notion en la periferia"** — workspace dockable + propiedades estructuradas + queries declarativas. Capacities y Tana lo demuestran.

---

## 4. Micro-patterns que crean la sensación "Obsidian"

| Pattern | Detalle | Implementación |
|---|---|---|
| **Hover delay 300 ms** | Suficiente para evitar triggers accidentales | `<HoverCard openDelay={300}>` |
| **Pinned tabs** | El click en wikilink reemplaza tab activo SI no está pinned | Estado `tab.pinned: boolean` + lógica de reemplazo |
| **Stacked tabs** | Tabs apilados verticalmente cuando exceden ancho | `dockview` lo soporta nativamente `[verificar API exacta]` |
| **Drag-handle visual** | 1 px → 4 px hot-zone → 8 px halo → accent fill | Tailwind `data-[hover]:` + `data-[drag=true]:` |
| **Zoom-aware labels** | Label visible si `zoom > threshold` | `nodeThreeObject` con sprite cuyo `material.opacity` varía con `cameraDistance` |
| **Hover-to-reveal sidebar** | Sidebar derecho colapsado expande en hover | CSS `:hover` + `transition` 200 ms con hide-delay |
| **Frontmatter inline edit** | Click en propiedad activa input contextual | `react-hook-form` con campos contextuales por tipo |
| **Local graph "pulse"** | Nodo activo pulsa al cambiar de doc | `requestAnimationFrame` + sinusoidal scaleFactor |
| **Backlink preview párrafo** | Cada backlink muestra párrafo conteniendo el link | Velite extrae context window de ±2 oraciones |
| **Fold/unfold all headings** | `Ctrl+Cmd+1..6` colapsa hasta nivel N | Reducer sobre tree de headings |

---

## 5. Recomendación específica para reforma-ud (ROI-ranked)

| # | Item | Justificación | Complejidad | Sprint |
|---|---|---|---|---|
| **1** | **Hover-preview en wikilinks** | Mayor "Obsidian-ness" por hora trabajada. Tenemos pipeline MDX + remark-obsidian-embed. Glue es ~150 LOC. | **S** (1-2 días) | S+1 |
| **2** | **Tabs en main area de biblioteca** | Sin tabs cada navegación pierde contexto. Empezar simple (estado React + URL `?tabs=m01,m02&active=m02`); luego escalar a dockview. | **S→M** (3-5 días) | S+1 |
| **3** | **File tree lateral con react-arborist** | Reemplaza listado plano de papers/notas. UX scale para corpus >50. | **M** (5 días) | S+2 |
| **4** | **Outline + Backlinks como panels colapsables** | Reusar TOC velite + grafo edges. ROI alto, bajo riesgo. | **M** (4 días) | S+2 |
| **5** | **Migrar a dockview** (split + drag tabs) | Verdadero docking. Hacer DESPUÉS de validar tabs simples. | **L** (1-2 sem) | S+3 |
| **6** | **Labels persistentes en grafo 3D según zoom** | Polish. Mejora orientación en grafos densos. | **S** (1 día) | S+2 |
| **7** | **Quick switcher con headings** | Extender cmdk con índice de headings. Boost de productividad para usuarios power. | **M** (3 días) | S+3 |
| **8** | **Frontmatter editor inline** | Solo si los roles `Docente Diseñador` lo necesitan. Validar con users primero. | **M** (5 días) | Backlog |
| **9** | **Drag tabs entre grupos** | Solo factible una vez en dockview. | **L** | S+3+ |

**Mínimo Viable Obsidian-clone para reforma-ud Biblioteca** = items 1 + 2 + 3 + 4. ~2-3 semanas de un ingeniero.

---

## 6. Anti-patterns — qué NO copiar

| ❌ Anti-pattern | Por qué | Alternativa |
|---|---|---|
| **Iframe-based panes** | Rompe state compartido, hover-preview portal, hidratación | Mismo árbol React + portales |
| **Deep-cloning DOM en hover-card** | ID collisions (KaTeX, Mermaid SVG `id=`), handlers rotos | Re-render desde MDX source |
| **Layout en URL hash** | URLs no compartibles, fricción al copy-paste | localStorage + workspace doc opcional |
| **Wikilink resolution en runtime** | Walks de FS / fetches innecesarios | Resolver en velite build → `notes-index.json` |
| **Grafo como home page** | Cognitivamente caro; Obsidian lo esconde por algo | Grafo como destino opcional, no entrada |
| **DnD custom sin HTML5 fallback** | Pierde a11y keyboard, focus, screen-reader | dockview/react-arborist ya lo hacen bien |
| **MDX compile síncrono en hover** | Bloquea UI 100-300 ms en cada hover | Pre-compilar en build (velite); hover solo lazy-import del bundle ya emitido |
| **Resizable sin min/max** | Usuarios colapsan a 0 px y entran en pánico | Siempre `minSize` >= 200 px o forzar collapse-to-icon |
| **Tabs sin "close all to right"** | Usuarios acumulan 30 tabs y no saben cómo limpiar | Menú contextual `Close others / right / all` |
| **Hover-preview SIEMPRE visible** | Distrae al leer; Obsidian requiere `Ctrl+hover` por defecto | Configurable por usuario; default = `Ctrl+hover` |

---

## 7. Estado actual reforma-ud — gap honesto

### Lo que ya tenemos ✓

- 2D `vis-network` global graph + 3D `react-force-graph-3d` con filtros semánticos.
- `SplitWorkArea` (md + grafo local) con `react-resizable-panels` v4.
- Sidebars (izquierda navegación + derecha asistente) colapsables.
- Command palette `cmdk`.
- KaTeX + callouts + Mermaid + `remark-obsidian-embed` (wikilinks `[[ref]]` y embeds `![[ref]]`).
- Mission Tracker M01-M12 + AI modo misión + CCA imprimible.
- Reading state + comprehension state en localStorage con event-bus.
- 6 roles BPA-003 con perspectivas personalizadas.

### Lo que NOS FALTA vs Obsidian

1. **Tabs en main area** (gap #1). Cada nav reemplaza el doc visible.
2. **Drag-to-rearrange layout** (gap #2). Splitter sí, dock no.
3. **Hover-preview en wikilinks** (gap #3). MDX listo, falta glue.
4. **File tree real** (gap #4). Hoy sidebar lista plana o categórica.
5. **Outline / Backlinks como leaves** (gap #5). Outline ya en TOC sidebar; backlinks NO renderizados pese a existir como aristas.
6. **"Open to the right"** (gap #6). Necesita tabs (#1) + click handler con modificadores.
7. **Filtros de grafo *autorables*** (gap #7). Hoy presets; Obsidian permite escribir queries.
8. **Routing tabs ↔ Next.js** (gap #8). Necesita estrategia: `/biblioteca/[[...slug]]` + state in-memory de tabs + persistencia localStorage.

---

## 8. Plan de implementación por sprint (post-MVP-S3)

### Sprint S+1 — "Hover y Tabs" (semana 1-2)
- **D.1**: WikiLink Hover Preview component (Radix HoverCard + lazy MDX render desde notes-index velite).
- **D.2**: Tabs simples en `/biblioteca/[[...slug]]` — estado React + URL search params (`?tabs=m01,m02&active=m02`). Sin dockview aún.
- **D.3**: Click handler con modificadores (`Ctrl+click` → nuevo tab; `Mid-click` → background; `Ctrl+Alt+click` → split a la derecha cuando tengamos dockview).
- **D.4**: Pin tabs (`tab.pinned: boolean`) + comportamiento "reemplaza-si-no-pinned".

### Sprint S+2 — "Tree y Panels" (semana 3-4)
- **E.1**: File tree lateral con `react-arborist` para `apps/portal-next/.velite/canonicPaper.json + community.json + note.json`.
- **E.2**: Outline panel en sidebar derecho (alternativa al asistente AI; tab toggle).
- **E.3**: Backlinks panel — extraer del `graph-global.json` aristas con target=active_doc + render con preview de párrafo.
- **E.4**: Labels persistentes en grafo 3D según zoom (sprite con `material.opacity` interpolada).

### Sprint S+3 — "Dock real" (semana 5-7)
- **F.1**: Migrar `SplitWorkArea` y main area a `dockview-react`. Mantener react-resizable-panels para shell global.
- **F.2**: Drag tabs entre grupos. Spawn split por drag a gutter.
- **F.3**: Quick switcher con headings (`cmdk` extendido).
- **F.4**: Filtros autorables en grafo (query DSL minimal: `tag:caba`, `path:m0*`).

### Sprint S+4 — "Polish" (opcional)
- **G.1**: Frontmatter editor inline.
- **G.2**: Stacked tabs cuando overflow.
- **G.3**: Hover-to-reveal sidebars.
- **G.4**: Sync workspace state a server (per-user) cuando tengamos auth.

### Sprint S+5 — "Stress test con corpus real del capítulo de libro"
Una vez completados S+1 a S+4, importar al `content/` el corpus del capítulo de libro UDFJC Reforma Vinculante para validar el comportamiento del grafo, los wikilinks y la búsqueda con conceptos académicos reales.

- **Origen**: `H:\.shortcut-targets-by-id\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\daath-zen\R002-daath-cortex\20--udfjc-reforma-vinculante\3-diseño-capitulo-libro\` (~277 archivos `.md`).
- **Estructura origen** organizada en: `01-secciones`, `02-figuras`, `03-evaluaciones`, `10-ecuaciones`, `20-estrategias`, `30-ejemplos`, `40-problemas`, `41-preguntas-analisis`, `50-resumen`, `60-glosario`, `99--sources`.
- **H.1**: Mapeo origen→velite — script que adapta los `.md` del libro al schema de Velite (frontmatter normalizado, paths, tags, `cites` resueltos a M01-M12).
- **H.2**: Validar grafo con corpus real — verificar que las 277 entradas no rompen el render 2D/3D ni la búsqueda; ajustar `forceAtlas2` si hay clusters densos.
- **H.3**: Probar hover-preview en wikilinks reales del capítulo (con KaTeX, figuras y tablas).
- **H.4**: Métrica de éxito: bundle size delta < +500 KB, LCP `/canonico/grafo` ≤ 2.5 s, 0 errores de wikilinks rotos sin marcar.
- **Post-criterio**: ningún cambio en la app — sólo verificación. Si algo se rompe, abrir issue separado.

---

## 9. Métricas de éxito

| Métrica | Baseline actual | Target post-S+2 | Target post-S+3 |
|---|---|---|---|
| **Time-to-second-doc** (tiempo en abrir 2do doc sin perder el 1ro) | ∞ (imposible sin tabs) | < 3 s | < 1 s |
| **Doc-density per session** (docs vistos / sesión) | 1.4 (estimado) | ≥ 3 | ≥ 5 |
| **Hover-preview engagement** (hovers que se sostienen ≥ 1 s) | 0% (no existe) | ≥ 25% sobre wikilinks | ≥ 40% |
| **Time-to-find** (Ctrl+O hasta abrir) | N/A | < 2 s para ≤100 docs | < 1.5 s |
| **Sidebar collapse adoption** | ~5% (muestra pequeña) | ≥ 30% | ≥ 50% |
| **Bundle size delta** | base 1.2 MB | < +200 KB | < +500 KB |
| **LCP `/biblioteca`** | ~1.8 s | ≤ 2.0 s | ≤ 2.2 s |

---

## 10. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| dockview incompatibilidad con Tailwind v4 / Next 16 turbopack | Media | Alto | POC aislado en sprint S+3 antes de migración total |
| Bundle balloning con tres librerías de grafo | Alta | Medio | Lazy-load grafo 3D con `next/dynamic`; usar 2D vis por default |
| Hover-preview rompe scroll-restoration | Media | Bajo | Portal a `document.body`, no dentro del scroller |
| File tree con >5000 nodos cuelga | Baja (corpus actual <100) | Medio | `react-arborist` virtualiza nativo; verificar al escalar |
| Tabs URL state se vuelve confuso (`?tabs=m01,m02,m03`) | Media | Bajo | Limitar a 8 tabs en URL; resto en localStorage |
| Sidebar colapsado a 0 px deja al usuario sin nav | Baja | Alto | Botón flotante "pill" reaparece en borde (ya implementado en `RightPanelMini`) |

---

## 11. Decisiones cristalizadas (para ADR)

| ID | Decisión | Razón |
|---|---|---|
| ADR-OBS-01 | **Adoptar dockview en main area de biblioteca** (no en shell global) | Aísla complejidad; mantiene react-resizable-panels para sidebars |
| ADR-OBS-02 | **Hover-preview vía Radix HoverCard + lazy MDX** | No clonar DOM; render desde source compilado |
| ADR-OBS-03 | **File tree con react-arborist** cuando corpus >100 docs | Virtualizado, a11y nativo, react 19 compat |
| ADR-OBS-04 | **Outline derivado de velite TOC** (no parser runtime) | Build-time = más rápido + sin re-walks FS |
| ADR-OBS-05 | **Backlinks reusan grafo edges** (no índice paralelo) | SSOT en `build-graph.mjs` |
| ADR-OBS-06 | **Tabs state: URL params + localStorage hybrid** | Compartibles + persistentes |
| ADR-OBS-07 | **Mantener `vis-network` 2D + `react-force-graph-3d`**; descartar cytoscape por ahora | Bundle budget; cytoscape solo si filtros DSL crecen |

---

## 12. Referencias canónicas

### Librerías
- dockview — https://dockview.dev
- react-arborist — https://github.com/brimdata/react-arborist
- @floating-ui/react — https://floating-ui.com/docs/react
- cytoscape.js — https://js.cytoscape.org
- sigma.js — https://www.sigmajs.org
- react-force-graph — https://github.com/vasturiano/react-force-graph
- cmdk — https://cmdk.paco.me
- match-sorter — https://github.com/kentcdodds/match-sorter

### Apps de referencia
- Obsidian — https://obsidian.md
- Logseq — https://logseq.com
- AnyType — https://anytype.io
- Heptabase — https://heptabase.com
- Reflect — https://reflect.app
- Capacities — https://capacities.io
- Tana — https://tana.inc
- AppFlowy — https://appflowy.io

### Documentación interna
- [`B9--portal-mvp-knowledge-management-spec.md`](./B9--portal-mvp-knowledge-management-spec.md)
- [`AUDIT-aleia-bereshit-frontend.md`](./AUDIT-aleia-bereshit-frontend.md)
- [`AUDIT-sota-frontend-cop.md`](./AUDIT-sota-frontend-cop.md)

---

## 13. Apéndice — código de ejemplo: hover-preview de wikilink

```tsx
// src/components/biblioteca/wikilink-hover.tsx
'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useEffect, useState } from 'react';
import { canonicPaper, note } from '#site/content';
import { MDXContent } from '@/components/mdx-content';
import Link from 'next/link';

export function WikiLink({ slug, label }: { slug: string; label: string }) {
  const [doc, setDoc] = useState<{ title: string; body: string; href: string } | null>(null);

  useEffect(() => {
    // Resolver en colecciones velite (ya en bundle)
    const found =
      canonicPaper.find((p) => p.id === slug) ??
      note.find((n) => n.slug === slug) ??
      null;
    if (found) {
      setDoc({
        title: found.title,
        body: found.body, // MDX compilado por velite
        href: found.href,
      });
    }
  }, [slug]);

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link href={doc?.href ?? '#'} className="wikilink underline decoration-dotted">
          {label}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        className="w-[480px] max-h-[400px] overflow-y-auto p-4"
      >
        {doc ? (
          <article className="prose-sm">
            <h3 className="text-sm font-semibold">{doc.title}</h3>
            <MDXContent code={doc.body} />
          </article>
        ) : (
          <div className="text-xs text-muted-foreground">Documento no encontrado.</div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
```

Integración con `remark-obsidian-embed` existente: extender el plugin para mapear `[[slug]]` → `<WikiLink slug="..." label="..." />` en lugar de un anchor plano.

---

## 14. Próximos pasos inmediatos (esta semana)

1. **Decisión usuario** sobre el plan: ¿proceder con S+1 (hover + tabs simples)?
2. Si OK: spike de 1 día para POC del hover-preview en `/canonico/m04` (tiene wikilinks reales).
3. Validar UX con usuarios reales (1 estudiante + 1 docente diseñador) ANTES de comprometernos con dockview.
4. Marcar este audit como `kd_status: APPROVED` y registrar PRs derivados.

---

*kd_id: audit/obsidian-workspace-ux · kd_version: 1.0.0 · CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026-04-25*
