---
kd_id: audit/v6-zone-diagnostic
kd_version: 1.0.0
kd_date: 2026-04-27
kd_status: draft
kd_supersedes: [audit/v5.0-multi-pane-workspace, audit/usability-gaps-20]
---

# AUDIT v6 — Diagnóstico por Zonas + SOTA 2026

**Portal**: [reforma-ud.vercel.app](https://reforma-ud.vercel.app) · versión deployada `v5.0ab` · Next.js 16 · React 19 · Velite · Tailwind v4 · shadcn/ui

**Propósito**: cerrar los pendientes acumulados desde audits previos (v4.3 → v5.0) y trazar el roadmap del MVP-2 (v6.0+). El portal ya cumple paridad Obsidian core (multi-pane, wikilinks, hover-preview, grafo, tabs, infografías). v6 escala hacia **producto completable** y **listo para usuarios reales**.

---

## §0 · Estado actual (v5.0ab)

**Logros consolidados en la cadena v5.0p → v5.0ab:**
- Multi-pane workspace (A, B, C) con drag entre panes (`@dnd-kit`)
- Right-panel plano de 6 tabs (esquema, grafo, evolucion, refs, comunidad, asistente) + fokus-pane sync
- Sidebar limpio: Grafo + Glosario + Reforma Vinculante UDFJC bajo único root + tree de comunidades flat
- Corpus M01-M12 con títulos cortos + frontmatter alineado + crispPhase coherente con mental-model
- Kanban narrativo CRISP-DM (5 fases, M03 Estándares ↔ M08 Framework swap source-aligned)
- 12 hallazgos verificados por paper (eliminadas alucinaciones M02/M05)
- News feed centralizado (`content/feed/*.md`) + distribución contextual por tags a comunidades
- Glosario de 74 conceptos universales · 4 capas KDMO concepto v5.2 · SKOS + ISO 1087 + Schema.org

---

## §1 · Coherencia de servicios por tipo de documento

Matriz QA del right-panel por `doc.kind` (resultado de inspección de los 5 componentes-tab):

| Tab           | Paper M## | Note    | Concepto | Comunidad | Sin doc                  |
|---------------|-----------|---------|----------|-----------|--------------------------|
| **Esquema**   | ✓ + extras (glosario / figuras / normas) | ✓ TOC básico | ✓ TOC básico | ✗ no resuelve | ⚠ "Sin doc activo" |
| **Grafo**     | ✓ vecindario 1-hop | ✗ nodos no en grafo | ✗ nodos no en grafo | ✗ N/A | ✓ grafo global (107 / 125) |
| **Evolución** | ✓ mock determinístico | ✓ mock | ✓ mock | ✗ falla | ✓ "Sin doc" placeholder |
| **Refs**      | ✓ outgoing + incoming | ⚠ solo incoming (no `relations` frontmatter) | ⚠ solo incoming | ✗ N/A | ✗ "Sin doc" |
| **Comunidad** | ✓ co-autores + tareas mock | ⚠ mock vacío | ⚠ mock vacío | ✗ N/A | ✗ "Sin doc" |
| **Asistente** | ✓ contexto doc | ✓ | ✓ | ✓ | ✓ modo libre global |

### Gaps críticos detectados

**G-SVC-01 · Grafo no soporta non-papers** · `PaperLocalGraph` busca `paperId` en `graph-global.json`. Notes y conceptos están EN el grafo (107 nodos incluyen 74 conceptos), pero el componente solo renderiza vecindarios de papers M##. **Fix**: pasar `node.id` genérico + ampliar el filtro de vecindarios a cualquier tipo de nodo.

**G-SVC-02 · Refs asimétrico para non-papers** · papers tienen `relations.custom.glosario` en frontmatter (sección "Salientes" en RefsPanel). Notes y conceptos no — solo aparecen como "Entrantes" via grafo. **Fix**: añadir `relations` opcional a schema de Note + Concepto para simetría.

**G-SVC-03 · Comunidad tab solo cubre papers** · co-autores y tareas son mock hardcoded por `paper.id`. Notes y conceptos muestran tab vacío sin valor. **Fix**: o (a) ocultar el tab para non-papers, o (b) implementar versión genérica (notes → autor del frontmatter; conceptos → editores SKOS).

**G-SVC-04 · `kind: 'community'` ausente en active-doc** · URL `/comunidades/gobierno` retorna `null` desde `getActiveDocFromPath`. Tabs nunca activan en comunidad. **Fix**: agregar branch `if pathname.startsWith('/comunidades/')` que retorne `kind: 'community'` con metadata.

**G-SVC-05 · Evolución usa mock determinístico** · `EvolutionTab` calcula SHAs sintéticos en lugar de leer git history real. Aceptable como placeholder en MVP, pero la promesa de "versiones git" no se cumple. **Fix v6.1**: integrar GitHub API (`/repos/{owner}/{repo}/commits?path=...`) con caché.

---

## §2 · Diagnóstico por zonas + SOTA 2026

### Zona 1 · Header (top bar)

**Estado actual** (línea ~535 de `app/layout.tsx` + `src/components/layout/header.tsx`): logo + breadcrumb minimal ("Inicio › Página") + Buscar (Ctrl+K) + theme toggle + perfil + toggle right-panel.

| Gap | Detalle | SOTA referencia | Recomendación v6 |
|---|---|---|---|
| **G-HDR-01** Sin breadcrumbs profundos | Solo "Inicio › <Página>". Al entrar a `/canonico/m08` no se ve la cadena CRISP-DM ni la fase. | Linear, Notion, GitHub: breadcrumb completo desde root + parent context | Renderizar breadcrumb dinámico desde `pathname` + tipo de doc (e.g., "Inicio › Reforma Vinculante › Modeling › M08 Framework"). |
| **G-HDR-02** No quick actions | No hay "+ Nueva nota", "+ Publicar", botón compartir | Notion top-right (Share, Updates, ⭐), Linear (Inbox, Notif, +) | Añadir botón "+" dropdown (Nueva nota / Pin doc actual / Compartir URL). |
| **G-HDR-03** Sin notif/inbox | No hay mecanismo de inducir acción asíncrona (recordatorio de lectura, comentario nuevo) | Linear inbox icon · Notion updates feed · Discord notifications | Para v6: solo placeholder + badge "0" (zero-state). Conectar a feed de noticias en v6.1. |
| **G-HDR-04** Active-doc title invisible | Solo el tab strip muestra el doc. Si la pestaña está en pane B y A es scroll-largo, se pierde el contexto. | VS Code muestra el archivo actual en title bar; Notion tiene path bar persistente | Sticky sub-header con título del doc focado + emoji por tipo + atajo "abrir en pane B". |

### Zona 2 · Barra izquierda (sidebar)

**Estado actual**: filter input + 2 SectionToggles (Biblioteca: Grafo+Glosario+Reforma Vinculante; Comunidades: 4 unidades organizativas). No hay starred/recents.

| Gap | Detalle | SOTA referencia | Recomendación v6 |
|---|---|---|---|
| **G-SBL-01** Sin Recents / Starred | No hay forma rápida de volver a docs frecuentes | Notion sidebar: Favorites + Recently visited; VS Code: `Open Recent` | Section "📌 Recientes" (top 5 visitados desde localStorage) + "⭐ Favoritos" (toggle pin por doc). |
| **G-SBL-02** Filter es navegación, no contenido | El input filtra labels del sidebar. No busca dentro del body de los docs. | Obsidian search content + tags + properties; Linear command palette ; Notion full-text | Para búsqueda full-text usar el `Buscar... Ctrl+K` ya implementado. Añadir hint visual: "Buscar en contenido → Ctrl+K". |
| **G-SBL-03** No drag-reorder ni new-doc inline | No se pueden reordenar items ni crear nota desde el sidebar | Obsidian + Notion: right-click → New file; drag-and-drop reorder | Botón "+" al final del sidebar Comunidades para crear nota en la unidad activa (escribe `.mdx` server-side via API route o instrucción para git commit local). |
| **G-SBL-04** Sin colapsar todo / expandir todo | Si todas las secciones están abiertas, el sidebar se vuelve largo | Notion: doble-clic en flecha para colapsar/expandir todos los hijos | Atajo `[` para colapsar todo, `]` para expandir todo. Botones discretos en footer del sidebar. |

### Zona 3 · Área de trabajo (workspace center)

**Estado actual**: tab strip (con drag, pin, context menu, back/forward) + multi-pane horizontal (A, B, C+) + react-resizable-panels + DnD entre panes.

| Gap | Detalle | SOTA referencia | Recomendación v6 |
|---|---|---|---|
| **G-WS-01** Sin split vertical | Solo se puede dividir horizontalmente (lado a lado) | VS Code: split vertical/horizontal; Obsidian: split vertical via Ctrl+\ | Añadir "Split vertical" en el context menu del tab + atajo `Ctrl+\`. Cambiar `Group orientation` dinámicamente. |
| **G-WS-02** Sin focus mode | No hay forma de ocultar ambos sidebars y ver solo el doc | Notion: full-page mode (Esc); Linear: sidebar collapse independiente; iA Writer: focus mode | Atajo `F11` o `Cmd+.` para colapsar sidebar+rightpanel simultáneo. Estado en localStorage. |
| **G-WS-03** Sin scroll restoration | Al volver con back/forward, scroll vuelve a 0 | Browser nativo restaura scroll; Notion también | Guardar `scrollY` por tabId en localStorage; restaurar en `useEffect` cuando activeTabId cambia. |
| **G-WS-04** Sin re-open closed tab | Si cierro tab por error, no la recupero | VS Code `Cmd+Shift+T`; Chrome `Ctrl+Shift+T` | Stack `closedTabsHistory[]` en `useDocTabs` + atajo `Ctrl+Shift+T` que re-abre la última. Limit 10. |

### Zona 4 · Barra derecha (right-panel)

**Estado actual**: 6 tabs flat (esquema, grafo, evolucion, refs, comunidad, asistente) + drag-resize + sigue al focused-pane.

| Gap | Detalle | SOTA referencia | Recomendación v6 |
|---|---|---|---|
| **G-SBR-01** Sin keyboard shortcuts por tab | Solo se cambia con clic en icon rail | Linear: `g i` (inbox), `g n` (notif); Slack: `Ctrl+K`; Notion: `Ctrl+/` para comments | Atajos `Alt+1..6` para esquema/grafo/evolucion/refs/comunidad/asistente. Hint visual en tooltip. |
| **G-SBR-02** Esquema TOC sin scroll-spy | No marca cuál sección del doc está visible | Notion: sticky TOC con highlight; VS Code outline: highlight active symbol | Implementar scroll-spy con IntersectionObserver: highlight el heading visible en la TOC del esquema. |
| **G-SBR-03** Asistente: chat reset por sesión | No persiste historial entre páginas | ChatGPT, Cursor, Linear AI: historial global persistido | Persistir mensajes en localStorage por copSlug + activeDoc. Botón "Limpiar" explícito. |
| **G-SBR-04** Sin pin de refs útiles | Si un ref es importante, debe ser re-buscado cada vez | Notion: pinned comments; Linear: starred views | Permitir pin individual de items en RefsPanel (estrella → localStorage). Sección "📌 Pineados" arriba. |

---

## §3 · Pendientes consolidados de audits previos

Análisis de los 14 audits previos en `docs/audit/`. Items aún abiertos:

- **AUDIT-usability-gaps-20** · 12 de los 20 gaps cerrados (G01 sidebar scroll, G13 typing, G19 focus-ring, etc.). **8 abiertos**: G02 (skeleton states), G05 (offline mode), G07 (print-mejor), G09 (a11y AAA), G11 (deep-link al heading), G14 (touch targets), G17 (notif), G20 (telemetry).
- **AUDIT-obsidian-workspace-ux** · paridad core ✓. Pending: stacked tabs, hover-to-reveal sidebars, frontmatter editor inline.
- **AUDIT-v4.3-comunidad-participacion** · feed centralizado ✓ (v5.0z). Pending: comments inline, threaded discussions, polls/encuestas.
- **AUDIT-v4.5-obsidian-paridad-final** · diagram popup ✓, callouts ✓. Pending: collapse de heading nativo (✓ v5.0j), kanban plugin (parcial).
- **AUDIT-v5.0-multi-pane-workspace** · multi-pane ✓, drag inter-pane ✓. Pending: split vertical, dock layout persisting.

---

## §4 · Roadmap v6 propuesto

### Sprint v6.0 — Service coherence (1 semana)
- G-SVC-01: PaperLocalGraph genérico (acepta paperId | conceptoId | noteId)
- G-SVC-02: schema Note + Concepto admite `relations` opcional
- G-SVC-04: `getActiveDocFromPath` retorna `kind: 'community'` para `/comunidades/<slug>`
- G-SVC-03: `ComunidadPanel` o renderizar versión genérica o ocultar para non-papers

### Sprint v6.1 — Header + atajos teclado (3 días)
- G-HDR-01: breadcrumb dinámico + emoji por tipo
- G-HDR-02: dropdown "+ Quick actions"
- G-SBR-01: shortcuts `Alt+1..6` para tabs

### Sprint v6.2 — Productividad workspace (1 semana)
- G-WS-01: split vertical
- G-WS-02: focus mode (toggle ambas barras con F11)
- G-WS-03: scroll restoration por tab
- G-WS-04: re-open closed tab (`Ctrl+Shift+T`)
- G-SBR-02: scroll-spy en Esquema TOC

### Sprint v6.3 — Sidebar enriquecido (3 días)
- G-SBL-01: Recientes + Favoritos en sidebar
- G-SBL-04: collapse-all / expand-all
- G-SBR-04: pin de refs

### Sprint v6.4 — Persistencia AI (3 días)
- G-SBR-03: chat history por copSlug + activeDoc
- G-SVC-05: GitHub API real para Evolución (con caché)

---

## §5 · Métricas objetivo v6

| Métrica | Actual v5.0ab | Target v6.0 |
|---|---|---|
| Coherencia tabs × tipos doc | 18/24 ✓ (75%) | 24/24 (100%) |
| Atajos teclado | ~5 | ≥ 12 |
| Persistencia estado UI | tabs + filter + theme | + scroll + chat + pin + recents |
| Time-to-content (LCP) | <2.5s | <2s |
| Bundle size client | ~580 kB | ≤ 600 kB (no regresión) |

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026-04-27*
