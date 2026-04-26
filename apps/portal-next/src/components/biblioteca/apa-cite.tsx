'use client';

import { ExternalLink, BookOpen, AlertTriangle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import REFERENCES_RAW from '@/lib/references.json';

/**
 * ApaCite · v4.5c D5 — render de citas APA `[@key]` con hover popover bibliográfico.
 *
 * El parser en velite.config.ts transforma `[@key]` durante el build en:
 *   <a class="apa-cite" data-cite-key="key">(Autor, Año)</a>
 *
 * MDXWithHoverPreview intercepta esos anchors y los reemplaza por este componente.
 *
 * Si la cita está en `references.json`:
 *   • Hover popover con autor, año, título, journal/publisher, link externo si hay url.
 *   • Click → si url existe, abre en nueva pestaña; si no, no-op.
 * Si la cita NO está resuelta:
 *   • Render con badge "broken" + tooltip diciendo qué key falta.
 *
 * v5.0: si la entrada del `.bib` corresponde a un `.md` interno (caso raro: cita
 * a otro paper canónico), montar `<MDXWithHoverPreview>` recursivo con depth-limit.
 */

type RefEntry = {
  author: string;
  year: number;
  title?: string;
  url?: string | null;
  journal?: string;
  publisher?: string;
};

const REFERENCES = REFERENCES_RAW as unknown as Record<string, RefEntry | { _meta: unknown }>;

function getEntry(key: string): RefEntry | null {
  const v = REFERENCES[key];
  if (!v || '_meta' in v) return null;
  return v as RefEntry;
}

export function ApaCite({
  citeKey,
  className,
  children,
}: Readonly<{
  citeKey: string;
  className?: string;
  children: React.ReactNode;
}>) {
  const entry = getEntry(citeKey);

  if (!entry) {
    return (
      <span
        className="apa-cite-broken inline-flex items-center gap-0.5 align-baseline rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 px-1 text-[0.85em] decoration-amber-500/40 underline"
        title={`Cita @${citeKey} no resuelta — añade entrada en src/lib/references.json`}
      >
        <AlertTriangle className="h-2.5 w-2.5" />
        {children}
      </span>
    );
  }

  return (
    <HoverCard openDelay={300} closeDelay={250}>
      <HoverCardTrigger asChild>
        {entry.url ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className={className ?? 'apa-cite text-primary/80 hover:text-primary no-underline border-b border-dotted border-primary/40'}
            data-cite-key={citeKey}
          >
            {children}
          </a>
        ) : (
          <span
            className={className ?? 'apa-cite text-primary/80 cursor-help border-b border-dotted border-primary/40'}
            data-cite-key={citeKey}
          >
            {children}
          </span>
        )}
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        sideOffset={6}
        collisionPadding={12}
        className="w-80 p-0 overflow-hidden"
      >
        <div className="border-b bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            <BookOpen className="h-3 w-3" />
            Cita APA
            <span className="ml-auto font-mono text-[10px] text-muted-foreground/70">@{citeKey}</span>
          </div>
        </div>
        <div className="px-3 py-2.5 space-y-1.5">
          <p className="text-xs font-semibold leading-tight">
            {entry.author} <span className="text-muted-foreground font-normal">({entry.year})</span>
          </p>
          {entry.title && (
            <p className="text-xs leading-snug text-foreground/85 italic">{entry.title}</p>
          )}
          {(entry.journal || entry.publisher) && (
            <p className="text-[11px] text-muted-foreground">
              {entry.journal ?? entry.publisher}
            </p>
          )}
          {entry.url && (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline pt-1"
            >
              Abrir fuente
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
