---
kd_id: audit/v5.0-multi-pane-workspace
kd_version: 1.0.0
kd_status: PROPOSED
kd_doc_type: AUDIT
kd_title: v5.0 · Multi-pane workspace Obsidian-grade — tabs múltiples, drag entre panes, persistencia
kd_created: 2026-04-26
kd_responsible: Carlos C. Madera
kd_classification: PUBLIC
---

# AUDIT — v5.0 · Multi-pane workspace Obsidian-grade

> **Pregunta trazadora del usuario** (verbatim, post-v4.5):
> *"3: continuemos con esto"* — refiriéndose a la deuda v5.0 ítem 3 del audit v4.5: *"arranco audit v5.0 con SOTA research específico (split horizontal/vertical de paneles, drag-drop entre tabs, keyboard nav)"*.

**Propósito**: cerrar la última feature crítica que separa al portal de la ergonomía Obsidian — múltiples tabs por panel + múltiples panels por área de trabajo + drag de tabs entre panels. La v4.5 completó el *modelo de zonas* (3-zone shell con responsabilidades distintas); v5.0 completa el *modelo de panels* dentro de la zona central.

**Alcance**: zona central del shell (entre Sidebar y RightPanel). NO toca sidebars laterales ni header. Reutiliza la infraestructura existente: `useDocTabs` (URL state `?tabs=`), `DocTabsBar`, `react-resizable-panels` v4.10, atajos `Ctrl+Tab`/`Ctrl+W`.

**Stack**: `next@16.2.4`, `react@19.2.4`, `tailwindcss@4`, `react-resizable-panels@4.10`, `cmdk@1.1`. Para drag: evaluamos `@dnd-kit@6` vs adoptar `dockview-react@4`.

---

## 0. TL;DR — decisiones consolidadas

