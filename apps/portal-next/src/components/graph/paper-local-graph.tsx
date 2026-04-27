'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Loader2, ExternalLink, RefreshCw, SplitSquareHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePanesState } from '@/lib/panes-state';

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
 * PaperLocalGraph — extrae del grafo global el subgrafo centrado en paperId
 * con N-hops de vecinos. Resalta el nodo activo.
 */
export function PaperLocalGraph({ paperId, hops = 2 }: { paperId: string; hops?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const [global, setGlobal] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const panesState = usePanesState();

  // v5.0j Gap 4 · click en nodo NO reemplaza el doc actual; abre en pane
  // derecho (pane B). Si el nodo es el doc activo, no-op (ya está abierto).
  const openInRightPane = useCallback((nodeId: string) => {
    if (nodeId === paperId) return; // ya estamos viendo este doc
    panesState.openInNextPane(nodeId);
  }, [panesState, paperId]);

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

  // Subgrafo centrado en paperId con N-hops
  const subgraph = useMemo<GraphData | null>(() => {
    if (!global) return null;
    const reachable = new Set<string>([paperId]);
    let frontier = new Set<string>([paperId]);
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
      if (n.id === paperId) {
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
  }, [global, paperId, hops]);

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

    network.on('click', (params: { nodes: string[] }) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = subgraph.nodes.find((n) => n.id === nodeId);
        setSelected(node ?? null);
      } else {
        setSelected(null);
      }
    });

    // v5.0j Gap 4 · doubleClick abre el nodo en pane derecho (preserva el
    // doc actual en pane A). Antes hacía window.location.href que reemplazaba.
    network.on('doubleClick', (params: { nodes: string[] }) => {
      if (params.nodes.length > 0) {
        openInRightPane(params.nodes[0]);
      }
    });

    networkRef.current = network;
    return () => {
      network.destroy();
      networkRef.current = null;
    };
  }, [subgraph, openInRightPane]);

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
                onClick={() => openInRightPane(selected.id)}
                disabled={selected.id === paperId}
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
