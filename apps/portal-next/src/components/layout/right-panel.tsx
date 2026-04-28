'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, Send, ChevronLeft, Target, Lightbulb, Link2, Users, ListTree, Network, GitCommit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRightPanel, useActiveProfile, useRightWidth, useFocusedPane } from '@/lib/ui-state';
import { usePanesState } from '@/lib/panes-state';
import { COMPREHENSION_REGISTRY } from '@/lib/comprehension';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { getActiveDocFromPath } from '@/lib/active-doc';
import { EsquemaTab } from '@/components/biblioteca/esquema-tab';
import { PaperLocalGraph } from '@/components/graph/paper-local-graph';
import { VisNetworkGraph } from '@/components/graph/vis-network-graph';
import { EvolutionTab } from '@/components/biblioteca/evolution-tab';
import { RefsPanel } from '@/components/biblioteca/refs-panel';
import { ComunidadPanel } from '@/components/biblioteca/comunidad-panel';
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
  const [width, setWidth] = useRightWidth();
  const pathname = usePathname();
  const [focusedPane] = useFocusedPane();
  const panesState = usePanesState();
  const copSlug = inferCopFromPath(pathname);
  // v5.0c+v5.1 · RightPanel sigue al pane focado: si focused != 'a' y ese pane
  // existe con activeTab, resolvemos el doc desde su href; si no, fallback al
  // pathname (pane A).
  const activeDoc = useMemo(() => {
    if (focusedPane !== 'a') {
      const focusedPaneState = panesState.panes.find((p) => p.id === focusedPane);
      if (focusedPaneState?.activeTab) {
        return getActiveDocFromPath(focusedPaneState.activeTab.href);
      }
    }
    return getActiveDocFromPath(pathname);
  }, [focusedPane, panesState.panes, pathname]);

  // v5.0e — Drag-resize del right panel (handle en borde IZQUIERDO).
  // Mismo fix que sidebar: setPointerCapture en lugar de window listeners
  // para evitar drag-stuck cuando el pointer sale del viewport antes de
  // soltar. Listeners viven en el button (cleanup automático).
  const dragStart = useRef<{ x: number; w: number; el: HTMLButtonElement; pointerId: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const cleanupRightDrag = useCallback(() => {
    if (dragStart.current) {
      try { dragStart.current.el.releasePointerCapture(dragStart.current.pointerId); }
      catch { /* element ya removido */ }
    }
    dragStart.current = null;
    setDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    dragStart.current = { x: e.clientX, w: width, el, pointerId: e.pointerId };
    setDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    try { el.setPointerCapture(e.pointerId); } catch { /* navegador antiguo */ }
  }, [width]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragStart.current || dragStart.current.pointerId !== e.pointerId) return;
    const dx = dragStart.current.x - e.clientX; // invertido: arrastrar a la izq = más ancho
    setWidth(dragStart.current.w + dx);
  }, [setWidth]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragStart.current || dragStart.current.pointerId !== e.pointerId) return;
    cleanupRightDrag();
  }, [cleanupRightDrag]);

  useEffect(() => {
    if (!dragging) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') cleanupRightDrag(); }
    function onBlur() { cleanupRightDrag(); }
    window.addEventListener('keydown', onKey);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onBlur);
    };
  }, [dragging, cleanupRightDrag]);

  useEffect(() => () => { cleanupRightDrag(); }, [cleanupRightDrag]);

  // v5.0aa — Si activeDoc desaparece y estamos en tab que requiere doc activo
  // (refs, comunidad, evolucion), fallback a asistente. Esquema y Grafo
  // soportan no-doc (esquema vacío + grafo global).
  useEffect(() => {
    if (!activeDoc && (tab === 'refs' || tab === 'comunidad' || tab === 'evolucion')) {
      setTab('asistente');
    }
  }, [activeDoc, tab, setTab]);

  // v6.1 G-SBR-01 · Atajos Alt+1..6 para cambiar de tab. No interfieren con
  // shortcuts del browser (Alt+digito en navegadores no es estándar) y son
  // detectables sin Shift/Ctrl. Si no hay doc activo y la tab destino lo
  // requiere, el useEffect superior re-rutea a asistente.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      const map: Record<string, typeof tab> = {
        '1': 'esquema', '2': 'grafo', '3': 'evolucion',
        '4': 'refs', '5': 'comunidad', '6': 'asistente',
      };
      const next = map[e.key];
      if (next) {
        e.preventDefault();
        setTab(next);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setTab]);

  // counts para badges de tabs (refs solamente · backlinks)
  const [backlinkCount, setBacklinkCount] = useState<number>(0);
  useEffect(() => {
    if (!activeDoc) { setBacklinkCount(0); return; }
    let cancelled = false;
    fetch('/static/graph-global.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((g: { edges?: Array<{ to: string }> } | null) => {
        if (cancelled || !g?.edges) return;
        const docId = activeDoc.id.toLowerCase();
        const n = g.edges.filter((e) => e.to.toLowerCase() === docId).length;
        setBacklinkCount(n);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [activeDoc]);

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
      data-right-panel
      style={{ width: `${width}px` }}
      className={cn(
        'hidden shrink-0 flex-col border-l bg-sidebar text-sidebar-foreground lg:flex relative',
        dragging && 'select-none',
      )}
    >
      {/* Drag handle borde izquierdo · v5.0e — pointer capture (no más drag stuck) */}
      <button
        type="button"
        aria-label="Ajustar ancho del panel asistente (doble-clic: reset)"
        title="Arrastrar para ajustar · Doble-clic: reset a 320px"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => setWidth(320)}
        className={cn(
          'group absolute top-0 left-0 h-full w-1.5 cursor-col-resize z-30 transition-colors',
          'before:absolute before:inset-y-0 before:-left-1 before:w-3 before:content-[""]',
          'hover:bg-primary/40 active:bg-primary/60',
          dragging && 'bg-primary/60',
        )}
        style={{ touchAction: 'none' }}
      >
        <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-60 transition-opacity">
          <span className="h-0.5 w-0.5 rounded-full bg-current"></span>
          <span className="h-0.5 w-0.5 rounded-full bg-current"></span>
          <span className="h-0.5 w-0.5 rounded-full bg-current"></span>
        </span>
      </button>
      {dragging && (
        <span className="pointer-events-none fixed top-16 right-2 z-50 rounded bg-background/95 backdrop-blur px-2 py-1 font-mono text-[11px] text-foreground border-2 border-primary shadow-md">
          ⟷ {width}px
        </span>
      )}
      <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col">
        {/* v5.0g · Vertical icon rail al BORDE DERECHO del panel — simetría
            con el sidebar izquierdo (sus iconos viven a la izq cuando
            colapsado). Content area a la izquierda, rail a la derecha. */}
        <div className="flex flex-1 min-h-0 flex-row">
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-center gap-2 border-b border-sidebar-border px-3 py-2.5">
              {tab === 'esquema' && <ListTree className="h-4 w-4 text-primary" />}
              {tab === 'grafo' && <Network className="h-4 w-4 text-primary" />}
              {tab === 'evolucion' && <GitCommit className="h-4 w-4 text-primary" />}
              {tab === 'refs' && <Link2 className="h-4 w-4 text-primary" />}
              {tab === 'comunidad' && <Users className="h-4 w-4 text-primary" />}
              {tab === 'asistente' && <Sparkles className="h-4 w-4 text-primary" />}
              <span className="font-semibold text-sm">
                {tab === 'esquema' && 'Esquema'}
                {tab === 'grafo' && 'Grafo semántico'}
                {tab === 'evolucion' && 'Evolución'}
                {tab === 'refs' && 'Referencias'}
                {tab === 'comunidad' && 'Comunidad'}
                {tab === 'asistente' && 'Asistente'}
              </span>
            </div>

            <div className="flex-1 overflow-hidden">
              {tab === 'esquema' && (
                <div className="h-full overflow-y-auto">
                  <EsquemaTab doc={activeDoc} />
                </div>
              )}
              {tab === 'grafo' && (
                <div className="h-full">
                  {activeDoc ? (
                    /* v6.0 G-SVC-01 · `nodeId` genérico acepta paper m##,
                       concepto con-XXX, note slug, comunidad slug. Si el id
                       no está en el grafo, el componente muestra mensaje. */
                    <PaperLocalGraph nodeId={activeDoc.id} hops={1} />
                  ) : (
                    /* Sin doc activo → grafo GLOBAL del corpus (107 nodos, 125 aristas). */
                    <VisNetworkGraph src="/static/graph-global.json" />
                  )}
                </div>
              )}
              {tab === 'evolucion' && (
                <div className="h-full overflow-y-auto">
                  <EvolutionTab doc={activeDoc} />
                </div>
              )}
              {tab === 'refs' && <RefsPanel doc={activeDoc} />}
              {tab === 'comunidad' && <ComunidadPanel doc={activeDoc} />}
              {tab === 'asistente' && (
                <div className="h-full overflow-hidden p-3">
                  <ChatPane copSlug={copSlug} pathname={pathname} />
                </div>
              )}
            </div>
          </div>

          <nav
            aria-label="Modos del panel"
            className="flex w-11 shrink-0 flex-col items-center gap-0.5 border-l border-sidebar-border py-2"
          >
            {/* v5.0aa · 6 tabs planas (sin agrupador "Conexiones"). */}
            <RailIcon
              active={tab === 'esquema'}
              onClick={() => setTab('esquema')}
              Icon={ListTree}
              label="Esquema"
            />
            <RailIcon
              active={tab === 'grafo'}
              onClick={() => setTab('grafo')}
              Icon={Network}
              label="Grafo"
            />
            <RailIcon
              active={tab === 'evolucion'}
              onClick={() => setTab('evolucion')}
              Icon={GitCommit}
              label="Evolución"
              disabled={!activeDoc}
            />
            <RailIcon
              active={tab === 'refs'}
              onClick={() => setTab('refs')}
              Icon={Link2}
              label="Refs"
              disabled={!activeDoc}
              badge={backlinkCount > 0 ? backlinkCount : undefined}
            />
            <RailIcon
              active={tab === 'comunidad'}
              onClick={() => setTab('comunidad')}
              Icon={Users}
              label="Comunidad"
              disabled={!activeDoc}
            />
            <RailIcon
              active={tab === 'asistente'}
              onClick={() => setTab('asistente')}
              Icon={Sparkles}
              label="Asistente"
            />
            {pending.length > 0 && (
              <span
                className="mt-auto mb-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[9px] font-mono px-1.5 py-0.5"
                title={`${pending.length} misiones pendientes`}
              >
                {pending.length}
              </span>
            )}
          </nav>
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
 * RailIcon · v5.0e — botón cuadrado en el icon rail vertical del right panel.
 * SOTA pattern: pin visual del modo activo via bg-accent + border-l-2 primary.
 * Tooltip muestra label completo (no truncado como en panel angosto).
 * ============================================================ */
function RailIcon({
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
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        'group relative inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors',
        // v5.0g · rail al borde derecho del panel → border indicator a la
        // derecha (border-r-2) para apuntar al modo activo
        active && !disabled
          ? 'bg-accent text-primary shadow-sm border-r-2 border-primary'
          : disabled
            ? 'text-muted-foreground/40 cursor-not-allowed'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent/40',
      )}
      aria-label={label}
      aria-pressed={active}
      title={disabled ? `${label} (requiere documento activo)` : label}
    >
      <Icon className="h-4 w-4" />
      {badge !== undefined && (
        <Badge
          variant="secondary"
          className="absolute -top-0.5 -left-0.5 h-3.5 min-w-3.5 px-1 text-[8px]"
        >
          {badge}
        </Badge>
      )}
      {/* Tooltip flotante a la izquierda del icon (rail está al borde derecho) */}
      <span className="pointer-events-none absolute right-full mr-2 z-50 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-[10px] text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        {label}
      </span>
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

  // v6.4 G-SBR-03 · Chat history persistido por (copSlug + missionPaperId).
  // Cada combinación contexto tiene su propio thread; al volver al mismo
  // contexto se restauran los mensajes. Antes el chat se reseteaba por sesión.
  const chatKey = `reforma-ud:chat-history:${copSlug ?? 'global'}:${missionPaperId ?? 'libre'}`;
  useEffect(() => {
    try {
      const raw = localStorage.getItem(chatKey);
      if (raw) setMessages(JSON.parse(raw));
      else setMessages([]);
    } catch { setMessages([]); }
    setError(null);
  }, [chatKey]);
  useEffect(() => {
    if (messages.length === 0) return;
    try { localStorage.setItem(chatKey, JSON.stringify(messages)); } catch { /* ignore */ }
  }, [messages, chatKey]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    try { localStorage.removeItem(chatKey); } catch { /* ignore */ }
  }, [chatKey]);

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
            <div className="text-xs leading-relaxed">
              {m.content ? (
                m.role === 'user' ? (
                  // user input es texto plano (no markdown)
                  <div className="whitespace-pre-wrap">{m.content}</div>
                ) : (
                  // v7.7 · render markdown del asistente (gfm: tablas, listas, code, links)
                  <div className="prose prose-xs dark:prose-invert max-w-none
                    prose-headings:mt-2 prose-headings:mb-1 prose-headings:font-semibold
                    prose-h1:text-sm prose-h2:text-xs prose-h3:text-xs
                    prose-p:my-1.5 prose-p:leading-relaxed
                    prose-ul:my-1.5 prose-ul:pl-4 prose-ol:my-1.5 prose-ol:pl-4
                    prose-li:my-0.5
                    prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:bg-muted prose-code:text-[10px] prose-code:before:content-[''] prose-code:after:content-['']
                    prose-pre:my-2 prose-pre:p-2 prose-pre:text-[10px]
                    prose-strong:font-semibold prose-em:italic
                    prose-blockquote:border-l-2 prose-blockquote:pl-2 prose-blockquote:my-2 prose-blockquote:text-muted-foreground
                    prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:no-underline">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                )
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
