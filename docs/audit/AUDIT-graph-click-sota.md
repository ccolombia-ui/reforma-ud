---
kd_id: audit/graph-click-sota
kd_version: 1.0.0
kd_date: 2026-04-28
kd_status: active
kd_priority: P1
---

# AUDIT · SOTA Graph Node Click Behavior

> **Sprint v7.11** · cómo deben comportarse los clicks en nodos del grafo
> semántico para facilitar análisis comparativo de documentos relacionados.

---

## §1 · Práctica SOTA — Obsidian

Obsidian (referencia primaria del portal) gestiona clicks en su Graph view así:

| Modificador | Comportamiento |
|---|---|
| Click | Abre el archivo en el **leaf activo** (reemplaza el documento actual) |
| Cmd/Ctrl + Click | Abre en un **nuevo pane** a la derecha del activo |
| Middle click | Abre en una **nueva tab** del leaf activo |
| Shift + Click | Abre en un nuevo pane (Windows-style) |

**Limitación identificada por el usuario**: el comportamiento default de Obsidian
(reemplazar) es óptimo cuando el usuario *ya sabe* que quiere navegar a otro doc.
Pero el caso de uso del grafo semántico es típicamente **explorar relaciones** —
el usuario quiere ver el doc nuevo *junto al actual* para compararlos.

## §2 · Adaptación contextual

El portal tiene un toggle global `splitMode` (header) que controla la
visibilidad de panes secundarios. La regla nueva:

| Estado actual | Click en grafo | Resultado |
|---|---|---|
| `splitMode=OFF` (1 pane) | Activa split + abre el doc en pane B | Comparación inmediata sin abandonar el doc actual |
| `splitMode=ON` (2+ panes) | Abre en el último pane secundario usado | Sigue patrón Obsidian (preserva pane A) |
| Click sobre el nodo focal (mismo doc) | Noop | No reabre el documento actual |
| Cmd/Ctrl + Click | Igual que default (abrir en split) | Consistencia con resto del portal |
| Doble click | Mismo que click (legacy retrocompat) | — |

## §3 · Por qué esta adaptación

1. **El grafo no es navegación principal** — el sidebar izquierdo y el command
   palette son los caminos primarios para reemplazar el doc activo. El grafo es
   exploración lateral.
2. **Preserva el contexto de lectura** — el usuario nunca pierde el doc que
   estaba leyendo al hacer click en una relación.
3. **Activación implícita del split** — el usuario no tiene que recordar
   activar splitMode antes; el grafo lo activa cuando lo necesita.
4. **Reversible con un solo gesto** — toggle splitMode en el header desactiva
   los panes secundarios sin perder estado.

## §4 · TDD aditivo

Función pura `decideGraphClick(input) → action` extraída para testear sin
React/JSDOM. Acciones discretas:

```ts
type GraphClickAction =
  | { kind: 'noop' }                                    // mismo nodo focal
  | { kind: 'openInLastUsed'; docId: string }           // splitMode ON
  | { kind: 'activateSplitAndOpen'; docId: string };    // splitMode OFF
```

Test cases mínimos cubiertos en `src/lib/graph-click-action.test.ts`:
- click en nodo focal → noop
- click en nodo distinto, splitMode=OFF → activateSplitAndOpen
- click en nodo distinto, splitMode=ON → openInLastUsed
- focusId null (página /canonico/grafo/ global) → openInLastUsed/activateSplitAndOpen aplicable
- ctrlKey/metaKey opcional para forzar splitMode

Smoke test (Playwright): click en primer nodo del grafo del right-panel
verifica que `[data-pane="b"]` aparece (split activado) sin overlay zombie.

## §5 · Archivos afectados

### Nuevos
- `src/lib/graph-click-action.ts` — función pura
- `src/lib/graph-click-action.test.ts` — vitest 8+ casos

### Modificados
- `src/components/graph/paper-local-graph.tsx` — usa `decideGraphClick` y
  dispatch del action result en `network.on('click')`

### Tests
- `e2e/smoke.spec.ts` — nuevo test G-GRAPH-02

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-04-28*
