'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Link2, ChevronRight, BookMarked, FileText, Building2, ArrowUpRight, ArrowDownLeft, Users, BookOpen, Scale, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { canonicPaper } from '#site/content';
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

type CanonicRelations = {
  pre?: string[];
  pos?: string[];
  co?: Array<{ autor: string; pct?: number }>;
  custom?: Record<string, string[]>;
};

/**
 * RefsPanel · v4.5c D6 — referencias del documento activo en 2 zonas:
 *   1. Outgoing (frontmatter `relations`): Pre · Pos · Co · Glosario · Normas · Figuras · custom.*
 *   2. Incoming (grafo): Backlinks de otros docs que me citan.
 *
 * Reemplaza `BacklinksPanel` plano. Cuando un paper no tiene `relations`,
 * solo se muestra la zona de Backlinks.
 */
export function RefsPanel({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
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

  // Outgoing: solo papers canónicos tienen `relations` por ahora (v4.5c)
  const paper = doc.kind === 'paper' ? canonicPaper.find((p) => p.id === doc.id) : null;
  const rel = (paper as { relations?: CanonicRelations } | null)?.relations;
  const customGroups = rel?.custom ?? {};
  const outgoingTotal =
    (rel?.pre?.length ?? 0) +
    (rel?.pos?.length ?? 0) +
    (rel?.co?.length ?? 0) +
    Object.values(customGroups).reduce((acc, arr) => acc + (arr?.length ?? 0), 0);

  // Incoming: edges del grafo donde to === doc.id
  const docId = doc.id.toLowerCase();
  const incoming: Backlink[] = [];
  for (const e of data.edges) {
    if (e.to.toLowerCase() !== docId) continue;
    const sourceNode = data.nodes.find((n) => n.id === e.from);
    if (!sourceNode) continue;
    incoming.push({ source: sourceNode, edgeLabel: e.label });
  }
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
            Referencias
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {outgoingTotal + incoming.length}
          </Badge>
        </div>
        <p className="mt-0.5 text-xs font-semibold leading-tight line-clamp-2">{doc.title}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {/* OUTGOING — frontmatter relations (papers canónicos solamente) */}
        {rel && outgoingTotal > 0 && (
          <div className="space-y-2">
            <SectionHeading Icon={ArrowUpRight} label="Salientes" count={outgoingTotal} />

            {(rel.pre?.length ?? 0) > 0 && (
              <RelationGroup Icon={BookOpen} label="Pre-saberes" ids={rel.pre!} tone="amber" />
            )}
            {(rel.pos?.length ?? 0) > 0 && (
              <RelationGroup Icon={BookOpen} label="Pos-saberes" ids={rel.pos!} tone="emerald" />
            )}
            {(rel.co?.length ?? 0) > 0 && <CoAuthorGroup co={rel.co!} />}

            {Object.entries(customGroups).map(([k, ids]) => {
              if (!ids || ids.length === 0) return null;
              const Icon = customIcon(k);
              return (
                <RelationGroup
                  key={k}
                  Icon={Icon}
                  label={prettyCustomLabel(k)}
                  ids={ids}
                  tone={customTone(k)}
                />
              );
            })}
          </div>
        )}

        {/* INCOMING — backlinks del grafo */}
        <div className="space-y-2">
          <SectionHeading Icon={ArrowDownLeft} label="Entrantes" count={incoming.length} />
          {incoming.length === 0 ? (
            <p className="text-[10px] text-muted-foreground italic px-1">
              Ningún documento referencia este aún.
            </p>
          ) : (
            Object.entries(byGroup).map(([group, items]) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ Icon, label, count }: Readonly<{ Icon: typeof BookOpen; label: string; count: number }>) {
  return (
    <div className="flex items-center gap-1.5 px-1 pb-0.5 border-b border-sidebar-border/50 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
      <Icon className="h-3 w-3" />
      <span>{label}</span>
      <span className="ml-auto font-mono text-[9px]">{count}</span>
    </div>
  );
}

function RelationGroup({
  Icon, label, ids, tone,
}: Readonly<{
  Icon: typeof BookOpen;
  label: string;
  ids: string[];
  tone: 'amber' | 'emerald' | 'blue' | 'rose' | 'violet' | 'slate';
}>) {
  const toneClass = {
    amber: 'border-amber-500/40 bg-amber-500/5 text-amber-700 dark:text-amber-300',
    emerald: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300',
    blue: 'border-blue-500/40 bg-blue-500/5 text-blue-700 dark:text-blue-300',
    rose: 'border-rose-500/40 bg-rose-500/5 text-rose-700 dark:text-rose-300',
    violet: 'border-violet-500/40 bg-violet-500/5 text-violet-700 dark:text-violet-300',
    slate: 'border-slate-500/40 bg-slate-500/5 text-slate-700 dark:text-slate-300',
  }[tone];
  return (
    <section>
      <h4 className="px-1 mb-1 inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-muted-foreground/70">
        <Icon className="h-2.5 w-2.5" />
        {label} <span className="font-mono">({ids.length})</span>
      </h4>
      <ul className="space-y-0.5">
        {ids.map((id) => (
          <li key={id}>
            <RelationItem id={id} toneClass={toneClass} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function RelationItem({ id, toneClass }: Readonly<{ id: string; toneClass: string }>) {
  const resolved = resolveId(id);
  const Inner = (
    <span className={cn('flex items-center gap-1 rounded-md border-l-2 px-2 py-1 text-[11px]', toneClass)}>
      <span className="flex-1 truncate font-medium">{resolved.label}</span>
      {resolved.href && <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />}
    </span>
  );
  if (resolved.href) {
    return (
      <Link href={resolved.href} className="block hover:opacity-90 transition-opacity">
        {Inner}
      </Link>
    );
  }
  return Inner;
}

function CoAuthorGroup({ co }: Readonly<{ co: Array<{ autor: string; pct?: number }> }>) {
  return (
    <section>
      <h4 className="px-1 mb-1 inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-muted-foreground/70">
        <Users className="h-2.5 w-2.5" />
        Co-autores <span className="font-mono">({co.length})</span>
      </h4>
      <ul className="space-y-0.5">
        {co.map((c, i) => (
          <li key={`${c.autor}-${i}`}>
            <span className="flex items-center gap-1.5 rounded-md border-l-2 border-primary/30 bg-primary/5 px-2 py-1 text-[11px]">
              <span className="font-mono">@{c.autor}</span>
              {c.pct !== undefined && (
                <span className="ml-auto font-mono text-muted-foreground">{c.pct}%</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function resolveId(id: string): { label: string; href: string | null } {
  // Paper canónico m##
  if (/^m\d{2}$/i.test(id)) {
    const p = canonicPaper.find((x) => x.id === id.toLowerCase());
    return {
      label: p ? `M${String(p.number).padStart(2, '0')} · ${p.title}` : id.toUpperCase(),
      href: `/canonico/${id.toLowerCase()}`,
    };
  }
  // Glosario, normas, figuras — sin página propia hoy; mostrar como pretty label.
  return {
    label: id.replace(/^(glo|fig|acu|estatuto|res|conpes|ley|decreto)-/, '').replaceAll('-', ' '),
    href: null,
  };
}

function customIcon(k: string): typeof BookOpen {
  if (k === 'glosario') return BookOpen;
  if (k === 'normas') return Scale;
  if (k === 'figuras') return ImageIcon;
  return Link2;
}
function customTone(k: string): 'amber' | 'emerald' | 'blue' | 'rose' | 'violet' | 'slate' {
  if (k === 'glosario') return 'amber';
  if (k === 'normas') return 'rose';
  if (k === 'figuras') return 'violet';
  return 'slate';
}
function prettyCustomLabel(k: string): string {
  if (k === 'glosario') return 'Glosario invocado';
  if (k === 'normas') return 'Normas';
  if (k === 'figuras') return 'Figuras';
  return k.charAt(0).toUpperCase() + k.slice(1);
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

function EmptyState({ reason, message }: Readonly<{ reason: 'no-doc' | 'loading' | 'error'; message?: string }>) {
  const config = {
    'no-doc':  { title: 'Sin documento activo', sub: 'Abre un paper o nota para ver sus referencias.' },
    'loading': { title: 'Cargando grafo...', sub: 'Indexando referencias.' },
    'error':   { title: 'Error', sub: message ?? 'No se pudo cargar el grafo.' },
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
