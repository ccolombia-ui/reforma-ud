'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BookMarked, BookOpen, Video, FileText, GraduationCap, Library, FileQuestion } from 'lucide-react';

/**
 * Knowledge Pipeline Kanban-Dash
 * SOTA CoP: clasifica documentos por estado de madurez × tipo de medio.
 * Estado: Draft → Review → Standard (pipeline de evolucion del conocimiento)
 * Tipo: guia | manual | curso | paper | book | video | norma | nota
 */

export type KnowledgeStatus = 'draft' | 'review' | 'standard';
export type KnowledgeType = 'guia' | 'manual' | 'curso' | 'paper' | 'book' | 'video' | 'norma' | 'nota';

const STATUS_META = {
  draft: { label: 'Draft', icon: '✍️', color: '#eab308', desc: 'En construcción · DRAFT · YELLOW' },
  review: { label: 'Review', icon: '👁️', color: '#0284c7', desc: 'En revisión por pares · BLUE' },
  standard: { label: 'Standard', icon: '✓', color: '#10b981', desc: 'Estandarizado · FINAL · GREEN' },
} as const;

const TYPE_META: Record<KnowledgeType, { label: string; icon: typeof BookMarked; color: string }> = {
  guia: { label: 'Guía', icon: BookOpen, color: 'var(--color-brand-emerald)' },
  manual: { label: 'Manual', icon: FileText, color: 'var(--color-brand-blue)' },
  curso: { label: 'Curso', icon: GraduationCap, color: 'var(--color-brand-purple)' },
  paper: { label: 'Paper', icon: BookMarked, color: 'var(--color-brand-purple)' },
  book: { label: 'Libro/Sección', icon: Library, color: 'var(--color-brand-gold)' },
  video: { label: 'Video', icon: Video, color: 'var(--color-brand-orange)' },
  norma: { label: 'Norma', icon: FileText, color: 'var(--color-brand-blue)' },
  nota: { label: 'Nota', icon: FileQuestion, color: '#94a3b8' },
};

export type KnowledgeItem = {
  id: string;
  title: string;
  status: KnowledgeStatus;
  type: KnowledgeType;
  href: string;
};

export function classifyKnowledgeStatus(opts: { kd_status?: string; status?: string; tdd?: string }): KnowledgeStatus {
  const s = (opts.kd_status ?? opts.status ?? opts.tdd ?? '').toLowerCase();
  if (s === 'final' || s === 'green' || s === 'published' || s === 'standard') return 'standard';
  if (s === 'review' || s === 'yellow' || s === 'pr') return 'review';
  return 'draft';
}

export function classifyKnowledgeType(opts: { tags?: string[]; estante?: string; id?: string }): KnowledgeType {
  const tags = (opts.tags ?? []).map((t) => t.toLowerCase());
  if (tags.some((t) => /^video|youtube|mp4/.test(t))) return 'video';
  if (tags.some((t) => /^curso|course|moduloacademic/.test(t))) return 'curso';
  if (tags.some((t) => /^manual|handbook/.test(t))) return 'manual';
  if (tags.some((t) => /^guia|bpa|tutorial|recipe/.test(t))) return 'guia';
  if (tags.some((t) => /^libro|book|capitulo|seccion|young|freedman/.test(t))) return 'book';
  if (tags.some((t) => /^norma|acuerdo|ley|decreto|resolucion/.test(t))) return 'norma';
  if (opts.estante === 'norma') return 'norma';
  if (opts.estante === 'guia') return 'guia';
  if (opts.estante === 'seccion-libro') return 'book';
  if (opts.id?.startsWith('m') && /^m\d{2}$/.test(opts.id)) return 'paper';
  return 'nota';
}

/* ------------------------------------------------------------ */

