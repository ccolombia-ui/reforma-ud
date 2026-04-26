import { type LucideIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * EmptyState — bloque reutilizable para "sin contenido aún".
 * Uso:
 *   <EmptyState icon={Inbox} title="..." description="..." action={{ label, href }} />
 */
export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  action,
  className,
  size = 'md',
}: Readonly<{
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}>) {
  const sizes = {
    sm: { wrap: 'py-6 px-4', icon: 'h-6 w-6', title: 'text-sm', desc: 'text-xs' },
    md: { wrap: 'py-10 px-6', icon: 'h-9 w-9', title: 'text-base', desc: 'text-sm' },
    lg: { wrap: 'py-16 px-8', icon: 'h-12 w-12', title: 'text-lg', desc: 'text-sm' },
  } as const;
  const s = sizes[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/20 text-center',
        s.wrap,
        className,
      )}
    >
      <div className="rounded-full bg-muted/40 p-3">
        <Icon className={cn('text-muted-foreground/70', s.icon)} />
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className={cn('font-semibold text-foreground', s.title)}>{title}</h3>
        {description && (
          <p className={cn('text-muted-foreground', s.desc)}>{description}</p>
        )}
      </div>
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {action.label}
          </a>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
