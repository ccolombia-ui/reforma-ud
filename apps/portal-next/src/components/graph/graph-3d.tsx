'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Search, Filter, X, ExternalLink, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// react-force-graph-3d depende de three.js — sólo cliente
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });

type GraphNode = {
  id: string;
  label: string;
  title?: string;
  group?: string;
  url?: string;
  color?: { background?: string; border?: string } | string;
  size?: number;
  // Posiciones inyectadas por three
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
};

type GraphEdge = { id?: string; from: string; to: string; label?: string };

type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  meta?: { counts?: { nodes: number; edges: number } };
};

const GROUP_LABEL: Record<string, string> = {
  paper: 'Paper canónico',
  vicerrectoria: 'Vicerrectoría',
  gobierno: 'Gobierno',
  csu: 'CSU',
  rectoria: 'Rectoría',
  direccion: 'Dirección',
  facultad: 'Facultad',
  programa: 'Programa',
  escuela: 'Escuela',
  caba: 'CABA',
  instituto: 'Instituto',
  centro: 'Centro',
  note: 'Nota',
};

const GROUP_COLOR: Record<string, string> = {
  paper:         '#0284c7',
  vicerrectoria: '#7c3aed',
  gobierno:      '#0f172a',
  csu:           '#334155',
  rectoria:      '#334155',
  direccion:     '#475569',
  facultad:      '#a78bfa',
  programa:      '#c4b5fd',
  escuela:       '#d97706',
  caba:          '#fbbf24',
  instituto:     '#059669',
  centro:        '#ea580c',
  note:          '#94a3b8',
};

function nodeColor(n: GraphNode): string {
  if (typeof n.color === 'string') return n.color;
  if (n.color && typeof n.color === 'object' && n.color.background) return n.color.background;
  return GROUP_COLOR[n.group ?? ''] ?? '#64748b';
}

