'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, BookMarked, FileText, Sparkles, LayoutGrid, List, Network } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { canonicPaper, community, note } from '#site/content';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { COMPREHENSION_REGISTRY } from '@/lib/comprehension';
import { ESTANTES, classifyDoc, type EstanteId } from '@/lib/estantes';
import { cn } from '@/lib/utils';
import {
  KnowledgePipeline,
  classifyKnowledgeStatus,
  classifyKnowledgeType,
  type KnowledgeItem,
} from './knowledge-pipeline';

type DocItem = {
  id: string;
  type: 'paper' | 'note';
  title: string;
  description: string;
  href: string;
  progress: number;
  hasComprehension: boolean;
  estanteId: EstanteId;
  metaTop?: string;
  metaTags?: string[];
};

type ViewMode = 'shelves' | 'gallery' | 'list';

export function BibliotecaView({ community: c }: { community: typeof community[number] }) {
  const [readingState, setReadingState] = useState<ReadingState | null>(null);
  const [view, setView] = useState<ViewMode>('shelves');
  const [activeEstante, setActiveEstante] = useState<EstanteId | 'all'>('all');

  useEffect(() => {
    setReadingState(getReadingState());
    const onChange = () => setReadingState(getReadingState());
    window.addEventListener('reading-state-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('reading-state-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const items: DocItem[] = useMemo(() => {
    const result: DocItem[] = [];
    const cites = c.cites ?? [];

    for (const pid of cites) {
      const p = canonicPaper.find((x) => x.id === pid);
      if (!p) continue;
      const progress = readingState?.docs[p.id]?.progress ?? 0;
      const estanteId = classifyDoc({ id: p.id, tags: p.tags });
      result.push({
        id: p.id,
        type: 'paper',
        title: p.title,
        description: p.description,
        href: `/${c.slug}/biblioteca/${p.id}`,
        progress,
        hasComprehension: !!COMPREHENSION_REGISTRY[p.id],
        estanteId,
        metaTop: `M${String(p.number).padStart(2, '0')} · ${p.crispPhase}`,
        metaTags: p.tags?.slice(0, 3),
      });
    }

    const notesInVault = note.filter(
      (n) => n.communitySlug === c.slug || n.communitySlug.startsWith(c.slug + '/'),
    );
    for (const n of notesInVault) {
      const progress = readingState?.docs[n.slug]?.progress ?? 0;
      const estanteId = classifyDoc({ id: n.slug, tags: n.tags });
      result.push({
        id: n.slug,
        type: 'note',
        title: n.title,
        description: n.tags.slice(0, 4).map((t) => `#${t}`).join(' '),
        href: `/${c.slug}/biblioteca/${encodeURIComponent(n.slug)}`,
        progress,
        hasComprehension: !!COMPREHENSION_REGISTRY[n.slug],
        estanteId,
        metaTop: 'Nota del vault',
        metaTags: n.tags.slice(0, 3),
      });
    }
    return result;
  }, [c, readingState]);

  const itemsByShelf = useMemo(() => {
    const map: Record<EstanteId, DocItem[]> = {
      normas: [],
      investigaciones: [],
      guias: [],
      deliberaciones: [],
      secciones: [],
    };
    for (const item of items) map[item.estanteId].push(item);
    return map;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeEstante === 'all') return items;
    return items.filter((i) => i.estanteId === activeEstante);
  }, [items, activeEstante]);

  // KnowledgeItem para el pipeline kanban (Draft/Review/Standard × tipo)
  const knowledgeItems: KnowledgeItem[] = useMemo(() => {
    const cites = c.cites ?? [];
    const out: KnowledgeItem[] = [];
    for (const pid of cites) {
      const p = canonicPaper.find((x) => x.id === pid);
      if (!p) continue;
      out.push({
        id: p.id,
        title: p.title,
        status: classifyKnowledgeStatus({ status: p.status }),
        type: classifyKnowledgeType({ tags: p.tags, id: p.id }),
        href: `/${c.slug}/biblioteca/${p.id}`,
      });
    }
    const notesInVault = note.filter(
      (n) => n.communitySlug === c.slug || n.communitySlug.startsWith(c.slug + '/'),
    );
    for (const n of notesInVault) {
      out.push({
        id: n.slug,
        title: n.title,
        status: classifyKnowledgeStatus({}),
        type: classifyKnowledgeType({ tags: n.tags, id: n.slug }),
        href: `/${c.slug}/biblioteca/${encodeURIComponent(n.slug)}`,
      });
    }
    return out;
  }, [c]);

  const totalProgress = items.length > 0
    ? Math.round(items.reduce((acc, i) => acc + i.progress, 0) / items.length)
    : 0;
  const readCount = items.filter((i) => i.progress >= 100).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${c.slug}`} className="hover:text-foreground">
          {c.shortName ?? c.name}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Biblioteca</span>
      </nav>

      <header className="mb-6">
        <Link
          href={`/${c.slug}`}
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Volver al tablero
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Badge variant="outline" className="mb-2 gap-1">
              <BookMarked className="h-3.5 w-3.5" />
              Servicio · Biblioteca
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Biblioteca · {c.shortName ?? c.name}
            </h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Documentos clasificados en estantes con progreso de lectura y preguntas de comprensión.
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Progreso global</div>
            <div className="text-3xl font-bold tracking-tight">
              {totalProgress}<span className="text-base font-normal text-muted-foreground">%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {readCount} / {items.length} completos
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar de vistas */}
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b pb-3">
        <div className="flex items-center gap-1 rounded-lg bg-muted/60 p-1">
          {[
            { id: 'shelves' as const, label: 'Estantes', Icon: Network },
            { id: 'gallery' as const, label: 'Galería', Icon: LayoutGrid },
            { id: 'list' as const, label: 'Lista', Icon: List },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                view === v.id
                  ? 'bg-background text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
              )}
            >
              <v.Icon className="h-3.5 w-3.5" />
              <span>{v.label}</span>
            </button>
          ))}
        </div>

        {(view === 'gallery' || view === 'list') && (
          <div className="ml-auto flex flex-wrap items-center gap-1">
            <button
              onClick={() => setActiveEstante('all')}
              className={cn(
                'rounded-md border px-2.5 py-1 text-xs',
                activeEstante === 'all' && 'border-primary bg-primary/10 text-primary',
              )}
            >
              Todos ({items.length})
            </button>
            {ESTANTES.map((est) => {
              const count = itemsByShelf[est.id].length;
              if (count === 0) return null;
              return (
                <button
                  key={est.id}
                  onClick={() => setActiveEstante(est.id)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs',
                    activeEstante === est.id && 'border-primary bg-primary/10 text-primary',
                  )}
                >
                  <span>{est.emoji}</span> {est.name} <span className="text-muted-foreground">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* PIPELINE KANBAN (siempre visible arriba) */}
      <section className="mb-8">
        <KnowledgePipeline items={knowledgeItems} />
      </section>

      {/* VISTAS */}
      {view === 'shelves' && (
        <div className="space-y-8">
          {ESTANTES.map((est) => {
            const list = itemsByShelf[est.id];
            return (
              <section key={est.id}>
                <header className="mb-3 flex items-end justify-between gap-3 border-b pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                      style={{ background: est.color }}
                    >
                      <est.Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {est.emoji} {est.name}
                      </h2>
                      <p className="text-xs text-muted-foreground">{est.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {list.length} {list.length === 1 ? 'doc' : 'docs'}
                  </Badge>
                </header>
                {list.length === 0 ? (
                  <p className="rounded-md border border-dashed bg-muted/20 p-4 text-center text-xs text-muted-foreground">
                    Estante vacío para esta CoP. Cuando se citen documentos de tipo {est.name.toLowerCase()}, aparecerán aquí.
                  </p>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((d) => (
                      <DocCard key={d.id} doc={d} estanteColor={est.color} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      {view === 'gallery' && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((d) => (
            <DocCard key={d.id} doc={d} estanteColor={ESTANTES.find((e) => e.id === d.estanteId)?.color} />
          ))}
        </div>
      )}

      {view === 'list' && (
        <div className="space-y-1 rounded-lg border bg-background">
          {filteredItems.map((d) => {
            const est = ESTANTES.find((e) => e.id === d.estanteId);
            return (
              <Link
                key={d.id}
                href={d.href}
                className="flex items-center gap-3 border-b px-4 py-2 last:border-b-0 hover:bg-accent/40"
              >
                <span className="text-base">{est?.emoji}</span>
                <span className="font-mono text-[10px] text-muted-foreground w-16 shrink-0">{d.metaTop}</span>
                <span className="flex-1 truncate text-sm">{d.title}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{d.progress}%</span>
                <div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      'h-full',
                      d.progress >= 100 ? 'bg-emerald-500' : d.progress >= 50 ? 'bg-amber-500' : d.progress > 0 ? 'bg-blue-500' : 'bg-muted',
                    )}
                    style={{ width: `${d.progress}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline" size="sm">
          <Link href={`/${c.slug}`}>
            <ChevronLeft className="mr-1.5 h-3.5 w-3.5" />
            Volver al tablero de la CoP
          </Link>
        </Button>
      </div>
    </div>
  );
}

function DocCard({ doc, estanteColor }: { doc: DocItem; estanteColor?: string }) {
  return (
    <Link href={doc.href} className="group block">
      <Card
        className="h-full overflow-hidden border-l-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
        style={{ borderLeftColor: estanteColor ?? 'var(--color-border)' }}
      >
        <CardContent className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
              {doc.type === 'paper' ? <BookMarked className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
              <span>{doc.metaTop}</span>
            </div>
            {doc.hasComprehension && (
              <Badge variant="secondary" className="gap-1 text-[10px]">
                <Sparkles className="h-3 w-3" />
                guiada
              </Badge>
            )}
          </div>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug">{doc.title}</h3>
          <p className="line-clamp-2 text-xs text-muted-foreground">{doc.description}</p>
          <div>
            <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>
                {doc.progress === 0 ? 'No leído' : doc.progress >= 100 ? 'Completado' : 'En progreso'}
              </span>
              <span className="font-mono">{doc.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  doc.progress >= 100
                    ? 'bg-emerald-500'
                    : doc.progress >= 50
                      ? 'bg-amber-500'
                      : doc.progress > 0
                        ? 'bg-blue-500'
                        : 'bg-muted-foreground/30',
                )}
                style={{ width: `${doc.progress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
