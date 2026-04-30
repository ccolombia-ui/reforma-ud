'use client';

import { Suspense, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, Hash, BookMarked, FileText, Network, Library, Sparkles, Sun, Moon, Code2, Home, GraduationCap, Clock, Pin, Layers } from 'lucide-react';
import { useTheme } from 'next-themes';
import { canonicPaper, community, note } from '#site/content';
import { filterPublished } from '@/lib/show-drafts';
import { useDocTabs } from '@/lib/doc-tabs';

const HISTORY_KEY = 'reforma-ud:cmdk-history';
const HISTORY_MAX = 5;

type HistoryItem = { href: string; title: string; type: 'paper' | 'community' | 'note' | 'action' };

function loadHistory(): HistoryItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryItem[];
  } catch {
    return [];
  }
}

function pushHistory(item: HistoryItem) {
  try {
    const cur = loadHistory().filter((h) => h.href !== item.href);
    const next = [item, ...cur].slice(0, HISTORY_MAX);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {}
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    if (open) setHistory(loadHistory());
  }, [open]);

  // open on /, Cmd+K, Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === '/' && !open) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const items = useMemo(() => {
    const papers = filterPublished([...canonicPaper])
      .sort((a, b) => a.number - b.number)
      .map((p) => ({
        type: 'paper' as const,
        id: p.id,
        title: p.title,
        href: p.href,
        meta: `M${String(p.number).padStart(2, '0')} · ${p.crispPhase}`,
      }));
    const cops = community
      .filter((c) => c.slug !== 'comunidades')
      .map((c) => ({
        type: 'community' as const,
        id: c.slug,
        title: c.shortName ?? c.name,
        href: `/${c.slug}`,
        meta: c.type,
      }));
    const notes = note.map((n) => ({
      type: 'note' as const,
      id: n.slug,
      title: n.title,
      href: n.href,
      meta: n.tags.slice(0, 3).map((t) => `#${t}`).join(' '),
    }));
    return { papers, cops, notes };
  }, []);

  function go(href: string, title?: string, type: HistoryItem['type'] = 'action') {
    setOpen(false);
    setQuery('');
    if (title) pushHistory({ href, title, type });
    router.push(href);
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Paleta de comandos"
      shouldFilter
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-20 backdrop-blur-sm"
      contentClassName="w-full max-w-2xl overflow-hidden rounded-xl border bg-background shadow-2xl"
    >
      <div className="flex items-center gap-2 border-b px-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Buscar, navegar, preguntar..."
          className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono">Esc</kbd>
      </div>

      <Command.List className="max-h-[60vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
          Sin resultados.
        </Command.Empty>

        {/* v5.0a — Pestañas abiertas (lista actual del workspace) */}
        <Suspense fallback={null}>
          <OpenTabsGroup onSelect={() => setOpen(false)} />
        </Suspense>

        {/* G17 — Recientes (últimos 5 docs visitados) */}
        {!query && history.length > 0 && (
          <Command.Group heading="Recientes" className="text-xs">
            {history.map((h) => (
              <Command.Item
                key={`hist-${h.href}`}
                value={`reciente ${h.title}`}
                onSelect={() => go(h.href, h.title, h.type)}
                className="cmdk-item"
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="truncate">{h.title}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{h.type}</div>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Acciones" className="text-xs">
          <Command.Item value="home inicio" onSelect={() => go('/')} className="cmdk-item">
            <Home className="h-4 w-4 text-muted-foreground" /> Ir a Inicio
          </Command.Item>
          <Command.Item value="canonico biblioteca corpus" onSelect={() => go('/canonico')} className="cmdk-item">
            <Library className="h-4 w-4 text-muted-foreground" /> Canónico MI-12
          </Command.Item>
          <Command.Item value="grafo global" onSelect={() => go('/canonico/grafo')} className="cmdk-item">
            <Network className="h-4 w-4 text-muted-foreground" /> Grafo semántico del corpus
          </Command.Item>
          <Command.Item value="comunidades hub" onSelect={() => go('/comunidades')} className="cmdk-item">
            <GraduationCap className="h-4 w-4 text-muted-foreground" /> Hub de Comunidades
          </Command.Item>
          <Command.Item
            value="tema dark light toggle"
            onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="cmdk-item"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-muted-foreground" /> : <Moon className="h-4 w-4 text-muted-foreground" />}
            Cambiar tema
          </Command.Item>
          <Command.Item
            value="github repo"
            onSelect={() => window.open('https://github.com/ccolombia-ui/reforma-ud', '_blank')}
            className="cmdk-item"
          >
            <Code2 className="h-4 w-4 text-muted-foreground" /> Abrir repo en GitHub
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Papers canónicos" className="text-xs">
          {items.papers.map((p) => (
            <Command.Item
              key={p.id}
              value={`${p.id} ${p.title} ${p.meta}`}
              onSelect={() => go(p.href, p.title, 'paper')}
              className="cmdk-item"
            >
              <BookMarked className="h-4 w-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="truncate">{p.title}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{p.meta}</div>
              </div>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Comunidades" className="text-xs">
          {items.cops.map((c) => (
            <Command.Item
              key={c.id}
              value={`${c.id} ${c.title} ${c.meta}`}
              onSelect={() => go(c.href, c.title, 'community')}
              className="cmdk-item"
            >
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="truncate">{c.title}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{c.meta}</div>
              </div>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Notas del vault" className="text-xs">
          {items.notes.map((n) => (
            <Command.Item
              key={n.id}
              value={`${n.id} ${n.title} ${n.meta}`}
              onSelect={() => go(n.href, n.title, 'note')}
              className="cmdk-item"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="truncate">{n.title}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{n.meta}</div>
              </div>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>

      <div className="flex items-center justify-between border-t bg-muted/30 px-3 py-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Cmd+K · / para abrir
        </span>
        <span className="flex items-center gap-2">
          <kbd className="rounded border bg-background px-1 font-mono">↑↓</kbd> nav
          <kbd className="rounded border bg-background px-1 font-mono">↵</kbd> abrir
        </span>
      </div>
    </Command.Dialog>
  );
}

/**
 * v5.0a · Group "Pestañas abiertas" en cmd-K.
 * Aislado en un client component bajo Suspense porque useDocTabs usa useSearchParams.
 */
function OpenTabsGroup({ onSelect }: Readonly<{ onSelect: () => void }>) {
  const router = useRouter();
  const { tabs, activeTabId } = useDocTabs();
  if (tabs.length <= 1) return null;
  return (
    <Command.Group heading="Pestañas abiertas" className="text-xs">
      {tabs.map((tab) => (
        <Command.Item
          key={`tab-${tab.id}`}
          value={`pestaña ${tab.title} ${tab.id}`}
          onSelect={() => {
            router.push(tab.href);
            onSelect();
          }}
          className="cmdk-item"
        >
          <Layers className={`h-4 w-4 ${tab.id === activeTabId ? 'text-primary' : 'text-muted-foreground'}`} />
          <div className="min-w-0 flex-1 flex items-center gap-1">
            {tab.pinned && <Pin className="h-3 w-3 text-primary shrink-0" />}
            <span className="truncate">{tab.title}</span>
            {tab.kind === 'paper' && tab.number !== undefined && (
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                M{String(tab.number).padStart(2, '0')}
              </span>
            )}
          </div>
        </Command.Item>
      ))}
    </Command.Group>
  );
}
