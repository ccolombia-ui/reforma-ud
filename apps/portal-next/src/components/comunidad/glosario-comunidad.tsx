import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { concepto } from '#site/content';

/**
 * GlosarioComunidad — muestra los conceptos del glosario universal filtrados
 * por los glosarioTags declarados en el index.mdx de la comunidad.
 *
 * Si no hay tags o no hay coincidencias, retorna null (componente invisible).
 * G-V7-03 · v7.0
 */
export function GlosarioComunidad({
  tags,
  limit = 8,
}: Readonly<{
  tags: string[];
  limit?: number;
}>) {
  if (!tags || tags.length === 0) return null;

  const matched = concepto
    .filter((c) => {
      const cTags: string[] = (c as unknown as { tags?: string[] }).tags ?? [];
      return tags.some((t) => cTags.includes(t));
    })
    .slice(0, limit);

  if (matched.length === 0) return null;

  return (
    <section className="space-y-3" id="glosario">
      <header className="flex items-end justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <BookOpen className="h-4 w-4 text-primary" />
          Glosario de la comunidad
          <Badge variant="secondary" className="text-[10px]">{matched.length}</Badge>
        </h2>
        <Link
          href="/glosario/"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Ver glosario completo <ArrowRight className="h-3 w-3" />
        </Link>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {matched.map((c) => {
          const label = (c as unknown as { skos_prefLabel?: string }).skos_prefLabel ?? c.kd_title;
          const cTags: string[] = (c as unknown as { tags?: string[] }).tags ?? [];
          const kd_status = (c as unknown as { kd_status?: string }).kd_status;
          return (
            <Link key={c.id} href={`/glosario/${c.id}/`}>
              <Card className="group h-full p-3 transition-colors hover:border-primary/50 hover:bg-accent/30">
                <div className="mb-1 flex items-start justify-between gap-1">
                  <span className="font-mono text-[9px] text-muted-foreground">{c.id}</span>
                  {kd_status === 'APPROVED' && (
                    <Badge
                      variant="outline"
                      className="border-emerald-400/30 text-[8px] text-emerald-600 dark:text-emerald-400"
                    >
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="line-clamp-2 text-xs font-medium leading-tight group-hover:text-primary">
                  {label}
                </p>
                {cTags.slice(0, 2).map((t) => (
                  <Badge key={t} variant="secondary" className="mt-1 text-[8px]">
                    {t.replace(/^t\d-/, '')}
                  </Badge>
                ))}
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
