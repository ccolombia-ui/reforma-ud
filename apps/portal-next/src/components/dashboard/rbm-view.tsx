'use client';

import { Target, TrendingUp, Layers, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { KPIData } from './kpi-card';
import type { CopDashboardItem } from '@/lib/bsc-rbm';

const RBM_LEVELS = [
  {
    id: 'impact',
    name: 'Impacto',
    description: 'Cambios sostenidos en la sociedad o el sector.',
    Icon: Sparkles,
    color: 'var(--color-brand-purple)',
    kpis: ['p3'] as const,
  },
  {
    id: 'outcome',
    name: 'Efecto',
    description: 'Cambios de comportamiento o uso del conocimiento.',
    Icon: Target,
    color: 'var(--color-brand-blue)',
    kpis: ['p1'] as const,
  },
  {
    id: 'output',
    name: 'Producto',
    description: 'Bienes y servicios entregados por la CoP.',
    Icon: Layers,
    color: 'var(--color-brand-emerald)',
    kpis: ['p2'] as const,
  },
  {
    id: 'input',
    name: 'Insumo',
    description: 'Capacidades y recursos disponibles.',
    Icon: TrendingUp,
    color: 'var(--color-brand-gold)',
    kpis: ['p4'] as const,
  },
];

export function RBMView({ kpis, items }: { kpis: KPIData[]; items: CopDashboardItem[] }) {
  const kpiById = Object.fromEntries(kpis.map((k) => [k.id, k]));

  const completed = items.filter((i) => i.status === 'green').length;
  const total = items.filter((i) => i.type !== 'community').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Cadena RBM · Insumos → Productos → Efectos → Impacto. Cada nivel agrupa los KPIs P1-P4
        que lo materializan.
      </p>
      <div className="space-y-3">
        {RBM_LEVELS.map((level) => {
          const levelKpis = level.kpis.map((id) => kpiById[id]).filter(Boolean);
          return (
            <Card key={level.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: level.color }}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3 sm:w-72">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                    style={{ background: level.color }}
                  >
                    <level.Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold tracking-tight">{level.name}</h3>
                    <p className="text-xs text-muted-foreground">{level.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:flex-1 sm:justify-end">
                  {levelKpis.map((kpi) => (
                    <div key={kpi.id} className="text-right">
                      <div className="text-xs text-muted-foreground">{kpi.title}</div>
                      <div className="text-2xl font-bold tracking-tight">
                        {kpi.value}
                        {kpi.unit ?? ''}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Tasa global</div>
            <div className="text-sm">
              {completed} de {total} documentos en estado verde
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight">
            <span
              className={cn(
                completionRate >= 70
                  ? 'text-emerald-600'
                  : completionRate >= 30
                    ? 'text-amber-600'
                    : 'text-red-600',
              )}
            >
              {completionRate}%
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
