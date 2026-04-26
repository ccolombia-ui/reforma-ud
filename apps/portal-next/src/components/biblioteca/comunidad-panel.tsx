'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Sparkles, MessageSquarePlus, ChevronRight, ExternalLink, Trash2 } from 'lucide-react';
import { canonicPaper } from '#site/content';
import { COMPREHENSION_REGISTRY } from '@/lib/comprehension';
import { getReadingState, type ReadingState, type SectionStatus } from '@/lib/reading-state';
import { getDeliberacion, removeContribucion, INTENT_META, type Contribucion } from '@/lib/deliberacion-state';
import { cn } from '@/lib/utils';
import type { ActiveDoc } from '@/lib/active-doc';

type SubTab = 'presaberes' | 'preguntas' | 'deliberacion';

/**
 * ComunidadPanel — vista agregada del documento activo en 3 sub-secciones:
 *   - Pre-saberes: glosario referenciado (auto-detect del body)
 *   - Preguntas: estado de comprensión por sección + link inline
 *   - Aportes: lista de contribuciones bottom-up de la comunidad
 *
 * Usado como contenido de la tab "💬 Comunidad" en right-panel.
 */
export function ComunidadPanel({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
  const [sub, setSub] = useState<SubTab>('presaberes');
  const [readingState, setReadingState] = useState<ReadingState | null>(null);
  const [contribuciones, setContribuciones] = useState<Contribucion[]>([]);

  useEffect(() => {
    setReadingState(getReadingState());
    if (doc) setContribuciones(getDeliberacion(doc.id));
    const onReading = () => setReadingState(getReadingState());
    const onDelib = () => doc && setContribuciones(getDeliberacion(doc.id));
    window.addEventListener('reading-state-change', onReading);
    window.addEventListener('deliberacion-change', onDelib);
    window.addEventListener('storage', () => { onReading(); onDelib(); });
    return () => {
      window.removeEventListener('reading-state-change', onReading);
      window.removeEventListener('deliberacion-change', onDelib);
    };
  }, [doc]);

  if (!doc) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground p-4">
        <Sparkles className="h-6 w-6 opacity-40" />
        <p className="font-medium text-foreground">Sin documento activo</p>
        <p className="text-[10px]">Abre un paper o nota para participar.</p>
      </div>
    );
  }

  // Resolver paper para extraer el body (necesario para presaberes auto-detect)
  const paper = canonicPaper.find((p) => p.id === doc.id);
  const compr = COMPREHENSION_REGISTRY[doc.id];
  const sectionsWithQ = compr?.sections.filter((s) => s.question) ?? [];
  const verified = sectionsWithQ.filter((s) => {
    const status: SectionStatus = readingState?.docs[doc.id]?.sections[s.anchor] ?? 'unread';
    return status === 'verified';
  }).length;

  // Pre-saberes: extract glo-* refs del body
  const presaberes = useMemo(() => {
    if (!paper?.body) return [];
    const set = new Map<string, string>();
    const regex = /<a\s+(?=[^>]*class="[^"]*wikilink[^"]*")[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
    let m;
    while ((m = regex.exec(paper.body)) !== null) {
      const href = m[1];
      const label = m[2].trim();
      if (/glo-/i.test(href) || /^glo-/i.test(label)) {
        const key = href + '|' + label;
        if (!set.has(key)) set.set(key, label.replace(/^glo-/, '').replaceAll('-', ' '));
      }
    }
    return Array.from(set.entries()).map(([key, displayName]) => {
      const [href, label] = key.split('|');
      return { href, label, displayName };
    });
  }, [paper?.body]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-sidebar-border px-3 py-2">
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Comunidad</div>
        <p className="text-xs font-semibold leading-tight line-clamp-2 mt-0.5">{doc.title}</p>
      </div>

      {/* Sub-tabs */}
      <div className="grid grid-cols-3 border-b border-sidebar-border">
        <SubTabBtn
          active={sub === 'presaberes'}
          onClick={() => setSub('presaberes')}
          Icon={BookOpen}
          label="Saberes"
          count={presaberes.length}
        />
        <SubTabBtn
          active={sub === 'preguntas'}
          onClick={() => setSub('preguntas')}
          Icon={Sparkles}
          label="Preg"
          count={sectionsWithQ.length}
          badge={`${verified}/${sectionsWithQ.length}`}
        />
        <SubTabBtn
          active={sub === 'deliberacion'}
          onClick={() => setSub('deliberacion')}
          Icon={MessageSquarePlus}
          label="Delib"
          count={contribuciones.length}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {sub === 'presaberes' && (
          <PresaberesList presaberes={presaberes} />
        )}
        {sub === 'preguntas' && (
          <PreguntasList sections={sectionsWithQ} doc={doc} readingState={readingState} />
        )}
        {sub === 'deliberacion' && (
          <DeliberacionList items={contribuciones} />
        )}
      </div>
    </div>
  );
}

