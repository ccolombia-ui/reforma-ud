'use client';

import type { LucideIcon } from 'lucide-react';
import { List, BarChart3, Kanban, Network, GitBranch, HelpCircle, GanttChart } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ViewType = 'list' | 'rbm' | 'kanban' | 'graph' | 'mermaid' | 'questions' | 'timeline';

type ViewConfig = {
  id: ViewType;
  label: string;
  Icon: LucideIcon;
  enabled: boolean;
};

const VIEWS: ViewConfig[] = [
  { id: 'list', label: 'Lista', Icon: List, enabled: true },
  { id: 'rbm', label: 'RBM', Icon: BarChart3, enabled: true },
  { id: 'kanban', label: 'Kanban', Icon: Kanban, enabled: true },
  { id: 'graph', label: 'Grafo', Icon: Network, enabled: true },
  { id: 'mermaid', label: 'Mermaid', Icon: GitBranch, enabled: false },
  { id: 'questions', label: 'Preguntas', Icon: HelpCircle, enabled: false },
  { id: 'timeline', label: 'Timeline', Icon: GanttChart, enabled: false },
];

export function ViewSwitcher({
  activeView,
  onViewChange,
  className,
}: {
  activeView: ViewType;
  onViewChange: (v: ViewType) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-1 rounded-lg bg-muted/60 p-1', className)}>
      {VIEWS.map((v) => {
        const isActive = activeView === v.id;
        return (
          <button
            key={v.id}
            onClick={() => v.enabled && onViewChange(v.id)}
            disabled={!v.enabled}
            className={cn(
              'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
              isActive
                ? 'bg-background text-primary shadow-sm'
                : v.enabled
                  ? 'text-muted-foreground hover:bg-background/60 hover:text-foreground'
                  : 'cursor-not-allowed text-muted-foreground/50',
            )}
            title={v.enabled ? v.label : `${v.label} (próximamente)`}
          >
            <v.Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{v.label}</span>
            {!v.enabled && <span className="text-[10px] opacity-60">próx.</span>}
          </button>
        );
      })}
    </div>
  );
}