| # | Decisión | Reemplaza | Effort | Riesgo |
|---|---|---|---|---|
| **D1** | **DIY headless**: NO adoptar `dockview` ni `rc-dock`. Construir sobre lo que ya tenemos (`useDocTabs` + `react-resizable-panels`) + añadir `@dnd-kit/core` para drag. Razón: ambos dock libraries traen su propio sistema de styling que pelearía con shadcn/Tailwind v4. | considerar dockview | — | Bajo |
| **D2** | **Modelo de estado**: `WorkspaceLayout` jerárquico con árbol binario de splits. Cada hoja es un `Pane` con su propia lista de tabs. Persistencia: URL para 1 pane (compat v4.5), localStorage para N>1 panes. | URL-only (`?tabs=`) | M | Medio — migración del state |
| **D3** | **Sprint v5.0a · single-pane refinements**: drag-reorder de tabs en el pane único actual + right-click menu (close-others, close-all-to-right, pin) + tab overflow scroll horizontal con flechas + pin tab. NO toca multi-pane. | — | M | Bajo |
| **D4** | **Sprint v5.0b · multi-pane**: refactor de zona center a árbol de splits. Cada Pane tiene su propio `useDocTabs` independiente. Drag de tab a edge crea split (vertical/horizontal). Drag entre panes mueve la tab. | — | L | Alto — refactor del shell central |
| **D5** | **Sprint v5.0c · persistencia + atajos**: estado del workspace persiste en localStorage entre sesiones. Restore on load. Atajos `Ctrl+1..9` para focus de pane. `Ctrl+\` para split vertical, `Ctrl+Shift+\` para split horizontal del pane activo. | — | M | Medio |
| **D6** | **Compat con `?compare=`**: el split-comparativo (v4.4) se generaliza como caso particular del multi-pane. `?compare=m04` se traduce internamente a un workspace con 2 panes. | reemplaza `<ComparativeSplit>` por `<WorkspaceShell>` | S | Bajo — wrapper |
| **D7** | **Pin tab**: tabs pinneadas tienen ícono pin, no se cierran con `Ctrl+W` ni mid-click, persisten en localStorage incluso al cerrar sesión. | — | S | Nulo |
| **D8** | **Drag-and-drop con `@dnd-kit/core@6`**. NO `react-dnd` (DnD legacy con HTML5 backend, problemas con touch). NO `react-beautiful-dnd` (deprecado 2022). Sí dnd-kit: accesible, headless, soporta sensores múltiples, sortable + dnd entre containers nativo. | — | — | — |

**Veredicto**: implementación en 3 sprints (v5.0a/b/c). Sprint **v5.0a** es valor inmediato sin refactor estructural; los usuarios obtienen 80% del valor de Obsidian-tabs. Sprint **v5.0b** es el refactor grande (multi-pane). Sprint **v5.0c** estabiliza con persistencia.

> **Recomendación**: shipear **solo v5.0a primero** y validar antes de v5.0b. Si v5.0a cubre el use-case real del usuario, v5.0b/c se difieren a cuando aparezca demanda concreta.

---

## 1. Estado actual (qué tenemos hoy)

| Capability | Estado | Archivo |
|---|---|---|
| Tabs múltiples en URL (`?tabs=m01,m04`) | ✅ Done | [`lib/doc-tabs.ts`](apps/portal-next/src/lib/doc-tabs.ts) |
| Render barra de tabs estilo Obsidian | ✅ Done | [`biblioteca/doc-tabs-bar.tsx`](apps/portal-next/src/components/biblioteca/doc-tabs-bar.tsx) |
| Open in new tab (Ctrl+click) | ✅ Done | `useDocTabs.openInNewTab` |
| Open in background (Mid-click) | ✅ Done | `useDocTabs.openInBackground` |
| Close tab + close active (Ctrl+W) | ✅ Done | `useDocTabs.closeTab` |
| Mid-click close en pestaña | ✅ Done | `DocTabsBar.onAuxClick` |
| Switch tab (Ctrl+Tab / Ctrl+Shift+Tab) | ✅ Done | DocTabsBar effect |
| Suspense + skeleton SSR-safe | ✅ Done | DocTabsBar wrapper |
| Split comparativo 2 docs (`?compare=`) | ✅ Done | [`comparative-split.tsx`](apps/portal-next/src/components/biblioteca/comparative-split.tsx) |
| Resize del split aislado del shell | ✅ Done v4.5a | `autoSave="reforma-ud:compare-v4.5"` |

| GAP | Esfuerzo | Sprint propuesto |
|---|---|---|
| Drag-reorder tabs dentro del mismo pane | S | v5.0a |
| Right-click menu (close-others, close-to-right, pin) | S | v5.0a |
| Pin tab (visual + comportamiento) | S | v5.0a |
| Tab overflow (cuando hay > N tabs visibles) | S | v5.0a |
| Multi-pane (1..N panes en zona center) | L | v5.0b |
| Drag tab a edge → split pane | M | v5.0b |
| Drag tab entre panes | M | v5.0b |
| Persistencia localStorage | M | v5.0c |
| Atajos Ctrl+1..9 focus pane, Ctrl+\ split | S | v5.0c |
| Tab stacks (group multiple tabs) | XL | v5.1+ |

---

## 2. Análisis de los issues raíz

### Issue 1 — Tab strip se queda corta a partir de ~10 tabs

**Lo que entiendo**: si el usuario abre 12 papers (M01-M12), el `DocTabsBar` actual usa `overflow-x-auto` (línea 55 de `doc-tabs-bar.tsx`). Eso funciona, pero el descubrimiento de tabs ocultos es nulo — no hay flechas izquierda/derecha, no hay scroll snap, no hay dropdown "ver todas".

**SOTA**:
- **Chrome / Firefox / Edge**: `tabs strip` con scroll horizontal + flechas en los extremos cuando hay overflow. Click en flecha avanza ~3 tabs. Botón "▾" abre lista vertical de todas las tabs.
- **VS Code**: tab strip con scroll + dropdown "▾" (botón "Show All Editors") + recently-used view.
- **Obsidian**: tab strip scrollable horizontal + dropdown automático cuando overflow + Ctrl+O abre cmd-K para encontrar tabs.

**Best practice**:
1. **Scroll horizontal nativo** (ya lo tenemos) — añadir scroll-snap-x para que tabs se centren al scrollear con teclado/wheel.
2. **Flechas chevron izquierda/derecha** (visibles solo si hay overflow detectable via `scrollWidth > clientWidth`).
3. **Botón "▾"** que abre `<DropdownMenu>` con todas las tabs (búsqueda incluida si > 8 tabs).
4. **Reuse cmd-K**: ya tenemos `<CommandPalette>` — añadir grupo "Pestañas abiertas" que liste tabs activos. El usuario presiona Ctrl+K, escribe parte del título, va directo.

**Impacto código**:
- `doc-tabs-bar.tsx`: añadir `useEffect` con `ResizeObserver` que detecta overflow + render condicional de chevrons.
- `command-palette.tsx`: añadir grupo "Pestañas abiertas" leyendo `useDocTabs().tabs`.

### Issue 2 — No se pueden reordenar tabs

**Lo que entiendo**: si abro M01 → M04 → M02, quedan en ese orden. No puedo arrastrar M02 entre M01 y M04. En Obsidian/Chrome/VS Code esto es ergonómico esencial.

**SOTA**:
- **`@dnd-kit/sortable`**: SOTA para listas drag-reorder en React 19. Headless, accesible (keyboard support nativo: Space para grab, arrow keys para mover, Enter para soltar). MIT.
- **Alternative `react-aria-components` `<DropZone>`**: Adobe Spectrum's accessibility-first lib. Menos común, más ceremonioso.
- **NO usar `react-beautiful-dnd`**: deprecado por Atlassian en 2022.

**Best practice**:
1. Wrap `<DocTabsBar>` con `<DndContext sensors=[Pointer, Keyboard]>` + `<SortableContext items={tabIds}>`.
2. Cada `<TabPill>` envuelto en `useSortable({ id: tab.id })`.
3. `onDragEnd` callback: re-arregla `tabIds` y persiste vía `router.replace(buildUrl(pathname, newIds))`.
4. **Touch support**: dnd-kit auto-detecta touch sensor; testing en mobile post-deploy.

**Impacto código**:
- Nuevo dep: `@dnd-kit/core@6` + `@dnd-kit/sortable@8` + `@dnd-kit/utilities@4`.
- `doc-tabs-bar.tsx`: refactor para soporte sortable.
- `lib/doc-tabs.ts`: nuevo método `reorderTabs(fromIdx, toIdx)`.

### Issue 3 — No hay right-click menu

**Lo que entiendo**: VS Code, Obsidian, Chrome: right-click en una tab abre menú contextual con `Close · Close Others · Close All to the Right · Pin · Move to New Window`. Hoy no existe.

**SOTA**:
- shadcn `<ContextMenu>` (radix-ui based) — la opción canónica con nuestra stack.
- Headless UI alternative: `react-aria-components` `<MenuTrigger trigger="long press">`.

**Best practice**:
```tsx
<ContextMenu>
  <ContextMenuTrigger asChild>
    <TabPill .../>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onClick={closeTab}>Cerrar</ContextMenuItem>
    <ContextMenuItem onClick={closeOthers}>Cerrar otras</ContextMenuItem>
    <ContextMenuItem onClick={closeToRight}>Cerrar todas a la derecha</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem onClick={togglePin}>{pinned ? 'Desfijar' : 'Fijar'}</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