export function KnowledgePipeline({ items }: { items: KnowledgeItem[] }) {
  const matrix = useMemo(() => {
    const m: Record<KnowledgeStatus, Record<KnowledgeType, KnowledgeItem[]>> = {
      draft: { guia: [], manual: [], curso: [], paper: [], book: [], video: [], norma: [], nota: [] },
      review: { guia: [], manual: [], curso: [], paper: [], book: [], video: [], norma: [], nota: [] },
      standard: { guia: [], manual: [], curso: [], paper: [], book: [], video: [], norma: [], nota: [] },
    };
    for (const item of items) {
      m[item.status][item.type].push(item);
    }
    return m;
  }, [items]);

  const totals = useMemo(() => {
    const t = {
      total: items.length,
      byStatus: { draft: 0, review: 0, standard: 0 } as Record<KnowledgeStatus, number>,
      byType: {} as Record<KnowledgeType, number>,
    };
    for (const item of items) {
      t.byStatus[item.status]++;
      t.byType[item.type] = (t.byType[item.type] ?? 0) + 1;
    }
    return t;
  }, [items]);

  const types = (Object.keys(TYPE_META) as KnowledgeType[]).filter((t) => totals.byType[t] > 0);

  return (
    <div className="space-y-4">
      {/* Title + stats */}
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Pipeline de conocimiento</h2>
          <p className="text-sm text-muted-foreground">
            Madurez del corpus de la CoP · {totals.total} documentos
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(STATUS_META) as KnowledgeStatus[]).map((s) => {
            const meta = STATUS_META[s];
            const pct = totals.total > 0 ? Math.round((totals.byStatus[s] / totals.total) * 100) : 0;
            return (
              <div
                key={s}
                className="rounded-lg border bg-background px-3 py-1.5 text-xs"
                style={{ borderColor: meta.color }}
              >
                <span className="mr-1">{meta.icon}</span>
                <strong className="font-mono">{totals.byStatus[s]}</strong>
                <span className="text-muted-foreground"> {meta.label} · {pct}%</span>
              </div>
            );
          })}
        </div>
      </header>

      {/* Progress bar global */}
      <div className="flex h-2 overflow-hidden rounded-full bg-muted">
        {(Object.keys(STATUS_META) as KnowledgeStatus[]).map((s) => {
          const pct = totals.total > 0 ? (totals.byStatus[s] / totals.total) * 100 : 0;
          if (pct === 0) return null;
          return (
            <div
              key={s}
              style={{ background: STATUS_META[s].color, width: `${pct}%` }}
              title={`${STATUS_META[s].label}: ${totals.byStatus[s]}`}
            />
          );
        })}
      </div>

      {/* 3-col kanban */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {(Object.keys(STATUS_META) as KnowledgeStatus[]).map((s) => {
          const meta = STATUS_META[s];
          return (
            <div key={s} className="space-y-2">
              <Card className="border-t-4" style={{ borderTopColor: meta.color }}>
                <CardContent className="flex items-center justify-between p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{meta.icon}</span>
                    <div>
                      <div className="text-sm font-semibold">{meta.label}</div>
                      <div className="text-[10px] text-muted-foreground line-clamp-1">{meta.desc}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {totals.byStatus[s]}
                  </Badge>
                </CardContent>
              </Card>

              {types.map((t) => {
                const list = matrix[s][t];
                if (list.length === 0) return null;
                const tm = TYPE_META[t];
                return (
                  <div key={t} className="rounded-lg border bg-muted/20 p-2 space-y-1">
                    <header className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5" style={{ color: tm.color }}>
                        <tm.icon className="h-3 w-3" />
                        {tm.label}
                      </span>
                      <span>{list.length}</span>
                    </header>
                    <ul className="space-y-1">
                      {list.slice(0, 4).map((item) => (
                        <li key={item.id}>
                          <a
                            href={item.href}
                            className="block rounded px-2 py-1 text-xs hover:bg-background hover:text-foreground line-clamp-2"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                      {list.length > 4 && (
                        <li className="px-2 py-0.5 text-[10px] text-muted-foreground">
                          +{list.length - 4} más
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}

              {types.every((t) => matrix[s][t].length === 0) && (
                <div className="rounded-md border border-dashed bg-muted/10 p-4 text-center text-[10px] text-muted-foreground">
                  Sin documentos en esta etapa
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend de tipos */}
      <div className="flex flex-wrap gap-3 rounded-md border bg-muted/20 p-2 text-[10px]">
        <span className="text-muted-foreground font-semibold">Tipos:</span>
        {(Object.keys(TYPE_META) as KnowledgeType[]).map((t) => {
          const meta = TYPE_META[t];
          const count = totals.byType[t] ?? 0;
          return (
            <span
              key={t}
              className={cn('inline-flex items-center gap-1', count === 0 && 'opacity-40')}
            >
              <meta.icon className="h-3 w-3" style={{ color: meta.color }} />
              {meta.label}
              <span className="font-mono text-muted-foreground">({count})</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
