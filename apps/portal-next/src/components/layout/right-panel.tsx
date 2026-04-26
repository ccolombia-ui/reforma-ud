'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Sparkles, MessageCircleQuestion, BookMarked, FileText, Send, ChevronLeft, ChevronRight, Target, Lightbulb, ListTree, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRightPanel, useActiveProfile } from '@/lib/ui-state';
import { COMPREHENSION_REGISTRY } from '@/lib/comprehension';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { getActiveDocFromPath } from '@/lib/active-doc';
import { OutlinePanel } from '@/components/biblioteca/outline-panel';
import { BacklinksPanel } from '@/components/biblioteca/backlinks-panel';
import { canonicPaper, community, note } from '#site/content';

type PendingItem = {
  docId: string;
  href: string;
  title: string;
  remaining: number;
  total: number;
  type: 'paper' | 'note';
  copName: string;
};

/** Detecta el copSlug de la URL actual si estamos dentro de una CoP. */
function inferCopFromPath(pathname: string | null): string | null {
  if (!pathname) return null;
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/');
  if (parts[0] !== 'comunidades' || parts.length < 2) return null;
  // El slug puede tener subsegmentos como gobierno, formacion/escuelas/fisica
  // Buscamos la coincidencia más profunda contra community list
  for (let i = parts.length; i >= 2; i--) {
    const slug = parts.slice(0, i).join('/');
    if (community.find((c) => c.slug === slug)) return slug;
    // intentar quitando segmentos sufijo conocidos
    if (parts[i - 1] === 'biblioteca' || parts[i - 1] === 'grafo') continue;
    if (parts[i - 2] === 'biblioteca') continue;
  }
  return null;
}

