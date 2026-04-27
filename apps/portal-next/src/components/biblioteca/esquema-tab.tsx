'use client';

import { useCallback, useMemo } from 'react';
import { ListTree, BookOpen, Image as ImageIcon, Scale, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { canonicPaper } from '#site/content';
import { OutlinePanel } from '@/components/biblioteca/outline-panel';
import type { ActiveDoc } from '@/lib/active-doc';
import { cn } from '@/lib/utils';

type CanonicRelationsCustom = Record<string, string[]>;

/**
 * EsquemaTab · v4.5d — navegación intra-doc completa: TOC + glosario invocado +
 * figuras + normas detectadas en el body (cuando el doc es paper canónico con
 * `relations.custom.*` poblado).
 *
 * Para notas/comunidades, solo TOC. Glosario y figuras se mantienen visibles
 * con el componente PresaberesCallout inline al inicio del article (paridad).
 */
export function EsquemaTab({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
  const paper = useMemo(
    () => (doc?.kind === 'paper' ? canonicPaper.find((p) => p.id === doc.id) : null),
    [doc],
  );

  const custom = (paper as { relations?: { custom?: CanonicRelationsCustom } } | null)?.relations?.custom ?? {};
  const glosario = custom.glosario ?? [];
  const figuras = custom.figuras ?? [];
  const normas = custom.normas ?? [];

  // v5.0j Gap 1 · Botones collapse-all / expand-all para los <details>
  // colapsables del body del documento. Trabajan sobre el DOM via querySelectorAll.
  const toggleAllSections = useCallback((open: boolean) => {
    if (typeof document === 'undefined') return;
    const all = document.querySelectorAll<HTMLDetailsElement>('details.md-collapsible');
    all.forEach((el) => { el.open = open; });
  }, []);

  return (
    <div className="flex h-full flex-col">
      {/* v5.0j · barra de acciones rápidas sobre el doc */}
      {doc && (
        <div className="flex items-center gap-1 border-b border-sidebar-border px-2 py-1.5">
          <button
            type="button"
            onClick={() => toggleAllSections(false)}
            title="Colapsar todas las secciones del documento"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-muted-foreground hover:bg-accent/40 hover:text-foreground"
          >
            <ChevronsDownUp className="h-3 w-3" />
            Colapsar
          </button>
          <button
            type="button"
            onClick={() => toggleAllSections(true)}
            title="Expandir todas las secciones del documento"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-muted-foreground hover:bg-accent/40 hover:text-foreground"
          >
            <ChevronsUpDown className="h-3 w-3" />
            Expandir
          </button>
        </div>
      )}

      {/* TOC ocupa la mayor parte (es lo que se usa más a menudo) */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <OutlinePanel doc={doc} />
      </div>

      {/* v4.5d — anexos plegables al fondo: glosario, figuras, normas */}
      {(glosario.length > 0 || figuras.length > 0 || normas.length > 0) && (
        <div className="border-t border-sidebar-border max-h-[40%] overflow-y-auto p-2 space-y-2 bg-muted/10">
          {glosario.length > 0 && (
            <RefBlock Icon={BookOpen} label="Glosario invocado" tone="amber" ids={glosario} />
          )}
          {figuras.length > 0 && (
            <RefBlock Icon={ImageIcon} label="Figuras" tone="violet" ids={figuras} />
          )}
          {normas.length > 0 && (
            <RefBlock Icon={Scale} label="Normas" tone="rose" ids={normas} />
          )}
        </div>
      )}
    </div>
  );
}

function RefBlock({
  Icon, label, ids, tone,
}: Readonly<{
  Icon: typeof ListTree;
  label: string;
  ids: string[];
  tone: 'amber' | 'violet' | 'rose';
}>) {
  const toneClass = {
    amber: 'border-amber-500/40 bg-amber-500/5 text-amber-700 dark:text-amber-300',
    violet: 'border-violet-500/40 bg-violet-500/5 text-violet-700 dark:text-violet-300',
    rose: 'border-rose-500/40 bg-rose-500/5 text-rose-700 dark:text-rose-300',
  }[tone];

  // v4.5e — Click scrollea a la primera ocurrencia del wikilink en el body.
  // Si no se encuentra, deja el botón visual pero sin acción (avoid broken `#ref-{id}`).
  const scrollToFirst = useCallback((id: string) => {
    if (typeof document === 'undefined') return;
    // Buscar primer <a class="wikilink"> cuyo href contenga el id (ej. /comunidades/.../glo-jtbd)
    const escaped = id.replaceAll('"', '\\"');
    const el =
      document.querySelector<HTMLElement>(`a.wikilink[href*="${escaped}"]`) ??
      document.querySelector<HTMLElement>(`a[href*="${escaped}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Pulse highlight ~1.5s para descubribilidad
      el.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'rounded');
      setTimeout(() => el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'rounded'), 1500);
    }
  }, []);

  return (
    <details className="group" open={ids.length <= 6}>
      <summary className="list-none cursor-pointer flex items-center gap-1.5 px-1 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground/80 hover:text-foreground rounded">
        <Icon className="h-3 w-3" />
        <span className="font-semibold">{label}</span>
        <span className="ml-auto font-mono text-[9px]">{ids.length}</span>
      </summary>
      <ul className="mt-1 space-y-0.5">
        {ids.map((id) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => scrollToFirst(id)}
              title={`Ir a la primera mención: ${id}`}
              className={cn(
                'w-full text-left flex items-center gap-1 rounded-md border-l-2 px-2 py-0.5 text-[10px] hover:opacity-80 transition-opacity',
                toneClass,
              )}
            >
              <span className="truncate font-medium">
                {id.replace(/^(glo|fig|acu|estatuto|res|conpes|ley|decreto)-/, '').replaceAll('-', ' ')}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
