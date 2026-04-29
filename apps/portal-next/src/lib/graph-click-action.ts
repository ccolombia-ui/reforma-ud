/**
 * graph-click-action · v7.11 — política SOTA-adaptada de clicks en grafo semántico.
 *
 * Ver `docs/audit/AUDIT-graph-click-sota.md` para fundamento. Función pura
 * sin dependencias de React, vis-network ni state stores — testeable con
 * fixtures puros.
 *
 * Regla de oro: el grafo es exploración lateral. Nunca debe reemplazar el
 * documento del pane principal (A) — eso lo hace el sidebar y el command
 * palette. El click en grafo siempre abre en pane secundario.
 */

export type GraphClickAction =
  | { kind: 'noop' }
  | { kind: 'openInLastUsed'; docId: string }
  | { kind: 'activateSplitAndOpen'; docId: string };

export interface GraphClickInput {
  /** Id del nodo donde el usuario hizo click. */
  nodeId: string;
  /** Id del documento actualmente focal en el grafo (pane A). */
  focusId: string | null;
  /** Toggle global splitMode. OFF (default) = solo pane A visible. */
  splitMode: boolean;
  /** Ctrl/Cmd presionado en el click (modificador estilo Obsidian). */
  modifierKey?: boolean;
}

export function decideGraphClick(input: GraphClickInput): GraphClickAction {
  const { nodeId, focusId, splitMode, modifierKey } = input;

  // Click sobre el nodo focal — no reabrir
  if (focusId !== null && nodeId === focusId) {
    return { kind: 'noop' };
  }

  // splitMode ya ON, o usuario fuerza con modifier → abrir en último pane usado
  if (splitMode || modifierKey) {
    return { kind: 'openInLastUsed', docId: nodeId };
  }

  // splitMode OFF → activarlo y abrir en pane secundario (B)
  return { kind: 'activateSplitAndOpen', docId: nodeId };
}