**Impacto código**:
- `lib/doc-tabs.ts`: add `closeOthers(id)`, `closeToRight(id)`, `togglePin(id)`.
- `pinned` se persiste en localStorage (no en URL — son N tabs por sesión, no de query).

### Issue 4 — Pin tab no existe

**Lo que entiendo**: Obsidian permite pinear una tab. Pinned tabs no se cierran con Ctrl+W, no se cierran con mid-click, persisten al cerrar la sesión.

**SOTA**:
- VS Code: pin = `Ctrl+K Shift+Enter`. Pinned tabs solo muestran ícono, no nombre. Persiste en workspace.
- Chrome: pin contrae el ancho del tab a solo favicon.
- Obsidian: pin via right-click; tab muestra ícono pin pequeño.

**Best practice**:
- `pinned: boolean` en `DocTab` type.
- Pinned tabs aparecen primero en la lista (sorted), con ícono `<Pin>` reemplazando la `<X>` close.
- Persistencia: `localStorage.setItem('reforma-ud:pinned-tabs', JSON.stringify(['m01']))`.
- `closeTab(id)` rechaza si está pinneado (warning: "Esta tab está fijada").
- Click en pin → toggle.

**Impacto código**:
- `lib/doc-tabs.ts`: extender estado a `{ tabs: DocTab[], pinned: Set<string> }` con persistencia.

