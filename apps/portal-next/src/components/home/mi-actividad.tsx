'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { BookMarked, Clock, Sparkles, Calendar, AlertCircle, Vote, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { canonicPaper, community, note } from '#site/content';
import { filterPublished } from '@/lib/show-drafts';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { useActiveProfile } from '@/lib/ui-state';
import { cn } from '@/lib/utils';

/** "Mi actividad" — vista personalizada del usuario en el home. */
export function MiActividad() {
  const { meta, name, role } = useActiveProfile();
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

  // Estudiando ahora: docs con progress > 0 < 100
  const enProgreso = useMemo(() => {
    if (!readingState) return [];
    return Object.entries(readingState.docs)
      .filter(([, d]) => d.progress > 0 && d.progress < 100)
      .sort(([, a], [, b]) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime())
      .slice(0, 3)
      .map(([id, d]) => {
        const paper = canonicPaper.find((p) => p.id === id);
        const noteDoc = note.find((n) => n.slug === id);
        return {
          id,
          title: paper?.title ?? noteDoc?.title ?? id,
          progress: d.progress,
          href: paper?.href ?? noteDoc?.href ?? '#',
          type: paper ? 'paper' : 'note',
        };
      });
  }, [readingState]);

  // Pendiente de leer: papers RED con prioridad para el rol activo
  const pendiente = useMemo(() => {
    const readDocs = new Set(
      readingState ? Object.entries(readingState.docs).filter(([, d]) => d.progress > 0).map(([id]) => id) : [],
    );
    return filterPublished([...canonicPaper])
      .filter((p) => !readDocs.has(p.id))
      .sort((a, b) => a.number - b.number)
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        title: p.title,
        href: p.href,
        meta: `M${String(p.number).padStart(2, '0')} · ${p.crispPhase}`,
      }));
  }, [readingState]);

  // Plazos próximos (mock data — en v4.3 vendrán de Velite collection events)
  const plazos = useMemo(() => {
    const today = new Date();
    return [
      {
        id: 'delib-rubrica-xapi',
        type: 'deliberacion' as const,
        Icon: Vote,
        title: 'Deliberación · rúbrica xAPI v3',
        deadline: new Date(today.getTime() + 3 * 86400000),
        href: '/comunidades/formacion/escuelas/fisica',
        color: 'var(--color-brand-orange)',
      },
      {
        id: 'survey-horario',
        type: 'encuesta' as const,
        Icon: FileText,
        title: 'Encuesta · horario seminario quincenal',
        deadline: new Date(today.getTime() + 5 * 86400000),
        href: '/comunidades/formacion/escuelas/fisica',
        color: 'var(--color-brand-blue)',
      },
      {
        id: 'fci-eval',
        type: 'evento' as const,
        Icon: Calendar,
        title: 'Aplicación FCI · cohortes Magnetismo',
        deadline: new Date(today.getTime() + 12 * 86400000),
        href: '/comunidades/formacion/escuelas/fisica/cabas/magnetismo',
        color: 'var(--color-brand-emerald)',
      },
    ];
  }, []);

  function daysUntil(d: Date): string {
    const days = Math.ceil((d.getTime() - Date.now()) / 86400000);
    if (days <= 0) return 'hoy';
    if (days === 1) return 'mañana';
    return `en ${days} días`;
  }

  return (
    <section className="space-y-3">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Mi actividad — {name}
          </h2>
          <p className="text-xs text-muted-foreground">
            Personalizado para tu rol {meta.emoji} <strong>{role}</strong>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {/* Estudiando ahora */}
        <Card>
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Estudiando ahora
              </h3>
              <Badge variant="secondary" className="text-[10px]">{enProgreso.length}</Badge>
            </div>
            {enProgreso.length === 0 ? (
              <p className="rounded-md border border-dashed bg-muted/20 p-3 text-center text-[10px] text-muted-foreground">
                No tienes documentos en progreso.<br />
                <Link href="/canonico" className="text-primary hover:underline">Empieza a leer →</Link>
              </p>
            ) : (
              <ul className="space-y-1.5">
                {enProgreso.map((d) => (
                  <li key={d.id}>
                    <Link href={d.href} className="block rounded-md p-2 hover:bg-accent/40 transition-colors">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <BookMarked className="h-3 w-3" />
                        <span>{d.type === 'paper' ? d.id.toUpperCase() : 'nota'}</span>
                        <span className="ml-auto font-mono text-foreground">{d.progress}%</span>
                      </div>
                      <p className="line-clamp-2 text-xs font-medium mt-0.5">{d.title}</p>
                      <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${d.progress}%` }} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Pendiente de leer */}
        <Card>
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1.5">
                <BookMarked className="h-3 w-3" /> Pendiente de leer
              </h3>
              <Badge variant="secondary" className="text-[10px]">{pendiente.length}</Badge>
            </div>
            {pendiente.length === 0 ? (
              <p className="rounded-md border border-dashed bg-emerald-500/5 p-3 text-center text-[10px] text-muted-foreground">
                ¡Has abierto todos los papers canónicos! 🎉
              </p>
            ) : (
              <ul className="space-y-1.5">
                {pendiente.map((d) => (
                  <li key={d.id}>
                    <Link href={d.href} className="block rounded-md p-2 hover:bg-accent/40 transition-colors">
                      <div className="text-[10px] text-muted-foreground">{d.meta}</div>
                      <p className="line-clamp-2 text-xs font-medium mt-0.5">{d.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Plazos */}
        <Card>
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1.5">
                <AlertCircle className="h-3 w-3" /> Plazos para participar
              </h3>
              <Badge variant="secondary" className="text-[10px]">{plazos.length}</Badge>
            </div>
            <ul className="space-y-1.5">
              {plazos.map((p) => {
                const days = Math.ceil((p.deadline.getTime() - Date.now()) / 86400000);
                const urgent = days <= 3;
                return (
                  <li key={p.id}>
                    <Link href={p.href} className={cn(
                      'block rounded-md p-2 hover:bg-accent/40 transition-colors border-l-2',
                      urgent ? 'border-orange-500' : 'border-transparent'
                    )}>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <p.Icon className="h-3 w-3" style={{ color: p.color }} />
                        <span className="capitalize">{p.type}</span>
                        <span className={cn('ml-auto', urgent && 'text-orange-500 font-semibold')}>
                          {daysUntil(p.deadline)}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-xs font-medium mt-0.5">{p.title}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
