'use client';

import Link from 'next/link';
import { BookMarked, FileText, Folder, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RAGIndicator } from './rag-indicator';
import type { CopDashboardItem } from '@/lib/bsc-rbm';

const ICONS = {
  paper: BookMarked,
  note: FileText,
  community: Folder,
};

const TYPE_LABEL = {
  paper: 'Paper canónico',
  note: 'Nota del vault',
  community: 'Sub-comunidad',
};

export function ItemCard({ item }: { item: CopDashboardItem }) {
  const Icon = ICONS[item.type];
  const statusLabel =
    item.status === 'green'
      ? 'En curso'
      : item.status === 'amber'
        ? 'En progreso'
        : item.status === 'red'
          ? 'Iniciado'
          : 'Sin abrir';

  return (
    <Link href={item.href} className="group block">
      <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="font-mono text-xs text-primary">{item.code}</span>
            </div>
            <RAGIndicator status={item.status} variant="badge" size="sm" label={statusLabel} />
          </div>
          <div>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{item.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>{TYPE_LABEL[item.type]}</span>
            {item.type !== 'community' && (
              <span className={cn('font-mono', item.progress > 0 && 'text-foreground')}>
                {item.progress}%
              </span>
            )}
          </div>
          {item.type !== 'community' && (
            <div className="h-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  item.status === 'green'
                    ? 'bg-emerald-500'
                    : item.status === 'amber'
                      ? 'bg-amber-500'
                      : item.status === 'red'
                        ? 'bg-red-500'
                        : 'bg-muted-foreground/40',
                )}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          )}
          {item.meta?.phase && (
            <Badge variant="outline" className="text-[10px]">
              {item.meta.phase}
            </Badge>
          )}
          <div className="flex items-center justify-end text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            Abrir <ChevronRight className="h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
