'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { RAGIndicator, type RAGStatus } from './rag-indicator';

export type KPIData = {
  id: string;
  title: string;
  value: number;
  target?: number;
  unit?: string;
  status: RAGStatus;
  trend: 'up' | 'down' | 'stable';
  sparkline?: number[];
  description?: string;
};

function Sparkline({ data, status, height = 32, width = 80 }: { data: number[]; status: RAGStatus; height?: number; width?: number }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(' L ')}`;
  const stroke = { green: '#10b981', amber: '#f59e0b', red: '#ef4444', gray: '#9ca3af' }[status];

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={pathD} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2}
        r="3"
        fill={stroke}
      />
    </svg>
  );
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const color = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400';
  return <Icon className={cn('w-4 h-4', color)} />;
}

export function KPICard({
  kpi,
  size = 'md',
  onClick,
  showSparkline = true,
  className,
}: {
  kpi: KPIData;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showSparkline?: boolean;
  className?: string;
}) {
  const cfg = {
    sm: { p: 'p-3', t: 'text-xs', v: 'text-lg', sh: 24, sw: 60 },
    md: { p: 'p-4', t: 'text-sm', v: 'text-2xl', sh: 32, sw: 80 },
    lg: { p: 'p-5', t: 'text-base', v: 'text-3xl', sh: 40, sw: 100 },
  }[size];

  const hasTarget = kpi.target !== undefined;
  const progress = hasTarget ? Math.round((kpi.value / kpi.target!) * 100) : null;

  return (
    <Card
      onClick={onClick}
      className={cn(
        'transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-md hover:border-primary/40',
        className,
      )}
    >
      <CardContent className={cn(cfg.p)}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h4 className={cn('font-medium text-foreground/85 truncate', cfg.t)}>{kpi.title}</h4>
            {kpi.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{kpi.description}</p>}
          </div>
          <RAGIndicator status={kpi.status} size="sm" variant="dot" />
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <span className={cn('font-bold tracking-tight', cfg.v)}>
                {kpi.value}
                {kpi.unit && <span className="text-sm font-normal text-muted-foreground">{kpi.unit}</span>}
              </span>
              <TrendIcon trend={kpi.trend} />
            </div>
            {hasTarget && (
              <div className="mt-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    Meta: {kpi.target}
                    {kpi.unit}
                  </span>
                  <span
                    className={cn(
                      'font-medium',
                      progress! >= 100 ? 'text-emerald-600' : progress! >= 70 ? 'text-amber-600' : 'text-red-600',
                    )}
                  >
                    {progress}%
                  </span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      progress! >= 100 ? 'bg-emerald-500' : progress! >= 70 ? 'bg-amber-500' : 'bg-red-500',
                    )}
                    style={{ width: `${Math.min(progress!, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {showSparkline && kpi.sparkline && kpi.sparkline.length > 1 && (
            <div className="flex-shrink-0">
              <Sparkline data={kpi.sparkline} status={kpi.status} height={cfg.sh} width={cfg.sw} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
