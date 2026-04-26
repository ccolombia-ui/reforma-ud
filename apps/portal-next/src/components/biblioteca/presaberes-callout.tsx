'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';
import { WikiLinkPreview } from '@/components/biblioteca/wikilink-preview';
import { cn } from '@/lib/utils';

/**
 * PresaberesCallout — escanea el body HTML del paper en busca de wikilinks a
 * glosario (`href="/glo-*"` o `class="wikilink"` apuntando a `glo-`) y los
 * renderiza como callout colapsable al inicio del artículo.
 *
 * Por default colapsado (lector veterano avanza directo).
 * Al expandir: lista los conceptos con hover-preview que muestran la definición.
 *
 * MVP: detección por regex sobre el HTML compilado por velite.
 * Phase 2 (post import glosario): cada link resolverá al glo-X.md como nota.
 */
export function PresaberesCallout({ body }: Readonly<{ body: string }>) {
  const [open, setOpen] = useState(false);

  // Extraer todos los wikilinks que apunten a glo-*
  // Pattern: <a ... href="/something" class="wikilink ...">glo-X</a> o similar
  const presaberes = useMemo(() => {
    const set = new Map<string, string>(); // slug → display label
    // Match <a class="...wikilink..." href="...">label</a> donde label/href contiene glo-
    const regex = /<a\s+(?=[^>]*class="[^"]*wikilink[^"]*")[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
    let m;
    while ((m = regex.exec(body)) !== null) {
      const href = m[1];
      const label = m[2].trim();
      // Solo glo-* references (no papers M## ni notas)
      if (/glo-/i.test(href) || /^glo-/i.test(label)) {
        const slug = label.replace(/^glo-/, '').replaceAll('-', ' ');
        const key = href + '|' + label;
        if (!set.has(key)) set.set(key, slug);
      }
    }
    return Array.from(set.entries()).map(([key, slug]) => {
      const [href, label] = key.split('|');
      return { href, label, displayName: slug };
    });
  }, [body]);

  if (presaberes.length === 0) return null;

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      className={cn(
        'not-prose mb-6 rounded-lg border-l-4 border-amber-500 bg-amber-500/5 group transition-colors',
      )}
    >
      <summary className="cursor-pointer list-none px-4 py-3 hover:bg-amber-500/10 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <div className="min-w-0 flex-1">
          <span className="text-xs uppercase tracking-wide font-semibold text-amber-700 dark:text-amber-300">
            Pre-saberes
          </span>
          <span className="text-sm ml-2 text-muted-foreground">
            {presaberes.length} {presaberes.length === 1 ? 'concepto' : 'conceptos'} del glosario referenciados
          </span>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-amber-500/20 px-4 py-3 bg-background/50">
        <p className="text-xs text-muted-foreground mb-2">
          Para entender este documento a fondo, conviene dominar primero estos conceptos. Pasa el cursor sobre cada
          uno para ver su definición.
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {presaberes.map((p) => (
            <li key={p.href}>
              <WikiLinkPreview href={p.href}>
                <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium hover:bg-amber-500/20 transition-colors">
                  📖 {p.displayName}
                </span>
              </WikiLinkPreview>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
