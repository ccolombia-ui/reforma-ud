'use client';

import Link from 'next/link';
import { Target, BookOpen, Scale, Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';

type MissionItem = {
  docId: string;
  href: string;
  title: string;
  remaining: number;
  total: number;
  type: 'paper' | 'note';
  copName: string;
};

export function MissionPanel({ pending }: Readonly<{ pending: MissionItem[] }>) {
  return (
    <div className="h-full overflow-y-auto p-3">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Misiones Activas
      </h3>
      {pending.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
          <Target className="h-8 w-8 opacity-40" />
          <p>No hay misiones pendientes</p>
          <p className="text-[10px]">Explora comunidades para desbloquear retos</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {pending.map((m) => (
            <li key={m.docId}>
              <Link
                href={m.href}
                className={cn(
                  'group block rounded-lg border bg-card p-2.5 transition-colors hover:bg-accent',
                )}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">
                    {m.type === 'paper' ? (
                      <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                    ) : (
                      <Scale className="h-3.5 w-3.5 text-orange-500" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium leading-tight group-hover:text-primary">
                      {m.title}
                    </p>
                    <p className="mt-0.5 text-[9px] text-muted-foreground">
                      {m.copName}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${((m.total - m.remaining) / m.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-muted-foreground">
                        {m.total - m.remaining}/{m.total}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
