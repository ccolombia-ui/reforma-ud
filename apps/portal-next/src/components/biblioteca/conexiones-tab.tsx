'use client';

import { useEffect, useState } from 'react';
import { ListTree, Network, GitCommit, ChevronDown } from 'lucide-react';
import { EsquemaTab } from '@/components/biblioteca/esquema-tab';
import { PaperLocalGraph } from '@/components/graph/paper-local-graph';
import { EvolutionTab } from '@/components/biblioteca/evolution-tab';
import type { ActiveDoc } from '@/lib/active-doc';
import { cn } from '@/lib/utils';

/**
 * ConexionesTab · v5.0e — accordion vertical (SOTA Linear/Notion/Obsidian).
 *
 * Antes era 3 sub-tabs horizontales (Esquema / Grafo / Evolución) que
 * duplicaban el patrón de tabs cuando ya hay un icon rail global. La
 * investigación SOTA 2026 confirma: dentro de un panel-modo, el patrón
 * dominante es accordion sections collapsibles (Linear right-pane,
 * Notion blocks, Obsidian outline), NO sub-tabs.
 *
 * Cada sección es un `<details>` HTML nativo (accesible, sin JS pesado)
 * con apertura por defecto al primer mount. Estado open/closed se
 * persiste en localStorage por sección.
 */

type SectionKey = 'esquema' | 'grafo' | 'evolucion';

const STORAGE_PREFIX = 'reforma-ud:conexiones-section-';

function readOpen(key: SectionKey, defaultValue: boolean): boolean {
  if (typeof localStorage === 'undefined') return defaultValue;
  try {
    const v = localStorage.getItem(STORAGE_PREFIX + key);
    if (v === 'true') return true;
    if (v === 'false') return false;
    return defaultValue;
  } catch {
    return defaultValue;
  }
}

function writeOpen(key: SectionKey, value: boolean): void {
  try { localStorage.setItem(STORAGE_PREFIX + key, String(value)); } catch {}
}

export function ConexionesTab({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <AccordionSection
        sectionKey="esquema"
        defaultOpen={true}
        Icon={ListTree}
        label="Esquema"
        subtitle="TOC · glosario · figuras"
      >
        <div className="h-[60vh] min-h-[240px]">
          <EsquemaTab doc={doc} />
        </div>
      </AccordionSection>

      <AccordionSection
        sectionKey="grafo"
        defaultOpen={false}
        Icon={Network}
        label="Grafo"
        subtitle={doc?.kind === 'paper' ? 'Vecindario semántico 1-hop' : 'Solo en papers'}
        disabled={!doc || doc.kind !== 'paper'}
      >
        {doc?.kind === 'paper' ? (
          <div className="h-[50vh] min-h-[280px]">
            <PaperLocalGraph paperId={doc.id} hops={1} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground p-4">
            <Network className="h-6 w-6 opacity-40" />
            <p className="font-medium text-foreground">Grafo local solo en papers</p>
            <p className="text-[10px]">Abre un paper canónico (M01-M12) para ver su vecindario.</p>
          </div>
        )}
      </AccordionSection>

      <AccordionSection
        sectionKey="evolucion"
        defaultOpen={false}
        Icon={GitCommit}
        label="Evolución"
        subtitle="Versiones git del documento"
      >
        <div className="h-[40vh] min-h-[200px]">
          <EvolutionTab doc={doc} />
        </div>
      </AccordionSection>
    </div>
  );
}

function AccordionSection({
  sectionKey, defaultOpen, Icon, label, subtitle, disabled, children,
}: Readonly<{
  sectionKey: SectionKey;
  defaultOpen: boolean;
  Icon: typeof ListTree;
  label: string;
  subtitle?: string;
  disabled?: boolean;
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  useEffect(() => {
    setOpen(readOpen(sectionKey, defaultOpen));
  }, [sectionKey, defaultOpen]);

  function toggle() {
    if (disabled) return;
    setOpen((v) => {
      const next = !v;
      writeOpen(sectionKey, next);
      return next;
    });
  }

  return (
    <section className="border-b border-sidebar-border">
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-expanded={open}
        className={cn(
          'flex w-full items-center gap-2 px-3 py-2 text-left transition-colors',
          disabled
            ? 'cursor-not-allowed text-muted-foreground/50'
            : 'hover:bg-accent/30',
        )}
      >
        <ChevronDown
          className={cn(
            'h-3 w-3 shrink-0 transition-transform text-muted-foreground',
            !open && '-rotate-90',
          )}
        />
        <Icon className="h-3.5 w-3.5 shrink-0 text-primary/80" />
        <span className="flex-1 min-w-0">
          <span className="block text-xs font-semibold leading-tight">{label}</span>
          {subtitle && (
            <span className="block text-[10px] text-muted-foreground truncate">{subtitle}</span>
          )}
        </span>
      </button>
      {open && !disabled && (
        <div className="bg-muted/10 border-t border-sidebar-border/50">
          {children}
        </div>
      )}
    </section>
  );
}