function SubTabBtn({
  active, onClick, Icon, label, count, badge,
}: Readonly<{ active: boolean; onClick: () => void; Icon: typeof Sparkles; label: string; count: number; badge?: string }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 border-b-2 px-2 py-2 text-[10px] font-medium transition-colors',
        active
          ? 'border-primary text-primary'
          : 'border-transparent text-muted-foreground hover:bg-accent/30 hover:text-foreground',
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label} {badge ?? (count > 0 ? `· ${count}` : '')}</span>
    </button>
  );
}

function PresaberesList({ presaberes }: Readonly<{ presaberes: Array<{ href: string; label: string; displayName: string }> }>) {
  if (presaberes.length === 0) {
    return <Empty msg="Sin pre-saberes detectados en este doc." />;
  }
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-muted-foreground italic">
        Conceptos del glosario referenciados en el cuerpo del doc. Click para abrir.
      </p>
      <ul className="space-y-1">
        {presaberes.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="flex items-center gap-1.5 rounded-md border-l-2 border-amber-500/40 bg-amber-500/5 px-2 py-1 text-xs hover:bg-amber-500/15 transition-colors"
            >
              <BookOpen className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="flex-1 truncate">📖 {p.displayName}</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PreguntasList({
  sections, doc, readingState,
}: Readonly<{
  sections: NonNullable<typeof COMPREHENSION_REGISTRY[string]>['sections'];
  doc: ActiveDoc;
  readingState: ReadingState | null;
}>) {
  if (sections.length === 0) {
    return <Empty msg="Este doc aún no tiene preguntas de comprensión." />;
  }
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-muted-foreground italic">
        Estado por sección. Click navega al heading.
      </p>
      <ul className="space-y-1">
        {sections.map((s) => {
          const status: SectionStatus = readingState?.docs[doc.id]?.sections[s.anchor] ?? 'unread';
          const isVerified = status === 'verified';
          return (
            <li key={s.anchor}>
              <a
                href={`${doc.href}#${s.anchor}`}
                className={cn(
                  'flex items-start gap-1.5 rounded-md border-l-2 px-2 py-1.5 text-[11px] hover:bg-accent/30 transition-colors',
                  isVerified ? 'border-emerald-500 bg-emerald-500/5' : 'border-primary/40 bg-primary/5',
                )}
              >
                <span className="text-[14px] mt-0.5">{isVerified ? '✓' : '○'}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] uppercase tracking-wide text-muted-foreground">
                    {s.heading.replace(/^[§\s]+/, '§')}
                  </div>
                  <p className="line-clamp-2 mt-0.5">{s.question?.prompt}</p>
                </div>
                <ChevronRight className="h-3 w-3 mt-1 text-muted-foreground shrink-0" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DeliberacionList({ items }: Readonly<{ items: Contribucion[] }>) {
  if (items.length === 0) {
    return <Empty msg="Sin contribuciones aún. Sé el primero en deliberar." />;
  }
  return (
    <ul className="space-y-2">
      {items.map((c) => {
        const meta = INTENT_META[c.intent];
        const date = new Date(c.createdAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
        return (
          <li
            key={c.id}
            className={cn(
              'group rounded-md border-l-2 bg-card px-2 py-1.5',
              meta.color === 'amber' && 'border-amber-500',
              meta.color === 'red' && 'border-red-500',
              meta.color === 'emerald' && 'border-emerald-500',
              meta.color === 'blue' && 'border-blue-500',
            )}
          >
            <div className="flex items-start gap-1.5">
              <span className="shrink-0 text-sm">{meta.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] uppercase tracking-wide text-muted-foreground">
                  {c.authorName} · {date}
                </div>
                <p className="text-[11px] mt-0.5 line-clamp-3">{c.content}</p>
              </div>
              <button
                type="button"
                onClick={() => removeContribucion(c.id)}
                aria-label="Eliminar"
                className="shrink-0 opacity-0 group-hover:opacity-100 rounded p-0.5 text-muted-foreground hover:text-destructive transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Empty({ msg }: Readonly<{ msg: string }>) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 text-xs text-muted-foreground">
      <p>{msg}</p>
    </div>
  );
}
