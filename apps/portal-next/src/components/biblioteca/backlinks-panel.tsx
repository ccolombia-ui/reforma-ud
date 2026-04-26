'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Link2, ChevronRight, BookMarked, FileText, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ActiveDoc } from '@/lib/active-doc';
import { cn } from '@/lib/utils';

type GraphNode = {
  id: string;
  label: string;
  group?: string;
  url?: string;
};

type GraphEdge = {
  from: string;
  to: string;
  label?: string;
};

type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

type Backlink = {
  source: GraphNode;
  edgeLabel?: string;
};

/**
 * BacklinksPanel — qué documentos referencian al doc activo.
 * Reusa el grafo global (graph-global.json) buscando edges con target === doc.id.
 */
export function BacklinksPanel({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/static/graph-global.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: GraphData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, []);

  if (!doc) return <EmptyState reason="no-doc" />;
  if (loading) return <EmptyState reason="loading" />;
  if (error) return <EmptyState reason="error" message={error} />;
  if (!data) return <EmptyState reason="no-doc" />;

  // Buscar edges donde target === doc.id (con coincidencia case-insensitive para papers)
  const docId = doc.id.toLowerCase();
  const incoming: Backlink[] = [];
  for (const e of data.edges) {
    if (e.to.toLowerCase() !== docId) continue;
    const sourceNode = data.nodes.find((n) => n.id === e.from);
    if (!sourceNode) continue;
    incoming.push({ source: sourceNode, edgeLabel: e.label });
  }

  // Agrupar por kind del source
  const byGroup: Record<string, Backlink[]> = {};
  for (const b of incoming) {
    const k = b.source.group ?? 'otro';
    if (!byGroup[k]) byGroup[k] = [];
    byGroup[k].push(b);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-sidebar-border px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            <Link2 className="h-3 w-3" />
            Backlinks
          </div>
          <Badge variant="secondary" className="text-[10px]">{incoming.length}</Badge>
        </div>
        <p className="mt-0.5 text-xs font-semibold leading-tight line-clamp-2">{doc.title}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {incoming.length === 0 ? (
          <EmptyState reason="no-backlinks" />
        ) : (
          <div className="space-y-3">
            {Object.entries(byGroup).map(([group, items]) => (
              <section key={group}>
                <h4 className="px-1 mb-1 text-[9px] uppercase tracking-wider text-muted-foreground/70">
                  {kindLabel(group)} <span className="font-mono">({items.length})</span>
                </h4>
                <ul className="space-y-0.5">
                  {items.map((b) => (
                    <BacklinkItem key={b.source.id} backlink={b} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function backlinkIcon(group: string | undefined): typeof BookMarked {
  if (group === 'paper') return BookMarked;
  if (group === 'note') return FileText;
  return Building2;
}

function BacklinkItem({ backlink }: Readonly<{ backlink: Backlink }>) {
  const { source, edgeLabel } = backlink;
  const Icon = backlinkIcon(source.group);

  if (!source.url) {
    return (
      <li className="px-2 py-1 text-xs text-muted-foreground italic">
        {source.label}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={source.url}
        className={cn(
          'group flex items-start gap-1.5 rounded px-2 py-1 text-xs transition-colors',
          'hover:bg-accent/40',
        )}
      >
        <Icon className="h-3 w-3 mt-0.5 shrink-0 opacity-60" />
        <div className="min-w-0 flex-1">
          <p className="font-medium leading-tight line-clamp-2">{source.label}</p>
          {edgeLabel && (
            <span className="text-[9px] text-muted-foreground italic">
              relación: {edgeLabel}
            </span>
          )}
        </div>
        <ChevronRight className="h-3 w-3 mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
      </Link>
    </li>
  );
}

function kindLabel(group: string): string {
  const map: Record<string, string> = {
    paper:         'Papers canónicos',
    vicerrectoria: 'Vicerrectorías',
    gobierno:      'Gobierno',
    csu:           'CSU',
    rectoria:      'Rectoría',
    direccion:     'Direcciones',
    facultad:      'Facultades',
    programa:      'Programas',
    escuela:       'Escuelas',
    caba:          'CABAs',
    instituto:     'Institutos',
    centro:        'Centros',
    note:          'Notas del vault',
  };
  return map[group] ?? group;
}

function EmptyState({ reason, message }: Readonly<{ reason: 'no-doc' | 'loading' | 'error' | 'no-backlinks'; message?: string }>) {
  const config = {
    'no-doc':       { title: 'Sin documento activo', sub: 'Abre un paper o nota para ver sus backlinks.' },
    'loading':      { title: 'Cargando grafo...', sub: 'Indexando referencias.' },
    'error':        { title: 'Error', sub: message ?? 'No se pudo cargar el grafo.' },
    'no-backlinks': { title: 'Sin backlinks', sub: 'Ningún documento referencia este aún.' },
  } as const;
  const c = config[reason];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground p-4">
      <Link2 className="h-6 w-6 opacity-40" />
      <p className="font-medium text-foreground">{c.title}</p>
      <p className="text-[10px]">{c.sub}</p>
    </div>
  );
}
