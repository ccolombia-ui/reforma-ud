'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Loader2, ExternalLink, RefreshCw, SplitSquareHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePanesState } from '@/lib/panes-state';
import { useSplitMode } from '@/lib/ui-state';
import { decideGraphClick } from '@/lib/graph-click-action';

type GraphNode = {
  id: string;
  label: string;
  title?: string;
  group?: string;
  url?: string;
  [key: string]: unknown;
};

type GraphEdge = {
  id?: string;
  from: string;
  to: string;
  label?: string;
  arrows?: string;
};

type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

/**
 * PaperLocalGraph — extrae del grafo global el subgrafo centrado en `nodeId`
 * con N-hops de vecinos. Resalta el nodo activo.
 *
 * v6.0 G-SVC-01 · acepta cualquier nodeId del grafo (paper m##, concepto
 * con-XXX, note slug completo, comunidad slug). El alias `paperId` se
 * mantiene retro-compatible con call-sites antiguos.
 */
export function PaperLocalGraph({
  paperId,
  nodeId,
  hops = 2,
}: {
  /** @deprecated v6.0 · usar `nodeId` (genérico). Mantenido por compat. */
  paperId?: string;
  /** ID del nodo central en graph-global.json (m##, con-*, slug, ...). */
  nodeId?: string;
  hops?: number;
}) {
  const focusId = nodeId ?? paperId ?? '';
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const [global, setGlobal] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const panesState = usePanesState();
  const { splitMode, setSplitMode } = useSplitMode();

  // v7.11 · política SOTA-adaptada (ver docs/audit/AUDIT-graph-click-sota.md):
  // El grafo es exploración lateral. Click siempre abre en pane secundario
  // (preserva el doc activo). Si splitMode=OFF, lo activa implícitamente.
  // Lógica pura en src/lib/graph-click-action.ts (testeada con 12 vitest).
  const handleGraphClick = useCallback((nodeId: string, modifierKey = false) => {
    const action = decideGraphClick({ nodeId, focusId: focusId || null, splitMode, modifierKey });
    switch (action.kind) {
      case 'noop':
        return;
      case 'openInLastUsed':
        panesState.openInLastUsedPane(action.docId);
        return;
      case 'activateSplitAndOpen':
        setSplitMode(true);
        panesState.openInLastUsedPane(action.docId);
    }
  }, [focusId, splitMode, setSplitMode, panesState]);

  // Fetch global graph una sola vez
  useEffect(() => {
    fetch('/static/graph-global.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: GraphData) => {
        setGlobal(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // v6.0 · ¿el focusId existe en el grafo? Si no, no construimos subgrafo.
  const focusInGraph = useMemo(() => {
    if (!global || !focusId) return false;
    return global.nodes.some((n) => n.id === focusId);
  }, [global, focusId]);

  // Subgrafo centrado en focusId con N-hops
  const subgraph = useMemo<GraphData | null>(() => {
    if (!global || !focusInGraph) return null;
    const reachable = new Set<string>([focusId]);
    let frontier = new Set<string>([focusId]);
    for (let h = 0; h < hops; h++) {
      const next = new Set<string>();
      for (const e of global.edges) {
        if (frontier.has(e.from) && !reachable.has(e.to)) next.add(e.to);
        if (frontier.has(e.to) && !reachable.has(e.from)) next.add(e.from);
      }
      next.forEach((n) => reachable.add(n));
      frontier = next;
      if (frontier.size === 0) break;
    }
    const nodes = global.nodes.filter((n) => reachable.has(n.id)).map((n) => {
      if (n.id === focusId) {
        return {
          ...n,
          borderWidth: 4,
          size: 36,
          color: typeof n.color === 'object' && n.color
            ? { ...(n.color as Record<string, unknown>), border: '#fbbf24' }
            : { border: '#fbbf24' },
        };
      }
      return n;
    });
    const edges = global.edges.filter((e) => reachable.has(e.from) && reachable.has(e.to));
    return { nodes, edges };
  }, [global, focusId, focusInGraph, hops]);

  // Render vis-network
  useEffect(() => {
    if (!subgraph || !containerRef.current) return;
    const nodes = new DataSet<GraphNode>(subgraph.nodes);
    const edgesWithIds = subgraph.edges.map((e, i) => ({ id: e.id ?? `e${i}`, ...e }));
    const edges = new DataSet<GraphEdge>(edgesWithIds);

    const network = new Network(
      containerRef.current,
      { nodes, edges },
      {
        autoResize: true,
        physics: {
          enabled: true,
          solver: 'forceAtlas2Based',
          forceAtlas2Based: {
            gravitationalConstant: -45,
            centralGravity: 0.015,
            springLength: 110,
            springConstant: 0.08,
            damping: 0.5,
            avoidOverlap: 0.6,
          },
          stabilization: { enabled: true, iterations: 150, updateInterval: 25 },
        },
        interaction: { hover: true, tooltipDelay: 150, zoomView: true, dragView: true },
        edges: {
          color: { color: '#94a3b8', highlight: '#0284c7', hover: '#0284c7' },
          width: 1,
          smooth: { enabled: true, type: 'continuous', roundness: 0.5 },
          font: { color: '#64748b', size: 9, face: 'Inter', strokeWidth: 0 },
          arrows: { to: { enabled: true, scaleFactor: 0.4 } },
        },
        nodes: {
          borderWidth: 2,
          shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 6, x: 0, y: 2 },
        },
      },
    );

    // v7.10 · single click ahora abre el nodo en el área de trabajo además de
    // seleccionarlo para inspección. Antes solo seleccionaba (mostraba detalle
    // en panel lateral del grafo) — UX confusa: el usuario reportó "clic en
    // grafo no hace nada en área de trabajo". DoubleClick mantiene mismo
    // comportamiento para retrocompatibilidad.
    network.on('click', (params: { nodes: string[]; event?: { srcEvent?: { ctrlKey?: boolean; metaKey?: boolean } } }) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = subgraph.nodes.find((n) => n.id === nodeId);
        setSelected(node ?? null);
        const src = params.event?.srcEvent;
        const modifierKey = !!(src?.ctrlKey || src?.metaKey);
        handleGraphClick(nodeId, modifierKey);
      } else {
        setSelected(null);
      }
    });

    network.on('doubleClick', (params: { nodes: string[] }) => {
      if (params.nodes.length > 0) {
        handleGraphClick(params.nodes[0]);
      }
    });

    networkRef.current = network;
    return () => {
      network.destroy();
      networkRef.current = null;
    };
  }, [subgraph, handleGraphClick]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-medium">Vecindario semántico</span>
          {subgraph && (
            <Badge variant="outline" className="text-[9px]">
              {subgraph.nodes.length} nodos · {subgraph.edges.length} aristas
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 gap-1 px-2 text-[10px]"
          onClick={() => networkRef.current?.fit({ animation: { duration: 400, easingFunction: 'easeInOutQuad' } })}
          aria-label="Centrar"
        >
          <RefreshCw className="h-3 w-3" />
          Centrar
        </Button>
      </div>
      <div className="relative flex-1 min-h-0 bg-muted/10">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando grafo...
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-destructive text-sm">
            Error: {error}
          </div>
        )}
        {!loading && !error && global && !focusInGraph && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-xs text-muted-foreground">
            <div className="font-mono text-[10px] uppercase tracking-wide">{focusId || '—'}</div>
            <p>Este nodo aún no aparece en el grafo global del corpus.</p>
            <p className="text-[10px]">Pendiente de indexación · ver scripts/build-graph.mjs</p>
          </div>
        )}
        <div ref={containerRef} className="absolute inset-0" />
      </div>
      {selected && (
        <div className="border-t p-3 space-y-2 text-sm">
          <div className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
            {selected.group ?? 'nodo'}
          </div>
          <h3 className="text-sm font-semibold leading-tight">{selected.label}</h3>
          {selected.title && (
            <p className="whitespace-pre-line text-xs text-muted-foreground line-clamp-3">
              {selected.title}
            </p>
          )}
          {selected.url && (
            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 h-7 text-xs flex-1"
                onClick={() => handleGraphClick(selected.id)}
                disabled={selected.id === focusId}
                title="Abrir en pane derecho (preserva el doc actual)"
              >
                <SplitSquareHorizontal className="h-3 w-3" />
                A la derecha
              </Button>
              <Button asChild size="sm" variant="ghost" className="gap-1.5 h-7 text-xs flex-1">
                <Link href={selected.url}>
                  Reemplazar <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