export function Graph3D({ src }: Readonly<{ src: string }>) {
  const fgRef = useRef<unknown>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);

  // Filtros
  const [enabledGroups, setEnabledGroups] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [fullscreen, setFullscreen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Tamaño del contenedor (para que ForceGraph llene)
  const [size, setSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: GraphData) => {
        setData(json);
        // Inicializar filtros con todos los grupos activos
        const groups = new Set<string>();
        for (const n of json.nodes) if (n.group) groups.add(n.group);
        setEnabledGroups(groups);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [src]);

  // Resize observer
  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;
    const ro = new ResizeObserver(() => {
      setSize({ width: el.clientWidth, height: el.clientHeight });
    });
    ro.observe(el);
    setSize({ width: el.clientWidth, height: el.clientHeight });
    return () => ro.disconnect();
  }, [fullscreen]);

  // Lista de grupos disponibles (ordenada)
  const availableGroups = useMemo(() => {
    if (!data) return [];
    const groups = new Set<string>();
    for (const n of data.nodes) if (n.group) groups.add(n.group);
    return [...groups].sort();
  }, [data]);

  // Datos filtrados (formato react-force-graph: links no edges)
  const filteredData = useMemo(() => {
    if (!data) return { nodes: [], links: [] };
    const q = searchQuery.trim().toLowerCase();
    const matches = (n: GraphNode) => {
      if (n.group && !enabledGroups.has(n.group)) return false;
      if (q) {
        const hay = `${n.id} ${n.label} ${n.title ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    };
    const nodes = data.nodes.filter(matches);
    const visibleIds = new Set(nodes.map((n) => n.id));
    const links = data.edges
      .filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to))
      .map((e, i) => ({ source: e.from, target: e.to, label: e.label, id: e.id ?? `e${i}` }));
    return { nodes, links };
  }, [data, enabledGroups, searchQuery]);

  function toggleGroup(g: string) {
    setEnabledGroups((s) => {
      const next = new Set(s);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  }

  function selectAll() {
    setEnabledGroups(new Set(availableGroups));
  }

  function selectNone() {
    setEnabledGroups(new Set());
  }

  return (
    <div
      className={cn(
        fullscreen ? 'fixed inset-0 z-50 bg-background' : 'relative',
      )}
    >
      <div className={cn('flex gap-3', fullscreen ? 'h-full p-3' : 'h-[640px]')}>
        {/* Filtros panel */}
        {showFilters && (
          <aside className="w-64 shrink-0 rounded-lg border bg-background p-3 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1.5">
                <Filter className="h-3 w-3" /> Filtros
              </h3>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setShowFilters(false)} aria-label="Ocultar filtros">
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar nodo..."
                className="w-full rounded-md border bg-background pl-7 pr-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Categorías semánticas */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Categorías</span>
              <div className="flex gap-1">
                <button onClick={selectAll} className="text-[9px] text-primary hover:underline">Todos</button>
                <span className="text-[9px] text-muted-foreground">·</span>
                <button onClick={selectNone} className="text-[9px] text-primary hover:underline">Ninguno</button>
              </div>
            </div>
            <div className="space-y-1">
              {availableGroups.map((g) => {
                const active = enabledGroups.has(g);
                const count = data?.nodes.filter((n) => n.group === g).length ?? 0;
                return (
                  <button
                    key={g}
                    onClick={() => toggleGroup(g)}
                    className={cn(
                      'w-full flex items-center gap-2 rounded-md px-2 py-1 text-left text-xs transition-colors',
                      active ? 'bg-accent/40 text-foreground' : 'opacity-50 hover:opacity-80',
                    )}
                  >
                    <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ background: GROUP_COLOR[g] ?? '#64748b' }} />
                    <span className="flex-1 truncate">{GROUP_LABEL[g] ?? g}</span>
                    <span className="text-[9px] text-muted-foreground tabular-nums">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-4 pt-3 border-t text-[10px] text-muted-foreground space-y-0.5">
              <div className="flex justify-between">
                <span>Nodos visibles</span>
                <span className="font-mono">{filteredData.nodes.length}/{data?.nodes.length ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Aristas visibles</span>
                <span className="font-mono">{filteredData.links.length}/{data?.edges.length ?? 0}</span>
              </div>
            </div>

            {/* Detail panel */}
            {selected && (
              <Card className="mt-3 p-2.5 space-y-1.5">
                <div className="flex items-start justify-between gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                    {GROUP_LABEL[selected.group ?? ''] ?? selected.group ?? 'nodo'}
                  </span>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground"><X className="h-3 w-3" /></button>
                </div>
                <h4 className="text-xs font-semibold leading-tight">{selected.label}</h4>
                {selected.title && (
                  <p className="text-[10px] text-muted-foreground whitespace-pre-line line-clamp-4">{selected.title}</p>
                )}
                {selected.url && (
                  <Button asChild size="sm" variant="outline" className="gap-1 h-6 text-[10px] w-full">
                    <Link href={selected.url}>
                      Abrir <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </Card>
            )}
          </aside>
        )}

        {/* Canvas 3D */}
        <div ref={wrapperRef} className="relative flex-1 min-h-0 overflow-hidden rounded-lg border bg-black">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center text-muted-foreground bg-background/80">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Cargando grafo 3D...
            </div>
          )}
          {error && (
            <div className="absolute inset-0 z-10 flex items-center justify-center text-destructive">
              Error: {error}
            </div>
          )}

          {!loading && !error && (
            // @ts-expect-error react-force-graph types vary across react versions
            <ForceGraph3D
              ref={fgRef}
              graphData={filteredData}
              width={size.width}
              height={size.height}
              backgroundColor="rgba(0,0,0,1)"
              nodeId="id"
              nodeLabel={(n: GraphNode) => `<div style="background:#0f172a;color:#fff;padding:6px 8px;border-radius:6px;border:1px solid ${nodeColor(n)};max-width:240px;font-size:11px;line-height:1.3">
                <div style="font-weight:600">${escapeHtml(n.label)}</div>
                ${n.title ? `<div style="opacity:0.85;margin-top:2px">${escapeHtml(n.title).slice(0, 160)}${n.title.length > 160 ? '…' : ''}</div>` : ''}
              </div>`}
              nodeVal={(n: GraphNode) => (n.group === 'paper' ? 8 : n.group === 'vicerrectoria' ? 6 : 3)}
              nodeColor={(n: GraphNode) => nodeColor(n)}
              nodeOpacity={0.9}
              linkColor={() => 'rgba(148,163,184,0.5)'}
              linkOpacity={0.6}
              linkWidth={1}
              linkDirectionalArrowLength={3}
              linkDirectionalArrowRelPos={1}
              linkDirectionalParticles={1}
              linkDirectionalParticleSpeed={0.005}
              linkDirectionalParticleWidth={1.5}
              onNodeClick={(n: GraphNode) => setSelected(n)}
              onBackgroundClick={() => setSelected(null)}
              enableNodeDrag
              enableNavigationControls
              showNavInfo={false}
              cooldownTicks={120}
            />
          )}

          {/* Top-right controls */}
          <div className="absolute top-2 right-2 flex gap-1.5">
            {!showFilters && (
              <Button variant="secondary" size="icon" className="h-8 w-8 shadow-md" onClick={() => setShowFilters(true)} aria-label="Mostrar filtros">
                <Filter className="h-4 w-4" />
              </Button>
            )}
            <Button variant="secondary" size="icon" className="h-8 w-8 shadow-md" onClick={() => setFullscreen((v) => !v)} aria-label="Pantalla completa">
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>

          {/* Legend bottom-left */}
          {data?.meta?.counts && (
            <div className="absolute bottom-2 left-2 rounded bg-background/85 backdrop-blur px-2 py-1 text-[10px] text-muted-foreground">
              {filteredData.nodes.length} nodos · {filteredData.links.length} aristas (de {data.meta.counts.nodes} · {data.meta.counts.edges})
            </div>
          )}

          {/* Help */}
          <div className="absolute bottom-2 right-2 rounded bg-background/85 backdrop-blur px-2 py-1 text-[10px] text-muted-foreground">
            Click: seleccionar · Arrastrar: rotar/mover · Rueda: zoom
          </div>
        </div>
      </div>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return map[c];
  });
}
