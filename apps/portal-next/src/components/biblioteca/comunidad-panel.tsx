'use client';

import { Users, GitPullRequest, ClipboardList, ExternalLink, Sparkles, UserPlus, Lock } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { canonicPaper } from '#site/content';
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

  const paper = doc.kind === 'paper' ? canonicPaper.find((p) => p.id === doc.id) : null;
  const coFromFm = (paper as { relations?: { co?: CoAuthor[] } } | null)?.relations?.co ?? [];

  // v4.5c MVP — co-autores derivados de frontmatter, fallback a mock GitHub commit history.
  // v5.0: server action `getCoAuthors(path)` con git log + Octokit + cache.
  const coAuthors: CoAuthor[] = coFromFm.length > 0
    ? coFromFm
    : MOCK_CO_AUTHORS;

  const pendingTasks: PendingTask[] = MOCK_PENDING.filter((_t) => doc.kind === 'paper');

  const requestCoauthorUrl = `https://github.com/${REPO}/issues/new?` + new URLSearchParams({
    template: 'request-coauthor.md',
    title: `Co-autoría: ${doc.id.toUpperCase()}`,
    body: `Solicito co-autoría sobre **${doc.title}** (${doc.id}).\n\nMotivación:\n\n_(describe tu interés / aporte propuesto)_\n\n— Solicitud generada desde reforma-ud.vercel.app`,
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
        {/* Co-autores */}
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

        {/* Tareas pendientes */}
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

        {/* CTA Solicitar co-autoría */}
        <section className="rounded-lg border-l-2 border-primary/40 bg-primary/5 p-3">
          <div className="flex items-start gap-2 mb-2">
            <Sparkles className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
            <div>
              <h4 className="text-xs font-semibold leading-tight">Solicitar co-autoría</h4>
              <p className="mt-0.5 text-[10px] text-muted-foreground leading-snug">
                Aprueba un revisor → desbloquea misiones editoriales sobre este documento.
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="w-full gap-1.5 h-7 text-[11px]">
            <a href={requestCoauthorUrl} target="_blank" rel="noopener noreferrer">
              <UserPlus className="h-3 w-3" /> Abrir solicitud en GitHub
              <ExternalLink className="h-2.5 w-2.5 opacity-70" />
            </a>
          </Button>
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
