'use client';

import { useEffect, useMemo, useState } from 'react';
import { KPICard } from './kpi-card';
import { ViewSwitcher, type ViewType } from './view-switcher';
import { ItemCard } from './item-card';
import { RBMView } from './rbm-view';
import { KanbanView } from './kanban-view';
import { calcCopKPIs, buildCopItems, type CopDashboardItem } from '@/lib/bsc-rbm';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { Network } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Tablero BSC-S / RBM</h2>
          <p className="text-sm text-muted-foreground">
            P1 Compromiso · P2 Producción · P3 Impacto · P4 Sostenibilidad
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link href={`/${copSlug}/grafo`}>
            <Network className="h-3.5 w-3.5" />
            Grafo local
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} size="md" />
        ))}
      </div>

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