export function RightPanel() {
  const { collapsed, tab, setTab } = useRightPanel();
  const pathname = usePathname();
  const copSlug = inferCopFromPath(pathname);
  const activeDoc = useMemo(() => getActiveDocFromPath(pathname), [pathname]);

  // Auto-switch a outline cuando entras a un doc y estás en preguntas vacío
  useEffect(() => {
    if (activeDoc && tab === 'preguntas') {
      // No forzar cambio — solo sugerir si el usuario nunca abrió outline
      // Mantenemos comportamiento explicito: no auto-cambiamos.
    }
  }, [activeDoc, tab]);

  // Si activeDoc desaparece y estamos en outline/backlinks → fallback a preguntas
  useEffect(() => {
    if (!activeDoc && (tab === 'outline' || tab === 'backlinks')) {
      setTab('preguntas');
    }
  }, [activeDoc, tab, setTab]);

  const [readingState, setReadingState] = useState<ReadingState | null>(null);
  useEffect(() => {
    setReadingState(getReadingState());
    const onChange = () => setReadingState(getReadingState());
    window.addEventListener('reading-state-change', onChange);
    return () => window.removeEventListener('reading-state-change', onChange);
  }, []);

  const pending = useMemo<PendingItem[]>(() => {
    const items: PendingItem[] = [];
    const cops = copSlug ? [community.find((c) => c.slug === copSlug)].filter(Boolean) as typeof community : community;
    for (const cop of cops) {
      if (!cop || cop.slug === 'comunidades') continue;
      const cites = cop.cites ?? [];
      for (const pid of cites) {
        const ce = COMPREHENSION_REGISTRY[pid];
        if (!ce) continue;
        const p = canonicPaper.find((x) => x.id === pid);
        if (!p) continue;
        const status = readingState?.docs[pid]?.sections ?? {};
        const completed = ce.sections.filter((s) => ['completed', 'verified'].includes(status[s.anchor] ?? 'unread')).length;
        const remaining = ce.sections.length - completed;
        if (remaining > 0) {
          items.push({
            docId: pid,
            href: `/${cop.slug}/biblioteca/${pid}`,
            title: p.title,
            remaining,
            total: ce.sections.length,
            type: 'paper',
            copName: cop.shortName ?? cop.name,
          });
        }
      }
      const notesInVault = note.filter(
        (n) => n.communitySlug === cop.slug || n.communitySlug.startsWith(cop.slug + '/'),
      );
      for (const n of notesInVault) {
        const ce = COMPREHENSION_REGISTRY[n.slug];
        if (!ce) continue;
        const status = readingState?.docs[n.slug]?.sections ?? {};
        const completed = ce.sections.filter((s) => ['completed', 'verified'].includes(status[s.anchor] ?? 'unread')).length;
        const remaining = ce.sections.length - completed;
        if (remaining > 0) {
          items.push({
            docId: n.slug,
            href: `/${cop.slug}/biblioteca/${encodeURIComponent(n.slug)}`,
            title: n.title,
            remaining,
            total: ce.sections.length,
            type: 'note',
            copName: cop.shortName ?? cop.name,
          });
        }
      }
    }
    return items;
  }, [copSlug, readingState]);

  if (collapsed) return null;

  return (
    <aside
      data-pagefind-ignore
      className="hidden w-80 shrink-0 flex-col border-l bg-sidebar text-sidebar-foreground lg:flex"
    >
      <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col">
        <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-semibold">Asistente</span>
          {pending.length > 0 && (
            <Badge variant="secondary" className="ml-auto text-[10px]">
              {pending.length}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-4 border-b border-sidebar-border">
          <TabButton
            active={tab === 'outline'}
            onClick={() => setTab('outline')}
            Icon={ListTree}
            label="Outline"
            disabled={!activeDoc}
          />
          <TabButton
            active={tab === 'backlinks'}
            onClick={() => setTab('backlinks')}
            Icon={Link2}
            label="Refs"
            disabled={!activeDoc}
          />
          <TabButton
            active={tab === 'preguntas'}
            onClick={() => setTab('preguntas')}
            Icon={MessageCircleQuestion}
            label="Preg"
            badge={pending.length > 0 ? pending.length : undefined}
          />
          <TabButton
            active={tab === 'chat'}
            onClick={() => setTab('chat')}
            Icon={Sparkles}
            label="Chat"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          {tab === 'outline' && <OutlinePanel doc={activeDoc} />}
          {tab === 'backlinks' && <BacklinksPanel doc={activeDoc} />}
          {tab === 'preguntas' && (
            <div className="h-full overflow-y-auto p-3">
              {pending.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                  <p className="font-medium text-foreground">Todo al día</p>
                  <p className="text-xs">No hay preguntas de comprensión pendientes {copSlug ? 'en esta CoP' : 'en el portal'}.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {pending.length} pendiente{pending.length === 1 ? '' : 's'}
                  </p>
                  {pending.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="block rounded-lg border bg-background p-3 transition-all hover:border-primary/50 hover:bg-accent/40"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          {p.type === 'paper' ? <BookMarked className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                          {p.type === 'paper' ? p.docId.toUpperCase() : 'nota'}
                        </span>
                        <span className="truncate">{p.copName}</span>
                      </div>
                      <div className="line-clamp-2 text-sm font-medium leading-snug">{p.title}</div>
                      <Badge variant="outline" className="mt-2 text-[10px]">
                        {p.remaining} / {p.total} pendientes
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          {tab === 'chat' && (
            <div className="h-full overflow-hidden p-3">
              <ChatPane copSlug={copSlug} pathname={pathname} />
            </div>
          )}
        </div>

        <div className="border-t border-sidebar-border px-3 py-2 text-[10px] text-muted-foreground">
          {copSlug ? (
            <>Contexto: <strong>{community.find((c) => c.slug === copSlug)?.shortName ?? copSlug}</strong></>
          ) : (
            'Sin CoP activa · contexto global'
          )}
        </div>
        <RoleFooter />
      </div>
    </aside>
  );
}

/* ============================================================
 * TabButton — botón unificado de las 4 tabs del panel
 * ============================================================ */
function TabButton({
  active,
  onClick,
  Icon,
  label,
  disabled,
  badge,
}: Readonly<{
  active: boolean;
  onClick: () => void;
  Icon: typeof Sparkles;
  label: string;
  disabled?: boolean;
  badge?: number;
}>) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        'relative flex flex-col items-center justify-center gap-0.5 border-b-2 px-2 py-2 text-[10px] font-medium transition-colors',
        active && !disabled
          ? 'border-primary text-primary'
          : disabled
            ? 'border-transparent text-muted-foreground/40 cursor-not-allowed'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/40',
      )}
      title={disabled ? `${label} (requiere documento activo)` : label}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
      {badge !== undefined && (
        <Badge variant="secondary" className="absolute top-1 right-1 h-3.5 min-w-3.5 px-1 text-[8px]">
          {badge}
        </Badge>
      )}
    </button>
  );
}

function RoleFooter() {
  const { meta, name } = useActiveProfile();
  return (
    <div className="border-t border-sidebar-border px-3 py-1.5 text-[10px] text-muted-foreground flex items-center gap-1">
      <span>{meta.emoji}</span>
      <span className="truncate"><strong className="text-foreground">{name}</strong> · {meta.name}</span>
    </div>
  );
}

/* ============================================================
 * ChatPane — interaccion con AI Asistente
 * ============================================================ */
function ChatPane({ copSlug, pathname }: { copSlug: string | null; pathname: string | null }) {
  const { role: activeRole } = useActiveProfile();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState<'haiku' | 'kimi'>('haiku');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detectar contexto de misión activa
  const missionPaperId = useMemo<string | null>(() => {
    if (!pathname) return null;
    const m = pathname.match(/^\/mision\/([^/]+)/);
    return m ? m[1] : null;
  }, [pathname]);

  const [missionMode, setMissionMode] = useState<boolean>(!!missionPaperId);
  // Si el usuario navega a una misión, sugerir activar modo misión por defecto
  useEffect(() => {
    if (missionPaperId) setMissionMode(true);
  }, [missionPaperId]);

  // Reset mensajes cuando cambia el documento de misión para evitar fugas de contexto
  useEffect(() => {
    setMessages([]);
    setError(null);
  }, [missionPaperId]);

  const suggestions = useMemo(() => {
    if (missionMode && missionPaperId) {
      return [
        `Dame una pista para la primera sección de ${missionPaperId.toUpperCase()}`,
        `¿Qué concepto del glosario aplica aquí?`,
        `¿Por dónde empiezo a leer?`,
      ];
    }
    if (copSlug) {
      const cop = community.find((c) => c.slug === copSlug);
      const name = cop?.shortName ?? 'esta CoP';
      return [
        `¿Cuál es el rol de ${name} en la reforma?`,
        `Resume los papers que cita ${name}`,
        `¿Qué BPAs activan a ${name}?`,
      ];
    }
    return [
      '¿Qué es el Acuerdo CSU 04/2025?',
      'Resume M05 en 3 puntos',
      '¿Cómo afecta la reforma al estudiante?',
    ];
  }, [copSlug, missionMode, missionPaperId]);

  async function send(userText: string) {
    if (!userText.trim() || streaming) return;
    setError(null);
    const newMessages = [...messages, { role: 'user' as const, content: userText }];
    setMessages(newMessages);
    setInput('');
    setStreaming(true);
    setMessages((m) => [...m, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          model,
          activeCop: copSlug,
          activeRole,
          missionMode,
          missionContext: missionMode && missionPaperId ? { paperId: missionPaperId } : undefined,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        setError(errBody.error ?? 'Error en el endpoint /api/chat');
        setMessages((m) => m.slice(0, -1));
        return;
      }

      // Streaming text response
      const reader = res.body?.getReader();
      if (!reader) throw new Error('Sin reader de stream');
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setMessages((m) => m.slice(0, -1));
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Modo libre / Modo misión */}
      <div className="mb-2 flex items-center gap-1 rounded-lg border bg-muted/30 p-1">
        <button
          onClick={() => setMissionMode(false)}
          className={cn(
            'flex-1 inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors',
            !missionMode ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
          title="Conversación libre con citaciones del corpus"
        >
          <Sparkles className="h-3 w-3" />
          Modo libre
        </button>
        <button
          onClick={() => setMissionMode(true)}
          className={cn(
            'flex-1 inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors',
            missionMode ? 'bg-amber-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground',
          )}
          title="Tutor socrático: solo pistas, no respuestas directas"
        >
          <Target className="h-3 w-3" />
          Modo misión
        </button>
      </div>
      {missionMode && (
        <div className="mb-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2 text-[10px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5">
          <Lightbulb className="h-3 w-3 mt-0.5 shrink-0" />
          <span>
            Solo pistas, NO respuestas directas. {missionPaperId && (
              <strong>Contexto: {missionPaperId.toUpperCase()}.</strong>
            )}
          </span>
        </div>
      )}

      <div className="mb-2 flex items-center gap-2 rounded-lg border bg-muted/30 p-1.5">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Modelo</span>
        <div className="ml-auto flex gap-1">
          <button
            onClick={() => setModel('haiku')}
            className={cn(
              'rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors',
              model === 'haiku' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
            title="Claude Haiku 4.5"
          >
            Haiku
          </button>
          <button
            onClick={() => setModel('kimi')}
            className={cn(
              'rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors',
              model === 'kimi' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
            title="Kimi 2.5 (Moonshot AI)"
          >
            Kimi
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.length === 0 && (
          <div className="space-y-2 rounded bg-muted/30 p-3 text-xs">
            <p className="font-medium text-foreground">Pregunta sobre el corpus o tu CoP</p>
            <ul className="space-y-1.5">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => send(s)}
                    className="w-full rounded border-l-2 border-primary/30 bg-background px-2 py-1.5 text-left text-xs hover:border-primary hover:bg-accent/40"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              'rounded-lg p-2.5 text-sm',
              m.role === 'user'
                ? 'ml-4 bg-primary/10 text-foreground'
                : 'mr-4 bg-muted/40 text-foreground',
            )}
          >
            <div className="mb-1 flex items-center justify-between text-[9px] uppercase tracking-wide text-muted-foreground">
              <span>{m.role === 'user' ? 'Tú' : 'Asistente'}</span>
              {m.role === 'assistant' && i === messages.length - 1 && streaming && !m.content && (
                <span className="text-[8px] normal-case tracking-normal text-primary/80 italic">
                  Buscando en el corpus...
                </span>
              )}
            </div>
            <div className="whitespace-pre-wrap text-xs leading-relaxed">
              {m.content ? (
                m.content
              ) : streaming && m.role === 'assistant' ? (
                <span className="typing-indicator text-muted-foreground">
                  <span /><span /><span />
                </span>
              ) : null}
            </div>
          </div>
        ))}
        {error && (
          <div className="rounded border border-amber-500/40 bg-amber-500/10 p-2 text-xs text-amber-700 dark:text-amber-300">
            ⚠ {error}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-3 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={streaming}
          placeholder={streaming ? 'Generando...' : 'Pregunta...'}
          className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
        />
        <Button type="submit" size="icon" disabled={streaming || !input.trim()} aria-label="Enviar">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

/** Toggle visible solo cuando el panel derecho está colapsado. */
export function RightPanelMini() {
  const { collapsed, toggle } = useRightPanel();
  if (!collapsed) return null;
  return (
    <button
      onClick={toggle}
      aria-label="Mostrar asistente"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-xl transition-transform hover:scale-105 lg:right-3 lg:px-3"
    >
      <Sparkles className="h-4 w-4" />
      <span className="lg:hidden">Asistente</span>
      <ChevronLeft className="hidden h-3.5 w-3.5 lg:inline" />
    </button>
  );
}
