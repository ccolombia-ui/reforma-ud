'use client';

import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Card } from '@/components/ui/card';
import { Loader2, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
  meta?: { counts?: { nodes: number; edges: number } };
};

export function VisNetworkGraph({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GraphData | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: GraphData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [src]);

  useEffect(() => {
    if (!data || !containerRef.current) return;

    const nodes = new DataSet<GraphNode>(data.nodes);
    const edgesWithIds = data.edges.map((e, i) => ({ id: e.id ?? `e${i}`, ...e }));
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
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springLength: 130,
            springConstant: 0.08,
            damping: 0.5,
            avoidOverlap: 0.5,
          },
          stabilization: {
            enabled: true,
            iterations: 200,
            updateInterval: 25,
          },
        },
        interaction: {
          hover: true,
          tooltipDelay: 150,
          zoomView: true,
          dragView: true,
          navigationButtons: false,
        },
        edges: {
          color: { color: '#94a3b8', highlight: '#0284c7', hover: '#0284c7' },
          width: 1,
          smooth: { enabled: true, type: 'continuous', roundness: 0.5 },
          font: { color: '#64748b', size: 10, face: 'Inter', strokeWidth: 0 },
          arrows: { to: { enabled: true, scaleFactor: 0.4 } },
        },
        nodes: {
          borderWidth: 2,
          shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 6, x: 0, y: 2 },
        },
      }
    );

    network.on('click', (params: { nodes: string[] }) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = data.nodes.find((n) => n.id === nodeId);
        setSelected(node ?? null);
      } else {
        setSelected(null);
      }
    });

    network.on('doubleClick', (params: { nodes: string[] }) => {
      if (params.nodes.length > 0) {
        const node = data.nodes.find((n) => n.id === params.nodes[0]);
        if (node?.url) window.location.href = node.url;
      }
    });

    networkRef.current = network;

    return () => {
      network.destroy();
      networkRef.current = null;
    };
  }, [data]);

  return (
    <div className={fullscreen ? 'fixed inset-0 z-50 bg-background' : 'relative'}>
      <div className="relative h-[600px] w-full overflow-hidden rounded-lg border bg-muted/20">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Cargando grafo...
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-destructive">
            Error: {error}
          </div>
        )}
        <div ref={containerRef} className="h-full w-full" />

        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-3 h-8 w-8 shadow-md"
          onClick={() => setFullscreen((v) => !v)}
          aria-label={fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>

        {data?.meta?.counts && (
          <div className="absolute bottom-3 left-3 rounded bg-background/85 px-2 py-1 text-xs text-muted-foreground backdrop-blur">
            {data.meta.counts.nodes} nodos · {data.meta.counts.edges} aristas
          </div>
        )}
      </div>

      {selected && (
        <Card className="mt-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {selected.group ?? 'nodo'}
              </div>
              <h3 className="mt-1 text-base font-semibold">{selected.label}</h3>
              {selected.title && (
                <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                  {selected.title}
                </p>
              )}
            </div>
            {selected.url && (
              <Button asChild size="sm" variant="outline" className="gap-1.5 shrink-0">
                <Link href={selected.url}>
                  Abrir <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
            )}
          </div>
        </Card>
      )}

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <Legend color="#0284c7" label="Paper canónico" />
        <Legend color="#7c3aed" label="Vicerrectoría" />
        <Legend color="#0f172a" label="Gobierno" />
        <Legend color="#d97706" label="Escuela" />
        <Legend color="#059669" label="Instituto" />
        <Legend color="#ea580c" label="Centro" />
        <Legend color="#94a3b8" label="Nota" />
        <span className="ml-auto opacity-70">Doble clic en un nodo para abrir</span>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
