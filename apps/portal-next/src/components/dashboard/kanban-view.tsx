'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ItemCard } from './item-card';
import { cn } from '@/lib/utils';
import type { CopDashboardItem } from '@/lib/bsc-rbm';

type Column = { id: 'gray' | 'red' | 'amber' | 'green'; name: string; tone: string };

const COLUMNS: Column[] = [
  { id: 'gray', name: 'Sin abrir', tone: 'border-gray-400' },
  { id: 'red', name: 'Iniciado', tone: 'border-red-500' },
  { id: 'amber', name: 'En progreso', tone: 'border-amber-500' },
  { id: 'green', name: 'Completo', tone: 'border-emerald-500' },
];

export function KanbanView({ items }: { items: CopDashboardItem[] }) {
  const grouped = useMemo(() => {
    const acc: Record<Column['id'], CopDashboardItem[]> = { gray: [], red: [], amber: [], green: [] };
    for (const it of items) {
      // Excluye sub-comunidades del kanban (no aplican estado de lectura)
      if (it.type === 'community') continue;
      const status = it.status === 'gray' ? 'gray' : (it.status as Column['id']);
      acc[status].push(it);
    }
    return acc;
  }, [items]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {COLUMNS.map((col) => {
        const list = grouped[col.id];
        return (
          <div key={col.id} className="space-y-3">
            <Card className={cn('border-t-4', col.tone)}>
              <CardContent className="flex items-center justify-between p-3">
                <h3 className="text-sm font-semibold">{col.name}</h3>
                <Badge variant="secondary" className="text-[10px]">
                  {list.length}
                </Badge>
              </CardContent>
            </Card>
            <div className="space-y-2">
              {list.length === 0 && (
                <p className="rounded-md border border-dashed p-3 text-center text-xs text-muted-foreground">
                  Vacío
                </p>
              )}
              {list.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
