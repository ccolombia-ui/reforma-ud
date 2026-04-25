'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Network, AlertTriangle, Sparkles, MessageSquare, BookMarked, FileText } from 'lucide-react';
import { KPICard } from './kpi-card';
import { ViewSwitcher, type ViewType } from './view-switcher';
import { ItemCard } from './item-card';
import { RBMView } from './rbm-view';
import { KanbanView } from './kanban-view';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { calcCopKPIs, buildCopItems, type CopDashboardItem } from '@/lib/bsc-rbm';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { canonicPaper, community, note } from '#site/content';
import { cn } from '@/lib/utils';

export function DashboardCop({ copSlug }: { copSlug: string }) {
  const [readingState, setReadingState] = useState<ReadingState | null>(null);
  const [view, setView] = useState<ViewType>('list');

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

  const kpis = useMemo(() => calcCopKPIs(copSlug, readingState), [copSlug, readingState]);
  const items = useMemo<CopDashboardItem[]>(() => buildCopItems(copSlug, readingState), [copSlug, readingState]);

  // Simulación de actividad reciente (en MVP — derivada de items + readingState; v4.1 reemplaza por tabla real)
  const recentActivity = useMemo(() => {
    const cop = community.find((c) => c.slug === copSlug);
    const cites = cop?.cites ?? [];
    const events: Array<{ icon: string; text: string; time: string; href?: string }> = [];
    for (const pid of cites.slice(0, 2)) {
      const p = canonicPaper.find((x) => x.id === pid);
      if (p) {
        events.push({
          icon: '📚',
          text: `Esta CoP funda en ${p.id.toUpperCase()} — "${p.title.slice(0, 50)}…"`,
          time: 'fundante',
          href: p.href,
        });
      }
    }
    const notesInVault = note.filter((n) => n.communitySlug === copSlug || n.communitySlug.startsWith(copSlug + '/'));
    for (const n of notesInVault.slice(0, 3)) {
      events.push({
        icon: '📝',
        text: `Nota del vault: ${n.title}`,
        time: `${n.tags.length} tags`,
        href: n.href,
      });
    }
    if (readingState) {
      const completed = Object.entries(readingState.docs).filter(([, d]) => d.progress >= 100);
      for (const [docId] of completed.slice(0, 2)) {
        events.push({
          icon: '✅',
          text: `Completaste la lectura: ${docId}`,
          time: 'reciente',
        });
      }
    }
    return events.slice(0, 5);
  }, [copSlug, readingState]);

  const hasAlerts = kpis.some((k) => k.status === 'red' || k.status === 'amber');

  return (
    <section className="space-y-6">
      {/* Header del tablero + alertas */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Tablero BSC-S / RBM
          </h2>
          <p className="text-sm text-muted-foreground">
            P1 Compromiso · P2 Producción · P3 Impacto · P4 Sostenibilidad
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {hasAlerts && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-3.5 w-3.5" />
              {kpis.filter((k) => k.status !== 'green').length} KPIs requieren atención
            </span>
          )}
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href={`/${copSlug}/grafo`}>
              <Network className="h-3.5 w-3.5" />
              Grafo local
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} size="md" />
        ))}
      </div>

      {/* Actividad reciente + acciones rápidas */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <header className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Actividad reciente</h3>
              <span className="text-[10px] text-muted-foreground">Últimos eventos en esta CoP</span>
            </header>
            {recentActivity.length === 0 ? (
              <p className="rounded-md border border-dashed bg-muted/30 p-4 text-center text-xs text-muted-foreground">
                Sin actividad registrada todavía.
              </p>
            ) : (
              <ul className="space-y-2">
                {recentActivity.map((e, i) => {
                  const content = (
                    <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent/40">
                      <span className="text-lg leading-none mt-0.5">{e.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm">{e.text}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{e.time}</span>
                    </div>
                  );
                  return e.href ? (
                    <li key={i}>
                      <Link href={e.href} className="block">{content}</Link>
                    </li>
                  ) : (
                    <li key={i}>{content}</li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 text-sm font-semibold">⚡ Acciones rápidas</h3>
            <div className="space-y-1.5">
              <Link href={`/${copSlug}/biblioteca`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-accent/40">
                <BookMarked className="h-3.5 w-3.5 text-muted-foreground" /> Abrir Biblioteca
              </Link>
              <Link href={`/${copSlug}/grafo`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-accent/40">
                <Network className="h-3.5 w-3.5 text-muted-foreground" /> Explorar grafo local
              </Link>
              <button disabled className="w-full text-left flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground opacity-60 cursor-not-allowed">
                <FileText className="h-3.5 w-3.5" /> Crear nota <span className="ml-auto text-[10px]">próx</span>
              </button>
              <button disabled className="w-full text-left flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground opacity-60 cursor-not-allowed">
                <MessageSquare className="h-3.5 w-3.5" /> Abrir foro <span className="ml-auto text-[10px]">próx</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View switcher */}
      <div className="space-y-4">
        <ViewSwitcher activeView={view} onViewChange={setView} />

        {view === 'list' && (
          items.length === 0 ? (
            <p className="rounded-lg border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
              Esta comunidad aún no tiene documentos asociados. A medida que se citen papers canónicos o
              se agreguen notas al vault, aparecerán aquí.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </div>
          )
        )}

        {view === 'rbm' && <RBMView kpis={kpis} items={items} />}
        {view === 'kanban' && <KanbanView items={items} />}
        {view === 'graph' && (
          <div className="rounded-lg border bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              El grafo de conocimiento de esta CoP vive en una vista dedicada con vis-network.
            </p>
            <Button asChild variant="default" size="sm" className="gap-2">
              <Link href={`/${copSlug}/grafo`}>
                <Network className="h-4 w-4" />
                Abrir grafo
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