---

## 3. Multi-pane (Sprint v5.0b) — el refactor grande

### Issue 5 — Solo hay 1 pane (excepto el split-comparativo de 2)

**Lo que entiendo**: Obsidian permite N panes en cualquier configuración split (vertical/horizontal/anidado). El usuario puede tener M01 + M02 lado a lado, M03 abajo de ambos, M04 a la derecha. Cada pane tiene su propia lista de tabs.

**SOTA**:
- **Obsidian Workspace API**: árbol binario donde cada nodo es split (horizontal/vertical) o pane (hoja). Cada pane tiene `viewType` + `state`.
- **VS Code**: `IEditorGroupsService` + `editorGroups` model. Idéntico patrón pero más complejo (groups dentro de groups, drag policies).
- **Tmux**: misma idea, terminal-side.

**Modelo propuesto** (D2):
```typescript
type WorkspaceLayout =
  | { kind: 'pane'; id: string; tabs: DocTab[]; activeTabId: string }
  | { kind: 'split'; orientation: 'horizontal' | 'vertical'; sizes: [number, number]; left: WorkspaceLayout; right: WorkspaceLayout };
```

Render recursivo:
```tsx
function WorkspaceNode({ layout }) {
  if (layout.kind === 'pane') return <PaneShell pane={layout} />;
  return (
    <Group orientation={layout.orientation}>
      <Panel defaultSize={layout.sizes[0]}>
        <WorkspaceNode layout={layout.left} />
      </Panel>
      <Separator />
      <Panel defaultSize={layout.sizes[1]}>
        <WorkspaceNode layout={layout.right} />
      </Panel>
    </Group>
  );
}
```

`<PaneShell>` contiene su propio `<DocTabsBar>` + el contenido del tab activo.

### Issue 6 — Drag tab a edge → split

**Lo que entiendo**: arrastras una tab. Cuando el cursor entra en la zona derecha (~25% del ancho del pane destino), aparece un **drop indicator** azul indicando "split right". Al soltar, el pane destino se divide vertical (left=tab anterior, right=nueva tab).

**SOTA con dnd-kit**:
- `useDroppable` en cada pane con sub-zonas (left/right/top/bottom).
- `onDragOver` actualiza el indicador visual.
- `onDragEnd` muta el `WorkspaceLayout` (split o move).

**Drop zones por pane**:
- Centro (50% interior): añadir tab al pane destino.
- Edge izquierda (~25%): split vertical, nuevo pane a la izquierda.
- Edge derecha (~25%): split vertical, nuevo pane a la derecha.
- Edge arriba (~25%): split horizontal, nuevo pane arriba.
- Edge abajo (~25%): split horizontal, nuevo pane abajo.

**Implementación**:
- Geometric drop zones: dividimos el bounding box del pane en 5 zonas trapezoidales (centro + 4 edges).
- En cada `useDroppable.over`, calcular qué zona contiene el pointer.
- Render `<DropOverlay>` posicionado absoluto.

**Impacto código**:
- Nuevo `apps/portal-next/src/components/workspace/workspace-shell.tsx`.
- Nuevo `apps/portal-next/src/components/workspace/pane-shell.tsx`.
- Nuevo `apps/portal-next/src/lib/workspace-layout.ts` con state + reducers.
- Migrar `<ComparativeSplit>` a usar el nuevo modelo (D6).

