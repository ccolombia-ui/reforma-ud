'use client';

import { useEffect, useState } from 'react';
import { Sparkles, ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import { COMPREHENSION_REGISTRY } from '@/lib/comprehension';
import { getReadingState, type ReadingState, type SectionStatus } from '@/lib/reading-state';
import { SectionGate } from '@/components/biblioteca/section-gate';
import { cn } from '@/lib/utils';

/**
 * ComprehensionInline — renderiza al final del artículo TODAS las preguntas
 * de comprensión del paper activo, agrupadas por sección.
 *
 * Cada pregunta es un <details> colapsable con:
 *   - Header: anchor a sección + estado (pendiente/verificada)
 *   - Body: prompt + SectionGate al expandir
 *
 * Esto materializa la "transclusion inline" del audit v4.3 sin requerir
 * un plugin remark/rehype custom que inyecte entre secciones del HTML.
 */
export function ComprehensionInline({ paperId }: Readonly<{ paperId: string }>) {
  const compr = COMPREHENSION_REGISTRY[paperId];
  const [readingState, setReadingState] = useState<ReadingState | null>(null);

  useEffect(() => {
    setReadingState(getReadingState());
    const onChange = () => setReadingState(getReadingState());
    window.addEventListener('reading-state-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('reading-state-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  if (!compr || compr.sections.length === 0) return null;

  const sectionsWithQ = compr.sections.filter((s) => s.question);
  if (sectionsWithQ.length === 0) return null;

  const verified = sectionsWithQ.filter((s) => {
    const status: SectionStatus = readingState?.docs[paperId]?.sections[s.anchor] ?? 'unread';
    return status === 'verified';
  }).length;

  return (
    <section className="not-prose mt-12 mb-6 border-t-2 border-primary/30 pt-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <div>
          <h2 className="inline-flex items-center gap-2 text-lg font-bold tracking-tight">
            <Sparkles className="h-4 w-4 text-primary" />
            Comprensión · cristaliza tu misión
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Verifica tu lectura comprensiva. Cada pregunta correcta acerca tu CCA.
          </p>
        </div>
        <span className="shrink-0 rounded-md border bg-primary/5 px-2 py-1 text-[11px] font-mono text-primary">
          {verified}/{sectionsWithQ.length} verificadas
        </span>
      </div>

      <ul className="space-y-2">
        {sectionsWithQ.map((s) => (
          <ComprehensionItem
            key={s.anchor}
            section={s}
            paperId={paperId}
            totalSections={compr.sections.length}
            readingState={readingState}
          />
        ))}
      </ul>
    </section>
  );
}

function ComprehensionItem({
  section,
  paperId,
  totalSections,
  readingState,
}: Readonly<{
  section: NonNullable<typeof COMPREHENSION_REGISTRY[string]>['sections'][number];
  paperId: string;
  totalSections: number;
  readingState: ReadingState | null;
}>) {
  const [open, setOpen] = useState(false);
  const status: SectionStatus = readingState?.docs[paperId]?.sections[section.anchor] ?? 'unread';
  const isVerified = status === 'verified';

  function handleComplete(outcome: 'correct' | 'incorrect' | 'skipped') {
    if (outcome === 'correct') {
      const { markSection } = require('@/lib/reading-state');
      markSection(paperId, section.anchor, 'verified', totalSections);
    }
    if (outcome === 'correct' || outcome === 'skipped') {
      setOpen(false);
    }
  }

  return (
    <li>
      <details
        open={open}
        onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
        className={cn(
          'group rounded-lg border-l-4 bg-card transition-colors overflow-hidden',
          isVerified ? 'border-emerald-500 bg-emerald-500/5' : 'border-primary/40 hover:border-primary',
        )}
      >
        <summary className="flex items-start gap-2 cursor-pointer list-none px-4 py-3 hover:bg-accent/30">
          {isVerified ? (
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" />
          ) : (
            <Circle className="h-4 w-4 mt-0.5 shrink-0 text-primary/60" />
          )}
          <div className="min-w-0 flex-1">
            <a
              href={`#${section.anchor}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] uppercase tracking-wide text-muted-foreground hover:text-primary"
            >
              §{section.heading.replace(/^[§\s]+/, '')}
            </a>
            <p className="mt-0.5 text-sm font-medium leading-snug">
              {section.question?.prompt}
            </p>
          </div>
          <ChevronDown className="h-4 w-4 mt-1 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        {open && section.question && (
          <div className="border-t bg-background px-4 py-3">
            <SectionGate question={section.question} onComplete={handleComplete} />
          </div>
        )}
      </details>
    </li>
  );
}
