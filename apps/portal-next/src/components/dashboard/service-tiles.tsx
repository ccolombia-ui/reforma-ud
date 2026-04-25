import Link from 'next/link';
import { COP_SERVICES } from '@/lib/services-registry';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ServiceTiles({ copSlug }: { copSlug: string }) {
  return (
    <section className="space-y-3">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Servicios de la comunidad</h2>
          <p className="text-sm text-muted-foreground">Espacios de práctica activa de esta CoP.</p>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {COP_SERVICES.map((s) => {
          const isActive = s.status === 'active';
          const content = (
            <Card
              className={cn(
                'group relative h-full overflow-hidden transition-all',
                isActive && 'hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md',
                !isActive && 'opacity-60',
              )}
            >
              <CardContent className="flex flex-col items-start gap-2 p-4">
                <div className="flex w-full items-start justify-between">
                  <span className="text-2xl" aria-hidden>
                    {s.emoji}
                  </span>
                  {s.status === 'soon' && (
                    <Badge variant="secondary" className="text-[10px]">próx.</Badge>
                  )}
                  {s.status === 'active' && (
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 text-[10px]">
                      activo
                    </Badge>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm">{s.name}</div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{s.description}</p>
                </div>
              </CardContent>
            </Card>
          );
          if (!isActive) return <div key={s.id}>{content}</div>;
          return (
            <Link key={s.id} href={s.href(copSlug)} aria-label={`Servicio: ${s.name}`}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
