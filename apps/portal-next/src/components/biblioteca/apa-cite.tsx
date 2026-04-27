'use client';

import Link from 'next/link';
import { ExternalLink, BookOpen, AlertTriangle, FileText } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { reference } from '#site/content';

/**
 * ApaCite · v5.0f Gap A — render de citas APA `[@key]` con hover popover.
 *
 * Lectura del SSOT: la metadata bibliográfica vive ahora en átomos
 * `content/biblio/<bibtex_key>.md` (per audit AUDIT-arquitectura-citas-
 * bibliografia.md). Velite los recoge como collection `reference` y este
 * componente la consume en runtime client-side.
 *
 * El parser en velite.config.ts transforma `[@key]` durante el build en:
 *   <a class="apa-cite" data-cite-key="key">(Autor, Año)</a>
 *
 * MDXWithHoverPreview intercepta esos anchors y los reemplaza por este
 * componente, que muestra:
 *   • Hover popover con autor·año·título·journal/publisher·doi+url
 *   • Click → si url existe, abre fuente externa en nueva pestaña
 *   • Si no resuelta: badge amber + tooltip con key faltante
 */

type RefEntry = {
  bibtex_key: string;
  authors: string[];
  year: number;
  title?: string;
  journal?: string;
  publisher?: string;
  url?: string;
  doi?: string;
  href: string;
};

// Build-time index para lookup O(1) en runtime
const REFERENCES: Record<string, RefEntry> = {};
for (const r of reference as unknown as RefEntry[]) {
  REFERENCES[r.bibtex_key] = r;
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
  const entry = REFERENCES[citeKey];

  if (!entry) {
    return (
      <span
        className="apa-cite-broken inline-flex items-center gap-0.5 align-baseline rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 px-1 text-[0.85em] decoration-amber-500/40 underline"
        title={`Cita @${citeKey} no resuelta — añade content/biblio/${citeKey}.md`}
      >
        <AlertTriangle className="h-2.5 w-2.5" />
        {children}
      </span>
    );
  }

  const authorLabel = entry.authors.length > 0 ? entry.authors.join('; ') : 'Anonymous';

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
            {authorLabel} <span className="text-muted-foreground font-normal">({entry.year})</span>
          </p>
          {entry.title && (
            <p className="text-xs leading-snug text-foreground/85 italic">{entry.title}</p>
          )}
          {(entry.journal || entry.publisher) && (
            <p className="text-[11px] text-muted-foreground">
              {entry.journal ?? entry.publisher}
            </p>
          )}
          {entry.doi && (
            <p className="text-[10px] text-muted-foreground font-mono">DOI: {entry.doi}</p>
          )}
          <div className="flex gap-2 pt-1.5 border-t border-border/50">
            <Link
              href={entry.href}
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
            >
              <FileText className="h-2.5 w-2.5" />
              Ver átomo
            </Link>
            {entry.url && (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline ml-auto"
              >
                Abrir fuente
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