### Issue 7 — Persistencia entre sesiones

**Lo que entiendo**: si el usuario tiene 4 panes y cierra el navegador, al volver el portal debe restaurarlos. El URL no es suficiente (demasiada complejidad para serializar un árbol binario en query string).

**SOTA**:
- **VS Code**: persiste workspace en `~/.vscode/workspaces/{id}.json`.
- **Obsidian**: persiste en `.obsidian/workspace.json` por vault.
- **Chrome**: persiste en SQLite local.

**Best practice para nosotros**:
- localStorage con clave `reforma-ud:workspace-layout`. Tamaño: ~2-5KB para layouts típicos (~10 tabs en 4 panes).
- Compresión opcional con `lz-string` si excede 10KB.
- URL: solo `?focus={paneId}` opcionalmente para anclar focus al recargar.
- Compat: si no hay localStorage entry, fallback al modo single-pane con URL `?tabs=` (lo de hoy).

**Impacto código**:
- `lib/workspace-layout.ts`: hooks `useWorkspaceLayout` con `localStorage.setItem` debounced.
- Migración: detectar `?tabs=` legacy URL, convertirlo a single-pane layout, persistir.

### Issue 8 — Atajos de teclado para multi-pane

**Best practice** (Obsidian + VS Code converged):
- `Ctrl+\`            → split vertical del pane activo
- `Ctrl+Shift+\`      → split horizontal del pane activo
- `Ctrl+1..9`         → focus al pane #N
- `Ctrl+W`            → cerrar tab activa
- `Ctrl+K W`          → cerrar pane activo (todas sus tabs)
- `Ctrl+Tab`          → siguiente tab dentro del pane focado
- `Ctrl+Shift+Tab`    → anterior tab dentro del pane focado

---

## 4. SOTA library decision matrix

| Library | Tipo | Pros | Cons | Veredicto |
|---|---|---|---|---|
| **dockview-react@4** | Full docking | Tabs + drag + splits + serialization out-of-box. ~25KB gzip. | Trae su propio CSS theme system; reemplaza `react-resizable-panels`. Menos control de UI. | ❌ — pelearía con shadcn/Tailwind |
| **rc-dock** | Full docking | Maduro (5+ años). Buena docs. | API class-based old-school. CSS pelado, menos themable. | ❌ — API anticuada |
| **flexlayout-react** | Full docking | Caplin Systems, financial-grade. Soporta floating windows. | Bigger learning curve, más config XML-style. | ❌ — overkill |
| **react-mosaic** | Mosaic only (no tabs) | Simple, ligero. | NO soporta tabs en cada pane. Solo mosaic-style splits. | ❌ — falta tabs |
| **`@dnd-kit/core@6` + `@dnd-kit/sortable@8`** | Drag primitives | SOTA accesible. ~12KB gzip. Sin opinión sobre UI. Soporta keyboard. | Requiere componer manual con react-resizable-panels. | ✅ — DIY headless |
| **`react-resizable-panels@4.10`** | Splits only | Ya en uso (v4.5). Performante. | Sin tabs propios. | ✅ — keep + extend |
| **`cmdk@1.1`** | Cmd-K palette | Ya en uso. Reusar para "Pestañas abiertas" group. | — | ✅ — reuse |

**Decisión consolidada**: DIY headless con `@dnd-kit` + `react-resizable-panels`. **No** dock libraries. **No** rewrite del tab system existente — extender `useDocTabs`.

---

## 5. Hoja de ruta de implementación (3 sprints)

### Sprint v5.0a — single-pane refinements (Effort: M, ROI: alto)

1. **D8** — `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`. (XS)
2. **Issue 2** — Drag-reorder tabs dentro del DocTabsBar con `<SortableContext>`. (S)
3. **Issue 3** — Right-click context menu con shadcn `<ContextMenu>`. Acciones: close, close-others, close-to-right, toggle-pin. (S)
4. **D7** — Pin tab: estado persistido en localStorage, render con ícono Pin, exclude de Ctrl+W. (S)
5. **Issue 1** — Tab overflow: ResizeObserver + chevrons + dropdown "▾" + integración cmd-K "Pestañas abiertas". (M)
6. Validación: golden path 10 tabs abiertas, drag-reorder, pin 2, close-others. Test a mano.
7. Commit + push v5.0a.

### Sprint v5.0b — multi-pane (Effort: L, ROI: medio-alto)

8. **D2** — Modelo `WorkspaceLayout` + reducers (`splitPane`, `closePane`, `moveTab`, `mergePane`). (M)
9. **D4** — `<WorkspaceShell>` con render recursivo. `<PaneShell>` por nodo hoja. (M)
10. **D6** — Migrar `<ComparativeSplit>` a usar `<WorkspaceShell>` con layout 2-pane preset. URL `?compare=m04` → traduce a layout. (S)
11. **Issue 6** — Drop zones por pane (centro + 4 edges). DropOverlay visual. dnd-kit `useDroppable`. (M)
12. **Issue 6** — onDragEnd: split o move tab según drop zone. (S)
13. Validación: abrir M01, drag a edge derecha → split vertical. Drag M02 al pane derecho → mueve. Cerrar pane → reabsorber. Test a mano.
14. Commit + push v5.0b.

### Sprint v5.0c — persistencia + atajos (Effort: M, ROI: medio)

15. **D5** — `localStorage.setItem('reforma-ud:workspace-layout', JSON.stringify(layout))` debounced 300ms. (S)
16. **D5** — Restore on load. Fallback a single-pane si no hay entry. (S)
17. **D5** — Migración: detectar `?tabs=` legacy → convertir a single-pane layout → persistir. (S)
18. **Issue 8** — Atajos `Ctrl+\`, `Ctrl+Shift+\`, `Ctrl+1..9`, `Ctrl+K W`. (S)
19. **Issue 8** — Indicador visual del pane focado (border-primary/30). (XS)
20. Validación: cerrar y reabrir browser → workspace restaurado. Atajos funcionando. Test a mano.
21. Commit + push v5.0c.

**Criterio de done v5.0**: el usuario puede abrir 4-5 papers en distintos panes, mover tabs entre ellos, fijar las importantes, cerrar todo el navegador, y al reabrir reforma-ud.vercel.app el workspace queda exactamente como estaba.

---

## 6. Decision matrix · KEEP / CHANGE / ADD / REMOVE

| Componente / Feature | Veredicto | Nota |
|---|---|---|
| `useDocTabs` (hook) | CHANGE | Extender con `pinned`, `reorderTabs`, `closeOthers`, `closeToRight`, `togglePin`. |
| URL `?tabs=` state | KEEP en single-pane · OBSOLETE en multi-pane | Fallback compat. v5.0c migra a localStorage. |
| `DocTabsBar` | CHANGE | Wrap con `<SortableContext>`, ContextMenu, overflow chevrons. |
| `<ComparativeSplit>` | REMOVE | Reemplaza con `<WorkspaceShell>` con preset 2-pane (D6). |
| URL `?compare=` state | KEEP-TRANSLATE | Se convierte a layout 2-pane internamente. |
| `react-resizable-panels` | KEEP | Base de los `<Group>` recursivos. |
| `cmdk` palette | CHANGE | Añadir grupo "Pestañas abiertas". |
| `@dnd-kit/*` | ADD | Drag primitives. |
| `dockview` / `rc-dock` / `flexlayout-react` | REJECT | Pelearían con shadcn/Tailwind. |
| Tab stacks (group multiple tabs) | DEFER v5.1+ | Obsidian feature avanzada. |
| Floating windows (pop-out tab) | DEFER | Requiere `window.open` + IPC; usuario no lo pidió. |

---

## 7. Riesgos y mitigaciones

- **R1: localStorage quota exceeded**. Layouts grandes (>10 panes con 50+ tabs) pueden pasar de 5MB. Mitigación: comprimir con `lz-string` (~70% reducción para JSON repetitivo) si el blob > 100KB.
- **R2: Restauración con docs eliminados**. Si el usuario tiene una tab `m99` en localStorage pero ya no existe, debe ignorarse silenciosamente. Mitigación: validar cada `tabId` con `resolveTab()` durante el restore; quitar los broken antes de hidratar.
- **R3: Memoria en muchos panes**. Cada pane monta el body MDX completo. Si hay 10 panes con M01 grande, eso son 10 árboles MDX vivos. Mitigación: `React.memo` + `useTransition` + lazy mount: solo el pane focado y vecinos visibles renderizan; otros muestran placeholder con título.
- **R4: Drag-drop accesibilidad**. Los lectores de pantalla deben poder reorder con teclado. Mitigación: dnd-kit `KeyboardSensor` + announcer ARIA-live region.
- **R5: Mobile**. En pantallas <768px, multi-pane no tiene sentido (no hay espacio). Mitigación: forzar single-pane mode en breakpoint mobile; tabs visibles, splits ignorados.

---

## 8. Anti-patrones explícitos · qué NO hacer en v5.0

1. **No** adoptar dockview/rc-dock por "ahorrar tiempo". El costo de pelear con su CSS supera el beneficio.
2. **No** serializar el layout completo en URL. Una URL con 4 panes anidados y 12 tabs es ilegible y rompe el límite de URL en algunos browsers.
3. **No** introducir Yjs/CRDT en v5.0. La pregunta MVP es "¿puedo configurar mi workspace?", no "¿puedo colaborar editando?".
4. **No** soportar floating windows. `window.open` + sync de estado es complejidad innecesaria; el usuario no lo pidió.
5. **No** cambiar el modelo de las 3 zonas (sidebar / center / right-panel) que cerramos en v4.5. v5.0 vive *dentro* de la zona center.
6. **No** romper el atajo `Ctrl+W` actual. Si la tab está pinneada, mostrar toast "Tab fijada — desfijar primero" antes de cerrar.

---

## 9. Bibliografía verificable

- React Resizable Panels — Nested Groups: <https://react-resizable-panels.vercel.app/examples/nested-groups>
- @dnd-kit docs: <https://docs.dndkit.com>
- @dnd-kit/sortable presets: <https://docs.dndkit.com/presets/sortable>
- shadcn ContextMenu: <https://ui.shadcn.com/docs/components/context-menu>
- Obsidian Workspace API: <https://docs.obsidian.md/Reference/TypeScript+API/Workspace>
- VS Code IEditorGroupsService: <https://code.visualstudio.com/api/references/vscode-api#editorGroupsService>
- dockview-react: <https://github.com/mathuo/dockview>
- lz-string compression: <https://www.npmjs.com/package/lz-string>

---

## 10. Cierre · alineación con el principio raíz de v4.5

El audit v4.5 estableció: **el portal tiene 3 zonas con responsabilidades distintas**. v5.0 NO modifica esas zonas. Lo que hace es resolver una sola pregunta dentro de la zona *center*: *"¿cómo modelo N documentos abiertos en M panes?"*.

La regla raíz se mantiene:
- **Sidebar izquierdo** = inter-doc (entre nodos del vault).
- **Center** = el doc activo + sus configuraciones internas (tabs, splits, comparación).
- **Right panel** = intra-doc (relaciones, comunidad, asistente del doc focado en el pane activo).

> **Observación crítica**: en multi-pane, el `RightPanel` debe seguir al pane *focado*, no a un pane fijo. Eso significa: cambiar de pane → el right panel actualiza Conexiones/Refs/Comunidad para reflejar el nuevo doc activo. Esto NO requiere cambios al RightPanel mismo (ya lee `getActiveDocFromPath(pathname)`); requiere que cambiar de pane actualice el `pathname` (vía `router.push`).

Si en v5.1+ vuelve a aparecer la pregunta "¿dónde poner X?", la respuesta no es mover X — es revisar la regla raíz de las 3 zonas.

---

**Estado**: PROPOSED — esperando aprobación del usuario para iniciar Sprint v5.0a (single-pane refinements).
