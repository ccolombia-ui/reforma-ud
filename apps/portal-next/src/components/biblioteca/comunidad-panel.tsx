'use client';

import { Users, GitPullRequest, ClipboardList, ExternalLink, Sparkles, UserPlus, Lock, FileText, BookOpen, Hash, Building2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { canonicPaper, community, note, concepto } from '#site/content';
import { cn } from '@/lib/utils';
import type { ActiveDoc } from '@/lib/active-doc';

type CoAuthor = {
  autor: string;
  pct?: number;
  avatar?: string;
};

type PendingTask = {
  number: number;
  title: string;
  assignee?: string;
  type: 'issue' | 'pr' | 'review';
};

const REPO = 'ccolombia-ui/reforma-ud';

/**
 * ComunidadPanel · v4.5c D7 — registro de co-autoría real del documento.
 *
 * Reemplaza el agregador presaberes/preguntas/deliberación de v4.3 d. Cada
 * uno de esos vive ahora en su lugar:
 *   • Glosario      → Conexiones › Esquema + PresaberesCallout inline
 *   • Preguntas     → ComprehensionInline al final del article
 *   • Deliberación  → DeliberacionPanel inline al final del article
 *
 * Este panel se concentra en el modelo GitHub-style del audit:
 *   1. Co-autores con % de participación (frontmatter `relations.co` o mock)
 *   2. Tareas pendientes (mock v4.5c → Octokit issues label `paper/m##` en v5.0)
 *   3. CTA "Solicitar co-autoría" → GitHub issue template
 */
export function ComunidadPanel({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
  if (!doc) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground p-4">
        <Users className="h-6 w-6 opacity-40" />
        <p className="font-medium text-foreground">Sin documento activo</p>
        <p className="text-[10px]">Abre un paper o nota para ver su comunidad.</p>
      </div>
    );
  }

  // v6.0 G-SVC-03 · co-autores y tareas son sólo para papers. Para
  // non-papers (note/concepto/community) mostramos la metadata propia
  // del doc (cites/tags/sub-children) en lugar de mock vacío.
  const paper = doc.kind === 'paper' ? canonicPaper.find((p) => p.id === doc.id) : null;
  const coFromFm = (paper as { relations?: { co?: CoAuthor[] } } | null)?.relations?.co ?? [];

  const coAuthors: CoAuthor[] = doc.kind === 'paper'
    ? (coFromFm.length > 0 ? coFromFm : MOCK_CO_AUTHORS)
    : [];

  const pendingTasks: PendingTask[] = doc.kind === 'paper' ? MOCK_PENDING : [];

  // Metadata específica por tipo de doc (G-SVC-03)
  const noteDoc = doc.kind === 'note' ? note.find((n) => n.slug === doc.id) : null;
  const conceptoDoc = doc.kind === 'concepto' ? concepto.find((c) => c.id === doc.id) : null;
  const cop = doc.kind === 'community' ? community.find((c) => c.slug === doc.id) : null;

  // Hijos directos de la comunidad (sub-unidades organizativas).
  const copChildren = cop
    ? community.filter((c) =>
        c.slug !== cop.slug &&
        c.slug.startsWith(cop.slug + '/') &&
        c.slug.split('/').length === cop.slug.split('/').length + 1,
      )
    : [];

  // v5.0n · Solicitud por correo electrónico (NO GitHub).
  // Destinatario: ccmaderas@udistrital.edu.co (revisor editorial).
  const requestCoauthorUrl = `mailto:ccmaderas@udistrital.edu.co?` + new URLSearchParams({
    subject: `Solicitud de co-autoría: ${doc.id.toUpperCase()} · ${doc.title}`,
    body: `Estimado(a) revisor(a),\n\nSolicito co-autoría sobre el documento "${doc.title}" (${doc.id}) del corpus reforma·ud.\n\nMotivación:\n\n[Describe aquí tu interés y aporte propuesto al documento]\n\nNombre completo:\nRol institucional UDFJC:\nUnidad/Programa:\n\nGracias.\n\n— Solicitud generada desde reforma-ud.vercel.app${doc.href}`,
  }).toString();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-sidebar-border px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            <Users className="h-3 w-3" />
            Comunidad
          </div>
          <Badge variant="outline" className="text-[9px] gap-0.5">
            <Lock className="h-2 w-2" /> mock
          </Badge>
        </div>
        <p className="mt-0.5 text-xs font-semibold leading-tight line-clamp-2">{doc.title}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* v6.0 G-SVC-03 · sección por tipo de doc (note / concepto / community) */}
        {doc.kind === 'note' && noteDoc && (
          <section>
            <h3 className="mb-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <FileText className="h-3 w-3" />
              Nota del vault
            </h3>
            <div className="rounded-md border bg-card px-2 py-2 space-y-1.5">
              <p className="text-[11px] leading-snug">{noteDoc.title}</p>
              {noteDoc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {noteDoc.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-[9px]">#{t}</Badge>
                  ))}
                </div>
              )}
              {noteDoc.cites.length > 0 && (
                <div className="text-[10px] text-muted-foreground">
                  Cita: <span className="font-mono">{noteDoc.cites.join(' · ').toUpperCase()}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {doc.kind === 'concepto' && conceptoDoc && (
          <section>
            <h3 className="mb-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <BookOpen className="h-3 w-3" />
              Concepto del glosario universal
            </h3>
            <div className="rounded-md border bg-card px-2 py-2 space-y-1.5">
              <p className="text-[11px] font-semibold leading-snug">
                {conceptoDoc.skos_prefLabel ?? conceptoDoc.kd_title}
              </p>
              {conceptoDoc.iso_subject_field && (
                <div className="text-[10px] text-muted-foreground">
                  Campo: <span className="text-foreground">{conceptoDoc.iso_subject_field}</span>
                </div>
              )}
              {conceptoDoc.tags && conceptoDoc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {conceptoDoc.tags.slice(0, 6).map((t: string) => (
                    <Badge key={t} variant="outline" className="text-[9px]">
                      <Hash className="h-2 w-2 mr-0.5" />{t}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {doc.kind === 'community' && cop && (
          <section>
            <h3 className="mb-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Building2 className="h-3 w-3" />
              Unidad organizativa · {cop.type}
            </h3>
            <div className="rounded-md border bg-card px-2 py-2 space-y-1.5">
              <p className="text-[11px] leading-snug">{cop.description}</p>
              {cop.cites.length > 0 && (
                <div className="text-[10px] text-muted-foreground">
                  Fundada en: <span className="font-mono">{cop.cites.join(' · ').toUpperCase()}</span>
                </div>
              )}
              {copChildren.length > 0 && (
                <div className="border-t pt-1.5 space-y-0.5">
                  <div className="text-[9px] uppercase text-muted-foreground tracking-wide">
                    Sub-unidades · {copChildren.length}
                  </div>
                  {copChildren.slice(0, 6).map((sc) => (
                    <Link
                      key={sc.slug}
                      href={sc.href}
                      className="block text-[10px] hover:text-primary truncate"
                    >
                      › {sc.shortName ?? sc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Co-autores · solo para papers */}
        {doc.kind === 'paper' && (
          <section>
            <h3 className="mb-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Users className="h-3 w-3" />
              Co-autores · {coAuthors.length}
            </h3>
            {coAuthors.length === 0 ? (
              <p className="text-[10px] text-muted-foreground italic px-1">
                Aún sin co-autores registrados.
              </p>
            ) : (
              <ul className="space-y-1">
                {coAuthors.map((c, i) => (
                  <li key={`${c.autor}-${i}`} className="flex items-center gap-2 rounded-md border bg-card px-2 py-1.5">
                    <span className="text-base">{c.avatar ?? '👤'}</span>
                    <span className="flex-1 text-xs font-mono">@{c.autor}</span>
                    {c.pct !== undefined && (
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        {c.pct}%
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Tareas pendientes · solo para papers */}
        {doc.kind === 'paper' && (
        <section>
          <h3 className="mb-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <ClipboardList className="h-3 w-3" />
            Tareas pendientes · {pendingTasks.length}
          </h3>
          {pendingTasks.length === 0 ? (
            <p className="text-[10px] text-muted-foreground italic px-1">
              No hay tareas abiertas para este documento.
            </p>
          ) : (
            <ul className="space-y-1">
              {pendingTasks.map((t) => (
                <li key={t.number}>
                  <a
                    href={`https://github.com/${REPO}/issues/${t.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-start gap-1.5 rounded-md border-l-2 bg-card px-2 py-1.5 text-[11px] hover:bg-accent/30 transition-colors',
                      t.type === 'pr' && 'border-violet-500/40',
                      t.type === 'issue' && 'border-amber-500/40',
                      t.type === 'review' && 'border-blue-500/40',
                    )}
                  >
                    {t.type === 'pr' ? (
                      <GitPullRequest className="h-3 w-3 mt-0.5 shrink-0 text-violet-500" />
                    ) : (
                      <ClipboardList className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-tight line-clamp-2">{t.title}</p>
                      <span className="text-[9px] text-muted-foreground">
                        #{t.number} {t.assignee && <>· @{t.assignee}</>}
                      </span>
                    </div>
                    <ExternalLink className="h-2.5 w-2.5 mt-1 shrink-0 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
        )}

        {/* CTA Solicitar contribución (genérico para cualquier tipo de doc) */}
        <section className="rounded-lg border-l-2 border-primary/40 bg-primary/5 p-3">
          <div className="flex items-start gap-2 mb-2">
            <Sparkles className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
            <div>
              <h4 className="text-xs font-semibold leading-tight">
                {doc.kind === 'paper' ? 'Solicitar co-autoría' : 'Proponer contribución'}
              </h4>
              <p className="mt-0.5 text-[10px] text-muted-foreground leading-snug">
                {doc.kind === 'paper'
                  ? 'Aprueba un revisor → desbloquea misiones editoriales sobre este documento.'
                  : 'Envía sugerencia/aporte al revisor editorial para mejorar este recurso.'}
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="w-full gap-1.5 h-7 text-[11px]">
            <a href={requestCoauthorUrl}>
              <UserPlus className="h-3 w-3" /> Enviar solicitud por correo
            </a>
          </Button>
          <p className="mt-1.5 text-center text-[9px] text-muted-foreground">
            ccmaderas@udistrital.edu.co
          </p>
        </section>
      </div>

      <div className="border-t border-sidebar-border px-3 py-1.5 text-[9px] text-muted-foreground italic">
        v4.5c · co-autores y tareas reales vía git log + Octokit en v5.0
      </div>
    </div>
  );
}

// v5.0g · solo el autor humano. Los assistants AI no aparecen como
// co-autores (su contribución es atribuida en commits via Co-Authored-By
// pero la "co-autoría" del documento es responsabilidad humana editorial).
const MOCK_CO_AUTHORS: CoAuthor[] = [
  { autor: 'ccolombia-ui', pct: 100, avatar: '👤' },
];

const MOCK_PENDING: PendingTask[] = [
  { number: 42, title: 'Completar pre-saberes de §3.2 (glosario faltante)', type: 'issue', assignee: 'ccolombia-ui' },
  { number: 47, title: 'Revisar bibliografía APA: 3 entradas con TODO', type: 'review' },
];
