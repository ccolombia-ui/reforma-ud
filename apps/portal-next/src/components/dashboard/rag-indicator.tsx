'use client';

import { AlertCircle, CheckCircle2, AlertTriangle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type RAGStatus = 'green' | 'amber' | 'red' | 'gray';

const config: Record<RAGStatus, { label: string; Icon: typeof Circle; dot: string; badge: string; icon: string; pill: string }> = {
  green: {
    label: 'En curso',
    Icon: CheckCircle2,
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    icon: 'text-emerald-500',
    pill: 'bg-emerald-500 text-white',
  },
  amber: {
    label: 'Atención',
    Icon: AlertTriangle,
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    icon: 'text-amber-500',
    pill: 'bg-amber-500 text-white',
  },
  red: {
    label: 'En riesgo',
    Icon: AlertCircle,
    dot: 'bg-red-500',
    badge: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30',
    icon: 'text-red-500',
    pill: 'bg-red-500 text-white',
  },
  gray: {
    label: 'Pendiente',
    Icon: Circle,
    dot: 'bg-gray-400',
    badge: 'bg-muted text-muted-foreground border-border',
    icon: 'text-gray-400',
    pill: 'bg-gray-500 text-white',
  },
};

export function RAGIndicator({
  status,
  size = 'md',
  variant = 'dot',
  label,
  className,
}: {
  status: RAGStatus;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dot' | 'badge' | 'icon' | 'pill';
  label?: string;
  className?: string;
}) {
  const c = config[status];
  const Icon = c.Icon;
  const dotSize = size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';
  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  if (variant === 'dot') {
    return (
      <span
        className={cn('inline-block rounded-full', dotSize, c.dot, status !== 'gray' && 'animate-pulse', className)}
        aria-label={label ?? c.label}
      />
    );
  }
  if (variant === 'icon') return <Icon className={cn(iconSize, c.icon, className)} />;
  if (variant === 'badge') {
    return (
      <span className={cn('inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium', c.badge, className)}>
        <Icon className="w-3 h-3" />
        {label ?? c.label}
      </span>
    );
  }
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium', c.pill, className)}>
      {label ?? c.label}
    </span>
  );
}

export function calculateRAG(progress: number, opts?: { hasBlockers?: boolean; daysOverdue?: number }): RAGStatus {
  const { hasBlockers = false, daysOverdue = 0 } = opts ?? {};
  if (hasBlockers || daysOverdue > 5 || progress < 30) return 'red';
  if (daysOverdue > 0 || progress < 70) return 'amber';
  return 'green';
}
